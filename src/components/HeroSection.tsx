import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, MapPin, Loader2 } from "lucide-react";
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
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  onAnalyze: (data: { url: string; description: string; location: string }) => void;
  isLoading: boolean;
}

const stats = [
  { value: "98%", label: "دقة التنبؤ" },
  { value: "50K+", label: "كلمة مفتاحية" },
  { value: "200+", label: "متجر سعودي" },
  { value: "24/7", label: "دعم فوري" },
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
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 gradient-hero" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              اكتشف الكلمات المفتاحية{" "}
              <span className="gradient-text">الذهبية</span>
              <br />
              لنجاح متجرك في السعودية
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              أداة تحلّل السوق السعودي وتقترح كلمات مفتاحية ذكية لتحقيق الربحية المتميزة 
              مبنية على بيانات حقيقية، مواسم محلية، وتحليل المنافسين.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass-card rounded-3xl p-8 md:p-10 max-w-3xl mx-auto"
          >
            <div className="grid gap-6">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="url"
                  placeholder="أدخل رابط موقعك (URL)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pr-12 h-14 text-lg bg-background/80 border-border/50 rounded-xl"
                  required
                />
              </div>

              <div className="relative">
                <FileText className="absolute right-4 top-4 text-muted-foreground w-5 h-5" />
                <Textarea
                  placeholder="صف منتجك أو خدمتك..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="pr-12 min-h-[100px] text-lg bg-background/80 border-border/50 rounded-xl resize-none"
                  required
                />
              </div>

              <div className="relative">
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
                <Select value={location} onValueChange={setLocation} required>
                  <SelectTrigger className="pr-12 h-14 text-lg bg-background/80 border-border/50 rounded-xl">
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
                className="h-16 text-xl font-bold gradient-bg rounded-xl shadow-glow hover:shadow-soft transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 ml-2 animate-spin" />
                    جاري التحليل...
                  </>
                ) : (
                  "تحليل السوق السعودي الآن"
                )}
              </Button>
            </div>
          </motion.form>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/70 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
