import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { industries } from "@/data/industries";
import { ArrowLeft, Layers } from "lucide-react";

const IndustriesShowcase: React.FC = () => {
  const featured = industries.slice(0, 8);

  return (
    <section className="py-20 bg-background" id="industries-showcase">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            <Layers className="w-4 h-4" />
            مكتبة القطاعات
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            كلمات مفتاحية جاهزة لـ <span className="text-primary">{industries.length} قطاع عربي</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            اكتشف الكلمات الأكثر بحثاً في كل قطاع مع أفكار محتوى وأسئلة شائعة مخصصة لكل سوق
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
                className="group block bg-card border border-border rounded-2xl p-5 text-center hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <span className="text-4xl block mb-3">{industry.icon}</span>
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
          className="text-center mt-8"
        >
          <Link
            to="/industries"
            className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            <span>عرض جميع القطاعات ({industries.length})</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesShowcase;
