import React from "react";
import { motion } from "framer-motion";
import { Link2, Brain, FileCheck, ArrowLeft, Sparkles, Zap, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Link2,
    accentIcon: Zap,
    step: 1,
    title: "أدخل معلوماتك",
    description: "أضف رابط موقعك، وصف منتجك أو خدمتك، واختر المنطقة المستهدفة من 22 دولة عربية",
    hint: "كلما كان الوصف دقيقاً، كانت النتائج أفضل",
  },
  {
    icon: Brain,
    accentIcon: Sparkles,
    step: 2,
    title: "التحليل المتقدم",
    description: "نظامنا يعالج البيانات ويقارن مع المنافسين ويكتشف الفرص المخفية في السوق المستهدف",
    hint: "يتم تحليل أكثر من 50 عاملاً للحصول على أدق النتائج",
  },
  {
    icon: FileCheck,
    accentIcon: TrendingUp,
    step: 3,
    title: "احصل على النتائج",
    description: "تقرير فوري بقائمة الكلمات المفتاحية المربحة، تحليل المنافسين، ونصائح SEO قابلة للتنفيذ",
    hint: "يمكنك تصدير التقرير كـ PDF أو CSV",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            ثلاث خطوات فقط
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            كيف <span className="gradient-text">يعمل</span>؟
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            ابدأ تحليل سوقك في دقائق واحصل على رؤى قابلة للتنفيذ فوراً
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-20 right-[20%] left-[20%] h-0.5 bg-gradient-to-l from-primary/40 via-primary to-primary/40 rounded-full" />

          {/* Connection Arrows */}
          <div className="hidden md:flex absolute top-[72px] right-[20%] left-[20%] justify-around pointer-events-none">
            <ArrowLeft className="w-5 h-5 text-primary" />
            <ArrowLeft className="w-5 h-5 text-primary" />
          </div>

          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center relative group"
            >
              {/* Step number circle */}
              <div className="relative z-10 mx-auto mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
              </div>

              {/* Card */}
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 group-hover:border-primary/30 group-hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/15 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-5 flex-1">{item.description}</p>
                
                {/* Hint chip */}
                <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-muted/60 border border-border rounded-xl text-xs text-muted-foreground mx-auto">
                  <item.accentIcon className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{item.hint}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
