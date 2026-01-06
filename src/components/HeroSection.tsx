import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, MapPin, Loader2, Shield, Award, Zap } from "lucide-react";
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
import AnimatedHeroBackground from "./AnimatedHeroBackground";

interface HeroSectionProps {
  onAnalyze: (data: { url: string; description: string; location: string }) => void;
  isLoading: boolean;
}

const stats = [
  { value: "98%", label: "دقة التنبؤ", icon: Award },
  { value: "50K+", label: "كلمة مفتاحية", icon: Search },
  { value: "200+", label: "متجر سعودي", icon: Shield },
  { value: "24/7", label: "دعم فوري", icon: Zap },
];

const trustBadges = [
  "🔒 بياناتك محمية 100%",
  "⚡ نتائج فورية",
  "🎯 تحليل دقيق",
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <AnimatedHeroBackground />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 gradient-hero" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Trust badges */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {trustBadges.map((badge, index) => (
                <span key={index} className="trust-badge">
                  {badge}
                </span>
              ))}
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              اكتشف الكلمات المفتاحية{" "}
              <span className="gradient-text">الذهبية</span>
              <br />
              لنجاح متجرك في السعودية
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              أداة تحلّل السوق السعودي وتقترح كلمات مفتاحية ذكية لتحقيق الربحية المتميزة 
              مبنية على بيانات حقيقية، مواسم محلية، وتحليل المنافسين.
            </p>
          </motion.div>

          {/* Compact Form */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass-card rounded-3xl p-6 md:p-8 max-w-2xl mx-auto border border-primary/20 shadow-glow"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-primary-foreground mb-2">
                🚀 ابدأ تحليل السوق السعودي الآن
              </h3>
              <p className="text-primary-foreground/70 text-sm">
                أدخل بيانات متجرك واحصل على تحليل شامل للكلمات المفتاحية
              </p>
            </div>

            <div className="grid gap-4">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="url"
                  placeholder="رابط موقعك (مثال: https://example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pr-12 h-12 text-base bg-background/90 border-border/50 rounded-xl focus:border-primary/50 focus:ring-primary/20"
                  required
                />
              </div>

              <div className="relative">
                <FileText className="absolute right-4 top-3 text-muted-foreground w-5 h-5" />
                <Textarea
                  placeholder="صف منتجك أو خدمتك باختصار..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="pr-12 min-h-[80px] text-base bg-background/90 border-border/50 rounded-xl resize-none focus:border-primary/50 focus:ring-primary/20"
                  required
                />
              </div>

              <div className="relative">
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
                <Select value={location} onValueChange={setLocation} required>
                  <SelectTrigger className="pr-12 h-12 text-base bg-background/90 border-border/50 rounded-xl">
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
                className="h-14 text-lg font-bold gradient-bg rounded-xl shadow-glow hover:shadow-soft transition-all duration-300 hover:scale-[1.02]"
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

            <p className="text-center text-primary-foreground/60 text-xs mt-4">
              ✨ تجربة مجانية واحدة • لا يتطلب بطاقة ائتمان
            </p>
          </motion.form>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="stat-card group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary/80 group-hover:text-primary transition-colors" />
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/70 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;