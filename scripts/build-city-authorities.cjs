/**
 * Генерация city-authorities.js: карта IHK/HWK/Gewerbe по 246 городам + статистика.
 * Запуск: node scripts/build-city-authorities.cjs
 */
'use strict';

const fs = require('fs');
const path = require('path');
const cities = require('../cities246.json');
const { IHK, HWK, GEWERBE } = require('./authority-urls.cjs');
const data = require('./city-authority-ihk-data.cjs');

const NW_IHK = {
  Aachen: 'ihk_aachen',
  Düren: 'ihk_aachen',
  Euskirchen: 'ihk_aachen',
  Heinsberg: 'ihk_aachen',
  Eschweiler: 'ihk_aachen',
  Alsdorf: 'ihk_aachen',
  Wuppertal: 'ihk_bergische',
  Solingen: 'ihk_bergische',
  Remscheid: 'ihk_bergische',
  Bonn: 'ihk_bonn_rhein_sieg',
  Troisdorf: 'ihk_bonn_rhein_sieg',
  Königswinter: 'ihk_bonn_rhein_sieg',
  Lohmar: 'ihk_bonn_rhein_sieg',
  Düsseldorf: 'ihk_duesseldorf',
  Mettmann: 'ihk_duesseldorf',
  Velbert: 'ihk_duesseldorf',
  Ratingen: 'ihk_duesseldorf',
  Haan: 'ihk_duesseldorf',
  Krefeld: 'ihk_mittlerer_niederrhein',
  Viersen: 'ihk_mittlerer_niederrhein',
  Kempen: 'ihk_mittlerer_niederrhein',
  Neuss: 'ihk_mittlerer_niederrhein',
  Grevenbroich: 'ihk_mittlerer_niederrhein',
  Dormagen: 'ihk_mittlerer_niederrhein',
  'Mönchengladbach': 'ihk_mittlerer_niederrhein',
  Duisburg: 'ihk_niederrhein',
  Moers: 'ihk_niederrhein',
  Kleve: 'ihk_niederrhein',
  Kevelaer: 'ihk_niederrhein',
  'Kamp-Lintfort': 'ihk_niederrhein',
  Dinslaken: 'ihk_niederrhein',
  Köln: 'ihk_koeln',
  Leverkusen: 'ihk_koeln',
  'Bergisch Gladbach': 'ihk_koeln',
  Kerpen: 'ihk_koeln',
  Hürth: 'ihk_koeln',
  Frechen: 'ihk_koeln',
  Essen: 'ihk_essen',
  'Mülheim an der Ruhr': 'ihk_essen',
  Oberhausen: 'ihk_essen',
  Bochum: 'ihk_mittleres_ruhr',
  Herne: 'ihk_mittleres_ruhr',
  Hattingen: 'ihk_mittleres_ruhr',
  Witten: 'ihk_mittleres_ruhr',
  Dortmund: 'ihk_dortmund',
  Hamm: 'ihk_dortmund',
  Unna: 'ihk_dortmund',
  Kamen: 'ihk_dortmund',
  Schwerte: 'ihk_dortmund',
  Münster: 'ihk_nordwestfalen',
  Gelsenkirchen: 'ihk_nordwestfalen',
  Recklinghausen: 'ihk_nordwestfalen',
  Rheine: 'ihk_nordwestfalen',
  Ahaus: 'ihk_nordwestfalen',
  'Gronau (Westf.)': 'ihk_nordwestfalen',
  Coesfeld: 'ihk_nordwestfalen',
  Marl: 'ihk_nordwestfalen',
  Dorsten: 'ihk_nordwestfalen',
  Gladbeck: 'ihk_nordwestfalen',
  Bottrop: 'ihk_nordwestfalen',
  Herten: 'ihk_nordwestfalen',
  'Castrop-Rauxel': 'ihk_nordwestfalen',
  Ahlen: 'ihk_nordwestfalen',
  Beckum: 'ihk_nordwestfalen',
  Bielefeld: 'ihk_ostwestfalen',
  Paderborn: 'ihk_ostwestfalen',
  Gütersloh: 'ihk_ostwestfalen',
  Herford: 'ihk_ostwestfalen',
  'Bad Salzuflen': 'ihk_ostwestfalen',
  Detmold: 'ihk_ostwestfalen',
  Lemgo: 'ihk_ostwestfalen',
  Minden: 'ihk_ostwestfalen',
  'Bad Oeynhausen': 'ihk_ostwestfalen',
  Delbrück: 'ihk_ostwestfalen',
  Hagen: 'ihk_hagen',
  Lüdenscheid: 'ihk_hagen',
  Iserlohn: 'ihk_hagen',
  Hemer: 'ihk_hagen',
  Ennepetal: 'ihk_hagen',
  Gevelsberg: 'ihk_hagen',
  Gummersbach: 'ihk_hagen',
  Arnsberg: 'ihk_arnsberg',
  Lippstadt: 'ihk_arnsberg',
  Siegen: 'ihk_siegen'
};

