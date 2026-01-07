import React from "react";
import { motion } from "framer-motion";
import analyticsVisual from "@/assets/analytics-visual.jpg";
import { TrendingUp, BarChart3, Target, Sparkles, Globe, LineChart, Search, PieChart } from "lucide-react";

const AnalyticsVisualSection: React.FC = () => {
  const features = [
    { icon: TrendingUp, text: "تحليل الاتجاهات", delay: 0.2 },
    { icon: BarChart3, text: "إحصائيات دقيقة", delay: 0.4 },
    { icon: Target, text: "استهداف ذكي", delay: 0.6 },
    { icon: Sparkles, text: "رؤى متقدمة", delay: 0.8 },
  ];

  // Floating icons for orbit animation - different from hero
  const orbitIcons = [
    { Icon: Globe, angle: 0 },
    { Icon: LineChart, angle: 60 },
    { Icon: Search, angle: 120 },
    { Icon: PieChart, angle: 180 },
    { Icon: Target, angle: 240 },
    { Icon: BarChart3, angle: 300 },
  ];

  return (
    <section className="relative py-24 overflow-hidden min-h-[600px]">
      {/* Animated gradient background like hero */}
      <div className="absolute inset-0 gradient-dark" />
      
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 70% 50%, hsl(340 82% 52% / 0.2), transparent),
            radial-gradient(ellipse 80% 50% at 30% 70%, hsl(222 47% 30% / 0.25), transparent),
            radial-gradient(ellipse 40% 30% at 80% 20%, hsl(200 80% 50% / 0.15), transparent)
          `
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Animated background image with different effect */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, 1, 0],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      >
        <img
          src={analyticsVisual}
          alt="تحليلات متقدمة"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Orbiting Animation (Different from Hero) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[350px] lg:h-[400px] order-2 lg:order-1"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Multiple orbiting circles - reversed direction */}
              <motion.div 
                className="absolute w-[260px] h-[260px] lg:w-[340px] lg:h-[340px] rounded-full border border-cyan-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute w-[180px] h-[180px] lg:w-[250px] lg:h-[250px] rounded-full border border-primary/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute w-[100px] h-[100px] lg:w-[160px] lg:h-[160px] rounded-full border border-cyan-400/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />

              {/* Central Analytics Element - Different from SEO */}
              <motion.div 
                className="relative z-10"
                animate={{
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    "0 0 30px rgba(6, 182, 212, 0.3)",
                    "0 0 60px rgba(6, 182, 212, 0.5)",
                    "0 0 30px rgba(6, 182, 212, 0.3)",
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-cyan-500 via-primary to-rose-500 flex items-center justify-center shadow-2xl">
                  <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
                    <BarChart3 className="w-10 h-10 lg:w-14 lg:h-14 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Orbiting Icons - Different animation pattern */}
              {orbitIcons.map(({ Icon, angle }, index) => {
                const radius = 130;
                const angleRad = (angle * Math.PI) / 180;
                const x = Math.cos(angleRad) * radius;
                const y = Math.sin(angleRad) * radius;
                
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
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    animate={{
                      y: [0, -15, 0],
                      x: [0, index % 2 === 0 ? 8 : -8, 0],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 3 + index * 0.5,
                      delay: index * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-lg">
                      <Icon size={22} className="text-cyan-400" strokeWidth={1.5} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Floating particles - different pattern */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  background: i % 2 === 0 ? 'hsl(var(--primary))' : 'rgb(6, 182, 212)',
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, i % 2 === 0 ? 15 : -15, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  delay: Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>

          {/* Right Side - Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-right order-1 lg:order-2"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
              تحليل عميق للسوق{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-primary to-rose-400 bg-clip-text text-transparent">
                العربي
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              نقدم لك تحليلاً شاملاً ودقيقاً للكلمات المفتاحية مع رؤى استراتيجية مبنية على بيانات حقيقية من الأسواق العربية
            </p>

            {/* Feature badges with different layout */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: feature.delay,
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: "rgba(6, 182, 212, 0.5)"
                  }}
                  className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 cursor-default"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-primary/20">
                    <feature.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-white/90 font-medium text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Glowing orbs - different colors */}
      <motion.div
        className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-0 right-1/3 w-60 h-60 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
};

export default AnalyticsVisualSection;
