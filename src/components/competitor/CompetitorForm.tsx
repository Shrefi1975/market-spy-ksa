import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Search, Zap, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ArabCountrySelector from "@/components/ArabCountrySelector";

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
      className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg"
    >
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            <Globe className="inline w-4 h-4 ml-1" />
            دومين المنافس *
          </label>
          <Input
            value={competitorDomain}
            onChange={(e) => setCompetitorDomain(e.target.value)}
            placeholder="example.com"
            className="text-left"
            dir="ltr"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            <Globe className="inline w-4 h-4 ml-1" />
            دومين موقعك (اختياري - لتحليل الفجوة)
          </label>
          <Input
            value={userDomain}
            onChange={(e) => setUserDomain(e.target.value)}
            placeholder="yoursite.com"
            className="text-left"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">السوق المستهدف</label>
          <ArabCountrySelector value={country} onValueChange={setCountry} />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">نوع التحليل</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAnalysisType("quick")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                analysisType === "quick"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted border-border hover:border-primary/50"
              }`}
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">سريع (AI)</span>
            </button>
            <button
              type="button"
              onClick={() => setAnalysisType("deep")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                analysisType === "deep"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted border-border hover:border-primary/50"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="text-sm font-medium">عميق (سحب + AI)</span>
            </button>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !competitorDomain.trim()}
        className="w-full gradient-bg text-primary-foreground h-12 text-lg font-bold shadow-glow"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            جاري التحليل...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            تحليل المنافس
          </span>
        )}
      </Button>
    </motion.form>
  );
};

export default CompetitorForm;
