import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, FileText } from "lucide-react";

interface ContentData {
  totalPages: number;
  avgContentLength: number;
  topTopics: string[];
  contentStrengths: string[];
  contentWeaknesses: string[];
}

const CompetitorContentAnalysis: React.FC<{ content: ContentData }> = ({ content }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <FileText className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{content.totalPages}</div>
          <div className="text-sm text-muted-foreground">عدد الصفحات</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <FileText className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{content.avgContentLength.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">متوسط طول المحتوى (كلمة)</div>
        </div>
      </div>

      {/* Topics */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h5 className="font-bold text-foreground mb-3">المواضيع الرئيسية</h5>
        <div className="flex flex-wrap gap-2">
          {content.topTopics.map((t, i) => (
            <span key={i} className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full border border-primary/20">{t}</span>
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid md:grid-cols-2 gap-3">
        <div className="bg-card border border-border rounded-xl p-4">
          <h5 className="font-bold text-emerald-600 mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> نقاط القوة
          </h5>
          <ul className="space-y-2">
            {content.contentStrengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <h5 className="font-bold text-red-600 mb-3 flex items-center gap-1.5">
            <XCircle className="w-4 h-4" /> نقاط الضعف
          </h5>
          <ul className="space-y-2">
            {content.contentWeaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default CompetitorContentAnalysis;
