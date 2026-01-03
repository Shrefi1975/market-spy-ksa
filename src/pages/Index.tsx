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

interface KeywordResult {
  keyword: string;
  seoTitle: string;
  metaDescription: string;
  searchVolume: number;
  competition: "low" | "medium" | "high";
  cpc: number;
  trend: "up" | "down" | "stable";
}

// Sample data for demonstration - will be replaced with AI-generated results
const sampleResults: KeywordResult[] = [
  {
    keyword: "متجر إلكتروني السعودية",
    seoTitle: "أفضل متجر إلكتروني في السعودية | تسوق أونلاين",
    metaDescription: "اكتشف أفضل المتاجر الإلكترونية في السعودية. تسوق بأمان واحصل على توصيل سريع لجميع المناطق.",
    searchVolume: 12500,
    competition: "high",
    cpc: 3.50,
    trend: "up",
  },
  {
    keyword: "شراء أونلاين الرياض",
    seoTitle: "تسوق أونلاين في الرياض | توصيل سريع",
    metaDescription: "أفضل تجربة تسوق أونلاين في الرياض مع توصيل خلال 24 ساعة. منتجات أصلية 100%.",
    searchVolume: 8200,
    competition: "medium",
    cpc: 2.80,
    trend: "up",
  },
  {
    keyword: "عروض رمضان السعودية",
    seoTitle: "عروض رمضان 2024 | أقوى التخفيضات",
    metaDescription: "اكتشف عروض رمضان الحصرية في السعودية. خصومات تصل إلى 70% على جميع المنتجات.",
    searchVolume: 45000,
    competition: "high",
    cpc: 4.20,
    trend: "up",
  },
  {
    keyword: "توصيل طلبات جدة",
    seoTitle: "خدمة توصيل سريع في جدة | 24/7",
    metaDescription: "أسرع خدمة توصيل في جدة. اطلب الآن واستلم خلال ساعات. خدمة عملاء على مدار الساعة.",
    searchVolume: 6800,
    competition: "low",
    cpc: 1.90,
    trend: "stable",
  },
  {
    keyword: "منتجات سعودية أصلية",
    seoTitle: "منتجات سعودية أصلية 100% | صناعة وطنية",
    metaDescription: "تسوق منتجات سعودية أصلية. دعم الصناعة الوطنية بجودة عالمية وأسعار منافسة.",
    searchVolume: 5400,
    competition: "low",
    cpc: 1.50,
    trend: "up",
  },
  {
    keyword: "أفضل أسعار اليوم الوطني",
    seoTitle: "عروض اليوم الوطني السعودي 94",
    metaDescription: "احتفل باليوم الوطني السعودي مع أفضل العروض والتخفيضات. خصومات حصرية لفترة محدودة.",
    searchVolume: 32000,
    competition: "medium",
    cpc: 3.00,
    trend: "stable",
  },
];

const Index = () => {
  const [results, setResults] = useState<KeywordResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async (data: { url: string; description: string; location: string }) => {
    setIsLoading(true);
    
    // Simulate API call - will be replaced with actual AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setResults(sampleResults);
    setIsLoading(false);
    
    toast({
      title: "تم التحليل بنجاح! ✨",
      description: "تم العثور على 6 كلمات مفتاحية مربحة لمتجرك",
    });

    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />
      <HeroSection onAnalyze={handleAnalyze} isLoading={isLoading} />
      <FeaturesSection />
      <HowItWorksSection />
      <ResultsSection results={results} />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
