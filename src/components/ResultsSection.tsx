import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Download, Lightbulb, Target, Calendar, BarChart3, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Extend jsPDF type for autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface KeywordResult {
  keyword: string;
  seoTitle: string;
  metaDescription: string;
  searchVolume: number;
  competition: "low" | "medium" | "high";
  cpc: number;
  trend: "up" | "down" | "stable";
  searchIntent?: "commercial" | "informational" | "transactional";
  seoNotes?: string;
}

interface AnalysisData {
  marketOverview?: string;
  opportunities?: string[];
  recommendations?: string[];
  seasonalTips?: string[];
  competitorInsights?: string;
  targetAudience?: string;
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

  const getSearchIntentBadge = (intent?: string) => {
    const labels = {
      commercial: { label: "تجارية", class: "bg-blue-500/20 text-blue-600" },
      informational: { label: "معلوماتية", class: "bg-purple-500/20 text-purple-600" },
      transactional: { label: "شرائية", class: "bg-emerald-500/20 text-emerald-600" },
    };
    const intentData = labels[intent as keyof typeof labels] || labels.informational;
    return (
      <span className={`${intentData.class} px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap`}>
        {intentData.label}
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

  const handleDownloadPDF = () => {
    // Remove duplicates based on keyword
    const uniqueResults = results.filter((result, index, self) =>
      index === self.findIndex(r => r.keyword === result.keyword)
    );

    // Create PDF document
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Add Arabic font support - using built-in font with RTL support
    doc.setR2L(true);

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;

    // Header background
    doc.setFillColor(99, 102, 241); // Indigo color
    doc.rect(0, 0, pageWidth, 45, 'F');

    // Logo and Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.text('KeyRank SEO', pageWidth - margin, 20, { align: 'right' });
    
    doc.setFontSize(14);
    doc.text('تقرير تحليل الكلمات المفتاحية للسوق السعودي', pageWidth - margin, 32, { align: 'right' });

    // Date and stats bar
    doc.setFillColor(79, 70, 229); // Darker indigo
    doc.rect(0, 45, pageWidth, 12, 'F');
    
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    const dateStr = new Date().toLocaleDateString('ar-SA', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    });
    doc.text(`تاريخ التقرير: ${dateStr}`, pageWidth - margin, 52, { align: 'right' });
    doc.text(`إجمالي الكلمات المفتاحية: ${uniqueResults.length}`, margin + 60, 52, { align: 'right' });

    let yPosition = 65;

    // Analysis Section if available
    if (analysis) {
      doc.setFontSize(14);
      doc.setTextColor(99, 102, 241);
      doc.text('تحليل السوق والتوصيات', pageWidth - margin, yPosition, { align: 'right' });
      yPosition += 8;

      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);

      if (analysis.marketOverview) {
        doc.setFontSize(11);
        doc.setTextColor(99, 102, 241);
        doc.text('نظرة عامة على السوق:', pageWidth - margin, yPosition, { align: 'right' });
        yPosition += 6;
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        const overviewLines = doc.splitTextToSize(analysis.marketOverview, pageWidth - (margin * 2));
        doc.text(overviewLines, pageWidth - margin, yPosition, { align: 'right' });
        yPosition += overviewLines.length * 5 + 5;
      }

      // Opportunities and Recommendations in columns
      if (analysis.opportunities && analysis.opportunities.length > 0) {
        doc.setFontSize(11);
        doc.setTextColor(34, 197, 94); // Green
        doc.text('الفرص:', pageWidth - margin, yPosition, { align: 'right' });
        yPosition += 5;
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        analysis.opportunities.forEach((opp, i) => {
          doc.text(`${i + 1}. ${opp}`, pageWidth - margin - 5, yPosition, { align: 'right' });
          yPosition += 5;
        });
        yPosition += 3;
      }

      if (analysis.recommendations && analysis.recommendations.length > 0) {
        doc.setFontSize(11);
        doc.setTextColor(59, 130, 246); // Blue
        doc.text('التوصيات:', pageWidth - margin, yPosition, { align: 'right' });
        yPosition += 5;
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        analysis.recommendations.forEach((rec, i) => {
          doc.text(`${i + 1}. ${rec}`, pageWidth - margin - 5, yPosition, { align: 'right' });
          yPosition += 5;
        });
        yPosition += 3;
      }

      if (analysis.seasonalTips && analysis.seasonalTips.length > 0) {
        doc.setFontSize(11);
        doc.setTextColor(245, 158, 11); // Amber
        doc.text('نصائح موسمية:', pageWidth - margin, yPosition, { align: 'right' });
        yPosition += 5;
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        analysis.seasonalTips.forEach((tip, i) => {
          doc.text(`${i + 1}. ${tip}`, pageWidth - margin - 5, yPosition, { align: 'right' });
          yPosition += 5;
        });
        yPosition += 5;
      }
    }

    // Add new page for keywords table
    doc.addPage();

    // Table header
    doc.setFillColor(99, 102, 241);
    doc.rect(0, 0, pageWidth, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text('جدول الكلمات المفتاحية', pageWidth - margin, 13, { align: 'right' });

    // Prepare table data
    const getCompetitionLabel = (competition: string) => {
      const labels = { low: 'منخفضة', medium: 'متوسطة', high: 'مرتفعة' };
      return labels[competition as keyof typeof labels] || 'متوسطة';
    };

    const getIntentLabel = (intent?: string) => {
      const labels = { commercial: 'تجارية', informational: 'معلوماتية', transactional: 'شرائية' };
      return labels[intent as keyof typeof labels] || 'معلوماتية';
    };

    const getTrendLabel = (trend: string) => {
      const labels = { up: 'صاعد ↑', down: 'نازل ↓', stable: 'ثابت →' };
      return labels[trend as keyof typeof labels] || 'ثابت →';
    };

    const tableData = uniqueResults.map((r, index) => [
      r.seoNotes || 'استهداف الكلمة في العنوان والوصف',
      getTrendLabel(r.trend),
      `${r.cpc.toFixed(2)} ر.س`,
      getIntentLabel(r.searchIntent),
      getCompetitionLabel(r.competition),
      r.searchVolume.toLocaleString('ar-SA'),
      r.metaDescription.substring(0, 60) + '...',
      r.seoTitle.substring(0, 40) + '...',
      r.keyword,
      (index + 1).toString()
    ]);

    // Create table with professional styling
    doc.autoTable({
      startY: 25,
      head: [[
        'ملاحظات SEO',
        'الاتجاه',
        'تكلفة النقرة',
        'نية البحث',
        'المنافسة',
        'حجم البحث',
        'وصف Meta',
        'عنوان SEO',
        'الكلمة المفتاحية',
        '#'
      ]],
      body: tableData,
      styles: {
        font: 'helvetica',
        fontSize: 8,
        cellPadding: 3,
        halign: 'right',
        valign: 'middle',
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [99, 102, 241],
        textColor: [255, 255, 255],
        fontSize: 9,
        fontStyle: 'bold',
        halign: 'center',
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 18, halign: 'center' },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 18, halign: 'center' },
        4: { cellWidth: 18, halign: 'center' },
        5: { cellWidth: 20, halign: 'center' },
        6: { cellWidth: 45 },
        7: { cellWidth: 35 },
        8: { cellWidth: 30, fontStyle: 'bold' },
        9: { cellWidth: 10, halign: 'center' },
      },
      margin: { top: 25, right: margin, bottom: 25, left: margin },
      didDrawPage: (data: any) => {
        // Footer on each page
        doc.setFillColor(245, 247, 250);
        doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        doc.text('KeyRank SEO - أداة تحليل الكلمات المفتاحية للسوق السعودي', pageWidth / 2, pageHeight - 7, { align: 'center' });
        doc.text(`صفحة ${data.pageNumber}`, margin, pageHeight - 7);
      }
    });

