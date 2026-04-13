/**
 * BusinessKlar — compliance / GewO / Kammern (informational, not legal advice).
 * Localized strings: compliance-locales.js (__BK_COMPLIANCE_I18N). Official German terms preserved in copy.
 */
(function (global) {
  'use strict';

  var I18N = global.__BK_COMPLIANCE_I18N;
  function uiLang(ctx) {
    return I18N ? I18N.norm(ctx && ctx.currentLang) : 'en';
  }
  function uiStrings(lang) {
    return I18N ? I18N.ui(lang) : {};
  }
  function ruleStrings(key, lang) {
    if (!I18N || !I18N.RULES[key]) return null;
    var r = I18N.RULES[key][lang] || I18N.RULES[key].en || I18N.RULES[key].de;
    return r;
  }
  function blLabel(code, lang) {
    if (I18N && I18N.blName) return I18N.blName(code, lang);
    return code;
  }

  var OFFICIAL_FALLBACKS = {
    ihkOrganisationFinder: 'https://www.ihk.de/ueber-uns/organisation/ihk-organisationfinder-3183308',
    handwerkZdh: 'https://www.handwerk.de/',
    anerkennungInDeutschland: 'https://www.anerkennung-in-deutschland.de/',
    bafinVersicherungsvermittler: 'https://www.bafin.de/DE/Aufsicht/Intermediaries/Versicherungsvermittler/versicherungsvermittler_node.html',
    bafin34f: 'https://www.bafin.de/DE/Aufsicht/Intermediaries/Finanzanlagenvermittler/finanzanlagenvermittler_node.html',
    gewo: 'https://www.gesetze-im-internet.de/gewo/',
    ihkBayern: 'https://www.ihk.de/bayern',
    serviceBund: 'https://www.service-bund.de/Service/DE/Home/home_node.html',
    zollGewerbe: 'https://www.zoll.de/DE/Fachthemen/Verbrauchsteuern/Gaststaettenerlaubnis/gaststaettenerlaubnis_node.html'
  };

  var CITY_TO_BL = (typeof global.CITY_TO_BL !== 'undefined' && global.CITY_TO_BL && Object.keys(global.CITY_TO_BL).length)
    ? global.CITY_TO_BL
    : {};

  var CITY_AUTHORITY_MAP = (typeof global.CITY_AUTHORITY_MAP !== 'undefined' && global.CITY_AUTHORITY_MAP)
    ? global.CITY_AUTHORITY_MAP
    : {};

  var activityComplianceRules = [
    { key: 'steuerberatung', keywords: ['steuerberatung', 'steuerberater', 'steuerbüro', 'tax advisor', 'налоговый консультант', 'стеуербератунг'], severity: 'high', requires_license: true, requires_registration: true, requires_degree: true, requires_recognition: false, requires_meisterbrief: false, authority_type: 'STB_Kammer', link_override: null },
    { key: 'wirtschaftspruefung', keywords: ['wirtschaftsprüfung', 'wp', 'abschlussprüfer', 'аудит', 'бухгалтерская проверка'], severity: 'high', requires_license: true, requires_registration: true, requires_degree: true, requires_recognition: false, requires_meisterbrief: false, authority_type: 'WPK', link_override: null },
    { key: 'rechtsanwalt', keywords: ['rechtsanwalt', 'anwalt', 'kanzlei', 'advokat', 'адвокат', 'юрист', 'rechtsberatung'], severity: 'high', requires_license: true, requires_registration: true, requires_degree: true, requires_recognition: true, requires_meisterbrief: false, authority_type: 'RAK', link_override: null },
    { key: 'notar', keywords: ['notar', 'notariat', 'нотариус'], severity: 'high', requires_license: true, requires_registration: true, requires_degree: true, requires_recognition: false, requires_meisterbrief: false, authority_type: 'NOT', link_override: null },
    { key: 'medizin', keywords: ['arzt', 'ärztin', 'zahnarzt', 'klinik', 'praxis', 'therapie', 'pflege', 'аптека', 'врач', 'медицин'], severity: 'high', requires_license: true, requires_registration: true, requires_degree: true, requires_recognition: true, requires_meisterbrief: false, authority_type: 'LANDESPRAEF', link_override: null },
    { key: 'apotheke', keywords: ['apotheke', 'pharmazie', 'pharma', 'аптека'], severity: 'high', requires_license: true, requires_registration: true, requires_degree: true, requires_recognition: true, requires_meisterbrief: false, authority_type: 'GESUNDHEIT', link_override: null },
    { key: 'vers34d', keywords: ['versicherungsmakler', 'versicherung', '§34d', '34d', 'страховой агент', 'insurance intermediary'], severity: 'high', requires_license: true, requires_registration: true, requires_degree: false, requires_recognition: false, requires_meisterbrief: false, authority_type: 'BAFIN_IHK', link_override: 'bafinVersicherungsvermittler' },
    { key: 'fin34f', keywords: ['34f', '§34f', 'finanzanlagen', 'investment', 'vermittler', 'finanzinvest'], severity: 'high', requires_license: true, requires_registration: true, requires_degree: false, requires_recognition: false, requires_meisterbrief: false, authority_type: 'BAFIN_IHK', link_override: 'bafin34f' },
    { key: 'immob34c', keywords: ['immobilienmakler', 'makler', 'hausverwaltung', '34c', 'недвижимость', 'риэлтор'], severity: 'medium', requires_license: true, requires_registration: true, requires_degree: false, requires_recognition: false, requires_meisterbrief: false, authority_type: 'IHK', link_override: null },
    { key: 'immob34i', keywords: ['34i', '§34i', 'immobiliardarlehen', 'kreditvermittlung'], severity: 'high', requires_license: true, requires_registration: true, requires_degree: false, requires_recognition: false, requires_meisterbrief: false, authority_type: 'IHK', link_override: null },
    { key: 'sicher34a', keywords: ['sicherheitsdienst', 'security', 'охрана', '34a'], severity: 'medium', requires_license: true, requires_registration: true, requires_degree: false, requires_recognition: false, requires_meisterbrief: false, authority_type: 'IHK', link_override: null },
    { key: 'transport', keywords: ['taxi', 'mietwagen', 'personenbeförderung', 'omnibus', 'lkw', 'führerschein', 'перевозки', 'такси'], severity: 'medium', requires_license: true, requires_registration: true, requires_degree: false, requires_recognition: false, requires_meisterbrief: false, authority_type: 'TAXI_OR_STRASSEN', link_override: null },
    { key: 'gastro_alk', keywords: ['gaststätte', 'restaurant', 'alkohol', 'ausschank', 'schankwirtschaft', 'ресторан', 'алкоголь'], severity: 'medium', requires_license: true, requires_registration: true, requires_degree: false, requires_recognition: false, requires_meisterbrief: false, authority_type: 'ORDNUNG', link_override: 'zollGewerbe' },
    { key: 'handwerk_a', keywords: ['handwerk', 'meister', 'handwerksrolle', 'elektriker', 'sanitär', 'tischler', 'handwerkskarte'], severity: 'high', requires_license: true, requires_registration: true, requires_degree: true, requires_recognition: true, requires_meisterbrief: true, authority_type: 'HWK', link_override: null },
    { key: 'handwerk_b', keywords: ['anlage b', 'handwerksähnlich', 'bodenleger', 'schilder'], severity: 'medium', requires_license: false, requires_registration: true, requires_degree: false, requires_recognition: false, requires_meisterbrief: false, authority_type: 'HWK', link_override: null },
    { key: 'buchhaltung_eu', keywords: ['buchhaltung', 'buchhalter', 'lohnbuchhaltung', 'финбух', 'бухгалтерия'], severity: 'medium', requires_license: false, requires_registration: true, requires_degree: false, requires_recognition: false, requires_meisterbrief: false, authority_type: 'IHK', link_override: null },
    { key: 'lehrer_reg', keywords: ['lehrer', 'erzieher', 'kita-leitung', 'schule', 'ausbildung'], severity: 'medium', requires_license: false, requires_registration: false, requires_degree: true, requires_recognition: true, requires_meisterbrief: false, authority_type: 'LAND', link_override: null },
    { key: 'it_low_risk', keywords: ['software', 'webdesign', 'übersetzung', 'marketing', 'programmier', 'entwickler', 'it-dienst'], severity: 'info', requires_license: false, requires_registration: true, requires_degree: false, requires_recognition: false, requires_meisterbrief: false, authority_type: 'GEWERBE', link_override: null }
  ];

  var fallbackComplianceSignals = [
    { keywords: ['medizin', 'arzt', 'pflege', 'therapie', 'zahn'], bucket: 'med' },
    { keywords: ['finanz', 'invest', 'kredit', 'versicherung'], bucket: 'fin' },
    { keywords: ['steuer', 'buchhaltung', 'bilanz'], bucket: 'tax' },
    { keywords: ['recht', 'anwalt', 'notar'], bucket: 'law' },
    { keywords: ['bau', 'bauunternehmen', 'handwerk', 'sanitär', 'elektro', 'строитель'], bucket: 'craft' },
    { keywords: ['sicherheit', 'security', 'bewachung'], bucket: 'sec' },
    { keywords: ['transport', 'taxi', 'spedition'], bucket: 'trans' },
    { keywords: ['bildung', 'lehrer', 'ausbildung'], bucket: 'edu' },
    { keywords: ['immobilien', 'makler'], bucket: 're' },
    { keywords: ['steuerberatung', 'wirtschaftsprüfung'], bucket: 'taxpro' }
  ];

  function normalizeActivityText(t) {
    return String(t || '').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function detectComplianceRules(activityKey, activityText, extras) {
    var text = normalizeActivityText((activityText || '') + ' ' + String(activityKey || ''));
    var matched = [];
    activityComplianceRules.forEach(function (rule) {
      var hit = rule.keywords.some(function (kw) { return text.indexOf(kw) >= 0; });
      if (hit) matched.push(rule);
    });
    var severityOrder = { high: 0, medium: 1, info: 2 };
    matched.sort(function (a, b) {
      return (severityOrder[a.severity] || 9) - (severityOrder[b.severity] || 9);
    });
    return matched;
  }

  function detectFallbackWarning(activityText, activityKey) {
    var text = normalizeActivityText((activityText || '') + ' ' + String(activityKey || ''));
    for (var i = 0; i < fallbackComplianceSignals.length; i++) {
      var s = fallbackComplianceSignals[i];
      if (s.keywords.some(function (kw) { return text.indexOf(kw) >= 0; })) {
        return true;
      }
    }
    return false;
  }

  function resolveAuthorities(cityName, stateCode, matchedRules, lang) {
    var U = uiStrings(lang);
    var hasHigh = matchedRules.some(function (r) { return r.severity === 'high'; });
    var stLabel = stateCode ? blLabel(stateCode, lang) : null;
    var ca = (cityName && CITY_AUTHORITY_MAP[cityName]) ? CITY_AUTHORITY_MAP[cityName] : null;

    var ihkFb = OFFICIAL_FALLBACKS.ihkOrganisationFinder;
    var hwkFb = OFFICIAL_FALLBACKS.handwerkZdh;
    var anUrl = OFFICIAL_FALLBACKS.anerkennungInDeutschland;
    var bundPortal = OFFICIAL_FALLBACKS.serviceBund;

    var organs = [];

    matchedRules.forEach(function (rule) {
      var primaryUrl = ihkFb;
      var linkNote = '';
      var linkExact = false;
      var linkTitleDe = '';
      var portalLabel = U.portal_fallback || '';
      var mapping = 'fallback';
      var extraHandwerk = '';
      var extraRecognition = '';

      var ov = rule.link_override;
      if (ov && OFFICIAL_FALLBACKS[ov]) {
        primaryUrl = OFFICIAL_FALLBACKS[ov];
        linkExact = false;
        linkNote = U.link_override || '';
        portalLabel = U.portal_fallback || portalLabel;
        mapping = 'override';
      } else if (rule.authority_type === 'HWK') {
        if (ca && ca.hwk) {
          primaryUrl = ca.hwk.url;
          linkTitleDe = ca.hwk.label_de;
          linkExact = !!ca.hwk.exact;
          mapping = 'city_pack';
        } else {
          primaryUrl = hwkFb;
          linkExact = false;
        }
        linkNote = linkExact ? (U.hwk_exact || '') : (U.hwk_fb || '');
        portalLabel = linkExact ? (U.portal_exact || '') : (U.portal_fallback || '');
      } else if (rule.authority_type === 'IHK' || rule.authority_type === 'BAFIN_IHK') {
        if (ca && ca.ihk) {
          primaryUrl = ca.ihk.url;
          linkTitleDe = ca.ihk.label_de;
          linkExact = !!ca.ihk.exact;
          mapping = 'city_pack';
        } else {
          primaryUrl = ihkFb;
          linkExact = false;
        }
        linkNote = linkExact ? (U.ihk_exact || '') : (U.ihk_fb || '');
        portalLabel = linkExact ? (U.portal_exact || '') : (U.portal_fallback || '');
      } else if (rule.authority_type === 'GEWERBE') {
        if (ca && ca.gewerbe) {
          primaryUrl = ca.gewerbe.url;
          linkTitleDe = ca.gewerbe.label_de;
          linkExact = !!ca.gewerbe.exact;
          mapping = 'city_pack';
        } else {
          primaryUrl = bundPortal;
          linkExact = false;
        }
        linkNote = linkExact ? (U.gew_exact || '') : (U.gew_fb || '');
        portalLabel = linkExact ? (U.portal_exact || '') : (U.portal_fallback || '');
      } else if (rule.authority_type === 'NOT' || rule.authority_type === 'RAK' || rule.authority_type === 'LANDESPRAEF' ||
          rule.authority_type === 'GESUNDHEIT' || rule.authority_type === 'LAND' || rule.authority_type === 'STB_Kammer' ||
          rule.authority_type === 'WPK') {
        primaryUrl = anUrl;
        linkExact = false;
        linkNote = U.anerk || '';
        portalLabel = U.portal_fallback || '';
        mapping = 'anerkennung';
      } else if (rule.authority_type === 'TAXI_OR_STRASSEN') {
        if (ca && ca.gewerbe) {
          primaryUrl = ca.gewerbe.url;
          linkTitleDe = ca.gewerbe.label_de;
          linkExact = !!ca.gewerbe.exact;
          mapping = 'city_pack';
        } else {
          primaryUrl = bundPortal;
          linkExact = false;
        }
        linkNote = linkExact ? (U.taxi_exact || '') : (U.taxi_fb || '');
        portalLabel = linkExact ? (U.portal_exact || '') : (U.portal_fallback || '');
      } else if (rule.authority_type === 'ORDNUNG') {
        if (ca && ca.gewerbe) {
          primaryUrl = ca.gewerbe.url;
          linkTitleDe = ca.gewerbe.label_de;
          linkExact = !!ca.gewerbe.exact;
          mapping = 'city_pack';
        } else {
          primaryUrl = bundPortal;
          linkExact = false;
        }
        linkNote = linkExact ? (U.ord_exact || '') : (U.ord_fb || '');
        portalLabel = linkExact ? (U.portal_exact || '') : (U.portal_fallback || '');
      } else {
        if (ca && ca.ihk) {
          primaryUrl = ca.ihk.url;
          linkTitleDe = ca.ihk.label_de;
          linkExact = !!ca.ihk.exact;
          mapping = 'city_pack';
        } else {
          primaryUrl = ihkFb;
          linkExact = false;
        }
        linkNote = linkExact ? (U.def_exact || '') : (U.def_fb || '');
        portalLabel = linkExact ? (U.portal_exact || '') : (U.portal_fallback || '');
      }

      if (rule.authority_type === 'HWK') {
        if (rule.key === 'handwerk_a' || (rule.requires_meisterbrief && rule.key !== 'handwerk_b')) {
          extraHandwerk = U.hand_a || '';
        } else if (rule.key === 'handwerk_b') {
          extraHandwerk = U.hand_b || '';
        }
      }

      if (rule.requires_recognition) {
        if (mapping === 'anerkennung') {
          extraRecognition = U.recog_an || '';
        } else {
          extraRecognition = U.recog_gen || '';
        }
      }

      var rs = ruleStrings(rule.key, lang);
      var authLine = rs ? (rs.auth + (stLabel ? ' — ' + stLabel : '')) : '';

      organs.push({
        rule: rule,
        ruleText: rs,
        authority_label: authLine,
        url: primaryUrl,
        link_note: linkNote,
        link_title_de: linkTitleDe,
        portal_label: portalLabel,
        link_exact: linkExact,
        mapping: mapping,
        extra_handwerk: extraHandwerk,
        extra_recognition: extraRecognition,
        fallback_disclaimer: U.fallback_disclaimer || ''
      });
    });

    return { organs: organs, stateLabel: stLabel, stateCode: stateCode, hasHigh: hasHigh };
  }

  function escHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function renderComplianceSection(ctx) {
    if (!I18N) return '';

    var lang = uiLang(ctx);
    var U = uiStrings(lang);

    var d = ctx.surveyData || {};
    var actKey = ctx.activityKey || d.activity || 'other';
    var actText = d.activity_text || '';
    var city = String(d.city_name || d.city || '').trim();
    var stateCode = city ? (CITY_TO_BL[city] || null) : null;
    var rules = detectComplianceRules(actKey, actText, d.extras);
    var fb = detectFallbackWarning(actText, actKey);
    var resolved = resolveAuthorities(city, stateCode, rules.length ? rules : [], lang);

    var html = '<div class="rpt-sec-h compliance-h">⚖️ ' + escHtml(U.section_title || '') + '</div>';
    html += '<div class="compliance-wrap">';

    html += '<p class="comp-legal">' + escHtml(U.legal_intro || '') + ' ' +
      (stateCode ? escHtml(blLabel(stateCode, lang)) : escHtml(U.legal_unknown || '')) +
      '</p>';

    if (!rules.length && fb) {
      html += '<div class="comp-card comp-sev-medium">';
      html += '<div class="comp-sev-badge">' + escHtml(U.fb_sensitive_title || '') + '</div>';
      html += '<p>' + escHtml(U.fb_sensitive_body || '') + '</p>';
      html += '<p><a href="' + escHtml(OFFICIAL_FALLBACKS.ihkOrganisationFinder) + '" target="_blank" rel="noopener">IHK Organisationfinder</a> · ';
      html += '<a href="' + escHtml(OFFICIAL_FALLBACKS.handwerkZdh) + '" target="_blank" rel="noopener">handwerk.de</a> · ';
      html += '<a href="' + escHtml(OFFICIAL_FALLBACKS.anerkennungInDeutschland) + '" target="_blank" rel="noopener">Anerkennung in Deutschland</a></p>';
      html += '</div>';
    }

    if (!rules.length && !fb) {
      html += '<div class="comp-card comp-sev-info">';
      html += '<div class="comp-sev-badge">' + escHtml(U.no_match_title || '') + '</div>';
      html += '<p>' + escHtml(U.no_match_body || '') + '</p>';
      html += '<p><a href="' + escHtml(OFFICIAL_FALLBACKS.ihkOrganisationFinder) + '" target="_blank" rel="noopener">IHK Organisationfinder</a> · ';
      html += '<a href="' + escHtml(OFFICIAL_FALLBACKS.serviceBund) + '" target="_blank" rel="noopener">service-bund.de</a></p>';
      html += '</div>';
    }

    resolved.organs.forEach(function (o) {
      var r = o.rule;
      var rt = o.ruleText || {};
      var sevClass = r.severity === 'high' ? 'comp-sev-high' : (r.severity === 'medium' ? 'comp-sev-medium' : 'comp-sev-info');
      var badge = r.severity === 'high' ? (U.sev_high || '') : (r.severity === 'medium' ? (U.sev_med || '') : (U.sev_info || ''));
      html += '<div class="comp-card ' + sevClass + '">';
      html += '<div class="comp-sev-badge">' + (r.severity === 'high' ? '⚠️ ' : '') + escHtml(badge) + '</div>';
      html += '<h4 class="comp-title">' + escHtml(rt.t || '') + '</h4>';
      html += '<p class="comp-msg"><strong>' + escHtml(U.lbl_what || '') + ':</strong> ' + escHtml(rt.msg || '') + '</p>';
      html += '<p><strong>' + escHtml(U.lbl_authority || '') + ':</strong> ' + escHtml(o.authority_label || '') + '</p>';
      if (o.extra_handwerk) {
        html += '<p class="comp-handwerk"><strong>' + escHtml(U.lbl_handwerk || '') + ':</strong> ' + escHtml(o.extra_handwerk) + '</p>';
      }
      if (o.extra_recognition) {
        html += '<p class="comp-recognition"><strong>' + escHtml(U.lbl_recognition || '') + ':</strong> ' + escHtml(o.extra_recognition) + '</p>';
      }
      html += '<p><strong>' + escHtml(U.lbl_may_need || '') + ':</strong> ' + escHtml(rt.docs || '') + '</p>';
      html += '<p class="comp-link"><strong>' + escHtml(o.portal_label || '') + ' (' + escHtml(U.lbl_link || '') + '):</strong> ';
      html += '<a href="' + escHtml(o.url) + '" target="_blank" rel="noopener">' + escHtml(o.url) + '</a>';
      if (o.link_title_de) {
        html += ' <span class="comp-auth-de">(' + escHtml(o.link_title_de) + ')</span>';
      }
      html += '<br><span class="comp-note">' + escHtml(o.link_note) + '</span></p>';
      if (!o.link_exact) {
        html += '<p class="comp-fallback-disclaimer">' + escHtml(o.fallback_disclaimer || '') + '</p>';
      }
      html += '<p><strong>' + escHtml(U.lbl_next || '') + ':</strong> ' + escHtml(rt.next || '') + '</p>';
      html += '<p class="comp-risk"><strong>' + escHtml(U.lbl_risk || '') + ':</strong> ' + escHtml(rt.risk || '') + '</p>';
      html += '<p class="comp-footnote">' + escHtml(U.lbl_legal || '') + ': ' + escHtml(rt.leg || '') + '</p>';
      html += '</div>';
    });

    if (rules.length && fb) {
      html += '<div class="comp-card comp-sev-info"><p>' + escHtml(U.extra_fb || '') + '</p></div>';
    }

    html += '</div>';
    return html;
  }

  var _authStats = (typeof global.__BK_AUTHORITY_STATS !== 'undefined' && global.__BK_AUTHORITY_STATS) ? global.__BK_AUTHORITY_STATS : {};
  var _stats = {
    uniqueCitiesInIndex: 246,
    cityBundeslandMapped: Object.keys(CITY_TO_BL).length,
    localChamberUrlExactCount: _authStats.localIhkExactCount != null ? _authStats.localIhkExactCount : 0,
    localIhkExactCount: _authStats.localIhkExactCount != null ? _authStats.localIhkExactCount : 0,
    localHwkExactCount: _authStats.localHwkExactCount != null ? _authStats.localHwkExactCount : 0,
    localGewerbeamtExactCount: _authStats.localGewerbeamtExactCount != null ? _authStats.localGewerbeamtExactCount : 0,
    fallbackOnlyCount: _authStats.fallbackOnlyCount != null ? _authStats.fallbackOnlyCount : 0,
    authorityResolution: 'city_registry_plus_official_fallbacks',
    officialFallbackKeys: Object.keys(OFFICIAL_FALLBACKS),
    complianceUiLangs: I18N ? I18N.SUPPORTED : []
  };

  global.OFFICIAL_FALLBACKS = OFFICIAL_FALLBACKS;
  global.activityComplianceRules = activityComplianceRules;
  global.fallbackComplianceSignals = fallbackComplianceSignals;
  global.CITY_TO_BL = CITY_TO_BL;
  global.normalizeActivityText = normalizeActivityText;
  global.detectComplianceRules = detectComplianceRules;
  global.detectFallbackWarning = detectFallbackWarning;
  global.resolveAuthorities = resolveAuthorities;
  global.renderComplianceSection = renderComplianceSection;
  global.__BK_COMPLIANCE_STATS = _stats;
  global.CITY_AUTHORITY_MAP = CITY_AUTHORITY_MAP;
})(typeof window !== 'undefined' ? window : this);
