/**
 * Satellite pages i18n (dashboard, specialists, inbox, chat, contact, share, …).
 * Uses same lang storage as index: localStorage bk_lang, URL ?lang=, navigator.
 * Fallback chain: current → en → de.
 */
(function (global) {
  'use strict';

  var SUPPORTED = ['de', 'en', 'ru', 'uk', 'pl', 'ro', 'tr', 'es'];

  function norm(code) {
    var c = (code == null ? '' : String(code)).toLowerCase().substring(0, 2);
    return SUPPORTED.indexOf(c) >= 0 ? c : 'en';
  }

  function getLang() {
    try {
      var u = new URLSearchParams(window.location.search).get('lang');
      if (u) return norm(u);
    } catch (e) {}
    try {
      var s = window.localStorage.getItem('bk_lang');
      if (s) return norm(s);
    } catch (e2) {}
    return norm((navigator.language || 'en').substring(0, 2));
  }

  function persistLangFromUrl() {
    try {
      var u = new URLSearchParams(window.location.search).get('lang');
      if (u) window.localStorage.setItem('bk_lang', norm(u));
    } catch (e) {}
  }

  var STR = {
    de: {
      nav_home: 'Startseite', nav_specialists: 'Spezialisten', nav_contact: 'Kontakt', nav_dashboard: 'Konto', nav_logout: 'Abmelden',
      nav_spec_dash: 'Spezialisten-Konto', nav_inbox: 'Nachrichten', nav_for_spec: 'Für Spezialisten',
      dash_title: 'Mein Konto', dash_hello: 'Hallo', dash_gate_title: 'Anmeldung', dash_gate_text: 'Melden Sie sich an, um gespeicherte Berechnungen zu sehen.',
      dash_gate_link: 'Zur Startseite', dash_welcome_sub: 'Gespeicherte Projekte. PDF-Dateien (privat in Storage), Teilen-Link optional.',
      dash_load_err: 'Liste konnte nicht geladen werden. Prüfen Sie RLS in Supabase.',
      dash_empty_title: 'Noch keine gespeicherten Berechnungen', dash_empty_body: 'Führen Sie den Fragebogen auf der Startseite aus und speichern Sie unter „Nächster Schritt“.',
      dash_empty_link: 'Zur Berechnung', dash_created: 'Erstellt:', dash_open: 'Öffnen', dash_pdf: 'PDF', dash_share: 'Teilen', dash_delete: 'Löschen',
      dash_share_title: 'Link zum Ansehen', dash_copy: 'Kopieren', dash_close: 'Schließen', dash_copied: 'Kopiert', dash_copy_prompt: 'Kopieren:',
      dash_share_fail: 'Link konnte nicht erstellt werden. Prüfen Sie die Rechte in Supabase.',
      dash_del_confirm: 'Diese Berechnung unwiderruflich löschen?', dash_del_fail: 'Löschen fehlgeschlagen. DELETE-Richtlinie für business_cases nötig.',
      dash_err_title: 'Fehler', dash_err_text: 'Konto konnte nicht geladen werden.', dash_case_default: 'Berechnung',
      dash_st_done: 'Berechnung fertig', dash_st_draft: 'Entwurf', dash_st_saved: 'Gespeichert',
      dash_loading: 'Laden…', dash_updated: 'Aktualisiert:', dash_toast_copied: 'In die Zwischenablage kopiert.',
      dash_confirm_del_title: 'Berechnung löschen?', dash_confirm_del_ok: 'Löschen', dash_confirm_del_cancel: 'Abbrechen',
      authtablogin: 'Anmelden', authtabreg: 'Registrieren', authlogin: 'Anmelden', authreg: 'Registrieren',
      auth_email_label: 'E-Mail', auth_email_ph: 'ihre@email.de',
      guestclose: 'Schließen', authmbtn: 'Fortfahren', auth_email_required: 'Bitte E-Mail und Passwort angeben.',
      auth_password_required: 'Bitte Passwort angeben.',
      auth_err_generic: 'Anmeldung fehlgeschlagen. Bitte erneut versuchen.',
      auth_err_network: 'Netzwerkfehler. Verbindung prüfen und erneut versuchen.',
      auth_err_invalid_creds: 'E-Mail oder Passwort ist falsch.',
      auth_err_email_not_confirmed: 'E-Mail noch nicht bestätigt. Bitte Posteingang prüfen.',
      auth_err_user_exists: 'Diese E-Mail ist bereits registriert.',
      auth_err_weak_password: 'Passwort zu kurz (mindestens 8 Zeichen).',
      auth_err_session: 'Sitzung konnte nicht gestartet werden. Bitte erneut anmelden.',
      auth_success_signed_in: 'Sie sind angemeldet.',
      auth_success_signed_up: 'Konto erstellt.',
      auth_success_password_changed: 'Passwort geändert. Sie können sich jetzt mit dem neuen Passwort anmelden.',
      auth_info_check_email: 'Bitte E-Mail bestätigen — wir haben Ihnen eine Nachricht gesendet.',
      auth_err_invalid_recovery_link: 'Dieser Link ist ungültig oder abgelaufen.',
      email_not_configured: 'E-Mail-Versand ist auf dem Server nicht konfiguriert.',
      signup_confirm_de: 'Konto angelegt. Bitte E-Mail bestätigen — danach anmelden.',
      auth_forgot_link: 'Passwort vergessen?', auth_back_login: 'Zurück zum Login', auth_forgot_mode: 'Link senden',
      auth_forgot_hint: 'Wir senden einen Link an Ihre E-Mail (falls ein Konto existiert).',
      pw_reset_sent: 'Link zum Zurücksetzen wurde gesendet. Bitte Posteingang und Spam prüfen.',
      pw_reset_err: 'E-Mail konnte nicht gesendet werden.',
      dash_gate_intro: 'Melden Sie sich an, um gespeicherte Berechnungen, PDF und Teilen zu nutzen.',
      recovery_checking_link: 'Link wird geprüft…',
      recovery_title: 'Neues Passwort setzen', recovery_lead: 'Wählen Sie ein sicheres Passwort (mindestens 8 Zeichen).',
      recovery_new_pw: 'Neues Passwort', recovery_repeat_pw: 'Passwort wiederholen', recovery_submit: 'Passwort speichern',
      recovery_go_dashboard: 'Zum Konto', recovery_success_title: 'Passwort aktualisiert', recovery_success_body: 'Sie können sich jetzt anmelden.',
      recovery_go_login: 'Zur Startseite / Anmeldung', recovery_link_bad_title: 'Link ungültig oder abgelaufen',
      recovery_link_bad_body: 'Fordern Sie einen neuen Link unter „Passwort vergessen“ an.', recovery_go_home: 'Zur Startseite',
      recovery_err_mismatch: 'Passwörter stimmen nicht überein.', recovery_err_update: 'Passwort konnte nicht gespeichert werden.',
      contact_lead: 'Nachricht an unser Team — wir speichern Ihre Anfrage sicher.',
      contact_submit: 'Senden', contact_note: 'Wir antworten per E-Mail. Kein separates E-Mail-Programm nötig.',
      contact_sending: 'Wird gesendet…', contact_sent: 'Danke! Ihre Nachricht wurde übermittelt.',
      support_success_message_sent: 'Danke! Ihre Nachricht wurde übermittelt.',
      contact_err: 'Senden fehlgeschlagen. Bitte später erneut versuchen.',
      sh_title: 'Spezialisten für Ihr Unternehmen', sh_intro: 'Wählen Sie eine Richtung — der Katalog öffnet sich in dieser Kategorie.',
      sh_helper: 'Spezialisten-Katalog für Gründung und Führung in Deutschland', sh_gate_title: 'Nur für angemeldete Nutzer',
      sh_gate_text: 'Melden Sie sich an, um den Katalog zu sehen (Fragebogen ausfüllen und speichern).', sh_gate_link: 'Zu BusinessKlar',
      sh_city: 'Ihre Stadt:', cat_tax: 'Steuerberater', cat_acc: 'Buchhaltung', cat_ins: 'Versicherungsmakler', cat_legal: 'Rechtsberatung',
      catd_tax: 'Steuern, Finanzamt, Meldungen', catd_acc: 'Buchhaltung für Einzelunternehmen und GmbH', catd_ins: 'Betriebsschutz und Versicherungen', catd_legal: 'Verträge, Registrierung, Recht',
      spec_title: 'Spezialisten-Katalog', spec_sub_all: 'Alle Kategorien', spec_sub_cat: 'Kategorie:',
      spec_gate_title: 'Nur für angemeldete Nutzer', spec_gate_text: 'Melden Sie sich an, um den Katalog zu sehen.', spec_gate_link: 'Zu BusinessKlar',
      spec_demo: 'Demo-Karten. Tragen Sie Daten in consultants (Supabase) ein.', spec_empty_intro: 'Für diese Auswahl sind keine Spezialisten sichtbar. Zurück zur',
      spec_empty_cat: 'In dieser Kategorie sind noch keine Spezialisten hinterlegt. Wählen Sie eine andere Kategorie auf der',
      spec_home_link: 'Katalog-Startseite', spec_filter_city: 'Stadt', spec_all: 'Alle', spec_lang: 'Sprache', spec_lang_all: 'Alle',
      spec_lang_de: 'DE', spec_lang_ru: 'RU', spec_lang_en: 'EN', spec_match: 'Passt zu Ihnen',
      spec_langs: 'Sprachen:', spec_cats: 'Kategorien:', spec_email: 'E-Mail', spec_write: 'Schreiben', spec_more: 'Mehr', spec_desc_ph: 'Beschreibung folgt.',
      spec_phone: 'Tel.:', spec_chat_na: 'Chat mit diesem Spezialisten nicht verfügbar.', spec_conv_err: 'Konversation konnte nicht erstellt werden',
      spec_part_err: 'Teilnehmer konnten nicht hinzugefügt werden', spec_client: 'Kunde BusinessKlar', spec_spec_prefix: 'Spezialist:',
      inbox_title: 'Nachrichten', inbox_gate: 'Melden Sie sich an, um Konversationen zu sehen.', inbox_home: 'Zur Startseite',
      inbox_refresh: 'Aktualisieren', inbox_empty: 'Noch keine Konversationen. Schreiben Sie einem Spezialisten aus dem Katalog.',
      inbox_load_err: 'Konversationen konnten nicht geladen werden.', inbox_client: 'Spezialist:', inbox_spec: 'BusinessKlar-Kunde',
      inbox_last: 'Letzte Nachricht:', inbox_no_msg: 'Keine Nachrichten',
      conv_title: 'Konversation', conv_back: '← Nachrichten', conv_refresh: 'Aktualisieren', conv_no_access: 'Kein Zugriff auf diese Konversation.',
      conv_need_login: 'Anmeldung erforderlich oder ungültiger Link.', conv_not_found: 'Konversation nicht gefunden.', conv_send: 'Senden',
      conv_hide: 'Bei mir ausblenden', conv_hide_confirm: 'Nur bei Ihnen ausblenden? Beim anderen bleibt sie sichtbar.',
      conv_placeholder: 'Nachrichtentext…', conv_you: 'Sie', conv_them: 'Gesprächspartner',
      contact_title: 'Kontakt',
      contact_topic: 'Betreff', contact_topic_0: 'Thema wählen', contact_calc: 'Frage zum Rechner / Fragebogen', contact_account: 'Konto und Registrierung',
      contact_spec: 'Spezialisten-Katalog', contact_partner: 'Kooperation', contact_other: 'Sonstiges', contact_your_email: 'Ihre E-Mail',
      contact_message: 'Nachricht', contact_body_ph: 'Anfrage kurz beschreiben', contact_fill: 'Alle Felder ausfüllen.',
      share_title: 'BusinessKlar-Berechnung', share_loading: 'Laden…', share_err_token: 'Link ungültig oder abgelaufen.',
      share_err_load: 'Berechnung nicht gefunden oder Zugriff deaktiviert.', share_lf: 'Rechtsform', share_act: 'Tätigkeit', share_city: 'Stadt',
      share_r1: 'Umsatz (Jahr 1)', share_exp: 'Monatliche Kosten', share_cta: 'Eigene Berechnung in BusinessKlar',
      bs_gate_title: 'Anmeldung nötig', bs_gate_text: 'Spezialistenprofil nach Registrierung verfügbar.', bs_gate_link: 'Zur Startseite',
      bs_title: 'Spezialistenprofil', bs_lead: 'Antrag für den Katalog. Nach Prüfung wird der Status auf „veröffentlicht“ gesetzt.',
      bs_l_display: 'Name / Ansprache', bs_l_company: 'Firma', bs_l_cities: 'Städte (Hauptstadt zuerst)', bs_cities_ph: 'Berlin, München',
      bs_hint_cities: 'Kommagetrennt', bs_l_langs: 'Sprachen', bs_l_cats: 'Kategorien', bs_l_services: 'Leistungen (kurz, Komma)',
      bs_services_ph: 'Steuerberatung, Jahresabschluss', bs_l_desc: 'Beschreibung', bs_l_email: 'E-Mail für Kunden', bs_l_phone: 'Telefon',
      bs_submit: 'Zur Prüfung senden', bs_err_lang: 'Mindestens eine Sprache wählen', bs_err_cat: 'Mindestens eine Kategorie wählen',
      bs_err_save: 'Speichern fehlgeschlagen', bs_success: 'Antrag gespeichert. Öffnen Sie das Spezialisten-Konto.',
      bs_has_profile: 'Sie haben bereits ein Spezialistenprofil.', bs_open_sd: 'Spezialisten-Konto öffnen', bs_review: 'Profil zur Prüfung eingereicht (review).',
      sd_gate_title: 'Spezialisten-Konto', sd_gate_text: 'Melden Sie sich an, um fortzufahren.', sd_no_title: 'Spezialisten-Konto',
      sd_no_sub: 'Noch kein Profil im Katalog.', sd_cta: 'Profil anlegen', sd_welcome: 'Spezialisten-Konto', sd_panel_p: 'Mein Profil',
      sd_edit: 'Bearbeiten', sd_edit_note: '(bald: eigenes Formular)', sd_leads: 'Eingehende Anfragen', sd_stub_leads: 'Platzhalter: Anfragen erscheinen hier nach CRM-Anbindung.',
      sd_chat: 'Konversationen', sd_chat_desc: 'Chats mit BusinessKlar-Nutzern.', sd_open_inbox: 'Nachrichten öffnen', sd_status: 'Profilstatus',
      sd_pub_yes: 'veröffentlicht', sd_pub_no: 'nicht im Katalog', sd_verified: ', verifiziert', sd_profile_fallback: 'Spezialistenprofil',
      lang_de: 'DE', lang_ru: 'RU', lang_en: 'EN', lang_uk: 'UK', lang_pl: 'PL', lang_ro: 'RO', lang_tr: 'TR', lang_es: 'ES',
      bcat_tax: 'Steuern', bcat_acc: 'Buchhaltung', bcat_ins: 'Versicherung', bcat_legal: 'Recht'
    },
    en: {
      nav_home: 'Home', nav_specialists: 'Specialists', nav_contact: 'Contact', nav_dashboard: 'Account', nav_logout: 'Log out',
      nav_spec_dash: 'Specialist dashboard', nav_inbox: 'Messages', nav_for_spec: 'For specialists',
      dash_title: 'My account', dash_gate_title: 'Sign in', dash_gate_text: 'Sign in to see your saved calculations.',
      dash_gate_link: 'Back to home', dash_welcome_sub: 'Saved calculations in the cloud. PDF and share link are here.',
      dash_load_err: 'Could not load the list. Check RLS policies in Supabase.',
      dash_empty_title: 'No saved calculations yet', dash_empty_body: 'Complete the survey on the home page and tap “Save calculation” in “Your next step”.',
      dash_empty_link: 'Go to calculator', dash_created: 'Created:', dash_open: 'Open', dash_pdf: 'PDF', dash_share: 'Share', dash_delete: 'Delete',
      dash_share_title: 'View link', dash_copy: 'Copy', dash_close: 'Close', dash_copied: 'Copied', dash_copy_prompt: 'Copy:',
      dash_share_fail: 'Could not create link. Check permissions in Supabase.',
      dash_del_confirm: 'Delete this calculation permanently?', dash_del_fail: 'Could not delete. A DELETE policy for business_cases is required.',
      dash_err_title: 'Error', dash_err_text: 'Could not load the account.', dash_case_default: 'Calculation',
      dash_st_done: 'Report ready', dash_st_draft: 'Draft', dash_st_saved: 'Saved',
      dash_loading: 'Loading…', dash_updated: 'Updated:', dash_toast_copied: 'Copied to clipboard.',
      dash_confirm_del_title: 'Delete this calculation?', dash_confirm_del_ok: 'Delete', dash_confirm_del_cancel: 'Cancel',
      authtablogin: 'Sign in', authtabreg: 'Register', authlogin: 'Sign in', authreg: 'Register',
      auth_email_label: 'Email', auth_email_ph: 'you@example.com',
      guestclose: 'Close', authmbtn: 'Continue', auth_email_required: 'Please enter email and password.',
      auth_password_required: 'Please enter a password.',
      auth_err_generic: 'Sign-in failed. Please try again.',
      auth_err_network: 'Network error. Check your connection and try again.',
      auth_err_invalid_creds: 'Invalid email or password.',
      auth_err_email_not_confirmed: 'Email not confirmed yet. Check your inbox.',
      auth_err_user_exists: 'This email is already registered.',
      auth_err_weak_password: 'Password too short (at least 8 characters).',
      auth_err_session: 'Could not start a session. Please sign in again.',
      auth_success_signed_in: 'You are signed in.',
      auth_success_signed_up: 'Account created.',
      auth_success_password_changed: 'Your password was changed. You can sign in with the new password.',
      auth_info_check_email: 'Please confirm your email — we sent you a message.',
      auth_err_invalid_recovery_link: 'This link is invalid or has expired.',
      email_not_configured: 'Email is not configured on the server.',
      signup_confirm_de: 'Account created. Confirm your email, then sign in.',
      auth_forgot_link: 'Forgot password?', auth_back_login: 'Back to login', auth_forgot_mode: 'Send link',
      auth_forgot_hint: 'We will email you a reset link if an account exists.',
      pw_reset_sent: 'Reset link sent. Check inbox and spam.',
      pw_reset_err: 'Could not send email.',
      dash_gate_intro: 'Sign in to access saved calculations, PDF, and sharing.',
      recovery_checking_link: 'Checking your link…',
      recovery_title: 'Set a new password', recovery_lead: 'Choose a strong password (at least 8 characters).',
      recovery_new_pw: 'New password', recovery_repeat_pw: 'Repeat password', recovery_submit: 'Save password',
      recovery_go_dashboard: 'Go to account', recovery_success_title: 'Password updated', recovery_success_body: 'You can sign in now.',
      recovery_go_login: 'Home / sign in', recovery_link_bad_title: 'Invalid or expired link',
      recovery_link_bad_body: 'Request a new link via “Forgot password”.', recovery_go_home: 'Back to home',
      recovery_err_mismatch: 'Passwords do not match.', recovery_err_update: 'Could not save password.',
      contact_lead: 'Message our team — your request is stored securely.',
      contact_submit: 'Send', contact_note: 'We reply by email. No mail app required.',
      contact_sending: 'Sending…', contact_sent: 'Thank you! Your message was submitted.',
      support_success_message_sent: 'Thank you! Your message was submitted.',
      contact_err: 'Could not send. Please try again later.',
      sh_title: 'Specialists for your business', sh_intro: 'Pick a category to open the catalog.',
      sh_helper: 'Specialist directory for starting and running a business in Germany', sh_gate_title: 'Registered users only',
      sh_gate_text: 'Sign in to browse the catalog (complete the survey and save).', sh_gate_link: 'Go to BusinessKlar', sh_city: 'Your city:',
      cat_tax: 'Tax advisors', cat_acc: 'Accountants', cat_ins: 'Insurance agents', cat_legal: 'Legal advice',
      catd_tax: 'Taxes, tax office, filings', catd_acc: 'Accounting for sole traders and companies', catd_ins: 'Business protection and insurance', catd_legal: 'Contracts, registration, law',
      spec_title: 'Specialist directory', spec_sub_all: 'All categories', spec_sub_cat: 'Category:',
      spec_gate_title: 'Registered users only', spec_gate_text: 'Sign in to browse the catalog.', spec_gate_link: 'Go to BusinessKlar',
      spec_demo: 'Showing demo cards. Add rows to consultants in Supabase to see real listings.',
      spec_empty_intro: 'No specialists match your filters. Back to the',
      spec_empty_cat: 'No specialists in this category yet. Choose another category on the', spec_home_link: 'catalog home',
      spec_filter_city: 'City', spec_all: 'All', spec_lang: 'Language', spec_lang_all: 'All', spec_lang_de: 'DE',
      spec_lang_ru: 'RU', spec_lang_en: 'EN', spec_match: 'Good match',
      spec_langs: 'Languages:', spec_cats: 'Categories:', spec_email: 'Email', spec_write: 'Message', spec_more: 'More', spec_desc_ph: 'Description will appear after the profile is filled in.',
      spec_phone: 'Tel.:', spec_chat_na: 'Chat with this specialist is not available.', spec_conv_err: 'Could not create conversation',
      spec_part_err: 'Could not add participants', spec_client: 'BusinessKlar client', spec_spec_prefix: 'Specialist:',
      inbox_title: 'Messages', inbox_gate: 'Sign in to see conversations.', inbox_home: 'Home',
      inbox_refresh: 'Refresh', inbox_empty: 'No conversations yet. Message a specialist from the catalog.',
      inbox_load_err: 'Could not load conversations.', inbox_client: 'Specialist:', inbox_spec: 'BusinessKlar client',
      inbox_last: 'Last message:', inbox_no_msg: 'No messages',
      conv_title: 'Conversation', conv_back: '← Messages', conv_refresh: 'Refresh', conv_no_access: 'No access to this conversation.',
      conv_need_login: 'Sign in required or invalid link.', conv_not_found: 'Conversation not found.', conv_send: 'Send',
      conv_hide: 'Hide for me', conv_hide_confirm: 'Hide only on your side? It stays visible for the other person.',
      conv_placeholder: 'Type a message…', conv_you: 'You', conv_them: 'Contact',
      contact_title: 'Contact us',
      contact_topic: 'Subject', contact_topic_0: 'Choose a topic', contact_calc: 'Calculator / survey question', contact_account: 'Account and sign-up',
      contact_spec: 'Specialist directory', contact_partner: 'Partnership', contact_other: 'Other', contact_your_email: 'Your email',
      contact_message: 'Message', contact_body_ph: 'Briefly describe your request', contact_fill: 'Fill in all fields.',
      share_title: 'BusinessKlar calculation', share_loading: 'Loading…', share_err_token: 'Link invalid or expired.',
      share_err_load: 'Calculation not found or access disabled.', share_lf: 'Legal form', share_act: 'Activity', share_city: 'City',
      share_r1: 'Revenue (year 1)', share_exp: 'Monthly expenses', share_cta: 'Create your own calculation in BusinessKlar',
      bs_gate_title: 'Sign in required', bs_gate_text: 'Specialist profile is available after registration.', bs_gate_link: 'Home',
      bs_title: 'Specialist profile', bs_lead: 'Application for the directory. After review, status becomes published.',
      bs_l_display: 'Name / how to address you', bs_l_company: 'Company', bs_l_cities: 'Cities (main city first)', bs_cities_ph: 'Berlin, Munich',
      bs_hint_cities: 'Comma-separated', bs_l_langs: 'Languages', bs_l_cats: 'Categories', bs_l_services: 'Services (short, comma-separated)',
      bs_services_ph: 'Tax advice, annual accounts', bs_l_desc: 'Description', bs_l_email: 'Email for clients', bs_l_phone: 'Phone',
      bs_submit: 'Submit for review', bs_err_lang: 'Select at least one language', bs_err_cat: 'Select at least one category',
      bs_err_save: 'Save failed', bs_success: 'Application saved. Open the specialist dashboard.',
      bs_has_profile: 'You already have a specialist profile.', bs_open_sd: 'Open specialist dashboard', bs_review: 'Profile submitted for review.',
      sd_gate_title: 'Specialist dashboard', sd_gate_text: 'Sign in to continue.', sd_no_title: 'Specialist dashboard',
      sd_no_sub: 'No profile in the directory yet.', sd_cta: 'Create profile', sd_welcome: 'Specialist dashboard', sd_panel_p: 'My profile',
      sd_edit: 'Edit', sd_edit_note: '(soon: dedicated form)', sd_leads: 'Incoming leads', sd_stub_leads: 'Placeholder: leads will appear here after CRM integration.',
      sd_chat: 'Conversations', sd_chat_desc: 'Chats with BusinessKlar users.', sd_open_inbox: 'Open messages', sd_status: 'Profile status',
      sd_pub_yes: 'published', sd_pub_no: 'not in directory', sd_verified: ', verified', sd_profile_fallback: 'Specialist profile',
      lang_de: 'DE', lang_ru: 'RU', lang_en: 'EN', lang_uk: 'UK', lang_pl: 'PL', lang_ro: 'RO', lang_tr: 'TR', lang_es: 'ES',
      bcat_tax: 'Tax', bcat_acc: 'Accounting', bcat_ins: 'Insurance', bcat_legal: 'Legal'
    },
    ru: {
      nav_home: 'Главная', nav_specialists: 'Специалисты', nav_contact: 'Контакт', nav_dashboard: 'Кабинет', nav_logout: 'Выйти',
      nav_spec_dash: 'Кабинет специалиста', nav_inbox: 'Сообщения', nav_for_spec: 'Для специалистов',
      dash_title: 'Личный кабинет', dash_hello: 'Здравствуйте', dash_gate_title: 'Вход в кабинет', dash_gate_text: 'Чтобы видеть сохранённые расчёты, войдите в BusinessKlar.',
      dash_gate_link: 'На главную', dash_welcome_sub: 'Сохранённые расчёты из облака. PDF и ссылка «поделиться» доступны здесь.',
      dash_load_err: 'Не удалось загрузить список. Проверьте политики RLS в Supabase.',
      dash_empty_title: 'У вас пока нет сохранённых расчётов', dash_empty_body: 'Пройдите опрос на главной и нажмите «Сохранить расчёт» в блоке «Ваш следующий шаг».',
      dash_empty_link: 'Перейти к расчёту', dash_created: 'Создан:', dash_open: 'Открыть', dash_pdf: 'PDF', dash_share: 'Поделиться', dash_delete: 'Удалить',
      dash_share_title: 'Ссылка для просмотра', dash_copy: 'Копировать', dash_close: 'Закрыть', dash_copied: 'Скопировано', dash_copy_prompt: 'Копируйте:',
      dash_share_fail: 'Не удалось получить ссылку. Проверьте права в Supabase.',
      dash_del_confirm: 'Удалить этот расчёт безвозвратно?', dash_del_fail: 'Не удалось удалить. Нужна политика DELETE в Supabase для business_cases.',
      dash_err_title: 'Ошибка', dash_err_text: 'Не удалось загрузить кабинет.', dash_case_default: 'Расчёт',
      dash_st_done: 'Расчёт готов', dash_st_draft: 'Черновик', dash_st_saved: 'Сохранено',
      dash_loading: 'Загрузка…', dash_updated: 'Обновлено:', dash_toast_copied: 'Скопировано в буфер.',
      dash_confirm_del_title: 'Удалить расчёт?', dash_confirm_del_ok: 'Удалить', dash_confirm_del_cancel: 'Отмена',
      authtablogin: 'Вход', authtabreg: 'Регистрация', authlogin: 'Войти', authreg: 'Зарегистрироваться',
      auth_email_label: 'Email', auth_email_ph: 'ваш@email.ru',
      guestclose: 'Закрыть', authmbtn: 'Продолжить', auth_email_required: 'Укажите email и пароль.',
      auth_password_required: 'Укажите пароль.',
      auth_err_generic: 'Не удалось войти. Попробуйте снова.',
      auth_err_network: 'Ошибка сети. Проверьте подключение и попробуйте снова.',
      auth_err_invalid_creds: 'Неверный email или пароль.',
      auth_err_email_not_confirmed: 'Email не подтверждён. Проверьте почту.',
      auth_err_user_exists: 'Этот email уже зарегистрирован.',
      auth_err_weak_password: 'Пароль слишком короткий (минимум 8 символов).',
      auth_err_session: 'Сессия не создана. Войдите снова.',
      auth_success_signed_in: 'Вы вошли в аккаунт.',
      auth_success_signed_up: 'Аккаунт создан.',
      auth_success_password_changed: 'Пароль изменён. Войдите с новым паролем.',
      auth_info_check_email: 'Подтвердите email — мы отправили письмо.',
      auth_err_invalid_recovery_link: 'Ссылка недействительна или устарела.',
      email_not_configured: 'Отправка почты не настроена на сервере.',
      signup_confirm_de: 'Аккаунт создан. Подтвердите email — затем войдите.',
      auth_forgot_link: 'Забыли пароль?', auth_back_login: 'Назад ко входу', auth_forgot_mode: 'Отправить ссылку',
      auth_forgot_hint: 'Мы отправим ссылку на email, если аккаунт существует.',
      pw_reset_sent: 'Ссылка для сброса отправлена. Проверьте почту и спам.',
      pw_reset_err: 'Не удалось отправить письмо.',
      dash_gate_intro: 'Войдите, чтобы видеть сохранённые расчёты, PDF и ссылки.',
      recovery_checking_link: 'Проверяем ссылку…',
      recovery_title: 'Новый пароль', recovery_lead: 'Придумайте надёжный пароль (не менее 8 символов).',
      recovery_new_pw: 'Новый пароль', recovery_repeat_pw: 'Повторите пароль', recovery_submit: 'Сохранить пароль',
      recovery_go_dashboard: 'В кабинет', recovery_success_title: 'Пароль обновлён', recovery_success_body: 'Теперь можно войти.',
      recovery_go_login: 'На главную / вход', recovery_link_bad_title: 'Ссылка недействительна или устарела',
      recovery_link_bad_body: 'Запросите новую ссылку через «Забыли пароль».', recovery_go_home: 'На главную',
      recovery_err_mismatch: 'Пароли не совпадают.', recovery_err_update: 'Не удалось сохранить пароль.',
      contact_lead: 'Сообщение команде — запрос сохраняется безопасно.',
      contact_submit: 'Отправить', contact_note: 'Мы ответим на email. Отдельный почтовый клиент не нужен.',
      contact_sending: 'Отправка…', contact_sent: 'Спасибо! Сообщение отправлено.',
      support_success_message_sent: 'Спасибо! Сообщение отправлено.',
      contact_err: 'Не удалось отправить. Попробуйте позже.',
      sh_title: 'Специалисты для вашего бизнеса', sh_intro: 'Выберите направление — откроется каталог в этой категории.',
      sh_helper: 'Каталог специалистов для запуска и ведения бизнеса в Германии', sh_gate_title: 'Каталог для зарегистрированных пользователей',
      sh_gate_text: 'Чтобы просматривать каталог специалистов, войдите или зарегистрируйтесь в BusinessKlar (пройдите опрос и сохраните расчёт).', sh_gate_link: 'Перейти в BusinessKlar',
      sh_city: 'Ваш город:', cat_tax: 'Налоговые консультанты', cat_acc: 'Бухгалтеры', cat_ins: 'Страховые агенты', cat_legal: 'Юридическая консультация',
      catd_tax: 'Налоги, Finanzamt, отчётность', catd_acc: 'Бухгалтерия для ИП и компаний', catd_ins: 'Защита бизнеса и страховки', catd_legal: 'Договоры, регистрация, право',
      spec_title: 'Каталог специалистов', spec_sub_all: 'Все категории', spec_sub_cat: 'Категория:',
      spec_gate_title: 'Каталог для зарегистрированных пользователей', spec_gate_text: 'Чтобы просматривать каталог специалистов, войдите или зарегистрируйтесь в BusinessKlar.',
      spec_gate_link: 'Перейти в BusinessKlar',
      spec_demo: 'Показаны демонстрационные карточки. Добавьте записи в таблицу consultants в Supabase, чтобы видеть реальных специалистов.',
      spec_empty_intro: 'По выбранным фильтрам специалистов нет. Вернитесь на',
      spec_empty_cat: 'В этой категории пока нет специалистов в базе. Выберите другую категорию на', spec_home_link: 'главной странице каталога',
      spec_filter_city: 'Город', spec_all: 'Все', spec_lang: 'Язык', spec_lang_all: 'Все', spec_lang_de: 'DE',
      spec_lang_ru: 'RU', spec_lang_en: 'EN', spec_match: 'Подходит вам',
      spec_langs: 'Языки:', spec_cats: 'Категории:', spec_email: 'Email', spec_write: 'Написать', spec_more: 'Подробнее', spec_desc_ph: 'Описание появится после заполнения профиля.',
      spec_phone: 'Тел.:', spec_chat_na: 'Чат с этим специалистом недоступен.', spec_conv_err: 'Не удалось создать диалог',
      spec_part_err: 'Не удалось добавить участников', spec_client: 'Клиент BusinessKlar', spec_spec_prefix: 'Специалист:',
      inbox_title: 'Сообщения', inbox_gate: 'Войдите, чтобы видеть переписки.', inbox_home: 'На главную',
      inbox_refresh: 'Обновить', inbox_empty: 'Пока нет диалогов. Напишите специалисту из каталога.',
      inbox_load_err: 'Не удалось загрузить диалоги.', inbox_client: 'Специалист:', inbox_spec: 'Клиент BusinessKlar',
      inbox_last: 'Последнее сообщение:', inbox_no_msg: 'Нет сообщений',
      conv_title: 'Диалог', conv_back: '← Сообщения', conv_refresh: 'Обновить', conv_no_access: 'Нет доступа к диалогу.',
      conv_need_login: 'Нужен вход или неверная ссылка.', conv_not_found: 'Диалог не найден.', conv_send: 'Отправить',
      conv_hide: 'Скрыть у меня', conv_hide_confirm: 'Скрыть диалог только у вас? У собеседника он останется.',
      conv_placeholder: 'Текст сообщения…', conv_you: 'Вы', conv_them: 'Собеседник',
      contact_title: 'Связаться с нами',
      contact_topic: 'Тема обращения', contact_topic_0: 'Выберите тему', contact_calc: 'Вопрос по калькулятору / опросу', contact_account: 'Аккаунт и регистрация',
      contact_spec: 'Каталог специалистов', contact_partner: 'Сотрудничество', contact_other: 'Другое', contact_your_email: 'Ваш email',
      contact_message: 'Сообщение', contact_body_ph: 'Кратко опишите запрос', contact_fill: 'Заполните все поля.',
      share_title: 'Расчёт BusinessKlar', share_loading: 'Загрузка…', share_err_token: 'Ссылка неверна или устарела.',
      share_err_load: 'Расчёт не найден или доступ отключён.', share_lf: 'Правовая форма', share_act: 'Вид деятельности', share_city: 'Город',
      share_r1: 'Оборот (год 1)', share_exp: 'Расходы в месяц', share_cta: 'Сделать свой расчёт в BusinessKlar',
      bs_gate_title: 'Нужен вход', bs_gate_text: 'Заполнение профиля специалиста доступно после регистрации.', bs_gate_link: 'На главную BusinessKlar',
      bs_title: 'Профиль специалиста', bs_lead: 'Заявка на размещение в каталоге. После проверки статус сменится на «опубликовано».',
      bs_l_display: 'Имя / как к вам обращаться', bs_l_company: 'Компания', bs_l_cities: 'Города (основной — первый)', bs_cities_ph: 'Berlin, München',
      bs_hint_cities: 'Через запятую', bs_l_langs: 'Языки', bs_l_cats: 'Категории', bs_l_services: 'Услуги (коротко, через запятую)',
      bs_services_ph: 'Steuerberatung, Jahresabschluss', bs_l_desc: 'Описание', bs_l_email: 'Email для клиентов', bs_l_phone: 'Телефон',
      bs_submit: 'Отправить на проверку', bs_err_lang: 'Выберите хотя бы один язык', bs_err_cat: 'Выберите хотя бы одну категорию',
      bs_err_save: 'Ошибка сохранения', bs_success: 'Заявка сохранена. Откройте кабинет специалиста.',
      bs_has_profile: 'У вас уже есть профиль специалиста.', bs_open_sd: 'Открыть кабинет специалиста', bs_review: 'Профиль отправлен на проверку (review).',
      sd_gate_title: 'Вход в кабинет специалиста', sd_gate_text: 'Войдите в BusinessKlar, чтобы продолжить.', sd_no_title: 'Кабинет специалиста',
      sd_no_sub: 'Профиль в каталоге ещё не создан.', sd_cta: 'Заполнить профиль специалиста', sd_welcome: 'Кабинет специалиста', sd_panel_p: 'Мой профиль',
      sd_edit: 'Редактировать', sd_edit_note: '(скоро: отдельная форма)', sd_leads: 'Входящие обращения', sd_stub_leads: 'Заглушка: заявки и лиды появятся здесь после подключения CRM.',
      sd_chat: 'Переписка', sd_chat_desc: 'Диалоги с клиентами BusinessKlar.', sd_open_inbox: 'Открыть сообщения', sd_status: 'Статус профиля',
      sd_pub_yes: 'опубликован', sd_pub_no: 'не в каталоге', sd_verified: ', верифицирован', sd_profile_fallback: 'Профиль специалиста',
      lang_de: 'DE', lang_ru: 'RU', lang_en: 'EN', lang_uk: 'UK', lang_pl: 'PL', lang_ro: 'RO', lang_tr: 'TR', lang_es: 'ES',
      bcat_tax: 'Налоги', bcat_acc: 'Бухгалтерия', bcat_ins: 'Страхование', bcat_legal: 'Право'
    }
  };

  // Fill missing langs from en (single-language fallback per key)
  SUPPORTED.forEach(function (lc) {
    if (!STR[lc]) STR[lc] = {};
  });
  SUPPORTED.forEach(function (lc) {
    if (lc === 'de' || lc === 'en' || lc === 'ru') return;
    var base = STR.en;
    var keys = Object.keys(base);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (STR[lc][k] == null || STR[lc][k] === '') STR[lc][k] = base[k];
    }
  });

  function t(key) {
    var lang = getLang();
    var order = [lang, 'en', 'de'];
    for (var i = 0; i < order.length; i++) {
      var L = STR[order[i]];
      if (L && L[key]) return L[key];
    }
    return key;
  }

  function withLang(href) {
    try {
      var u = new URL(href, window.location.href);
      u.searchParams.set('lang', getLang());
      return u.pathname + u.search + u.hash;
    } catch (e) {
      return href + (href.indexOf('?') >= 0 ? '&' : '?') + 'lang=' + encodeURIComponent(getLang());
    }
  }

  function applyDocumentLang() {
    document.documentElement.lang = getLang();
  }

  function init() {
    persistLangFromUrl();
    applyDocumentLang();
  }

  global.BK_SAT = {
    SUPPORTED: SUPPORTED,
    getLang: getLang,
    norm: norm,
    t: t,
    init: init,
    withLang: withLang
  };
})(typeof window !== 'undefined' ? window : this);
