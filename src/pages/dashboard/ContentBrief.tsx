import React, { useState } from "react";
import { BookOpen, Loader2, Sparkles, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContentBrief: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!keyword.trim()) { toast({ title: "أدخل الكلمة المفتاحية", variant: "destructive" }); return; }
    setLoading(true); setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('seo-tools', {
        body: { tool: 'content-brief', keyword },
      });
      if (error) throw error;
      if (data?.error) { toast({ title: data.error, variant: "destructive" }); return; }
      setResult(data);
    } catch (e: any) { toast({ title: "حدث خطأ", description: e.message, variant: "destructive" }); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-cyan-500" /> موجز المحتوى
        </h1>
        <p className="text-muted-foreground text-sm mt-1">أنشئ موجز محتوى شامل مع كلمات ثانوية وعناوين مقترحة وأسئلة شائعة</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">الكلمة المفتاحية الرئيسية</label>
            <Input placeholder="مثال: تحسين محركات البحث..." value={keyword} onChange={e => setKeyword(e.target.value)} className="h-11" />
          </div>
          <Button onClick={handleGenerate} disabled={loading} className="gradient-bg h-11 px-8">
            {loading ? <><Loader2 className="w-4 h-4 ml-2 animate-spin" />جاري التوليد...</> : <><Sparkles className="w-4 h-4 ml-2" />توليد الموجز</>}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle className="text-base">الكلمة الرئيسية</CardTitle></CardHeader>
            <CardContent>
              <p className="font-bold text-lg text-primary">{result.primaryKeyword}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">الكلمات الثانوية</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {result.secondaryKeywords?.map((k: string, i: number) => (
                  <Badge key={i} variant="outline" className="text-xs">{k}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader><CardTitle className="text-base">العناوين المقترحة</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.suggestedHeadings?.map((h: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Badge variant="outline" className="text-xs shrink-0">H2</Badge>
                    {h}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">أسئلة شائعة (FAQ)</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.faqs?.map((q: string, i: number) => (
                  <li key={i} className="text-sm flex items-start gap-2"><span className="text-primary">❓</span>{q}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">مواضيع المنافسين</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.competitorTopics?.map((t: string, i: number) => (
                  <li key={i} className="text-sm flex items-start gap-2"><span className="text-primary">•</span>{t}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          {result.targetWordCount && (
            <Card className="md:col-span-2">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">عدد الكلمات المستهدف</p>
                  <p className="text-2xl font-bold text-primary">{result.targetWordCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">مستوى القراءة</p>
                  <p className="text-lg font-medium">{result.readingLevel || 'متوسط'}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">نوع المحتوى</p>
                  <p className="text-lg font-medium">{result.contentType || 'مقال'}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentBrief;
