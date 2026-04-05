/**
 * Compliance copy: official German terms stay in titles where needed; explanations are localized.
 * For languages without full rule paragraphs yet, English copy is used (single-language blocks).
 */
(function (global) {
  'use strict';

  var SUPPORTED = ['de', 'en', 'ru', 'uk', 'pl', 'ro', 'tr', 'es'];

  function norm(lang) {
    var l = (lang == null ? 'en' : String(lang)).toLowerCase().substring(0, 2);
    return SUPPORTED.indexOf(l) >= 0 ? l : 'en';
  }

  function pick(o, lang) {
    if (!o) return '';
    var n = norm(lang);
    return (o[n] != null && o[n] !== '') ? o[n] : (o.en || o.de || '');
  }

  /** Bundesland labels — official abbreviations kept; names localized. */
  var BL = {
    de: { BE: 'Berlin (Stadtstaat)', HH: 'Hamburg (Stadtstaat)', HB: 'Bremen (Stadtstaat)', BB: 'Brandenburg', NW: 'Nordrhein-Westfalen', NI: 'Niedersachsen', HE: 'Hessen', RP: 'Rheinland-Pfalz', BW: 'Baden-Württemberg', BY: 'Bayern', SL: 'Saarland', TH: 'Thüringen', SN: 'Sachsen', ST: 'Sachsen-Anhalt', MV: 'Mecklenburg-Vorpommern', SH: 'Schleswig-Holstein' },
    en: { BE: 'Berlin (city-state)', HH: 'Hamburg (city-state)', HB: 'Bremen (city-state)', BB: 'Brandenburg', NW: 'North Rhine-Westphalia', NI: 'Lower Saxony', HE: 'Hesse', RP: 'Rhineland-Palatinate', BW: 'Baden-Württemberg', BY: 'Bavaria', SL: 'Saarland', TH: 'Thuringia', SN: 'Saxony', ST: 'Saxony-Anhalt', MV: 'Mecklenburg-Vorpommern', SH: 'Schleswig-Holstein' },
    ru: { BE: 'Берлин (город-земля)', HH: 'Гамбург (город-земля)', HB: 'Бремен (город-земля)', BB: 'Бранденбург', NW: 'Северный Рейн-Вестфалия', NI: 'Нижняя Саксония', HE: 'Гессен', RP: 'Рейнланд-Пфальц', BW: 'Баден-Вюртемберг', BY: 'Бавария', SL: 'Саар', TH: 'Тюрингия', SN: 'Саксония', ST: 'Саксония-Анхальт', MV: 'Мекленбург-Передняя Померания', SH: 'Шлезвиг-Гольштейн' },
    uk: { BE: 'Берлін (місто-земля)', HH: 'Гамбург (місто-земля)', HB: 'Бремен (місто-земля)', BB: 'Бранденбург', NW: 'Північний Рейн-Вестфалія', NI: 'Нижня Саксонія', HE: 'Гессен', RP: 'Рейнланд-Пфальц', BW: 'Баден-Вюртемберг', BY: 'Баварія', SL: 'Саар', TH: 'Тюрінгія', SN: 'Саксонія', ST: 'Саксонія-Ангальт', MV: 'Мекленбург-Передня Померанія', SH: 'Шлезвіг-Гольштейн' },
    pl: { BE: 'Berlin (miasto-kraj związkowy)', HH: 'Hamburg', HB: 'Brema', BB: 'Brandenburgia', NW: 'Nadrenia Północna-Westfalia', NI: 'Dolna Saksonia', HE: 'Hesja', RP: 'Nadrenia-Palatynat', BW: 'Badenia-Wirtembergia', BY: 'Bawaria', SL: 'Saara', TH: 'Turyngia', SN: 'Saksonia', ST: 'Saksonia-Anhalt', MV: 'Meklemburgia-Pomorze Przednie', SH: 'Szlezwik-Holsztyn' },
    ro: { BE: 'Berlin (land-oraș)', HH: 'Hamburg', HB: 'Bremen', BB: 'Brandenburg', NW: 'Renania de Nord-Westfalia', NI: 'Saxonia Inferioară', HE: 'Hessa', RP: 'Rinland-Palatinat', BW: 'Baden-Württemberg', BY: 'Bavaria', SL: 'Saarland', TH: 'Turingia', SN: 'Saxonia', ST: 'Saxonia-Anhalt', MV: 'Mecklenburg-Pomerania Inferioară', SH: 'Schleswig-Holstein' },
    tr: { BE: 'Berlin (şehir eyaleti)', HH: 'Hamburg', HB: 'Bremen', BB: 'Brandenburg', NW: 'Kuzey Ren-Vestfalya', NI: 'Aşağı Saksonya', HE: 'Hessen', RP: 'Rhineland-Pfalz', BW: 'Baden-Württemberg', BY: 'Bavyera', SL: 'Saarland', TH: 'Türingen', SN: 'Saksonya', ST: 'Saksonya-Anhalt', MV: 'Mecklenburg-Vorpommern', SH: 'Schleswig-Holstein' },
    es: { BE: 'Berlín (ciudad-estado)', HH: 'Hamburgo', HB: 'Bremen', BB: 'Brandeburgo', NW: 'Renania del Norte-Westfalia', NI: 'Baja Sajonia', HE: 'Hesse', RP: 'Renania-Palatinado', BW: 'Baden-Wurtemberg', BY: 'Baviera', SL: 'Sarre', TH: 'Turingia', SN: 'Sajonia', ST: 'Sajonia-Anhalt', MV: 'Mecklemburgo-Pomerania Occidental', SH: 'Schleswig-Holstein' }
  };

  var UI = {
    de: {
      section_title: 'Anforderungen und Grenzen',
      legal_intro: 'Informationsüberblick, ersetzt keine Rechtsberatung. Bundesland laut Ort:',
      legal_unknown: 'nicht automatisch erkannt — prüfen Sie Ihren Ortsteil.',
      fb_sensitive_title: 'Hinweis',
      fb_sensitive_body: 'Für diese Tätigkeit können in Deutschland besondere Anforderungen gelten: Lizenz, Anmeldung, Anerkennung oder Kammermitgliedschaft. Prüfen Sie die zuständige IHK, Handwerkskammer oder Kammer bzw. die offiziellen Finder.',
      no_match_title: 'Hinweis',
      no_match_body: 'Zu Ihrer Beschreibung gibt es keine automatische Übereinstimmung mit den hinterlegten Profilen. Das heißt nicht, dass keine Lizenzen nötig sind — prüfen Sie GewO, Landesrecht und Kammern.',
      sev_high: 'Hohes Risiko',
      sev_med: 'Hinweis',
      sev_info: 'Info',
      lbl_what: 'Was wichtig ist',
      lbl_authority: 'Zuständigkeit (Erklärung)',
      lbl_handwerk: 'Handwerk',
      lbl_recognition: 'Anerkennung der Qualifikation',
      lbl_may_need: 'Mögliche Unterlagen / Voraussetzungen',
      lbl_next: 'Nächste Schritte',
      lbl_risk: 'Risiko',
      lbl_legal: 'Hinweis',
      lbl_link: 'Link',
      portal_exact: 'Ihre zuständige Stelle (offizielle Website)',
      portal_fallback: 'Offizieller Finder / Portal',
      fallback_disclaimer: 'Es wird ein allgemeines offizielles Portal oder Finder gezeigt; die genaue lokale Stelle hängt von Stadt und Bundesland (Ortsteil) ab — wählen Sie die Region auf der Website.',
      extra_fb: 'Zusätzlich: Die Beschreibung wirkt sensibel — prüfen Sie Anforderungen bei Kammer und Behörde.',
      link_override: 'Offizielle Informationsquelle der Aufsicht (Bund/Land).',
      hwk_exact: 'Regionale Handwerkskammer für Ihren Ort (offizielle Website).',
      hwk_fb: 'ZDH-Portal — wählen Sie die regionale HWK auf der Website.',
      ihk_exact: 'Regionale IHK für Ihren Ort (offizielle Website).',
      ihk_fb: 'IHK-Organisationfinder — Region auf dihk.de wählen.',
      gew_exact: 'Offizielles Stadt-/Landesportal (Gewerbe/Verwaltung).',
      gew_fb: 'Bundesportal — lokalen Gewerbeamt/Finanzamt prüfen.',
      anerk: 'Anerkennung in Deutschland — Beruf und Land wählen; für die Zulassung danach die Landesbehörde.',
      taxi_exact: 'Lokales Portal; Konzessionen/Genehmigungen bei Ordnungsamt/Straßenverkehrsbehörde.',
      taxi_fb: 'Allgemeines Portal; Transportgenehmigungen hängen von Art und Land ab.',
      ord_exact: 'Lokales Portal; Gaststättenkonzession/Anzeigen bei Gemeinde/Ordnungsamt.',
      ord_fb: 'Gemeinde/Ordnungsamt prüfen; zu Alkohol ggf. Bundesthemen auf zoll.de.',
      def_exact: 'Regionale IHK.',
      def_fb: 'IHK-Organisationfinder.',
      hand_a: 'Anlage A: Eintragung in die Handwerksrolle; Meisterbrief / Eintrag — Details bei Ihrer HWK.',
      hand_b: 'Anlage B (handwerksähnlich): je nach Beruf Anzeige bei der HWK; Berufsliste auf der regionalen Website.',
      recog_an: 'Ausländische Berufsqualifikation: Weg über Anerkennung in Deutschland, dann Landesbehörde der Kammer/Zulassung.',
      recog_gen: 'Bei ausländischer Qualifikation zusätzlich Gleichwertigkeit prüfen — siehe Anerkennung in Deutschland.'
    },
    en: {
      section_title: 'Requirements and limits',
      legal_intro: 'Information only, not legal advice. Federal state from city:',
      legal_unknown: 'not detected automatically — check your district (Ortsteil).',
      fb_sensitive_title: 'Notice',
      fb_sensitive_body: 'This activity may need licences, registration, recognition of qualifications, or chamber membership in Germany. Check the competent IHK, Handwerkskammer, or chamber, or use the official finders.',
      no_match_title: 'Notice',
      no_match_body: 'No automatic match to our stored profiles. That does not mean no licences apply — check GewO, state law, and chambers.',
      sev_high: 'High risk',
      sev_med: 'Notice',
      sev_info: 'Info',
      lbl_what: 'What matters',
      lbl_authority: 'Responsible body (explanation)',
      lbl_handwerk: 'Handwerk',
      lbl_recognition: 'Recognition of qualifications',
      lbl_may_need: 'Possible documents / requirements',
      lbl_next: 'Next steps',
      lbl_risk: 'Risk',
      lbl_legal: 'Note',
      lbl_link: 'Link',
      portal_exact: 'Your competent authority (official site)',
      portal_fallback: 'Official finder / portal',
      fallback_disclaimer: 'A general official portal or finder is shown; the exact local office depends on city and state (Ortsteil) — select the region on the site.',
      extra_fb: 'Also: your description looks sensitive — double-check requirements with the chamber and authority.',
      link_override: 'Official supervisory information source (federal/state).',
      hwk_exact: 'Regional Handwerkskammer for your city (official website).',
      hwk_fb: 'ZDH portal — select the regional HWK on the site.',
      ihk_exact: 'Regional IHK for your city (official website).',
      ihk_fb: 'IHK organisation finder — choose region on dihk.de.',
      gew_exact: 'Official city/state services portal (trade/admin).',
      gew_fb: 'Federal portal — confirm local Gewerbeamt/Finanzamt.',
      anerk: 'Anerkennung in Deutschland — pick profession and state; for licensing, then the state authority.',
      taxi_exact: 'Local portal; concessions/permits from Ordnungsamt/road traffic authority.',
      taxi_fb: 'General portal; transport permits depend on type and state.',
      ord_exact: 'Local portal; restaurant licence/notifications with municipality/Ordnungsamt.',
      ord_fb: 'Check municipality/Ordnungsamt; for alcohol see federal topics on zoll.de if needed.',
      def_exact: 'Regional IHK.',
      def_fb: 'IHK organisation finder.',
      hand_a: 'Anlage A: entry in Handwerksrolle; Meisterbrief / registration — confirm with your HWK.',
      hand_b: 'Anlage B (handwerk-like): depending on trade, notification to HWK; occupation list on the regional site.',
      recog_an: 'Foreign professional qualification: route via Anerkennung in Deutschland, then the state chamber/licensing body.',
      recog_gen: 'If your qualification is foreign, also check equivalence — see Anerkennung in Deutschland.'
    },
    ru: {
      section_title: 'Требования и ограничения',
      legal_intro: 'Информационный обзор, не заменяет консультацию юриста. Земля по городу:',
      legal_unknown: 'не определена автоматически — уточните для своего Ortsteil.',
      fb_sensitive_title: 'Внимание',
      fb_sensitive_body: 'Для этого вида деятельности в Германии могут действовать особые требования: лицензия, регистрация, признание квалификации или членство в палате. Проверьте zuständige IHK, Handwerkskammer или официальные finder.',
      no_match_title: 'Справка',
      no_match_body: 'По описанию нет явного совпадения с профилями. Это не значит, что лицензии не нужны — проверьте GewO, земельное право и палаты.',
      sev_high: 'Высокий риск',
      sev_med: 'Внимание',
      sev_info: 'Справка',
      lbl_what: 'Что важно',
      lbl_authority: 'Орган (пояснение)',
      lbl_handwerk: 'Handwerk',
      lbl_recognition: 'Признание квалификации',
      lbl_may_need: 'Что может потребоваться',
      lbl_next: 'Дальше',
      lbl_risk: 'Риск',
      lbl_legal: 'Примечание',
      lbl_link: 'Ссылка',
      portal_exact: 'Ваш zuständige орган (официальный сайт)',
      portal_fallback: 'Официальный finder / портал',
      fallback_disclaimer: 'Показан общий официальный портал или finder; точный местный орган зависит от города/земли (Ortsteil) — уточните на сайте выбора региона.',
      extra_fb: 'Дополнительно: описание похоже на чувствительную сферу — перепроверьте требования в камере и у регулятора.',
      link_override: 'Официальный источник надзора/информации (Bund/Landesstelle).',
      hwk_exact: 'Региональная Handwerkskammer для выбранного города (официальный сайт).',
      hwk_fb: 'Портал ZDH — выберите региональную HWK на сайте.',
      ihk_exact: 'Региональная IHK для выбранного города (официальный сайт).',
      ihk_fb: 'IHK-Organisationfinder — выберите регион на dihk.de.',
      gew_exact: 'Официальный городской/земельный портал услуг (Gewerbe/Verwaltung).',
      gew_fb: 'Федеральный портал — уточните локальный Gewerbeamt/Finanzamt.',
      anerk: 'Anerkennung in Deutschland — выбор профессии и земли; для допуска затем Landesbehörde.',
      taxi_exact: 'Локальный портал; разрешения — у Ordnungsamt/Straßenverkehrsbehörde.',
      taxi_fb: 'Общий портал; транспортные разрешения зависят от вида и земли.',
      ord_exact: 'Локальный портал; Gaststätte — в Gemeinde/Ordnungsamt.',
      ord_fb: 'Уточните Gemeinde/Ordnungsamt; алкоголь — при необходимости zoll.de.',
      def_exact: 'Региональная IHK.',
      def_fb: 'IHK-Organisationfinder.',
      hand_a: 'Anlage A: Handwerksrolle; Meisterbrief — уточняйте в HWK.',
      hand_b: 'Anlage B: по профессии Anzeige bei HWK; список на сайте HWK.',
      recog_an: 'Иностранное образование: маршрут через Anerkennung in Deutschland, затем Landesbehörde.',
      recog_gen: 'При иностранной квалификации проверьте Gleichwertigkeit — Anerkennung in Deutschland.'
    },
    uk: {
      section_title: 'Вимоги та обмеження',
      legal_intro: 'Інформаційний огляд, не замінює юридичну консультацію. Земля за містом:',
      legal_unknown: 'не визначено автоматично — уточніть Ortsteil.',
      fb_sensitive_title: 'Увага',
      fb_sensitive_body: 'Для цього виду діяльності в Німеччині можуть діяти ліцензія, реєстрація, визнання кваліфікації або членство в палаті. Перевірте IHK, Handwerkskammer або офіційні finder.',
      no_match_title: 'Довідка',
      no_match_body: 'Опис не збігся з профілями. Це не означає відсутність ліцензій — перевірте GewO, земельне право та палати.',
      sev_high: 'Високий ризик',
      sev_med: 'Увага',
      sev_info: 'Довідка',
      lbl_what: 'Що важливо',
      lbl_authority: 'Орган (пояснення)',
      lbl_handwerk: 'Handwerk',
      lbl_recognition: 'Визнання кваліфікації',
      lbl_may_need: 'Що може знадобитися',
      lbl_next: 'Далі',
      lbl_risk: 'Ризик',
      lbl_legal: 'Примітка',
      lbl_link: 'Посилання',
      portal_exact: 'Ваш уповноважений орган (офіційний сайт)',
      portal_fallback: 'Офіційний finder / портал',
      fallback_disclaimer: 'Показано загальний офіційний портал або finder; точний орган залежить від міста/землі — оберіть регіон на сайті.',
      extra_fb: 'Додатково: опис чутливий — перевірте вимоги в палаті та у регулятора.',
      link_override: 'Офіційне джерело нагляду (Bund/Land).',
      hwk_exact: 'Регіональна Handwerkskammer для вашого міста.',
      hwk_fb: 'Портал ZDH — оберіть HWK на сайті.',
      ihk_exact: 'Регіональна IHK для вашого міста.',
      ihk_fb: 'IHK-Organisationfinder — регіон на dihk.de.',
      gew_exact: 'Офіційний портал послуг міста/землі.',
      gew_fb: 'Федеральний портал — уточніть Gewerbeamt/Finanzamt.',
      anerk: 'Anerkennung in Deutschland — професія та земля; далі Landesbehörde.',
      taxi_exact: 'Локальний портал; дозволи — Ordnungsamt.',
      taxi_fb: 'Загальний портал; залежить від виду перевезень.',
      ord_exact: 'Локальний портал; Gaststätte — Gemeinde.',
      ord_fb: 'Gemeinde/Ordnungsamt; алкоголь — zoll.de.',
      def_exact: 'Регіональна IHK.',
      def_fb: 'IHK-Organisationfinder.',
      hand_a: 'Anlage A: Handwerksrolle; Meisterbrief — у HWK.',
      hand_b: 'Anlage B: Anzeige bei HWK за списком.',
      recog_an: 'Іноземна кваліфікація: Anerkennung in Deutschland, потім Landesbehörde.',
      recog_gen: 'Перевірте еквівалентність — Anerkennung in Deutschland.'
    },
    pl: {
      section_title: 'Wymagania i ograniczenia',
      legal_intro: 'Informacje, nie porada prawna. Kraj związkowy wg miasta:',
      legal_unknown: 'nie wykryto automatycznie — sprawdź Ortsteil.',
      fb_sensitive_title: 'Uwaga',
      fb_sensitive_body: 'Ta działalność może wymagać licencji, rejestracji, uznania kwalifikacji lub członkostwa w izbie. Sprawdź IHK, Handwerkskammer lub oficjalne findery.',
      no_match_title: 'Informacja',
      no_match_body: 'Brak dopasowania do profili. To nie znaczy brak licencji — sprawdź GewO, prawo landu i izby.',
      sev_high: 'Wysokie ryzyko',
      sev_med: 'Uwaga',
      sev_info: 'Informacja',
      lbl_what: 'Co ważne',
      lbl_authority: 'Organ (wyjaśnienie)',
      lbl_handwerk: 'Handwerk',
      lbl_recognition: 'Uznanie kwalifikacji',
      lbl_may_need: 'Możliwe dokumenty',
      lbl_next: 'Dalej',
      lbl_risk: 'Ryzyko',
      lbl_legal: 'Uwaga',
      lbl_link: 'Link',
      portal_exact: 'Właściwy organ (oficjalna strona)',
      portal_fallback: 'Oficjalny finder / portal',
      fallback_disclaimer: 'Pokazano ogólny portal; dokładny organ zależy od miasta i landu — wybierz region na stronie.',
      extra_fb: 'Dodatkowo: wrażliwy opis — zweryfikuj w izbie i u regulatora.',
      link_override: 'Oficjalne źródło nadzoru (Bund/Land).',
      hwk_exact: 'Regionalna Handwerkskammer dla miasta.',
      hwk_fb: 'Portal ZDH — wybierz HWK.',
      ihk_exact: 'Regionalna IHK dla miasta.',
      ihk_fb: 'IHK-Organisationfinder — region na dihk.de.',
      gew_exact: 'Portal miejski/krajowy.',
      gew_fb: 'Portal federalny — sprawdź Gewerbeamt/Finanzamt.',
      anerk: 'Anerkennung in Deutschland — zawód i land; potem Landesbehörde.',
      taxi_exact: 'Portal lokalny; zezwolenia u władz.',
      taxi_fb: 'Portal ogólny; zależy od rodzaju transportu.',
      ord_exact: 'Portal lokalny; gastronomia u gminy.',
      ord_fb: 'Gemeinde/Ordnungsamt; alkohol — zoll.de.',
      def_exact: 'Regionalna IHK.',
      def_fb: 'IHK-Organisationfinder.',
      hand_a: 'Anlage A: Handwerksrolle; Meisterbrief — w HWK.',
      hand_b: 'Anlage B: zgłoszenie do HWK wg listy.',
      recog_an: 'Kwalifikacje zagraniczne: Anerkennung in Deutschland, potem urząd.',
      recog_gen: 'Sprawdź równoważność — Anerkennung in Deutschland.'
    },
    ro: {
      section_title: 'Cerințe și limite',
      legal_intro: 'Informații, nu sfat juridic. Landul după oraș:',
      legal_unknown: 'nedetectat automat — verificați Ortsteil.',
      fb_sensitive_title: 'Atenție',
      fb_sensitive_body: 'Această activitate poate necesita licență, înregistrare, recunoaștere sau membru în cameră. Verificați IHK, Handwerkskammer sau finder-uri oficiale.',
      no_match_title: 'Informație',
      no_match_body: 'Fără potrivire automată. Nu înseamnă că nu sunt licențe — verificați GewO, dreptul landului.',
      sev_high: 'Risc ridicat',
      sev_med: 'Atenție',
      sev_info: 'Informație',
      lbl_what: 'Ce contează',
      lbl_authority: 'Autoritate (explicație)',
      lbl_handwerk: 'Handwerk',
      lbl_recognition: 'Recunoaștere calificare',
      lbl_may_need: 'Posibile documente',
      lbl_next: 'Pași următori',
      lbl_risk: 'Risc',
      lbl_legal: 'Notă',
      lbl_link: 'Link',
      portal_exact: 'Autoritatea competentă (site oficial)',
      portal_fallback: 'Finder / portal oficial',
      fallback_disclaimer: 'Se arată un portal general; organul exact depinde de oraș/land — selectați regiunea pe site.',
      extra_fb: 'În plus: descriere sensibilă — verificați la cameră.',
      link_override: 'Sursă oficială de supraveghere (Bund/Land).',
      hwk_exact: 'Handwerkskammer regională pentru orașul dvs.',
      hwk_fb: 'Portal ZDH — alegeți HWK.',
      ihk_exact: 'IHK regională pentru orașul dvs.',
      ihk_fb: 'IHK-Organisationfinder — regiune pe dihk.de.',
      gew_exact: 'Portal oficial local/land.',
      gew_fb: 'Portal federal — confirmați Gewerbeamt.',
      anerk: 'Anerkennung in Deutschland — profesie și land; apoi Landesbehörde.',
      taxi_exact: 'Portal local; permise la autorități.',
      taxi_fb: 'Portal general; depinde de tipul transportului.',
      ord_exact: 'Portal local; gastronomie la primărie.',
      ord_fb: 'Gemeinde/Ordnungsamt; alcool — zoll.de.',
      def_exact: 'IHK regională.',
      def_fb: 'IHK-Organisationfinder.',
      hand_a: 'Anlage A: Handwerksrolle; Meisterbrief — la HWK.',
      hand_b: 'Anlage B: notificare HWK conform listei.',
      recog_an: 'Calificare străină: Anerkennung in Deutschland, apoi autoritate.',
      recog_gen: 'Verificați echivalența — Anerkennung in Deutschland.'
    },
    tr: {
      section_title: 'Gereksinimler ve sınırlar',
      legal_intro: 'Bilgilendirme, hukuki danışmanlık değil. Şehre göre eyalet:',
      legal_unknown: 'otomatik algılanmadı — Ortsteil kontrol edin.',
      fb_sensitive_title: 'Dikkat',
      fb_sensitive_body: 'Bu faaliyet için lisans, kayıt, tanınma veya oda üyeliği gerekebilir. IHK, Handwerkskammer veya resmi finder’ları kontrol edin.',
      no_match_title: 'Bilgi',
      no_match_body: 'Profille eşleşme yok. Bu lisans gerekmediği anlamına gelmez — GewO ve eyalet hukukunu kontrol edin.',
      sev_high: 'Yüksek risk',
      sev_med: 'Dikkat',
      sev_info: 'Bilgi',
      lbl_what: 'Önemli olan',
      lbl_authority: 'Yetkili makam (açıklama)',
      lbl_handwerk: 'Handwerk',
      lbl_recognition: 'Nitelik tanınması',
      lbl_may_need: 'Gerekebilecekler',
      lbl_next: 'Sonraki adımlar',
      lbl_risk: 'Risk',
      lbl_legal: 'Not',
      lbl_link: 'Bağlantı',
      portal_exact: 'Yetkili makam (resmi site)',
      portal_fallback: 'Resmi finder / portal',
      fallback_disclaimer: 'Genel resmi portal gösterilir; yerel makam şehre/eyalete bağlıdır — sitede bölge seçin.',
      extra_fb: 'Ek olarak: hassas açıklama — oda ve düzenleyicide doğrulayın.',
      link_override: 'Resmi denetim kaynağı (Bund/Land).',
      hwk_exact: 'Şehriniz için bölgesel Handwerkskammer.',
      hwk_fb: 'ZDH portalı — HWK seçin.',
      ihk_exact: 'Şehriniz için bölgesel IHK.',
      ihk_fb: 'IHK-Organisationfinder — dihk.de.',
      gew_exact: 'Resmi şehir/eyalet portalı.',
      gew_fb: 'Federal portal — Gewerbeamt/Finanzamt.',
      anerk: 'Anerkennung in Deutschland — meslek ve eyalet; sonra Landesbehörde.',
      taxi_exact: 'Yerel portal; izinler yetkili makamda.',
      taxi_fb: 'Genel portal; taşıma türüne bağlı.',
      ord_exact: 'Yerel portal; restoran belediyede.',
      ord_fb: 'Gemeinde/Ordnungsamt; alkol — zoll.de.',
      def_exact: 'Bölgesel IHK.',
      def_fb: 'IHK-Organisationfinder.',
      hand_a: 'Anlage A: Handwerksrolle; Meisterbrief — HWK.',
      hand_b: 'Anlage B: listeye göre HWK bildirimi.',
      recog_an: 'Yabancı meslek: Anerkennung in Deutschland, sonra makam.',
      recog_gen: 'Denklik — Anerkennung in Deutschland.'
    },
    es: {
      section_title: 'Requisitos y límites',
      legal_intro: 'Informativo, no asesoramiento jurídico. Land según ciudad:',
      legal_unknown: 'no detectado automáticamente — revise Ortsteil.',
      fb_sensitive_title: 'Aviso',
      fb_sensitive_body: 'Esta actividad puede requerir licencia, registro, reconocimiento o colegio profesional. Consulte IHK, Handwerkskammer o buscadores oficiales.',
      no_match_title: 'Información',
      no_match_body: 'Sin coincidencia automática. No implica que no haya licencias — revise GewO y ley del land.',
      sev_high: 'Alto riesgo',
      sev_med: 'Aviso',
      sev_info: 'Información',
      lbl_what: 'Qué importa',
      lbl_authority: 'Autoridad (explicación)',
      lbl_handwerk: 'Handwerk',
      lbl_recognition: 'Reconocimiento de cualificaciones',
      lbl_may_need: 'Posibles requisitos',
      lbl_next: 'Próximos pasos',
      lbl_risk: 'Riesgo',
      lbl_legal: 'Nota',
      lbl_link: 'Enlace',
      portal_exact: 'Autoridad competente (sitio oficial)',
      portal_fallback: 'Buscador / portal oficial',
      fallback_disclaimer: 'Se muestra un portal general; la oficina exacta depende de ciudad/land — elija la región en el sitio.',
      extra_fb: 'Además: descripción sensible — verifique en cámara y autoridad.',
      link_override: 'Fuente oficial de supervisión (Bund/Land).',
      hwk_exact: 'Handwerkskammer regional para su ciudad.',
      hwk_fb: 'Portal ZDH — elija HWK.',
      ihk_exact: 'IHK regional para su ciudad.',
      ihk_fb: 'IHK-Organisationfinder — región en dihk.de.',
      gew_exact: 'Portal oficial municipal/regional.',
      gew_fb: 'Portal federal — confirme Gewerbeamt.',
      anerk: 'Anerkennung in Deutschland — profesión y land; luego Landesbehörde.',
      taxi_exact: 'Portal local; permisos en autoridad.',
      taxi_fb: 'Portal general; depende del tipo de transporte.',
      ord_exact: 'Portal local; hostelería en ayuntamiento.',
      ord_fb: 'Gemeinde/Ordnungsamt; alcohol — zoll.de.',
      def_exact: 'IHK regional.',
      def_fb: 'IHK-Organisationfinder.',
      hand_a: 'Anlage A: Handwerksrolle; Meisterbrief — en HWK.',
      hand_b: 'Anlage B: notificación HWK según lista.',
      recog_an: 'Cualificación extranjera: Anerkennung in Deutschland, luego autoridad.',
      recog_gen: 'Equivalencia — Anerkennung in Deutschland.'
    }
  };

  /** Rule copy: keys match activityComplianceRules.key — use EN for pl/ro/tr/es where same as EN to avoid mixed paragraphs. */
  var RULES = {};

  function R(key, de, en, ru, uk, pl, ro, tr, es) {
    RULES[key] = { de: de, en: en, ru: ru, uk: uk || en, pl: pl || en, ro: ro || en, tr: tr || en, es: es || en };
  }

  R('steuerberatung',
    { t: 'Steuerberatung', auth: 'Steuerberaterkammer des Bundeslandes — Kammer für Steuerberater', docs: 'Mitgliedschaft in der Steuerberaterkammer, Steuerberaterprüfung (oder Anerkennung ausländischer Abschlüsse).', msg: 'Beratung als Steuerberater ist reguliert; Qualifikation und Kammerzugehörigkeit nötig.', next: 'Steuerberaterkammer des Bundeslandes und ggf. Anerkennung prüfen.', risk: 'Beratung ohne Zulassung kann berufsrechtliche Folgen haben.', leg: 'Keine Rechtsberatung; Einzelfall prüfen.' },
    { t: 'Tax advisory / Steuerberatung', auth: 'State chamber of tax advisors (Steuerberaterkammer)', docs: 'Chamber membership, Steuerberaterprüfung (or recognition of foreign degrees).', msg: 'Acting as Steuerberater is regulated; you need qualification and chamber membership.', next: 'Check the Steuerberaterkammer of your state and recognition if needed.', risk: 'Advising without admission can trigger professional sanctions.', leg: 'Information only; verify your case.' },
    { t: 'Налоговое консультирование / Steuerberatung', auth: 'Камера налоговых консультантов земли (Steuerberaterkammer)', docs: 'Членство в Steuerberaterkammer, экзамен Steuerberaterprüfung (или признание диплома).', msg: 'Консультирование как Steuerberater регулируется; нужна квалификация и камера.', next: 'Steuerberaterkammer земли и при необходимости Anerkennung.', risk: 'Консультирование без допуска влечёт профессиональные санкции.', leg: 'Не юридическая консультация.' },
    null, null, null, null, null);

  R('wirtschaftspruefung',
    { t: 'Wirtschaftsprüfung / Audit', auth: 'Wirtschaftsprüferkammer (WPK)', docs: 'WP-Status / Vorläufer — streng reguliert.', msg: 'Prüfung öffentlicher Unternehmen und WP-Tätigkeiten ist streng reguliert.', next: 'WPK und landesspezifische Anforderungen.', risk: 'Hohes Regulierungsrisiko bei falscher Titelführung.', leg: 'Informationshinweis.' },
    { t: 'Audit / Wirtschaftsprüfung', auth: 'Wirtschaftsprüferkammer (WPK)', docs: 'WP status — strictly regulated.', msg: 'Audits of public companies and WP services are strictly regulated.', next: 'Contact WPK / regional requirements.', risk: 'High regulatory risk if titles are misused.', leg: 'Informational.' },
    { t: 'Аудит / Wirtschaftsprüfung', auth: 'Wirtschaftsprüferkammer', docs: 'Статус WP — отдельное регулирование.', msg: 'Аудит и услуги WP строго регулируются.', next: 'WPK / региональные требования.', risk: 'Высокий риск при неправильном титуле.', leg: 'Информационно.' });

  R('rechtsanwalt',
    { t: 'Rechtsanwalt / juristische Beratung', auth: 'Rechtsanwaltskammer des Bundeslandes', docs: 'Zulassung zur Rechtsanwaltskammer (2. Staatsexamen u. a.).', msg: 'Rechtsdienstleistungen als Rechtsanwalt erfordern Zulassung.', next: 'Rechtsanwaltskammer des jeweiligen Bundeslandes.', risk: 'Rechtsberatung ohne Zulassung kann strafbar sein (u. a. § 203 StGB).', leg: 'Informationshinweis.' },
    { t: 'Legal services / Rechtsanwalt', auth: 'Bar association of the state (Rechtsanwaltskammer)', docs: 'Admission to Rechtsanwaltskammer (2. Staatsexamen, etc.).', msg: 'Offering legal services as Rechtsanwalt requires admission.', next: 'Rechtsanwaltskammer of the relevant state.', risk: 'Legal advice without admission may be criminal (e.g. § 203 StGB).', leg: 'Informational.' },
    { t: 'Юридические услуги / Rechtsanwalt', auth: 'Rechtsanwaltskammer земли', docs: 'Допуск к Rechtsanwaltskammer (2. Staatsexamen и др.).', msg: 'Услуги как Rechtsanwalt требуют допуска.', next: 'Rechtsanwaltskammer соответствующей земли.', risk: 'Консультирование без допуска может быть уголовно наказуемым.', leg: 'Информационно.' });

  R('notar',
    { t: 'Notariat / Notar', auth: 'Landesjustizbehörde / Notarkammer', docs: 'Amtsnotar — eigener Werdegang.', msg: 'Notariat ist staatlich/reguliert.', next: 'Nur über Landesjustiz / offizielle Kanäle.', risk: 'Nachahmung notarieller Handlungen ist unzulässig.', leg: 'Informationshinweis.' },
    { t: 'Notary / Notar', auth: 'State justice authority / Notarkammer', docs: 'Amtsnotar — separate career path.', msg: 'Notarial activity is state-regulated.', next: 'Only via state justice authorities.', risk: 'Imitating notarial acts is not allowed.', leg: 'Informational.' },
    { t: 'Нотариус / Notar', auth: 'Landesjustizbehörde / Notarkammer', docs: 'Amtsnotar — особый путь.', msg: 'Нотариат регулируется государством.', next: 'Только через органы юстиции земли.', risk: 'Имитация нотариальных действий недопустима.', leg: 'Информационно.' });

  R('medizin',
    { t: 'Medizin / Approbation', auth: 'Landesprüfungsamt / Landesärztekammer (je nach Status)', docs: 'Approbation / Berufserlaubnis, Registrierung.', msg: 'Medizinische Tätigkeit erfordert Approbation oder Erlaubnis.', next: 'Landesgesundheitsbehörde; Anerkennung ausländischer Abschlüsse.', risk: 'Behandlung ohne Zulassung — schwerwiegende Folgen.', leg: 'Informationshinweis.' },
    { t: 'Healthcare / Approbation', auth: 'State examination office / medical chamber (depending on case)', docs: 'Approbation / Berufserlaubnis, registration.', msg: 'Medical practice requires Approbation or permit.', next: 'State health authority; recognition of foreign degrees.', risk: 'Treating patients without admission has serious consequences.', leg: 'Informational.' },
    { t: 'Медицина / Approbation', auth: 'Landesprüfungsamt / Landesärztekammer', docs: 'Approbation / Berufserlaubnis.', msg: 'Меддеятельность требует Approbation или разрешения.', next: 'Landesbehörde; Anerkennung.', risk: 'Лечение без допуска — серьёзные последствия.', leg: 'Информационно.' });

  R('apotheke',
    { t: 'Apotheke / Pharmazie', auth: 'Landesbehörden Gesundheitswesen / Apothekenkammer', docs: 'Erlaubnis nach Apothekengesetz.', msg: 'Apotheken und Teile der Pharmatätigkeit sind streng reguliert.', next: 'Landesbehörden Gesundheitswesen.', risk: 'Hohes Risiko beim Handel ohne Lizenz.', leg: 'Informationshinweis.' },
    { t: 'Pharmacy / Apotheke', auth: 'State health authorities / Apothekenkammer', docs: 'Permit under Apothekengesetz.', msg: 'Pharmacy activities are strictly regulated.', next: 'State health authorities.', risk: 'High risk when trading medicines without a licence.', leg: 'Informational.' },
    { t: 'Фармацевтика / Apotheke', auth: 'Landesbehörden / Apothekenkammer', docs: 'Erlaubnis nach Apothekengesetz.', msg: 'Аптеки и часть фармдеятельности строго регулируются.', next: 'Органы здравоохранения земли.', risk: 'Высокий риск без лицензии.', leg: 'Информационно.' });

  R('vers34d',
    { t: 'Versicherung § 34d GewO', auth: 'BaFin / Vermittlerregister', docs: 'Erlaubnis nach § 34d GewO, IHK-Eintrag.', msg: 'Versicherungsvermittlung erfordert in der Regel § 34d-Erlaubnis.', next: 'IHK und BaFin-Anforderungen prüfen.', risk: 'Vermittlung ohne Erlaubnis kann gegen GewO verstoßen.', leg: 'Informationshinweis; genaue Lizenzart prüfen.' },
    { t: 'Insurance intermediation § 34d GewO', auth: 'BaFin / register', docs: '§ 34d GewO permission, IHK registration.', msg: 'Insurance mediation usually requires a § 34d permit.', next: 'Check IHK and BaFin requirements.', risk: 'Mediation without a permit may breach GewO.', leg: 'Informational; verify licence type.' },
    { t: 'Страхование § 34d GewO', auth: 'BaFin / регистрация', docs: 'Erlaubnis § 34d, IHK.', msg: 'Посредничество обычно требует § 34d.', next: 'IHK и BaFin.', risk: 'Без допуска — риск по GewO.', leg: 'Информационно.' });

  R('fin34f',
    { t: 'Finanzanlagen § 34f GewO', auth: 'IHK / BaFin (je nach Produkt)', docs: 'Erlaubnis nach § 34f GewO.', msg: 'Vermittlung von Finanzanlagen ist reguliert.', next: 'IHK und BaFin prüfen.', risk: 'Hohes Regulierungsrisiko.', leg: 'Informationshinweis.' },
    { t: 'Financial investments § 34f GewO', auth: 'IHK / BaFin (depending on product)', docs: '§ 34f GewO permit.', msg: 'Intermediation for financial products is regulated.', next: 'Check IHK and BaFin.', risk: 'High regulatory risk.', leg: 'Informational.' },
    { t: 'Инвестиции § 34f GewO', auth: 'IHK / BaFin', docs: 'Erlaubnis § 34f.', msg: 'Посредничество по финпродуктам регулируется.', next: 'IHK и BaFin.', risk: 'Высокий регуляторный риск.', leg: 'Информационно.' });

  R('immob34c',
    { t: 'Immobilien § 34c GewO', auth: 'IHK — § 34c GewO', docs: 'Gewerbeanmeldung und § 34c-Erlaubnis.', msg: 'Gewerbsmäßige Immobilienvermittlung erfordert eine Erlaubnis.', next: 'Zuständige IHK.', risk: 'Tätigkeit ohne Erlaubnis kann gegen GewO verstoßen.', leg: 'Informationshinweis.' },
    { t: 'Real estate § 34c GewO', auth: 'IHK — § 34c GewO', docs: 'Business registration and § 34c permit.', msg: 'Professional real estate brokerage requires a permit.', next: 'Competent IHK.', risk: 'Working without a permit may breach GewO.', leg: 'Informational.' },
    { t: 'Недвижимость § 34c GewO', auth: 'IHK — § 34c', docs: 'Gewerbeanmeldung и § 34c.', msg: 'Посредничество требует разрешения.', next: 'Zuständige IHK.', risk: 'Без Erlaubnis — нарушение GewO.', leg: 'Информационно.' });

  R('immob34i',
    { t: 'Immobiliardarlehen § 34i GewO', auth: 'IHK — § 34i GewO', docs: 'Erlaubnis nach § 34i.', msg: 'Kreditvermittlung für Immobilien — gesonderte Erlaubnis.', next: 'IHK der Region.', risk: 'Erhebliche Sanktionen bei Verstößen.', leg: 'Informationshinweis.' },
    { t: 'Mortgage intermediation § 34i GewO', auth: 'IHK — § 34i GewO', docs: '§ 34i permit.', msg: 'Mortgage loan intermediation needs a separate permit.', next: 'Regional IHK.', risk: 'Substantial sanctions if violated.', leg: 'Informational.' },
    { t: 'Кредиты § 34i GewO', auth: 'IHK — § 34i', docs: 'Erlaubnis § 34i.', msg: 'Посредничество по кредитам — отдельное разрешение.', next: 'IHK региона.', risk: 'Существенные санкции.', leg: 'Информационно.' });

  R('sicher34a',
    { t: 'Sicherheitsgewerbe § 34a GewO', auth: 'IHK — Sachkundeprüfung § 34a', docs: 'Sachkundeprüfung / Unterrichtung.', msg: 'Sicherheitsdienst erfordert Qualifikation nach § 34a.', next: 'IHK-Organisationfinder.', risk: 'Risiko ohne erforderliche Qualifikation.', leg: 'Informationshinweis.' },
    { t: 'Security services § 34a GewO', auth: 'IHK — § 34a qualification', docs: 'Sachkundeprüfung / instruction.', msg: 'Security work requires § 34a qualification.', next: 'IHK organisation finder.', risk: 'Risk without required qualification.', leg: 'Informational.' },
    { t: 'Охрана § 34a GewO', auth: 'IHK — § 34a', docs: 'Sachkundeprüfung.', msg: 'Охрана требует квалификации § 34a.', next: 'IHK Organisationfinder.', risk: 'Риск без квалификации.', leg: 'Информационно.' });

  R('transport',
    { t: 'Personenbeförderung / Transport', auth: 'Straßenverkehrsbehörde / Ordnungsamt', docs: 'Konzessionen, Genehmigungen — je nach Transportart.', msg: 'Gewerblicher Personenverkehr erfordert in der Regel Genehmigungen.', next: 'Landesverkehrsbehörde / Kommune.', risk: 'Bußgelder und Entzug ohne Konzessionen.', leg: 'Informationshinweis.' },
    { t: 'Passenger transport', auth: 'Road traffic authority / Ordnungsamt', docs: 'Permits depend on transport type.', msg: 'Commercial passenger transport usually needs permits.', next: 'State transport department / municipality.', risk: 'Fines and seizure without licences.', leg: 'Informational.' },
    { t: 'Перевозки', auth: 'Straßenverkehrsbehörde / Ordnungsamt', docs: 'Konzessionen по виду.', msg: 'Коммерческие перевозки — разрешения.', next: 'Земельный департамент / город.', risk: 'Штрафы без лицензий.', leg: 'Информационно.' });

  R('gastro_alk',
    { t: 'Gastronomie / Alkohol', auth: 'Ordnungsamt / Gewerbeamt — Gaststättenerlaubnis', docs: 'Gaststättenkonzession, Anzeigen, Gewerbeanmeldung.', msg: 'Alkoholausschank und Betrieb erfordern Genehmigungen.', next: 'Gemeinde / Ordnungsamt.', risk: 'Bußgelder und Schließung bei Verstößen.', leg: 'Informationshinweis.' },
    { t: 'Gastronomy / alcohol', auth: 'Ordnungsamt / trade office — restaurant licence', docs: 'Restaurant permit, notifications, business registration.', msg: 'Serving alcohol and operating require permits.', next: 'Municipality / Ordnungsamt.', risk: 'Fines and closure if violated.', leg: 'Informational.' },
    { t: 'Гастрономия и алкоголь', auth: 'Ordnungsamt / Gewerbeamt', docs: 'Gaststättenkonzession, Anzeigen.', msg: 'Алкоголь и заведение — разрешения.', next: 'Gemeinde / Ordnungsamt.', risk: 'Штрафы и закрытие.', leg: 'Информационно.' });

  R('handwerk_a',
    { t: 'Handwerk Anlage A (Handwerksrolle)', auth: 'Zuständige Handwerkskammer', docs: 'Eintragung in die Handwerksrolle; Meisterbrief oder berechtigte Person.', msg: 'Anlage-A-Handwerke müssen in die Handwerksrolle eingetragen werden.', next: 'Regionale Handwerkskammer (siehe Link).', risk: 'Erhebliche Sanktionen ohne Eintragung.', leg: 'Informationshinweis.' },
    { t: 'Craft Anlage A (Handwerksrolle)', auth: 'Competent Handwerkskammer', docs: 'Entry in Handwerksrolle; Meisterbrief or authorised person.', msg: 'Anlage A trades must be entered in the Handwerksrolle.', next: 'Regional Handwerkskammer (see link).', risk: 'Serious sanctions without registration.', leg: 'Informational.' },
    { t: 'Handwerk Anlage A', auth: 'Handwerkskammer', docs: 'Handwerksrolle; Meisterbrief.', msg: 'Anlage A — внесение в Handwerksrolle.', next: 'Handwerkskammer региона.', risk: 'Санкции без внесения.', leg: 'Информационно.' });

  R('handwerk_b',
    { t: 'Handwerk nahe / Anlage B', auth: 'Handwerkskammer — Anzeige nach Liste', docs: 'Je nach Beruf: Anzeige bei HWK.', msg: 'Einige Anlage-B-Berufe erfordern Anzeige bei der HWK.', next: 'Regionale HWK prüfen.', risk: 'Ordnungswidrigkeiten bei fehlender Anzeige.', leg: 'Informationshinweis.' },
    { t: 'Craft-related / Anlage B', auth: 'Handwerkskammer — notification', docs: 'Depending on trade: notification to HWK.', msg: 'Some Anlage B services require HWK notification.', next: 'Check regional HWK.', risk: 'Fines if notification missing.', leg: 'Informational.' },
    { t: 'Handwerk Anlage B', auth: 'Handwerkskammer', docs: 'Anzeige bei HWK.', msg: 'Часть услуг Anlage B — уведомление HWK.', next: 'Региональная HWK.', risk: 'Штрафы.', leg: 'Информационно.' });

  R('buchhaltung_eu',
    { t: 'Buchhaltung (Gewerbe)', auth: 'Gewerbeanmeldung; keine Steuerberater-Werbung', docs: 'Nicht mit Steuerberater verwechseln.', msg: 'Einfache Buchhaltung als Gewerbe — Anmeldung; keine Titelmissbräuche.', next: 'IHK / Finanzamt.', risk: 'Falsche Titelnutzung.', leg: 'Informationshinweis.' },
    { t: 'Bookkeeping (trade)', auth: 'Business registration; do not advertise as Steuerberater', docs: 'Do not confuse with Steuerberater.', msg: 'Simple bookkeeping as a trade needs registration; no false titles.', next: 'IHK / Finanzamt.', risk: 'Misuse of titles.', leg: 'Informational.' },
    { t: 'Бухгалтерия (ограничения)', auth: 'Gewerbeanmeldung', docs: 'Не путать с Steuerberater.', msg: 'Простая бухгалтерия — регистрация; без ложных титулов.', next: 'IHK / Finanzamt.', risk: 'Неправильные титулы.', leg: 'Информационно.' });

  R('lehrer_reg',
    { t: 'Reglementierte pädagogische Berufe', auth: 'Kultusministerium / Anerkennung', docs: 'Anerkennung ausländischer Zeugnisse.', msg: 'Pädagogische Tätigkeiten erfordern oft Anerkennung.', next: 'Anerkennungs-Finder / Behörde.', risk: 'Hohes Risiko bei Arbeit mit Kindern ohne Zulassung.', leg: 'Informationshinweis.' },
    { t: 'Regulated teaching professions', auth: 'Ministry of education / recognition', docs: 'Recognition of foreign certificates.', msg: 'Teaching roles often need recognition of your degree.', next: 'Anerkennung finder / authority.', risk: 'High risk working with children without clearance.', leg: 'Informational.' },
    { t: 'Педагогические профессии', auth: 'Министерство образования', docs: 'Anerkennung.', msg: 'Часто нужно признание диплома.', next: 'Anerkennungs-Finder.', risk: 'Риск с детьми без допуска.', leg: 'Информационно.' });

  R('it_low_risk',
    { t: 'IT / Kreativ (oft ohne Sondererlaubnis)', auth: 'Gewerbeanmeldung / Freiberufler — Finanzamt', docs: 'Tätigkeitsanmeldung.', msg: 'Viele IT-/Kreativdienste brauchen keine §§ 34a–34i, aber korrekte Rechtsform.', next: 'Finanzamt / IHK-Infocenter.', risk: 'Geringes Branchenrisiko; Verträge und Steuern prüfen.', leg: 'Informationshinweis; Ausnahmen möglich.' },
    { t: 'IT / creative (often no special permit)', auth: 'Business registration / freelancer — Finanzamt', docs: 'Register your activity.', msg: 'Many IT/creative services do not need §§ 34a–34i, but correct legal form matters.', next: 'Finanzamt / IHK info.', risk: 'Low sector risk; still check contracts and taxes.', leg: 'Informational; exceptions exist.' },
    { t: 'IT / дизайн (часто без §)', auth: 'Gewerbeanmeldung / Freiberufler', docs: 'Регистрация.', msg: 'Многие IT-услуги без §§ 34a–34i, но нужна форма бизнеса.', next: 'Finanzamt / IHK.', risk: 'Низкий отраслевой риск.', leg: 'Информационно.' });

  global.__BK_COMPLIANCE_I18N = {
    SUPPORTED: SUPPORTED,
    norm: norm,
    pick: pick,
    UI: UI,
    RULES: RULES,
    BL: BL,
    ruleTxt: function (ruleKey, lang) {
      return pick(RULES[ruleKey], lang);
    },
    blName: function (code, lang) {
      var b = BL[norm(lang)] || BL.en;
      return b[code] || code;
    },
    ui: function (lang) {
      return UI[norm(lang)] || UI.en;
    }
  };
})(typeof window !== 'undefined' ? window : this);
