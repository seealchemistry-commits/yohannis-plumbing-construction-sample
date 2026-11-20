export type Locale = 'en' | 'am' | 'om' | 'ti';

export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleOption {
  code: Locale;
  shortLabel: string;
  nativeName: string;
}

export const LOCALE_OPTIONS: readonly LocaleOption[] = [
  { code: 'en', shortLabel: 'EN', nativeName: 'English' },
  { code: 'am', shortLabel: 'አማ', nativeName: 'አማርኛ' },
  { code: 'om', shortLabel: 'OM', nativeName: 'Afaan Oromoo' },
  { code: 'ti', shortLabel: 'ትግ', nativeName: 'ትግርኛ' },
] as const;

export interface LocalizedServiceCopy {
  title: string;
  summary: string;
  deliverables: [string, string, string];
  estimatedDuration: string;
}

export interface LocalizedComingSoonCopy {
  title: string;
  subtitle: string;
  summary: string;
  expectedLaunch: string;
}

export interface LocalizedProductCopy {
  name: string;
  spec: string;
  categoryLabel: string;
  unit: string;
}

export interface LocalizedBlogCopy {
  title: string;
  category: string;
  publishedDate: string;
  readTime: string;
  excerpt: string;
  paragraphs: string[];
  author: string;
}

export interface LocalizedProjectCopy {
  name: string;
  scope: string;
  metric: string;
}

export interface LocalizedFaqItem {
  id: 'FAQ-01' | 'FAQ-02' | 'FAQ-03' | 'FAQ-04' | 'FAQ-05' | 'FAQ-06';
  number: string;
  topicLabel: string;
  question: string;
  answer: string;
}

