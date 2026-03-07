export interface Country {
  code: string;
  nameAr: string;
  nameEn: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  continent: "asia" | "europe" | "africa" | "north-america" | "south-america" | "oceania";
  continentAr: string;
}

// Dynamic SEO content generation for any country
export function getCountrySeoTitle(country: Country): string {
  return `أداة بحث الكلمات المفتاحية لسوق ${country.nameAr} | KeyRank`;
}

export function getCountrySeoDescription(country: Country): string {
  return `اكتشف أفضل الكلمات المفتاحية لسوق ${country.nameAr}. تحليل متقدم مدعوم بالذكاء الاصطناعي لتحسين ظهورك في محركات البحث في ${country.nameAr}. ابدأ مجاناً الآن!`;
}

export function getCountryHeroTitle(country: Country): string {
  return `تصدّر نتائج البحث في سوق ${country.nameAr}`;
}

export function getCountryHeroSubtitle(country: Country): string {
  return `حلل الكلمات المفتاحية الأكثر بحثاً في ${country.nameAr} واكتشف فرص النمو الذهبية لمتجرك الإلكتروني`;
}

export function getCountryMarketInfo(country: Country): string {
  return `أداة KeyRank تقدم تحليلاً متقدماً للكلمات المفتاحية في سوق ${country.nameAr} باستخدام الذكاء الاصطناعي. اكتشف الكلمات المفتاحية الذهبية وتفوّق على منافسيك.`;
}

