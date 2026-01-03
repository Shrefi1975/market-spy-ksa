import React from "react";
import { motion } from "framer-motion";
import { Link2, Brain, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Link2,
    step: 1,
    title: "أدخل معلوماتك",
    description: "أضف رابط موقعك، وصف منتجك أو خدمتك، واختر المنطقة المستهدفة",
  },
  {
    icon: Brain,
    step: 2,
    title: "التحليل الذكي",
    description: "نظامنا يعالج البيانات ويقارن مع المنافسين في السوق السعودي",
  },
  {
    icon: FileCheck,
    step: 3,
    title: "احصل على النتائج",
    description: "تقرير فوري بقائمة الكلمات المفتاحية المربحة ونصائح SEO",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            كيف <span className="gradient-text">يعمل</span>؟
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ثلاث خطوات بسيطة للحصول على تحليل شامل لسوقك
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-24 right-[16.67%] left-[16.67%] h-1 gradient-bg rounded-full" />

          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center relative"
            >
              <div className="step-circle mx-auto mb-8 relative z-10">
                {item.step}
              </div>
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
