/**
 * Локальные ключи IHK/HWK по городам (не-NW — по землям; NW — отдельный блок в build-city-authorities.cjs).
 * Значения — id из scripts/authority-urls.cjs
 */
'use strict';

const HE_IHK = {
  'Frankfurt am Main': 'ihk_frankfurt',
  'Rüsselsheim am Main': 'ihk_frankfurt',
  'Bad Homburg vor der Höhe': 'ihk_frankfurt',
  Hanau: 'ihk_frankfurt',
  Darmstadt: 'ihk_darmstadt',
  Dietzenbach: 'ihk_darmstadt',
  'Langen (Hessen)': 'ihk_darmstadt',
  Bensheim: 'ihk_darmstadt',
  Wiesbaden: 'ihk_wiesbaden',
  'Bad Nauheim': 'ihk_wiesbaden',
  'Bad Vilbel': 'ihk_wiesbaden',
  Kassel: 'ihk_kassel',
  Marburg: 'ihk_kassel',
  Korbach: 'ihk_kassel',
  Gießen: 'ihk_giessen_friedberg',
  Wetzlar: 'ihk_giessen_friedberg',
  Fulda: 'ihk_fulda',
  'Limburg an der Lahn': 'ihk_limburg'
};

const BW_IHK = {
  Stuttgart: 'ihk_stuttgart',
  Ludwigsburg: 'ihk_stuttgart',
  'Esslingen am Neckar': 'ihk_stuttgart',
  Waiblingen: 'ihk_stuttgart',
  Böblingen: 'ihk_stuttgart',
  'Bietigheim-Bissingen': 'ihk_stuttgart',
  Karlsruhe: 'ihk_karlsruhe',
  Bruchsal: 'ihk_karlsruhe',
  'Baden-Baden': 'ihk_karlsruhe',
  Pforzheim: 'ihk_karlsruhe',
  Mannheim: 'ihk_rhein_neckar',
  Heidelberg: 'ihk_rhein_neckar',
  Hockenheim: 'ihk_rhein_neckar',
  'Freiburg im Breisgau': 'ihk_freiburg',
  Lörrach: 'ihk_freiburg',
  Offenburg: 'ihk_freiburg',
  Kehl: 'ihk_freiburg',
  Heilbronn: 'ihk_heilbronn',
  'Schwäbisch Hall': 'ihk_heilbronn',
  Ulm: 'ihk_ulm',
  'Neu-Ulm': 'ihk_ulm',
  Reutlingen: 'ihk_reutlingen',
  Tübingen: 'ihk_reutlingen',
  Nagold: 'ihk_reutlingen',
  Albstadt: 'ihk_reutlingen',
  Balingen: 'ihk_reutlingen',
  Aalen: 'ihk_ostwuerttemberg',
  'Schwäbisch Gmünd': 'ihk_ostwuerttemberg',
  'Ellwangen (Jagst)': 'ihk_ostwuerttemberg',
  Friedrichshafen: 'ihk_bodensee_oberschwaben',
  Konstanz: 'ihk_bodensee_oberschwaben',
  'Singen (Hohentwiel)': 'ihk_bodensee_oberschwaben',
  'Villingen-Schwenningen': 'ihk_sbh'
};

const BY_IHK = {
  München: 'ihk_muenchen',
  Ingolstadt: 'ihk_muenchen',
  Dachau: 'ihk_muenchen',
  Freising: 'ihk_muenchen',
  Germering: 'ihk_muenchen',
  Rosenheim: 'ihk_muenchen',
  Nürnberg: 'ihk_nuernberg',
  Fürth: 'ihk_nuernberg',
  Erlangen: 'ihk_nuernberg',
  Nörenberg: 'ihk_nuernberg',
  Augsburg: 'ihk_augsburg',
  Memmingen: 'ihk_augsburg',
  'Kempten (Allgäu)': 'ihk_augsburg',
  Bamberg: 'ihk_bayreuth',
  Bayreuth: 'ihk_bayreuth',
  Hof: 'ihk_bayreuth',
  Forchheim: 'ihk_bayreuth',
  Regensburg: 'ihk_regensburg',
  Passau: 'ihk_niederbayern',
  Deggendorf: 'ihk_niederbayern',
  Straubing: 'ihk_niederbayern',
  Landshut: 'ihk_niederbayern',
  Würzburg: 'ihk_wuerzburg',
  Aschaffenburg: 'ihk_aschaffenburg'
};

