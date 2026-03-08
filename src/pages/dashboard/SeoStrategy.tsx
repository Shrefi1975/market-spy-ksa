import React, { useState } from "react";
import { Lightbulb, Loader2, Sparkles, Map, Calendar, TrendingUp, Rocket } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ToolTipHint, BenefitBanner, UsageHints } from "@/components/ui/tool-tip-hint";

const SeoStrategy: React.FC = () => {
  const [niche, setNiche] = useState("");
  const [market, setMarket] = useState("");
  const [goal, setGoal] = useState("traffic");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!niche.trim()) { toast({ title: "أدخل مجال الموقع", variant: "destructive" }); return; }
    setLoading(true); setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('seo-tools', {
        body: { tool: 'seo-strategy', niche, market, goal },
      });
      if (error) throw error;
      if (data?.error) { toast({ title: data.error, variant: "destructive" }); return; }
      setResult(data);
    } catch (e: any) { toast({ title: "حدث خطأ", description: e.message, variant: "destructive" }); }
    finally { setLoading(false); }
  };

  const goalLabels: Record<string, string> = {
    traffic: "زيادة الزيارات",
    leads: "جذب العملاء المحتملين",
    sales: "زيادة المبيعات",
    authority: "بناء السلطة والثقة",
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-primary-foreground" />
          </div>
          مولد استراتيجية SEO
        </h1>
        <p className="text-muted-foreground text-base mr-15">احصل على خطة SEO متكاملة مع خارطة كلمات وتقويم محتوى مخصص لسوقك</p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BenefitBanner
          icon={<Map className="w-5 h-5 text-primary" />}
          title="خارطة كلمات مفتاحية"
          description="خطة مرحلية واضحة تبدأ بالكلمات السهلة وتتدرج للصعبة"
        />
        <BenefitBanner
          icon={<Calendar className="w-5 h-5 text-primary" />}
          title="تقويم محتوى جاهز"
          description="جدول نشر أسبوعي مع عناوين مقالات وأنواع محتوى محددة"
        />
        <BenefitBanner
          icon={<Rocket className="w-5 h-5 text-primary" />}
          title="استراتيجية نمو مخصصة"
          description="توصيات عملية مبنية على مجالك وأهدافك والسوق المستهدف"
        />
      </div>

      {/* Input Card */}
      <Card className="border-2 border-border/50 shadow-lg">
        <CardContent className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2.5 flex items-center">
                مجال الموقع
                <ToolTipHint text="أدخل وصفاً دقيقاً لمجال موقعك. مثال: 'متجر إلكتروني للعطور الفاخرة' أو 'عيادة أسنان في جدة'." icon="tip" />
              </label>
              <Input placeholder="مثال: متجر إلكتروني للأزياء..." value={niche} onChange={e => setNiche(e.target.value)} className="h-12 text-base" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2.5 flex items-center">
                السوق المستهدف
                <ToolTipHint text="حدد المنطقة الجغرافية المستهدفة. مثال: 'الخليج العربي' أو 'مصر والسعودية'." icon="info" />
              </label>
              <Input placeholder="مثال: الخليج العربي..." value={market} onChange={e => setMarket(e.target.value)} className="h-12 text-base" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2.5 flex items-center">
              هدف المحتوى
              <ToolTipHint text="اختر الهدف الرئيسي من استراتيجية SEO. كل هدف يولّد خطة مختلفة مع تركيز مختلف." icon="tip" />
            </label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger className="h-12 max-w-sm text-base"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="traffic">🚀 زيادة الزيارات</SelectItem>
                <SelectItem value="leads">🎯 جذب العملاء المحتملين</SelectItem>
                <SelectItem value="sales">💰 زيادة المبيعات</SelectItem>
                <SelectItem value="authority">🏆 بناء السلطة والثقة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <UsageHints hints={[
            "كلما كان الوصف أدق، كانت الاستراتيجية أفضل",
            "ابدأ بالمرحلة الأولى من خارطة الكلمات",
            "التزم بتقويم المحتوى لنتائج مستدامة",
          ]} />

          <Button onClick={handleGenerate} disabled={loading} className="gradient-bg h-13 px-10 text-base font-bold shadow-lg">
            {loading ? <><Loader2 className="w-5 h-5 ml-2 animate-spin" />جاري توليد الاستراتيجية...</> : <><Sparkles className="w-5 h-5 ml-2" />توليد الاستراتيجية</>}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Strategy summary banner */}
          <Card className="bg-primary/5 border-primary/15">
            <CardContent className="p-6 flex flex-col md:flex-row items-center gap-4">
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center shrink-0">
                <Lightbulb className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="text-center md:text-right flex-1">
                <h3 className="text-lg font-bold text-foreground">استراتيجية SEO لـ{niche}</h3>
                <p className="text-sm text-muted-foreground mt-1">السوق: {market || "عام"} • الهدف: {goalLabels[goal]}</p>
              </div>
            </CardContent>
          </Card>

          {/* Keyword Roadmap */}
          {result.keywordRoadmap && (
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Map className="w-5 h-5 text-primary" />
                  خارطة الكلمات المفتاحية
                </CardTitle>
                <p className="text-sm text-muted-foreground">💡 ابدأ بالمرحلة الأولى وانتقل تدريجياً للمراحل التالية</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result.keywordRoadmap.map((phase: any, i: number) => (
                    <div key={i} className="p-5 rounded-xl bg-muted/40 border border-border/50 border-r-4 border-r-primary/40 hover:bg-muted/60 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="gradient-bg text-primary-foreground">المرحلة {i + 1}</Badge>
                        <p className="font-bold text-base">{phase.phase}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{phase.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {phase.keywords?.map((k: string, j: number) => (
                          <span key={j} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">{k}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Content Calendar */}
          {result.contentCalendar && (
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Calendar className="w-5 h-5 text-primary" />
                  تقويم المحتوى
                </CardTitle>
                <p className="text-sm text-muted-foreground">💡 التزم بالنشر الأسبوعي للحصول على نتائج مستدامة</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.contentCalendar.map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-primary">{i + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{item.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.type}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">{item.week}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Growth Strategy */}
          {result.growthStrategy && (
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  استراتيجية النمو
                </CardTitle>
                <p className="text-sm text-muted-foreground">💡 طبّق هذه التوصيات بالتوازي مع إنتاج المحتوى</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {result.growthStrategy.map((s: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-sm">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-emerald-600 text-xs font-bold">✓</span>
                      </span>
                      {s}
                    </li>
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

export default SeoStrategy;