const IHK_TO_HWK = {
  ihk_organisationfinder: 'hwk_zdh',
  ihk_aachen: 'hwk_aachen',
  ihk_bergische: 'hwk_wuppertal',
  ihk_bonn_rhein_sieg: 'hwk_bonn',
  ihk_duesseldorf: 'hwk_duesseldorf',
  ihk_essen: 'hwk_essen',
  ihk_mittleres_ruhr: 'hwk_dortmund',
  ihk_dortmund: 'hwk_dortmund',
  ihk_koeln: 'hwk_koeln',
  ihk_mittlerer_niederrhein: 'hwk_mittlerer_niederrhein',
  ihk_niederrhein: 'hwk_niederrhein',
  ihk_nordwestfalen: 'hwk_muenster',
  ihk_ostwestfalen: 'hwk_ostwestfalen',
  ihk_siegen: 'hwk_siegen',
  ihk_hagen: 'hwk_hagen',
  ihk_arnsberg: 'hwk_suedwestfalen',
  ihk_potsdam: 'hwk_potsdam',
  ihk_cottbus: 'hwk_potsdam',
  ihk_berlin: 'hwk_berlin',
  ihk_hamburg: 'hwk_hamburg',
  ihk_bremen: 'hwk_bremen',
  ihk_hannover: 'hwk_hannover',
  ihk_braunschweig: 'hwk_hannover',
  ihk_stuttgart: 'hwk_stuttgart',
  ihk_karlsruhe: 'hwk_karlsruhe',
  ihk_heilbronn: 'hwk_heilbronn',
  ihk_freiburg: 'hwk_freiburg',
  ihk_muenchen: 'hwk_muenchen',
  ihk_nuernberg: 'hwk_mittelfranken',
  ihk_augsburg: 'hwk_schwaben',
  ihk_regensburg: 'hwk_muenchen',
  ihk_frankfurt: 'hwk_frankfurt',
  ihk_darmstadt: 'hwk_frankfurt',
  ihk_kassel: 'hwk_kassel',
  ihk_wiesbaden: 'hwk_wiesbaden',
  ihk_rheinhessen: 'hwk_wiesbaden',
  ihk_pfalz: 'hwk_koblenz',
  ihk_rhein_neckar: 'hwk_stuttgart',
  ihk_ulm: 'hwk_schwaben',
  ihk_oldenburg: 'hwk_bremen',
  ihk_osnabrueck: 'hwk_hannover',
  ihk_niederbayern: 'hwk_muenchen',
  ihk_aschaffenburg: 'hwk_mittelfranken',
  ihk_wuerzburg: 'hwk_mittelfranken',
  ihk_giessen_friedberg: 'hwk_kassel',
  ihk_fulda: 'hwk_kassel',
  ihk_limburg: 'hwk_frankfurt',
  ihk_bayreuth: 'hwk_mittelfranken',
  ihk_koblenz: 'hwk_koblenz',
  ihk_trier: 'hwk_trier',
  ihk_saarland: 'hwk_saarland',
  ihk_dresden: 'hwk_dresden',
  ihk_chemnitz: 'hwk_chemnitz',
  ihk_leipzig: 'hwk_leipzig',
  ihk_magdeburg: 'hwk_magdeburg',
  ihk_halle: 'hwk_magdeburg',
  ihk_rostock: 'hwk_rostock',
  ihk_schwerin: 'hwk_rostock',
  ihk_kiel: 'hwk_kiel',
  ihk_flensburg: 'hwk_flensburg',
  ihk_luebeck: 'hwk_luebeck',
  ihk_erfurt: 'hwk_erfurt',
  ihk_gera: 'hwk_erfurt',
  ihk_zwickau: 'hwk_plauen',
  ihk_reutlingen: 'hwk_stuttgart',
  ihk_ostwuerttemberg: 'hwk_stuttgart',
  ihk_bodensee_oberschwaben: 'hwk_freiburg',
  ihk_sbh: 'hwk_freiburg',
  ihk_elbeweser: 'hwk_hannover'
};