const NI_IHK = {
  Hannover: 'ihk_hannover',
  Garbsen: 'ihk_hannover',
  Hameln: 'ihk_hannover',
  Lüneburg: 'ihk_hannover',
  Celle: 'ihk_hannover',
  Burgdorf: 'ihk_hannover',
  Burgwedel: 'ihk_hannover',
  Lehrte: 'ihk_hannover',
  Wunstorf: 'ihk_hannover',
  Barsinghausen: 'ihk_hannover',
  Göttingen: 'ihk_hannover',
  Hildesheim: 'ihk_hannover',
  Holzminden: 'ihk_hannover',
  Peine: 'ihk_hannover',
  Braunschweig: 'ihk_braunschweig',
  Salzgitter: 'ihk_braunschweig',
  Wolfsburg: 'ihk_braunschweig',
  Helmstedt: 'ihk_braunschweig',
  Oldenburg: 'ihk_oldenburg',
  Wilhelmshaven: 'ihk_oldenburg',
  Emden: 'ihk_oldenburg',
  Delmenhorst: 'ihk_oldenburg',
  Cloppenburg: 'ihk_oldenburg',
  Osnabrück: 'ihk_osnabrueck',
  Bramsche: 'ihk_osnabrueck',
  'Lingen (Ems)': 'ihk_osnabrueck',
  Meppen: 'ihk_osnabrueck',
  Diepholz: 'ihk_osnabrueck',
  Stade: 'ihk_elbeweser',
  Buxtehude: 'ihk_elbeweser',
  Achim: 'ihk_elbeweser',
  'Buchholz in der Nordheide': 'ihk_elbeweser'
};

const BB_IHK = {
  Potsdam: 'ihk_potsdam',
  Falkensee: 'ihk_potsdam',
  Eberswalde: 'ihk_potsdam',
  Velten: 'ihk_potsdam',
  'Hohen Neuendorf': 'ihk_potsdam',
  Cottbus: 'ihk_cottbus'
};

const BE_IHK = { Berlin: 'ihk_berlin' };
const HH_IHK = { Hamburg: 'ihk_hamburg' };
const HB_IHK = { Bremen: 'ihk_bremen', Bremerhaven: 'ihk_bremen' };

const MV_IHK = {
  Rostock: 'ihk_rostock',
  Greifswald: 'ihk_rostock',
  Wismar: 'ihk_rostock',
  Schwerin: 'ihk_schwerin'
};

const RP_IHK = {
  Mainz: 'ihk_rheinhessen',
  'Bad Kreuznach': 'ihk_rheinhessen',
  'Ludwigshafen am Rhein': 'ihk_pfalz',
  Speyer: 'ihk_pfalz',
  Kaiserslautern: 'ihk_pfalz',
  Zweibrücken: 'ihk_pfalz',
  Worms: 'ihk_pfalz',
  Koblenz: 'ihk_koblenz',
  Andernach: 'ihk_koblenz',
  Trier: 'ihk_trier',
  'Idar-Oberstein': 'ihk_trier'
};

const SH_IHK = {
  Kiel: 'ihk_kiel',
  'Neumünster': 'ihk_kiel',
  Lübeck: 'ihk_luebeck',
  Flensburg: 'ihk_flensburg',
  Norderstedt: 'ihk_hamburg',
  Pinneberg: 'ihk_hamburg'
};

const SL_IHK = { Saarbrücken: 'ihk_saarland' };

const SN_IHK = {
  Dresden: 'ihk_dresden',
  Leipzig: 'ihk_leipzig',
  Chemnitz: 'ihk_chemnitz',
  Zwickau: 'ihk_zwickau',
  Plauen: 'ihk_zwickau',
  Riesa: 'ihk_dresden',
  Radebeul: 'ihk_dresden',
  Hoyerswerda: 'ihk_dresden'
};

const ST_IHK = {
  Magdeburg: 'ihk_magdeburg',
  'Halle (Saale)': 'ihk_halle',
  'Dessau-Roßlau': 'ihk_halle',
  Merseburg: 'ihk_halle',
  Stendal: 'ihk_magdeburg',
  Zeitz: 'ihk_halle'
};

const TH_IHK = {
  Erfurt: 'ihk_erfurt',
  Weimar: 'ihk_erfurt',
  Nordhausen: 'ihk_erfurt',
  Mühlhausen: 'ihk_erfurt',
  Eisenach: 'ihk_erfurt',
  Jena: 'ihk_gera',
  Gera: 'ihk_gera',
  Ilmenau: 'ihk_gera',
  Suhl: 'ihk_gera'
};

module.exports = {
  HE_IHK,
  BW_IHK,
  BY_IHK,
  NI_IHK,
  BB_IHK,
  BE_IHK,
  HH_IHK,
  HB_IHK,
  MV_IHK,
  RP_IHK,
  SH_IHK,
  SL_IHK,
  SN_IHK,
  ST_IHK,
  TH_IHK
};
