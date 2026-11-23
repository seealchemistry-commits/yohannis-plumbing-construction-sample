import type {
  BlogArticle,
  ComingSoonService,
  Product,
  ServiceItem,
} from '../commerce/types';

export const COMPANY_INFO = {
  brandNameAm: 'ጥራት ፕላምቢንግ',
  taglineAm:
    '24/7 Emergency Leak Repair፣ ባለሙያ የPPR, PVC እና Copper ቧንቧ ዝርጋታ እና የቧንቧ ዕቃዎች አቅርቦት',
  phoneDisplay: '+251 912 453 752',
  phoneHref: 'tel:+251912453752',
  whatsappBaseUrl: 'https://wa.me/251912453752',
  telegramHandle: '@TiratPlumbing',
  telegramHref: 'https://t.me/TiratPlumbing',
  email: 'info@tiratplumbing.et',
  addressAm: 'ቦሌ መድኃኔዓለም፣ ከሴሉ ህንጻ ጎን 2ኛ ፎቅ፣ አዲስ አበባ',
  coordinatesLabel: '8.9974° N, 38.7892° E',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Bole+Medhanialem+Addis+Ababa',
  hoursAm: 'ሰኞ – ቅዳሜ፡ 02:00 ጠዋት – 11:30 ማታ (24/7 Emergency Leak Repair)',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'SRV-01',
    number: '01',
    titleAm: 'የንጹህ ውሃ መስመር ዝርጋታ (PP-R, PVC, Copper)',
    summaryAm:
      'ለቤቶችና ህንጻዎች የሙቅና ቀዝቃዛ ውሃ መስመር በPP-R (PPR), PVC እና Copper እንዘረጋለን።',
    deliverablesAm: [
      'ትክክለኛ የPP-R, PVC እና Copper መስመር ገጠማ',
      'በ16 ባር Hydrostatic Pressure Test ፍተሻ',
      'ለሙቅና ቀዝቃዛ ውሃ የተለየ ኢንሱሌሽን',
    ],
    estimatedDurationAm: 'ከ2 እስከ 14 ቀናት (በስራው ስፋት)',
    featured: true,
  },
  {
    id: 'SRV-02',
    number: '02',
    titleAm: 'የፍሳሽ ማስወገጃ መስመር ዝርጋታና የተደፈነ ቧንቧ ማጽዳት',
    summaryAm:
      'ሽታ የሌለው uPVC የፍሳሽ መስመር ዝርጋታ እና የተደፈኑ ቧንቧዎችን ግድግዳ ሳይፈርስ ማጽዳት።',
    deliverablesAm: [
      'ትክክለኛ Slope ያለው uPVC የፍሳሽ መስመር ዝርጋታ',
      'የተደፈኑ ቧንቧዎችን በሜካኒካል ማጽጃ መክፈት',
      'የFloor Trap እና Vent Pipe ሽታ መከላከያ ገጠማ',
    ],
    estimatedDurationAm: 'ከ2 ሰዓት እስከ 3 ቀናት',
  },
  {
    id: 'SRV-03',
    number: '03',
    titleAm: 'የውሃ ፓምፕ (Booster Pump)፣ የውሃ ታንከር እና የውሃ ማሞቂያ ገጠማ',
    summaryAm:
      'በሁሉም ፎቆች እኩል ግፊት እንዲኖር Booster pump፣ ታንከር እና ቦይለሮችን እንገጥማለን።',
    deliverablesAm: [
      'Booster Pump ከAutomatic Pressure Switch እና Dry-Run Protection ጋር',
      'የውሃ ታንከር Float Valve እና Check Valve ገጠማ',
      'የሙቅ ውሃ ቦይለር Safety Valve ተከላ',
    ],
    estimatedDurationAm: '1 ቀን',
  },
  {
    id: 'SRV-04',
    number: '04',
    titleAm: 'የመታጠቢያ ቤትና የኩሽና ዕቃዎች ገጠማ (ሻወር፣ መጸዳጃ፣ ሲንክ፣ ቧንቧ)',
    summaryAm:
      'ሻወር፣ መጸዳጃ (WC)፣ ሲንክ፣ ቀላቃይ ቧንቧዎች (Mixers) እና የማጠቢያ መስመር ያለ ፍሳሽ ገጠማ።',
    deliverablesAm: [
      'የሻወር፣ WC እና ሲንክ ገጠማና ሲሊኮን ማሸግ',
      'የAngle Valve እና Flexible Hose ጥራት ያለው ግንኙነት',
      'የውሃ ግፊት እና የፍሳሽ ፍተሻ ከርክክብ በፊት',
    ],
    estimatedDurationAm: 'ከ3 ሰዓት እስከ 2 ቀናት',
  },
  {
    id: 'SRV-05',
    number: '05',
    titleAm: 'የውሃ ፍሳሽ መለየትና አስቸኳይ ጥገና (24/7 Emergency Leak Repair)',
    summaryAm:
      'ለተደበቀ የውሃ ፍሳሽ፣ ለፈነዳ ቧንቧ ወይም ለተበላሸ ቫልቭ 24/7 በፍጥነት ደርሰን እንጠግናለን።',
    deliverablesAm: [
      'በ24/7 አስቸኳይ ጥሪ በአዲስ አበባ ፈጣን መድረስ',
      'ግድግዳ ሳይበላሽ የተሰበረ ቧንቧ መለየትና መተካት',
      'የግፊት ቫልቭና መገጣጠሚያ ድንገተኛ ጥገና',
    ],
    estimatedDurationAm: 'በ1 እስከ 3 ሰዓታት ውስጥ',
    featured: true,
  },
];

