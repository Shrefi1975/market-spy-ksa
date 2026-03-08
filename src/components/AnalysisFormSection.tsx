import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, Loader2, Sparkles, Globe, Shield, Zap, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getCountryByCode } from "@/data/arabCountries";
import ArabCountrySelector from "@/components/ArabCountrySelector";

interface AnalysisFormSectionProps {
  onAnalyze: (data: { url: string; description: string; location: string; country: string }) => void;
  isLoading: boolean;
  defaultCountry?: string;
}

const benefits = [
  { icon: Zap, text: "تحليل فوري في ثوانٍ" },
  { icon: Globe, text: "23 سوق عربي" },
  { icon: Shield, text: "نتائج دقيقة 100%" },
  { icon: TrendingUp, text: "كلمات ذهبية" },
];

const AnalysisFormSection: React.FC<AnalysisFormSectionProps> = ({ onAnalyze, isLoading, defaultCountry = "sa" }) => {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState(defaultCountry);
  const selectedCountry = getCountryByCode(country);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && description && country) {
      onAnalyze({ url, description, location: "all", country });
    }
  };

  const getButtonText = () => {
    if (!country) return "ابدأ الآن بالتحليل";
    const countryName = selectedCountry?.nameAr || "";
    return `ابدأ بتحليل السوق ${countryName}`;
  };

  return (
    <section id="analysis-form" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute top-10 left-20 w-80 h-80 bg-primary/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-10 right-20 w-72 h-72 bg-accent/8 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              مجاني — جرّب الآن
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🚀 حلّل موقعك في <span className="gradient-text">ثوانٍ</span>
            </h2>
            <p className="text-muted-foreground text-lg">أدخل بيانات موقعك واحصل على كلمات مفتاحية ذهبية مخصصة لسوقك</p>
          </div>

          {/* Benefits row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-card border border-border/50 text-sm"
              >
                <b.icon className="w-4 h-4 text-primary shrink-0" />
                <span className="text-muted-foreground text-xs font-medium">{b.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-3xl p-8 md:p-10 border border-border/50 shadow-xl"
          >
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-bold mb-2.5 text-foreground">🌍 الدولة العربية المستهدفة</label>
                <ArabCountrySelector value={country} onValueChange={setCountry} className="h-12 text-base bg-background border-border/50 rounded-xl" />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2.5 text-foreground">🔗 رابط الموقع</label>
                <div className="relative">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input type="url" placeholder="https://example.com" value={url} onChange={e => setUrl(e.target.value)} className="pr-12 h-12 text-base bg-background border-border/50 rounded-xl focus:border-primary" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2.5 text-foreground">📝 وصف النشاط</label>
                <div className="relative">
                  <FileText className="absolute right-4 top-4 text-muted-foreground w-5 h-5" />
                  <Textarea placeholder="صف منتجك أو خدمتك باختصار... مثال: متجر إلكتروني لبيع الملابس النسائية في السعودية" value={description} onChange={e => setDescription(e.target.value)} className="pr-12 min-h-[100px] text-base bg-background border-border/50 rounded-xl resize-none focus:border-primary" required />
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="h-14 text-lg font-bold gradient-bg rounded-xl shadow-glow hover:opacity-90 transition-all">
                {isLoading ? (
                  <><Loader2 className="w-5 h-5 ml-2 animate-spin" />جاري التحليل المتقدم...</>
                ) : (
                  <><Search className="w-5 h-5 ml-2" />{getButtonText()}</>
                )}
              </Button>
            </div>

            <p className="text-center text-xs mt-5 text-muted-foreground">
              ✨ تحليل مجاني واحد — متخصص في 23 سوقاً عربياً
            </p>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalysisFormSection;
