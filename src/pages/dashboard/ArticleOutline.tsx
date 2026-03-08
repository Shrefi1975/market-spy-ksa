import React, { useState } from "react";
import { FileText, Loader2, Sparkles, Copy, Check, Clock, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ToolTipHint, BenefitBanner, UsageHints } from "@/components/ui/tool-tip-hint";

const ArticleOutline: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [language, setLanguage] = useState("ar");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!keyword.trim()) { toast({ title: "أدخل الكلمة المفتاحية", variant: "destructive" }); return; }
    setLoading(true); setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('seo-tools', {
        body: { tool: 'article-outline', keyword, language },
      });
      if (error) throw error;
      if (data?.error) { toast({ title: data.error, variant: "destructive" }); return; }
      setResult(data);
    } catch (e: any) { toast({ title: "حدث خطأ", description: e.message, variant: "destructive" }); }
    finally { setLoading(false); }
  };

  const copyOutline = () => {
    if (!result) return;
    let text = `# ${result.seoTitle}\n\n`;
    result.sections?.forEach((s: any) => {
      text += `## ${s.heading}\n`;
      s.subheadings?.forEach((sh: string) => { text += `### ${sh}\n`; });
      text += "\n";
    });
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "تم النسخ!" });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="w-6 h-6 text-violet-500" /> مولد هيكل المقال
        </h1>
        <p className="text-muted-foreground text-sm mt-1">أنشئ هيكل مقال احترافي محسّن لمحركات البحث</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <BenefitBanner
          icon={<Clock className="w-5 h-5 text-primary" />}
          title="وفّر ساعات من التخطيط"
          description="هيكل مقال جاهز مع عناوين H2/H3 ووصف ميتا في ثوانٍ"
        />
        <BenefitBanner
          icon={<TrendingUp className="w-5 h-5 text-primary" />}
          title="محتوى يتصدر النتائج"
          description="هياكل مبنية على تحليل المحتوى المتصدر في نتائج البحث"
        />
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                الكلمة المفتاحية الرئيسية
                <ToolTipHint text="أدخل الكلمة المفتاحية التي تريد كتابة مقال حولها. سيتم توليد هيكل شامل مع عناوين فرعية." icon="tip" />
              </label>
              <Input placeholder="مثال: التسويق بالمحتوى..." value={keyword} onChange={e => setKeyword(e.target.value)} className="h-11" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">لغة المقال</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="en">الإنجليزية</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <UsageHints hints={[
            "استخدم الهيكل كأساس وخصّصه بأسلوبك",
            "أضف أمثلة وبيانات محلية لكل قسم",
            "انسخ الهيكل إلى محرر النصوص وابدأ الكتابة",
          ]} />

          <Button onClick={handleGenerate} disabled={loading} className="gradient-bg h-11 px-8">
            {loading ? <><Loader2 className="w-4 h-4 ml-2 animate-spin" />جاري التوليد...</> : <><Sparkles className="w-4 h-4 ml-2" />توليد الهيكل</>}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>هيكل المقال</CardTitle>
            <Button variant="outline" size="sm" onClick={copyOutline}>
              {copied ? <Check className="w-4 h-4 ml-1" /> : <Copy className="w-4 h-4 ml-1" />}
              {copied ? "تم النسخ" : "نسخ الهيكل"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <p className="text-xs text-muted-foreground mb-1">عنوان SEO</p>
              <p className="font-bold text-lg">{result.seoTitle}</p>
            </div>
            {result.metaDescription && (
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">وصف الميتا</p>
                <p className="text-sm">{result.metaDescription}</p>
              </div>
            )}
            <div className="space-y-4">
              {result.sections?.map((s: any, i: number) => (
                <div key={i} className="border-r-2 border-primary/30 pr-4">
                  <h3 className="font-bold text-base mb-2">H2: {s.heading}</h3>
                  {s.subheadings?.map((sh: string, j: number) => (
                    <p key={j} className="text-sm text-muted-foreground mr-4 mb-1">H3: {sh}</p>
                  ))}
                  {s.keyPoints && <p className="text-xs text-muted-foreground mt-2">{s.keyPoints}</p>}
                </div>
              ))}
            </div>
            {result.relatedTopics && (
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-2">مواضيع ذات صلة — يمكنك الربط الداخلي بها</p>
                <div className="flex flex-wrap gap-2">
                  {result.relatedTopics.map((t: string, i: number) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ArticleOutline;