export const COMING_SOON_SERVICES: ComingSoonService[] = [
  {
    id: 'CS-01',
    titleAm: 'አጠቃላይ የህንጻ ግንባታ',
    subtitleEn: 'Building Construction',
    summaryAm:
      'የመኖሪያ ቪላዎችና የንግድ ህንጻዎችን ከመሰረት እስከ ማጠናቀቂያ በባለሙያ የምህንድስና ቡድን የመገንባት አገልግሎት በቅርቡ ይጀመራል።',
    expectedLaunchAm: 'በቅርብ ቀን (Coming Soon)',
  },
  {
    id: 'CS-02',
    titleAm: 'የቤት እና የቢሮ እድሳት',
    subtitleEn: 'Home & Office Renovation',
    summaryAm:
      'የመታጠቢያ ቤት፣ የኩሽና እና አጠቃላይ የውስጥ ክፍሎችን ዘመናዊ ዲዛይን በማድረግ የማደስ አገልግሎት በቅርቡ ይጀመራል።',
    expectedLaunchAm: 'በቅርብ ቀን (Coming Soon)',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'PRD-101',
    sku: 'PPR-PN20',
    nameAm: 'PPR የንጹህ ውሃ ቧንቧ (PN20)',
    specAm: '4 ሜትር ዘንግ · ለሙቅና ቀዝቃዛ ውሃ · ISO 15874',
    category: 'PIPES',
    categoryLabelAm: 'PPR/PVC ቧንቧዎች',
    unitAm: 'በዘንግ',
    priceEtb: 1250,
    sizePricesEtb: {
      '1/2"': 950,
      '3/4"': 1250,
      '1"': 1680,
    },
    availableSizes: ['1/2"', '3/4"', '1"'],
    inStock: true,
    stockCount: 120,
    imageKey: 'ppr_pipes',
  },
  {
    id: 'PRD-102',
    sku: 'BRV-PN16',
    nameAm: 'ፎርጅድ ብራስ ቦል ቫልቭ (Brass Ball Valve)',
    specAm: 'ከባድ አገልግሎት የሚሰጥ የማይዝግ ብራስ · 16 ባር ግፊት',
    category: 'VALVES',
    categoryLabelAm: 'መገጣጠሚያዎችና ቫልቮች',
    unitAm: 'በፍሬ',
    priceEtb: 1450,
    sizePricesEtb: {
      '1/2"': 980,
      '3/4"': 1450,
      '1"': 2100,
    },
    availableSizes: ['1/2"', '3/4"', '1"'],
    inStock: true,
    stockCount: 54,
    imageKey: 'brass_valves',
  },
  {
    id: 'PRD-103',
    sku: 'PMP-SS-750',
    nameAm: 'አውቶማቲክ Booster Pump (750W)',
    specAm: 'ስቴንለስ ስቲል ሞተር · የግፊት መቆጣጠሪያ ያለው · ጸጥተኛ',
    category: 'PUMPS',
    categoryLabelAm: 'የውሃ ፓምፖች',
    unitAm: 'በፍሬ',
    priceEtb: 18500,
    sizePricesEtb: {
      '1/2"': 17800,
      '3/4"': 18500,
      '1"': 19900,
    },
    availableSizes: ['1/2"', '3/4"', '1"'],
    inStock: true,
    stockCount: 14,
    imageKey: 'water_pump',
  },
  {
    id: 'PRD-104',
    sku: 'SNT-MIX-304',
    nameAm: 'ብረሽድ ስቴንለስ የመታጠቢያ ቧንቧና ትራፕ',
    specAm: '304 ስቴንለስ ስቲል · ሙቅና ቀዝቃዛ ቀላቃይ (Mixer) · 5 ዓመት ዋስትና',
    category: 'SANITARY',
    categoryLabelAm: 'የመታጠቢያ ቤት ዕቃዎች',
    unitAm: 'በሴት',
    priceEtb: 6400,
    sizePricesEtb: {
      '1/2"': 6400,
      '3/4"': 6850,
      '1"': 7300,
    },
    availableSizes: ['1/2"', '3/4"', '1"'],
    inStock: true,
    stockCount: 28,
    imageKey: 'mixer_faucet',
  },
  {
    id: 'PRD-105',
    sku: 'PVC-DRN-KIT',
    nameAm: 'PPR እና PVC መገጣጠሚያ ፓኬጅ (Elbow & Tee)',
    specAm: '10 Elbow + 10 Tee + 6 Coupling · ያለ ፍሳሽ የሚገጠም',
    category: 'PIPES',
    categoryLabelAm: 'PPR/PVC ቧንቧዎች',
    unitAm: 'በፓኬጅ',
    priceEtb: 3200,
    sizePricesEtb: {
      '1/2"': 2600,
      '3/4"': 3200,
      '1"': 4100,
    },
    availableSizes: ['1/2"', '3/4"', '1"'],
    inStock: true,
    stockCount: 36,
    imageKey: 'pvc_fittings_kit',
  },
  {
    id: 'PRD-106',
    sku: 'VLV-CHK-PN16',
    nameAm: 'ብራስ Check Valve እና የግፊት መለኪያ',
    specAm: 'ውሃ ወደ ኋላ እንዳይመለስ የሚከላከል · ለBooster Pump ተስማሚ',
    category: 'VALVES',
    categoryLabelAm: 'መገጣጠሚያዎችና ቫልቮች',
    unitAm: 'በሴት',
    priceEtb: 1950,
    sizePricesEtb: {
      '1/2"': 1550,
      '3/4"': 1950,
      '1"': 2550,
    },
    availableSizes: ['1/2"', '3/4"', '1"'],
    inStock: true,
    stockCount: 64,
    imageKey: 'brass_fittings_board',
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'BLG-01',
    titleAm: 'ትክክለኛ የPPR, PVC እና Copper ቧንቧ ዕቃዎችን እንዴት እንመርጣለን?',
    categoryAm: 'የቧንቧ ዕቃ ምርጫ',
    publishedDateAm: 'ህዳር 8 ቀን 2019 ዓ.ም',
    readTimeAm: '4 ደቂቃ ንባብ',
    excerptAm:
      'ለመኖሪያ ቤት ንጹህ ውሃ፣ ለሙቅ ውሃ መስመር እና ለፍሳሽ ማስወገጃ ትክክለኛውን የቧንቧ መጠን (1/2", 3/4", 1") እና የግፊት ደረጃ (PN20) መምረጥ ዘላቂነትን ያረጋግጣል።',
    paragraphsAm: [
      'በገበያ ላይ ብዙ አይነት የቧንቧ ዕቃዎች ቢገኙም ሁሉም ለሁሉም ስራ አይሆኑም። ለዋና የቤት መግቢያ እና ከBooster Pump ለሚወጣ ከፍተኛ ግፊት መስመር 1" ወይም 3/4" PN20 PPR ቧንቧ መጠቀም የውሃ ፍሰትን ያመቻቻል።',
      'ወደ እያንዳንዱ መታጠቢያ ቤትና ሲንክ የሚገቡ ቅርንጫፎች በ1/2" ሲዘረጉ የውሃ ግፊቱ ሳይቀንስ እኩል ይዳረሳል። ለሙቅ ውሃ መስመር ደግሞ በፍጹም ቀጭን PN10 ወይም ተራ PVC መጠቀም አይገባም።',
      'በጥራት ፕላምቢንግ የPPR መገጣጠሚያዎችን በትክክለኛ የሙቀት መጠን (260°C) በማቅለጥ እና በ16 ባር የግፊት መለኪያ በመፈተሽ ፍሳሽ የሌለበት መስመር እናስረክባለን።',
    ],
    authorAm: 'ዮሐንስ ታደሰ · ዋና የቧንቧ ባለሙያ',
    imageKey: 'pipes_showcase',
  },
  {
    id: 'BLG-02',
    titleAm: 'በቤት ውስጥ የሚከሰት የውሃ ፍሳሽ መከላከል እና 24/7 Emergency Leak Repair',
    categoryAm: 'የውሃ ፍሳሽ መከላከል',
    publishedDateAm: 'ጥቅምት 29 ቀን 2019 ዓ.ም',
    readTimeAm: '3 ደቂቃ ንባብ',
    excerptAm:
      'ያልተጠበቀ የውሃ ፍሳሽ ግድግዳንና የቤት እቃዎችን ከማበላሸቱ በፊት ምልክቶቹን በጊዜ ማወቅና Emergency Leak Repair መጥራት ወጪን ይቀንሳል።',
    paragraphsAm: [
      'ብዙ ጊዜ የውሃ ፍሳሽ የሚጀምረው በትንሽ ጠብታ በሲንክ ስር ካለ Angle Valve ወይም ከመጸዳጃ ቤት ታንከር ውስጥ ነው። የውሃ ቆጣሪዎ ሁሉም ቧንቧዎች ተዘግተው እየዞረ ከሆነ የተደበቀ ፍሳሽ መኖሩን የሚያሳይ ግልጽ ምልክት ነው።',
      'በግድግዳ ላይ እርጥበት፣ የቀለም መላላጥ ወይም የውሃ ግፊት በድንገት መቀነስ ሲያስተውሉ ግድግዳውን በዘፈቀደ ከማፍረስ ይልቅ በ24/7 Emergency Leak Repair ቡድናችን ትክክለኛውን ቦታ በመሳሪያ ማስለየት ይመከራል።',
      'ዋናውን የመዝጊያ Ball Valve በየ6 ወሩ አንዴ በመዝጋትና በመክፈት መስራቱን ማረጋገጥ በድንገተኛ አደጋ ጊዜ ውሃውን በፍጥነት ለመዝጋት ይረዳል።',
    ],
    authorAm: 'ኢንጂነር ብርሃኑ ተስፋዬ · የሳኒተሪ ባለሙያ',
    imageKey: 'site_engineer',
  },
  {
    id: 'BLG-03',
    titleAm: 'የBooster Pump እና የውሃ ታንከር ትክክለኛ አጠቃቀምና ጥገና',
    categoryAm: 'የቧንቧ አጠቃቀም',
    publishedDateAm: 'ጥቅምት 14 ቀን 2019 ዓ.ም',
    readTimeAm: '4 ደቂቃ ንባብ',
    excerptAm:
      'የBooster Pump ሞተር እንዳይቃጠል Dry-Run Protection፣ Check Valve እና የታንከር ንጽህና አጠባበቅ ላይ መደረግ ያለበት ጥንቃቄ።',
    paragraphsAm: [
      'የአዲስ አበባ የውሃ መቆራረጥ በሚኖርበት ጊዜ Booster Pump ውሃ በሌለበት በባዶ እንዳይሽከረከር Dry-Run Protection ያለው Pressure Controller መግጠም እጅግ አስፈላጊ ነው።',
      'በተጨማሪም በፓምፑ መውጫ ላይ ጥራት ያለው ብራስ Check Valve ካልተገጠመ የገፋው ውሃ ወደ ኋላ እየተመለሰ ፓምፑን በየደቂቃው እንዲነሳና እንዲበላሽ ያደርገዋል።',
      'የጣሪያ እና የመሬት ውስጥ የውሃ ታንከሮችን በየ6 ወሩ ማጽዳትና የFloat Valve መስራቱን ማየት ቆሻሻ ወደ ቧንቧ ቀላቃዮች (Mixers) እና ሻወር ጭንቅላቶች ገብቶ እንዳይደፍን ይከላከላል።',
    ],
    authorAm: 'ቴክኒሻን ዳዊት መኮንን · የBooster Pump ስፔሻሊስት',
    imageKey: 'hero_plumbing',
  },
];

export const COMPLETED_PROJECTS = [
  {
    nameAm: 'ቦሌ ሩዋንዳ G+4 የንግድ ህንጻ የቧንቧ ስርዓት',
    scopeAm: 'ሙሉ የPPR ንጹህ ውሃ፣ uPVC ፍሳሽ መስመር እና 3 የጣሪያ Booster Pump ገጠማ',
    metricAm: '3,400 ሜትር PPR መስመር · 0% የፍሳሽ ችግር',
  },
  {
    nameAm: 'አያት መንደር 12 ቪላዎች Sanitary & Piping',
    scopeAm: 'ሙሉ የመታጠቢያ ቤትና ኩሽና ዕቃዎች ገጠማ፣ ቦይለር እና የውሃ ታንከር ስርዓት',
    metricAm: '100% የ16 ባር ግፊት ፍተሻ · 2 ዓመት ዋስትና',
  },
  {
    nameAm: 'ቃሊቲ የምግብ ማቀነባበሪያ የውሃና ፍሳሽ መስመር',
    scopeAm: 'ከፍተኛ ግፊት Copper እና PPR የውሃ መስመርና የፍሳሽ ማጽጃ ገጠማ',
    metricAm: '24/7 Emergency Leak Repair ድጋፍ',
  },
];
