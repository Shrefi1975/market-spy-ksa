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
import { getCountryByCode, arabCountries } from "@/data/arabCountries";
import { motion } from "framer-motion";
import { TrendingUp, Users, Target, Zap, Globe, BarChart3, CheckCircle } from "lucide-react";

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

  // Redirect to 404 if country not found
  useEffect(() => {
    if (countryCode && !country) {
      navigate("/404", { replace: true });
    }
  }, [countryCode, country, navigate]);

  // Update document title and meta tags for SEO
  useEffect(() => {
    if (country) {
      document.title = country.seoTitle;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', country.seoDescription);

      // Update canonical link
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `https://keyrank.app/country/${country.code}`);

      // Add JSON-LD structured data
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
        "description": country.seoDescription,
        "url": `https://keyrank.app/country/${country.code}`,
        "applicationCategory": "SEO Tool",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": country.currency,
        },
        "areaServed": {
          "@type": "Country",
          "name": country.nameEn,
        },
      });
    }
  }, [country]);

  if (!country) {
    return null;
  }

  const handleAnalyze = async (data: { url: string; description: string; location: string; country: string }) => {
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
    
    try {
      const { data: responseData, error } = await supabase.functions.invoke('analyze-keywords', {
        body: {
          url: data.url,
          description: data.description,
          location: data.location,
          country: data.country,
        },
      });

      if (error) {
        throw new Error(error.message || 'حدث خطأ أثناء التحليل');
      }

      if (!responseData?.success) {
        if (responseData?.upgrade_required) {
          setShowUpgradeDialog(true);
          return;
        }
        throw new Error(responseData?.error || 'فشل التحليل');
      }

      const keywords = responseData.data?.keywords || [];
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
      await refreshSubscription();
      
      toast({
        title: "تم التحليل بنجاح! ✨",
        description: `تم العثور على ${mappedResults.length} كلمات مفتاحية لسوق ${country.nameAr}`,
      });

      setTimeout(() => {
        document.getElementById("preview-results")?.scrollIntoView({ behavior: "smooth" });
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

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: `كلمات مفتاحية محلية`,
      description: `اكتشف الكلمات المفتاحية الأكثر بحثاً في ${country.nameAr} باللهجة المحلية`,
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "تحليل المنافسة",
      description: `تعرف على مستوى المنافسة لكل كلمة مفتاحية في سوق ${country.nameAr}`,
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "اتجاهات السوق",
      description: `تتبع اتجاهات البحث الصاعدة والهابطة في ${country.nameAr}`,
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "نية البحث",
      description: "تصنيف الكلمات حسب نية البحث: تجاري، معلوماتي، أو شرائي",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />
      <UpgradeDialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog} />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Country Flag Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 mb-8">
              <span className="text-4xl">{country.flag}</span>
              <Globe className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg">{country.nameAr}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {country.heroTitle.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="gradient-text">{country.heroTitle.split(" ").slice(-2).join(" ")}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {country.heroSubtitle}
            </p>

            {/* Market Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-right text-muted-foreground">
                  {country.marketInfo}
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto">
              {[
                { value: "100%", label: "دقة التحليل" },
                { value: "+5K", label: "تحليل مُنجز" },
                { value: "4.9", label: "تقييم العملاء" },
                { value: "3 ثوانٍ", label: "سرعة التحليل" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/30"
                >
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Analysis Form */}
      <AnalysisFormSection 
        onAnalyze={handleAnalyze} 
        isLoading={isLoading} 
        defaultCountry={country.code}
      />

      {/* Preview Results */}
      <div id="preview-results">
        <PreviewAnalysisSection results={mappedPreviewResults} isAnalyzed={results.length > 0} />
      </div>

      {/* Features for this country */}
      <section className="py-16 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              لماذا KeyRank لسوق <span className="gradient-text">{country.nameAr}؟</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              أدوات متخصصة لتحليل السوق المحلي واكتشاف الفرص الذهبية
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Countries */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              استكشف أسواق عربية أخرى
            </h2>
            <p className="text-muted-foreground">
              KeyRank يدعم تحليل الكلمات المفتاحية في جميع الدول العربية
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {arabCountries
              .filter(c => c.code !== country.code)
              .map((c, i) => (
                <motion.a
                  key={c.code}
                  href={`/country/${c.code}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <span>{c.flag}</span>
                  <span className="text-sm font-medium">{c.nameAr}</span>
                </motion.a>
              ))}
          </div>
        </div>
      </section>

      <FeaturesSection />
      <HowItWorksSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default CountryLanding;
