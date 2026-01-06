import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Lightbulb,
  Target,
  Calendar,
  BarChart3,
  FileText,
  Users,
} from "lucide-react";
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
  const getCompetitionBadge = (competition: string) => {
    const labels = {
      low: "منخفضة",
      medium: "متوسطة",
      high: "مرتفعة",
    };
    return <span className={`competition-${competition}`}>{labels[competition as keyof typeof labels]}</span>;
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

  const getUniqueResults = () =>
    results.filter((result, index, self) => index === self.findIndex((r) => r.keyword === result.keyword));

  const handleDownloadHTML = async () => {
    const uniqueResults = getUniqueResults();

    if (uniqueResults.length === 0) {
      alert("لا توجد نتائج لتحميلها");
      return;
    }

    const escapeHtml = (value: string) =>
      value
        .split("&").join("&amp;")
        .split("<").join("&lt;")
        .split(">").join("&gt;")
        .split('"').join("&quot;")
        .split("'").join("&#039;");

    const dateStrAr = new Date().toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const rows = uniqueResults
      .map(
        (r, i) => `
          <tr>
            <td>${i + 1}</td>
            <td class="rtl text">${escapeHtml(r.keyword)}</td>
            <td class="rtl text">${escapeHtml(r.seoTitle)}</td>
            <td class="rtl text">${escapeHtml(r.metaDescription)}</td>
            <td>${r.searchVolume.toLocaleString("ar-SA")}</td>
            <td>${escapeHtml(getCompetitionLabelAr(r.competition))}</td>
            <td>${escapeHtml(getIntentLabelAr(r.searchIntent))}</td>
            <td>${r.cpc.toFixed(2)} ر.س</td>
            <td>${escapeHtml(getTrendLabelAr(r.trend))}</td>
            <td class="rtl text">${escapeHtml(r.seoNotes || "استهداف الكلمة في العنوان والوصف مع الروابط الداخلية")}</td>
          </tr>`
      )
      .join("\n");

    const marketOverview = analysis?.marketOverview
      ? `<section class="card">
           <h2>نظرة عامة على السوق</h2>
           <p class="rtl">${escapeHtml(analysis.marketOverview)}</p>
         </section>`
      : "";

    const listBlock = (title: string, items?: string[]) => {
      if (!items || items.length === 0) return "";
      const lis = items
        .slice(0, 6)
        .map((x) => `<li class="rtl">${escapeHtml(x)}</li>`)
        .join("\n");
      return `<section class="card"><h2>${escapeHtml(title)}</h2><ul>${lis}</ul></section>`;
    };

    const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>تقرير تحليل الكلمات المفتاحية - KeyRank</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" />
  <style>
    :root{color-scheme:light;}
    body{font-family:Tajawal, Arial, sans-serif; margin:24px; color:#111827; background:#ffffff;}
    header{border-bottom:2px solid #e5e7eb; padding-bottom:14px; margin-bottom:18px;}
    h1{margin:0 0 6px 0; font-size:22px;}
    .meta{color:#4b5563; font-size:14px;}
    .grid{display:grid; grid-template-columns:1fr; gap:12px; margin:14px 0 18px;}
    .card{border:1px solid #e5e7eb; border-radius:12px; padding:14px; background:#f9fafb;}
    .card h2{margin:0 0 10px 0; font-size:16px;}
    .rtl{direction:rtl; unicode-bidi:plaintext;}
    table{width:100%; border-collapse:collapse; margin-top:10px; font-size:13px;}
    th,td{border:1px solid #e5e7eb; padding:10px; vertical-align:top;}
    th{background:#eef2ff; text-align:center; font-weight:700;}
    td{text-align:center;}
    td.text{ text-align:right; }
    .footer{margin-top:18px; color:#6b7280; font-size:12px; border-top:1px solid #e5e7eb; padding-top:10px;}
    @media print{ body{margin:0.8cm;} .card{break-inside:avoid;} table{font-size:11px;} }
  </style>
</head>
<body>
  <header>
    <h1>تقرير تحليل الكلمات المفتاحية (SEO) - KeyRank</h1>
    <div class="meta">تاريخ التقرير: ${escapeHtml(dateStrAr)} | عدد الكلمات: ${uniqueResults.length}</div>
    <div class="meta">ملاحظة: لطباعة التقرير أو حفظه كـ PDF من المتصفح استخدم (طباعة → حفظ كـ PDF).</div>
  </header>

  <div class="grid">
    ${marketOverview}
    ${listBlock("الفرص", analysis?.opportunities)}
    ${listBlock("التوصيات", analysis?.recommendations)}
    ${listBlock("نصائح موسمية", analysis?.seasonalTips)}
  </div>

  <section>
    <h2 style="margin:0 0 10px 0;">جدول الكلمات المفتاحية</h2>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>الكلمة المفتاحية</th>
          <th>عنوان SEO</th>
          <th>وصف Meta</th>
          <th>حجم البحث</th>
          <th>المنافسة</th>
          <th>نية البحث</th>
          <th>تكلفة النقرة (ر.س)</th>
          <th>الاتجاه</th>
          <th>ملاحظات SEO</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  </section>

  <div class="footer">KeyRank SEO | تقرير تحليل الكلمات المفتاحية للسوق السعودي</div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `KeyRank-SEO-Report-${new Date().toISOString().split("T")[0]}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const getCompetitionLabelAr = (competition: string) => {
    const labels = { low: "منخفض", medium: "متوسط", high: "مرتفع" };
    return labels[competition as keyof typeof labels] || "متوسط";
  };

  const getIntentLabelAr = (intent?: string) => {
    const labels = { commercial: "تجاري", informational: "معلوماتي", transactional: "شرائي" };
    return labels[intent as keyof typeof labels] || "معلوماتي";
  };

  const getTrendLabelAr = (trend: string) => {
    const labels = { up: "صاعد", down: "هابط", stable: "مستقر" };
    return labels[trend as keyof typeof labels] || "مستقر";
  };

  const handleDownloadPDF = async () => {
    try {
      const uniqueResults = getUniqueResults();

      if (uniqueResults.length === 0) {
        alert("لا توجد نتائج لتحميلها");
        return;
      }

      // Create PDF document in landscape for better table display
      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

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
      if (typeof (doc as any).setR2L === "function") (doc as any).setR2L(true);

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const rightX = pageWidth - margin;

      const addText = (text: string | string[], x: number, y: number, options?: any) => {
        if (Array.isArray(text)) {
          doc.text(text.map((t) => shapeArabic(t)), x, y, options);
          return;
        }
        doc.text(shapeArabic(text), x, y, options);
      };

      // ===== PAGE 1: Cover & Overview =====
      doc.setFillColor(99, 102, 241);
      doc.rect(0, 0, pageWidth, 50, "F");
      doc.setFillColor(79, 70, 229);
      doc.rect(0, 40, pageWidth, 15, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(32);
      addText("KeyRank SEO", pageWidth / 2, 22, { align: "center" });

      doc.setFontSize(14);
      addText("تقرير تحليل الكلمات المفتاحية (SEO)", pageWidth / 2, 35, { align: "center" });

      doc.setFontSize(11);
      const dateStrAr = new Date().toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
      addText(`تاريخ التقرير: ${dateStrAr} | عدد الكلمات: ${uniqueResults.length}`, pageWidth / 2, 48, {
        align: "center",
      });

      let yPosition = 70;

      if (analysis?.marketOverview) {
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(margin, yPosition - 5, pageWidth - margin * 2, 35, 3, 3, "F");

        doc.setFontSize(14);
        doc.setTextColor(99, 102, 241);
        addText("نظرة عامة على السوق", rightX, yPosition + 5, { align: "right" });

        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const overviewLines = doc.splitTextToSize(shapeArabic(analysis.marketOverview), pageWidth - margin * 2 - 10);
        addText(overviewLines, rightX, yPosition + 15, { align: "right" });
        yPosition += 45;
      }

      const colWidth = (pageWidth - margin * 3) / 2;

      if (analysis?.opportunities?.length) {
        doc.setFillColor(240, 253, 244);
        doc.roundedRect(margin, yPosition, colWidth, 50, 3, 3, "F");

        doc.setFontSize(12);
        doc.setTextColor(34, 197, 94);
        addText("الفرص", margin + colWidth - 5, yPosition + 10, { align: "right" });

        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        analysis.opportunities.slice(0, 3).forEach((opp, i) => {
          const truncated = opp.length > 60 ? opp.substring(0, 60) + "..." : opp;
          addText(`${i + 1}. ${truncated}`, margin + colWidth - 5, yPosition + 22 + i * 10, { align: "right" });
        });
      }

      if (analysis?.recommendations?.length) {
        doc.setFillColor(239, 246, 255);
        doc.roundedRect(margin + colWidth + margin, yPosition, colWidth, 50, 3, 3, "F");

        doc.setFontSize(12);
        doc.setTextColor(59, 130, 246);
        addText("التوصيات", pageWidth - margin - 5, yPosition + 10, { align: "right" });

        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        analysis.recommendations.slice(0, 3).forEach((rec, i) => {
          const truncated = rec.length > 60 ? rec.substring(0, 60) + "..." : rec;
          addText(`${i + 1}. ${truncated}`, pageWidth - margin - 5, yPosition + 22 + i * 10, { align: "right" });
        });
      }

      yPosition += 60;

      if (analysis?.competitors?.length) {
        doc.setFillColor(254, 243, 199);
        doc.roundedRect(margin, yPosition, pageWidth - margin * 2, 45, 3, 3, "F");

        doc.setFontSize(12);
        doc.setTextColor(217, 119, 6);
        addText("تحليل المنافسين", rightX, yPosition + 10, { align: "right" });

        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        analysis.competitors.slice(0, 3).forEach((comp, i) => {
          const xPos = rightX - i * ((pageWidth - margin * 2 - 10) / 3);
          addText(`${comp.name}`, xPos, yPosition + 22, { align: "right" });
          if (comp.website) {
            doc.setTextColor(99, 102, 241);
            addText(comp.website.substring(0, 25), xPos, yPosition + 30, { align: "right" });
            doc.setTextColor(60, 60, 60);
          }
          if (comp.strengths) addText(`+ ${comp.strengths.substring(0, 30)}`, xPos, yPosition + 38, { align: "right" });
        });
      }

      // ===== PAGE 2: Keywords Table =====
      doc.addPage();

      doc.setFillColor(99, 102, 241);
      doc.rect(0, 0, pageWidth, 18, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      addText("جدول الكلمات المفتاحية", pageWidth / 2, 12, { align: "center" });

      const tableData = uniqueResults.map((r, index) => [
        (index + 1).toString(),
        r.keyword,
        r.seoTitle,
        r.searchVolume.toLocaleString("ar-SA"),
        getCompetitionLabelAr(r.competition),
        getIntentLabelAr(r.searchIntent),
        `${r.cpc.toFixed(2)} ر.س`,
        getTrendLabelAr(r.trend),
        r.seoNotes || "استهداف الكلمة في العنوان والوصف مع الروابط الداخلية",
      ]);

      const tableHeaders = [
        "#",
        "الكلمة المفتاحية",
        "عنوان SEO",
        "حجم البحث",
        "المنافسة",
        "نية البحث",
        "تكلفة النقرة (ر.س)",
        "الاتجاه",
        "ملاحظات SEO",
      ];

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
        alternateRowStyles: { fillColor: [248, 250, 252] },
        columnStyles: {
          0: { cellWidth: 9, halign: "center" },
          1: { cellWidth: 45, halign: "right", fontStyle: "bold" },
          2: { cellWidth: 55, halign: "right" },
          3: { cellWidth: 22, halign: "center" },
          4: { cellWidth: 22, halign: "center" },
          5: { cellWidth: 18, halign: "center" },
          6: { cellWidth: 24, halign: "center" },
          7: { cellWidth: 18, halign: "center" },
          8: { cellWidth: 65, halign: "right" },
        },
        margin: { top: 22, right: margin, bottom: 20, left: margin },
        didParseCell: (data: any) => {
          if (typeof data.cell?.raw === "string") data.cell.text = [shapeArabic(data.cell.raw)];
          data.cell.styles.font = "Tajawal";
        },
        didDrawPage: (data: any) => {
          doc.setFillColor(248, 250, 252);
          doc.rect(0, pageHeight - 12, pageWidth, 12, "F");
          doc.setFontSize(8);
          doc.setTextColor(120, 120, 120);
          addText("KeyRank SEO | تقرير تحليل الكلمات المفتاحية للسوق السعودي", pageWidth / 2, pageHeight - 5, {
            align: "center",
          });
          addText(`صفحة ${data.pageNumber}`, rightX, pageHeight - 5, { align: "right" });
        },
      });

      // ===== PAGE 3: Summary & Stats =====
      doc.addPage();

      doc.setFillColor(99, 102, 241);
      doc.rect(0, 0, pageWidth, 25, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      addText("ملخص التقرير", pageWidth / 2, 16, { align: "center" });

      yPosition = 40;

      const lowComp = uniqueResults.filter((r) => r.competition === "low").length;
      const medComp = uniqueResults.filter((r) => r.competition === "medium").length;
      const highComp = uniqueResults.filter((r) => r.competition === "high").length;
      const avgVolume = Math.round(uniqueResults.reduce((acc, r) => acc + r.searchVolume, 0) / uniqueResults.length);
      const avgCpc = (uniqueResults.reduce((acc, r) => acc + r.cpc, 0) / uniqueResults.length).toFixed(2);
      const upTrend = uniqueResults.filter((r) => r.trend === "up").length;
      const total = uniqueResults.length;

      const boxWidth = 60;
      const boxHeight = 40;
      const boxGap = 15;
      const totalBoxesWidth = boxWidth * 4 + boxGap * 3;
      let boxStartX = (pageWidth - totalBoxesWidth) / 2;

      const stats = [
        { label: "إجمالي الكلمات", value: total.toString(), color: [99, 102, 241] },
        { label: "متوسط البحث", value: avgVolume.toLocaleString("ar-SA"), color: [34, 197, 94] },
        { label: "متوسط تكلفة النقرة", value: `${avgCpc} ر.س`, color: [245, 158, 11] },
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

      doc.setFontSize(14);
      doc.setTextColor(60, 60, 60);
      addText("توزيع المنافسة", pageWidth / 2, yPosition, { align: "center" });
      yPosition += 15;

      const barWidth = 180;
      const barHeight = 18;
      const barStartX = (pageWidth - barWidth) / 2;

      const compData = [
        { label: "منخفض", count: lowComp, color: [34, 197, 94] },
        { label: "متوسط", count: medComp, color: [245, 158, 11] },
        { label: "مرتفع", count: highComp, color: [239, 68, 68] },
      ];

      compData.forEach((item, i) => {
        const y = yPosition + i * 25;

        doc.setFillColor(230, 230, 230);
        doc.roundedRect(barStartX, y, barWidth, barHeight, 3, 3, "F");

        const progressWidth = total > 0 ? (item.count / total) * barWidth : 0;
        if (progressWidth > 0) {
          doc.setFillColor(item.color[0], item.color[1], item.color[2]);
          doc.roundedRect(barStartX, y, progressWidth, barHeight, 3, 3, "F");
        }

        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        addText(`${item.label}: ${item.count} (${Math.round((item.count / total) * 100)}%)`, rightX, y + 12, {
          align: "right",
        });
      });

      doc.setFillColor(99, 102, 241);
      doc.rect(0, pageHeight - 18, pageWidth, 18, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      addText("KeyRank SEO | أداة احترافية لتحليل الكلمات المفتاحية", pageWidth / 2, pageHeight - 7, { align: "center" });

      const fileName = `KeyRank-SEO-Report-${new Date().toISOString().split("T")[0]}.pdf`;
      doc.save(fileName);
    } catch (error: unknown) {
      console.error("Error generating PDF:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert(`حدث خطأ أثناء إنشاء التقرير: ${errorMessage}. يرجى المحاولة مرة أخرى.`);
    }
  };

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
          <Button
            onClick={handleDownloadPDF}
            className="h-14 px-10 text-lg font-bold gradient-bg rounded-xl shadow-glow hover:shadow-soft transition-all duration-300"
          >
            <FileText className="w-5 h-5 ml-2" />
            تنزيل PDF (عربي)
          </Button>

          <Button
            variant="outline"
            onClick={handleDownloadHTML}
            className="h-14 px-10 text-lg font-bold rounded-xl"
          >
            <Download className="w-5 h-5 ml-2" />
            تنزيل HTML (الأوضح للعربية)
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