export interface TranslationDictionary {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    tagline: string;
    city: string;
    officeAddress: string;
    hours: string;
    mapTitle: string;
    mapNearby: string;
  };
  header: {
    navAriaLabel: string;
    mobileNavAriaLabel: string;
    home: string;
    services: string;
    about: string;
    shop: string;
    blog: string;
    cart: string;
    cartAriaLabel: (count: number) => string;
    bookNow: string;
    openMenu: string;
    closeMenu: string;
    contactLink: string;
    languageLabel: string;
  };
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    subtext: string;
    primaryCta: string;
    secondaryCta: string;
    hotlineLabel: string;
    imageAlt: string;
    stats: Array<{ value: string; label: string }>;
  };
  servicesSection: {
    eyebrow: string;
    heading: string;
    description: string;
    durationPrefix: string;
    bookServiceBtn: string;
    items: Record<'SRV-01' | 'SRV-02' | 'SRV-03' | 'SRV-04' | 'SRV-05', LocalizedServiceCopy>;
    comingSoonEyebrow: string;
    comingSoonHeading: string;
    comingSoonDescription: string;
    comingSoonBadge: string;
    notifyMeBtn: string;
    comingSoonItems: Record<'CS-01' | 'CS-02', LocalizedComingSoonCopy>;
    notifyModal: {
      ariaPrefix: string;
      closeAriaLabel: string;
      successTitle: string;
      refLabel: string;
      successDetail: (phone: string) => string;
      backBtn: string;
      intro: string;
      fullNameLabel: string;
      fullNamePlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      cancelBtn: string;
      submitBtn: string;
      submittingBtn: string;
      genericError: string;
      networkError: string;
    };
  };
  about: {
    eyebrow: string;
    heading: string;
    description: string;
    photo1Alt: string;
    photo2Alt: string;
    projectsHeading: string;
    projects: [LocalizedProjectCopy, LocalizedProjectCopy, LocalizedProjectCopy];
  };
  shop: {
    eyebrow: string;
    heading: string;
    description: string;
    viewCartBtn: string;
    categoriesAriaLabel: string;
    categories: {
      ALL: string;
      PIPES: string;
      VALVES: string;
      PUMPS: string;
      SANITARY: string;
    };
    searchLabel: string;
    searchPlaceholder: string;
    emptyTitle: string;
    emptyHint: string;
    clearFilterBtn: string;
    sizeLabel: string;
    sizeAriaLabel: (productName: string, size: string) => string;
    sizeGroupAriaLabel: (productName: string) => string;
    inStockLabel: (count: number) => string;
    addToCartBtn: string;
    addedBtn: string;
    currencyLabel: string;
    products: Record<
      'PRD-101' | 'PRD-102' | 'PRD-103' | 'PRD-104' | 'PRD-105' | 'PRD-106',
      LocalizedProductCopy
    >;
    recentOrdersHeading: string;
    totalOrdersLabel: string;
    confirmedStatus: string;
    sizeTag: (size: string) => string;
  };
  booking: {
    eyebrow: string;
    heading: string;
    description: string;
    confirmedTitle: string;
    addressPrefix: string;
    serviceTypeLabel: string;
    propertyTypeLabel: string;
    propertyTypes: {
      RESIDENTIAL: string;
      COMMERCIAL: string;
      INDUSTRIAL: string;
    };
    preferredDateLabel: string;
    timeSlotLabel: string;
    timeSlots: [string, string, string, string, string];
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    addressBoxTitle: string;
    step1SubCity: string;
    step2Woreda: string;
    step3Neighborhood: string;
    specificLandmarkLabel: string;
    specificLandmarkPlaceholder: string;
    notesLabel: string;
    notesPlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    scheduledHeading: string;
    noBookings: string;
    scheduledStatus: string;
    clientPrefix: string;
    footerNote: string;
    genericError: string;
    networkError: string;
  };
  cart: {
    dialogAriaLabel: string;
    title: (count: number) => string;
    closeAriaLabel: string;
    orderConfirmedTitle: string;
    orderIdLabel: string;
    customerLabel: string;
    addressLabel: string;
    totalPaidLabel: string;
    backToShopBtn: string;
    emptyTitle: string;
    emptyHint: string;
    browseProductsBtn: string;
    freeDeliveryQualified: (thresholdFormatted: string) => string;
    freeDeliveryRemainingPrefix: string;
    freeDeliveryRemainingSuffix: string;
    sizeLabel: string;
    decreaseQtyAria: (name: string, size: string) => string;
    increaseQtyAria: (name: string, size: string) => string;
    removeItemAria: (name: string, size: string) => string;
    subtotalLabel: string;
    deliveryFeeLabel: string;
    freeLabel: string;
    totalLabel: string;
    checkoutHeading: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    deliveryAddressTitle: string;
    paymentMethodLabel: string;
    paymentMethods: {
      TELEBIRR: string;
      CBE_BIRR: string;
      CASH_ON_DELIVERY: string;
    };
    submittingBtn: string;
    confirmOrderBtn: (totalFormatted: string) => string;
    genericError: string;
    networkError: string;
  };
  blog: {
    eyebrow: string;
    heading: string;
    readMoreBtn: string;
    closeArticleAriaLabel: string;
    articles: Record<'BLG-01' | 'BLG-02' | 'BLG-03', LocalizedBlogCopy>;
  };
  contact: {
    eyebrow: string;
    heading: string;
    description: string;
    phoneLabel: string;
    telegramLabel: string;
    officeLabel: string;
    emailLabel: string;
    hoursLabel: string;
    openGoogleMapsBtn: string;
    mapFallbackNotice: string;
    formTitle: string;
    successMessagePrefix: string;
    successMessageSuffix: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneInputLabel: string;
    phoneInputPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendBtn: string;
    sendingBtn: string;
    genericError: string;
    networkError: string;
  };
  faq: {
    eyebrow: string;
    heading: string;
    description: string;
    emergencyCardTitle: string;
    emergencyCardBody: string;
    askQuestionBtn: string;
    items: LocalizedFaqItem[];
  };
  footer: {
    bookingLink: string;
    faqLink: string;
    contactLink: string;
    copyright: (yearEth: string, brand: string, city: string) => string;
    builtByPrefix: string;
    developerName: string;
    developerUrl: string;
  };
  whatsapp: {
    buttonLabel: string;
    ariaLabel: string;
    prefillText: string;
  };
  validation: {
    cartEmpty: string;
    customerNameRequired: string;
    invalidPhone: string;
    subCityRequired: string;
    invalidWoreda: string;
    invalidNeighborhood: string;
    serviceRequired: string;
    invalidDate: string;
    pastDate: string;
    timeSlotRequired: string;
    subjectRequired: string;
    messageRequired: string;
    fillAllRequired: string;
    notifyServiceRequired: string;
  };
}
