import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Download, Lightbulb, Target, Calendar, BarChart3 } from "lucide-react";
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

interface AnalysisData {
  marketOverview?: string;
  opportunities?: string[];
  recommendations?: string[];
  seasonalTips?: string[];
}

interface ResultsSectionProps {
  results: KeywordResult[];
  analysis?: AnalysisData;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results, analysis }) => {
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

  const handleDownload = () => {
    // Create CSV content
    const headers = ['الكلمة المفتاحية', 'عنوان SEO', 'وصف Meta', 'حجم البحث', 'المنافسة', 'تكلفة النقرة', 'الاتجاه'];
    const csvContent = [
      headers.join(','),
      ...results.map(r => [
        `"${r.keyword}"`,
        `"${r.seoTitle}"`,
        `"${r.metaDescription}"`,
        r.searchVolume,
        r.competition === 'low' ? 'منخفضة' : r.competition === 'medium' ? 'متوسطة' : 'مرتفعة',
        `${r.cpc} ر.س`,
        r.trend === 'up' ? 'صاعد' : r.trend === 'down' ? 'نازل' : 'ثابت'
      ].join(','))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'keyrank-report.csv';
    link.click();
    URL.revokeObjectURL(url);
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

        {/* Analysis Insights */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {analysis.marketOverview && (
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg">نظرة السوق</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {analysis.marketOverview}
                </p>
              </div>
            )}

            {analysis.opportunities && analysis.opportunities.length > 0 && (
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="font-bold text-lg">الفرص</h3>
                </div>
                <ul className="space-y-2">
                  {analysis.opportunities.slice(0, 3).map((opp, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      {opp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="font-bold text-lg">التوصيات</h3>
                </div>
                <ul className="space-y-2">
                  {analysis.recommendations.slice(0, 3).map((rec, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.seasonalTips && analysis.seasonalTips.length > 0 && (
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="font-bold text-lg">نصائح موسمية</h3>
                </div>
                <ul className="space-y-2">
                  {analysis.seasonalTips.slice(0, 3).map((tip, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

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
          <Button 
            onClick={handleDownload}
            className="h-14 px-10 text-lg font-bold gradient-bg rounded-xl shadow-glow hover:shadow-soft transition-all duration-300"
          >
            <Download className="w-5 h-5 ml-2" />
            تنزيل التقرير الكامل
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
