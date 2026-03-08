import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AnalysisFormSection from "@/components/AnalysisFormSection";
import PreviewAnalysisSection from "@/components/PreviewAnalysisSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ResultsSection from "@/components/ResultsSection";
import AnalyticsVisualSection from "@/components/AnalyticsVisualSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import UpgradeDialog from "@/components/UpgradeDialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { getCountryByCode } from "@/data/arabCountries";
interface KeywordResult {
  keyword: string;
  seoTitle: string;
  metaDescription: string;
  searchVolume: number;
  competition: "low" | "medium" | "high";
  cpc: number;
  trend: "up" | "down" | "stable";
  searchIntent?: "commercial" | "informational" | "transactional" | "navigational";
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
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("sa");
  const { toast } = useToast();
  const { user, session, subscription, refreshSubscription } = useAuth();
  const navigate = useNavigate();

  const handleAnalyze = async (data: { url: string; description: string; location: string; country: string }) => {
    // Store selected country
    setSelectedCountry(data.country);
    
    // Check if user is logged in
    if (!user || !session) {
      toast({
        title: "يجب تسجيل الدخول",
        description: "يرجى تسجيل الدخول أولاً لاستخدام أداة التحليل",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    setIsLoading(true);
    setResults([]);
    setAnalysis(undefined);
    
    try {
      const { data: responseData, error } = await supabase.functions.invoke('analyze-keywords', {
        body: {
          url: data.url,
          description: data.description,
          location: data.location,
          country: data.country,
          countryNameAr: getCountryByCode(data.country)?.nameAr,
          countryCurrency: getCountryByCode(data.country)?.currency,
          countryCurrencySymbol: getCountryByCode(data.country)?.currencySymbol,
        },
      });

      if (error) {
        throw new Error(error.message || 'حدث خطأ أثناء التحليل');
      }

      if (!responseData?.success) {
        // Check if upgrade is required
        if (responseData?.upgrade_required) {
          setShowUpgradeDialog(true);
          return;
        }
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
        searchIntent: k.searchIntent || 'informational',
      }));

      setResults(mappedResults);
      setAnalysis(analysisData);
      
      // Refresh subscription to update usage
      await refreshSubscription();
      
      const usageInfo = responseData.usage;
      
      // Check if this was the free trial (searches_used reached limit on free plan)
      const isFreePlanExhausted = usageInfo?.plan === 'free' && usageInfo?.searches_used >= usageInfo?.searches_limit;
      
      toast({
        title: "تم التحليل بنجاح! ✨",
        description: isFreePlanExhausted 
          ? `تم العثور على ${mappedResults.length} كلمات مفتاحية. هذا كان تحليلك المجاني الوحيد!`
          : `تم العثور على ${mappedResults.length} كلمات مفتاحية. (${usageInfo?.searches_used || 1}/${usageInfo?.searches_limit || 1} عمليات بحث)`,
      });

      // Scroll to results
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      
      // Show upgrade dialog after free trial analysis (with delay to let user see results first)
      if (isFreePlanExhausted) {
        setTimeout(() => {
          setShowUpgradeDialog(true);
        }, 3000);
      }

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

  // Map results to PreviewAnalysisSection format
  const mappedPreviewResults = results.map(r => ({
    keyword: r.keyword,
    seoTitle: r.seoTitle,
    metaDescription: r.metaDescription,
    searchVolume: r.searchVolume,
    competition: r.competition,
    trend: r.trend,
    searchIntent: r.searchIntent === "commercial" ? "تجاري" : r.searchIntent === "transactional" ? "شرائي" : "معلوماتي",
    seoNotes: r.competition === "low" ? "فرصة ذهبية!" : r.competition === "high" ? "منافسة عالية" : "فرصة جيدة",
  }));

  const countryData = getCountryByCode(selectedCountry);
  const countryName = countryData?.nameAr || "العربي";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />
      <UpgradeDialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog} />
      <HeroSection />
      <AnalysisFormSection onAnalyze={handleAnalyze} isLoading={isLoading} />
      <PreviewAnalysisSection results={mappedPreviewResults} isAnalyzed={results.length > 0} />
      <ResultsSection results={results} analysis={analysis} isAnalysisComplete={results.length > 0 && !isLoading} countryName={countryName} />
      <FeaturesSection />
      <HowItWorksSection />
      <AnalyticsVisualSection />
      <Footer />
    </div>
  );
};

export default Index;
