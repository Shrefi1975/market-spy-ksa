import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, MapPin, Loader2, Shield, Zap, Target, TrendingUp, BarChart3, LineChart, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onAnalyze: (data: { url: string; description: string; location: string }) => void;
  isLoading: boolean;
}

const trustBadges = [
  { icon: Shield, text: "بياناتك محمية 100%" },
  { icon: Zap, text: "نتائج فورية" },
  { icon: Target, text: "تحليل دقيق" },
];

const HeroSection: React.FC<HeroSectionProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && description && location) {
      onAnalyze({ url, description, location });
    }
  };

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
    <section className="relative min-h-screen overflow-hidden pt-20">
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
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-right order-2 lg:order-1"
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              الكلمات المفتاحية{" "}
              <span className="gradient-text">الذهبية</span>
              <br />
              لنجاح موقعك في السعودية
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              أداة تحلّل السوق السعودي وتقترح كلمات مفتاحية ذكية لتحقيق الربحية المتميزة 
              مبنية على بيانات حقيقية، مواسم محلية، وتحليل المنافسين.
            </p>

            {/* Trust Badges */}
            <motion.div 
              className="flex flex-wrap gap-3 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {trustBadges.map((badge, index) => (
                <div key={index} className="trust-badge">
                  <badge.icon className="w-4 h-4" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            >
              <div className="text-center mb-5">
                <h3 className="text-lg font-bold text-white mb-1">
                  🚀 ابدأ تحليل السوق السعودي الآن
                </h3>
                <p className="text-white/60 text-sm">
                  أدخل بيانات متجرك واحصل على تحليل شامل
                </p>
              </div>

              <div className="grid gap-3">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="url"
                    placeholder="رابط موقعك (مثال: https://example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pr-10 h-11 text-base bg-white/90 border-0 rounded-xl"
                    required
                  />
                </div>

                <div className="relative">
                  <FileText className="absolute right-3 top-3 text-muted-foreground w-5 h-5" />
                  <Textarea
                    placeholder="صف منتجك أو خدمتك باختصار..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="pr-10 min-h-[70px] text-base bg-white/90 border-0 rounded-xl resize-none"
                    required
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
                  <Select value={location} onValueChange={setLocation} required>
                    <SelectTrigger className="pr-10 h-11 text-base bg-white/90 border-0 rounded-xl">
                      <SelectValue placeholder="اختر المنطقة المستهدفة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saudi">السعودية (كامل المملكة)</SelectItem>
                      <SelectItem value="riyadh">الرياض</SelectItem>
                      <SelectItem value="jeddah">جدة</SelectItem>
                      <SelectItem value="dammam">الدمام</SelectItem>
                      <SelectItem value="makkah">مكة المكرمة</SelectItem>
                      <SelectItem value="madinah">المدينة المنورة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="h-12 text-lg font-bold gradient-bg rounded-xl shadow-glow hover:opacity-90 transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                      جاري التحليل...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 ml-2" />
                      تحليل السوق السعودي
                    </>
                  )}
                </Button>
              </div>

              <p className="text-center text-white/50 text-xs mt-3">
                ✨ تجربة مجانية واحدة • لا يتطلب بطاقة ائتمان
              </p>
            </motion.form>
          </motion.div>

          {/* Right Side - SEO Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] lg:h-[600px] order-1 lg:order-2"
          >
            {/* Central SEO Element */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Orbiting circles */}
              <div className="absolute w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] rounded-full border border-primary/20 animate-[spin_30s_linear_infinite]" />
              <div className="absolute w-[220px] h-[220px] lg:w-[350px] lg:h-[350px] rounded-full border border-primary/30 animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute w-[140px] h-[140px] lg:w-[250px] lg:h-[250px] rounded-full border border-primary/40 animate-[spin_15s_linear_infinite]" />

              {/* Central SEO Text */}
              <motion.div
                className="relative z-10 text-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-24 h-24 lg:w-36 lg:h-36 rounded-full gradient-bg flex items-center justify-center shadow-glow">
                  <span className="text-3xl lg:text-5xl font-bold text-white">SEO</span>
                </div>
              </motion.div>

              {/* Floating Icons around */}
              {floatingIcons.map(({ Icon, delay }, index) => {
                const angle = (index * 60) * (Math.PI / 180);
                const radius = 150;
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
                    <div className="p-3 lg:p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                      <Icon 
                        size={24} 
                        className="text-primary lg:w-8 lg:h-8"
                        strokeWidth={1.5}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Floating particles */}
            {[...Array(15)].map((_, i) => (
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
