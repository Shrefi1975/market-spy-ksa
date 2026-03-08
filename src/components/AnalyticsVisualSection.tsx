import React from "react";
import { motion } from "framer-motion";
import analyticsVisual from "@/assets/analytics-visual.jpg";
import { TrendingUp, BarChart3, Target, Sparkles, Cpu, Globe, Zap, Shield } from "lucide-react";

const AnalyticsVisualSection: React.FC = () => {
  const features = [
    { icon: TrendingUp, text: "تحليل الاتجاهات", delay: 0.2 },
    { icon: BarChart3, text: "إحصائيات دقيقة", delay: 0.4 },
    { icon: Target, text: "استهداف ذكي", delay: 0.6 },
    { icon: Sparkles, text: "رؤى متقدمة", delay: 0.8 },
  ];

  const techStats = [
    { icon: Cpu, value: "8", label: "أدوات متخصصة" },
    { icon: Globe, value: "23", label: "سوق عربي" },
    { icon: Zap, value: "3s", label: "سرعة التحليل" },
    { icon: Shield, value: "100%", label: "دقة النتائج" },
  ];

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Rich layered background */}
      <div className="absolute inset-0">
        <img
          src={analyticsVisual}
          alt="تحليلات متقدمة"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/85" />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 20% 50%, hsl(var(--primary) / 0.25), transparent),
              radial-gradient(ellipse 50% 40% at 80% 30%, hsl(210 60% 40% / 0.2), transparent),
              radial-gradient(ellipse 40% 30% at 50% 80%, hsl(var(--primary) / 0.15), transparent)
            `,
          }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Animated orbs */}
      <motion.div
        className="absolute top-10 left-[15%] w-72 h-72 bg-primary/15 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-[15%] w-60 h-60 bg-blue-500/10 rounded-full blur-[80px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5], y: [0, -15, 0] }}
            transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 border border-primary/30 rounded-full text-primary text-sm font-medium mb-6 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Cpu className="w-4 h-4" />
              محرك تحليل متقدم
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
              تقنية تحليل
              <br />
              <span className="bg-gradient-to-r from-primary via-rose-400 to-amber-400 bg-clip-text text-transparent">
                متقدمة للأسواق العربية
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white/60 mb-14 max-w-2xl mx-auto leading-relaxed">
              نستخدم أحدث تقنيات معالجة اللغة العربية لتحليل الأسواق وتقديم رؤى استراتيجية دقيقة تشمل اللهجات والمرادفات المحلية
            </p>
          </motion.div>

          {/* Tech stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {techStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-all"
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/50 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="flex items-center gap-3 bg-white/8 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/15 shadow-lg cursor-default"
              >
                <feature.icon className="w-6 h-6 text-primary" />
                <span className="text-white font-semibold">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsVisualSection;
