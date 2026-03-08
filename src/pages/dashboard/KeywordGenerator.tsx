import React, { useState } from "react";
import { Search, Loader2, Download, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { arabCountries, getCountryByCode } from "@/data/arabCountries";
import ArabCountrySelector from "@/components/ArabCountrySelector";

const KeywordGenerator: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [country, setCountry] = useState("sa");
  const [intent, setIntent] = useState("all");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const selectedCountry = getCountryByCode(country);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({ title: "أدخل الموضوع", variant: "destructive" });
      return;
    }
    setLoading(true);
    setResults(null);
    try {
      const { data, error } = await supabase.functions.invoke('seo-tools', {
        body: {
          tool: 'keyword-generator',
          topic,
          country,
          countryNameAr: selectedCountry?.nameAr,
          countryCurrency: selectedCountry?.currency,
          countryCurrencySymbol: selectedCountry?.currencySymbol,
          intent,
        },
      });
      if (error) throw error;
      if (data?.error) {
        toast({ title: data.error, variant: "destructive" });
        return;
      }
      setResults(data);
    } catch (e: any) {
      toast({ title: "حدث خطأ", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    if (!results?.keywords) return;
    const headers = ["الكلمة المفتاحية", "حجم البحث", "المنافسة", "CPC", "الاتجاه", "نية البحث", "الصعوبة"];
    const rows = results.keywords.map((k: any) => [k.keyword, k.searchVolume, k.competition, k.cpc, k.trend, k.searchIntent, k.difficulty]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `keywords-${topic}-${country}.csv`;
    a.click();
  };

  const getCompetitionBadge = (comp: string) => {
    if (comp === "low") return <Badge className="bg-emerald-500/20 text-emerald-600 hover:bg-emerald-500/30">منخفضة</Badge>;
    if (comp === "medium") return <Badge className="bg-amber-500/20 text-amber-600 hover:bg-amber-500/30">متوسطة</Badge>;
    return <Badge className="bg-rose-500/20 text-rose-600 hover:bg-rose-500/30">عالية</Badge>;
  };

  const getIntentBadge = (intent: string) => {
    const map: Record<string, { label: string; cls: string }> = {
      informational: { label: "معلوماتي", cls: "bg-blue-500/20 text-blue-600" },
      commercial: { label: "تجاري", cls: "bg-purple-500/20 text-purple-600" },
      transactional: { label: "شرائي", cls: "bg-emerald-500/20 text-emerald-600" },
      navigational: { label: "توجيهي", cls: "bg-amber-500/20 text-amber-600" },
    };
    const info = map[intent] || { label: intent, cls: "bg-muted text-muted-foreground" };
    return <Badge className={`${info.cls} hover:opacity-80`}>{info.label}</Badge>;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Search className="w-6 h-6 text-primary" />
          مولد الكلمات المفتاحية بالذكاء الاصطناعي
        </h1>
        <p className="text-muted-foreground text-sm mt-1">أدخل موضوعك واحصل على كلمات مفتاحية ذهبية مع تحليل شامل للأسواق العربية</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">الموضوع أو الكلمة المفتاحية</label>
              <Input placeholder="مثال: مرتبة طبية، تسويق رقمي..." value={topic} onChange={e => setTopic(e.target.value)} className="h-11" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الدولة العربية المستهدفة</label>
              <ArabCountrySelector value={country} onValueChange={setCountry} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">نية البحث (اختياري)</label>
            <Select value={intent} onValueChange={setIntent}>
              <SelectTrigger className="h-11 max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="informational">معلوماتي</SelectItem>
                <SelectItem value="commercial">تجاري</SelectItem>
                <SelectItem value="transactional">شرائي</SelectItem>
                <SelectItem value="navigational">توجيهي</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleGenerate} disabled={loading} className="gradient-bg h-11 px-8">
            {loading ? <><Loader2 className="w-4 h-4 ml-2 animate-spin" />جاري التحليل...</> : <><Sparkles className="w-4 h-4 ml-2" />توليد الكلمات المفتاحية</>}
          </Button>
        </CardContent>
      </Card>

      {results?.keywords && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">النتائج ({results.keywords.length} كلمة مفتاحية)</CardTitle>
            <Button variant="outline" size="sm" onClick={exportCSV}>
              <Download className="w-4 h-4 ml-1" /> تصدير CSV
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">الكلمة المفتاحية</TableHead>
                    <TableHead className="text-center">حجم البحث</TableHead>
                    <TableHead className="text-center">المنافسة</TableHead>
                    <TableHead className="text-center">CPC</TableHead>
                    <TableHead className="text-center">نية البحث</TableHead>
                    <TableHead className="text-center">الصعوبة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.keywords.map((kw: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium text-right">{kw.keyword}</TableCell>
                      <TableCell className="text-center">{kw.searchVolume?.toLocaleString()}</TableCell>
                      <TableCell className="text-center">{getCompetitionBadge(kw.competition)}</TableCell>
                      <TableCell className="text-center">{selectedCountry?.currencySymbol} {kw.cpc}</TableCell>
                      <TableCell className="text-center">{getIntentBadge(kw.searchIntent)}</TableCell>
                      <TableCell className="text-center">{kw.difficulty}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KeywordGenerator;
