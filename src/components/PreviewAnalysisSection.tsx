import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Search, BarChart3, Target, Zap, Shield, Award } from "lucide-react";
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
    keyword: "مطعم سوشي في جدة",
    seoTitle: "أفضل مطاعم السوشي في جدة | تجربة يابانية أصيلة",
    metaDescription: "اكتشف أشهى أطباق السوشي في جدة مع مكونات طازجة يومياً وتوصيل سريع لكافة أحياء المدينة.",
    searchVolume: 12500,
    competition: "medium",
    trend: "up",
    searchIntent: "تجاري",
    seoNotes: "فرصة ممتازة للتصدر",
  },
  {
    keyword: "توصيل طعام ياباني",
    seoTitle: "توصيل طعام ياباني فاخر | سوشي طازج لباب منزلك",
    metaDescription: "اطلب الآن أشهى الأطباق اليابانية مع توصيل مجاني للطلبات فوق 100 ريال. سوشي، رامن، تمبورا.",
    searchVolume: 8200,
    competition: "low",
    trend: "up",
    searchIntent: "شرائي",
    seoNotes: "منافسة منخفضة - استغلال فوري",
  },
  {
    keyword: "عروض مطاعم السوشي",
    seoTitle: "عروض وخصومات مطاعم السوشي في السعودية 2024",
    metaDescription: "أحدث عروض مطاعم السوشي والأكل الياباني. خصومات تصل 50% مع كوبونات حصرية.",
    searchVolume: 5800,
    competition: "low",
    trend: "stable",
    searchIntent: "شرائي",
    seoNotes: "استهداف موسمي موصى به",
  },
  {
    keyword: "أفضل سوشي في السعودية",
    seoTitle: "دليلك لأفضل مطاعم السوشي في المملكة العربية السعودية",
    metaDescription: "تصنيف شامل لأفضل مطاعم السوشي في الرياض، جدة والدمام. تقييمات حقيقية ونصائح الخبراء.",
    searchVolume: 15000,
    competition: "high",
    trend: "up",
    searchIntent: "معلوماتي",
    seoNotes: "محتوى قوي مطلوب للتنافس",
  },
];

const trustIndicators = [
  { icon: Shield, value: "100%", label: "دقة التحليل", color: "text-emerald-500" },
  { icon: BarChart3, value: "+5K", label: "تحليل مُنجز", color: "text-primary" },
  { icon: Award, value: "4.9", label: "تقييم العملاء", color: "text-amber-500" },
  { icon: Zap, value: "3 ثوانٍ", label: "سرعة التحليل", color: "text-blue-500" },
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
        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
        >
          {trustIndicators.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50 text-center hover:border-primary/30 transition-all hover:shadow-lg"
            >
              <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
              <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

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
                      حجم البحث
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
                    <TableHead className="text-primary-foreground font-bold text-right py-5 min-w-[180px]">
                      ملاحظات SEO
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
                        <span className="font-bold text-foreground">
                          {item.searchVolume.toLocaleString('ar-SA')}
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
                      <TableCell className="text-right py-5">
                        <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                          {item.seoNotes}
                        </span>
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
