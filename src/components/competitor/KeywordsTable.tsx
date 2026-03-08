import React from "react";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Keyword {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  searchIntent: string;
  estimatedPosition: number;
  cpc?: number;
}

const intentLabels: Record<string, string> = {
  informational: "معلوماتي",
  commercial: "تجاري",
  transactional: "شرائي",
  navigational: "تنقلي",
};

const intentColors: Record<string, string> = {
  informational: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  commercial: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  transactional: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  navigational: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

const getDifficultyColor = (d: number) => {
  if (d <= 30) return "text-emerald-500";
  if (d <= 60) return "text-amber-500";
  return "text-red-500";
};

const KeywordsTable: React.FC<{ keywords: Keyword[] }> = ({ keywords }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-right">الكلمة المفتاحية</TableHead>
              <TableHead className="text-center">حجم البحث</TableHead>
              <TableHead className="text-center">الصعوبة</TableHead>
              <TableHead className="text-center">نية البحث</TableHead>
              <TableHead className="text-center">الترتيب المقدر</TableHead>
              <TableHead className="text-center">CPC</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keywords.map((kw, i) => (
              <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium text-right">{kw.keyword}</TableCell>
                <TableCell className="text-center font-semibold">{kw.searchVolume.toLocaleString()}</TableCell>
                <TableCell className="text-center">
                  <span className={`font-bold ${getDifficultyColor(kw.difficulty)}`}>{kw.difficulty}</span>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className={intentColors[kw.searchIntent] || ""}>
                    {intentLabels[kw.searchIntent] || kw.searchIntent}
                  </Badge>
                </TableCell>
                <TableCell className="text-center font-semibold">#{kw.estimatedPosition}</TableCell>
                <TableCell className="text-center">${kw.cpc?.toFixed(2) || "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default KeywordsTable;
