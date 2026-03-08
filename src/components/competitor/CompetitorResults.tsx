import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Target, TrendingUp, FileText, Shield, Download, Lightbulb, Layers } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KeywordsTable from "./KeywordsTable";
import KeywordGapTable from "./KeywordGapTable";
import OpportunitiesTable from "./OpportunitiesTable";
import ContentSuggestions from "./ContentSuggestions";
import CompetitorOverviewCard from "./CompetitorOverviewCard";
import SeoScoreCard from "./SeoScoreCard";
import CompetitorContentAnalysis from "./CompetitorContentAnalysis";
import { exportCompetitorCSV, exportCompetitorPDF } from "./exportUtils";

export interface CompetitorAnalysisData {
  competitorOverview: {
    domain: string;
    estimatedAuthority: number;
    mainTopics: string[];
    contentQuality: string;
    estimatedMonthlyTraffic: string;
  };
  keywords: Array<{
    keyword: string;
    searchVolume: number;
    difficulty: number;
    searchIntent: string;
    estimatedPosition: number;
    cpc?: number;
  }>;
  keywordGap: Array<{
    keyword: string;
    competitorPosition: number;
    searchVolume: number;
    difficulty: number;
    opportunityScore: number;
  }>;
  easyOpportunities: Array<{
    keyword: string;
    searchVolume: number;
    difficulty: number;
    trafficPotential: number;
    reason: string;
  }>;
  contentSuggestions: Array<{
    title: string;
    type: string;
    targetKeywords: string[];
    estimatedTraffic: number;
    priority: string;
  }>;
  competitorContent: {
    totalPages: number;
    avgContentLength: number;
    topTopics: string[];
    contentStrengths: string[];
    contentWeaknesses: string[];
  };
  seoScore: {
    overall: number;
    trafficPotential: number;
    competitionLevel: number;
    contentGap: number;
    quickWins: number;
  };
}

interface CompetitorResultsProps {
  data: CompetitorAnalysisData;
  meta: {
    analysisType: string;
    scrapedPages: number;
    competitorDomain: string;
    userDomain: string | null;
    country: string;
  };
}

const CompetitorResults: React.FC<CompetitorResultsProps> = ({ data, meta }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleExportCSV = () => exportCompetitorCSV(data, meta.competitorDomain);
  const handleExportPDF = () => exportCompetitorPDF(data, meta);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-8"
    >
      {/* Export Buttons */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-foreground">
          نتائج تحليل: <span className="text-primary" dir="ltr">{meta.competitorDomain}</span>
        </h3>
        <div className="flex gap-2">
          <button onClick={handleExportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors">
            <Download className="w-4 h-4" /> CSV
          </button>
          <button onClick={handleExportPDF} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            <Download className="w-4 h-4" /> PDF
          </button>
        </div>
      </div>

      {/* Score + Overview Row */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <SeoScoreCard score={data.seoScore} />
        <CompetitorOverviewCard overview={data.competitorOverview} meta={meta} />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl">
        <TabsList className="w-full flex flex-wrap gap-1 bg-muted/50 p-1 rounded-xl h-auto">
          <TabsTrigger value="overview" className="flex items-center gap-1.5 text-xs md:text-sm">
            <BarChart3 className="w-3.5 h-3.5" /> الكلمات المفتاحية
          </TabsTrigger>
          <TabsTrigger value="gap" className="flex items-center gap-1.5 text-xs md:text-sm">
            <Target className="w-3.5 h-3.5" /> فجوة الكلمات
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="flex items-center gap-1.5 text-xs md:text-sm">
            <TrendingUp className="w-3.5 h-3.5" /> فرص سهلة
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-1.5 text-xs md:text-sm">
            <FileText className="w-3.5 h-3.5" /> اقتراحات المحتوى
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-1.5 text-xs md:text-sm">
            <Layers className="w-3.5 h-3.5" /> تحليل المحتوى
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="overview" className="mt-4">
            <KeywordsTable keywords={data.keywords} />
          </TabsContent>
          <TabsContent value="gap" className="mt-4">
            <KeywordGapTable gaps={data.keywordGap} />
          </TabsContent>
          <TabsContent value="opportunities" className="mt-4">
            <OpportunitiesTable opportunities={data.easyOpportunities} />
          </TabsContent>
          <TabsContent value="content" className="mt-4">
            <ContentSuggestions suggestions={data.contentSuggestions} />
          </TabsContent>
          <TabsContent value="analysis" className="mt-4">
            <CompetitorContentAnalysis content={data.competitorContent} />
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};

export default CompetitorResults;
