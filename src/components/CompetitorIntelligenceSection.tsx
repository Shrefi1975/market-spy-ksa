import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Target, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CompetitorForm from "./competitor/CompetitorForm";
import CompetitorResults, { CompetitorAnalysisData } from "./competitor/CompetitorResults";

const CompetitorIntelligenceSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<CompetitorAnalysisData | null>(null);
  const [meta, setMeta] = useState<any>(null);
  const { user, session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAnalyze = async (data: {
    competitorDomain: string;
    userDomain: string;
    country: string;
    analysisType: "quick" | "deep";
  }) => {
    if (!user || !session) {
      toast({
        title: "يجب تسجيل الدخول",
        description: "يرجى تسجيل الدخول أولاً لاستخدام أداة تحليل المنافسين",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setIsLoading(true);
    setResults(null);

    try {
      const { data: responseData, error } = await supabase.functions.invoke("competitor-analysis", {
        body: {
          competitorDomain: data.competitorDomain,
          userDomain: data.userDomain || undefined,
          country: data.country,
          analysisType: data.analysisType,
        },
      });

      if (error) throw new Error(error.message || "حدث خطأ أثناء التحليل");

      if (!responseData?.success) {
        throw new Error(responseData?.error || "فشل التحليل");
      }

      setResults(responseData.data);
      setMeta(responseData.meta);

      toast({
        title: "تم التحليل بنجاح! ✨",
        description: `تم تحليل ${responseData.meta.competitorDomain} واكتشاف ${responseData.data.keywords?.length || 0} كلمة مفتاحية`,
      });

      setTimeout(() => {
        document.getElementById("competitor-results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Competitor analysis error:", error);
      toast({
        title: "خطأ في التحليل",
        description: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-muted/30" id="competitor-analysis">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            ذكاء تنافسي متقدم
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            اكتشف أسرار <span className="text-primary">منافسيك</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            حلل مواقع المنافسين واكتشف الكلمات المفتاحية المخفية وفرص الترتيب السهلة في السوق العربي
          </p>
        </motion.div>

        {/* Features badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { icon: Target, text: "تحليل فجوة الكلمات" },
            { icon: Sparkles, text: "فرص ترتيب سهلة" },
            { icon: Shield, text: "اقتراحات محتوى ذكية" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border rounded-full text-sm text-muted-foreground">
              <f.icon className="w-3.5 h-3.5 text-primary" />
              {f.text}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto">
          <CompetitorForm onAnalyze={handleAnalyze} isLoading={isLoading} />
        </div>

        {/* Results */}
        <div id="competitor-results" className="max-w-5xl mx-auto">
          {results && meta && <CompetitorResults data={results} meta={meta} />}
        </div>
      </div>
    </section>
  );
};

export default CompetitorIntelligenceSection;
