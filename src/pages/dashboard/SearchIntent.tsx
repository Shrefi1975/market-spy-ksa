import React, { useState } from "react";
import { Compass, Loader2, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const intentColors: Record<string, { bg: string; label: string }> = {
  informational: { bg: "bg-blue-500/20 text-blue-600", label: "معلوماتي" },
  commercial: { bg: "bg-purple-500/20 text-purple-600", label: "تجاري" },
  transactional: { bg: "bg-emerald-500/20 text-emerald-600", label: "شرائي" },
  navigational: { bg: "bg-amber-500/20 text-amber-600", label: "توجيهي" },
};

const SearchIntent: React.FC = () => {
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleAnalyze = async () => {
    const list = keywords.split("\n").map(k => k.trim()).filter(Boolean);
    if (!list.length) { toast({ title: "أدخل كلمة مفتاحية واحدة على الأقل", variant: "destructive" }); return; }
    setLoading(true); setResults([]);
    try {
      const { data, error } = await supabase.functions.invoke('seo-tools', {
        body: { tool: 'search-intent', keywords: list },
      });
      if (error) throw error;
      if (data?.error) { toast({ title: data.error, variant: "destructive" }); return; }
      setResults(data.results || []);
    } catch (e: any) { toast({ title: "حدث خطأ", description: e.message, variant: "destructive" }); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Compass className="w-6 h-6 text-emerald-500" /> كشف نية البحث
        </h1>
        <p className="text-muted-foreground text-sm mt-1">صنّف كلماتك المفتاحية تلقائياً حسب نية المستخدم</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">الكلمات المفتاحية (كلمة واحدة في كل سطر)</label>
            <Textarea placeholder={"ما هو التسويق الرقمي\nشراء آيفون 15\nموقع أمازون\nأفضل لابتوب للطلاب"} value={keywords} onChange={e => setKeywords(e.target.value)} className="min-h-[120px]" />
          </div>
          <Button onClick={handleAnalyze} disabled={loading} className="gradient-bg h-11 px-8">
            {loading ? <><Loader2 className="w-4 h-4 ml-2 animate-spin" />جاري التحليل...</> : <><Sparkles className="w-4 h-4 ml-2" />تحليل نية البحث</>}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((r, i) => {
            const info = intentColors[r.intent] || { bg: "bg-muted", label: r.intent };
            return (
              <Card key={i}>
                <CardContent className="p-4 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="font-medium">{r.keyword}</p>
                    <p className="text-xs text-muted-foreground mt-1">{r.explanation}</p>
                  </div>
                  <Badge className={`${info.bg} text-sm`}>{info.label}</Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchIntent;
