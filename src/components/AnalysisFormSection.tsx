import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, MapPin, Loader2, Sparkles } from "lucide-react";
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

interface AnalysisFormSectionProps {
  onAnalyze: (data: { url: string; description: string; location: string }) => void;
  isLoading: boolean;
}

const AnalysisFormSection: React.FC<AnalysisFormSectionProps> = ({ onAnalyze, isLoading }) => {
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
              🚀 ابدأ تحليل <span className="gradient-text">السوق السعودي</span> الآن
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

              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-foreground">المنطقة المستهدفة</label>
                <div className="relative">
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
                  <Select value={location} onValueChange={setLocation} required>
                    <SelectTrigger className="pr-12 h-12 text-base bg-background/80 border-border/50 rounded-xl">
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
                    تحليل السوق السعودي
                  </>
                )}
              </Button>
            </div>

            <p className="text-center text-muted-foreground text-sm mt-4">
              ✨ تجربة مجانية واحدة • لا يتطلب بطاقة ائتمان
            </p>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalysisFormSection;
