import type { BlogArticle, Product, ServiceItem } from '../commerce/types';

export const COMPANY_INFO = {
  brandNameAm: 'ዮሐንስ Plumbing',
  taglineAm: 'ዘመናዊ የቧንቧ መስመር ዝርጋታ እና አስተማማኝ የህንጻ ግንባታ',
  phoneDisplay: '+251 912 453 752',
  phoneHref: 'tel:+251912453752',
  email: 'info@yohannesplumbing.et',
  addressAm: 'ቦሌ መድኃኔዓለም፣ ከሴሉ ህንጻ ጎን 2ኛ ፎቅ፣ አዲስ አበባ',
  hoursAm: 'ሰኞ – ቅዳሜ፡ 02:00 ጠዋት – 11:30 ማታ (ድንገተኛ ጥገና 24 ሰዓት)',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'SRV-01',
    number: '01',
    titleAm: 'የህንጻ የውሃና ፍሳሽ ቧንቧ ዝርጋታ',
    summaryAm:
      'ለአዲስ መኖሪያ ቤቶች፣ አፓርታማዎችና ንግድ ህንጻዎች በዓለም አቀፍ ደረጃ የPPR፣ uPVC እና የመዳብ የውሃና የፍሳሽ መስመሮችን በግፊት መለኪያ ፈትሸን እንዘረጋለን።',
    deliverablesAm: [
      'ሙሉ የሳኒተሪ ዲዛይንና የመስመር ካርታ',
      'በ16 ባር የግፊት ፍተሻ (Hydrostatic Pressure Test)',
      'የሙቅና ቀዝቃዛ ውሃ የተለየ ኢንሱሌሽን',
    ],
    estimatedDurationAm: 'ከ5 እስከ 21 ቀናት (በህንጻው ስፋት)',
    featured: true,
  },
  {
    id: 'SRV-02',
    number: '02',
    titleAm: 'የድንገተኛ ፍሳሽ መለየትና ጥገና',
    summaryAm:
      'ግድግዳ ሳንሰብር በዘመናዊ የድምጽና የሙቀት ፍሳሽ መመርመሪያ መሳሪያ የተሰበሩ የቧንቧ መስመሮችን በፍጥነት በመለየት ዘላቂ ጥገና እንሰጣለን።',
    deliverablesAm: [
      'ያለ ብዙ ፍረሳ ትክክለኛ የፍሳሽ ቦታ መለየት',
      'የተዘጉ የፍሳሽ መስመሮችን በሃይል ማጽዳት',
      'የመገጣጠሚያና የቫልቭ ፈጣን ምትክ',
    ],
    estimatedDurationAm: 'በ2 እስከ 4 ሰዓታት ውስጥ',
  },
  {
    id: 'SRV-03',
    number: '03',
    titleAm: 'የውሃ ፓምፕ፣ ቦይለርና ታንከር ተከላ',
    summaryAm:
      'ከምድር በታች ከሚገኝ ማጠራቀሚያ እስከ ጣሪያ ድረስ ውሃ የሚገፉ አውቶማቲክ ፓምፖች፣ የሶላርና የኤሌክትሪክ ቦይለሮች፣ እንዲሁም የንጹህ ውሃ ማጣሪያዎች ተከላ።',
    deliverablesAm: [
      'አውቶማቲክ የግፊት መቆጣጠሪያ (Pressure Switch) ተከላ',
      'የውሃ ታንከር መሰረትና የጸረ-ዝገት መገጣጠሚያ',
      'የ6 ወር ነጻ የፍተሻ ክትትል',
    ],
    estimatedDurationAm: '1 ቀን',
  },
  {
    id: 'SRV-04',
    number: '04',
    titleAm: 'አጠቃላይ የህንጻ ግንባታና እድሳት',
    summaryAm:
      'ከመሰረት ቁፋሮ እስከ ማጠናቀቂያ (Finishing) ድረስ የመኖሪያ ቪላዎችን፣ የቢሮ ህንጻዎችን እና የመታጠቢያ ቤቶችን በጥራትና በታቀደ ጊዜ እንገነባለን።',
    deliverablesAm: [
      'የኮንክሪትና የብረት መዋቅር ስራ (G+0 እስከ G+5)',
      'የሴራሚክ፣ የእምነበረድና የውሃ መከላከያ (Waterproofing)',
      'የመጨረሻ የጥራት ርክክብ ሪፖርት',
    ],
    estimatedDurationAm: 'በፕሮጀክት ስምምነት',
    featured: true,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'PRD-101',
    sku: 'PPR-32-PN20',
    nameAm: 'PPR የግፊት ውሃ ቧንቧ (32mm PN20)',
    specAm: '4 ሜትር ዘንግ · ለሙቅና ቀዝቃዛ ውሃ · ISO 15874',
    category: 'PIPES',
    categoryLabelAm: 'ቧንቧዎች',
    unitAm: 'በዘንግ',
    priceEtb: 1250,
    inStock: true,
    stockCount: 120,
    imageKey: 'ppr_pipes',
  },
  {
    id: 'PRD-102',
    sku: 'BRV-25-PN16',
    nameAm: 'ፎርጅድ ብራስ ቦል ቫልቭና መለኪያ ሴት',
    specAm: '1 ኢንች (25mm) · የማይዝግ ብራስ · 16 ባር ግፊት',
    category: 'VALVES',
    categoryLabelAm: 'ቫልቮችና መገጣጠሚያዎች',
    unitAm: 'በሴት',
    priceEtb: 2850,
    inStock: true,
    stockCount: 45,
    imageKey: 'brass_valves',
  },
  {
    id: 'PRD-103',
    sku: 'PMP-SS-750',
    nameAm: 'ስቴንለስ ስቲል አውቶማቲክ ውሃ ፓምፕ (750W)',
    specAm: '1 HP ሞተር · እስከ 45 ሜትር ከፍታ የሚገፋ · ጸጥተኛ',
    category: 'PUMPS',
    categoryLabelAm: 'ፓምፕና ታንከር',
    unitAm: 'በፍሬ',
    priceEtb: 18500,
    inStock: true,
    stockCount: 14,
    imageKey: 'water_pump',
  },
  {
    id: 'PRD-104',
    sku: 'SNT-MIX-304',
    nameAm: 'ብረሽድ ስቴንለስ የመታጠቢያ ቧንቧና ትራፕ',
    specAm: '304 ስቴንለስ ስቲል · ሙቅና ቀዝቃዛ ቀላቃይ · 5 ዓመት ዋስትና',
    category: 'SANITARY',
    categoryLabelAm: 'የመታጠቢያ እቃዎች',
    unitAm: 'በሴት',
    priceEtb: 6400,
    inStock: true,
    stockCount: 28,
    imageKey: 'mixer_faucet',
  },
  {
    id: 'PRD-105',
    sku: 'PPR-25-KIT',
    nameAm: 'PPR 25mm ሙሉ የቤት መገጣጠሚያ ፓኬጅ',
    specAm: '10 ዘንግ ቧንቧ + 20 ኤልቦ + 10 ቲ (Tee) መገጣጠሚያ',
    category: 'PIPES',
    categoryLabelAm: 'ቧንቧዎች',
    unitAm: 'በፓኬጅ',
    priceEtb: 11800,
    inStock: true,
    stockCount: 18,
    imageKey: 'ppr_pipes',
  },
  {
    id: 'PRD-106',
    sku: 'VLV-CHK-32',
    nameAm: 'ብራስ ቼክ ቫልቭና የግፊት ተቆጣጣሪ (32mm)',
    specAm: 'ውሃ ወደ ኋላ እንዳይመለስ የሚከላከል · ለፓምፕ መስመር ተስማሚ',
    category: 'VALVES',
    categoryLabelAm: 'ቫልቮችና መገጣጠሚያዎች',
    unitAm: 'በፍሬ',
    priceEtb: 1950,
    inStock: true,
    stockCount: 64,
    imageKey: 'brass_valves',
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'BLG-01',
    titleAm: 'በአዲስ ህንጻ ላይ የውሃ መስመር ከመዘርጋቱ በፊት መታየት ያለባቸው 5 ወሳኝ ነጥቦች',
    categoryAm: 'የቧንቧ ምህንድስና',
    publishedDateAm: 'ህዳር 8 ቀን 2019 ዓ.ም',
    readTimeAm: '4 ደቂቃ ንባብ',
    excerptAm:
      'ግድግዳ ከተለሰነ በኋላ የሚከሰት የውሃ ፍሳሽ ከፍተኛ ወጪ ያስከትላል። ከጅምሩ ትክክለኛ የPPR ውፍረት እና የግፊት ፍተሻ መጠቀም ዘላቂ መፍትሄ ይሰጣል።',
    paragraphsAm: [
      'ብዙ ባለቤቶችና ኮንትራክተሮች በግንባታ ወቅት የቧንቧ ስራውን እንደ ቀላል ማጠናቀቂያ ስራ ይመለከቱታል። ይሁን እንጂ ከ80% በላይ የሆኑ የህንጻ እድሳት ወጪዎች የሚመነጩት በተደበቀ የውሃ መስመር ፍሳሽ ምክንያት ነው።',
      'በመጀመሪያ ደረጃ ለሙቅ ውሃ እና ለቀዝቃዛ ውሃ ተገቢውን የPPR ደረጃ (PN20 ወይም PN25) መለየት ያስፈልጋል። ቀጭን PN10 ቧንቧ ለከፍተኛ የፎቅ ግፊት ወይም ለቦይለር ሙቀት ከተጠቀሙ በአጭር ጊዜ ውስጥ መተጣጠፍና መሰነጣጠቅ ይከሰታል።',
      'በሁለተኛ ደረጃ የPPR መገጣጠሚያዎች በኤሌክትሪክ ማሞቂያ (Fusion Machine) ሲገጠሙ ትክክለኛው የሙቀት መጠን (260°C) እና የማቆያ ሰከንድ መጠበቅ አለበት። ከመጠን በላይ ከቀለጠ የቧንቧው ውስጣዊ ቀዳዳ ይጠባል።',
      'በመጨረሻም ግድግዳው በሲሚንቶ ከመሸፈኑ በፊት መላው መስመር በ12 እስከ 16 ባር የውሃ ግፊት ለ24 ሰዓት መፈተሽ አለበት። ዮሐንስ Plumbing በእያንዳንዱ ፕሮጀክት ይህንን ፍተሻ በጽሁፍ ማረጋገጫ ያከናውናል።',
    ],
    authorAm: 'ኢንጂነር ብርሃኑ ተስፋዬ · ዋና የሳኒተሪ መሐንዲስ',
    imageKey: 'site_engineer',
  },
  {
    id: 'BLG-02',
    titleAm: 'ለቤትዎ ወይም ለአፓርታማዎ ትክክለኛውን የውሃ ፓምፕ እንዴት ይመርጣሉ?',
    categoryAm: 'መሳሪያና ቴክኖሎጂ',
    publishedDateAm: 'ጥቅምት 29 ቀን 2019 ዓ.ም',
    readTimeAm: '3 ደቂቃ ንባብ',
    excerptAm:
      'ትልቅ ዋት ያለው ፓምፕ ሁልጊዜ የተሻለ አይደለም። የህንጻውን ከፍታ (Head)፣ የውሃ ፍሰት (Flow Rate) እና የድምጽ መጠን መሰረት ያደረገ ምርጫ።',
    paragraphsAm: [
      'ብዙ ጊዜ ከምድር በታች ካለ ታንከር ወደ ጣሪያ ውሃ ለመግፋት ትክክለኛ ስሌት ሳይሰራ ከፍተኛ ጉልበት ያለው ፓምፕ ይገዛል። ይህ ደግሞ በቧንቧ መገጣጠሚያዎች ላይ ከፍተኛ ጫና (Water Hammer) እና የኤሌክትሪክ ብክነት ይፈጥራል።',
      'ለG+1 እና G+2 መኖሪያ ቤቶች ከ0.75 HP እስከ 1 HP የሆነ ስቴንለስ ስቲል ሴንትሪፉጋል ፓምፕ ከአውቶማቲክ የግፊት ተቆጣጣሪ (Automatic Pressure Controller) ጋር በቂ ሲሆን ድምጹም ዝቅተኛ ነው።',
      'ውሃ ሲቋረጥ ፓምፑ በባዶ እየሰራ እንዳይቃጠል Dry-Run Protection ያለው እና በመግቢያው ላይ የብራስ ቼክ ቫልቭ የተገጠመለት መሆኑን ማረጋገጥ ወሳኝ ነው።',
    ],
    authorAm: 'ቴክኒሻን ዳዊት መኮንን · የፓምፕ ስርዓት ባለሙያ',
    imageKey: 'hero_plumbing',
  },
  {
    id: 'BLG-03',
    titleAm: 'የዝናብ ውሃ ማፋሰሻና የመታጠቢያ ቤት የውሃ መከላከያ (Waterproofing) ጥቅም',
    categoryAm: 'የግንባታ ጥራት',
    publishedDateAm: 'ጥቅምት 14 ቀን 2019 ዓ.ም',
    readTimeAm: '5 ደቂቃ ንባብ',
    excerptAm:
      'ከታችኛው ፎቅ ኮርኒስ ላይ የውሃ ጠብታ እንዳይታይ እና የአርማታ ብረት እንዳይዝግ በሴራሚክ ስር መደረግ ያለበት ጥንቃቄ።',
    paragraphsAm: [
      'በአዲስ አበባ ብዙ አዳዲስ አፓርታማዎች ውስጥ ከጥቂት ወራት በኋላ በመታጠቢያ ቤት አካባቢ ግድግዳ ላይ የእርጥበት መበላሸት ይታያል። ዋናው ምክንያት ከሴራሚክ ንጣፍ በታች የውሃ መከላከያ ሽፋን (Membrane Waterproofing) አለመደረጉ ነው።',
      'የፍሳሽ ቧንቧ መውጫዎች (Floor Drains) አካባቢ በተለይ ትኩረት ይሻል። የuPVC መስመሩ ከኮንክሪት ወለል ጋር በትክክል ካልታሸገ ውሃ ቀስ በቀስ ወደ አርማታው ውስጥ ሰርጎ ይገባል።',
      'እኛ በዮሐንስ Plumbing የሳኒተሪ ስራውን ስናጠናቅቅ ከሴራሚክ ስራው በፊት ሁለት ንብርብር የውሃ መከላከያ በመቀባት የ48 ሰዓት የውሃ ሙከራ (Ponding Test) እናካሂዳለን።',
    ],
    authorAm: 'ኢንጂነር መቅደስ አለማየሁ · የግንባታ ቁጥጥር ኃላፊ',
    imageKey: 'ppr_pipes',
  },
];

export const COMPLETED_PROJECTS = [
  {
    nameAm: 'ቦሌ ሩዋንዳ G+4 የንግድና የቢሮ ህንጻ',
    scopeAm: 'ሙሉ የውሃ፣ የፍሳሽ፣ የእሳት ማጥፊያና 3 የጣሪያ ፓምፕ ስርዓት',
    metricAm: '3,400 ሜትር PPR መስመር · 0% የፍሳሽ ችግር',
  },
  {
    nameAm: 'አያት መንደር 12 ዘመናዊ ቪላዎች',
    scopeAm: 'አጠቃላይ የግንባታና የሳኒተሪ ማጠናቀቂያ ስራ',
    metricAm: 'በ10 ወራት የተረከበ · 2 ዓመት ዋስትና',
  },
  {
    nameAm: 'ቃሊቲ የምግብ ማቀነባበሪያ ፋብሪካ',
    scopeAm: 'ከፍተኛ ግፊት የኢንዱስትሪ ውሃ መስመርና የፍሳሽ ማጣሪያ',
    metricAm: '24/7 የምርት ስራ መቋረጥ ሳይኖር ተገጠመ',
  },
];
