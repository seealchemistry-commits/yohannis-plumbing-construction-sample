import type { Locale } from '../i18n/types';

export type ProjectStatus = 'handed_over' | 'completing_soon';

export type ProjectImageKey =
  | 'handover_cert_tower'
  | 'handover_cert_villas'
  | 'project_completing_apartments'
  | 'project_completing_plaza';

export interface LocalizedProjectText {
  title: string;
  location: string;
  scopeSummary: string;
  handoverNote: string;
  deliverables: [string, string, string];
}

export interface RealEstateProject {
  id: string;
  code: string;
  status: ProjectStatus;
  imageKey: ProjectImageKey;
  certificateRef?: string;
  completionLabel: string;
  unitsOrScale: string;
  copy: Record<Locale, LocalizedProjectText>;
}

/**
 * Scalable Real Estate Projects & Handover Certificates registry.
 * Adding a new project entry here automatically updates the rendered grid,
 * dynamic count badge, status filters, detail modal, and all 4 locales.
 */
export const REAL_ESTATE_PROJECTS: readonly RealEstateProject[] = [
  {
    id: 'PROJ-01',
    code: 'TP-RE-01',
    status: 'handed_over',
    imageKey: 'handover_cert_tower',
    certificateRef: 'CERT-2026-BL01',
    completionLabel: 'Q1 2026',
    unitsOrScale: 'G+12 · 48 Units',
    copy: {
      en: {
        title: 'Bole Medhanialem Residential Tower',
        location: 'Bole Medhanialem, Addis Ababa',
        scopeSummary:
          'Complete PN20 PP-R hot/cold risers, dual Booster Pump plant, uPVC drainage stacks, and 16 Bar pressure certification.',
        handoverNote:
          'Official plumbing completion certificate & signed hydrostatic test dossier formally handed over by Tirat Plumbing management to the real estate development board.',
        deliverables: [
          'PN20 PP-R main risers and manifold distribution across 12 floors',
          'Dual automatic Booster Pump station with Dry-Run Protection',
          'Full 16 Bar Hydrostatic Pressure Test & signed handover certificate',
        ],
      },
      am: {
        title: 'ቦሌ መድኃኔዓለም የመኖሪያ ታወር',
        location: 'ቦሌ መድኃኔዓለም፣ አዲስ አበባ',
        scopeSummary:
          'ሙሉ የPN20 PP-R የሙቅና ቀዝቃዛ ውሃ መስመሮች፣ ጥንድ Booster Pump ጣቢያ፣ uPVC ፍሳሽ እና የ16 ባር ግፊት ማረጋገጫ።',
        handoverNote:
          'የቧንቧ ስራ ማጠናቀቂያ ሰርተፍኬት እና የተፈረመ የግፊት ፍተሻ ዶሴ በጥራት ፕላምቢንግ አመራር ለሪል እስቴት ተወካዮች በይፋ ተረክቧል።',
        deliverables: [
          'በ12 ፎቆች የተዘረጋ PN20 PP-R ዋና መስመርና Manifold ማከፋፈያ',
          'Dry-Run Protection ያለው ጥንድ አውቶማቲክ Booster Pump ጣቢያ',
          'ሙሉ የ16 ባር Hydrostatic Pressure Test እና የተፈረመ የርክክብ ሰርተፍኬት',
        ],
      },
      om: {
        title: 'Gamoo Jireenyaa Boolee Madhaaniyaalem',
        location: 'Boolee Madhaaniyaalem, Addis Ababaa',
        scopeSummary:
          'Sarara bishaan ho’aa fi qorraa PP-R PN20, buufata Booster Pump lama, sarara dhangala’aa uPVC fi mirkaneessa dhiibbaa 16 Bar.',
        handoverNote:
          'Waraqaan ragaa xumura hojii plumbing fi galmeen qorannoo dhiibbaa hoggansa Tirat Plumbing’n bakka bu’oota real estate’tti kennamaniiru.',
        deliverables: [
          'Sarara ijoo PP-R PN20 fi manifold fooqii 12f hojjetame',
          'Buufata Booster Pump ofumaan hojjetu Dry-Run Protection waliin',
          'Qorannoo Hydrostatic Pressure Test 16 Bar fi waraqaa ragaa harkaa fuudhuu',
        ],
      },
      ti: {
        title: 'መንበሪ ታወር ቦሌ መድኃኔዓለም',
        location: 'ቦሌ መድኃኔዓለም፣ ኣዲስ ኣበባ',
        scopeSummary:
          'ሙሉእ መስመራት ውዑይን ዝሑልን ማይ PN20 PP-R፣ ድርብ Booster Pump ጣብያ፣ ፍሳስ uPVCን ምስክር ወረቐት 16 ባርን።',
        handoverNote:
          'ወግዓዊ ምስክር ወረቐት ምዝዛም ስራሕ ቧንቧን ዝተፈረመ መረጋገጺ ጸቕጥን ብኣመራርሓ ጥራት ፕላምቢንግ ንተወከልቲ ሪል እስቴት ተረኪቡ።',
        deliverables: [
          'ኣብ 12 ደርብታት ዝተዘርግሐ ቀንዲ መስመር PP-R PN20ን Manifoldን',
          'Dry-Run Protection ዘለዎ ድርብ ኣውቶማቲክ Booster Pump',
          'ሙሉእ 16 ባር Hydrostatic Pressure Testን ዝተፈረመ ሰርተፍኬት ርኽክብን',
        ],
      },
    },
  },
  {
    id: 'PROJ-02',
    code: 'TP-RE-02',
    status: 'handed_over',
    imageKey: 'handover_cert_villas',
    certificateRef: 'CERT-2026-CM04',
    completionLabel: 'Q4 2025',
    unitsOrScale: '18 Luxury Villas',
    copy: {
      en: {
        title: 'CMC Sunset Villa Compound',
        location: 'CMC, Addis Ababa',
        scopeSummary:
          'Copper and PP-R hot/cold manifold rooms, solar water heater integration, sanitary fixture fitting, and quality recognition handover.',
        handoverNote:
          'Quality recognition certificate presented with estate management following zero-leak inspection across all 18 residential villas.',
        deliverables: [
          'Copper & PP-R dual-temperature villa manifold assemblies',
          'Bathroom & kitchen fixture installation with pressure-tested Mixers',
          'Signed quality recognition certificate upon zero-defect walkthrough',
        ],
      },
      am: {
        title: 'CMC Sunset የቪላ መኖሪያ መንደር',
        location: 'CMC፣ አዲስ አበባ',
        scopeSummary:
          'Copper እና PP-R የሙቅና ቀዝቃዛ Manifold ክፍሎች፣ የውሃ ማሞቂያ ግንኙነት፣ Sanitary ገጠማ እና የጥራት እውቅና ርክክብ።',
        handoverNote:
          'በ18ቱም ቪላዎች ምንም ፍሳሽ አለመኖሩ ከተረጋገጠ በኋላ የጥራት እውቅና ሰርተፍኬት ከሪል እስቴቱ አመራር ጋር ተረክቧል።',
        deliverables: [
          'Copper እና PP-R ባለሁለት ሙቀት የቪላ Manifold መገጣጠሚያዎች',
          'በግፊት የተፈተሹ Mixers እና የመታጠቢያ ቤት ዕቃዎች ገጠማ',
          'ምንም እንከን አለመኖሩ ከተረጋገጠ በኋላ የተሰጠ የጥራት እውቅና ሰርተፍኬት',
        ],
      },
      om: {
        title: 'Kompaawundii Viilaa CMC Sunset',
        location: 'CMC, Addis Ababaa',
        scopeSummary:
          'Manifold Copper fi PP-R ho’aa fi qorraa, hidhaa ho’istuu bishaanii, meeshaalee mana fincaanii fi harkaa fuudhuu qulqullinaa.',
        handoverNote:
          'Viilaalee 18 keessatti coccobni tokkollee akka hin jirre erga mirkanaa’ee booda waraqaan ragaa qulqullinaa hoggansa waliin kennameera.',
        deliverables: [
          'Manifold viilaa Copper fi PP-R ho’aa fi qorraaf qophaa’e',
          'Hidhaa meeshaalee mana fincaanii fi kushiinaa Mixers mirkanaa’an',
          'Waraqaa ragaa beekamtii qulqullinaa sakatta’insa guutuu booda',
        ],
      },
      ti: {
        title: 'መንበሪ መንደር ቪላታት CMC Sunset',
        location: 'CMC፣ ኣዲስ ኣበባ',
        scopeSummary:
          'Copperን PP-Rን Manifold ውዑይን ዝሑልን ማይ፣ ምትእስሳር መውዓዪ ማይ፣ ምትካል Sanitaryን ርኽክብ ምስክር ወረቐት ጽሬትን።',
        handoverNote:
          'ኣብ ኩለን 18 ቪላታት ዋላ ሓንቲ ፍሳስ ከምዘየለ ምስ ተረጋገጸ ምስ ኣመራርሓ ሪል እስቴት ምስክር ወረቐት ጽሬት ተረኪቡ።',
        deliverables: [
          'መተኣሳሰሪ Manifold ቪላ ብCopperን PP-Rን ንውዑይን ዝሑልን ማይ',
          'ብጸቕጢ ዝተፈተሹ Mixersን ምትካል ኣቕሑ መሕጸቢ ቤትን',
          'ድሕሪ ፍጹም ምርመራ ዝተዋህበ ዝተፈረመ ምስክር ወረቐት ኣፍልጦ ጽሬት',
        ],
      },
    },
  },
  {
    id: 'PROJ-03',
    code: 'TP-RE-03',
    status: 'completing_soon',
    imageKey: 'project_completing_apartments',
    completionLabel: 'Handover Q2 2026',
    unitsOrScale: 'G+8 · 32 Apartments',
    copy: {
      en: {
        title: 'Ayat Zone 3 Residences',
        location: 'Ayat, Addis Ababa',
        scopeSummary:
          'Full PP-R & uPVC vertical piping, rooftop tank distribution manifolds, and final bathroom fixture commissioning prior to handover.',
        handoverNote:
          'Final hydrostatic line verification and sanitary fixture fitting underway ahead of scheduled handover certification.',
        deliverables: [
          'Vertical PP-R water supply stacks and rooftop storage manifolds',
          'Odor-sealed uPVC drainage network with cleanout access points',
          'Pre-handover fixture testing across all 32 residential apartments',
        ],
      },
      am: {
        title: 'አያት ዞን 3 መኖሪያ አፓርትመንቶች',
        location: 'አያት፣ አዲስ አበባ',
        scopeSummary:
          'ሙሉ የPP-R እና uPVC ቀጥታ መስመሮች፣ የጣሪያ ታንከር Manifold ማከፋፈያ እና ከርክክብ በፊት የመጨረሻ የመታጠቢያ ዕቃ ፍተሻ።',
        handoverNote:
          'ለርክክብ ሰርተፍኬት ከመቅረቡ በፊት የመጨረሻ የግፊት ፍተሻ እና የዕቃ ገጠማ በመጠናቀቅ ላይ ይገኛል።',
        deliverables: [
          'ቋሚ የPP-R ንጹህ ውሃ መስመሮች እና የጣሪያ ታንከር Manifold',
          'ሽታ የሌለው uPVC የፍሳሽ መስመር ከማጽጃ ክፍተቶች ጋር',
          'በ32ቱም አፓርትመንቶች የቅድመ-ርክክብ ዕቃ እና ግፊት ፍተሻ',
        ],
      },
      om: {
        title: 'Manneen Jireenyaa Ayaat Zoonii 3',
        location: 'Ayaat, Addis Ababaa',
        scopeSummary:
          'Diriirsa ujummoo PP-R fi uPVC, manifold taankii baaxii fi xumura hidhaa meeshaalee mana fincaanii harkaa fuudhuun dura.',
        handoverNote:
          'Qorannoon dhiibbaa bishaanii fi hidhaan meeshaalee dhumaa waraqaa ragaa kennuun dura xumuramaa jira.',
        deliverables: [
          'Sarara bishaanii PP-R fi manifold kuusaa taankii baaxii',
          'Sarara dhangala’aa uPVC foolii ittisu bakka qulqulleessaa waliin',
          'Sakatta’insa duraa apaartamaantiiwwan 32 keessatti',
        ],
      },
      ti: {
        title: 'መንበሪ ኣፓርትመንትታት ኣያት ዞን 3',
        location: 'ኣያት፣ ኣዲስ ኣበባ',
        scopeSummary:
          'ሙሉእ ቀጥታዊ መስመራት PP-Rን uPVCን፣ Manifold ታንከር ናሕስን ቅድሚ ርኽክብ ዝግበር መዛዘሚ ምርመራ ኣቕሑ መሕጸቢ ቤትን።',
        handoverNote:
          'ቅድሚ ምስክር ወረቐት ርኽክብ ምውሃቡ ናይ መወዳእታ ፍተሻ ጸቕጢ ማይን ምትካል ኣቕሑን ኣብ ምዝዛም ይርከብ።',
        deliverables: [
          'ቀጥታዊ መስመራት ጽሩይ ማይ PP-Rን Manifold ታንከር ናሕስን',
          'ሽታ ዘይብሉ መስመር ፍሳስ uPVC ምስ መጽረዪ መኽፈቲታት',
          'ኣብ ኩሎም 32 ኣፓርትመንትታት ቅድሚ ርኽክብ ዝካየድ ፍተሻ ኣቕሑ',
        ],
      },
    },
  },
  {
    id: 'PROJ-04',
    code: 'TP-RE-04',
    status: 'completing_soon',
    imageKey: 'project_completing_plaza',
    completionLabel: 'Commissioning 2026',
    unitsOrScale: 'G+10 Commercial & Suites',
    copy: {
      en: {
        title: 'Kazanchis Mixed-Use Plaza',
        location: 'Kazanchis, Addis Ababa',
        scopeSummary:
          'Commercial Copper & PP-R plant room, triplex Booster Pump array, forged brass isolation valves, and 16 Bar commissioning.',
        handoverNote:
          'Mechanical room manifolds and pressure-balancing tests in final verification stage ahead of developer sign-off.',
        deliverables: [
          'Triplex stainless-steel Booster Pump assembly with bypass headers',
          'Forged brass isolation valve banks and pressure gauge stations',
          'Zone-by-zone 16 Bar Hydrostatic Pressure Test verification',
        ],
      },
      am: {
        title: 'ካዛንቺስ Mixed-Use ፕላዛ',
        location: 'ካዛንቺስ፣ አዲስ አበባ',
        scopeSummary:
          'የንግድ ህንጻ Copper እና PP-R የፓምፕ ክፍል፣ ባለ 3 Booster Pump መስመር፣ ብራስ ቫልቮች እና የ16 ባር ፍተሻ።',
        handoverNote:
          'የሜካኒካል ክፍል Manifold እና የግፊት ማመጣጠኛ ፍተሻዎች ለመጨረሻ ፊርማና ርክክብ በዝግጅት ላይ ናቸው።',
        deliverables: [
          'ባለ 3 ስቴንለስ ስቲል Booster Pump ከBypass መስመር ጋር',
          'ፎርጅድ ብራስ መዝጊያ ቫልቮች እና የግፊት መለኪያ ጣቢያዎች',
          'በእያንዳንዱ ፎቅ የ16 ባር Hydrostatic Pressure Test ማረጋገጫ',
        ],
      },
      om: {
        title: 'Pilaazaa Kaazaanchiis Mixed-Use',
        location: 'Kaazaanchiis, Addis Ababaa',
        scopeSummary:
          'Kutaa paampii Copper fi PP-R daldalaa, Booster Pump sadii, vaalvii brass fi qorannoo dhiibbaa 16 Bar.',
        handoverNote:
          'Manifold kutaa makaanikaalaa fi qorannoon madaallii dhiibbaa mallattoo harkaa fuudhuu dura xumuramaa jira.',
        deliverables: [
          'Booster Pump stainless steel sadii sarara bypass waliin',
          'Vaalvii brass fi buufata safartuu dhiibbaa bishaanii',
          'Mirkaneessa Hydrostatic Pressure Test 16 Bar zoonii hundaan',
        ],
      },
      ti: {
        title: 'ፕላዛ ካዛንቺስ Mixed-Use',
        location: 'ካዛንቺስ፣ ኣዲስ ኣበባ',
        scopeSummary:
          'ንግዳዊ ክፍሊ ፓምፕ Copperን PP-Rን፣ ሰለስተ Booster Pump፣ ብራስ ቫልቭታትን ምርመራ 16 ባርን።',
        handoverNote:
          'Manifold ሜካኒካዊ ክፍልን ፍተሻታት ሚዛን ጸቕጥን ቅድሚ ናይ መወዳእታ ፊርማን ርኽክብን ኣብ ምጽራይ ይርከቡ።',
        deliverables: [
          'ሰለስተ ስቴንለስ ስቲል Booster Pump ምስ መስመር Bypass',
          'ፎርጅድ ብራስ መዕጸዊ ቫልቭታትን መዐቀኒ ጸቕጥን',
          'ብነፍሲ ወከፍ ዞባ ዝተረጋገጸ 16 ባር Hydrostatic Pressure Test',
        ],
      },
    },
  },
];

export function getProjectStatusCounts(projects: readonly RealEstateProject[]) {
  let handedOver = 0;
  let completingSoon = 0;
  for (const project of projects) {
    if (project.status === 'handed_over') {
      handedOver += 1;
    } else {
      completingSoon += 1;
    }
  }
  return {
    total: projects.length,
    handedOver,
    completingSoon,
  };
}
