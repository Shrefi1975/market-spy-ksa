import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, ArrowLeft, Sparkles } from "lucide-react";
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
    searchVolume: 12500,
    competition: "medium",
    cpc: 2.8,
    trend: "up",
  },
  {
    keyword: "ساعات ذكية سامسونج",
    searchVolume: 8200,
    competition: "high",
    cpc: 4.5,
    trend: "up",
  },
  {
    keyword: "ملابس نسائية صيفية",
    searchVolume: 15800,
    competition: "low",
    cpc: 1.9,
    trend: "stable",
  },
  {
    keyword: "أحذية رياضية نايك",
    searchVolume: 9400,
    competition: "medium",
    cpc: 3.2,
    trend: "up",
  },
  {
    keyword: "مكياج ماركات عالمية",
    searchVolume: 6700,
    competition: "low",
    cpc: 2.1,
    trend: "down",
  },
];

const getCompetitionBadge = (competition: string) => {
  const styles = {
    low: "bg-emerald-500/20 text-emerald-600",
    medium: "bg-amber-500/20 text-amber-600",
    high: "bg-rose-500/20 text-rose-600",
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
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-emerald-500" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-rose-500" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
};

const SampleAnalysisTable: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            نموذج من نتائج التحليل
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            شاهد قوة <span className="gradient-text">التحليل الذكي</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نموذج حقيقي لنتائج تحليل الكلمات المفتاحية للسوق السعودي
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="gradient-bg hover:bg-transparent">
                    <TableHead className="text-primary-foreground font-bold text-right">
                      الكلمة المفتاحية
                    </TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center">
                      حجم البحث
                    </TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center">
                      المنافسة
                    </TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center">
                      تكلفة النقرة
                    </TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center">
                      الاتجاه
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleKeywords.map((keyword, index) => (
                    <TableRow 
                      key={index}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-medium text-right">
                        {keyword.keyword}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-semibold text-primary">
                          {keyword.searchVolume.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {getCompetitionBadge(keyword.competition)}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-medium">
                          {keyword.cpc.toFixed(2)} ر.س
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          {getTrendIcon(keyword.trend)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Call to action */}
            <div className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-t border-border/50">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-lg mb-1">
                    احصل على تحليل كامل لمتجرك
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    ابدأ تجربتك المجانية الآن واكتشف الكلمات المفتاحية الذهبية لنجاحك
                  </p>
                </div>
                <Button
                  onClick={() => navigate("/auth")}
                  className="gradient-bg shadow-glow hover:shadow-soft whitespace-nowrap"
                >
                  ابدأ التحليل المجاني
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SampleAnalysisTable;