import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, MapPin, Loader2, Sparkles, Globe } from "lucide-react";
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
import { arabCountries, getCountryByCode } from "@/data/arabCountries";

interface AnalysisFormSectionProps {
  onAnalyze: (data: { url: string; description: string; location: string; country: string }) => void;
  isLoading: boolean;
  defaultCountry?: string;
}

const AnalysisFormSection: React.FC<AnalysisFormSectionProps> = ({ onAnalyze, isLoading, defaultCountry = "sa" }) => {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState(defaultCountry);
  const [region, setRegion] = useState("");

  const selectedCountry = getCountryByCode(country);
  const hasRegions = selectedCountry?.regions && selectedCountry.regions.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && description && country) {
      const location = hasRegions && region ? region : "all";
      onAnalyze({ url, description, location, country });
    }
  };

  const getButtonText = () => {
    if (!country || country === "") {
      return "ابدأ الآن بالتحليل";
    }
    const countryName = selectedCountry?.nameAr || "العربي";
    return `ابدأ بتحليل السوق ${countryName}`;
  };

  const getFormTitle = () => {
    const countryName = selectedCountry?.nameAr || "";
    if (!countryName) {
      return (
        <>
          🚀 <span className="gradient-text">ابدأ الآن بالتحليل</span>
        </>
      );
    }
    return (
      <>
        🚀 ابدأ بتحليل <span className="gradient-text">السوق {countryName}</span>
      </>
    );
  };

  return (
    <section id="analysis-form" className="py-16 relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
      {/* Background decorations */}
      <div className="absolute top-10 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary text-sm font-semibold mb-4 border border-primary/20">
              <Sparkles className="w-4 h-4" />
              ابدأ الآن مجاناً
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {getFormTitle()}
            </h2>
            <p className="text-muted-foreground">
              أدخل بيانات متجرك واحصل على تحليل شامل للكلمات المفتاحية الذهبية
            </p>
          </div>

          {/* Form Card */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-card/90 backdrop-blur-xl rounded-3xl p-8 border border-border/50 shadow-xl"
          >
            <div className="grid gap-5">
              {/* Country Selector */}
              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-foreground">الدولة المستهدفة</label>
                <div className="relative">
                  <Globe className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
                  <Select value={country} onValueChange={(val) => { setCountry(val); setRegion(""); }}>
                    <SelectTrigger className="pr-12 h-12 text-base bg-background/80 border-border/50 rounded-xl">
                      <SelectValue placeholder="اختر الدولة المستهدفة" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80">
                      {arabCountries.map((c) => (
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

              {/* Region Selector (if available) */}
              {hasRegions && (
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-foreground">المنطقة المستهدفة</label>
                  <div className="relative">
                    <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger className="pr-12 h-12 text-base bg-background/80 border-border/50 rounded-xl">
                        <SelectValue placeholder="اختر المنطقة (اختياري)" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCountry?.regions?.map((r) => (
                          <SelectItem key={r.value} value={r.value}>
                            {r.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-foreground">رابط الموقع</label>
                <div className="relative">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pr-12 h-12 text-base bg-background/80 border-border/50 rounded-xl focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-foreground">وصف النشاط</label>
                <div className="relative">
                  <FileText className="absolute right-4 top-4 text-muted-foreground w-5 h-5" />
                  <Textarea
                    placeholder="صف منتجك أو خدمتك باختصار..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="pr-12 min-h-[100px] text-base bg-background/80 border-border/50 rounded-xl resize-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="h-14 text-lg font-bold gradient-bg rounded-xl shadow-glow hover:opacity-90 transition-all mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                    جاري التحليل...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 ml-2" />
                    {getButtonText()}
                  </>
                )}
              </Button>
            </div>

            <p className="text-center text-primary font-bold text-base mt-4">
              🎁 مجاناً للأبد • لا يتطلب تسجيل
            </p>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalysisFormSection;
