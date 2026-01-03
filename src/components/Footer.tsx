import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
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
              أداة تحليل السوق السعودي الأولى من نوعها. نساعدك على اكتشاف الكلمات المفتاحية الذهبية 
              لتحقيق نجاح متجرك الإلكتروني في المملكة العربية السعودية.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  الخدمات
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  المدونة
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  الأسعار
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="text-primary-foreground/70">
                البريد: info@keyrank.sa
              </li>
              <li className="text-primary-foreground/70">
                الهاتف: 0566175512
              </li>
              <li className="text-primary-foreground/70">
                جدة، المملكة العربية السعودية
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2024 KeyRank. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
