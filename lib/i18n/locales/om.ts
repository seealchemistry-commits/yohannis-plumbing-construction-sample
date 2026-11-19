import type { TranslationDictionary } from '../types';

export const om: TranslationDictionary = {
  meta: {
    title: 'Tirat Plumbing | Diriirsa Ujummoo, Suphaa 24/7 fi Meeshaalee',
    description:
      'Addis Ababaa keessatti tajaajila 24/7 Emergency Leak Repair, diriirsa ujummoo PPR, PVC fi Copper, hidhaa Booster Pump fi gurgurtaa meeshaalee plumbing.',
  },
  brand: {
    name: 'Tirat Plumbing',
    tagline:
      'Tajaajila 24/7 Emergency Leak Repair, diriirsa ujummoo PPR, PVC fi Copper fi dhiyeessii meeshaalee plumbing',
    city: 'Addis Ababaa',
    officeAddress:
      'Bolee Madhaani’aalam, Gamoo Seeluu cinaa fooqii 2ffaa, Addis Ababaa',
    hours: 'Wixata – Sanbata: 2:00 – 11:30 (24/7 Emergency Leak Repair)',
    mapTitle: 'Tirat Plumbing · Bolee Madhaani’aalam',
    mapNearby: 'Bataskaana Bolee Madhaani’aalam bira (Daandii Edna Mall)',
  },
  header: {
    navAriaLabel: 'Baafata Ijoo',
    mobileNavAriaLabel: 'Baafata Mobaayilaa',
    home: 'Seensa',
    services: 'Tajaajiloota',
    about: 'Waa’ee Keenya',
    shop: 'Shop',
    blog: 'Blog',
    cart: 'Kaartii',
    cartAriaLabel: (count) => `Kaartii bittaa (${count} meeshaalee)`,
    bookNow: 'Booking Qabadhaa',
    openMenu: 'Baafata Bani',
    closeMenu: 'Baafata Cufi',
    contactLink: 'Teessoo fi Qunnamtii',
    languageLabel: 'Afaan Filadhaa',
  },
  hero: {
    eyebrow: 'Addis Ababaa · Tirat Plumbing · 24/7 Emergency Service',
    headlineLine1: 'Diriirsa Ujummoo,',
    headlineLine2: 'Suphaa fi Meeshaalee',
    subtext:
      'Manneen jireenyaa, gamoo fi dhaabbilee adda addaaf tajaajila diriirsa PPR, PVC fi Copper, suphaa hatattamaa 24/7 fi dhiyeessii meeshaalee plumbing.',
    primaryCta: 'Ogeessa Plumbing Qabadhaa',
    secondaryCta: 'Meeshaalee Plumbing Shop',
    hotlineLabel: 'Bilbila Hatattamaa 24/7 / Kallattii:',
    imageAlt:
      'Tirat Plumbing sirna manifold bishaanii, diriirsa ujummoo Copper fi PPR, brass valves fi hidhaa boiler',
    stats: [
      {
        value: 'Waggaa 14+',
        label: 'Muuxannoo hojii ujummoo PPR, PVC fi Copper',
      },
      {
        value: '320+',
        label: 'Pirojektoota plumbing Addis Ababaa keessatti xumuraman',
      },
      {
        value: '24/7',
        label: 'Tajaajila hatattamaa Emergency Leak Repair',
      },
      {
        value: '16 Bar',
        label: 'Sararri hundi Hydrostatic Pressure Test ittiin mirkanaa’u',
      },
    ],
  },
  servicesSection: {
    eyebrow: 'Tajaajiloota Plumbing Keenya',
    heading: 'Tajaajiloota Ijoo 5 Diriirsa Ujummoo fi Suphaa Irratti Xiyyeeffatan',
    description:
      'Diriirsa ujummoo bishaan qulqulluu fi dhangala’aa (PPR, PVC, Copper) irraa kaasee hanga hidhaa Booster Pump fi 24/7 Emergency Leak Repair ogeeyyiin ni hojjenna.',
    durationPrefix: 'Yeroo Fudhatu',
    bookServiceBtn: 'Booking Qabadhaa',
    items: {
      'SRV-01': {
        title: 'Diriirsa Sarara Bishaan Qulqulluu (PPR, PVC, Copper)',
        summary:
          'Manneen jireenyaa, appaartaamaa fi gamoo daldalaaf sarara bishaan ho’aa fi qorraa ujummoo PPR, PVC fi Copper qulqullina ol’aanaan ni diriirsina.',
        deliverables: [
          'Dizaayinii fi hidhaa sarara PPR, PVC fi Copper sirrii',
          'Qorannoo dhiibbaa Hydrostatic Pressure Test 16 Bar',
          'Insuleeshinii addaa bishaan ho’aa fi qorraaf',
        ],
        estimatedDuration: 'Guyyaa 2 hanga 14 (akka bal’ina hojiitti)',
      },
      'SRV-02': {
        title: 'Diriirsa Sarara Dhangala’aa fi Qulqulleessa Ujummoo Cufamee',
        summary:
          'Diriirsa sarara dhangala’aa uPVC foolii fi coccoba hin qabne, walitti hidhaa maanhoolii fi banuu ujummoo kushiinaa fi mana fincaanii cufamee.',
        deliverables: [
          'Diriirsa ujummoo dhangala’aa uPVC rukkina (Slope) sirrii qabu',
          'Keenyaa osoo hin diigin meeshaa makaanikaalaan ujummoo banuu',
          'Hidhaa Floor Trap fi Vent Pipe foolii ittisuu',
        ],
        estimatedDuration: 'Sa’aatii 2 hanga guyyaa 3',
      },
      'SRV-03': {
        title: 'Hidhaa Paampii Bishaanii (Booster Pump), Taankii fi Ho’istuu',
        summary:
          'Fooqii hunda irratti dhiibbaan bishaanii walqixa akka ta’uuf hidhaa Booster Pump, taankii lafa jalaa fi baaxii akkasumas booyilara elektirikii fi soolaarii.',
        deliverables: [
          'Booster Pump waliin Automatic Pressure Switch fi Dry-Run Protection',
          'Hidhaa Float Valve fi Check Valve taankii bishaanii',
          'Hidhaa Safety Valve booyilara bishaan ho’aa nageenya qabu',
        ],
        estimatedDuration: 'Guyyaa 1',
      },
      'SRV-04': {
        title: 'Hidhaa Meeshaalee Mana Fincaanii fi Kushiinaa (Shower, WC, Sink, Mixers)',
        summary:
          'Bokisii shawaarii, WC ammayyaa, sinkii harka dhiqannaa, Mixers bishaan ho’aa fi qorraa fi sarara maashina uffata dhiqaa coccoba tokko malee ni hidhna.',
        deliverables: [
          'Hidhaa sirrii fi siilikooniin cufuu Shower, WC fi Sink',
          'Walitti hidhaa Angle Valve fi Flexible Hose jabaa',
          'Qorannoo dhiibbaa bishaanii fi dhangala’aa osoo hin kennin dura',
        ],
        estimatedDuration: 'Sa’aatii 3 hanga guyyaa 2',
      },
      'SRV-05': {
        title: 'Argannoo Coccoba Bishaanii fi Suphaa Hatattamaa (24/7 Emergency Leak Repair)',
        summary:
          'Coccobni bishaanii keenyaa yookaan lafa jala dhokate, ujummoon dhote yookaan vaalviin bade yoo mudatu 24/7 saffisaan dhaqqabnee furmaata waaraa kennina.',
        deliverables: [
          'Addis Ababaa keessatti bilbila hatattamaa 24/7n dafanii ga’uu',
          'Keenyaa osoo hin balleessin ujummoo cabe adda baasuu fi jijjiiruu',
          'Suphaa hatattamaa vaalvii dhiibbaa fi walitti hidhaa',
        ],
        estimatedDuration: 'Sa’aatii 1 hanga 3 keessatti',
      },
    },
    comingSoonEyebrow: 'Coming Soon · Tajaajiloota Dhiyootti Jalqaban',
    comingSoonHeading: 'Tajaajiloota Dhiyootti Jalqaban (Coming Soon)',
    comingSoonDescription:
      'Yeroo ammaa xiyyeeffannoon keenya guutuu hojii plumbing fi dhiyeessii meeshaalee irratti qofa. Tajaajiloonni ijaarsa gamoo fi haaromsa manaa yeroo jalqaban dursitanii akka beektan galmaa’aa.',
    comingSoonBadge: 'Coming Soon',
    notifyMeBtn: 'Na Beeksisaa (Notify Me)',
    comingSoonItems: {
      'CS-01': {
        title: 'Ijaarsa Gamoo Waliigalaa',
        subtitle: 'Building Construction',
        summary:
          'Tajaajilli ijaarsa viilaa jireenyaa fi gamoo daldalaa bu’uura irraa hanga xumuraatti garee injinariingii keenyaan dhiyootti ni jalqaba.',
        expectedLaunch: 'Dhiyootti Jalqaba (Coming Soon)',
      },
      'CS-02': {
        title: 'Haaromsa Manaa fi Biiroo',
        subtitle: 'Home & Office Renovation',
        summary:
          'Tajaajilli mana fincaanii, kushiinaa fi kutaalee keessaa dizaayinii ammayyaan haaromsuu dhiyootti ni jalqaba.',
        expectedLaunch: 'Dhiyootti Jalqaba (Coming Soon)',
      },
    },
    notifyModal: {
      ariaPrefix: 'Na Beeksisaa (Notify Me)',
      closeAriaLabel: 'Foddaa cufi',
      successTitle: 'Gaaffiin beeksisaa galmaa’eera',
      refLabel: 'Lakk. Wabii:',
      successDetail: (phone) =>
        `Tajaajilli kun yeroo jalqabu battalumatti bilbila keessan (${phone}) irratti isin beeksifna.`,
      backBtn: 'Deebi’i',
      intro:
        'Tajaajilli kun dhiyootti yeroo jalqabu dursinee akka isin beeksifnu maqaa fi lakkoofsa bilbilaa keessan galchaa.',
      fullNameLabel: 'Maqaa Guutuu',
      fullNamePlaceholder: 'Maqaa keessan galchaa',
      phoneLabel: 'Lakkoofsa Bilbilaa',
      phonePlaceholder: '0912453752',
      cancelBtn: 'Haqi',
      submitBtn: 'Yeroo Jalqabu Na Beeksisi',
      submittingBtn: 'Galmaa’aa jira...',
      genericError: 'Gaaffii keessan galmeessuun hin danda’amne.',
      networkError: 'Sarvarii waliin walqunnamuun hin danda’amne.',
    },
  },
  about: {
    eyebrow: 'Waa’ee Dhaabbata Keenyaa',
    heading: 'Maqaa Hojii Plumbing Ammayyaa fi Dhiyeessii Amanamaan Ijaarame',
    description:
      'Tirat Plumbing Addis Ababaa keessatti diriirsa ujummoo PPR, PVC fi Copper, hidhaa Booster Pump fi 24/7 Emergency Leak Repair irratti kan xiyyeeffatedha. Dhiyeessii meeshaalee plumbing ofii keenyaa waan qabnuuf maamiltoonni safara sirrii (1/2", 3/4", 1") hojii ogeessaa waliin bakka tokkotti argatu.',
    photo1Alt: 'Hundeessaa fi ogeessa ijoo Tirat Plumbing iddoo hojii irratti',
    photo2Alt:
      'Ogeessa Tirat Plumbing iddoo hojii irratti sarara bishaanii PPR fi vaalvii osoo hidhu',
    projectsHeading: 'Pirojektoota Plumbing Dhiyoo Xumuraman',
    projects: [
      {
        name: 'Sirna Ujummoo Gamoo Daldalaa Bolee Ruwaandaa G+4',
        scope:
          'Bishaan qulqulluu PPR guutuu, sarara dhangala’aa uPVC fi hidhaa Booster Pump baaxii 3',
        metric: 'Ujummoo PPR meetira 3,400 · Coccoba 0%',
      },
      {
        name: 'Ganda Ayaat Viilaalee 12 Sanitary & Piping',
        scope:
          'Hidhaa meeshaalee mana fincaanii fi kushiinaa guutuu, booyilara fi sirna taankii',
        metric: 'Qorannoo dhiibbaa 16 Bar 100% · Wabii Waggaa 2',
      },
      {
        name: 'Sarara Bishaanii fi Dhangala’aa Warshaa Nyaataa Qaallittii',
        scope:
          'Diriirsa sarara bishaanii Copper fi PPR dhiibbaa ol’aanaa fi qulqulleessa dhangala’aa',
        metric: 'Deeggarsa 24/7 Emergency Leak Repair',
      },
    ],
  },
  shop: {
    eyebrow: 'Meeshaalee Plumbing Online Shop',
    heading: 'Gurgurtaa Meeshaalee Plumbing',
    description:
      'Ujummoowwan PPR/PVC, vaalvii brass, meeshaalee mana fincaanii fi Booster Pumps safara sirrii (1/2", 3/4", 1") filadhaa. Ajaja Birr 15,000 ol ta’eef Addis Ababaa keessatti geejjiba bilisaadha.',
    viewCartBtn: 'Kaartii Ilaali',
    categoriesAriaLabel: 'Ramaddiiwwan meeshaalee plumbing',
    categories: {
      ALL: 'Meeshaalee Hunda',
      PIPES: 'Ujummoo PPR/PVC',
      VALVES: 'Walitti Hidhaa fi Vaalvii',
      PUMPS: 'Paampii Bishaanii',
      SANITARY: 'Meeshaalee Mana Fincaanii',
    },
    searchLabel: 'Meeshaalee plumbing barbaadi',
    searchPlaceholder: 'Maqaa yookaan SKUtiin barbaadi...',
    emptyTitle: 'Meeshaan barbaaddan hin argamne.',
    emptyHint: 'Jecha biraa yaalaa yookaan calaltuu haqaa.',
    clearFilterBtn: 'Calaltuu Haqi',
    sizeLabel: 'Filannoo Safaraa (Size)',
    sizeAriaLabel: (productName, size) => `${productName} safara ${size}`,
    sizeGroupAriaLabel: (productName) => `Safara ${productName}`,
    inStockLabel: (count) => `Kuusaa keessa ${count} jira`,
    addToCartBtn: 'Gara Kaartiitti Dabali',
    addedBtn: 'Dabalameera',
    currencyLabel: 'Birr',
    products: {
      'PRD-101': {
        name: 'Ujummoo Bishaan Qulqulluu PPR (PN20)',
        spec: 'Meetira 4 · Bishaan ho’aa fi qorraaf · ISO 15874',
        categoryLabel: 'Ujummoo PPR/PVC',
        unit: 'tokkoon',
      },
      'PRD-102': {
        name: 'Ball Valve Brass Jabaataa',
        spec: 'Brass hin dandanne tajaajila cimaaf · Dhiibbaa 16 Bar',
        categoryLabel: 'Walitti Hidhaa fi Vaalvii',
        unit: 'tokkoon',
      },
      'PRD-103': {
        name: 'Booster Pump Ofumaan Hojjetu (750W)',
        spec: 'Mootora stainless steel · To’annoo dhiibbaa qabu · Sagalee xiqqaa',
        categoryLabel: 'Paampii Bishaanii',
        unit: 'tokkoon',
      },
      'PRD-104': {
        name: 'Faucet Mana Fincaanii Brushed Stainless fi Trap',
        spec: '304 Stainless Steel · Mixer ho’aa fi qorraa · Wabii waggaa 5',
        categoryLabel: 'Meeshaalee Mana Fincaanii',
        unit: 'seetiidhaan',
      },
      'PRD-105': {
        name: 'Paakeejii Walitti Hidhaa PPR & PVC (Elbow & Tee)',
        spec: '10 Elbow + 10 Tee + 6 Coupling · Coccoba malee kan hidhamu',
        categoryLabel: 'Ujummoo PPR/PVC',
        unit: 'paakeejiin',
      },
      'PRD-106': {
        name: 'Check Valve Brass fi Safartuu Dhiibbaa',
        spec: 'Bishaan duubatti akka hin deebine ittisu · Booster Pumpf mijataa',
        categoryLabel: 'Walitti Hidhaa fi Vaalvii',
        unit: 'seetiidhaan',
      },
    },
    recentOrdersHeading: 'Ajaja Meeshaalee Dhiyoo Mirkanaa’an',
    totalOrdersLabel: 'Ajaja Waliigalaa',
    confirmedStatus: 'Mirkanaa’eera',
    sizeTag: (size) => `Safara ${size}`,
  },
  booking: {
    eyebrow: 'Booking fi Bilbila 24/7 Emergency Leak Repair',
    heading: 'Daawwannaa Ogeessa Plumbing fi Booking Qabadhaa',
    description:
      'Diriirsa sarara PPR/PVC/Copper, hidhaa Booster Pump, hidhaa meeshaalee mana fincaanii yookaan 24/7 Emergency Leak Repair guyyaa fi teessoo isiniif mijatuun filadhaa.',
    confirmedTitle: 'Booking keessan Galmaa’eera',
    addressPrefix: 'Teessoo:',
    serviceTypeLabel: 'Gosa Tajaajila Plumbing',
    propertyTypeLabel: 'Gosa Gamoo / Iddoo',
    propertyTypes: {
      RESIDENTIAL: 'Mana Jireenyaa',
      COMMERCIAL: 'Gamoo Daldalaa',
      INDUSTRIAL: 'Warshaa / Kuusaa',
    },
    preferredDateLabel: 'Guyyaa Isiniif Mijatu',
    timeSlotLabel: 'Sa’aatii Beellamaa',
    timeSlots: [
      '3:00 Ganama (09:00 AM)',
      '5:00 Ganama (11:00 AM)',
      '8:00 Waaree Booda (02:00 PM)',
      '10:00 Waaree Booda (04:00 PM)',
      'Suphaa Hatattamaa (24/7)',
    ],
    fullNameLabel: 'Maqaa Guutuu',
    fullNamePlaceholder: 'Maqaa guutuu',
    phoneLabel: 'Lakkoofsa Bilbilaa',
    phonePlaceholder: '0912453752',
    addressBoxTitle: 'Teessoo Hojii (Addis Ababaa)',
    step1SubCity: 'Sadarkaa 1: Kutaa Magaalaa',
    step2Woreda: 'Sadarkaa 2: Woredaa',
    step3Neighborhood: 'Sadarkaa 3: Naannoo / Iddoo Addaa',
    specificLandmarkLabel: 'Iddoo addaa biroo / Lakk. manaa (Filannoo)',
    specificLandmarkPlaceholder:
      'Fkn: Lakk. manaa 402, maqaa gamoo yookaan mallattoo addaa...',
    notesLabel: 'Ibsa gabaabaa rakkoo plumbing yookaan hojii (Filannoo)',
    notesPlaceholder:
      'Fkn: Mana fincaanii fooqii 2ffaa irratti dhiibbaan Booster Pump hir’ateera yookaan sararri PPR ni coccoba...',
    submitBtn: 'Booking Mirkaneessi',
    submittingBtn: 'Booking galmaa’aa jira...',
    scheduledHeading: 'Beellamaalee Hojii Plumbing Qabaman',
    noBookings: 'Hanga ammaatti beellamni galmaa’e hin jiru.',
    scheduledStatus: 'Qabameera',
    clientPrefix: 'Maamila',
    footerNote:
      'Yeroo booking 24/7 Emergency Leak Repair yookaan diriirsa sararaa qabattan, ogeessi keenya osoo hin dhufin daqiiqaa 30 dura bilbilaan mirkaneessa.',
    genericError: 'Booking galmeessuun hin danda’amne.',
    networkError: 'Sarvarii waliin walqunnamuun hin danda’amne; maaloo irra deebi’aa yaalaa.',
  },
  cart: {
    dialogAriaLabel: 'Kaartii Bittaa fi Checkout',
    title: (count) => `Kaartii Bittaa (${count})`,
    closeAriaLabel: 'Kaartii cufi',
    orderConfirmedTitle: 'Ajajni Keessan Milkaa’inaan Mirkanaa’eera',
    orderIdLabel: 'Lakk. Ajajaa:',
    customerLabel: 'Maamila:',
    addressLabel: 'Teessoo:',
    totalPaidLabel: 'Kaffaltii Waliigalaa:',
    backToShopBtn: 'Gara Shoptti Deebi’i',
    emptyTitle: 'Kaartiin keessan yeroo ammaa duwwaadha',
    emptyHint:
      'Shop keenya keessaa ujummoo PPR/PVC, vaalvii brass yookaan Booster Pumps filadhaa.',
    browseProductsBtn: 'Meeshaalee Ilaali',
    freeDeliveryQualified: (threshold) =>
      `Ajajni keessan ${threshold} ol waan ta’eef Addis Ababaa keessatti geejjiba bilisaa argattu.`,
    freeDeliveryRemainingPrefix: 'Geejjiba bilisaa argachuuf ',
    freeDeliveryRemainingSuffix: ' qofatu isin hafa.',
    sizeLabel: 'Safara (Size):',
    decreaseQtyAria: (name, size) => `Baay’ina hir’isi — ${name} (${size})`,
    increaseQtyAria: (name, size) => `Baay’ina dabali — ${name} (${size})`,
    removeItemAria: (name, size) => `Haqi — ${name} (${size})`,
    subtotalLabel: 'Ida’ama Meeshaalee',
    deliveryFeeLabel: 'Gatii Geejjibaa',
    freeLabel: 'Bilisa',
    totalLabel: 'Kaffaltii Waliigalaa',
    checkoutHeading: 'Checkout — Teessoo Geejjibaa fi Kaffaltii',
    fullNameLabel: 'Maqaa Guutuu',
    fullNamePlaceholder: 'Fkn: Daawit Baqqalaa',
    phoneLabel: 'Lakkoofsa Bilbilaa',
    phonePlaceholder: '0912453752',
    deliveryAddressTitle: 'Teessoo Geejjibaa (Addis Ababaa)',
    paymentMethodLabel: 'Mala Kaffaltii',
    paymentMethods: {
      TELEBIRR: 'Telebirr',
      CBE_BIRR: 'CBE Birr',
      CASH_ON_DELIVERY: 'Yeroo meeshaan ga’u maallaqaan',
    },
    submittingBtn: 'Ajajni galmaa’aa jira...',
    confirmOrderBtn: (totalFormatted) =>
      `Ajaja Mirkaneessi (${totalFormatted})`,
    genericError: 'Ajaja keessan mirkaneessuun hin danda’amne.',
    networkError: 'Sarvarii waliin walqunnamuun hin danda’amne; irra deebi’aa yaalaa.',
  },
  blog: {
    eyebrow: 'Blog fi Gorsa Plumbing',
    heading: 'Waa’ee Itti Fayyadama Ujummoo, Ittisa Coccobaa fi Filannoo Meeshaa Sirrii',
    readMoreBtn: 'Barreeffama Guutuu Dubbisi',
    closeArticleAriaLabel: 'Barreeffama cufi',
    articles: {
      'BLG-01': {
        title: 'Meeshaalee Ujummoo PPR, PVC fi Copper Sirrii Akkamitti Filanna?',
        category: 'Filannoo Meeshaa',
        publishedDate: 'Sadaasa 8, 2019',
        readTime: 'Dubbisa daqiiqaa 4',
        excerpt:
          'Bishaan qulqulluu manaa, sarara bishaan ho’aa fi dhangala’aaf safara ujummoo sirrii (1/2", 3/4", 1") fi sadarkaa dhiibbaa (PN20) filachuun waaraa taasisaa.',
        paragraphs: [
          'Gabaa irratti meeshaaleen ujummoo hedduun argamanis hundi isaanii hojii hundaaf hin ta’an. Seensa manaa ijoo fi sarara Booster Pump dhiibbaa ol’aanaaf ujummoo PPR PN20 1" yookaan 3/4" fayyadamuun yaa’a bishaanii mijeessa.',
          'Dameewwan gara mana fincaanii fi sinkii seenan 1/2" yoo diriirfaman dhiibbaan bishaanii osoo hin hir’atin walqixa ga’a. Sarara bishaan ho’aaf gonkumaa PN10 qal’aa yookaan PVC idilee hin fayyadaminaa.',
          'Tirat Plumbing keessatti walitti hidhaa PPR ho’a sirrii (260°C) irratti baqsuun fi safartuu dhiibbaa 16 Bar’n qorachuun sarara coccoba hin qabne isiniif kennina.',
        ],
        author: 'Yohannis Taaddasaa · Ogeessa Plumbing Ijoo',
      },
      'BLG-02': {
        title: 'Ittisa Coccoba Bishaanii Mana Keessaa fi 24/7 Emergency Leak Repair',
        category: 'Ittisa Coccobaa',
        publishedDate: 'Onkoloolessa 29, 2019',
        readTime: 'Dubbisa daqiiqaa 3',
        excerpt:
          'Coccobni bishaanii hin eegamne keenyaa fi meeshaalee manaa osoo hin balleessin mallattoolee yeroodhaan beekuun baasii hir’isa.',
        paragraphs: [
          'Yeroo baay’ee coccobni bishaanii Angle Valve sinkii jala jiru yookaan taankii mana fincaanii keessaa copha xiqqaadhaan jalqaba. Ujummoon hundi cufamee osoo jiruu lakkooftuun bishaanii yoo naanna’e coccobni dhokate jira jechuudha.',
          'Keenyaa irratti jiidhina yookaan dhiibbaan bishaanii tasa hir’achuu yoo argitan keenyaa diiguu irra gareen keenya 24/7 Emergency Leak Repair meeshaa addaan iddoo sirrii akka adda baasu waamaa.',
          'Ball Valve cufaa ijoo ji’a 6’tti al tokko cufuu fi banuun hojjechuu isaa mirkaneessuun yeroo balaa tasaaf dafanii bishaan cufuuf gargaara.',
        ],
        author: 'Inj. Birhaanuu Tasfaayee · Ogeessa Saanitarii',
      },
      'BLG-03': {
        title: 'Itti Fayyadama Sirrii fi Suphaa Booster Pump fi Taankii Bishaanii',
        category: 'Kunuunsa Sirnaa',
        publishedDate: 'Onkoloolessa 14, 2019',
        readTime: 'Dubbisa daqiiqaa 4',
        excerpt:
          'Mootorri Booster Pump akka hin gubanneef Dry-Run Protection, Check Valve fi qulqullina taankii irratti of eeggannoo godhamuu qabu.',
        paragraphs: [
          'Addis Ababaa keessatti yeroo bishaan addaan citu Booster Pump bishaan malee duwwaatti akka hin naannef Pressure Controller Dry-Run Protection qabu hidhuun baay’ee barbaachisaadha.',
          'Dabalataanis ba’umsa paampii irratti Check Valve brass qulqullina qabu yoo hin hidhamne bishaan duubatti deebi’aa paampii daqiiqaa hundaatti kaasee ni balleessa.',
          'Taankii baaxii fi lafa jalaa ji’a 6’tti qulqulleessuu fi Float Valve hojjechuu isaa ilaaluun xuraa’aan Mixers fi mataa shawaarii keessa galee akka hin cufne ittisa.',
        ],
        author: 'Teek. Daawit Mokonnon · Ispeshaalistii Booster Pump',
      },
    },
  },
  contact: {
    eyebrow: 'Teessoo fi Qunnamtii',
    heading: 'Nu Quunnamaa yookaan 24/7 Emergency Leak Repair Waamaa',
    description:
      'Suphaa coccoba bishaanii hatattamaa, diriirsa sarara PPR/PVC/Copper yookaan dhiyeessii meeshaalee plumbing jumlaaf bilbilaan, Telegramiin yookaan biiroo keenyatti nu argadhaa.',
    phoneLabel: 'Bilbila (24/7 Emergency Leak Repair)',
    telegramLabel: 'Telegram',
    officeLabel: 'Biiroo Ijoo',
    emailLabel: 'Imeeyilii',
    hoursLabel: 'Sa’aatii Hojii',
    openGoogleMapsBtn: 'Google Maps Irratti Bani',
    mapFallbackNotice:
      'Kaartaan foddaa kana keessatti hin banamne. Qabduu "Google Maps Irratti Bani" jedhu gadii fayyadamaa.',
    formTitle: 'Ergaa Kallattii Ergaa',
    successMessagePrefix: 'Ergaan keessan milkaa’inaan nu ga’eera (Wabii:',
    successMessageSuffix: '). Gareen keenya yeroo dhiyootti isiniif bilbila.',
    fullNameLabel: 'Maqaa Guutuu',
    fullNamePlaceholder: 'Maqaa keessan galchaa',
    phoneInputLabel: 'Lakkoofsa Bilbilaa',
    phoneInputPlaceholder: '0912453752',
    subjectLabel: 'Mata Duree',
    subjectPlaceholder: 'Fkn: Hidhaa Booster Pump yookaan gatii meeshaa PPR',
    messageLabel: 'Ergaa',
    messagePlaceholder:
      'Waa’ee hojii plumbing barbaaddan yookaan tarree ajaja meeshaa barreessaa...',
    sendBtn: 'Ergaa Ergi',
    sendingBtn: 'Ergamaa jira...',
    genericError: 'Ergaa erguun hin danda’amne.',
    networkError: 'Sarvarii waliin walqunnamuun hin danda’amne.',
  },
  footer: {
    bookingLink: 'Booking',
    contactLink: 'Qunnamtii',
    copyright: (_yearEth, brand, city) => `© 2026 ${brand} · ${city}`,
  },
  validation: {
    cartEmpty: 'Kaartiin keessan duwwaadha; maaloo dura meeshaa plumbing filadhaa.',
    customerNameRequired: 'Maaloo maqaa guutuu keessan galchaa.',
    invalidPhone:
      'Maaloo lakkoofsa bilbilaa Itoophiyaa sirrii galchaa (Fkn: 0912453752).',
    subCityRequired: 'Maaloo Kutaa Magaalaa filadhaa.',
    invalidWoreda: 'Maaloo Kutaa Magaalaa kanaaf Woredaa sirrii filadhaa.',
    invalidNeighborhood:
      'Maaloo Kutaa Magaalaa kanaaf naannoo / iddoo addaa sirrii filadhaa.',
    serviceRequired: 'Maaloo gosa tajaajila plumbing barbaaddan filadhaa.',
    invalidDate: 'Maaloo guyyaa beellamaa sirrii filadhaa.',
    pastDate:
      'Guyyaa darbe filachuun hin danda’amu; maaloo har’a yookaan gara fuulduraa filadhaa.',
    timeSlotRequired: 'Maaloo sa’aatii beellamaa filadhaa.',
    subjectRequired: 'Maaloo mata duree ergaa ibsaa.',
    messageRequired: 'Maaloo ergaa keessan bal’inaan barreessaa.',
    fillAllRequired: 'Maaloo iddoowwan barbaachisan hunda sirriitti guutaa.',
    notifyServiceRequired: 'Maaloo tajaajila filadhaa.',
  },
};
