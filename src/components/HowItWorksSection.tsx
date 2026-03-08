import React from "react";
import { motion } from "framer-motion";
import { Link2, Brain, FileCheck, ArrowLeft } from "lucide-react";

const steps = [
  {
    icon: Link2,
    step: 1,
    title: "أدخل معلوماتك",
    description: "أضف رابط موقعك، وصف منتجك أو خدمتك، واختر الدولة العربية المستهدفة",
    highlight: "30 ثانية",
  },
  {
    icon: Brain,
    step: 2,
    title: "التحليل المتقدم",
    description: "محركنا يحلل السوق، يقارن المنافسين، ويكتشف الفرص الذهبية في ثوانٍ",
    highlight: "تحليل 360°",
  },
  {
    icon: FileCheck,
    step: 3,
    title: "نتائج جاهزة للتطبيق",
    description: "تقرير فوري بالكلمات المفتاحية المربحة، هياكل المقالات، واستراتيجية SEO كاملة",
    highlight: "تقرير شامل",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            كيف <span className="gradient-text">يعمل</span>؟
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ثلاث خطوات بسيطة للحصول على تحليل شامل لسوقك العربي
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-20 right-[16.67%] left-[16.67%] h-0.5 bg-gradient-to-l from-primary/40 via-primary/20 to-primary/40" />

          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center relative"
            >
              {/* Step number circle */}
              <div className="relative z-10 mx-auto mb-8">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-glow rotate-3 hover:rotate-0 transition-transform">
                  {item.step}
                </div>
              </div>

              <div className="bg-card rounded-3xl p-8 border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-500 group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/15 group-hover:scale-105 transition-all">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {item.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
