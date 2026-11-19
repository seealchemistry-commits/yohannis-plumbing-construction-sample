import type { TranslationDictionary } from '../types';

export const en: TranslationDictionary = {
  meta: {
    title: 'Tirat Plumbing | Pipe Installation, 24/7 Repair & Supplies',
    description:
      '24/7 Emergency Leak Repair, professional PPR, PVC and Copper pipe installation, Booster Pump setup, and original plumbing supplies in Addis Ababa.',
  },
  brand: {
    name: 'Tirat Plumbing',
    tagline:
      '24/7 Emergency Leak Repair, expert PPR, PVC & Copper piping, and plumbing supplies',
    city: 'Addis Ababa',
    officeAddress:
      'Bole Medhanialem, 2nd Floor beside Selu Building, Addis Ababa',
    hours: 'Mon – Sat: 8:00 AM – 5:30 PM (24/7 Emergency Leak Repair)',
    mapTitle: 'Tirat Plumbing · Bole Medhanialem',
    mapNearby: 'Near Bole Medhanialem Church (Edna Mall Road)',
  },
  header: {
    navAriaLabel: 'Main Navigation',
    mobileNavAriaLabel: 'Mobile Navigation',
    home: 'Home',
    services: 'Services',
    about: 'About',
    shop: 'Shop',
    blog: 'Blog',
    cart: 'Cart',
    cartAriaLabel: (count) => `Shopping Cart (${count} items)`,
    bookNow: 'Book Service',
    openMenu: 'Open Menu',
    closeMenu: 'Close Menu',
    contactLink: 'Contact & Location',
    languageLabel: 'Select Language',
  },
  hero: {
    eyebrow: 'Addis Ababa · Tirat Plumbing · 24/7 Emergency Service',
    headlineLine1: 'Plumbing Installation,',
    headlineLine2: 'Repair & Supplies',
    subtext:
      'PPR, PVC and Copper pipe installation, 24/7 emergency leak repair, and original plumbing supplies for homes, buildings, and businesses.',
    primaryCta: 'Book a Plumber',
    secondaryCta: 'Plumbing Supplies Shop',
    hotlineLabel: '24/7 Emergency Call / Direct Line:',
    imageAlt:
      'Tirat Plumbing precision water manifold, Copper & PPR piping, brass valves, filtration, and boiler installation',
    stats: [
      {
        value: '14+ Years',
        label: 'Experience in PPR, PVC & Copper plumbing works',
      },
      {
        value: '320+',
        label: 'Completed plumbing projects across Addis Ababa',
      },
      {
        value: '24/7',
        label: 'Emergency Leak Repair rapid-response service',
      },
      {
        value: '16 Bar',
        label: 'Hydrostatic Pressure Test verified on every line',
      },
    ],
  },
  servicesSection: {
    eyebrow: 'Our Plumbing Services',
    heading: '5 Core Services Focused on Piping & Maintenance',
    description:
      'From PPR, PVC, and Copper water and drainage piping to Booster Pump installation and 24/7 Emergency Leak Repair handled by certified technicians.',
    durationPrefix: 'Estimated Duration',
    bookServiceBtn: 'Book Now',
    items: {
      'SRV-01': {
        title: 'Clean Water Pipe Installation (PPR, PVC, Copper)',
        summary:
          'Precision hot and cold clean water piping systems using PPR, PVC, and Copper pipes for residential villas, apartments, and commercial towers.',
        deliverables: [
          'Accurate PPR, PVC & Copper layout design and installation',
          '16 Bar Hydrostatic Pressure Test verification',
          'Dedicated thermal insulation for hot & cold water lines',
        ],
        estimatedDuration: '2 to 14 days (based on project scope)',
      },
      'SRV-02': {
        title: 'Drainage Piping & Blocked Line Cleaning',
        summary:
          'Odor-free and leak-free uPVC drainage networks, manhole connections, and mechanical clearing for blocked kitchen, bath, and main sewer lines.',
        deliverables: [
          'Properly sloped uPVC drainage piping without backflow',
          'Non-destructive mechanical clearing of blocked lines',
          'Anti-odor Floor Trap and Vent Pipe installation',
        ],
        estimatedDuration: '2 hours to 3 days',
      },
      'SRV-03': {
        title: 'Water Pump (Booster Pump), Tank & Heater Installation',
        summary:
          'Balanced water pressure across every floor with automatic Booster Pumps, ground and rooftop water tanks, plus electric and solar water heaters.',
        deliverables: [
          'Booster Pump setup with Automatic Pressure Switch & Dry-Run Protection',
          'Water tank Float Valve and brass Check Valve installation',
          'Hot water boiler Safety Valve and thermal piping hookup',
        ],
        estimatedDuration: '1 day',
      },
      'SRV-04': {
        title: 'Bathroom & Kitchen Fixture Installation (Shower, WC, Sink, Mixers)',
        summary:
          'Leak-free mounting and sealing of shower enclosures, modern toilets (WC), vanity sinks, hot/cold Mixers, and washing machine outlets.',
        deliverables: [
          'Precision installation & waterproof silicone sealing for Shower, WC & Sink',
          'Durable Angle Valve and braided Flexible Hose connections',
          'Full water pressure & drainage inspection prior to handover',
        ],
        estimatedDuration: '3 hours to 2 days',
      },
      'SRV-05': {
        title: 'Leak Detection & 24/7 Emergency Leak Repair',
        summary:
          'Rapid 24/7 dispatch for concealed wall or floor leaks, burst pipes, or failing valves with lasting repairs and minimal disruption.',
        deliverables: [
          'Fast 24/7 emergency dispatch anywhere in Addis Ababa',
          'Targeted detection & pipe replacement without unnecessary wall damage',
          'Urgent pressure valve and joint replacement',
        ],
        estimatedDuration: 'Within 1 to 3 hours',
      },
    },
    comingSoonEyebrow: 'Coming Soon · Upcoming Expansion Services',
    comingSoonHeading: 'Upcoming Services (Coming Soon)',
    comingSoonDescription:
      'Today our focus is 100% dedicated to plumbing engineering and plumbing supplies. Leave your contact details to be notified first when our upcoming divisions launch.',
    comingSoonBadge: 'Coming Soon',
    notifyMeBtn: 'Notify Me',
    comingSoonItems: {
      'CS-01': {
        title: 'General Building Construction',
        subtitle: 'Building Construction',
        summary:
          'Turnkey residential villa and commercial building construction from foundation to finishing by our engineering team will launch soon.',
        expectedLaunch: 'Launching Soon (Coming Soon)',
      },
      'CS-02': {
        title: 'Home & Office Renovation',
        subtitle: 'Home & Office Renovation',
        summary:
          'Modern interior, bathroom, and kitchen architectural remodeling and complete upgrade packages will launch soon.',
        expectedLaunch: 'Launching Soon (Coming Soon)',
      },
    },
    notifyModal: {
      ariaPrefix: 'Notify Me',
      closeAriaLabel: 'Close modal',
      successTitle: 'Notification request registered',
      refLabel: 'Reference:',
      successDetail: (phone) =>
        `We will call or message you at ${phone} as soon as this service launches.`,
      backBtn: 'Done',
      intro:
        'Enter your name and phone number so we can notify you first when this service launches.',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'Enter your full name',
      phoneLabel: 'Phone Number',
      phonePlaceholder: '0912453752',
      cancelBtn: 'Cancel',
      submitBtn: 'Notify Me on Launch',
      submittingBtn: 'Submitting...',
      genericError: 'Unable to register your notification request.',
      networkError: 'Unable to reach the server. Please try again.',
    },
  },
  about: {
    eyebrow: 'About Our Company',
    heading: 'A Name Built on Modern Plumbing & Reliable Supplies',
    description:
      'Tirat Plumbing specializes in PPR, PVC, and Copper pipe installation, Booster Pump systems, and 24/7 Emergency Leak Repair across Addis Ababa. Because we stock our own plumbing supplies in exact sizes (1/2", 3/4", 1"), clients receive genuine fittings paired with expert installation in one place.',
    photo1Alt: 'Tirat Plumbing founder and lead technician on site',
    photo2Alt:
      'Tirat Plumbing technician installing PPR water manifold and shutoff valves on site',
    projectsHeading: 'Recently Completed Plumbing Projects',
    projects: [
      {
        name: 'Bole Rwanda G+4 Commercial Building Piping System',
        scope:
          'Complete PPR clean water network, uPVC drainage, and 3 rooftop Booster Pump installations',
        metric: '3,400m PPR piping · 0% leak defects',
      },
      {
        name: 'Ayat Village 12 Villas Sanitary & Piping',
        scope:
          'Full bathroom & kitchen sanitaryware fitting, solar/electric boilers, and water tank manifolds',
        metric: '100% 16 Bar Pressure Test · 2-Year Warranty',
      },
      {
        name: 'Kality Food Processing Water & Drainage Network',
        scope:
          'High-pressure Copper & PPR supply lines and heavy-duty drainage trap installation',
        metric: '24/7 Emergency Leak Repair Coverage',
      },
    ],
  },
  shop: {
    eyebrow: 'Online Plumbing Supplies Store',
    heading: 'Plumbing Supplies Shop',
    description:
      'Choose PPR/PVC pipes, forged brass valves, sanitary mixers, and Booster Pumps in exact diameters (1/2", 3/4", 1"). Free Addis Ababa delivery on orders over 15,000 ETB.',
    viewCartBtn: 'View Cart',
    categoriesAriaLabel: 'Plumbing supply categories',
    categories: {
      ALL: 'All Supplies',
      PIPES: 'PPR/PVC Pipes',
      VALVES: 'Fittings & Valves',
      PUMPS: 'Water Pumps',
      SANITARY: 'Sanitaryware',
    },
    searchLabel: 'Search plumbing supplies',
    searchPlaceholder: 'Search by product name or SKU...',
    emptyTitle: 'No plumbing supplies matched your search.',
    emptyHint: 'Try another keyword or clear filters to browse all products.',
    clearFilterBtn: 'Clear Filters',
    sizeLabel: 'Size Selection',
    sizeAriaLabel: (productName, size) => `${productName} size ${size}`,
    sizeGroupAriaLabel: (productName) => `${productName} sizes`,
    inStockLabel: (count) => `${count} in stock`,
    addToCartBtn: 'Add to Cart',
    addedBtn: 'Added',
    currencyLabel: 'ETB',
    products: {
      'PRD-101': {
        name: 'PPR Clean Water Pipe (PN20)',
        spec: '4m bar · Hot & cold potable water · ISO 15874',
        categoryLabel: 'PPR/PVC Pipes',
        unit: 'per bar',
      },
      'PRD-102': {
        name: 'Forged Brass Ball Valve',
        spec: 'Heavy-duty corrosion-resistant brass · 16 Bar rating',
        categoryLabel: 'Fittings & Valves',
        unit: 'per piece',
      },
      'PRD-103': {
        name: 'Automatic Booster Pump (750W)',
        spec: 'Stainless steel motor · Automatic pressure switch · Low noise',
        categoryLabel: 'Water Pumps',
        unit: 'per unit',
      },
      'PRD-104': {
        name: 'Brushed Stainless Mixer Faucet & Trap',
        spec: '304 Stainless Steel · Hot & cold Mixer · 5-Year Warranty',
        categoryLabel: 'Sanitaryware',
        unit: 'per set',
      },
      'PRD-105': {
        name: 'PPR & PVC Fitting Kit (Elbow & Tee)',
        spec: '10 Elbows + 10 Tees + 6 Couplings · Leak-tight fusion grade',
        categoryLabel: 'PPR/PVC Pipes',
        unit: 'per kit',
      },
      'PRD-106': {
        name: 'Brass Check Valve & Pressure Gauge',
        spec: 'Prevents backflow · Ideal for Booster Pump discharge lines',
        categoryLabel: 'Fittings & Valves',
        unit: 'per set',
      },
    },
    recentOrdersHeading: 'Recently Confirmed Supply Orders',
    totalOrdersLabel: 'Total Orders',
    confirmedStatus: 'Confirmed',
    sizeTag: (size) => `Size ${size}`,
  },
  booking: {
    eyebrow: 'Booking & Emergency Leak Repair Dispatch',
    heading: 'Book a Plumber Visit or Repair Appointment',
    description:
      'Schedule PPR/PVC/Copper installation, Booster Pump setup, sanitary fixture mounting, or 24/7 Emergency Leak Repair at your preferred date and Addis Ababa address.',
    confirmedTitle: 'Booking Confirmed',
    addressPrefix: 'Address:',
    serviceTypeLabel: 'Plumbing Service Type',
    propertyTypeLabel: 'Property / Building Type',
    propertyTypes: {
      RESIDENTIAL: 'Residential Home',
      COMMERCIAL: 'Commercial Building',
      INDUSTRIAL: 'Factory / Warehouse',
    },
    preferredDateLabel: 'Preferred Date',
    timeSlotLabel: 'Appointment Time Slot',
    timeSlots: [
      '09:00 AM (Morning)',
      '11:00 AM (Mid-Morning)',
      '02:00 PM (Afternoon)',
      '04:00 PM (Late Afternoon)',
      'Emergency / Urgent Repair (24/7)',
    ],
    fullNameLabel: 'Full Name',
    fullNamePlaceholder: 'Full name',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '0912453752',
    addressBoxTitle: 'Service Location (Addis Ababa)',
    step1SubCity: 'Step 1: Sub-City',
    step2Woreda: 'Step 2: Woreda',
    step3Neighborhood: 'Step 3: Neighborhood / Landmark',
    specificLandmarkLabel: 'Specific landmark / house no. (Optional)',
    specificLandmarkPlaceholder:
      'e.g. House No. 402, building name, or nearby landmark...',
    notesLabel: 'Brief description of plumbing issue or scope (Optional)',
    notesPlaceholder:
      'e.g. 2nd floor bathroom Booster Pump pressure dropped or PPR pipe leak...',
    submitBtn: 'Confirm Booking',
    submittingBtn: 'Submitting booking...',
    scheduledHeading: 'Scheduled Plumbing Appointments',
    noBookings: 'No appointments scheduled yet.',
    scheduledStatus: 'Scheduled',
    clientPrefix: 'Client',
    footerNote:
      'For 24/7 Emergency Leak Repair or pipe installation bookings, our technician calls 30 minutes prior to arrival.',
    genericError: 'Unable to submit booking.',
    networkError: 'Unable to reach the server. Please try again.',
  },
  cart: {
    dialogAriaLabel: 'Shopping Cart and Checkout',
    title: (count) => `Shopping Cart (${count})`,
    closeAriaLabel: 'Close cart',
    orderConfirmedTitle: 'Order Confirmed Successfully',
    orderIdLabel: 'Order ID:',
    customerLabel: 'Customer:',
    addressLabel: 'Delivery Address:',
    totalPaidLabel: 'Total Amount:',
    backToShopBtn: 'Back to Shop',
    emptyTitle: 'Your cart is currently empty',
    emptyHint:
      'Browse our Shop for PPR/PVC pipes, forged brass valves, sanitary mixers, or Booster Pumps.',
    browseProductsBtn: 'Browse Supplies',
    freeDeliveryQualified: (threshold) =>
      `Your order exceeds ${threshold} and qualifies for free delivery in Addis Ababa.`,
    freeDeliveryRemainingPrefix: 'Add ',
    freeDeliveryRemainingSuffix: ' more to unlock free delivery.',
    sizeLabel: 'Size:',
    decreaseQtyAria: (name, size) => `Decrease quantity — ${name} (${size})`,
    increaseQtyAria: (name, size) => `Increase quantity — ${name} (${size})`,
    removeItemAria: (name, size) => `Remove item — ${name} (${size})`,
    subtotalLabel: 'Items Subtotal',
    deliveryFeeLabel: 'Delivery Fee',
    freeLabel: 'Free',
    totalLabel: 'Total Payment',
    checkoutHeading: 'Checkout — Delivery Address & Payment',
    fullNameLabel: 'Full Name',
    fullNamePlaceholder: 'e.g. Dawit Bekele',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '0912453752',
    deliveryAddressTitle: 'Delivery Address (Addis Ababa)',
    paymentMethodLabel: 'Payment Method',
    paymentMethods: {
      TELEBIRR: 'Telebirr',
      CBE_BIRR: 'CBE Birr',
      CASH_ON_DELIVERY: 'Cash on Delivery',
    },
    submittingBtn: 'Confirming order...',
    confirmOrderBtn: (totalFormatted) => `Confirm Order (${totalFormatted})`,
    genericError: 'Unable to confirm order.',
    networkError: 'Unable to reach the server. Please try again.',
  },
  blog: {
    eyebrow: 'Blog & Plumbing Guides',
    heading: 'Guides on Pipe Selection, Leak Prevention & Pump Care',
    readMoreBtn: 'Read Full Article',
    closeArticleAriaLabel: 'Close article',
    articles: {
      'BLG-01': {
        title: 'How to Choose the Right PPR, PVC & Copper Pipes and Fittings',
        category: 'Material Guide',
        publishedDate: 'Nov 17, 2026',
        readTime: '4 min read',
        excerpt:
          'Selecting proper pipe diameters (1/2", 3/4", 1") and PN20 pressure ratings ensures durable clean water, hot water, and drainage installations.',
        paragraphs: [
          'While many plumbing materials are sold on the market, not every pipe suits every pressure zone. Using 1" or 3/4" PN20 PPR for main building risers and Booster Pump discharge lines ensures balanced flow across floors.',
          'Branch lines feeding individual bathrooms and sinks perform best in 1/2" diameter so pressure remains steady at every tap. Never use thin-wall PN10 or standard PVC for hot water lines.',
          'At Tirat Plumbing, every PPR socket fusion joint is welded at a calibrated 260°C and verified with a 16 Bar Hydrostatic Pressure Test before handover.',
        ],
        author: 'Yohannis Tadesse · Lead Master Plumber',
      },
      'BLG-02': {
        title: 'Preventing Household Water Leaks & When to Call 24/7 Emergency Leak Repair',
        category: 'Leak Prevention',
        publishedDate: 'Nov 8, 2026',
        readTime: '3 min read',
        excerpt:
          'Spotting early signs of concealed leaks before water damages walls or flooring saves major repair costs.',
        paragraphs: [
          'Most costly leaks start quietly from a slow-dripping under-sink Angle Valve or toilet cistern seal. If your water meter spins while all faucets are closed, a concealed leak is present.',
          'When you notice wall dampness, bubbling paint, or a sudden drop in water pressure, avoid blind wall demolition—call our 24/7 Emergency Leak Repair team for targeted detection and replacement.',
          'Testing your main Ball Valve shutoff once every six months guarantees you can isolate water flow within seconds during an emergency.',
        ],
        author: 'Eng. Birhanu Tesfaye · Sanitary Engineer',
      },
      'BLG-03': {
        title: 'Booster Pump & Water Tank Maintenance for Reliable Pressure',
        category: 'System Maintenance',
        publishedDate: 'Oct 24, 2026',
        readTime: '4 min read',
        excerpt:
          'Protect your Booster Pump motor from burnout using Dry-Run Protection, brass Check Valves, and scheduled tank cleaning.',
        paragraphs: [
          'During municipal water interruptions in Addis Ababa, equipping your Booster Pump with an electronic pressure controller that includes Dry-Run Protection prevents the motor from running dry and burning out.',
          'A forged brass Check Valve installed on the pump outlet stops pressurized water from surging backward, preventing rapid short-cycling.',
          'Cleaning rooftop and ground tanks every 6 months and inspecting Float Valves keeps sediment out of bathroom Mixers and rain shower heads.',
        ],
        author: 'Tech. Dawit Mekonnen · Booster Pump Specialist',
      },
    },
  },
  contact: {
    eyebrow: 'Contact & Office Location',
    heading: 'Contact Us or Request 24/7 Emergency Leak Repair',
    description:
      'Reach our team by phone, Telegram, or at our Addis Ababa office for emergency leak repairs, new pipe installations, or wholesale plumbing supplies.',
    phoneLabel: 'Phone (24/7 Emergency Leak Repair)',
    telegramLabel: 'Telegram',
    officeLabel: 'Head Office',
    emailLabel: 'Email',
    hoursLabel: 'Working Hours',
    openGoogleMapsBtn: 'Open in Google Maps',
    mapFallbackNotice:
      'Interactive map unavailable in this window. Use the "Open in Google Maps" button below.',
    formTitle: 'Send a Direct Message',
    successMessagePrefix: 'Your message has been received (Ref:',
    successMessageSuffix: '). Our plumbing team will call you shortly.',
    fullNameLabel: 'Full Name',
    fullNamePlaceholder: 'Enter your name',
    phoneInputLabel: 'Phone Number',
    phoneInputPlaceholder: '0912453752',
    subjectLabel: 'Subject',
    subjectPlaceholder: 'e.g. Booster Pump setup or PPR pipe quote',
    messageLabel: 'Message',
    messagePlaceholder:
      'Describe your plumbing service requirement or supply list...',
    sendBtn: 'Send Message',
    sendingBtn: 'Sending...',
    genericError: 'Unable to send message.',
    networkError: 'Unable to reach the server.',
  },
  footer: {
    bookingLink: 'Booking',
    contactLink: 'Contact',
    copyright: (_yearEth, brand, city) => `© 2026 ${brand} · ${city}`,
  },
  validation: {
    cartEmpty: 'Your cart is empty; please add plumbing supplies first.',
    customerNameRequired: 'Please enter your full name.',
    invalidPhone:
      'Please enter a valid Ethiopian phone number (e.g. 0912453752).',
    subCityRequired: 'Please select a Sub-City.',
    invalidWoreda: 'Please select a valid Woreda for this Sub-City.',
    invalidNeighborhood:
      'Please select a valid Neighborhood / Landmark for this Sub-City.',
    serviceRequired: 'Please select the plumbing service you need.',
    invalidDate: 'Please choose a valid appointment date.',
    pastDate: 'Past dates cannot be selected; please choose today or a future date.',
    timeSlotRequired: 'Please select an appointment time slot.',
    subjectRequired: 'Please enter a subject.',
    messageRequired: 'Please write a detailed message.',
    fillAllRequired: 'Please fill in all required fields accurately.',
    notifyServiceRequired: 'Please select a service.',
  },
};
