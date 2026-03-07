import React from "react";
import { motion } from "framer-motion";
import { Target, BarChart3, TrendingUp, Users } from "lucide-react";
import { Country } from "@/data/countries";

interface CountryFeaturesSectionProps {
  country: Country;
}

const CountryFeaturesSection: React.FC<CountryFeaturesSectionProps> = ({ country }) => {
  const features = [
    { icon: <Target className="w-6 h-6" />, title: "كلمات مفتاحية محلية", description: `اكتشف الكلمات المفتاحية الأكثر بحثاً في ${country.nameAr}` },
    { icon: <BarChart3 className="w-6 h-6" />, title: "تحليل المنافسة", description: `تعرف على مستوى المنافسة لكل كلمة مفتاحية في سوق ${country.nameAr}` },
    { icon: <TrendingUp className="w-6 h-6" />, title: "اتجاهات السوق", description: `تتبع اتجاهات البحث الصاعدة والهابطة في ${country.nameAr}` },
    { icon: <Users className="w-6 h-6" />, title: "نية البحث", description: "تصنيف الكلمات حسب نية البحث: تجاري، معلوماتي، أو شرائي" },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            لماذا KeyRank لسوق <span className="gradient-text">{country.nameAr}؟</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">أدوات متخصصة لتحليل السوق المحلي واكتشاف الفرص الذهبية</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white mb-4">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountryFeaturesSection;
