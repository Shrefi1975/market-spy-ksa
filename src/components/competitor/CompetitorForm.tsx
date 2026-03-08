import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Search, Zap, Layers, Shield, TrendingUp, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ArabCountrySelector from "@/components/ArabCountrySelector";
import { ToolTipHint, UsageHints } from "@/components/ui/tool-tip-hint";

interface CompetitorFormProps {
  onAnalyze: (data: {
    competitorDomain: string;
    userDomain: string;
    country: string;
    analysisType: "quick" | "deep";
  }) => void;
  isLoading: boolean;
}

const CompetitorForm: React.FC<CompetitorFormProps> = ({ onAnalyze, isLoading }) => {
  const [competitorDomain, setCompetitorDomain] = useState("");
  const [userDomain, setUserDomain] = useState("");
  const [country, setCountry] = useState("sa");
  const [analysisType, setAnalysisType] = useState<"quick" | "deep">("quick");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!competitorDomain.trim()) return;
    onAnalyze({ competitorDomain: competitorDomain.trim(), userDomain: userDomain.trim(), country, analysisType });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border-2 border-border/50 rounded-2xl p-6 md:p-8 shadow-lg space-y-6"
    >
      {/* Benefits row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-primary/5 border border-primary/10">
          <Shield className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-xs font-semibold text-foreground">كشف كلمات المنافس</p>
            <p className="text-[10px] text-muted-foreground">اكتشف الكلمات التي يتصدر بها منافسك</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-primary/5 border border-primary/10">
          <Target className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-xs font-semibold text-foreground">تحليل فجوة الكلمات</p>
            <p className="text-[10px] text-muted-foreground">فرص يتصدر لها المنافس وأنت لا</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-primary/5 border border-primary/10">
          <TrendingUp className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-xs font-semibold text-foreground">فرص سهلة التصدر</p>
            <p className="text-[10px] text-muted-foreground">كلمات منخفضة المنافسة مع زيارات عالية</p>
          </div>
        </div>
      </div>

      {/* Form fields */}
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2 flex items-center">
            <Globe className="inline w-4 h-4 ml-1" />
            دومين المنافس *
            <ToolTipHint text="أدخل رابط موقع المنافس الذي تريد تحليله. مثال: competitor.com — لا حاجة لكتابة https://" icon="tip" />
          </label>
          <Input
            value={competitorDomain}
            onChange={(e) => setCompetitorDomain(e.target.value)}
            placeholder="example.com"
            className="h-12 text-base text-left"
            dir="ltr"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2 flex items-center">
            <Globe className="inline w-4 h-4 ml-1" />
            دومين موقعك (اختياري)
            <ToolTipHint text="أدخل رابط موقعك لمقارنته مع المنافس واكتشاف الكلمات المفتاحية التي يتصدر لها هو ولا تتصدر لها أنت." icon="info" />
          </label>
          <Input
            value={userDomain}
            onChange={(e) => setUserDomain(e.target.value)}
            placeholder="yoursite.com"
            className="h-12 text-base text-left"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2 flex items-center">
            السوق المستهدف
            <ToolTipHint text="اختر الدولة العربية لتخصيص التحليل حسب سلوك البحث المحلي." icon="info" />
          </label>
          <ArabCountrySelector value={country} onValueChange={setCountry} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2 flex items-center">
            نوع التحليل
            <ToolTipHint text="التحليل السريع يعتمد على الذكاء الاصطناعي فقط. التحليل العميق يسحب بيانات فعلية من الموقع ثم يحللها." icon="tip" />
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setAnalysisType("quick")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                analysisType === "quick"
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-muted border-border hover:border-primary/50"
              }`}
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">سريع</span>
            </button>
            <button
              type="button"
              onClick={() => setAnalysisType("deep")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                analysisType === "deep"
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-muted border-border hover:border-primary/50"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="text-sm font-semibold">عميق (سحب + تحليل)</span>
            </button>
          </div>
        </div>
      </div>

      <UsageHints hints={[
        "ركّز على المنافسين المباشرين في نفس مجالك",
        "أضف دومين موقعك لاكتشاف فجوات الكلمات",
        "التحليل العميق يعطي نتائج أدق لكنه أبطأ",
      ]} />

      <Button
        type="submit"
        disabled={isLoading || !competitorDomain.trim()}
        className="w-full gradient-bg text-primary-foreground h-14 text-lg font-bold shadow-lg"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            جاري التحليل...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            تحليل المنافس واكتشاف الفرص
          </span>
        )}
      </Button>
    </motion.form>
  );
};

export default CompetitorForm;
