import React, { useState } from "react";
import { Lightbulb, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-orange-500" /> مولد استراتيجية SEO
        </h1>
        <p className="text-muted-foreground text-sm mt-1">احصل على خطة SEO متكاملة مع خارطة كلمات وتقويم محتوى</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">مجال الموقع</label>
              <Input placeholder="مثال: متجر إلكتروني للأزياء..." value={niche} onChange={e => setNiche(e.target.value)} className="h-11" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">السوق المستهدف</label>
              <Input placeholder="مثال: الخليج العربي..." value={market} onChange={e => setMarket(e.target.value)} className="h-11" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">هدف المحتوى</label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger className="h-11 max-w-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="traffic">زيادة الزيارات</SelectItem>
                <SelectItem value="leads">جذب العملاء المحتملين</SelectItem>
                <SelectItem value="sales">زيادة المبيعات</SelectItem>
                <SelectItem value="authority">بناء السلطة والثقة</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleGenerate} disabled={loading} className="gradient-bg h-11 px-8">
            {loading ? <><Loader2 className="w-4 h-4 ml-2 animate-spin" />جاري التوليد...</> : <><Sparkles className="w-4 h-4 ml-2" />توليد الاستراتيجية</>}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4">
          {result.keywordRoadmap && (
            <Card>
              <CardHeader><CardTitle className="text-base">🗺️ خارطة الكلمات المفتاحية</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.keywordRoadmap.map((phase: any, i: number) => (
                    <div key={i} className="p-3 rounded-lg bg-muted/50 border-r-2 border-primary/30 pr-4">
                      <p className="font-bold text-sm">{phase.phase}</p>
                      <p className="text-xs text-muted-foreground mt-1">{phase.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {phase.keywords?.map((k: string, j: number) => (
                          <span key={j} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{k}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          {result.contentCalendar && (
            <Card>
              <CardHeader><CardTitle className="text-base">📅 تقويم المحتوى</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {result.contentCalendar.map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div>
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.type}</p>
                      </div>
                      <span className="text-xs text-primary">{item.week}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          {result.growthStrategy && (
            <Card>
              <CardHeader><CardTitle className="text-base">📈 استراتيجية النمو</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.growthStrategy.map((s: string, i: number) => (
                    <li key={i} className="text-sm flex items-start gap-2"><span className="text-primary">✓</span>{s}</li>
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
