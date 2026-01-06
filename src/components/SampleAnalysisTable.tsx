import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, ArrowLeft, Sparkles, Trophy, Lightbulb, Users, Target, Crown, Zap } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const sampleKeywords = [
  {
    keyword: "عطور رجالية فخمة",
    seoTitle: "أفضل العطور الرجالية الفخمة | عطور أصلية 2024",
    metaDescription: "اكتشف تشكيلة العطور الرجالية الفخمة والأصلية. عطور ماركات عالمية بأسعار منافسة مع توصيل سريع لجميع الدول العربية.",
    competition: "medium",
    trend: "up",
  },
  {
    keyword: "ساعات ذكية سامسونج",
    seoTitle: "ساعات سامسونج الذكية Galaxy Watch | أحدث الموديلات",
    metaDescription: "تسوق أحدث ساعات سامسونج الذكية مع ضمان رسمي. مقاومة للماء، تتبع اللياقة، وشاشة AMOLED فائقة الوضوح.",
    competition: "high",
    trend: "up",
  },
  {
    keyword: "ملابس نسائية صيفية",
    seoTitle: "ملابس نسائية صيفية أنيقة | موضة 2024",
    metaDescription: "أحدث تصاميم الملابس النسائية الصيفية. فساتين، بلوزات وتنانير بأقمشة مريحة. توصيل سريع للوطن العربي.",
    competition: "low",
    trend: "stable",
  },
  {
    keyword: "أحذية رياضية نايك",
    seoTitle: "أحذية نايك الرياضية الأصلية | Nike Air Max & Jordan",
    metaDescription: "تشكيلة أحذية نايك الأصلية للرياضة والحياة اليومية. Air Max، Jordan وAir Force بأسعار تنافسية.",
    competition: "medium",
    trend: "up",
  },
];

const competitors = [
  {
    name: "متجر العطور الفاخرة",
    strength: "تشكيلة واسعة من الماركات",
    weakness: "أسعار مرتفعة",
  },
  {
    name: "سوق الساعات",
    strength: "ضمان رسمي ممتد",
    weakness: "تنوع محدود",
  },
  {
    name: "أناقة المرأة",
    strength: "شحن سريع مجاني",
    weakness: "جودة متوسطة",
  },
];

const strategicInsights = [
  {
    icon: Target,
    title: "استهداف الموسم",
    description: "استغل مواسم التخفيضات والأعياد لتعزيز ظهورك في نتائج البحث",
  },
  {
    icon: Crown,
    title: "التميز بالمحتوى",
    description: "أنشئ محتوى حصري يجيب على أسئلة العملاء المحتملين",
  },
  {
    icon: Zap,
    title: "سرعة الاستجابة",
    description: "حسّن سرعة موقعك لتحسين ترتيبك وتجربة المستخدم",
  },
];

const getCompetitionBadge = (competition: string) => {
  const styles = {
    low: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    medium: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
    high: "bg-rose-500/20 text-rose-600 dark:text-rose-400",
  };
  const labels = {
    low: "منخفضة",
    medium: "متوسطة",
    high: "عالية",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[competition as keyof typeof styles]}`}>
      {labels[competition as keyof typeof labels]}
    </span>
  );
};

const getTrendIcon = (trend: string) => {
  if (trend === "up") return <TrendingUp className="w-5 h-5 text-emerald-500" />;
  if (trend === "down") return <TrendingDown className="w-5 h-5 text-rose-500" />;
  return <Minus className="w-5 h-5 text-muted-foreground" />;
};

const SampleAnalysisTable: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            نموذج من نتائج التحليل
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            شاهد قوة <span className="gradient-text">التحليل الذكي</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            اكتشف كيف نساعدك في الوصول إلى العملاء المناسبين بكلمات مفتاحية ذهبية
          </p>
        </motion.div>

        {/* Keywords Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="gradient-bg hover:bg-transparent border-0">
                    <TableHead className="text-primary-foreground font-bold text-right py-5">
                      الكلمة المفتاحية
                    </TableHead>
                    <TableHead className="text-primary-foreground font-bold text-right py-5">
                      عنوان SEO
                    </TableHead>
                    <TableHead className="text-primary-foreground font-bold text-right py-5">
                      وصف Meta
                    </TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center py-5">
                      المنافسة
                    </TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center py-5">
                      الاتجاه
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleKeywords.map((item, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="hover:bg-muted/50 transition-colors border-b border-border/30"
                    >
                      <TableCell className="font-bold text-primary py-5">
                        {item.keyword}
                      </TableCell>
                      <TableCell className="text-right py-5">
                        <span className="text-sm font-medium">{item.seoTitle}</span>
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
                        <div className="flex justify-center">
                          {getTrendIcon(item.trend)}
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.div>

        {/* Competitors Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              لمحة من المنافسين
            </div>
            <h3 className="text-2xl font-bold mb-3">
              اعرف منافسيك، <span className="gradient-text">تفوّق عليهم</span>
            </h3>
            <p className="text-muted-foreground">
              نحلل نقاط القوة والضعف لدى منافسيك لنمنحك الأفضلية التنافسية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {competitors.map((competitor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h4 className="font-bold">{competitor.name}</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <div>
                      <span className="text-xs text-muted-foreground">نقطة قوة:</span>
                      <p className="text-sm font-medium">{competitor.strength}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-500 mt-1">✗</span>
                    <div>
                      <span className="text-xs text-muted-foreground">نقطة ضعف:</span>
                      <p className="text-sm font-medium">{competitor.weakness}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Strategic Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-5xl mx-auto mb-12"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <Lightbulb className="w-4 h-4" />
              رؤى استراتيجية
            </div>
            <h3 className="text-2xl font-bold mb-3">
              استراتيجيات <span className="gradient-text">النجاح</span>
            </h3>
            <p className="text-muted-foreground">
              نصائح ذهبية مبنية على تحليل البيانات لتحسين ترتيبك في محركات البحث
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {strategicInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className="group bg-gradient-to-br from-card to-card/50 rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all hover:shadow-xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <insight.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-lg font-bold mb-2">{insight.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {insight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center p-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl border border-primary/20">
            <h4 className="text-xl font-bold mb-3">
              🚀 احصل على تحليل كامل لموقعك
            </h4>
            <p className="text-muted-foreground mb-6">
              ابدأ تجربتك المجانية الآن واكتشف الفرص الذهبية لنجاحك في الأسواق العربية
            </p>
            <Button
              onClick={() => navigate("/auth")}
              size="lg"
              className="gradient-bg shadow-glow hover:shadow-pink whitespace-nowrap text-lg px-8"
            >
              ابدأ التحليل المجاني
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SampleAnalysisTable;