import React, { useState, useMemo } from "react";
import { Search, Loader2, Download, Sparkles, TrendingUp, Target, Zap, ArrowUpDown, Filter, ChevronUp, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getCountryByCode } from "@/data/arabCountries";
import ArabCountrySelector from "@/components/ArabCountrySelector";
import { ToolTipHint, BenefitBanner, UsageHints } from "@/components/ui/tool-tip-hint";

type SortField = "keyword" | "searchVolume" | "competition" | "cpc" | "difficulty";
type SortDir = "asc" | "desc";

const KeywordGenerator: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [country, setCountry] = useState("sa");
  const [intent, setIntent] = useState("all");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [sortField, setSortField] = useState<SortField>("searchVolume");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [filterComp, setFilterComp] = useState<string>("all");

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

  const filteredAndSorted = useMemo(() => {
    if (!results?.keywords) return [];
    let kws = [...results.keywords];
    if (filterComp !== "all") {
      kws = kws.filter((k: any) => k.competition === filterComp);
    }
    const compOrder: Record<string, number> = { low: 1, medium: 2, high: 3 };
    kws.sort((a: any, b: any) => {
      let aVal: any, bVal: any;
      if (sortField === "competition") {
        aVal = compOrder[a.competition] || 2;
        bVal = compOrder[b.competition] || 2;
      } else {
        aVal = a[sortField] ?? 0;
        bVal = b[sortField] ?? 0;
      }
      if (typeof aVal === "string") return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    });
    return kws;
  }, [results, sortField, sortDir, filterComp]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3 h-3 opacity-40" />;
    return sortDir === "asc" ? <ChevronUp className="w-3 h-3 text-primary" /> : <ChevronDown className="w-3 h-3 text-primary" />;
  };

  const exportCSV = () => {
    if (!filteredAndSorted.length) return;
    const headers = ["الكلمة المفتاحية", "حجم البحث", "المنافسة", "CPC", "الاتجاه", "نية البحث", "الصعوبة"];
    const rows = filteredAndSorted.map((k: any) => [k.keyword, k.searchVolume, k.competition, k.cpc, k.trend, k.searchIntent, k.difficulty]);
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

  const getIntentBadge = (intentVal: string) => {
    const map: Record<string, { label: string; cls: string }> = {
      informational: { label: "معلوماتي", cls: "bg-blue-500/20 text-blue-600" },
      commercial: { label: "تجاري", cls: "bg-purple-500/20 text-purple-600" },
      transactional: { label: "شرائي", cls: "bg-emerald-500/20 text-emerald-600" },
      navigational: { label: "توجيهي", cls: "bg-amber-500/20 text-amber-600" },
    };
    const info = map[intentVal] || { label: intentVal, cls: "bg-muted text-muted-foreground" };
    return <Badge className={`${info.cls} hover:opacity-80`}>{info.label}</Badge>;
  };

  // Summary stats
  const stats = useMemo(() => {
    if (!results?.keywords?.length) return null;
    const kws = results.keywords;
    const lowComp = kws.filter((k: any) => k.competition === "low").length;
    const avgVol = Math.round(kws.reduce((s: number, k: any) => s + (k.searchVolume || 0), 0) / kws.length);
    const avgDiff = Math.round(kws.reduce((s: number, k: any) => s + (k.difficulty || 0), 0) / kws.length);
    return { total: kws.length, lowComp, avgVol, avgDiff };
  }, [results]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center">
            <Search className="w-6 h-6 text-primary-foreground" />
          </div>
          مولد الكلمات المفتاحية المتقدم
        </h1>
        <p className="text-muted-foreground text-base mr-15">أدخل موضوعك واحصل على كلمات مفتاحية ذهبية مع تحليل شامل للأسواق العربية</p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BenefitBanner
          icon={<TrendingUp className="w-5 h-5 text-primary" />}
          title="اكتشاف فرص ذهبية"
          description="اعثر على كلمات مفتاحية عالية البحث ومنخفضة المنافسة في سوقك"
        />
        <BenefitBanner
          icon={<Target className="w-5 h-5 text-primary" />}
          title="استهداف دقيق لـ 23 سوق"
          description="كلمات مخصصة لكل دولة عربية مع فهم اللهجات المحلية والعملة"
        />
        <BenefitBanner
          icon={<Zap className="w-5 h-5 text-primary" />}
          title="توفير الوقت والجهد"
          description="احصل على عشرات الكلمات المفتاحية في ثوانٍ بدلاً من ساعات البحث اليدوي"
        />
      </div>

      {/* Input Card */}
      <Card className="border-2 border-border/50 shadow-lg">
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2.5 flex items-center">
                الموضوع أو الكلمة المفتاحية
                <ToolTipHint text="يمكنك إدخال موضوع عام مثل 'تسويق رقمي' أو كلمة مفتاحية محددة مثل 'شراء لابتوب'. كلما كان المدخل أكثر تحديداً، كانت النتائج أدق." icon="tip" />
              </label>
              <Input placeholder="مثال: مرتبة طبية، تسويق رقمي، أو رابط URL..." value={topic} onChange={e => setTopic(e.target.value)} className="h-12 text-base" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2.5 flex items-center">
                الدولة العربية المستهدفة
                <ToolTipHint text="اختر الدولة التي تريد استهدافها. النتائج ستكون مخصصة لسلوك البحث والعملة في هذا السوق." icon="info" />
              </label>
              <ArabCountrySelector value={country} onValueChange={setCountry} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2.5 flex items-center">
              نية البحث (اختياري)
              <ToolTipHint text="فلتر حسب نية المستخدم: 'معلوماتي' للمقالات، 'تجاري' للمقارنات، 'شرائي' لصفحات المنتجات، 'توجيهي' للبراندات." icon="tip" />
            </label>
            <Select value={intent} onValueChange={setIntent}>
              <SelectTrigger className="h-12 max-w-xs text-base">
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

          <UsageHints hints={[
            "استخدم كلمات طويلة الذيل لتصدر أسهل",
            "جرّب إدخال أسئلة مثل 'كيف' أو 'ما هو'",
            "ركّز على الكلمات ذات المنافسة المنخفضة أولاً",
          ]} />

          <Button onClick={handleGenerate} disabled={loading} className="gradient-bg h-13 px-10 text-base font-bold shadow-lg">
            {loading ? <><Loader2 className="w-5 h-5 ml-2 animate-spin" />جاري التحليل...</> : <><Sparkles className="w-5 h-5 ml-2" />توليد الكلمات المفتاحية</>}
          </Button>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-primary/5 border-primary/15">
            <CardContent className="p-5 text-center">
              <p className="text-3xl font-bold text-primary">{stats.total}</p>
              <p className="text-xs text-muted-foreground mt-1">كلمة مفتاحية</p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-500/5 border-emerald-500/15">
            <CardContent className="p-5 text-center">
              <p className="text-3xl font-bold text-emerald-600">{stats.lowComp}</p>
              <p className="text-xs text-muted-foreground mt-1">فرصة سهلة</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <p className="text-3xl font-bold text-foreground">{stats.avgVol.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">متوسط حجم البحث</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <p className="text-3xl font-bold text-foreground">{stats.avgDiff}</p>
              <p className="text-xs text-muted-foreground mt-1">متوسط الصعوبة</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Results Table */}
      {results?.keywords && (
        <Card className="shadow-lg">
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
            <div>
              <CardTitle className="text-xl">النتائج ({filteredAndSorted.length} كلمة مفتاحية)</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">💡 ركّز على الكلمات ذات المنافسة المنخفضة وحجم البحث العالي</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Competition filter */}
              <div className="flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={filterComp} onValueChange={setFilterComp}>
                  <SelectTrigger className="h-9 w-[130px] text-xs">
                    <SelectValue placeholder="المنافسة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المستويات</SelectItem>
                    <SelectItem value="low">منخفضة ⭐</SelectItem>
                    <SelectItem value="medium">متوسطة</SelectItem>
                    <SelectItem value="high">عالية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm" onClick={exportCSV}>
                <Download className="w-4 h-4 ml-1" /> تصدير CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right cursor-pointer select-none hover:text-primary transition-colors" onClick={() => handleSort("keyword")}>
                      <span className="inline-flex items-center gap-1">الكلمة المفتاحية <SortIcon field="keyword" /></span>
                    </TableHead>
                    <TableHead className="text-center cursor-pointer select-none hover:text-primary transition-colors" onClick={() => handleSort("searchVolume")}>
                      <span className="inline-flex items-center gap-1">حجم البحث <SortIcon field="searchVolume" /></span>
                    </TableHead>
                    <TableHead className="text-center cursor-pointer select-none hover:text-primary transition-colors" onClick={() => handleSort("competition")}>
                      <span className="inline-flex items-center gap-1">المنافسة <SortIcon field="competition" /></span>
                    </TableHead>
                    <TableHead className="text-center cursor-pointer select-none hover:text-primary transition-colors" onClick={() => handleSort("cpc")}>
                      <span className="inline-flex items-center gap-1">CPC <SortIcon field="cpc" /></span>
                    </TableHead>
                    <TableHead className="text-center">نية البحث</TableHead>
                    <TableHead className="text-center cursor-pointer select-none hover:text-primary transition-colors" onClick={() => handleSort("difficulty")}>
                      <span className="inline-flex items-center gap-1">الصعوبة <SortIcon field="difficulty" /></span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSorted.map((kw: any, i: number) => (
                    <TableRow key={i} className={`transition-colors ${kw.competition === "low" ? "bg-emerald-500/5 hover:bg-emerald-500/10" : "hover:bg-muted/30"}`}>
                      <TableCell className="font-medium text-right">
                        {kw.keyword}
                        {kw.competition === "low" && <span className="text-xs text-emerald-600 mr-2">⭐ فرصة ذهبية</span>}
                      </TableCell>
                      <TableCell className="text-center font-semibold">{kw.searchVolume?.toLocaleString()}</TableCell>
                      <TableCell className="text-center">{getCompetitionBadge(kw.competition)}</TableCell>
                      <TableCell className="text-center">{selectedCountry?.currencySymbol} {kw.cpc}</TableCell>
                      <TableCell className="text-center">{getIntentBadge(kw.searchIntent)}</TableCell>
                      <TableCell className="text-center">
                        <span className={`font-semibold ${(kw.difficulty || 0) <= 30 ? "text-emerald-600" : (kw.difficulty || 0) <= 60 ? "text-amber-600" : "text-rose-600"}`}>
                          {kw.difficulty}
                        </span>
                      </TableCell>
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
