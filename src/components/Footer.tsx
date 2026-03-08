import React from "react";
import { Link } from "react-router-dom";
import { arabCountries, getArabCountriesByRegion, regionLabels, regionOrder } from "@/data/arabCountries";
import { industries } from "@/data/industries";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Main footer */}
      <div className="bg-foreground text-primary-foreground pt-20 pb-12">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 gradient-bg rounded-2xl flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">K</span>
                </div>
                <span className="text-2xl font-bold">KeyRank</span>
              </div>
              <p className="text-primary-foreground/60 leading-relaxed max-w-md mb-8">
                المنصة العربية الأولى لتحليل SEO المتقدم. نساعدك على اكتشاف الكلمات المفتاحية الذهبية
                لتحقيق نجاح موقعك في جميع الأسواق العربية الـ 23.
              </p>
              {/* Contact info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-primary-foreground/60 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>info@keyrank.sa</span>
                </div>
                <div className="flex items-center gap-3 text-primary-foreground/60 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <span dir="ltr">+966 566 175 512</span>
                </div>
                <div className="flex items-center gap-3 text-primary-foreground/60 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>جدة، المملكة العربية السعودية</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-5 gradient-bg rounded-full inline-block" />
                روابط سريعة
              </h4>
              <ul className="space-y-3">
                {[
                  { to: "/", label: "الرئيسية" },
                  { to: "/about", label: "من نحن" },
                  { to: "/services", label: "الخدمات" },
                  { to: "/blog", label: "المدونة" },
                  { to: "/contact", label: "تواصل معنا" },
                  { to: "/pricing", label: "الأسعار" },
                  { to: "/dashboard", label: "لوحة التحكم" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-primary-foreground/60 hover:text-primary transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-5 gradient-bg rounded-full inline-block" />
                الأدوات
              </h4>
              <ul className="space-y-3">
                {[
                  { to: "/dashboard/keyword-generator", label: "مولد الكلمات" },
                  { to: "/dashboard/keyword-difficulty", label: "صعوبة الكلمة" },
                  { to: "/dashboard/search-intent", label: "نية البحث" },
                  { to: "/dashboard/article-outline", label: "هيكل المقال" },
                  { to: "/dashboard/meta-tags", label: "وسوم الميتا" },
                  { to: "/dashboard/ecommerce-keywords", label: "كلمات التجارة" },
                  { to: "/dashboard/seo-strategy", label: "استراتيجية SEO" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-primary-foreground/60 hover:text-primary transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Arab Country Links */}
          <div className="border-t border-primary-foreground/10 pt-10 mb-10">
            <h4 className="text-base font-bold mb-6 text-center">الأسواق العربية المدعومة ({arabCountries.length} دولة)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionOrder.map(region => {
                const grouped = getArabCountriesByRegion();
                const group = grouped[region];
                if (!group?.length) return null;
                return (
                  <div key={region}>
                    <h5 className="font-bold text-primary-foreground/80 mb-3 text-sm border-b border-primary-foreground/10 pb-2">
                      {regionLabels[region]} ({group.length})
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {group.map(c => (
                        <Link
                          key={c.code}
                          to={`/country/${c.code}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-foreground/5 hover:bg-primary/20 text-primary-foreground/50 hover:text-primary-foreground text-xs transition-all"
                        >
                          <span>{c.flag}</span>
                          <span>{c.nameAr}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Industry Links */}
          <div className="border-t border-primary-foreground/10 pt-10 mb-10">
            <h4 className="text-base font-bold mb-6 text-center">كلمات مفتاحية حسب القطاع ({industries.length} قطاع)</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {industries.map(ind => (
                <Link
                  key={ind.slug}
                  to={`/arabic-keywords-for-${ind.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-foreground/5 hover:bg-primary/20 text-primary-foreground/50 hover:text-primary-foreground text-xs transition-all"
                >
                  <span>{ind.icon}</span>
                  <span>{ind.nameAr}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/40 text-sm">
              © {new Date().getFullYear()} KeyRank. جميع الحقوق محفوظة.
            </p>
            <p className="text-primary-foreground/30 text-xs flex items-center gap-1">
              صُنع بـ <Heart className="w-3 h-3 text-primary fill-primary" /> في السعودية
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
