import React from "react";
import { Globe, TrendingUp, FileText, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
  overview: {
    domain: string;
    estimatedAuthority: number;
    mainTopics: string[];
    contentQuality: string;
    estimatedMonthlyTraffic: string;
  };
  meta: { analysisType: string; scrapedPages: number };
}

const qualityLabels: Record<string, string> = {
  low: "منخفضة",
  medium: "متوسطة",
  high: "عالية",
  excellent: "ممتازة",
};

const CompetitorOverviewCard: React.FC<Props> = ({ overview, meta }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
        <Globe className="w-5 h-5 text-primary" />
        نظرة عامة على المنافس
      </h4>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">الدومين</span>
          <span className="font-mono text-sm font-bold" dir="ltr">{overview.domain}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">قوة الدومين</span>
          <span className="font-bold text-primary">{overview.estimatedAuthority}/100</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">الحركة الشهرية</span>
          <span className="font-bold">{overview.estimatedMonthlyTraffic}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">جودة المحتوى</span>
          <Badge variant="outline">{qualityLabels[overview.contentQuality] || overview.contentQuality}</Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">نوع التحليل</span>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {meta.analysisType === "deep" ? `عميق (${meta.scrapedPages} صفحة)` : "سريع"}
          </Badge>
        </div>
        <div>
          <span className="text-sm text-muted-foreground block mb-1.5">المواضيع الرئيسية</span>
          <div className="flex flex-wrap gap-1.5">
            {overview.mainTopics.map((t, i) => (
              <span key={i} className="px-2 py-0.5 text-xs bg-muted rounded-full">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorOverviewCard;
