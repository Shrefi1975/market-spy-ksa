import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ResultsSection from "@/components/ResultsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface KeywordResult {
  keyword: string;
  seoTitle: string;
  metaDescription: string;
  searchVolume: number;
  competition: "low" | "medium" | "high";
  cpc: number;
  trend: "up" | "down" | "stable";
}

interface AnalysisData {
  marketOverview?: string;
  opportunities?: string[];
  recommendations?: string[];
  seasonalTips?: string[];
}

const Index = () => {
  const [results, setResults] = useState<KeywordResult[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisData | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async (data: { url: string; description: string; location: string }) => {
    setIsLoading(true);
    setResults([]);
    setAnalysis(undefined);
    
    try {
      const locationMap: Record<string, string> = {
        'saudi': 'السعودية',
        'riyadh': 'الرياض',
        'jeddah': 'جدة',
        'dammam': 'الدمام',
        'makkah': 'مكة المكرمة',
        'madinah': 'المدينة المنورة',
      };

      const { data: responseData, error } = await supabase.functions.invoke('analyze-keywords', {
        body: {
          url: data.url,
          description: data.description,
          location: locationMap[data.location] || data.location,
        },
      });

      if (error) {
        throw new Error(error.message || 'حدث خطأ أثناء التحليل');
      }

      if (!responseData?.success) {
        throw new Error(responseData?.error || 'فشل التحليل');
      }

      const keywords = responseData.data?.keywords || [];
      const analysisData = responseData.data?.analysis;

      // Map the keywords to match our interface
      const mappedResults: KeywordResult[] = keywords.map((k: any) => ({
        keyword: k.keyword,
        seoTitle: k.seoTitle,
        metaDescription: k.metaDescription,
        searchVolume: k.searchVolume || 0,
        competition: k.competition || 'medium',
        cpc: k.cpc || 0,
        trend: k.trend || 'stable',
      }));

      setResults(mappedResults);
      setAnalysis(analysisData);
      
      toast({
        title: "تم التحليل بنجاح! ✨",
        description: `تم العثور على ${mappedResults.length} كلمات مفتاحية مربحة لمتجرك`,
      });

      // Scroll to results
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);

    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "خطأ في التحليل",
        description: error instanceof Error ? error.message : 'حدث خطأ غير متوقع',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />
      <HeroSection onAnalyze={handleAnalyze} isLoading={isLoading} />
      <FeaturesSection />
      <HowItWorksSection />
      <ResultsSection results={results} analysis={analysis} />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
