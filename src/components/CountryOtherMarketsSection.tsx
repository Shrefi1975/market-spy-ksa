import React from "react";
import { motion } from "framer-motion";
import { countries } from "@/data/countries";

interface CountryOtherMarketsSectionProps {
  currentCountryCode: string;
}

const CountryOtherMarketsSection: React.FC<CountryOtherMarketsSectionProps> = ({ currentCountryCode }) => {
  // Show a curated selection of major markets (not all 190+ countries)
  const majorMarketCodes = ['sa', 'ae', 'eg', 'us', 'gb', 'de', 'fr', 'tr', 'in', 'cn', 'jp', 'br', 'au', 'ca', 'kr', 'ma', 'ng', 'za', 'kw', 'qa', 'bh', 'om', 'jo', 'pk', 'my', 'id'];
  const otherCountries = countries.filter(c => c.code !== currentCountryCode && majorMarketCodes.includes(c.code));

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">استكشف أسواقاً أخرى</h2>
          <p className="text-muted-foreground">KeyRank يدعم تحليل الكلمات المفتاحية في جميع دول العالم</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {otherCountries.map((c, i) => (
            <motion.a key={c.code} href={`/country/${c.code}`} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all">
              <span className="text-sm font-medium">{c.nameAr}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountryOtherMarketsSection;
