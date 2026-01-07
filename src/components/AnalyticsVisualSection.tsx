import React from "react";
import { motion } from "framer-motion";
import analyticsVisual from "@/assets/analytics-visual.jpg";
import { TrendingUp, BarChart3, Target, Sparkles } from "lucide-react";

const AnalyticsVisualSection: React.FC = () => {
  const features = [
    { icon: TrendingUp, text: "تحليل الاتجاهات", delay: 0.2 },
    { icon: BarChart3, text: "إحصائيات دقيقة", delay: 0.4 },
    { icon: Target, text: "استهداف ذكي", delay: 0.6 },
    { icon: Sparkles, text: "رؤى متقدمة", delay: 0.8 },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
      
      {/* Animated background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <img
          src={analyticsVisual}
          alt="تحليلات متقدمة"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-rose-400 to-primary bg-clip-text text-transparent">
              تقنية تحليل متقدمة
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-12">
              نستخدم أحدث تقنيات الذكاء الاصطناعي لتحليل السوق وتقديم رؤى استراتيجية دقيقة
            </p>
          </motion.div>

          {/* Animated feature badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: feature.delay,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: "0 20px 40px -15px rgba(225, 29, 72, 0.4)" 
                }}
                className="flex items-center gap-3 bg-card/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-primary/20 shadow-lg cursor-default"
              >
                <feature.icon className="w-6 h-6 text-primary" />
                <span className="text-foreground font-semibold">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Animated particles/dots */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Glowing orbs effect */}
          <motion.div
            className="absolute -bottom-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -top-20 right-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default AnalyticsVisualSection;
