import React from "react";
import { motion } from "framer-motion";
import { Globe, CheckCircle } from "lucide-react";
import { Country, getCountryHeroTitle, getCountryHeroSubtitle, getCountryMarketInfo } from "@/data/countries";

interface CountryHeroSectionProps {
  country: Country;
}

const CountryHeroSection: React.FC<CountryHeroSectionProps> = ({ country }) => {
  const heroTitle = getCountryHeroTitle(country);
  const words = heroTitle.split(" ");

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10 text-center py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 mb-8">
            <span className="text-4xl">{country.flag}</span>
            <Globe className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">{country.nameAr}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {words.slice(0, -2).join(" ")}{" "}
            <span className="gradient-text">{words.slice(-2).join(" ")}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {getCountryHeroSubtitle(country)}
          </p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-right text-muted-foreground">{getCountryMarketInfo(country)}</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto">
            {[
              { value: "100%", label: "دقة التحليل" },
              { value: "+5K", label: "تحليل مُنجز" },
              { value: "4.9", label: "تقييم العملاء" },
              { value: "3 ثوانٍ", label: "سرعة التحليل" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }} className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/30">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CountryHeroSection;
