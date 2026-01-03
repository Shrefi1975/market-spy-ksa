import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  cpc: number;
  trend: "up" | "down" | "stable";
}

interface ResultsSectionProps {
  results: KeywordResult[];
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  const getCompetitionBadge = (competition: string) => {
    const labels = {
      low: "منخفضة",
      medium: "متوسطة",
      high: "مرتفعة",
    };
    return (
      <span className={`competition-${competition}`}>
        {labels[competition as keyof typeof labels]}
      </span>
    );
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-5 h-5 trend-up" />;
      case "down":
        return <TrendingDown className="w-5 h-5 trend-down" />;
      default:
        return <Minus className="w-5 h-5 trend-stable" />;
    }
  };

  if (results.length === 0) return null;

  return (
    <section className="py-24 bg-muted/30" id="results">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            نتائج <span className="gradient-text">التحليل</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            الكلمات المفتاحية المقترحة بناءً على تحليل السوق السعودي
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="table-header">
                  <TableHead className="text-primary-foreground font-bold">الكلمة المفتاحية</TableHead>
                  <TableHead className="text-primary-foreground font-bold">عنوان SEO</TableHead>
                  <TableHead className="text-primary-foreground font-bold">وصف Meta</TableHead>
                  <TableHead className="text-primary-foreground font-bold text-center">حجم البحث</TableHead>
                  <TableHead className="text-primary-foreground font-bold text-center">المنافسة</TableHead>
                  <TableHead className="text-primary-foreground font-bold text-center">تكلفة النقرة</TableHead>
                  <TableHead className="text-primary-foreground font-bold text-center">الاتجاه</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow 
                    key={index}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-bold text-primary">
                      {result.keyword}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {result.seoTitle}
                    </TableCell>
                    <TableCell className="max-w-[250px] truncate text-muted-foreground">
                      {result.metaDescription}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {result.searchVolume.toLocaleString("ar-SA")}
                    </TableCell>
                    <TableCell className="text-center">
                      {getCompetitionBadge(result.competition)}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {result.cpc.toFixed(2)} ر.س
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        {getTrendIcon(result.trend)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mt-8"
        >
          <Button className="h-14 px-10 text-lg font-bold gradient-bg rounded-xl shadow-glow hover:shadow-soft transition-all duration-300">
            <Download className="w-5 h-5 ml-2" />
            تنزيل التقرير الكامل
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
