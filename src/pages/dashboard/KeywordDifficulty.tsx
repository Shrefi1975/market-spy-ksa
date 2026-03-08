import React, { useState } from "react";
import { BarChart3, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getCountryByCode } from "@/data/arabCountries";
import ArabCountrySelector from "@/components/ArabCountrySelector";

const KeywordDifficulty: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("sa");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!keyword.trim()) { toast({ title: "أدخل الكلمة المفتاحية", variant: "destructive" }); return; }
    setLoading(true); setResult(null);
    try {
      const selectedCountry = getCountryByCode(country);
      const { data, error } = await supabase.functions.invoke('seo-tools', {
        body: { tool: 'keyword-difficulty', keyword, country, countryNameAr: selectedCountry?.nameAr },
      });
      if (error) throw error;
      if (data?.error) { toast({ title: data.error, variant: "destructive" }); return; }
      setResult(data);
    } catch (e: any) { toast({ title: "حدث خطأ", description: e.message, variant: "destructive" }); }
    finally { setLoading(false); }
  };

  const getDifficultyColor = (score: number) => {
    if (score <= 30) return "text-emerald-500";
    if (score <= 60) return "text-amber-500";
    return "text-rose-500";
  };

  const getDifficultyLabel = (score: number) => {
    if (score <= 20) return "سهل جداً";
    if (score <= 40) return "سهل";
    if (score <= 60) return "متوسط";
    if (score <= 80) return "صعب";
    return "صعب جداً";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-500" /> تقدير صعوبة الكلمة المفتاحية
        </h1>
        <p className="text-muted-foreground text-sm mt-1">احصل على تقييم دقيق لصعوبة التصدر في الأسواق العربية</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">الكلمة المفتاحية</label>
              <Input placeholder="مثال: شراء لابتوب..." value={keyword} onChange={e => setKeyword(e.target.value)} className="h-11" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الدولة العربية</label>
              <ArabCountrySelector value={country} onValueChange={setCountry} />
            </div>
          </div>
          <Button onClick={handleAnalyze} disabled={loading} className="gradient-bg h-11 px-8">
            {loading ? <><Loader2 className="w-4 h-4 ml-2 animate-spin" />جاري التحليل...</> : <><Sparkles className="w-4 h-4 ml-2" />تحليل الصعوبة</>}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>درجة الصعوبة</CardTitle></CardHeader>
            <CardContent className="text-center space-y-4">
              <div className={`text-6xl font-bold ${getDifficultyColor(result.score)}`}>{result.score}</div>
              <p className="text-lg font-medium">{getDifficultyLabel(result.score)}</p>
              <Progress value={result.score} className="h-3" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>تفاصيل التحليل</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {result.factors?.map((f: any, i: number) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm">{f.name}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={f.score} className="w-24 h-2" />
                    <span className="text-sm font-medium w-8">{f.score}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          {result.recommendations && (
            <Card className="md:col-span-2">
              <CardHeader><CardTitle>التوصيات</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.recommendations.map((r: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm"><span className="text-primary mt-0.5">•</span>{r}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default KeywordDifficulty;
