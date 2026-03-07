import React, { useState } from "react";
import { Link } from "react-router-dom";
import { countries, getCountriesByContinent, continentLabels, featuredCountryCodes } from "@/data/countries";
import { ChevronDown, ChevronUp } from "lucide-react";

const Footer = () => {
  const [showAllCountries, setShowAllCountries] = useState(false);
  const featuredCountries = countries.filter(c => featuredCountryCodes.includes(c.code));
  const countriesByContinent = getCountriesByContinent();
  const continentOrder = ["asia", "africa", "europe", "north-america", "south-america", "oceania"];

  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">K</span>
              </div>
              <span className="text-2xl font-bold">KeyRank</span>
            </div>
            <p className="text-primary-foreground/70 leading-relaxed max-w-md">
              أداة تحليل الأسواق العالمية الأولى من نوعها. نساعدك على اكتشاف الكلمات المفتاحية الذهبية
              لتحقيق نجاح متجرك الإلكتروني في أي سوق حول العالم.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">الرئيسية</Link></li>
              <li><Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">من نحن</Link></li>
              <li><Link to="/services" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">الخدمات</Link></li>
              <li><Link to="/blog" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">المدونة</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="text-primary-foreground/70">البريد: info@keyrank.sa</li>
              <li className="text-primary-foreground/70">الهاتف: 0566175512</li>
              <li className="text-primary-foreground/70">جدة، المملكة العربية السعودية</li>
            </ul>
          </div>
        </div>

        {/* Featured Country Links for SEO */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <h4 className="text-lg font-bold mb-4 text-center">الأسواق المدعومة حول العالم</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {featuredCountries.map((c) => (
              <Link
                key={c.code}
                to={`/country/${c.code}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
              >
                <span>{c.flag}</span>
                <span>{c.nameAr}</span>
              </Link>
            ))}
          </div>

          {/* Expandable all countries by continent */}
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAllCountries(!showAllCountries)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
            >
              {showAllCountries ? (
                <><ChevronUp className="w-4 h-4" /> إخفاء جميع الدول</>
              ) : (
                <><ChevronDown className="w-4 h-4" /> عرض جميع الدول ({countries.length} دولة)</>
              )}
            </button>
          </div>

          {showAllCountries && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {continentOrder.map(continent => {
                const group = countriesByContinent[continent];
                if (!group) return null;
                return (
                  <div key={continent}>
                    <h5 className="font-bold text-primary-foreground/90 mb-3 text-sm border-b border-primary-foreground/20 pb-2">
                      {continentLabels[continent]} ({group.length})
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {group.map(c => (
                        <Link
                          key={c.code}
                          to={`/country/${c.code}`}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-primary-foreground/5 hover:bg-primary-foreground/15 text-primary-foreground/60 hover:text-primary-foreground text-xs transition-colors"
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
          )}
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2024 KeyRank. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
