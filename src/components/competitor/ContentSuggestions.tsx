import React from "react";
import { motion } from "framer-motion";
import { FileText, ArrowUpRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Suggestion {
  title: string;
  type: string;
  targetKeywords: string[];
  estimatedTraffic: number;
  priority: string;
}

const typeLabels: Record<string, string> = {
  article: "مقال",
  page: "صفحة",
  guide: "دليل",
  comparison: "مقارنة",
  review: "مراجعة",
};

const priorityStyles: Record<string, string> = {
  high: "bg-red-500/10 text-red-600 border-red-500/20",
  medium: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  low: "bg-blue-500/10 text-blue-600 border-blue-500/20",
};

const priorityLabels: Record<string, string> = {
  high: "عالية",
  medium: "متوسطة",
  low: "منخفضة",
};

const ContentSuggestions: React.FC<{ suggestions: Suggestion[] }> = ({ suggestions }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
      {suggestions.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-start gap-2 flex-1">
              <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-foreground">{s.title}</h5>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">{typeLabels[s.type] || s.type}</Badge>
                  <Badge variant="outline" className={`text-xs ${priorityStyles[s.priority] || ""}`}>
                    أولوية {priorityLabels[s.priority] || s.priority}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-left flex-shrink-0">
              <div className="flex items-center gap-1 text-primary font-bold">
                <ArrowUpRight className="w-4 h-4" />
                {s.estimatedTraffic.toLocaleString()}
              </div>
              <span className="text-xs text-muted-foreground">زيارة/شهر</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {s.targetKeywords.map((kw, ki) => (
              <span key={ki} className="px-2 py-0.5 text-xs bg-muted rounded-full text-muted-foreground">{kw}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ContentSuggestions;