    // Summary page
    doc.addPage();
    
    // Summary header
    doc.setFillColor(99, 102, 241);
    doc.rect(0, 0, pageWidth, 35, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('ملخص التقرير', pageWidth - margin, 22, { align: 'right' });

    yPosition = 50;

    // Statistics cards
    const lowComp = uniqueResults.filter(r => r.competition === 'low').length;
    const medComp = uniqueResults.filter(r => r.competition === 'medium').length;
    const highComp = uniqueResults.filter(r => r.competition === 'high').length;
    const avgVolume = Math.round(uniqueResults.reduce((acc, r) => acc + r.searchVolume, 0) / uniqueResults.length);
    const avgCpc = (uniqueResults.reduce((acc, r) => acc + r.cpc, 0) / uniqueResults.length).toFixed(2);
    const upTrend = uniqueResults.filter(r => r.trend === 'up').length;

    // Stats boxes
    const boxWidth = 55;
    const boxHeight = 35;
    const boxGap = 10;
    const startX = pageWidth - margin - boxWidth;

    const stats = [
      { label: 'إجمالي الكلمات', value: uniqueResults.length.toString(), color: [99, 102, 241] },
      { label: 'متوسط حجم البحث', value: avgVolume.toLocaleString('ar-SA'), color: [34, 197, 94] },
      { label: 'متوسط تكلفة النقرة', value: `${avgCpc} ر.س`, color: [245, 158, 11] },
      { label: 'كلمات صاعدة', value: upTrend.toString(), color: [59, 130, 246] },
    ];

    stats.forEach((stat, index) => {
      const xPos = startX - (index * (boxWidth + boxGap));
      doc.setFillColor(stat.color[0], stat.color[1], stat.color[2]);
      doc.roundedRect(xPos, yPosition, boxWidth, boxHeight, 3, 3, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text(stat.value, xPos + boxWidth / 2, yPosition + 15, { align: 'center' });
      doc.setFontSize(9);
      doc.text(stat.label, xPos + boxWidth / 2, yPosition + 26, { align: 'center' });
    });

    yPosition += 55;

    // Competition breakdown
    doc.setFontSize(14);
    doc.setTextColor(60, 60, 60);
    doc.text('توزيع مستوى المنافسة:', pageWidth - margin, yPosition, { align: 'right' });
    yPosition += 10;

    // Competition bars
    const barWidth = 150;
    const barHeight = 12;
    const total = uniqueResults.length;

    // Low competition bar
    doc.setFillColor(200, 200, 200);
    doc.roundedRect(pageWidth - margin - barWidth, yPosition, barWidth, barHeight, 2, 2, 'F');
    doc.setFillColor(34, 197, 94);
    doc.roundedRect(pageWidth - margin - barWidth, yPosition, (lowComp / total) * barWidth, barHeight, 2, 2, 'F');
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text(`منخفضة: ${lowComp} (${Math.round((lowComp / total) * 100)}%)`, pageWidth - margin - barWidth - 5, yPosition + 9, { align: 'right' });
    yPosition += 18;

    // Medium competition bar
    doc.setFillColor(200, 200, 200);
    doc.roundedRect(pageWidth - margin - barWidth, yPosition, barWidth, barHeight, 2, 2, 'F');
    doc.setFillColor(245, 158, 11);
    doc.roundedRect(pageWidth - margin - barWidth, yPosition, (medComp / total) * barWidth, barHeight, 2, 2, 'F');
    doc.text(`متوسطة: ${medComp} (${Math.round((medComp / total) * 100)}%)`, pageWidth - margin - barWidth - 5, yPosition + 9, { align: 'right' });
    yPosition += 18;

    // High competition bar
    doc.setFillColor(200, 200, 200);
    doc.roundedRect(pageWidth - margin - barWidth, yPosition, barWidth, barHeight, 2, 2, 'F');
    doc.setFillColor(239, 68, 68);
    doc.roundedRect(pageWidth - margin - barWidth, yPosition, (highComp / total) * barWidth, barHeight, 2, 2, 'F');
    doc.text(`مرتفعة: ${highComp} (${Math.round((highComp / total) * 100)}%)`, pageWidth - margin - barWidth - 5, yPosition + 9, { align: 'right' });

    // Footer
    doc.setFillColor(99, 102, 241);
    doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text('KeyRank SEO | أداة تحليل الكلمات المفتاحية الاحترافية للسوق السعودي', pageWidth / 2, pageHeight - 8, { align: 'center' });

    // Save the PDF
    const fileName = `keyrank-seo-report-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
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
          <div className="overflow-x-auto professional-table">
            <Table className="border-collapse w-full min-w-[1200px]">
              <TableHeader>
                <TableRow className="table-header border-b-2 border-primary/30">
                  <TableHead className="text-primary-foreground font-bold text-right border border-primary/20 py-4 px-4">الكلمة المفتاحية الرئيسية</TableHead>
                  <TableHead className="text-primary-foreground font-bold text-right border border-primary/20 py-4 px-4">عنوان SEO</TableHead>
                  <TableHead className="text-primary-foreground font-bold text-right border border-primary/20 py-4 px-4">وصف Meta</TableHead>
                  <TableHead className="text-primary-foreground font-bold text-center border border-primary/20 py-4 px-3 whitespace-nowrap">حجم البحث الشهري</TableHead>
                  <TableHead className="text-primary-foreground font-bold text-center border border-primary/20 py-4 px-3 whitespace-nowrap">مستوى المنافسة</TableHead>
                  <TableHead className="text-primary-foreground font-bold text-center border border-primary/20 py-4 px-3 whitespace-nowrap">نية البحث</TableHead>
                  <TableHead className="text-primary-foreground font-bold text-center border border-primary/20 py-4 px-3 whitespace-nowrap">تكلفة النقرة</TableHead>
                  <TableHead className="text-primary-foreground font-bold text-center border border-primary/20 py-4 px-3 whitespace-nowrap">اتجاه الطلب</TableHead>
                  <TableHead className="text-primary-foreground font-bold text-right border border-primary/20 py-4 px-4">ملاحظات تحسين SEO</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow 
                    key={index}
                    className={`hover:bg-muted/50 transition-colors ${index % 2 === 0 ? 'bg-muted/20' : 'bg-card'}`}
                  >
                    <TableCell className="font-bold text-primary border border-border/50 py-3 px-4 text-right">
                      {result.keyword}
                    </TableCell>
                    <TableCell className="border border-border/50 py-3 px-4 text-right max-w-[200px]">
                      <span className="line-clamp-2">{result.seoTitle}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground border border-border/50 py-3 px-4 text-right max-w-[250px]">
                      <span className="line-clamp-2">{result.metaDescription}</span>
                    </TableCell>
                    <TableCell className="text-center font-medium border border-border/50 py-3 px-3">
                      <span className="text-lg font-bold text-primary">{result.searchVolume.toLocaleString("ar-SA")}</span>
                    </TableCell>
                    <TableCell className="text-center border border-border/50 py-3 px-3">
                      {getCompetitionBadge(result.competition)}
                    </TableCell>
                    <TableCell className="text-center border border-border/50 py-3 px-3">
                      {getSearchIntentBadge(result.searchIntent)}
                    </TableCell>
                    <TableCell className="text-center font-medium border border-border/50 py-3 px-3 whitespace-nowrap">
                      {result.cpc.toFixed(2)} ر.س
                    </TableCell>
                    <TableCell className="text-center border border-border/50 py-3 px-3">
                      <div className="flex justify-center items-center gap-1">
                        {getTrendIcon(result.trend)}
                        <span className={`text-sm font-medium ${
                          result.trend === 'up' ? 'text-emerald-500' : 
                          result.trend === 'down' ? 'text-rose-500' : 'text-muted-foreground'
                        }`}>
                          {result.trend === 'up' ? 'صاعد' : result.trend === 'down' ? 'نازل' : 'ثابت'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="border border-border/50 py-3 px-4 text-right text-sm text-muted-foreground max-w-[200px]">
                      <span className="line-clamp-2">{result.seoNotes || 'استهداف الكلمة في العنوان والوصف مع الروابط الداخلية'}</span>
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
            onClick={handleDownloadPDF}
            className="h-14 px-10 text-lg font-bold gradient-bg rounded-xl shadow-glow hover:shadow-soft transition-all duration-300"
          >
            <FileText className="w-5 h-5 ml-2" />
            تنزيل التقرير PDF
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
