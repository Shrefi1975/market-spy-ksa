import React from "react";
import { Info, Lightbulb, TrendingUp, Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ToolTipHintProps {
  text: string;
  icon?: "info" | "tip" | "trend" | "zap";
}

const iconMap = {
  info: Info,
  tip: Lightbulb,
  trend: TrendingUp,
  zap: Zap,
};

export const ToolTipHint: React.FC<ToolTipHintProps> = ({ text, icon = "info" }) => {
  const Icon = iconMap[icon];
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-muted hover:bg-muted/80 transition-colors mr-1">
            <Icon className="w-3 h-3 text-muted-foreground" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs text-right text-xs leading-relaxed">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface BenefitBannerProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const BenefitBanner: React.FC<BenefitBannerProps> = ({ icon, title, description }) => (
  <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <p className="font-semibold text-sm text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
    </div>
  </div>
);

interface UsageHintProps {
  hints: string[];
}

export const UsageHints: React.FC<UsageHintProps> = ({ hints }) => (
  <div className="flex flex-wrap gap-2">
    {hints.map((hint, i) => (
      <div key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted/60 border border-border rounded-full text-xs text-muted-foreground">
        <Lightbulb className="w-3 h-3 text-primary" />
        {hint}
      </div>
    ))}
  </div>
);
