/**
 * BusinessKlar — единый auth-layer для многостраничного Vanilla JS + Supabase.
 *
 * TODO MVP: handleAuthSuccess() временно делает полный reload страницы для стабильной
 * синхронизации состояния между HTML-страницами. После первой публичной версии
 * заменить на полностью event-driven обновление UI через bk:auth-change + per-page
 * renderAuthUI() — достаточно убрать reload внутри handleAuthSuccess (opts.reload = false
 * по умолчанию) и вызывать renderAuthUI из слушателя события.
 */
(function (global) {
  'use strict';

  var EVENT_NAME = 'bk:auth-change';

  /**
   * Единый mapper ошибок Supabase Auth для inline-сообщений (без alert).
   * tx — функция i18n: function(key) => string
   */
  function mapAuthError(message, tx) {
    var m = String(message || '').toLowerCase();
    if (!message) return tx('auth_err_generic');
    if (m.indexOf('fetch') >= 0 || m.indexOf('network') >= 0 || m.indexOf('failed to fetch') >= 0 ||
        m.indexOf('networkerror') >= 0 || m.indexOf('connection') >= 0 || m.indexOf('internet') >= 0) {
      return tx('auth_err_network');
    }
    if (m.indexOf('invalid login') >= 0 || m.indexOf('invalid credentials') >= 0) return tx('auth_err_invalid_creds');
    if (m.indexOf('email not confirmed') >= 0) return tx('auth_err_email_not_confirmed');
    if (m.indexOf('already registered') >= 0 || m.indexOf('user already registered') >= 0) return tx('auth_err_user_exists');
    if (m.indexOf('password') >= 0 && (m.indexOf('weak') >= 0 || m.indexOf('short') >= 0)) return tx('auth_err_weak_password');
    if (m.indexOf('smtp') >= 0 || m.indexOf('sending confirmation') >= 0 ||
        (m.indexOf('email address') >= 0 && m.indexOf('invalid') >= 0)) {
      return tx('email_not_configured');
    }
    return String(message);
  }

  function emitAuthChange(detail) {
    try {
      global.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: detail }));
    } catch (e) {}
  }

  /**
   * Централизованный «успех» после auth-действий, где нужен reload (кабинет после входа и т.д.).
   * @param {string} reason — например 'sign-in', 'recovery-complete', 'signed-out'
   * @param {{ reload?: boolean, session?: object }} [opts] — reload: false отключает временный MVP-reload
   */
  async function handleAuthSuccess(reason, opts) {
    opts = opts || {};
    var reload = opts.reload !== false;
    var sess = opts.session != null ? opts.session : null;
    if (sess == null && global.BK_AUTH && global.BK_AUTH._client) {
      try {
        var r = await global.BK_AUTH._client.auth.getSession();
        sess = r.data && r.data.session ? r.data.session : null;
      } catch (e) {}
    }
    emitAuthChange({
      event: 'AUTH_SUCCESS',
      session: sess,
      reason: reason || 'success',
      source: 'handleAuthSuccess',
      reloadPlanned: reload
    });
    if (!reload) return;
    /* TODO MVP: временная синхронизация через reload — см. блок-комментарий в начале файла. */
    try {
      global.location.reload();
    } catch (e) {
      try {
        global.location.href = global.location.pathname + global.location.search;
      } catch (e2) {}
    }
  }

  /**
   * Один подписчик onAuthStateChange на клиенте. Повторные вызовы с тем же клиентом игнорируются.
   * Защита: sb._bkAuthLayerBound + BK_AUTH.isInitialized при том же _client.
   */
  function initAuthLayer(sb) {
    if (!sb || !sb.auth) return;
    if (global.BK_AUTH.isInitialized && global.BK_AUTH._client === sb) return;
    if (sb._bkAuthLayerBound) return;
    sb._bkAuthLayerBound = true;
    global.BK_AUTH._client = sb;
    global.BK_AUTH.isInitialized = true;
    sb.auth.onAuthStateChange(function (event, session) {
      emitAuthChange({
        event: event,
        session: session,
        source: 'supabase'
      });
    });
  }

  async function getCurrentUser(sb) {
    if (!sb) sb = global.BK_AUTH && global.BK_AUTH._client;
    if (!sb) return null;
    try {
      var r = await sb.auth.getUser();
      return r.data && r.data.user ? r.data.user : null;
    } catch (e) {
      return null;
    }
  }

  function login(sb, email, password) {
    return sb.auth.signInWithPassword({ email: email, password: password });
  }

  function signup(sb, email, password, emailRedirectTo) {
    var options = {};
    if (emailRedirectTo) options.emailRedirectTo = emailRedirectTo;
    return sb.auth.signUp({
      email: email,
      password: password,
      options: options
    });
  }

  function logout(sb, signOutOpts) {
    signOutOpts = signOutOpts || { scope: 'global' };
    return sb.auth.signOut(signOutOpts);
  }

  function forgotPassword(sb, email, redirectTo) {
    return sb.auth.resetPasswordForEmail(email, { redirectTo: redirectTo });
  }

  function completePasswordRecovery(sb, newPassword) {
    return sb.auth.updateUser({ password: newPassword });
  }

  function recoveryRedirectUrl() {
    try {
      var u = new URL('recovery.html', global.location.href);
      try {
        var lg = global.localStorage.getItem('bk_lang');
        if (lg) u.searchParams.set('lang', lg);
      } catch (e) {}
      return u.href.split('#')[0];
    } catch (e2) {
      return global.location.href.split('#')[0];
    }
  }

  function signUpRedirectUrl() {
    try {
      var u = new URL('index.html', global.location.href);
      try {
        var lg = global.localStorage.getItem('bk_lang');
        if (lg) u.searchParams.set('lang', lg);
      } catch (e) {}
      return u.href.split('#')[0];
    } catch (e2) {
      return global.location.href.split('#')[0];
    }
  }

  /**
   * Модалка входа/регистрации/forgot.
   * mode: 'dashboard' | 'index'
   * indexHooks: { completeIndexAfterAuth?, persistPendingSurvey?, onGuestClose? }
   */
  function bindAuthModal(opts) {
    var sb = opts.sb;
    var tx = opts.tx;
    var mode = opts.mode || 'dashboard';
    var hooks = opts.indexHooks || {};

    function setAuthMode(modeName) {
      global._bkAuthMode = modeName;
      var tLogin = document.getElementById('auth-tab-login');
      var tReg = document.getElementById('auth-tab-reg');
      var btn = document.getElementById('el-mbtn');
      var err = document.getElementById('auth-err');
      var pwWrap = document.getElementById('auth-pw-wrap');
      var forgotLink = document.getElementById('auth-forgot-link');
      var backLogin = document.getElementById('auth-back-login');
      var forgotHint = document.getElementById('auth-forgot-hint');
      if (err) {
        err.textContent = '';
        err.style.color = '';
      }
      var forgotMsg = document.getElementById('auth-forgot-msg');
      if (forgotMsg) forgotMsg.textContent = '';
      var isForgot = modeName === 'forgot';
      var tabs = document.querySelector('#auth-modal .auth-tabs');
      if (tabs) tabs.style.display = isForgot ? 'none' : '';
      if (pwWrap) pwWrap.style.display = isForgot ? 'none' : '';
      if (forgotLink) forgotLink.style.display = isForgot ? 'none' : '';
      if (backLogin) backLogin.style.display = isForgot ? 'inline' : 'none';
      if (forgotHint) {
        forgotHint.style.display = isForgot ? 'block' : 'none';
        forgotHint.textContent = isForgot ? tx('auth_forgot_hint') : '';
      }
      if (tLogin && tReg && !isForgot) {
        tLogin.classList.toggle('active', modeName === 'login');
        tReg.classList.toggle('active', modeName === 'register');
        tLogin.setAttribute('aria-selected', modeName === 'login' ? 'true' : 'false');
        tReg.setAttribute('aria-selected', modeName === 'register' ? 'true' : 'false');
      }
      if (btn) {
        if (isForgot) btn.textContent = tx('auth_forgot_mode');
        else btn.textContent = modeName === 'login' ? tx('authlogin') : tx('authreg');
      }
    }

    var mbtn = document.getElementById('el-mbtn');
    var guest = document.getElementById('el-guest');
    var tLogin = document.getElementById('auth-tab-login');
    var tReg = document.getElementById('auth-tab-reg');
    if (tLogin && !tLogin.getAttribute('data-bk-bound')) {
      tLogin.setAttribute('data-bk-bound', '1');
      tLogin.addEventListener('click', function () { setAuthMode('login'); });
    }
    if (tReg && !tReg.getAttribute('data-bk-bound')) {
      tReg.setAttribute('data-bk-bound', '1');
      tReg.addEventListener('click', function () { setAuthMode('register'); });
    }
    var forgotLinkEl = document.getElementById('auth-forgot-link');
    if (forgotLinkEl && !forgotLinkEl.getAttribute('data-bk-bound')) {
      forgotLinkEl.setAttribute('data-bk-bound', '1');
      forgotLinkEl.addEventListener('click', function (e) {
        e.preventDefault();
        setAuthMode('forgot');
      });
    }
    var backLoginEl = document.getElementById('auth-back-login');
    if (backLoginEl && !backLoginEl.getAttribute('data-bk-bound')) {
      backLoginEl.setAttribute('data-bk-bound', '1');
      backLoginEl.addEventListener('click', function (e) {
        e.preventDefault();
        setAuthMode('login');
      });
    }
    if (mbtn && !mbtn.getAttribute('data-bk-bound')) {
      mbtn.setAttribute('data-bk-bound', '1');
      mbtn.addEventListener('click', async function (e) {
        e.preventDefault();
        var err = document.getElementById('auth-err');
        var emEl = document.getElementById('auth-email');
        var pwEl = document.getElementById('auth-password');
        var email = emEl ? emEl.value.trim() : '';
        var password = pwEl ? pwEl.value : '';
        if (err) {
          err.textContent = '';
          err.style.color = '';
        }
        var authMode = global._bkAuthMode || 'login';
        if (authMode === 'forgot') {
          var forgotMsg = document.getElementById('auth-forgot-msg');
          if (!email) {
            if (err) err.textContent = tx('auth_email_required');
            return;
          }
          var rpe = await forgotPassword(sb, email, recoveryRedirectUrl());
          if (rpe.error) {
            if (forgotMsg) {
              forgotMsg.style.color = 'var(--red, #c44)';
              forgotMsg.textContent = tx('pw_reset_err') + ' (' + mapAuthError(rpe.error.message, tx) + ')';
            }
            return;
          }
          if (forgotMsg) {
            forgotMsg.style.color = '';
            forgotMsg.textContent = tx('pw_reset_sent');
          }
          return;
        }
        if (!email) {
          if (err) err.textContent = tx('auth_email_required');
          return;
        }
        if (authMode !== 'forgot' && !password) {
          if (err) err.textContent = tx('auth_password_required');
          return;
        }
        if (authMode === 'login') {
          var loginRes = await login(sb, email, password);
          if (loginRes.error) {
            if (err) {
              err.style.color = 'var(--red, #c44)';
              err.textContent = mapAuthError(loginRes.error.message, tx);
            }
            return;
          }
        } else {
          var signUpRes = await signup(sb, email, password, signUpRedirectUrl());
          if (signUpRes.error) {
            var emg = String(signUpRes.error.message || '');
            if (/smtp|sending confirmation email|email address.*invalid|500/i.test(emg)) {
              if (err) err.textContent = tx('email_not_configured');
            } else {
              if (err) {
                err.style.color = 'var(--red, #c44)';
                err.textContent = mapAuthError(signUpRes.error.message, tx);
              }
            }
            return;
          }
          if (!signUpRes.data.session) {
            if (mode === 'index' && hooks.persistPendingSurvey) {
              try { hooks.persistPendingSurvey(); } catch (e) {}
            }
            if (err) {
              err.style.color = '';
              err.textContent = tx('auth_info_check_email');
            }
            return;
          }
        }
        var user = (await sb.auth.getUser()).data.user;
        if (!user) {
          if (err) err.textContent = tx('auth_err_session');
          return;
        }
        if (mode === 'dashboard') {
          var modal = document.getElementById('auth-modal');
          if (modal) modal.classList.add('hidden');
          await handleAuthSuccess('sign-in');
          return;
        }
        if (mode === 'index' && typeof hooks.completeIndexAfterAuth === 'function') {
          await hooks.completeIndexAfterAuth();
        }
      });
    }
    if (guest && !guest.getAttribute('data-bk-bound')) {
      guest.setAttribute('data-bk-bound', '1');
      guest.addEventListener('click', function () {
        if (mode === 'index' && hooks.onGuestClose) hooks.onGuestClose();
        var modal = document.getElementById('auth-modal');
        if (modal) modal.classList.add('hidden');
      });
    }
    setAuthMode('login');
    global.BK_AUTH_SET_MODE = setAuthMode;
  }

  global.BK_AUTH = {
    isInitialized: false,
    EVENT_NAME: EVENT_NAME,
    mapAuthError: mapAuthError,
    initAuthLayer: initAuthLayer,
    handleAuthSuccess: handleAuthSuccess,
    getCurrentUser: getCurrentUser,
    login: login,
    signup: signup,
    logout: logout,
    forgotPassword: forgotPassword,
    completePasswordRecovery: completePasswordRecovery,
    recoveryRedirectUrl: recoveryRedirectUrl,
    signUpRedirectUrl: signUpRedirectUrl,
    bindAuthModal: bindAuthModal
  };
})(typeof window !== 'undefined' ? window : this);
