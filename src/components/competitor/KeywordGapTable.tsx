import React from "react";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface KeywordGap {
  keyword: string;
  competitorPosition: number;
  searchVolume: number;
  difficulty: number;
  opportunityScore: number;
}

const KeywordGapTable: React.FC<{ gaps: KeywordGap[] }> = ({ gaps }) => {
  const sorted = [...gaps].sort((a, b) => b.opportunityScore - a.opportunityScore);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border">
        <h4 className="font-bold text-foreground">فجوة الكلمات المفتاحية</h4>
        <p className="text-sm text-muted-foreground">كلمات يرتب عليها المنافس ولا تظهر في موقعك</p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-right">الكلمة المفتاحية</TableHead>
              <TableHead className="text-center">ترتيب المنافس</TableHead>
              <TableHead className="text-center">حجم البحث</TableHead>
              <TableHead className="text-center">الصعوبة</TableHead>
              <TableHead className="text-center min-w-[140px]">نقاط الفرصة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((gap, i) => (
              <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium text-right">{gap.keyword}</TableCell>
                <TableCell className="text-center font-semibold">#{gap.competitorPosition}</TableCell>
                <TableCell className="text-center">{gap.searchVolume.toLocaleString()}</TableCell>
                <TableCell className="text-center">{gap.difficulty}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center gap-2">
                    <Progress value={gap.opportunityScore} className="h-2 flex-1" />
                    <span className="text-sm font-bold text-primary">{gap.opportunityScore}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default KeywordGapTable;
