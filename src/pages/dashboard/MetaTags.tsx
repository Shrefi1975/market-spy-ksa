import React, { useState } from "react";
import { Tags, Loader2, Sparkles, Copy, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const MetaTags: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [pageType, setPageType] = useState("blog");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!keyword.trim()) { toast({ title: "أدخل الكلمة المفتاحية", variant: "destructive" }); return; }
    setLoading(true); setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('seo-tools', {
        body: { tool: 'meta-tags', keyword, pageType },
      });
      if (error) throw error;
      if (data?.error) { toast({ title: data.error, variant: "destructive" }); return; }
      setResult(data);
    } catch (e: any) { toast({ title: "حدث خطأ", description: e.message, variant: "destructive" }); }
    finally { setLoading(false); }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "تم النسخ!" });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Tags className="w-6 h-6 text-amber-500" /> مولد وسوم الميتا
        </h1>
        <p className="text-muted-foreground text-sm mt-1">أنشئ عناوين SEO وأوصاف ميتا احترافية وعلامات Schema</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">الكلمة المفتاحية أو موضوع الصفحة</label>
            <Input placeholder="مثال: أفضل هواتف 2024..." value={keyword} onChange={e => setKeyword(e.target.value)} className="h-11" />
          </div>
          <Button onClick={handleGenerate} disabled={loading} className="gradient-bg h-11 px-8">
            {loading ? <><Loader2 className="w-4 h-4 ml-2 animate-spin" />جاري التوليد...</> : <><Sparkles className="w-4 h-4 ml-2" />توليد الوسوم</>}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4">
          {result.suggestions?.map((s: any, i: number) => (
            <Card key={i}>
              <CardHeader><CardTitle className="text-base">الاقتراح {i + 1}</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">عنوان SEO ({s.title?.length || 0} حرف)</span>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(s.title)}><Copy className="w-3 h-3" /></Button>
                  </div>
                  <p className="font-bold text-blue-600">{s.title}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">وصف الميتا ({s.description?.length || 0} حرف)</span>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(s.description)}><Copy className="w-3 h-3" /></Button>
                  </div>
                  <p className="text-sm">{s.description}</p>
                </div>
                {s.slug && (
                  <div className="p-3 rounded-lg bg-muted/50">
                    <span className="text-xs text-muted-foreground">Slug مقترح</span>
                    <p className="text-sm font-mono mt-1 text-primary">{s.slug}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          {result.schema && (
            <Card>
              <CardHeader><CardTitle className="text-base">Schema Markup (JSON-LD)</CardTitle></CardHeader>
              <CardContent>
                <div className="relative">
                  <pre dir="ltr" className="bg-muted/50 rounded-lg p-4 text-xs overflow-x-auto">{JSON.stringify(result.schema, null, 2)}</pre>
                  <Button variant="ghost" size="sm" className="absolute top-2 left-2" onClick={() => copyToClipboard(JSON.stringify(result.schema, null, 2))}>
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default MetaTags;