const GEWERBE_BY_CITY = {
  Berlin: 'service_berlin',
  Hamburg: 'service_hamburg',
  München: 'service_muenchen',
  Köln: 'service_koeln',
  'Frankfurt am Main': 'service_frankfurt',
  Stuttgart: 'service_stuttgart',
  Düsseldorf: 'service_duesseldorf',
  Dortmund: 'service_dortmund',
  Essen: 'service_essen',
  Bremen: 'service_bremen'
};

function mergeOtherIhk() {
  return Object.assign(
    {},
    data.BE_IHK,
    data.HH_IHK,
    data.HB_IHK,
    data.BB_IHK,
    data.MV_IHK,
    data.RP_IHK,
    data.SH_IHK,
    data.SL_IHK,
    data.SN_IHK,
    data.ST_IHK,
    data.TH_IHK,
    data.HE_IHK,
    data.BW_IHK,
    data.BY_IHK,
    data.NI_IHK
  );
}

function buildCityToIhkKey() {
  const other = mergeOtherIhk();
  return Object.assign({}, NW_IHK, other);
}

function entryFromKeys(ihkKey, hwkKey, gewerbeKey) {
  var ih = IHK[ihkKey] || IHK.ihk_organisationfinder;
  var hw = HWK[hwkKey] || HWK.hwk_zdh;
  var gw = GEWERBE[gewerbeKey] || GEWERBE.service_bund;
  return {
    ihk: { key: ihkKey, url: ih.url, label_de: ih.label_de, exact: ih.exact },
    hwk: { key: hwkKey, url: hw.url, label_de: hw.label_de, exact: hw.exact },
    gewerbe: { key: gewerbeKey, url: gw.url, label_de: gw.label_de, exact: gw.exact }
  };
}

function main() {
  var cityToIhk = buildCityToIhkKey();
  var map = {};
  var missing = [];
  var i;
  for (i = 0; i < cities.length; i++) {
    var city = cities[i];
    var ik = cityToIhk[city];
    if (!ik) missing.push(city);
  }
  if (missing.length) {
    console.error('Missing IHK key for cities:', missing);
    process.exit(1);
  }

  var localIhkExactCount = 0;
  var localHwkExactCount = 0;
  var localGewerbeamtExactCount = 0;
  var fallbackOnlyCount = 0;

  for (i = 0; i < cities.length; i++) {
    var c = cities[i];
    var ihkKey = cityToIhk[c];
    var hwkKey = IHK_TO_HWK[ihkKey] || 'hwk_zdh';
    var gKey = GEWERBE_BY_CITY[c] || 'service_bund';
    map[c] = entryFromKeys(ihkKey, hwkKey, gKey);

    var e = map[c];
    if (e.ihk.exact) localIhkExactCount++;
    if (e.hwk.exact) localHwkExactCount++;
    if (e.gewerbe.exact) localGewerbeamtExactCount++;
    if (!e.ihk.exact && !e.hwk.exact && !e.gewerbe.exact) fallbackOnlyCount++;
  }

  var stats = {
    totalCities: cities.length,
    localIhkExactCount: localIhkExactCount,
    localHwkExactCount: localHwkExactCount,
    localGewerbeamtExactCount: localGewerbeamtExactCount,
    fallbackOnlyCount: fallbackOnlyCount,
    generated: new Date().toISOString()
  };

  var outPath = path.join(__dirname, '..', 'city-authorities.js');
  var body =
    '/**\n * Zuständige IHK/HWK/Gewerbe-Portal — сгенерировано scripts/build-city-authorities.cjs\n * Не править вручную; перегенерировать после правок карт.\n */\n' +
    '(function (global) {\n' +
    "  'use strict';\n" +
    '  global.CITY_AUTHORITY_MAP = ' +
    JSON.stringify(map, null, 2) +
    ';\n' +
    '  global.__BK_AUTHORITY_STATS = ' +
    JSON.stringify(stats, null, 2) +
    ';\n' +
    "})(typeof window !== 'undefined' ? window : this);\n";

  fs.writeFileSync(outPath, body, 'utf8');
  console.log('OK', outPath, stats);
}

main();
