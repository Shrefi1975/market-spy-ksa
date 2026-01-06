import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Download, Lightbulb, Target, Calendar, BarChart3, FileText, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import reshaper from "arabic-persian-reshaper";
import tajawalTtfUrl from "@/assets/fonts/Tajawal-Regular.ttf?url";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ReportLanguage = "ar" | "ar-en";

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

interface Competitor {
  name: string;
  website?: string;
  strengths?: string;
  weaknesses?: string;
}

interface AnalysisData {
  marketOverview?: string;
  opportunities?: string[];
  recommendations?: string[];
  seasonalTips?: string[];
  competitorInsights?: string;
  targetAudience?: string;
  competitors?: Competitor[];
}

interface ResultsSectionProps {
  results: KeywordResult[];
  analysis?: AnalysisData;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results, analysis }) => {
  const [reportLanguage, setReportLanguage] = useState<ReportLanguage>("ar");
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

  const handleDownloadPDF = async () => {
    try {
      // Remove duplicates based on keyword
      const uniqueResults = results.filter((result, index, self) =>
        index === self.findIndex(r => r.keyword === result.keyword)
      );

      if (uniqueResults.length === 0) {
        alert('لا توجد نتائج لتحميلها');
        return;
      }

      // Create PDF document in landscape for better table display
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
        let binary = "";
        const bytes = new Uint8Array(buffer);
        const chunkSize = 0x8000;
        for (let i = 0; i < bytes.length; i += chunkSize) {
          binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
        }
        return btoa(binary);
      };

      const containsArabic = (text: string) => /[\u0600-\u06FF]/.test(text);
      const shapeArabic = (text: string) => (containsArabic(text) ? reshaper.ArabicShaper.convertArabic(text) : text);

      // Embed an Arabic font so Arabic renders correctly in the PDF
      const fontRes = await fetch(tajawalTtfUrl);
      const fontBuf = await fontRes.arrayBuffer();
      const fontB64 = arrayBufferToBase64(fontBuf);
      (doc as any).addFileToVFS("Tajawal-Regular.ttf", fontB64);
      (doc as any).addFont("Tajawal-Regular.ttf", "Tajawal", "normal");
      doc.setFont("Tajawal", "normal");
      if (typeof (doc as any).setR2L === "function") {
        (doc as any).setR2L(true);
      }

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;

      // Helper function to add text with proper alignment
      const addText = (text: string | string[], x: number, y: number, options?: any) => {
        if (Array.isArray(text)) {
          doc.text(text.map((t) => shapeArabic(t)), x, y, options);
          return;
        }
        doc.text(shapeArabic(text), x, y, options);
      };

      // ===== PAGE 1: Cover & Overview =====
      // Header background gradient effect
      doc.setFillColor(99, 102, 241);
      doc.rect(0, 0, pageWidth, 50, 'F');
      doc.setFillColor(79, 70, 229);
      doc.rect(0, 40, pageWidth, 15, 'F');

      // Logo/Brand
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(32);
      addText("KeyRank SEO", pageWidth / 2, 22, { align: "center" });

      doc.setFontSize(14);
      const reportTitle = reportLanguage === "ar-en" 
        ? "SEO Keyword Analysis Report | تقرير تحليل الكلمات المفتاحية" 
        : "تقرير تحليل الكلمات المفتاحية (SEO) - KeyRank";
      addText(reportTitle, pageWidth / 2, 35, { align: "center" });

      // Date bar
      doc.setFontSize(11);
      const dateStrAr = new Date().toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const dateStrEn = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const dateLabel = reportLanguage === "ar-en"
        ? `Report Date: ${dateStrEn} | تاريخ التقرير: ${dateStrAr} | Keywords: ${uniqueResults.length}`
        : `تاريخ التقرير: ${dateStrAr} | عدد الكلمات: ${uniqueResults.length}`;
      addText(dateLabel, pageWidth / 2, 48, { align: "center" });

      let yPosition = 70;

      // Market Overview Section
      if (analysis?.marketOverview) {
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(margin, yPosition - 5, pageWidth - margin * 2, 35, 3, 3, "F");

        doc.setFontSize(14);
        doc.setTextColor(99, 102, 241);
        const marketTitle = reportLanguage === "ar-en" ? "Market Overview | نظرة عامة على السوق" : "نظرة عامة على السوق";
        addText(marketTitle, margin + 5, yPosition + 5);

        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const overviewLines = doc.splitTextToSize(shapeArabic(analysis.marketOverview), pageWidth - margin * 2 - 10);
        addText(overviewLines, margin + 5, yPosition + 15, { align: "right" });
        yPosition += 45;
      }

      // Two column layout for Opportunities & Recommendations
      const colWidth = (pageWidth - margin * 3) / 2;

      // Opportunities
      if (analysis?.opportunities && analysis.opportunities.length > 0) {
        doc.setFillColor(240, 253, 244);
        doc.roundedRect(margin, yPosition, colWidth, 50, 3, 3, "F");

        doc.setFontSize(12);
        doc.setTextColor(34, 197, 94);
        const oppTitle = reportLanguage === "ar-en" ? "Opportunities | الفرص" : "الفرص";
        addText(oppTitle, margin + 5, yPosition + 10);

        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        analysis.opportunities.slice(0, 3).forEach((opp, i) => {
          const truncated = opp.length > 60 ? opp.substring(0, 60) + "..." : opp;
          addText(`${i + 1}. ${truncated}`, margin + 5, yPosition + 22 + i * 10, { align: "right" });
        });
      }

      // Recommendations
      if (analysis?.recommendations && analysis.recommendations.length > 0) {
        doc.setFillColor(239, 246, 255);
        doc.roundedRect(margin + colWidth + margin, yPosition, colWidth, 50, 3, 3, "F");

        doc.setFontSize(12);
        doc.setTextColor(59, 130, 246);
        const recTitle = reportLanguage === "ar-en" ? "Recommendations | التوصيات" : "التوصيات";
        addText(recTitle, margin + colWidth + margin + 5, yPosition + 10);

        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        analysis.recommendations.slice(0, 3).forEach((rec, i) => {
          const truncated = rec.length > 60 ? rec.substring(0, 60) + "..." : rec;
          addText(`${i + 1}. ${truncated}`, margin + colWidth + margin + 5, yPosition + 22 + i * 10, { align: "right" });
        });
      }
      yPosition += 60;

      // Competitors Section
      if (analysis?.competitors && analysis.competitors.length > 0) {
        doc.setFillColor(254, 243, 199);
        doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 45, 3, 3, "F");

        doc.setFontSize(12);
        doc.setTextColor(217, 119, 6);
        const compTitle = reportLanguage === "ar-en" ? "Competitor Analysis | تحليل المنافسين" : "تحليل المنافسين";
        addText(compTitle, margin + 5, yPosition + 10);

        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        analysis.competitors.slice(0, 3).forEach((comp, i) => {
          const xPos = margin + 5 + i * ((pageWidth - margin * 2 - 10) / 3);
          addText(`${comp.name}`, xPos, yPosition + 22, { align: "right" });
          if (comp.website) {
            doc.setTextColor(99, 102, 241);
            addText(comp.website.substring(0, 25), xPos, yPosition + 30, { align: "right" });
            doc.setTextColor(60, 60, 60);
          }
          if (comp.strengths) {
            addText(`+ ${comp.strengths.substring(0, 30)}`, xPos, yPosition + 38, { align: "right" });
          }
        });
      }

      // ===== PAGE 2: Keywords Table =====
      doc.addPage();

      // Table header
      doc.setFillColor(99, 102, 241);
      doc.rect(0, 0, pageWidth, 18, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      const tableTitle = reportLanguage === "ar-en" ? "Keywords Table | جدول الكلمات المفتاحية" : "جدول الكلمات المفتاحية";
      addText(tableTitle, pageWidth / 2, 12, { align: "center" });

      // Helper functions for labels (bilingual support)
      const getCompetitionLabel = (competition: string) => {
        if (reportLanguage === "ar-en") {
          const labels = { low: "Low | منخفض", medium: "Medium | متوسط", high: "High | مرتفع" };
          return labels[competition as keyof typeof labels] || "Medium | متوسط";
        }
        const labels = { low: "منخفض", medium: "متوسط", high: "مرتفع" };
        return labels[competition as keyof typeof labels] || "متوسط";
      };

      const getIntentLabel = (intent?: string) => {
        if (reportLanguage === "ar-en") {
          const labels = { commercial: "Commercial | تجاري", informational: "Info | معلوماتي", transactional: "Purchase | شرائي" };
          return labels[intent as keyof typeof labels] || "Info | معلوماتي";
        }
        const labels = { commercial: "تجاري", informational: "معلوماتي", transactional: "شرائي" };
        return labels[intent as keyof typeof labels] || "معلوماتي";
      };

      const getTrendLabel = (trend: string) => {
        if (reportLanguage === "ar-en") {
          const labels = { up: "Up | صاعد", down: "Down | هابط", stable: "Stable | مستقر" };
          return labels[trend as keyof typeof labels] || "Stable | مستقر";
        }
        const labels = { up: "صاعد", down: "هابط", stable: "مستقر" };
        return labels[trend as keyof typeof labels] || "مستقر";
      };

      // Prepare table data
      const tableData = uniqueResults.map((r, index) => [
        (index + 1).toString(),
        r.keyword,
        r.seoTitle,
        r.searchVolume.toLocaleString("ar-SA"),
        getCompetitionLabel(r.competition),
        getIntentLabel(r.searchIntent),
        `${r.cpc.toFixed(2)} ر.س`,
        getTrendLabel(r.trend),
        r.seoNotes || "تحسين العنوان والوصف (SEO)"
      ]);

      // Table headers based on language
      const tableHeaders = reportLanguage === "ar-en" 
        ? [
            "#",
            "Keyword | الكلمة",
            "SEO Title | عنوان",
            "Volume | البحث",
            "Comp | المنافسة",
            "Intent | النية",
            "CPC",
            "Trend | الاتجاه",
            "SEO Notes | ملاحظات",
          ]
        : [
            "#",
            "الكلمة المفتاحية",
            "عنوان SEO",
            "حجم البحث",
            "المنافسة",
            "النية",
            "CPC",
            "الاتجاه",
            "ملاحظات SEO",
          ];

      // Create professional table
      autoTable(doc, {
        startY: 22,
        head: [tableHeaders],
        body: tableData,
        styles: {
          font: "Tajawal",
          fontSize: 9,
          cellPadding: 2.2,
          halign: "center",
          valign: "middle",
          lineColor: [200, 200, 200],
          lineWidth: 0.1,
          overflow: "linebreak",
        },
        headStyles: {
          font: "Tajawal",
          fillColor: [99, 102, 241],
          textColor: [255, 255, 255],
          fontSize: 9,
          fontStyle: "bold",
          halign: "center",
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252],
        },
        columnStyles: {
          0: { cellWidth: 9, halign: "center" },
          1: { cellWidth: 45, halign: "right", fontStyle: "bold" },
          2: { cellWidth: 55, halign: "right" },
          3: { cellWidth: 22, halign: "center" },
          4: { cellWidth: 22, halign: "center" },
          5: { cellWidth: 18, halign: "center" },
          6: { cellWidth: 20, halign: "center" },
          7: { cellWidth: 18, halign: "center" },
          8: { cellWidth: 65, halign: "right" },
        },
        margin: { top: 22, right: margin, bottom: 20, left: margin },
        didParseCell: (data: any) => {
          // Ensure Arabic is shaped + font is applied for every cell
          if (typeof data.cell?.raw === "string") {
            data.cell.text = [shapeArabic(data.cell.raw)];
          }
          data.cell.styles.font = "Tajawal";
        },
        didDrawPage: (data: any) => {
          // Footer
          doc.setFillColor(248, 250, 252);
          doc.rect(0, pageHeight - 12, pageWidth, 12, "F");
          doc.setFontSize(8);
          doc.setTextColor(120, 120, 120);
          const footerText = reportLanguage === "ar-en" 
            ? "KeyRank SEO | Saudi Market Keywords Analysis Report" 
            : "KeyRank SEO | تقرير تحليل الكلمات المفتاحية للسوق السعودي";
          addText(footerText, pageWidth / 2, pageHeight - 5, { align: "center" });
          const pageLabel = reportLanguage === "ar-en" ? `Page ${data.pageNumber}` : `صفحة ${data.pageNumber}`;
          addText(pageLabel, pageWidth - margin, pageHeight - 5, { align: "right" });
        }
      });

      // ===== PAGE 3: Summary & Stats =====
      doc.addPage();

      // Summary header
      doc.setFillColor(99, 102, 241);
      doc.rect(0, 0, pageWidth, 25, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      const summaryTitle = reportLanguage === "ar-en" ? "Report Summary | ملخص التقرير" : "ملخص التقرير";
      addText(summaryTitle, pageWidth / 2, 16, { align: "center" });

      yPosition = 40;

      // Statistics
      const lowComp = uniqueResults.filter((r) => r.competition === "low").length;
      const medComp = uniqueResults.filter((r) => r.competition === "medium").length;
      const highComp = uniqueResults.filter((r) => r.competition === "high").length;
      const avgVolume = Math.round(uniqueResults.reduce((acc, r) => acc + r.searchVolume, 0) / uniqueResults.length);
      const avgCpc = (uniqueResults.reduce((acc, r) => acc + r.cpc, 0) / uniqueResults.length).toFixed(2);
      const upTrend = uniqueResults.filter((r) => r.trend === "up").length;
      const total = uniqueResults.length;

      // Stats boxes
      const boxWidth = 60;
      const boxHeight = 40;
      const boxGap = 15;
      const totalBoxesWidth = boxWidth * 4 + boxGap * 3;
      let boxStartX = (pageWidth - totalBoxesWidth) / 2;

      const stats = reportLanguage === "ar-en" 
        ? [
            { label: "Total Keywords | إجمالي", value: total.toString(), color: [99, 102, 241] },
            { label: "Avg Volume | متوسط البحث", value: avgVolume.toLocaleString("ar-SA"), color: [34, 197, 94] },
            { label: "Avg CPC | متوسط CPC", value: `${avgCpc} SAR`, color: [245, 158, 11] },
            { label: "Trending Up | صاعدة", value: upTrend.toString(), color: [59, 130, 246] },
          ]
        : [
            { label: "إجمالي الكلمات", value: total.toString(), color: [99, 102, 241] },
            { label: "متوسط البحث", value: avgVolume.toLocaleString("ar-SA"), color: [34, 197, 94] },
            { label: "متوسط CPC", value: `${avgCpc} ر.س`, color: [245, 158, 11] },
            { label: "الكلمات الصاعدة", value: upTrend.toString(), color: [59, 130, 246] },
          ];

      stats.forEach((stat, index) => {
        const xPos = boxStartX + index * (boxWidth + boxGap);
        doc.setFillColor(stat.color[0], stat.color[1], stat.color[2]);
        doc.roundedRect(xPos, yPosition, boxWidth, boxHeight, 4, 4, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(18);
        addText(stat.value, xPos + boxWidth / 2, yPosition + 18, { align: "center" });
        doc.setFontSize(9);
        addText(stat.label, xPos + boxWidth / 2, yPosition + 32, { align: "center" });
      });

      yPosition += 60;

      // Competition distribution
      doc.setFontSize(14);
      doc.setTextColor(60, 60, 60);
      const compDistTitle = reportLanguage === "ar-en" ? "Competition Distribution | توزيع المنافسة" : "توزيع المنافسة";
      addText(compDistTitle, pageWidth / 2, yPosition, { align: "center" });
      yPosition += 15;

      const barWidth = 180;
      const barHeight = 18;
      const barStartX = (pageWidth - barWidth) / 2;

      // Progress bars for competition
      const compData = reportLanguage === "ar-en"
        ? [
            { label: "Low | منخفض", count: lowComp, color: [34, 197, 94] },
            { label: "Medium | متوسط", count: medComp, color: [245, 158, 11] },
            { label: "High | مرتفع", count: highComp, color: [239, 68, 68] },
          ]
        : [
            { label: "منخفض", count: lowComp, color: [34, 197, 94] },
            { label: "متوسط", count: medComp, color: [245, 158, 11] },
            { label: "مرتفع", count: highComp, color: [239, 68, 68] },
          ];

      compData.forEach((item, i) => {
        const y = yPosition + (i * 25);
        
        // Background bar
        doc.setFillColor(230, 230, 230);
        doc.roundedRect(barStartX, y, barWidth, barHeight, 3, 3, 'F');
        
        // Progress bar
        const progressWidth = total > 0 ? (item.count / total) * barWidth : 0;
        if (progressWidth > 0) {
          doc.setFillColor(item.color[0], item.color[1], item.color[2]);
          doc.roundedRect(barStartX, y, progressWidth, barHeight, 3, 3, 'F');
        }
        
        // Label
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        addText(`${item.label}: ${item.count} (${Math.round((item.count / total) * 100)}%)`, barStartX - 5, y + 12, { align: 'right' });
      });

      // Footer branding
      doc.setFillColor(99, 102, 241);
      doc.rect(0, pageHeight - 18, pageWidth, 18, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      const brandingText = reportLanguage === "ar-en" 
        ? "KeyRank SEO | Professional Keyword Analysis Tool" 
        : "KeyRank SEO | أداة احترافية لتحليل الكلمات المفتاحية";
      addText(brandingText, pageWidth / 2, pageHeight - 7, { align: "center" });

      // Save the PDF
      const fileName = `KeyRank-SEO-Report-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);

    } catch (error: unknown) {
      console.error('Error generating PDF:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`حدث خطأ أثناء إنشاء التقرير: ${errorMessage}. يرجى المحاولة مرة أخرى.`);
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

        {/* Competitors Section */}
        {analysis?.competitors && analysis.competitors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-12"
          >
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-bold text-xl">المنافسون في السوق</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysis.competitors.map((comp, i) => (
                  <div key={i} className="bg-muted/30 rounded-xl p-4 border border-border/30">
                    <h4 className="font-bold text-primary mb-2">{comp.name}</h4>
                    {comp.website && (
                      <a 
                        href={comp.website.startsWith('http') ? comp.website : `https://${comp.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline block mb-2"
                      >
                        {comp.website}
                      </a>
                    )}
                    {comp.strengths && (
                      <p className="text-sm text-muted-foreground mb-1">
                        <span className="text-green-500 font-medium">نقاط القوة: </span>
                        {comp.strengths}
                      </p>
                    )}
                    {comp.weaknesses && (
                      <p className="text-sm text-muted-foreground">
                        <span className="text-red-500 font-medium">نقاط الضعف: </span>
                        {comp.weaknesses}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
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
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">لغة التقرير:</span>
            <Select value={reportLanguage} onValueChange={(v) => setReportLanguage(v as ReportLanguage)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">عربي فقط</SelectItem>
                <SelectItem value="ar-en">عربي + إنجليزي</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
