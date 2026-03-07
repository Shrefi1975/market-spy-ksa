import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AnalysisFormSection from "@/components/AnalysisFormSection";
import PreviewAnalysisSection from "@/components/PreviewAnalysisSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import UpgradeDialog from "@/components/UpgradeDialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { getCountryByCode, countries, getCountrySeoTitle, getCountrySeoDescription, getCountryHeroTitle, getCountryHeroSubtitle, getCountryMarketInfo } from "@/data/countries";
import CountryHeroSection from "@/components/CountryHeroSection";
import CountryFeaturesSection from "@/components/CountryFeaturesSection";
import CountryOtherMarketsSection from "@/components/CountryOtherMarketsSection";

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

const CountryLanding = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  const navigate = useNavigate();
  const country = getCountryByCode(countryCode || "sa");
  
  const [results, setResults] = useState<KeywordResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const { toast } = useToast();
  const { user, session, refreshSubscription } = useAuth();

  useEffect(() => {
    if (countryCode && !country) {
      navigate("/404", { replace: true });
    }
  }, [countryCode, country, navigate]);

  useEffect(() => {
    if (country) {
      document.title = getCountrySeoTitle(country);
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', getCountrySeoDescription(country));

      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `https://keyrank.app/country/${country.code}`);

      let jsonLd = document.querySelector('script[type="application/ld+json"]');
      if (!jsonLd) {
        jsonLd = document.createElement('script');
        jsonLd.setAttribute('type', 'application/ld+json');
        document.head.appendChild(jsonLd);
      }
      jsonLd.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": `KeyRank - أداة بحث الكلمات المفتاحية لـ${country.nameAr}`,
        "description": getCountrySeoDescription(country),
        "url": `https://keyrank.app/country/${country.code}`,
        "applicationCategory": "SEO Tool",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": country.currency },
        "areaServed": { "@type": "Country", "name": country.nameEn },
      });
    }
  }, [country]);

  if (!country) return null;

  const handleAnalyze = async (data: { url: string; description: string; location: string; country: string }) => {
    if (!user || !session) {
      toast({ title: "يجب تسجيل الدخول", description: "يرجى تسجيل الدخول أولاً لاستخدام أداة التحليل", variant: "destructive" });
      navigate('/auth');
      return;
    }

    setIsLoading(true);
    setResults([]);
    
    try {
      const { data: responseData, error } = await supabase.functions.invoke('analyze-keywords', {
        body: { url: data.url, description: data.description, location: data.location, country: data.country, countryNameAr: country.nameAr, countryCurrency: country.currency, countryCurrencySymbol: country.currencySymbol },
      });

      if (error) throw new Error(error.message || 'حدث خطأ أثناء التحليل');
      if (!responseData?.success) {
        if (responseData?.upgrade_required) { setShowUpgradeDialog(true); return; }
        throw new Error(responseData?.error || 'فشل التحليل');
      }

      const keywords = responseData.data?.keywords || [];
      const mappedResults: KeywordResult[] = keywords.map((k: any) => ({
        keyword: k.keyword, seoTitle: k.seoTitle, metaDescription: k.metaDescription,
        searchVolume: k.searchVolume || 0, competition: k.competition || 'medium',
        cpc: k.cpc || 0, trend: k.trend || 'stable', searchIntent: k.searchIntent || 'informational',
      }));

      setResults(mappedResults);
      await refreshSubscription();
      toast({ title: "تم التحليل بنجاح! ✨", description: `تم العثور على ${mappedResults.length} كلمات مفتاحية لسوق ${country.nameAr}` });
      setTimeout(() => { document.getElementById("preview-results")?.scrollIntoView({ behavior: "smooth" }); }, 100);
    } catch (error) {
      console.error('Analysis error:', error);
      toast({ title: "خطأ في التحليل", description: error instanceof Error ? error.message : 'حدث خطأ غير متوقع', variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const mappedPreviewResults = results.map(r => ({
    keyword: r.keyword, seoTitle: r.seoTitle, metaDescription: r.metaDescription,
    searchVolume: r.searchVolume, competition: r.competition, trend: r.trend,
    searchIntent: r.searchIntent === "commercial" ? "تجاري" : r.searchIntent === "transactional" ? "شرائي" : "معلوماتي",
    seoNotes: r.competition === "low" ? "فرصة ذهبية!" : r.competition === "high" ? "منافسة عالية" : "فرصة جيدة",
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />
      <UpgradeDialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog} />
      <CountryHeroSection country={country} />
      <AnalysisFormSection onAnalyze={handleAnalyze} isLoading={isLoading} defaultCountry={country.code} />
      <div id="preview-results">
        <PreviewAnalysisSection results={mappedPreviewResults} isAnalyzed={results.length > 0} />
      </div>
      <CountryFeaturesSection country={country} />
      <CountryOtherMarketsSection currentCountryCode={country.code} />
      <FeaturesSection />
      <HowItWorksSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default CountryLanding;
