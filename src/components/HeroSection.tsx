import React from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, BarChart3, Target, LineChart, Sparkles, Shield, Zap, Award } from "lucide-react";
import { arabCountries } from "@/data/arabCountries";

const stats = [
  { icon: Shield, value: "100%", label: "دقة التحليل", color: "text-emerald-500" },
  { icon: BarChart3, value: "+5K", label: "تحليل مُنجز", color: "text-primary" },
  { icon: Award, value: "4.9", label: "تقييم العملاء", color: "text-amber-500" },
  { icon: Zap, value: "3 ثوانٍ", label: "سرعة التحليل", color: "text-blue-500" },
];

const HeroSection: React.FC = () => {
  // Floating icons for animation
  const floatingIcons = [
    { Icon: Search, delay: 0 },
    { Icon: TrendingUp, delay: 0.5 },
    { Icon: BarChart3, delay: 1 },
    { Icon: Target, delay: 1.5 },
    { Icon: LineChart, delay: 2 },
    { Icon: Sparkles, delay: 2.5 },
  ];

  return (
    <section className="relative min-h-[80vh] overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 gradient-dark" />
      
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 30% 50%, hsl(340 82% 52% / 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 70% 30%, hsl(222 47% 30% / 0.2), transparent),
            radial-gradient(ellipse 50% 30% at 20% 80%, hsl(340 82% 52% / 0.1), transparent)
          `,
        }}
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-right order-2 lg:order-1"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              الكلمات المفتاحية{" "}
              <span className="gradient-text">الذهبية</span>
              <br />
              لنجاح موقعك في الوطن العربي
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
              أداة تحلّل الأسواق العربية وتقترح كلمات مفتاحية ذكية لتحقيق الربحية المتميزة 
              مبنية على بيانات حقيقية من 18 دولة عربية، مواسم محلية، وتحليل المنافسين.
            </p>

            {/* Stats Grid inside Hero - Smaller */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-4 gap-2"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20 text-center hover:bg-white/15 transition-all"
                >
                  <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Countries Marquee */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 overflow-hidden mask-gradient"
            >
              <p className="text-white/60 text-xs mb-2 text-center">الأسواق المدعومة:</p>
              <div className="marquee-container">
                <div className="marquee-content">
                  {arabCountries.map((country) => (
                    <span
                      key={country.code}
                      className="inline-flex items-center gap-1.5 mx-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm"
                    >
                      <span>{country.flag}</span>
                      <span>{country.nameAr}</span>
                    </span>
                  ))}
                </div>
                <div className="marquee-content" aria-hidden="true">
                  {arabCountries.map((country) => (
                    <span
                      key={`dup-${country.code}`}
                      className="inline-flex items-center gap-1.5 mx-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm"
                    >
                      <span>{country.flag}</span>
                      <span>{country.nameAr}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - SEO Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[350px] lg:h-[450px] order-1 lg:order-2"
          >
            {/* Central SEO Element */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Orbiting circles */}
              <div className="absolute w-[280px] h-[280px] lg:w-[380px] lg:h-[380px] rounded-full border border-primary/20 animate-[spin_30s_linear_infinite]" />
              <div className="absolute w-[200px] h-[200px] lg:w-[290px] lg:h-[290px] rounded-full border border-primary/30 animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute w-[120px] h-[120px] lg:w-[200px] lg:h-[200px] rounded-full border border-primary/40 animate-[spin_15s_linear_infinite]" />

              {/* Central SEO Text */}
              <motion.div
                className="relative z-10 text-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full gradient-bg flex items-center justify-center shadow-glow">
                  <span className="text-2xl lg:text-4xl font-bold text-white">SEO</span>
                </div>
              </motion.div>

              {/* Floating Icons around */}
              {floatingIcons.map(({ Icon, delay }, index) => {
                const angle = (index * 60) * (Math.PI / 180);
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={index}
                    className="absolute"
                    style={{ 
                      left: `calc(50% + ${x}px)`, 
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.2, 1],
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="p-2 lg:p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                      <Icon 
                        size={20} 
                        className="text-primary lg:w-6 lg:h-6"
                        strokeWidth={1.5}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 rounded-full bg-primary/40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
