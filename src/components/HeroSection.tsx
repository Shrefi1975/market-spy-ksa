import React from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, BarChart3, Target, LineChart, Sparkles, Shield, Zap, Award, ArrowLeft, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Shield, value: "100%", label: "دقة التحليل", color: "text-emerald-400" },
  { icon: BarChart3, value: "+5K", label: "تحليل مُنجز", color: "text-primary" },
  { icon: Award, value: "4.9", label: "تقييم العملاء", color: "text-amber-400" },
  { icon: Zap, value: "3 ثوانٍ", label: "سرعة التحليل", color: "text-blue-400" },
];

const trustedBy = ["Amazon", "Shopify", "سلة", "زد", "WooCommerce"];

const HeroSection: React.FC = () => {
  const floatingIcons = [
    { Icon: Search, delay: 0 },
    { Icon: TrendingUp, delay: 0.5 },
    { Icon: BarChart3, delay: 1 },
    { Icon: Target, delay: 1.5 },
    { Icon: LineChart, delay: 2 },
    { Icon: Sparkles, delay: 2.5 },
  ];

  const scrollToForm = () => {
    document.getElementById("analysis-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 gradient-dark" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.4), transparent 70%)" }}
        animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, hsl(210 60% 50% / 0.3), transparent 70%)" }}
        animate={{ scale: [1.2, 1, 1.2], x: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-right order-2 lg:order-1"
          >
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              المنصة #1 لتحليل SEO بالعربية
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.2]">
              اكتشف الكلمات
              <br />
              المفتاحية الذهبية
              <br />
              <span className="bg-gradient-to-r from-primary via-rose-400 to-amber-400 bg-clip-text text-transparent">
                للأسواق العربية
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-xl">
              8 أدوات SEO متخصصة تحلل 23 سوقاً عربياً بدقة تامة — كلمات مفتاحية، هياكل مقالات، 
              وسوم ميتا، واستراتيجيات نمو مخصصة لنشاطك
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Button
                onClick={scrollToForm}
                size="lg"
                className="gradient-bg text-primary-foreground h-14 px-8 text-lg font-bold rounded-2xl shadow-glow hover:opacity-90 transition-all"
              >
                <Search className="w-5 h-5 ml-2" />
                ابدأ التحليل مجاناً
              </Button>
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-lg rounded-2xl border-white/20 text-white bg-white/5 hover:bg-white/10 hover:text-white backdrop-blur-sm"
                >
                  لوحة الأدوات
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-4 gap-3"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color} group-hover:scale-110 transition-transform`} />
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-[11px] text-white/50 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[400px] lg:h-[500px] order-1 lg:order-2"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Orbits */}
              <div className="absolute w-[320px] h-[320px] lg:w-[420px] lg:h-[420px] rounded-full border border-primary/15 animate-[spin_30s_linear_infinite]" />
              <div className="absolute w-[230px] h-[230px] lg:w-[320px] lg:h-[320px] rounded-full border border-primary/20 animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute w-[140px] h-[140px] lg:w-[220px] lg:h-[220px] rounded-full border border-primary/25 animate-[spin_15s_linear_infinite]" />

              {/* Center orb */}
              <motion.div
                className="relative z-10"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full gradient-bg flex items-center justify-center shadow-glow">
                  <span className="text-3xl lg:text-4xl font-bold text-white">SEO</span>
                </div>
              </motion.div>

              {/* Floating tool icons */}
              {floatingIcons.map(({ Icon, delay }, index) => {
                const angle = index * 60 * (Math.PI / 180);
                const radius = typeof window !== 'undefined' && window.innerWidth > 1024 ? 160 : 120;
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
                    animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.15, 1], y: [0, -8, 0] }}
                    transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="p-3 lg:p-4 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 shadow-lg">
                      <Icon size={22} className="text-primary lg:w-6 lg:h-6" strokeWidth={1.5} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`p-${i}`}
                className="absolute w-1.5 h-1.5 rounded-full bg-primary/30"
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                animate={{ y: [0, -25, 0], opacity: [0, 0.7, 0], scale: [0, 1.5, 0] }}
                transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 2, repeat: Infinity }}
              />
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-white/30" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
