import React from "react";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface Opportunity {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  trafficPotential: number;
  reason: string;
}

const OpportunitiesTable: React.FC<{ opportunities: Opportunity[] }> = ({ opportunities }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-500" />
        <div>
          <h4 className="font-bold text-foreground">فرص الترتيب السهلة</h4>
          <p className="text-sm text-muted-foreground">كلمات مفتاحية منخفضة المنافسة وعالية الحركة</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-right">الكلمة المفتاحية</TableHead>
              <TableHead className="text-center">حجم البحث</TableHead>
              <TableHead className="text-center">الصعوبة</TableHead>
              <TableHead className="text-center">الحركة المتوقعة</TableHead>
              <TableHead className="text-right">السبب</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {opportunities.map((op, i) => (
              <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium text-right">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    {op.keyword}
                  </div>
                </TableCell>
                <TableCell className="text-center font-semibold">{op.searchVolume.toLocaleString()}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                    {op.difficulty}
                  </Badge>
                </TableCell>
                <TableCell className="text-center font-semibold text-primary">{op.trafficPotential.toLocaleString()}</TableCell>
                <TableCell className="text-right text-sm text-muted-foreground max-w-[200px]">{op.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default OpportunitiesTable;
