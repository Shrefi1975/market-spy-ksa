export interface ArabCountry {
  code: string;
  nameAr: string;
  nameEn: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  dialCode: string;
  region: "gulf" | "levant" | "north-africa" | "east-africa" | "other";
  regionAr: string;
  regions?: { value: string; label: string }[];
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  marketInfo: string;
}

export const regionLabels: Record<string, string> = {
  gulf: "دول الخليج العربي",
  levant: "بلاد الشام",
  "north-africa": "شمال أفريقيا",
  "east-africa": "شرق أفريقيا",
  other: "أخرى",
};

export const regionOrder = ["gulf", "levant", "north-africa", "east-africa", "other"];

export const arabCountries: ArabCountry[] = [
  // ===== دول الخليج =====
  {
    code: "sa", nameAr: "السعودية", nameEn: "Saudi Arabia", flag: "🇸🇦",
    currency: "SAR", currencySymbol: "ر.س", dialCode: "+966",
    region: "gulf", regionAr: "الخليج",
    regions: [
      { value: "all", label: "كامل المملكة" },
      { value: "riyadh", label: "الرياض" },
      { value: "jeddah", label: "جدة" },
      { value: "dammam", label: "الدمام" },
      { value: "makkah", label: "مكة المكرمة" },
      { value: "madinah", label: "المدينة المنورة" },
    ],
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق السعودي | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق السعودي. تحليل متقدم مدعوم بالذكاء الاصطناعي لتحسين ظهورك في محركات البحث بالمملكة العربية السعودية.",
    heroTitle: "تصدّر نتائج البحث في السوق السعودي",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في المملكة العربية السعودية واكتشف فرص النمو الذهبية",
    marketInfo: "السوق السعودي هو الأكبر في الخليج العربي مع أكثر من 35 مليون نسمة وقوة شرائية عالية.",
  },
  {
    code: "ae", nameAr: "الإمارات", nameEn: "United Arab Emirates", flag: "🇦🇪",
    currency: "AED", currencySymbol: "د.إ", dialCode: "+971",
    region: "gulf", regionAr: "الخليج",
    regions: [
      { value: "all", label: "كامل الإمارات" },
      { value: "dubai", label: "دبي" },
      { value: "abudhabi", label: "أبوظبي" },
      { value: "sharjah", label: "الشارقة" },
    ],
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق الإماراتي | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق الإماراتي. تحليل ذكي لتحسين SEO موقعك في دبي وأبوظبي.",
    heroTitle: "تصدّر نتائج البحث في الإمارات",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في الإمارات العربية المتحدة",
    marketInfo: "الإمارات مركز تجاري عالمي مع اقتصاد متنوع وقوة شرائية استثنائية.",
  },
  {
    code: "kw", nameAr: "الكويت", nameEn: "Kuwait", flag: "🇰🇼",
    currency: "KWD", currencySymbol: "د.ك", dialCode: "+965",
    region: "gulf", regionAr: "الخليج",
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق الكويتي | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق الكويتي.",
    heroTitle: "تصدّر نتائج البحث في الكويت",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في الكويت",
    marketInfo: "الكويت تتميز بأعلى دخل للفرد في المنطقة.",
  },
  {
    code: "qa", nameAr: "قطر", nameEn: "Qatar", flag: "🇶🇦",
    currency: "QAR", currencySymbol: "ر.ق", dialCode: "+974",
    region: "gulf", regionAr: "الخليج",
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق القطري | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق القطري.",
    heroTitle: "تصدّر نتائج البحث في قطر",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في قطر",
    marketInfo: "قطر من أغنى دول العالم مع بنية رقمية متطورة.",
  },
  {
    code: "bh", nameAr: "البحرين", nameEn: "Bahrain", flag: "🇧🇭",
    currency: "BHD", currencySymbol: "د.ب", dialCode: "+973",
    region: "gulf", regionAr: "الخليج",
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق البحريني | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق البحريني.",
    heroTitle: "تصدّر نتائج البحث في البحرين",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في البحرين",
    marketInfo: "البحرين مركز مالي إقليمي مع بيئة أعمال متطورة.",
  },
  {
    code: "om", nameAr: "عُمان", nameEn: "Oman", flag: "🇴🇲",
    currency: "OMR", currencySymbol: "ر.ع", dialCode: "+968",
    region: "gulf", regionAr: "الخليج",
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق العُماني | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق العُماني.",
    heroTitle: "تصدّر نتائج البحث في عُمان",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في سلطنة عُمان",
    marketInfo: "سلطنة عُمان تشهد نمواً في التجارة الإلكترونية مع رؤية 2040.",
  },
  {
    code: "ye", nameAr: "اليمن", nameEn: "Yemen", flag: "🇾🇪",
    currency: "YER", currencySymbol: "ر.ي", dialCode: "+967",
    region: "gulf", regionAr: "الخليج",
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق اليمني | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق اليمني.",
    heroTitle: "تصدّر نتائج البحث في اليمن",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في اليمن",
    marketInfo: "اليمن سوق ناشئ مع نمو في استخدام الهواتف الذكية.",
  },

  // ===== بلاد الشام =====
  {
    code: "iq", nameAr: "العراق", nameEn: "Iraq", flag: "🇮🇶",
    currency: "IQD", currencySymbol: "د.ع", dialCode: "+964",
    region: "levant", regionAr: "الشام",
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق العراقي | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق العراقي.",
    heroTitle: "تصدّر نتائج البحث في العراق",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في العراق",
    marketInfo: "العراق سوق ناشئ كبير مع أكثر من 40 مليون نسمة.",
  },
  {
    code: "jo", nameAr: "الأردن", nameEn: "Jordan", flag: "🇯🇴",
    currency: "JOD", currencySymbol: "د.أ", dialCode: "+962",
    region: "levant", regionAr: "الشام",
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق الأردني | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق الأردني.",
    heroTitle: "تصدّر نتائج البحث في الأردن",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في الأردن",
    marketInfo: "الأردن مركز تقني إقليمي مع كفاءات رقمية عالية.",
  },
  {
    code: "sy", nameAr: "سوريا", nameEn: "Syria", flag: "🇸🇾",
    currency: "SYP", currencySymbol: "ل.س", dialCode: "+963",
    region: "levant", regionAr: "الشام",
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق السوري | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق السوري.",
    heroTitle: "تصدّر نتائج البحث في سوريا",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في سوريا",
    marketInfo: "سوريا سوق ناشئ مع إمكانات نمو كبيرة.",
  },
  {
    code: "lb", nameAr: "لبنان", nameEn: "Lebanon", flag: "🇱🇧",
    currency: "LBP", currencySymbol: "ل.ل", dialCode: "+961",
    region: "levant", regionAr: "الشام",
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق اللبناني | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق اللبناني.",
    heroTitle: "تصدّر نتائج البحث في لبنان",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في لبنان",
    marketInfo: "لبنان يتميز بكفاءات رقمية عالية ومستوى تعليمي مرتفع.",
  },
  {
    code: "ps", nameAr: "فلسطين", nameEn: "Palestine", flag: "🇵🇸",
    currency: "ILS", currencySymbol: "₪", dialCode: "+970",
    region: "levant", regionAr: "الشام",
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق الفلسطيني | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق الفلسطيني.",
    heroTitle: "تصدّر نتائج البحث في فلسطين",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في فلسطين",
    marketInfo: "فلسطين تشهد نمواً في قطاع التكنولوجيا والتجارة الإلكترونية.",
  },

  // ===== شمال أفريقيا =====
  {
    code: "eg", nameAr: "مصر", nameEn: "Egypt", flag: "🇪🇬",
    currency: "EGP", currencySymbol: "ج.م", dialCode: "+20",
    region: "north-africa", regionAr: "شمال أفريقيا",
    regions: [
      { value: "all", label: "كامل مصر" },
      { value: "cairo", label: "القاهرة" },
      { value: "alexandria", label: "الإسكندرية" },
      { value: "giza", label: "الجيزة" },
    ],
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق المصري | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق المصري مع أكثر من 100 مليون مستخدم.",
    heroTitle: "تصدّر نتائج البحث في السوق المصري",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في مصر واستهدف أكبر سوق عربي",
    marketInfo: "مصر أكبر سوق عربي من حيث عدد السكان مع نمو سريع في التجارة الإلكترونية.",
  },
  {
    code: "ma", nameAr: "المغرب", nameEn: "Morocco", flag: "🇲🇦",
    currency: "MAD", currencySymbol: "د.م", dialCode: "+212",
    region: "north-africa", regionAr: "شمال أفريقيا",
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق المغربي | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق المغربي.",
    heroTitle: "تصدّر نتائج البحث في المغرب",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في المغرب",
    marketInfo: "المغرب بوابة أفريقيا مع نمو قوي في التجارة الإلكترونية.",
  },
  {
    code: "dz", nameAr: "الجزائر", nameEn: "Algeria", flag: "🇩🇿",
    currency: "DZD", currencySymbol: "د.ج", dialCode: "+213",
    region: "north-africa", regionAr: "شمال أفريقيا",
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق الجزائري | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق الجزائري.",
    heroTitle: "تصدّر نتائج البحث في الجزائر",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في الجزائر",
    marketInfo: "الجزائر أكبر دولة أفريقية مساحة مع سوق ناشئ.",
  },
  {
    code: "tn", nameAr: "تونس", nameEn: "Tunisia", flag: "🇹🇳",
    currency: "TND", currencySymbol: "د.ت", dialCode: "+216",
    region: "north-africa", regionAr: "شمال أفريقيا",
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق التونسي | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق التونسي.",
    heroTitle: "تصدّر نتائج البحث في تونس",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في تونس",
    marketInfo: "تونس تتميز بمستوى تعليمي عالٍ ونمو في الاقتصاد الرقمي.",
  },
  {
    code: "ly", nameAr: "ليبيا", nameEn: "Libya", flag: "🇱🇾",
    currency: "LYD", currencySymbol: "د.ل", dialCode: "+218",
    region: "north-africa", regionAr: "شمال أفريقيا",
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق الليبي | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق الليبي.",
    heroTitle: "تصدّر نتائج البحث في ليبيا",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في ليبيا",
    marketInfo: "ليبيا سوق ناشئ مع إمكانات نمو في التجارة الإلكترونية.",
  },
  {
    code: "sd", nameAr: "السودان", nameEn: "Sudan", flag: "🇸🇩",
    currency: "SDG", currencySymbol: "ج.س", dialCode: "+249",
    region: "north-africa", regionAr: "شمال أفريقيا",
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق السوداني | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق السوداني.",
    heroTitle: "تصدّر نتائج البحث في السودان",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في السودان",
    marketInfo: "السودان سوق كبير مع نمو في استخدام الإنترنت.",
  },
  {
    code: "mr", nameAr: "موريتانيا", nameEn: "Mauritania", flag: "🇲🇷",
    currency: "MRU", currencySymbol: "أ.م", dialCode: "+222",
    region: "north-africa", regionAr: "شمال أفريقيا",
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق الموريتاني | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق الموريتاني.",
    heroTitle: "تصدّر نتائج البحث في موريتانيا",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في موريتانيا",
    marketInfo: "موريتانيا سوق ناشئ في غرب أفريقيا.",
  },

  // ===== شرق أفريقيا =====
  {
    code: "so", nameAr: "الصومال", nameEn: "Somalia", flag: "🇸🇴",
    currency: "SOS", currencySymbol: "Sh", dialCode: "+252",
    region: "east-africa", regionAr: "شرق أفريقيا",
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق الصومالي | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق الصومالي.",
    heroTitle: "تصدّر نتائج البحث في الصومال",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في الصومال",
    marketInfo: "الصومال سوق ناشئ مع نمو في قطاع الاتصالات.",
  },
  {
    code: "dj", nameAr: "جيبوتي", nameEn: "Djibouti", flag: "🇩🇯",
    currency: "DJF", currencySymbol: "Fdj", dialCode: "+253",
    region: "east-africa", regionAr: "شرق أفريقيا",
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق الجيبوتي | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية لسوق جيبوتي.",
    heroTitle: "تصدّر نتائج البحث في جيبوتي",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في جيبوتي",
    marketInfo: "جيبوتي مركز تجاري استراتيجي في القرن الأفريقي.",
  },
  {
    code: "km", nameAr: "جزر القمر", nameEn: "Comoros", flag: "🇰🇲",
    currency: "KMF", currencySymbol: "CF", dialCode: "+269",
    region: "east-africa", regionAr: "شرق أفريقيا",
    seoTitle: "أداة بحث الكلمات المفتاحية لسوق جزر القمر | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية لسوق جزر القمر.",
    heroTitle: "تصدّر نتائج البحث في جزر القمر",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في جزر القمر",
    marketInfo: "جزر القمر سوق صغير مع فرص نمو في السياحة.",
  },

  // ===== أخرى =====
  {
    code: "td", nameAr: "تشاد", nameEn: "Chad", flag: "🇹🇩",
    currency: "XAF", currencySymbol: "FCFA", dialCode: "+235",
    region: "other", regionAr: "أخرى",
    seoTitle: "أداة بحث الكلمات المفتاحية للسوق التشادي | KeyRank",
    seoDescription: "اكتشف أفضل الكلمات المفتاحية للسوق التشادي.",
    heroTitle: "تصدّر نتائج البحث في تشاد",
    heroSubtitle: "حلل الكلمات المفتاحية الأكثر بحثاً في تشاد",
    marketInfo: "تشاد سوق ناشئ في وسط أفريقيا.",
  },
];

export const getArabCountriesByRegion = (): Record<string, ArabCountry[]> => {
  const grouped: Record<string, ArabCountry[]> = {};
  arabCountries.forEach(c => {
    if (!grouped[c.region]) grouped[c.region] = [];
    grouped[c.region].push(c);
  });
  return grouped;
};

export const getCountryByCode = (code: string): ArabCountry | undefined => {
  return arabCountries.find(c => c.code === code);
};

export const getCountryName = (code: string): string => {
  return getCountryByCode(code)?.nameAr || code;
};
