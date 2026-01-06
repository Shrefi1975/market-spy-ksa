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
  Users,
} from "lucide-react";
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

  // Calculate visual metrics for progress bars
  const calculateVisualMetrics = () => {
    const uniqueResults = getUniqueResults();
    if (uniqueResults.length === 0) return { opportunity: 0, competition: 0, difficulty: 0 };

    const lowComp = uniqueResults.filter((r) => r.competition === "low").length;
    const highComp = uniqueResults.filter((r) => r.competition === "high").length;
    const upTrend = uniqueResults.filter((r) => r.trend === "up").length;
    const total = uniqueResults.length;

    // Opportunity score: based on low competition + upward trends
    const opportunityScore = Math.round(((lowComp * 2 + upTrend) / (total * 3)) * 100);
    
    // Competition level: based on high competition keywords
    const competitionLevel = Math.round((highComp / total) * 100);
    
    // Difficulty: inverse of opportunity, affected by high competition
    const difficultyScore = Math.round(((highComp * 2 + (total - upTrend)) / (total * 3)) * 100);

    return {
      opportunity: Math.min(100, Math.max(0, opportunityScore + 30)), // Boost for better visualization
      competition: Math.min(100, Math.max(0, competitionLevel + 20)),
      difficulty: Math.min(100, Math.max(0, difficultyScore)),
    };
  };

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

    const metrics = calculateVisualMetrics();

    const rows = uniqueResults
      .map(
        (r, i) => `
          <tr>
            <td class="num">${i + 1}</td>
            <td class="rtl text keyword">${escapeHtml(r.keyword)}</td>
            <td class="rtl text">${escapeHtml(r.seoTitle)}</td>
            <td class="rtl text">${escapeHtml(r.metaDescription)}</td>
            <td class="num">${r.searchVolume.toLocaleString("ar-SA")}</td>
            <td class="competition-${r.competition}">${escapeHtml(getCompetitionLabelAr(r.competition))}</td>
            <td class="intent">${escapeHtml(getIntentLabelAr(r.searchIntent))}</td>
            <td class="num">${r.cpc.toFixed(2)} ر.س</td>
            <td class="trend-${r.trend}">${escapeHtml(getTrendLabelAr(r.trend))}</td>
            <td class="rtl text notes">${escapeHtml(r.seoNotes || "استهداف الكلمة في العنوان والوصف مع الروابط الداخلية")}</td>
          </tr>`
      )
      .join("\n");

    const marketOverview = analysis?.marketOverview
      ? `<section class="card market-overview">
           <div class="card-header">
             <div class="card-icon market-icon">📊</div>
             <h2>نظرة عامة على السوق</h2>
           </div>
           <p class="rtl">${escapeHtml(analysis.marketOverview)}</p>
         </section>`
      : "";

    const listBlock = (title: string, items?: string[], icon?: string, colorClass?: string) => {
      if (!items || items.length === 0) return "";
      const lis = items
        .slice(0, 6)
        .map((x) => `<li class="rtl">${escapeHtml(x)}</li>`)
        .join("\n");
      return `<section class="card ${colorClass || ''}">
        <div class="card-header">
          <div class="card-icon">${icon || '📌'}</div>
          <h2>${escapeHtml(title)}</h2>
        </div>
        <ul>${lis}</ul>
      </section>`;
    };

    const competitorsSection = analysis?.competitors && analysis.competitors.length > 0
      ? `<section class="card competitors-section">
           <div class="card-header">
             <div class="card-icon competitors-icon">🏆</div>
             <h2>تحليل المنافسين</h2>
           </div>
           <div class="competitors-grid">
             ${analysis.competitors.slice(0, 6).map((comp) => `
               <div class="competitor-card">
                 <h4>${escapeHtml(comp.name)}</h4>
                 ${comp.website ? `<a href="${comp.website.startsWith('http') ? comp.website : 'https://' + comp.website}" class="comp-website">${escapeHtml(comp.website)}</a>` : ''}
                 ${comp.strengths ? `<p class="strength"><span class="label">✓ نقاط القوة:</span> ${escapeHtml(comp.strengths)}</p>` : ''}
                 ${comp.weaknesses ? `<p class="weakness"><span class="label">✗ نقاط الضعف:</span> ${escapeHtml(comp.weaknesses)}</p>` : ''}
               </div>
             `).join('\n')}
           </div>
         </section>`
      : "";

    // Visual Analysis Section with Progress Bars
    const visualAnalysisSection = `
      <section class="card visual-analysis">
        <div class="card-header">
          <div class="card-icon visual-icon">📈</div>
          <h2>التحليل البصري للمؤشرات</h2>
        </div>
        <div class="progress-container">
          <!-- Opportunity Progress -->
          <div class="progress-item">
            <div class="progress-label">
              <span class="progress-title">نسبة الفرصة</span>
              <span class="progress-value">${metrics.opportunity}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill opportunity" style="width: ${metrics.opportunity}%"></div>
            </div>
            <p class="progress-desc">تقييم الفرص المتاحة بناءً على الكلمات ذات المنافسة المنخفضة والاتجاه الصاعد</p>
          </div>
          
          <!-- Competition Progress -->
          <div class="progress-item">
            <div class="progress-label">
              <span class="progress-title">مستوى المنافسة</span>
              <span class="progress-value">${metrics.competition}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill competition" style="width: ${metrics.competition}%"></div>
            </div>
            <p class="progress-desc">مستوى التنافسية في السوق المستهدف للكلمات المحللة</p>
          </div>
          
          <!-- Difficulty Progress -->
          <div class="progress-item">
            <div class="progress-label">
              <span class="progress-title">درجة الصعوبة</span>
              <span class="progress-value">${metrics.difficulty}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill difficulty" style="width: ${metrics.difficulty}%"></div>
            </div>
            <p class="progress-desc">صعوبة التصدر في نتائج البحث للكلمات المختارة</p>
          </div>
        </div>
      </section>`;

    const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>تقرير تحليل الكلمات المفتاحية - KeyRank</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;600;700;800&display=swap" />
  <style>
    /* ===== CSS Variables & Theme ===== */
    :root {
      --primary: #6366f1;
      --primary-light: #818cf8;
      --primary-dark: #4f46e5;
      --secondary: #0ea5e9;
      --secondary-light: #38bdf8;
      --success: #10b981;
      --success-light: #34d399;
      --warning: #f59e0b;
      --warning-light: #fbbf24;
      --danger: #ef4444;
      --danger-light: #f87171;
      --bg-primary: #ffffff;
      --bg-secondary: #f8fafc;
      --bg-tertiary: #f1f5f9;
      --text-primary: #0f172a;
      --text-secondary: #475569;
      --text-muted: #64748b;
      --border: #e2e8f0;
      --border-light: #f1f5f9;
      --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      --radius: 12px;
      --radius-lg: 16px;
    }

    /* ===== Base Styles ===== */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      font-family: 'Tajawal', Arial, sans-serif;
      background: var(--bg-secondary);
      color: var(--text-primary);
      line-height: 1.7;
      direction: rtl;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 24px;
    }

    /* ===== Header with Logo ===== */
    header {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      color: white;
      padding: 32px 24px;
      border-radius: var(--radius-lg);
      margin-bottom: 24px;
      box-shadow: var(--shadow-lg);
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    /* ===== SVG Logo ===== */
    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-svg {
      width: 56px;
      height: 56px;
      flex-shrink: 0;
    }

    .logo-text {
      display: flex;
      flex-direction: column;
    }

    .logo-name {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.5px;
      line-height: 1.2;
    }

    .logo-tagline {
      font-size: 12px;
      opacity: 0.9;
      font-weight: 500;
    }

    .header-info {
      margin-right: auto;
      text-align: left;
    }

    .report-title {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .report-meta {
      font-size: 14px;
      opacity: 0.9;
    }

    /* ===== Cards Grid ===== */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    }

    .card {
      background: var(--bg-primary);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 20px;
      box-shadow: var(--shadow-sm);
      transition: box-shadow 0.2s ease;
    }

    .card:hover {
      box-shadow: var(--shadow);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .card-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
    }

    .card h2 {
      font-size: 18px;
      font-weight: 700;
      color: var(--text-primary);
    }

    .card p {
      color: var(--text-secondary);
      font-size: 14px;
      line-height: 1.8;
    }

    .card ul {
      list-style: none;
      padding: 0;
    }

    .card ul li {
      padding: 8px 0;
      padding-right: 24px;
      position: relative;
      color: var(--text-secondary);
      font-size: 14px;
      border-bottom: 1px solid var(--border-light);
    }

    .card ul li:last-child {
      border-bottom: none;
    }

    .card ul li::before {
      content: "✓";
      position: absolute;
      right: 0;
      color: var(--success);
      font-weight: bold;
    }

    /* ===== Card Color Variations ===== */
    .market-overview .card-icon.market-icon { background: linear-gradient(135deg, #818cf8 0%, #6366f1 100%); }
    .opportunities .card-icon { background: linear-gradient(135deg, #34d399 0%, #10b981 100%); }
    .recommendations .card-icon { background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%); }
    .seasonal-tips .card-icon { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); }

    .opportunities ul li::before { color: var(--success); }
    .recommendations ul li::before { color: var(--secondary); content: "◆"; }
    .seasonal-tips ul li::before { color: var(--warning); content: "★"; }

    /* ===== Competitors Section ===== */
    .competitors-section {
      grid-column: 1 / -1;
    }

    .competitors-icon { background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); }

    .competitors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    }

    .competitor-card {
      background: var(--bg-tertiary);
      border-radius: var(--radius);
      padding: 16px;
      border: 1px solid var(--border-light);
    }

    .competitor-card h4 {
      font-size: 16px;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 8px;
    }

    .comp-website {
      display: block;
      font-size: 13px;
      color: var(--secondary);
      text-decoration: none;
      margin-bottom: 8px;
    }

    .competitor-card p {
      font-size: 13px;
      margin-bottom: 4px;
    }

    .competitor-card .label {
      font-weight: 600;
    }

    .strength .label { color: var(--success); }
    .weakness .label { color: var(--danger); }

    /* ===== Table Section ===== */
    .table-section {
      background: var(--bg-primary);
      border-radius: var(--radius-lg);
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: var(--shadow);
      overflow: hidden;
    }

    .table-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }

    .table-header h2 {
      font-size: 20px;
      font-weight: 700;
    }

    .table-wrapper {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      min-width: 900px;
    }

    th, td {
      padding: 14px 12px;
      border: 1px solid var(--border);
      vertical-align: middle;
    }

    th {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      color: white;
      font-weight: 700;
      text-align: center;
      font-size: 13px;
      white-space: nowrap;
    }

    td {
      background: var(--bg-primary);
    }

    tr:nth-child(even) td {
      background: var(--bg-secondary);
    }

    tr:hover td {
      background: #eef2ff;
    }

    td.text { text-align: right; }
    td.num { text-align: center; font-weight: 600; }
    td.keyword { color: var(--primary); font-weight: 700; }
    td.notes { font-size: 12px; color: var(--text-muted); }
    td.intent { text-align: center; }

    /* ===== Competition & Trend Badges ===== */
    td.competition-low {
      background: #dcfce7 !important;
      color: #166534;
      font-weight: 600;
      text-align: center;
    }

    td.competition-medium {
      background: #fef3c7 !important;
      color: #92400e;
      font-weight: 600;
      text-align: center;
    }

    td.competition-high {
      background: #fee2e2 !important;
      color: #991b1b;
      font-weight: 600;
      text-align: center;
    }

    td.trend-up {
      color: var(--success);
      font-weight: 600;
      text-align: center;
    }

    td.trend-down {
      color: var(--danger);
      font-weight: 600;
      text-align: center;
    }

    td.trend-stable {
      color: var(--text-muted);
      font-weight: 600;
      text-align: center;
    }

    /* ===== Visual Analysis Section ===== */
    .visual-analysis {
      grid-column: 1 / -1;
      margin-top: 24px;
    }

    .visual-icon { background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%); }

    .progress-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-top: 8px;
    }

    .progress-item {
      padding: 16px;
      background: var(--bg-secondary);
      border-radius: var(--radius);
      border: 1px solid var(--border-light);
    }

    .progress-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .progress-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--text-primary);
    }

    .progress-value {
      font-size: 20px;
      font-weight: 800;
      color: var(--primary);
    }

    .progress-bar {
      height: 16px;
      background: var(--border);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 10px;
    }

    .progress-fill {
      height: 100%;
      border-radius: 8px;
      transition: width 0.5s ease;
    }

    .progress-fill.opportunity {
      background: linear-gradient(90deg, #34d399 0%, #10b981 100%);
    }

    .progress-fill.competition {
      background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%);
    }

    .progress-fill.difficulty {
      background: linear-gradient(90deg, #f87171 0%, #ef4444 100%);
    }

    .progress-desc {
      font-size: 12px;
      color: var(--text-muted);
      line-height: 1.6;
    }

    /* ===== Footer ===== */
    footer {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      color: white;
      padding: 24px;
      border-radius: var(--radius-lg);
      margin-top: 24px;
      text-align: center;
    }

    .footer-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .footer-logo svg {
      width: 32px;
      height: 32px;
    }

    .footer-logo span {
      font-size: 18px;
      font-weight: 700;
    }

    footer p {
      font-size: 14px;
      opacity: 0.9;
    }

    /* ===== Responsive Design ===== */
    @media screen and (max-width: 768px) {
      .container {
        padding: 16px;
      }

      header {
        padding: 20px 16px;
      }

      .header-content {
        flex-direction: column;
        text-align: center;
      }

      .logo {
        justify-content: center;
      }

      .header-info {
        margin-right: 0;
        text-align: center;
      }

      .report-title {
        font-size: 18px;
      }

      .cards-grid {
        grid-template-columns: 1fr;
      }

      .table-section {
        padding: 16px;
        border-radius: var(--radius);
      }

      table {
        font-size: 11px;
      }

      th, td {
        padding: 10px 8px;
      }

      .progress-container {
        grid-template-columns: 1fr;
      }

      footer {
        padding: 20px 16px;
      }
    }

    @media screen and (max-width: 480px) {
      .logo-name {
        font-size: 22px;
      }

      .logo-svg {
        width: 44px;
        height: 44px;
      }

      .card {
        padding: 16px;
      }

      .card h2 {
        font-size: 16px;
      }

      .competitor-card {
        padding: 12px;
      }
    }

    /* ===== Print Styles ===== */
    @media print {
      body {
        background: white;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .container {
        max-width: 100%;
        padding: 0;
      }

      header, footer {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .card {
        break-inside: avoid;
        page-break-inside: avoid;
      }

      table {
        font-size: 10px;
      }

      th, td {
        padding: 8px 6px;
      }

      .progress-fill {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }

    /* ===== RTL Support ===== */
    .rtl {
      direction: rtl;
      unicode-bidi: plaintext;
      text-align: right;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header with Logo -->
    <header>
      <div class="header-content">
        <div class="logo">
          <!-- KeyRank SVG Logo -->
          <svg class="logo-svg" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Background Circle -->
            <circle cx="28" cy="28" r="26" fill="white" fill-opacity="0.15"/>
            <circle cx="28" cy="28" r="22" fill="white" fill-opacity="0.1"/>
            
            <!-- Key Shape -->
            <path d="M20 20C20 15.5817 23.5817 12 28 12C32.4183 12 36 15.5817 36 20C36 23.0324 34.3168 25.6772 31.8284 27.1716L33 42H23L24.1716 27.1716C21.6832 25.6772 20 23.0324 20 20Z" fill="white"/>
            <circle cx="28" cy="20" r="4" fill="#6366f1"/>
            
            <!-- Ranking Bars -->
            <rect x="38" y="32" width="6" height="12" rx="1" fill="white" fill-opacity="0.9"/>
            <rect x="38" y="26" width="6" height="6" rx="1" fill="white" fill-opacity="0.6"/>
            <rect x="12" y="36" width="6" height="8" rx="1" fill="white" fill-opacity="0.7"/>
            <rect x="12" y="30" width="6" height="6" rx="1" fill="white" fill-opacity="0.4"/>
            
            <!-- Trend Arrow -->
            <path d="M40 24L44 20M44 20L44 23M44 20L41 20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="logo-text">
            <span class="logo-name">KeyRank</span>
            <span class="logo-tagline">تحليل الكلمات المفتاحية</span>
          </div>
        </div>
        <div class="header-info">
          <div class="report-title">تقرير تحليل SEO</div>
          <div class="report-meta">${escapeHtml(dateStrAr)} | ${uniqueResults.length} كلمة مفتاحية</div>
        </div>
      </div>
    </header>

    <!-- Analysis Cards -->
    <div class="cards-grid">
      ${marketOverview}
      ${listBlock("الفرص", analysis?.opportunities, "🎯", "opportunities")}
      ${listBlock("التوصيات", analysis?.recommendations, "💡", "recommendations")}
      ${listBlock("نصائح موسمية", analysis?.seasonalTips, "📅", "seasonal-tips")}
      ${competitorsSection}
    </div>

    <!-- Keywords Table -->
    <section class="table-section">
      <div class="table-header">
        <div class="card-icon">📋</div>
        <h2>جدول الكلمات المفتاحية</h2>
      </div>
      <div class="table-wrapper">
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
              <th>تكلفة النقرة</th>
              <th>الاتجاه</th>
              <th>ملاحظات SEO</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    </section>

    <!-- Visual Analysis Section -->
    ${visualAnalysisSection}

    <!-- Footer -->
    <footer>
      <div class="footer-logo">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" fill="white" fill-opacity="0.2"/>
          <path d="M12 12C12 9.79086 13.7909 8 16 8C18.2091 8 20 9.79086 20 12C20 13.6569 18.8284 15.0711 17.2426 15.6569L18 24H14L14.7574 15.6569C13.1716 15.0711 12 13.6569 12 12Z" fill="white"/>
          <circle cx="16" cy="12" r="2" fill="#6366f1"/>
        </svg>
        <span>KeyRank</span>
      </div>
      <p>أداة احترافية لتحليل الكلمات المفتاحية للسوق السعودي والعربي</p>
    </footer>
  </div>
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
          className="flex items-center justify-center mt-8"
        >
          <Button
            onClick={handleDownloadHTML}
            className="h-14 px-10 text-lg font-bold gradient-bg rounded-xl shadow-glow hover:shadow-soft transition-all duration-300"
          >
            <Download className="w-5 h-5 ml-2" />
            تنزيل التقرير
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