export const countries: Country[] = [
  // ===== آسيا =====
  { code: "sa", nameAr: "السعودية", nameEn: "Saudi Arabia", flag: "🇸🇦", currency: "SAR", currencySymbol: "ر.س", continent: "asia", continentAr: "آسيا" },
  { code: "ae", nameAr: "الإمارات", nameEn: "United Arab Emirates", flag: "🇦🇪", currency: "AED", currencySymbol: "د.إ", continent: "asia", continentAr: "آسيا" },
  { code: "kw", nameAr: "الكويت", nameEn: "Kuwait", flag: "🇰🇼", currency: "KWD", currencySymbol: "د.ك", continent: "asia", continentAr: "آسيا" },
  { code: "qa", nameAr: "قطر", nameEn: "Qatar", flag: "🇶🇦", currency: "QAR", currencySymbol: "ر.ق", continent: "asia", continentAr: "آسيا" },
  { code: "bh", nameAr: "البحرين", nameEn: "Bahrain", flag: "🇧🇭", currency: "BHD", currencySymbol: "د.ب", continent: "asia", continentAr: "آسيا" },
  { code: "om", nameAr: "عُمان", nameEn: "Oman", flag: "🇴🇲", currency: "OMR", currencySymbol: "ر.ع", continent: "asia", continentAr: "آسيا" },
  { code: "jo", nameAr: "الأردن", nameEn: "Jordan", flag: "🇯🇴", currency: "JOD", currencySymbol: "د.أ", continent: "asia", continentAr: "آسيا" },
  { code: "ps", nameAr: "فلسطين", nameEn: "Palestine", flag: "🇵🇸", currency: "ILS", currencySymbol: "₪", continent: "asia", continentAr: "آسيا" },
  { code: "iq", nameAr: "العراق", nameEn: "Iraq", flag: "🇮🇶", currency: "IQD", currencySymbol: "د.ع", continent: "asia", continentAr: "آسيا" },
  { code: "lb", nameAr: "لبنان", nameEn: "Lebanon", flag: "🇱🇧", currency: "LBP", currencySymbol: "ل.ل", continent: "asia", continentAr: "آسيا" },
  { code: "sy", nameAr: "سوريا", nameEn: "Syria", flag: "🇸🇾", currency: "SYP", currencySymbol: "ل.س", continent: "asia", continentAr: "آسيا" },
  { code: "ye", nameAr: "اليمن", nameEn: "Yemen", flag: "🇾🇪", currency: "YER", currencySymbol: "ر.ي", continent: "asia", continentAr: "آسيا" },
  { code: "tr", nameAr: "تركيا", nameEn: "Turkey", flag: "🇹🇷", currency: "TRY", currencySymbol: "₺", continent: "asia", continentAr: "آسيا" },
  { code: "ir", nameAr: "إيران", nameEn: "Iran", flag: "🇮🇷", currency: "IRR", currencySymbol: "﷼", continent: "asia", continentAr: "آسيا" },
  { code: "pk", nameAr: "باكستان", nameEn: "Pakistan", flag: "🇵🇰", currency: "PKR", currencySymbol: "₨", continent: "asia", continentAr: "آسيا" },
  { code: "af", nameAr: "أفغانستان", nameEn: "Afghanistan", flag: "🇦🇫", currency: "AFN", currencySymbol: "؋", continent: "asia", continentAr: "آسيا" },
  { code: "in", nameAr: "الهند", nameEn: "India", flag: "🇮🇳", currency: "INR", currencySymbol: "₹", continent: "asia", continentAr: "آسيا" },
  { code: "cn", nameAr: "الصين", nameEn: "China", flag: "🇨🇳", currency: "CNY", currencySymbol: "¥", continent: "asia", continentAr: "آسيا" },
  { code: "jp", nameAr: "اليابان", nameEn: "Japan", flag: "🇯🇵", currency: "JPY", currencySymbol: "¥", continent: "asia", continentAr: "آسيا" },
  { code: "kr", nameAr: "كوريا الجنوبية", nameEn: "South Korea", flag: "🇰🇷", currency: "KRW", currencySymbol: "₩", continent: "asia", continentAr: "آسيا" },
  { code: "kp", nameAr: "كوريا الشمالية", nameEn: "North Korea", flag: "🇰🇵", currency: "KPW", currencySymbol: "₩", continent: "asia", continentAr: "آسيا" },
  { code: "my", nameAr: "ماليزيا", nameEn: "Malaysia", flag: "🇲🇾", currency: "MYR", currencySymbol: "RM", continent: "asia", continentAr: "آسيا" },
  { code: "id", nameAr: "إندونيسيا", nameEn: "Indonesia", flag: "🇮🇩", currency: "IDR", currencySymbol: "Rp", continent: "asia", continentAr: "آسيا" },
  { code: "th", nameAr: "تايلاند", nameEn: "Thailand", flag: "🇹🇭", currency: "THB", currencySymbol: "฿", continent: "asia", continentAr: "آسيا" },
  { code: "vn", nameAr: "فيتنام", nameEn: "Vietnam", flag: "🇻🇳", currency: "VND", currencySymbol: "₫", continent: "asia", continentAr: "آسيا" },
  { code: "ph", nameAr: "الفلبين", nameEn: "Philippines", flag: "🇵🇭", currency: "PHP", currencySymbol: "₱", continent: "asia", continentAr: "آسيا" },
  { code: "sg", nameAr: "سنغافورة", nameEn: "Singapore", flag: "🇸🇬", currency: "SGD", currencySymbol: "S$", continent: "asia", continentAr: "آسيا" },
  { code: "bd", nameAr: "بنغلاديش", nameEn: "Bangladesh", flag: "🇧🇩", currency: "BDT", currencySymbol: "৳", continent: "asia", continentAr: "آسيا" },
  { code: "lk", nameAr: "سريلانكا", nameEn: "Sri Lanka", flag: "🇱🇰", currency: "LKR", currencySymbol: "Rs", continent: "asia", continentAr: "آسيا" },
  { code: "np", nameAr: "نيبال", nameEn: "Nepal", flag: "🇳🇵", currency: "NPR", currencySymbol: "Rs", continent: "asia", continentAr: "آسيا" },
  { code: "mm", nameAr: "ميانمار", nameEn: "Myanmar", flag: "🇲🇲", currency: "MMK", currencySymbol: "K", continent: "asia", continentAr: "آسيا" },
  { code: "kh", nameAr: "كمبوديا", nameEn: "Cambodia", flag: "🇰🇭", currency: "KHR", currencySymbol: "៛", continent: "asia", continentAr: "آسيا" },
  { code: "la", nameAr: "لاوس", nameEn: "Laos", flag: "🇱🇦", currency: "LAK", currencySymbol: "₭", continent: "asia", continentAr: "آسيا" },
  { code: "mn", nameAr: "منغوليا", nameEn: "Mongolia", flag: "🇲🇳", currency: "MNT", currencySymbol: "₮", continent: "asia", continentAr: "آسيا" },
  { code: "uz", nameAr: "أوزبكستان", nameEn: "Uzbekistan", flag: "🇺🇿", currency: "UZS", currencySymbol: "сўм", continent: "asia", continentAr: "آسيا" },
  { code: "kz", nameAr: "كازاخستان", nameEn: "Kazakhstan", flag: "🇰🇿", currency: "KZT", currencySymbol: "₸", continent: "asia", continentAr: "آسيا" },
  { code: "tm", nameAr: "تركمانستان", nameEn: "Turkmenistan", flag: "🇹🇲", currency: "TMT", currencySymbol: "T", continent: "asia", continentAr: "آسيا" },
  { code: "tj", nameAr: "طاجيكستان", nameEn: "Tajikistan", flag: "🇹🇯", currency: "TJS", currencySymbol: "SM", continent: "asia", continentAr: "آسيا" },
  { code: "kg", nameAr: "قيرغيزستان", nameEn: "Kyrgyzstan", flag: "🇰🇬", currency: "KGS", currencySymbol: "сом", continent: "asia", continentAr: "آسيا" },
  { code: "az", nameAr: "أذربيجان", nameEn: "Azerbaijan", flag: "🇦🇿", currency: "AZN", currencySymbol: "₼", continent: "asia", continentAr: "آسيا" },
  { code: "ge", nameAr: "جورجيا", nameEn: "Georgia", flag: "🇬🇪", currency: "GEL", currencySymbol: "₾", continent: "asia", continentAr: "آسيا" },
  { code: "am", nameAr: "أرمينيا", nameEn: "Armenia", flag: "🇦🇲", currency: "AMD", currencySymbol: "֏", continent: "asia", continentAr: "آسيا" },
  { code: "cy", nameAr: "قبرص", nameEn: "Cyprus", flag: "🇨🇾", currency: "EUR", currencySymbol: "€", continent: "asia", continentAr: "آسيا" },
  { code: "tw", nameAr: "تايوان", nameEn: "Taiwan", flag: "🇹🇼", currency: "TWD", currencySymbol: "NT$", continent: "asia", continentAr: "آسيا" },
  { code: "hk", nameAr: "هونغ كونغ", nameEn: "Hong Kong", flag: "🇭🇰", currency: "HKD", currencySymbol: "HK$", continent: "asia", continentAr: "آسيا" },
  { code: "mo", nameAr: "ماكاو", nameEn: "Macau", flag: "🇲🇴", currency: "MOP", currencySymbol: "MOP$", continent: "asia", continentAr: "آسيا" },
  { code: "bn", nameAr: "بروناي", nameEn: "Brunei", flag: "🇧🇳", currency: "BND", currencySymbol: "B$", continent: "asia", continentAr: "آسيا" },
  { code: "mv", nameAr: "المالديف", nameEn: "Maldives", flag: "🇲🇻", currency: "MVR", currencySymbol: "Rf", continent: "asia", continentAr: "آسيا" },
  { code: "bt", nameAr: "بوتان", nameEn: "Bhutan", flag: "🇧🇹", currency: "BTN", currencySymbol: "Nu", continent: "asia", continentAr: "آسيا" },
  { code: "tl", nameAr: "تيمور الشرقية", nameEn: "Timor-Leste", flag: "🇹🇱", currency: "USD", currencySymbol: "$", continent: "asia", continentAr: "آسيا" },

  // ===== أوروبا =====
  { code: "gb", nameAr: "المملكة المتحدة", nameEn: "United Kingdom", flag: "🇬🇧", currency: "GBP", currencySymbol: "£", continent: "europe", continentAr: "أوروبا" },
  { code: "de", nameAr: "ألمانيا", nameEn: "Germany", flag: "🇩🇪", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "fr", nameAr: "فرنسا", nameEn: "France", flag: "🇫🇷", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "it", nameAr: "إيطاليا", nameEn: "Italy", flag: "🇮🇹", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "es", nameAr: "إسبانيا", nameEn: "Spain", flag: "🇪🇸", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "pt", nameAr: "البرتغال", nameEn: "Portugal", flag: "🇵🇹", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "nl", nameAr: "هولندا", nameEn: "Netherlands", flag: "🇳🇱", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "be", nameAr: "بلجيكا", nameEn: "Belgium", flag: "🇧🇪", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "ch", nameAr: "سويسرا", nameEn: "Switzerland", flag: "🇨🇭", currency: "CHF", currencySymbol: "CHF", continent: "europe", continentAr: "أوروبا" },
  { code: "at", nameAr: "النمسا", nameEn: "Austria", flag: "🇦🇹", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "se", nameAr: "السويد", nameEn: "Sweden", flag: "🇸🇪", currency: "SEK", currencySymbol: "kr", continent: "europe", continentAr: "أوروبا" },
  { code: "no", nameAr: "النرويج", nameEn: "Norway", flag: "🇳🇴", currency: "NOK", currencySymbol: "kr", continent: "europe", continentAr: "أوروبا" },
  { code: "dk", nameAr: "الدنمارك", nameEn: "Denmark", flag: "🇩🇰", currency: "DKK", currencySymbol: "kr", continent: "europe", continentAr: "أوروبا" },
  { code: "fi", nameAr: "فنلندا", nameEn: "Finland", flag: "🇫🇮", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "ie", nameAr: "أيرلندا", nameEn: "Ireland", flag: "🇮🇪", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "pl", nameAr: "بولندا", nameEn: "Poland", flag: "🇵🇱", currency: "PLN", currencySymbol: "zł", continent: "europe", continentAr: "أوروبا" },
  { code: "cz", nameAr: "التشيك", nameEn: "Czech Republic", flag: "🇨🇿", currency: "CZK", currencySymbol: "Kč", continent: "europe", continentAr: "أوروبا" },
  { code: "sk", nameAr: "سلوفاكيا", nameEn: "Slovakia", flag: "🇸🇰", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "hu", nameAr: "المجر", nameEn: "Hungary", flag: "🇭🇺", currency: "HUF", currencySymbol: "Ft", continent: "europe", continentAr: "أوروبا" },
  { code: "ro", nameAr: "رومانيا", nameEn: "Romania", flag: "🇷🇴", currency: "RON", currencySymbol: "lei", continent: "europe", continentAr: "أوروبا" },
  { code: "bg", nameAr: "بلغاريا", nameEn: "Bulgaria", flag: "🇧🇬", currency: "BGN", currencySymbol: "лв", continent: "europe", continentAr: "أوروبا" },
  { code: "hr", nameAr: "كرواتيا", nameEn: "Croatia", flag: "🇭🇷", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "rs", nameAr: "صربيا", nameEn: "Serbia", flag: "🇷🇸", currency: "RSD", currencySymbol: "din", continent: "europe", continentAr: "أوروبا" },
  { code: "si", nameAr: "سلوفينيا", nameEn: "Slovenia", flag: "🇸🇮", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "ba", nameAr: "البوسنة والهرسك", nameEn: "Bosnia and Herzegovina", flag: "🇧🇦", currency: "BAM", currencySymbol: "KM", continent: "europe", continentAr: "أوروبا" },
  { code: "me", nameAr: "الجبل الأسود", nameEn: "Montenegro", flag: "🇲🇪", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "mk", nameAr: "مقدونيا الشمالية", nameEn: "North Macedonia", flag: "🇲🇰", currency: "MKD", currencySymbol: "ден", continent: "europe", continentAr: "أوروبا" },
  { code: "al", nameAr: "ألبانيا", nameEn: "Albania", flag: "🇦🇱", currency: "ALL", currencySymbol: "L", continent: "europe", continentAr: "أوروبا" },
  { code: "xk", nameAr: "كوسوفو", nameEn: "Kosovo", flag: "🇽🇰", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "gr", nameAr: "اليونان", nameEn: "Greece", flag: "🇬🇷", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "ua", nameAr: "أوكرانيا", nameEn: "Ukraine", flag: "🇺🇦", currency: "UAH", currencySymbol: "₴", continent: "europe", continentAr: "أوروبا" },
  { code: "ru", nameAr: "روسيا", nameEn: "Russia", flag: "🇷🇺", currency: "RUB", currencySymbol: "₽", continent: "europe", continentAr: "أوروبا" },
  { code: "by", nameAr: "بيلاروسيا", nameEn: "Belarus", flag: "🇧🇾", currency: "BYN", currencySymbol: "Br", continent: "europe", continentAr: "أوروبا" },
  { code: "md", nameAr: "مولدوفا", nameEn: "Moldova", flag: "🇲🇩", currency: "MDL", currencySymbol: "L", continent: "europe", continentAr: "أوروبا" },
  { code: "lt", nameAr: "ليتوانيا", nameEn: "Lithuania", flag: "🇱🇹", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "lv", nameAr: "لاتفيا", nameEn: "Latvia", flag: "🇱🇻", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "ee", nameAr: "إستونيا", nameEn: "Estonia", flag: "🇪🇪", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "is", nameAr: "أيسلندا", nameEn: "Iceland", flag: "🇮🇸", currency: "ISK", currencySymbol: "kr", continent: "europe", continentAr: "أوروبا" },
  { code: "lu", nameAr: "لوكسمبورغ", nameEn: "Luxembourg", flag: "🇱🇺", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "mt", nameAr: "مالطا", nameEn: "Malta", flag: "🇲🇹", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "mc", nameAr: "موناكو", nameEn: "Monaco", flag: "🇲🇨", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "li", nameAr: "ليختنشتاين", nameEn: "Liechtenstein", flag: "🇱🇮", currency: "CHF", currencySymbol: "CHF", continent: "europe", continentAr: "أوروبا" },
  { code: "ad", nameAr: "أندورا", nameEn: "Andorra", flag: "🇦🇩", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "sm", nameAr: "سان مارينو", nameEn: "San Marino", flag: "🇸🇲", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },
  { code: "va", nameAr: "الفاتيكان", nameEn: "Vatican City", flag: "🇻🇦", currency: "EUR", currencySymbol: "€", continent: "europe", continentAr: "أوروبا" },

  // ===== أفريقيا =====
  { code: "eg", nameAr: "مصر", nameEn: "Egypt", flag: "🇪🇬", currency: "EGP", currencySymbol: "ج.م", continent: "africa", continentAr: "أفريقيا" },
  { code: "ma", nameAr: "المغرب", nameEn: "Morocco", flag: "🇲🇦", currency: "MAD", currencySymbol: "د.م", continent: "africa", continentAr: "أفريقيا" },
  { code: "dz", nameAr: "الجزائر", nameEn: "Algeria", flag: "🇩🇿", currency: "DZD", currencySymbol: "د.ج", continent: "africa", continentAr: "أفريقيا" },
  { code: "tn", nameAr: "تونس", nameEn: "Tunisia", flag: "🇹🇳", currency: "TND", currencySymbol: "د.ت", continent: "africa", continentAr: "أفريقيا" },
  { code: "ly", nameAr: "ليبيا", nameEn: "Libya", flag: "🇱🇾", currency: "LYD", currencySymbol: "د.ل", continent: "africa", continentAr: "أفريقيا" },
  { code: "sd", nameAr: "السودان", nameEn: "Sudan", flag: "🇸🇩", currency: "SDG", currencySymbol: "ج.س", continent: "africa", continentAr: "أفريقيا" },
  { code: "ng", nameAr: "نيجيريا", nameEn: "Nigeria", flag: "🇳🇬", currency: "NGN", currencySymbol: "₦", continent: "africa", continentAr: "أفريقيا" },
  { code: "za", nameAr: "جنوب أفريقيا", nameEn: "South Africa", flag: "🇿🇦", currency: "ZAR", currencySymbol: "R", continent: "africa", continentAr: "أفريقيا" },
  { code: "ke", nameAr: "كينيا", nameEn: "Kenya", flag: "🇰🇪", currency: "KES", currencySymbol: "KSh", continent: "africa", continentAr: "أفريقيا" },
  { code: "gh", nameAr: "غانا", nameEn: "Ghana", flag: "🇬🇭", currency: "GHS", currencySymbol: "₵", continent: "africa", continentAr: "أفريقيا" },
  { code: "et", nameAr: "إثيوبيا", nameEn: "Ethiopia", flag: "🇪🇹", currency: "ETB", currencySymbol: "Br", continent: "africa", continentAr: "أفريقيا" },
  { code: "tz", nameAr: "تنزانيا", nameEn: "Tanzania", flag: "🇹🇿", currency: "TZS", currencySymbol: "TSh", continent: "africa", continentAr: "أفريقيا" },
  { code: "ug", nameAr: "أوغندا", nameEn: "Uganda", flag: "🇺🇬", currency: "UGX", currencySymbol: "USh", continent: "africa", continentAr: "أفريقيا" },
  { code: "sn", nameAr: "السنغال", nameEn: "Senegal", flag: "🇸🇳", currency: "XOF", currencySymbol: "CFA", continent: "africa", continentAr: "أفريقيا" },
  { code: "ci", nameAr: "ساحل العاج", nameEn: "Ivory Coast", flag: "🇨🇮", currency: "XOF", currencySymbol: "CFA", continent: "africa", continentAr: "أفريقيا" },
  { code: "cm", nameAr: "الكاميرون", nameEn: "Cameroon", flag: "🇨🇲", currency: "XAF", currencySymbol: "FCFA", continent: "africa", continentAr: "أفريقيا" },
  { code: "cd", nameAr: "الكونغو الديمقراطية", nameEn: "DR Congo", flag: "🇨🇩", currency: "CDF", currencySymbol: "FC", continent: "africa", continentAr: "أفريقيا" },
  { code: "ao", nameAr: "أنغولا", nameEn: "Angola", flag: "🇦🇴", currency: "AOA", currencySymbol: "Kz", continent: "africa", continentAr: "أفريقيا" },
  { code: "mz", nameAr: "موزمبيق", nameEn: "Mozambique", flag: "🇲🇿", currency: "MZN", currencySymbol: "MT", continent: "africa", continentAr: "أفريقيا" },
  { code: "mg", nameAr: "مدغشقر", nameEn: "Madagascar", flag: "🇲🇬", currency: "MGA", currencySymbol: "Ar", continent: "africa", continentAr: "أفريقيا" },
  { code: "rw", nameAr: "رواندا", nameEn: "Rwanda", flag: "🇷🇼", currency: "RWF", currencySymbol: "FRw", continent: "africa", continentAr: "أفريقيا" },
  { code: "zm", nameAr: "زامبيا", nameEn: "Zambia", flag: "🇿🇲", currency: "ZMW", currencySymbol: "ZK", continent: "africa", continentAr: "أفريقيا" },
  { code: "zw", nameAr: "زيمبابوي", nameEn: "Zimbabwe", flag: "🇿🇼", currency: "ZWL", currencySymbol: "Z$", continent: "africa", continentAr: "أفريقيا" },
  { code: "bw", nameAr: "بوتسوانا", nameEn: "Botswana", flag: "🇧🇼", currency: "BWP", currencySymbol: "P", continent: "africa", continentAr: "أفريقيا" },
  { code: "na", nameAr: "ناميبيا", nameEn: "Namibia", flag: "🇳🇦", currency: "NAD", currencySymbol: "N$", continent: "africa", continentAr: "أفريقيا" },
  { code: "mu", nameAr: "موريشيوس", nameEn: "Mauritius", flag: "🇲🇺", currency: "MUR", currencySymbol: "₨", continent: "africa", continentAr: "أفريقيا" },
  { code: "mr", nameAr: "موريتانيا", nameEn: "Mauritania", flag: "🇲🇷", currency: "MRU", currencySymbol: "UM", continent: "africa", continentAr: "أفريقيا" },
  { code: "so", nameAr: "الصومال", nameEn: "Somalia", flag: "🇸🇴", currency: "SOS", currencySymbol: "Sh", continent: "africa", continentAr: "أفريقيا" },
  { code: "dj", nameAr: "جيبوتي", nameEn: "Djibouti", flag: "🇩🇯", currency: "DJF", currencySymbol: "Fdj", continent: "africa", continentAr: "أفريقيا" },
  { code: "km", nameAr: "جزر القمر", nameEn: "Comoros", flag: "🇰🇲", currency: "KMF", currencySymbol: "CF", continent: "africa", continentAr: "أفريقيا" },
  { code: "ml", nameAr: "مالي", nameEn: "Mali", flag: "🇲🇱", currency: "XOF", currencySymbol: "CFA", continent: "africa", continentAr: "أفريقيا" },
  { code: "bf", nameAr: "بوركينا فاسو", nameEn: "Burkina Faso", flag: "🇧🇫", currency: "XOF", currencySymbol: "CFA", continent: "africa", continentAr: "أفريقيا" },
  { code: "ne", nameAr: "النيجر", nameEn: "Niger", flag: "🇳🇪", currency: "XOF", currencySymbol: "CFA", continent: "africa", continentAr: "أفريقيا" },
  { code: "td", nameAr: "تشاد", nameEn: "Chad", flag: "🇹🇩", currency: "XAF", currencySymbol: "FCFA", continent: "africa", continentAr: "أفريقيا" },
  { code: "gn", nameAr: "غينيا", nameEn: "Guinea", flag: "🇬🇳", currency: "GNF", currencySymbol: "FG", continent: "africa", continentAr: "أفريقيا" },
  { code: "bj", nameAr: "بنين", nameEn: "Benin", flag: "🇧🇯", currency: "XOF", currencySymbol: "CFA", continent: "africa", continentAr: "أفريقيا" },
  { code: "tg", nameAr: "توغو", nameEn: "Togo", flag: "🇹🇬", currency: "XOF", currencySymbol: "CFA", continent: "africa", continentAr: "أفريقيا" },
  { code: "sl", nameAr: "سيراليون", nameEn: "Sierra Leone", flag: "🇸🇱", currency: "SLE", currencySymbol: "Le", continent: "africa", continentAr: "أفريقيا" },
  { code: "lr", nameAr: "ليبيريا", nameEn: "Liberia", flag: "🇱🇷", currency: "LRD", currencySymbol: "L$", continent: "africa", continentAr: "أفريقيا" },
  { code: "gm", nameAr: "غامبيا", nameEn: "Gambia", flag: "🇬🇲", currency: "GMD", currencySymbol: "D", continent: "africa", continentAr: "أفريقيا" },
  { code: "gw", nameAr: "غينيا بيساو", nameEn: "Guinea-Bissau", flag: "🇬🇼", currency: "XOF", currencySymbol: "CFA", continent: "africa", continentAr: "أفريقيا" },
  { code: "cv", nameAr: "الرأس الأخضر", nameEn: "Cape Verde", flag: "🇨🇻", currency: "CVE", currencySymbol: "Esc", continent: "africa", continentAr: "أفريقيا" },
  { code: "st", nameAr: "ساو تومي وبرينسيبي", nameEn: "São Tomé and Príncipe", flag: "🇸🇹", currency: "STN", currencySymbol: "Db", continent: "africa", continentAr: "أفريقيا" },
  { code: "gq", nameAr: "غينيا الاستوائية", nameEn: "Equatorial Guinea", flag: "🇬🇶", currency: "XAF", currencySymbol: "FCFA", continent: "africa", continentAr: "أفريقيا" },
  { code: "ga", nameAr: "الغابون", nameEn: "Gabon", flag: "🇬🇦", currency: "XAF", currencySymbol: "FCFA", continent: "africa", continentAr: "أفريقيا" },
  { code: "cg", nameAr: "الكونغو", nameEn: "Republic of Congo", flag: "🇨🇬", currency: "XAF", currencySymbol: "FCFA", continent: "africa", continentAr: "أفريقيا" },
  { code: "cf", nameAr: "جمهورية أفريقيا الوسطى", nameEn: "Central African Republic", flag: "🇨🇫", currency: "XAF", currencySymbol: "FCFA", continent: "africa", continentAr: "أفريقيا" },
  { code: "bi", nameAr: "بوروندي", nameEn: "Burundi", flag: "🇧🇮", currency: "BIF", currencySymbol: "FBu", continent: "africa", continentAr: "أفريقيا" },
  { code: "er", nameAr: "إريتريا", nameEn: "Eritrea", flag: "🇪🇷", currency: "ERN", currencySymbol: "Nfk", continent: "africa", continentAr: "أفريقيا" },
  { code: "ss", nameAr: "جنوب السودان", nameEn: "South Sudan", flag: "🇸🇸", currency: "SSP", currencySymbol: "£", continent: "africa", continentAr: "أفريقيا" },
  { code: "mw", nameAr: "مالاوي", nameEn: "Malawi", flag: "🇲🇼", currency: "MWK", currencySymbol: "MK", continent: "africa", continentAr: "أفريقيا" },
  { code: "ls", nameAr: "ليسوتو", nameEn: "Lesotho", flag: "🇱🇸", currency: "LSL", currencySymbol: "L", continent: "africa", continentAr: "أفريقيا" },
  { code: "sz", nameAr: "إسواتيني", nameEn: "Eswatini", flag: "🇸🇿", currency: "SZL", currencySymbol: "E", continent: "africa", continentAr: "أفريقيا" },
  { code: "sc", nameAr: "سيشل", nameEn: "Seychelles", flag: "🇸🇨", currency: "SCR", currencySymbol: "₨", continent: "africa", continentAr: "أفريقيا" },

  // ===== أمريكا الشمالية =====
  { code: "us", nameAr: "الولايات المتحدة", nameEn: "United States", flag: "🇺🇸", currency: "USD", currencySymbol: "$", continent: "north-america", continentAr: "أمريكا الشمالية" },
  { code: "ca", nameAr: "كندا", nameEn: "Canada", flag: "🇨🇦", currency: "CAD", currencySymbol: "C$", continent: "north-america", continentAr: "أمريكا الشمالية" },
  { code: "mx", nameAr: "المكسيك", nameEn: "Mexico", flag: "🇲🇽", currency: "MXN", currencySymbol: "MX$", continent: "north-america", continentAr: "أمريكا الشمالية" },
  { code: "gt", nameAr: "غواتيمالا", nameEn: "Guatemala", flag: "🇬🇹", currency: "GTQ", currencySymbol: "Q", continent: "north-america", continentAr: "أمريكا الشمالية" },
  { code: "cu", nameAr: "كوبا", nameEn: "Cuba", flag: "🇨🇺", currency: "CUP", currencySymbol: "₱", continent: "north-america", continentAr: "أمريكا الشمالية" },
  { code: "ht", nameAr: "هايتي", nameEn: "Haiti", flag: "🇭🇹", currency: "HTG", currencySymbol: "G", continent: "north-america", continentAr: "أمريكا الشمالية" },
  { code: "do", nameAr: "جمهورية الدومينيكان", nameEn: "Dominican Republic", flag: "🇩🇴", currency: "DOP", currencySymbol: "RD$", continent: "north-america", continentAr: "أمريكا الشمالية" },
  { code: "hn", nameAr: "هندوراس", nameEn: "Honduras", flag: "🇭🇳", currency: "HNL", currencySymbol: "L", continent: "north-america", continentAr: "أمريكا الشمالية" },
  { code: "sv", nameAr: "السلفادور", nameEn: "El Salvador", flag: "🇸🇻", currency: "USD", currencySymbol: "$", continent: "north-america", continentAr: "أمريكا الشمالية" },
  { code: "ni", nameAr: "نيكاراغوا", nameEn: "Nicaragua", flag: "🇳🇮", currency: "NIO", currencySymbol: "C$", continent: "north-america", continentAr: "أمريكا الشمالية" },
  { code: "cr", nameAr: "كوستاريكا", nameEn: "Costa Rica", flag: "🇨🇷", currency: "CRC", currencySymbol: "₡", continent: "north-america", continentAr: "أمريكا الشمالية" },
  { code: "pa", nameAr: "بنما", nameEn: "Panama", flag: "🇵🇦", currency: "PAB", currencySymbol: "B/.", continent: "north-america", continentAr: "أمريكا الشمالية" },
  { code: "jm", nameAr: "جامايكا", nameEn: "Jamaica", flag: "🇯🇲", currency: "JMD", currencySymbol: "J$", continent: "north-america", continentAr: "أمريكا الشمالية" },
  { code: "tt", nameAr: "ترينيداد وتوباغو", nameEn: "Trinidad and Tobago", flag: "🇹🇹", currency: "TTD", currencySymbol: "TT$", continent: "north-america", continentAr: "أمريكا الشمالية" },
  { code: "bz", nameAr: "بليز", nameEn: "Belize", flag: "🇧🇿", currency: "BZD", currencySymbol: "BZ$", continent: "north-america", continentAr: "أمريكا الشمالية" },
  { code: "bs", nameAr: "الباهاماس", nameEn: "Bahamas", flag: "🇧🇸", currency: "BSD", currencySymbol: "B$", continent: "north-america", continentAr: "أمريكا الشمالية" },
  { code: "bb", nameAr: "بربادوس", nameEn: "Barbados", flag: "🇧🇧", currency: "BBD", currencySymbol: "Bds$", continent: "north-america", continentAr: "أمريكا الشمالية" },

  // ===== أمريكا الجنوبية =====
  { code: "br", nameAr: "البرازيل", nameEn: "Brazil", flag: "🇧🇷", currency: "BRL", currencySymbol: "R$", continent: "south-america", continentAr: "أمريكا الجنوبية" },
  { code: "ar", nameAr: "الأرجنتين", nameEn: "Argentina", flag: "🇦🇷", currency: "ARS", currencySymbol: "AR$", continent: "south-america", continentAr: "أمريكا الجنوبية" },
  { code: "co", nameAr: "كولومبيا", nameEn: "Colombia", flag: "🇨🇴", currency: "COP", currencySymbol: "COL$", continent: "south-america", continentAr: "أمريكا الجنوبية" },
  { code: "cl", nameAr: "تشيلي", nameEn: "Chile", flag: "🇨🇱", currency: "CLP", currencySymbol: "CL$", continent: "south-america", continentAr: "أمريكا الجنوبية" },
  { code: "pe", nameAr: "بيرو", nameEn: "Peru", flag: "🇵🇪", currency: "PEN", currencySymbol: "S/.", continent: "south-america", continentAr: "أمريكا الجنوبية" },
  { code: "ve", nameAr: "فنزويلا", nameEn: "Venezuela", flag: "🇻🇪", currency: "VES", currencySymbol: "Bs.S", continent: "south-america", continentAr: "أمريكا الجنوبية" },
  { code: "ec", nameAr: "الإكوادور", nameEn: "Ecuador", flag: "🇪🇨", currency: "USD", currencySymbol: "$", continent: "south-america", continentAr: "أمريكا الجنوبية" },
  { code: "bo", nameAr: "بوليفيا", nameEn: "Bolivia", flag: "🇧🇴", currency: "BOB", currencySymbol: "Bs.", continent: "south-america", continentAr: "أمريكا الجنوبية" },
  { code: "py", nameAr: "باراغواي", nameEn: "Paraguay", flag: "🇵🇾", currency: "PYG", currencySymbol: "₲", continent: "south-america", continentAr: "أمريكا الجنوبية" },
  { code: "uy", nameAr: "الأوروغواي", nameEn: "Uruguay", flag: "🇺🇾", currency: "UYU", currencySymbol: "$U", continent: "south-america", continentAr: "أمريكا الجنوبية" },
  { code: "gy", nameAr: "غيانا", nameEn: "Guyana", flag: "🇬🇾", currency: "GYD", currencySymbol: "G$", continent: "south-america", continentAr: "أمريكا الجنوبية" },
  { code: "sr", nameAr: "سورينام", nameEn: "Suriname", flag: "🇸🇷", currency: "SRD", currencySymbol: "Sr$", continent: "south-america", continentAr: "أمريكا الجنوبية" },

  // ===== أوقيانوسيا =====
  { code: "au", nameAr: "أستراليا", nameEn: "Australia", flag: "🇦🇺", currency: "AUD", currencySymbol: "A$", continent: "oceania", continentAr: "أوقيانوسيا" },
  { code: "nz", nameAr: "نيوزيلندا", nameEn: "New Zealand", flag: "🇳🇿", currency: "NZD", currencySymbol: "NZ$", continent: "oceania", continentAr: "أوقيانوسيا" },
  { code: "fj", nameAr: "فيجي", nameEn: "Fiji", flag: "🇫🇯", currency: "FJD", currencySymbol: "FJ$", continent: "oceania", continentAr: "أوقيانوسيا" },
  { code: "pg", nameAr: "بابوا غينيا الجديدة", nameEn: "Papua New Guinea", flag: "🇵🇬", currency: "PGK", currencySymbol: "K", continent: "oceania", continentAr: "أوقيانوسيا" },
];

// Continent labels in Arabic
export const continentLabels: Record<string, string> = {
  "asia": "آسيا",
  "europe": "أوروبا",
  "africa": "أفريقيا",
  "north-america": "أمريكا الشمالية",
  "south-america": "أمريكا الجنوبية",
  "oceania": "أوقيانوسيا",
};

export const getCountryByCode = (code: string): Country | undefined => {
  return countries.find(c => c.code === code);
};

export const getCountryName = (code: string): string => {
  return getCountryByCode(code)?.nameAr || code;
};

export const getCountriesByContinent = () => {
  const grouped: Record<string, Country[]> = {};
  for (const c of countries) {
    if (!grouped[c.continent]) grouped[c.continent] = [];
    grouped[c.continent].push(c);
  }
  return grouped;
};

// Featured countries for footer (major markets)
export const featuredCountryCodes = [
  'sa', 'ae', 'eg', 'us', 'gb', 'de', 'fr', 'tr', 'in', 'cn', 'jp', 'br', 'au', 'ca', 'kr', 'ma', 'ng', 'za'
];

// Keep backward compatibility
export const arabCountries = countries;
