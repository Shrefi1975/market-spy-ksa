import React from "react";
import { motion } from "framer-motion";

interface Score {
  overall: number;
  trafficPotential: number;
  competitionLevel: number;
  contentGap: number;
  quickWins: number;
}

const metrics = [
  { key: "trafficPotential", label: "إمكانية الحركة", color: "bg-emerald-500" },
  { key: "competitionLevel", label: "مستوى المنافسة", color: "bg-amber-500" },
  { key: "contentGap", label: "فجوة المحتوى", color: "bg-blue-500" },
  { key: "quickWins", label: "مكاسب سريعة", color: "bg-purple-500" },
] as const;

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-emerald-500";
  if (score >= 60) return "text-amber-500";
  if (score >= 40) return "text-orange-500";
  return "text-red-500";
};

const SeoScoreCard: React.FC<{ score: Score }> = ({ score }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h4 className="font-bold text-foreground mb-4">نقاط الفرصة SEO</h4>

      {/* Main Score */}
      <div className="flex items-center justify-center mb-5">
        <div className="relative w-28 h-28">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
            <motion.circle
              cx="60" cy="60" r="52" fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 52}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - score.overall / 100) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor(score.overall)}`}>{score.overall}</span>
            <span className="text-xs text-muted-foreground">من 100</span>
          </div>
        </div>
      </div>

      {/* Sub metrics */}
      <div className="space-y-3">
        {metrics.map(({ key, label, color }) => (
          <div key={key}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-bold">{score[key]}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${color}`}
                initial={{ width: 0 }}
                animate={{ width: `${score[key]}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeoScoreCard;
