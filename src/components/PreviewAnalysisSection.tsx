import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Search, Target, FileText, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface KeywordResult {
  keyword: string;
  seoTitle: string;
  metaDescription: string;
  searchVolume: number;
  competition: "low" | "medium" | "high";
  trend: "up" | "down" | "stable";
  searchIntent: string;
  seoNotes: string;
}

interface PreviewAnalysisSectionProps {
  results?: KeywordResult[];
  isAnalyzed?: boolean;
}

const previewKeywords: KeywordResult[] = [
  {
    keyword: "مطاعم في دبي",
    seoTitle: "أفضل المطاعم في دبي | تجربة طعام استثنائية",
    metaDescription: "اكتشف أشهى المطاعم في دبي مع تشكيلة متنوعة من المأكولات العالمية والمحلية.",
    searchVolume: 18500,
    competition: "medium",
    trend: "up",
    searchIntent: "تجاري",
    seoNotes: "فرصة ممتازة للتصدر",
  },
  {
    keyword: "تسوق أونلاين مصر",
    seoTitle: "تسوق أونلاين في مصر | أفضل المتاجر الإلكترونية",
    metaDescription: "اكتشف أفضل مواقع التسوق الإلكتروني في مصر مع عروض حصرية وتوصيل سريع.",
    searchVolume: 25000,
    competition: "high",
    trend: "up",
    searchIntent: "شرائي",
    seoNotes: "سوق كبير ومنافسة عالية",
  },
  {
    keyword: "عطور فرنسية أصلية",
    seoTitle: "عطور فرنسية أصلية | أفخم الماركات العالمية",
    metaDescription: "تشكيلة راقية من العطور الفرنسية الأصلية. توصيل لجميع الدول العربية.",
    searchVolume: 9800,
    competition: "low",
    trend: "stable",
    searchIntent: "شرائي",
    seoNotes: "منافسة منخفضة - فرصة ذهبية!",
  },
  {
    keyword: "فنادق الرياض",
    seoTitle: "أفضل فنادق الرياض | حجز فوري بأسعار منافسة",
    metaDescription: "احجز إقامتك في أفخم فنادق الرياض. تقييمات حقيقية وأسعار تنافسية.",
    searchVolume: 15000,
    competition: "high",
    trend: "up",
    searchIntent: "تجاري",
    seoNotes: "محتوى قوي مطلوب للتنافس",
  },
  {
    keyword: "ملابس محجبات تركية",
    seoTitle: "ملابس محجبات تركية أنيقة | موضة 2024",
    metaDescription: "أحدث تصاميم ملابس المحجبات التركية. أقمشة فاخرة وتوصيل للوطن العربي.",
    searchVolume: 12500,
    competition: "low",
    trend: "up",
    searchIntent: "شرائي",
    seoNotes: "فرصة ذهبية!",
  },
  {
    keyword: "دورات تدريبية أونلاين",
    seoTitle: "دورات تدريبية أونلاين | تعلم من أي مكان",
    metaDescription: "منصة تعليمية عربية متكاملة. دورات معتمدة في البرمجة والتسويق والتصميم.",
    searchVolume: 8700,
    competition: "medium",
    trend: "up",
    searchIntent: "معلوماتي",
    seoNotes: "سوق متنامي",
  },
  {
    keyword: "مطاعم حلال في المغرب",
    seoTitle: "دليل مطاعم الحلال في المغرب | المأكولات التقليدية",
    metaDescription: "اكتشف أفضل مطاعم الحلال في المغرب. طاجين، كسكس، وأطباق مغربية أصيلة.",
    searchVolume: 6200,
    competition: "low",
    trend: "stable",
    searchIntent: "تجاري",
    seoNotes: "منافسة منخفضة جداً",
  },
  {
    keyword: "عقارات الكويت",
    seoTitle: "عقارات الكويت للبيع والإيجار | دليلك العقاري الشامل",
    metaDescription: "ابحث عن شقق وفلل ومحلات تجارية في الكويت. أسعار محدثة وصور حقيقية.",
    searchVolume: 11000,
    competition: "medium",
    trend: "up",
    searchIntent: "تجاري",
    seoNotes: "فرصة جيدة للتصدر",
  },
];

