import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { industries } from "@/data/industries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowLeft } from "lucide-react";

const Industries: React.FC = () => {
  useEffect(() => {
    document.title = "مكتبة الكلمات المفتاحية حسب القطاع | KeyRank";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-b from-foreground to-foreground/95 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10 py-[42px]">
          <div className="absolute top-20 right-20 w-80 h-80 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-20 w-60 h-60 bg-primary rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 py-0">مكتبة الكلمات المفتاحية العربية حسب القطاع</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
            اكتشف الكلمات المفتاحية الأكثر بحثاً في {industries.length} قطاع عربي رئيسي.
            كلمات خدمية، تجارية، وسؤالية مخصصة لكل سوق عربي.
          </p>
        </div>
      </section>

      <main className="flex-1 bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {industries.map((industry) =>
            <Link key={industry.slug} to={`/arabic-keywords-for-${industry.slug}`}>
                <Card className="h-full hover:border-primary hover:shadow-lg transition-all group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <span className="text-4xl block mb-4">{industry.icon}</span>
                    <h2 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{industry.nameAr}</h2>
                    <p className="text-sm text-muted-foreground">{industry.nameEn}</p>
                    <div className="mt-4 flex items-center justify-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>استكشف الكلمات</span>
                      <ArrowLeft className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>);

};

export default Industries;