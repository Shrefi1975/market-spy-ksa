import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { industries } from "@/data/industries";
import { ArrowLeft, Layers, Sparkles } from "lucide-react";

const IndustriesShowcase: React.FC = () => {
  const featured = industries.slice(0, 8);

  return (
    <section className="py-28 relative overflow-hidden" id="industries-showcase">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
            <Layers className="w-4 h-4" />
            مكتبة القطاعات
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            كلمات مفتاحية جاهزة لـ <span className="gradient-text">{industries.length} قطاع</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            اكتشف الكلمات الأكثر بحثاً في كل قطاع مع أفكار محتوى وأسئلة شائعة مخصصة لكل سوق عربي
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {featured.map((industry, i) => (
            <motion.div
              key={industry.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/industries/${industry.slug}`}
                className="group block bg-card border border-border/60 rounded-3xl p-6 text-center hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform">{industry.icon}</span>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-sm md:text-base">
                  {industry.nameAr}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{industry.nameEn}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/industries"
            className="inline-flex items-center gap-2 px-8 py-3.5 gradient-bg text-primary-foreground rounded-2xl font-bold text-base hover:opacity-90 transition-opacity shadow-glow"
          >
            <span>عرض جميع القطاعات ({industries.length})</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesShowcase;