const getCompetitionBadge = (competition: string) => {
  const styles = {
    low: "bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
    medium: "bg-gradient-to-r from-amber-500/20 to-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-500/30",
    high: "bg-gradient-to-r from-rose-500/20 to-rose-400/20 text-rose-600 dark:text-rose-400 border border-rose-500/30",
  };
  const labels = {
    low: "منخفضة ✨",
    medium: "متوسطة",
    high: "عالية 🔥",
  };
  return (
    <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${styles[competition as keyof typeof styles]}`}>
      {labels[competition as keyof typeof labels]}
    </span>
  );
};

const getTrendIcon = (trend: string) => {
  if (trend === "up") return <TrendingUp className="w-5 h-5 text-emerald-500" />;
  if (trend === "down") return <TrendingDown className="w-5 h-5 text-rose-500" />;
  return <Minus className="w-5 h-5 text-muted-foreground" />;
};

const getIntentBadge = (intent: string) => {
  const styles: Record<string, string> = {
    "تجاري": "bg-blue-500/20 text-blue-600 dark:text-blue-400",
    "شرائي": "bg-purple-500/20 text-purple-600 dark:text-purple-400",
    "معلوماتي": "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[intent] || styles["معلوماتي"]}`}>
      {intent}
    </span>
  );
};

const PreviewAnalysisSection: React.FC<PreviewAnalysisSectionProps> = ({ results, isAnalyzed = false }) => {
  const displayData = isAnalyzed && results && results.length > 0 ? results : previewKeywords;
  const title = isAnalyzed ? "نتائج تحليل موقعك" : "معاينة نتائج التحليل";
  const subtitle = isAnalyzed 
    ? "هذه الكلمات المفتاحية الذهبية لموقعك - ابدأ باستهدافها الآن!" 
    : "شاهد كيف نكشف لك الفرص الذهبية للتصدر في محركات البحث";

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Background decorations */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <Search className="w-4 h-4" />
            {isAnalyzed ? "تحليل مُكتمل ✓" : "معاينة تفاعلية"}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title.split(" ").slice(0, -1).join(" ")} <span className="gradient-text">{title.split(" ").slice(-1)}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          {/* Report preview info */}
          {isAnalyzed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm"
            >
              <FileText className="w-4 h-4" />
              <span>لمحة من التقرير الكامل ({displayData.length} كلمة مفتاحية)</span>
              <Download className="w-4 h-4" />
            </motion.div>
          )}
        </motion.div>

        {/* Analysis Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          <div className="bg-card/90 backdrop-blur-sm rounded-3xl border border-border/50 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="gradient-bg hover:bg-transparent border-0">
                    <TableHead className="text-primary-foreground font-bold text-right py-5 min-w-[150px]">
                      الكلمة المفتاحية
                    </TableHead>
                    <TableHead className="text-primary-foreground font-bold text-right py-5 min-w-[200px]">
                      عنوان SEO
                    </TableHead>
                    <TableHead className="text-primary-foreground font-bold text-right py-5 min-w-[250px]">
                      وصف Meta
                    </TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center py-5">
                      المنافسة
                    </TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center py-5">
                      نية البحث
                    </TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center py-5">
                      الاتجاه
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayData.map((item, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="hover:bg-primary/5 transition-colors border-b border-border/30"
                    >
                      <TableCell className="font-bold text-primary py-5">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-primary/60" />
                          {item.keyword}
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-5">
                        <span className="text-sm font-medium line-clamp-2">{item.seoTitle}</span>
                      </TableCell>
                      <TableCell className="text-right py-5 max-w-xs">
                        <span className="text-sm text-muted-foreground line-clamp-2">
                          {item.metaDescription}
                        </span>
                      </TableCell>
                      <TableCell className="text-center py-5">
                        {getCompetitionBadge(item.competition)}
                      </TableCell>
                      <TableCell className="text-center py-5">
                        {getIntentBadge(item.searchIntent)}
                      </TableCell>
                      <TableCell className="text-center py-5">
                        <div className="flex justify-center items-center gap-1">
                          {getTrendIcon(item.trend)}
                          <span className="text-xs text-muted-foreground">
                            {item.trend === "up" ? "صاعد" : item.trend === "down" ? "هابط" : "مستقر"}
                          </span>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Bottom note */}
          {!isAnalyzed && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center text-muted-foreground mt-6 text-sm"
            >
              💡 هذه بيانات توضيحية فقط. حلل موقعك الآن للحصول على نتائج حقيقية مخصصة لنشاطك!
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PreviewAnalysisSection;
