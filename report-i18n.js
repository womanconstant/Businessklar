/**
 * Long-report snippets for index.html (fines, closing). One language per block.
 */
(function (global) {
  'use strict';

  var FINES = {
    de: {
      title: 'Wofür am häufigsten Bußgelder',
      sub: 'Häufige Fehler mit Konsequenzen',
      gastroExtra: { n: 'GEMA — Musik ohne Lizenz', a: '500–5.000 €', d: 'Spotify gilt nur für Privatnutzung' },
      rows: [
        { n: 'Kein Impressum (Website)', a: '300–1.500 €', d: 'Pflicht für jeden Gewerbetreibenden online' },
        { n: 'Datenschutz / Cookie-Fehler', a: '500–10.000 €', d: 'Google Analytics ohne Einwilligung' },
        { n: 'Fotos ohne Lizenz (Getty etc.)', a: '600–2.500 €', d: 'pro Foto' },
        { n: 'Kasse ohne TSE (Kassensicherungsverordnung)', a: 'bis 25.000 €', d: 'Kassendaten nicht ordnungsgemäß gespeichert' },
        { n: 'Schwarzarbeit (Zoll-Kontrolle)', a: 'bis 500.000 €', d: 'Restaurants, Salons, Bau' },
        { n: 'Arbeitszeitverstoß (über 8h)', a: 'bis 15.000 €', d: 'Max. 8h/Tag' },
        { n: 'USt-Fehler (7% statt 19%)', a: 'Nachzahlung + Zinsen', d: 'Restaurant: drinnen 19%, Takeaway 7%' }
      ]
    },
    en: {
      title: 'Common fines to avoid',
      sub: 'Typical mistakes with consequences',
      gastroExtra: { n: 'GEMA — music without licence', a: '500–5,000 €', d: 'Spotify is for private use only' },
      rows: [
        { n: 'No Impressum (website)', a: '300–1,500 €', d: 'Required for any business online' },
        { n: 'Privacy / cookie mistakes', a: '500–10,000 €', d: 'Google Analytics without consent' },
        { n: 'Photos without licence (Getty, etc.)', a: '600–2,500 €', d: 'per photo' },
        { n: 'Till without TSE', a: 'up to 25,000 €', d: 'Data not stored correctly' },
        { n: 'Undeclared work (customs checks)', a: 'up to 500,000 €', d: 'Restaurants, salons, construction' },
        { n: 'Working time violation (>8h)', a: 'up to 15,000 €', d: 'Max. 8 hours/day' },
        { n: 'VAT mistakes (7% vs 19%)', a: 'Back taxes + interest', d: 'Restaurant: dine-in 19%, takeaway 7%' }
      ]
    },
    ru: {
      title: 'За что чаще всего штрафуют',
      sub: 'Типичные штрафы предпринимателей в Германии',
      gastroExtra: { n: 'GEMA — музыка без лицензии', a: '500–5.000 €', d: 'Spotify не подходит для бизнеса' },
      rows: [
        { n: 'Нет Impressum на сайте', a: '300–1.500 €', d: 'Обязательно для любого бизнеса онлайн' },
        { n: 'Нарушение Datenschutz / Cookie', a: '500–10.000 €', d: 'Google Analytics без согласия' },
        { n: 'Фото без лицензии (Getty)', a: '600–2.500 €', d: 'за каждое фото' },
        { n: 'Касса без TSE', a: 'bis 25.000 €', d: 'Проверка Finanzamt' },
        { n: 'Нелегальная работа (Zoll)', a: 'bis 500.000 €', d: 'Рестораны, салоны, стройки' },
        { n: 'Переработка (Arbeitszeitgesetz)', a: 'bis 15.000 €', d: 'Макс. 8 часов в день' },
        { n: 'Ошибки НДС (7% / 19%)', a: 'Доначисление + проценты', d: 'Ресторан: еда 19%, навынос 7%' }
      ]
    }
  };

  var CLOSING = {
    de: {
      quote: 'Jetzt verstehen Sie, was auf Sie zukommt. Sie können weitergehen — oder nicht. Aber Sie gehen nicht mehr blind.',
      disc: 'Diese Berechnung ist informativ und keine Rechts- oder Steuerberatung.',
      upsell_h: 'Steuerstrategie im Detail?',
      upsell_p: 'Nutzen Sie den Block „Was Sie als Nächstes tun können“ oben: speichern, PDF oder Spezialisten.'
    },
    en: {
      quote: 'Now you understand what lies ahead. You can move forward — or not. But you no longer walk blind.',
      disc: 'This assessment is informational and is not legal or tax advice.',
      upsell_h: 'Need a detailed tax strategy?',
      upsell_p: 'Use the “What you can do next” section above: save, PDF, or specialists.'
    },
    ru: {
      quote: 'Теперь ты понимаешь, что тебя ждёт. Ты можешь идти дальше — или не идти. Но ты больше не идёшь вслепую.',
      disc: 'Данная оценка носит информационный характер и не является юридической или налоговой консультацией.',
      upsell_h: 'Нужна точная налоговая стратегия?',
      upsell_p: 'См. блок «Что дальше» выше: сохраните результат, скачайте PDF или перейдите к специалистам.'
    }
  };

  function norm(lang) {
    var l = (lang == null ? 'en' : String(lang)).toLowerCase().substring(0, 2);
    var sup = ['de', 'en', 'ru', 'uk', 'pl', 'ro', 'tr', 'es'];
    return sup.indexOf(l) >= 0 ? l : 'en';
  }

  function finesFor(lang) {
    var l = norm(lang);
    if (FINES[l]) return FINES[l];
    return FINES.en;
  }

  function closingFor(lang) {
    var l = norm(lang);
    if (CLOSING[l]) return CLOSING[l];
    return CLOSING.en;
  }

  global.BK_REPORT_I18N = {
    finesFor: finesFor,
    closingFor: closingFor
  };
})(typeof window !== 'undefined' ? window : this);
