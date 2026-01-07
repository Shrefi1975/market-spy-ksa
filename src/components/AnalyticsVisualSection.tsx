import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Target, Sparkles, Globe, LineChart, Search, PieChart, FileText, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { arabCountries, getCountryByCode } from "@/data/arabCountries";

interface AnalyticsVisualSectionProps {
  onAnalyze?: (data: {
    url: string;
    description: string;
    location: string;
    country: string;
  }) => void;
  isLoading?: boolean;
}

const AnalyticsVisualSection: React.FC<AnalyticsVisualSectionProps> = ({
  onAnalyze,
  isLoading = false
}) => {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("sa");
  const [region, setRegion] = useState("");

  const selectedCountry = getCountryByCode(country);
  const hasRegions = selectedCountry?.regions && selectedCountry.regions.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && description && country && onAnalyze) {
      const location = hasRegions && region ? region : "all";
      onAnalyze({
        url,
        description,
        location,
        country
      });
    }
  };

  const features = [
    { icon: TrendingUp, text: "تحليل الاتجاهات", delay: 0.2 },
    { icon: BarChart3, text: "إحصائيات دقيقة", delay: 0.4 },
    { icon: Target, text: "استهداف ذكي", delay: 0.6 },
    { icon: Sparkles, text: "رؤى متقدمة", delay: 0.8 },
  ];

  // Floating icons for orbit animation
  const orbitIcons = [
    { Icon: Globe, angle: 0 },
    { Icon: LineChart, angle: 60 },
    { Icon: Search, angle: 120 },
    { Icon: PieChart, angle: 180 },
    { Icon: Target, angle: 240 },
    { Icon: BarChart3, angle: 300 },
  ];

  return (
    <section className="relative py-24 overflow-hidden min-h-[700px]">
      {/* Animated gradient background */}
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

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Right Side - Analysis Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1"
          >
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/30 to-cyan-500/30 text-white text-sm font-semibold mb-3 border border-white/20">
                  <Sparkles className="w-4 h-4" />
                  ابدأ الآن مجاناً
                </div>
                <h3 className="text-2xl font-bold text-white">
                  🚀 ابدأ بتحليل <span className="text-cyan-400">السوق السعودية</span>
                </h3>
              </div>

              <div className="grid gap-4">
                {/* Country Selector */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-white/90">الدولة المستهدفة</label>
                  <div className="relative">
                    <Globe className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5 z-10" />
                    <Select value={country} onValueChange={val => {
                      setCountry(val);
                      setRegion("");
                    }}>
                      <SelectTrigger className="pr-12 h-12 text-base bg-white/10 border-white/20 rounded-xl text-white">
                        <SelectValue placeholder="اختر الدولة المستهدفة" />
                      </SelectTrigger>
                      <SelectContent className="max-h-80">
                        {arabCountries.map(c => (
                          <SelectItem key={c.code} value={c.code}>
                            <span className="flex items-center gap-2">
                              <span>{c.flag}</span>
                              <span>{c.nameAr}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Region Selector */}
                {hasRegions && (
                  <div className="relative">
                    <label className="block text-sm font-medium mb-2 text-white/90">المنطقة المستهدفة</label>
                    <div className="relative">
                      <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5 z-10" />
                      <Select value={region} onValueChange={setRegion}>
                        <SelectTrigger className="pr-12 h-12 text-base bg-white/10 border-white/20 rounded-xl text-white">
                          <SelectValue placeholder="اختر المنطقة (اختياري)" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedCountry?.regions?.map(r => (
                            <SelectItem key={r.value} value={r.value}>
                              {r.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* URL Input */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-white/90">رابط الموقع</label>
                  <div className="relative">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                      className="pr-12 h-12 text-base bg-white/10 border-white/20 rounded-xl text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                </div>

                {/* Description Input */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-white/90">وصف النشاط</label>
                  <div className="relative">
                    <FileText className="absolute right-4 top-4 text-white/60 w-5 h-5" />
                    <Textarea
                      placeholder="صف منتجك أو خدمتك باختصار..."
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      className="pr-12 min-h-[80px] text-base bg-white/10 border-white/20 rounded-xl resize-none text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-14 text-lg font-bold bg-gradient-to-r from-primary via-rose-500 to-cyan-500 rounded-xl shadow-lg hover:opacity-90 transition-all mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                      جاري التحليل...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 ml-2" />
                      ابدأ بتحليل السوق السعودية
                    </>
                  )}
                </Button>
              </div>

              <p className="text-center text-sm mt-4 text-white/70">
                ✨ مجانا للابد - لجميع الدول العربية
              </p>
            </motion.form>
          </motion.div>

          {/* Left Side - Animated Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2"
          >
            {/* Text Content */}
            <div className="text-right mb-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                تحليل عميق للسوق{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-primary to-rose-400 bg-clip-text text-transparent">
                  العربي
                </span>
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-4 leading-relaxed">
                نقدم لك تحليلاً شاملاً ودقيقاً للكلمات المفتاحية مع رؤى استراتيجية مبنية على بيانات حقيقية من الأسواق العربية
              </p>
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                نستخدم أحدث التقنيات المتطورة لتحليل السوق وتقديم رؤى استراتيجية دقيقة تساعدك على التفوق في المنافسة
              </p>
            </div>

            {/* Orbiting Animation */}
            <div className="relative h-[300px] lg:h-[350px]">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Orbiting circles */}
                <motion.div 
                  className="absolute w-[220px] h-[220px] lg:w-[280px] lg:h-[280px] rounded-full border border-cyan-500/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-full border border-primary/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] rounded-full border border-cyan-400/40"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />

                {/* Central Element */}
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
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-cyan-500 via-primary to-rose-500 flex items-center justify-center shadow-2xl">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
                      <BarChart3 className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                    </div>
                  </div>
                </motion.div>

                {/* Orbiting Icons */}
                {orbitIcons.map(({ Icon, angle }, index) => {
                  const radius = 110;
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
                        y: [0, -12, 0],
                        x: [0, index % 2 === 0 ? 6 : -6, 0],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 3 + index * 0.5,
                        delay: index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-lg">
                        <Icon size={18} className="text-cyan-400" strokeWidth={1.5} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Floating particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${25 + Math.random() * 50}%`,
                    top: `${25 + Math.random() * 50}%`,
                    background: i % 2 === 0 ? 'hsl(var(--primary))' : 'rgb(6, 182, 212)',
                  }}
                  animate={{
                    y: [0, -25, 0],
                    x: [0, i % 2 === 0 ? 12 : -12, 0],
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
            </div>

            {/* Feature badges */}
            <div className="grid grid-cols-2 gap-3 mt-6">
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
                    <feature.icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-white/90 font-medium text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Glowing orbs */}
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
