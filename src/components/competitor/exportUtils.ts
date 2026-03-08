import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { CompetitorAnalysisData } from "./CompetitorResults";

export function exportCompetitorCSV(data: CompetitorAnalysisData, domain: string) {
  const rows: string[][] = [];

  // Keywords
  rows.push(["=== الكلمات المفتاحية ==="]);
  rows.push(["الكلمة", "حجم البحث", "الصعوبة", "نية البحث", "الترتيب", "CPC"]);
  data.keywords.forEach((k) => {
    rows.push([k.keyword, String(k.searchVolume), String(k.difficulty), k.searchIntent, String(k.estimatedPosition), String(k.cpc || 0)]);
  });

  rows.push([""]);
  rows.push(["=== فجوة الكلمات ==="]);
  rows.push(["الكلمة", "ترتيب المنافس", "حجم البحث", "الصعوبة", "نقاط الفرصة"]);
  data.keywordGap.forEach((g) => {
    rows.push([g.keyword, String(g.competitorPosition), String(g.searchVolume), String(g.difficulty), String(g.opportunityScore)]);
  });

  rows.push([""]);
  rows.push(["=== الفرص السهلة ==="]);
  rows.push(["الكلمة", "حجم البحث", "الصعوبة", "الحركة المتوقعة", "السبب"]);
  data.easyOpportunities.forEach((o) => {
    rows.push([o.keyword, String(o.searchVolume), String(o.difficulty), String(o.trafficPotential), o.reason]);
  });

  rows.push([""]);
  rows.push(["=== اقتراحات المحتوى ==="]);
  rows.push(["العنوان", "النوع", "الكلمات المستهدفة", "الحركة المتوقعة", "الأولوية"]);
  data.contentSuggestions.forEach((s) => {
    rows.push([s.title, s.type, s.targetKeywords.join(" | "), String(s.estimatedTraffic), s.priority]);
  });

  const csvContent = "\uFEFF" + rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `competitor-analysis-${domain}-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportCompetitorPDF(
  data: CompetitorAnalysisData,
  meta: { competitorDomain: string; userDomain: string | null; country: string; analysisType: string }
) {
  const doc = new jsPDF({ orientation: "landscape" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(`Competitor Analysis: ${meta.competitorDomain}`, 14, 20);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Analysis Type: ${meta.analysisType} | Date: ${new Date().toLocaleDateString()}`, 14, 28);

  // SEO Score
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`SEO Opportunity Score: ${data.seoScore.overall}/100`, 14, 38);

  // Keywords table
  autoTable(doc, {
    startY: 44,
    head: [["Keyword", "Search Vol", "Difficulty", "Intent", "Position", "CPC"]],
    body: data.keywords.map((k) => [
      k.keyword,
      k.searchVolume.toLocaleString(),
      String(k.difficulty),
      k.searchIntent,
      `#${k.estimatedPosition}`,
      `$${k.cpc?.toFixed(2) || "0"}`,
    ]),
    styles: { fontSize: 8 },
    headStyles: { fillColor: [220, 38, 38] },
  });

  // Gap table on new page
  doc.addPage();
  doc.setFontSize(14);
  doc.text("Keyword Gap Analysis", 14, 20);

  autoTable(doc, {
    startY: 26,
    head: [["Keyword", "Competitor Rank", "Search Vol", "Difficulty", "Opportunity"]],
    body: data.keywordGap.map((g) => [
      g.keyword,
      `#${g.competitorPosition}`,
      g.searchVolume.toLocaleString(),
      String(g.difficulty),
      `${g.opportunityScore}/100`,
    ]),
    styles: { fontSize: 8 },
    headStyles: { fillColor: [37, 99, 235] },
  });

  // Easy opportunities
  doc.addPage();
  doc.setFontSize(14);
  doc.text("Easy Ranking Opportunities", 14, 20);

  autoTable(doc, {
    startY: 26,
    head: [["Keyword", "Search Vol", "Difficulty", "Traffic Potential", "Reason"]],
    body: data.easyOpportunities.map((o) => [
      o.keyword,
      o.searchVolume.toLocaleString(),
      String(o.difficulty),
      o.trafficPotential.toLocaleString(),
      o.reason,
    ]),
    styles: { fontSize: 8 },
    headStyles: { fillColor: [16, 185, 129] },
  });

  doc.save(`competitor-analysis-${meta.competitorDomain}-${new Date().toISOString().split("T")[0]}.pdf`);
}
