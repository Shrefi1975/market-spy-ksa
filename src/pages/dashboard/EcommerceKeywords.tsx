import React, { useState } from "react";
import { ShoppingCart, Loader2, Sparkles, TrendingUp, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getCountryByCode } from "@/data/arabCountries";
import ArabCountrySelector from "@/components/ArabCountrySelector";
import { ToolTipHint, BenefitBanner, UsageHints } from "@/components/ui/tool-tip-hint";

const EcommerceKeywords: React.FC = () => {
  const [product, setProduct] = useState("");
  const [platform, setPlatform] = useState("general");
  const [country, setCountry] = useState("sa");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const selectedCountry = getCountryByCode(country);

  const handleGenerate = async () => {
    if (!product.trim()) { toast({ title: "أدخل اسم المنتج", variant: "destructive" }); return; }
    setLoading(true); setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('seo-tools', {
        body: { tool: 'ecommerce-keywords', product, platform, country, countryNameAr: selectedCountry?.nameAr, countryCurrencySymbol: selectedCountry?.currencySymbol },
      });
      if (error) throw error;
      if (data?.error) { toast({ title: data.error, variant: "destructive" }); return; }
      setResult(data);
    } catch (e: any) { toast({ title: "حدث خطأ", description: e.message, variant: "destructive" }); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-rose-500" /> كلمات التجارة الإلكترونية
        </h1>
        <p className="text-muted-foreground text-sm mt-1">كلمات مفتاحية متخصصة لمتاجر الأسواق العربية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <BenefitBanner
          icon={<TrendingUp className="w-5 h-5 text-primary" />}
          title="زيادة مبيعات المتجر"
          description="كلمات مفتاحية شرائية تجلب زوار مستعدين للشراء إلى متجرك"
        />
        <BenefitBanner
          icon={<DollarSign className="w-5 h-5 text-primary" />}
          title="تحسين صفحات المنتجات"
          description="كلمات مخصصة لصفحات المنتجات والفئات والأوصاف لزيادة الظهور"
        />
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                المنتج أو الفئة
                <ToolTipHint text="أدخل اسم المنتج أو فئة المنتجات. مثال: 'ساعات ذكية' أو 'عطور رجالية'." icon="tip" />
              </label>
              <Input placeholder="مثال: ساعات ذكية..." value={product} onChange={e => setProduct(e.target.value)} className="h-11" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                المنصة
                <ToolTipHint text="اختر منصة المتجر لتخصيص الكلمات. كل منصة لها خصائص SEO مختلفة." icon="info" />
              </label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">عام</SelectItem>
                  <SelectItem value="shopify">Shopify</SelectItem>
                  <SelectItem value="amazon">Amazon</SelectItem>
                  <SelectItem value="salla">سلة</SelectItem>
                  <SelectItem value="zid">زد</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الدولة العربية</label>
              <ArabCountrySelector value={country} onValueChange={setCountry} />
            </div>
          </div>

          <UsageHints hints={[
            "استخدم الكلمات في عناوين المنتجات والأوصاف",
            "أضف كلمات الفئات في قوائم التنقل",
            "اربط المنتجات ببعضها باستخدام كلمات ذات صلة",
          ]} />

          <Button onClick={handleGenerate} disabled={loading} className="gradient-bg h-11 px-8">
            {loading ? <><Loader2 className="w-4 h-4 ml-2 animate-spin" />جاري التوليد...</> : <><Sparkles className="w-4 h-4 ml-2" />توليد الكلمات</>}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Tabs defaultValue="product">
          <TabsList>
            <TabsTrigger value="product">صفحات المنتجات</TabsTrigger>
            <TabsTrigger value="category">صفحات الفئات</TabsTrigger>
            <TabsTrigger value="description">الأوصاف</TabsTrigger>
          </TabsList>
          {["product", "category", "description"].map(tab => (
            <TabsContent key={tab} value={tab}>
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="text-right">الكلمة المفتاحية</TableHead>
                          <TableHead className="text-center">حجم البحث</TableHead>
                          <TableHead className="text-center">المنافسة</TableHead>
                          <TableHead className="text-center">نية البحث</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(result[tab + "Keywords"] || []).map((kw: any, i: number) => (
                          <TableRow key={i} className={kw.competition === "low" ? "bg-emerald-500/5" : ""}>
                            <TableCell className="font-medium text-right">
                              {kw.keyword}
                              {kw.competition === "low" && <span className="text-xs text-emerald-600 mr-2">⭐</span>}
                            </TableCell>
                            <TableCell className="text-center">{kw.searchVolume?.toLocaleString()}</TableCell>
                            <TableCell className="text-center">
                              <Badge className={kw.competition === "low" ? "bg-emerald-500/20 text-emerald-600" : kw.competition === "medium" ? "bg-amber-500/20 text-amber-600" : "bg-rose-500/20 text-rose-600"}>
                                {kw.competition === "low" ? "منخفضة" : kw.competition === "medium" ? "متوسطة" : "عالية"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center text-sm">{kw.intent}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default EcommerceKeywords;
