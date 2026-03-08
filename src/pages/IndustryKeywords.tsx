import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getIndustryBySlug, industries } from "@/data/industries";
import { arabCountries } from "@/data/arabCountries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Globe, Lightbulb, HelpCircle, MapPin, Star, TrendingUp, FileText } from "lucide-react";

const IndustryKeywords: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = slug ? getIndustryBySlug(slug) : undefined;

  useEffect(() => {
    if (industry) {
      document.title = `كلمات مفتاحية عربية لـ${industry.nameAr} | KeyRank`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", industry.description);
      else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = industry.description;
        document.head.appendChild(meta);
      }
    }
    window.scrollTo(0, 0);
  }, [industry]);

  if (!industry) {
    return (
      <div className="min-h-screen flex flex-col" dir="rtl">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">القطاع غير موجود</h1>
            <Link to="/industries" className="text-primary hover:underline">العودة لمكتبة القطاعات</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const topCountries = arabCountries.filter(c => ["sa", "ae", "eg", "kw", "qa", "ma"].includes(c.code));

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-foreground to-foreground/95 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-60 h-60 bg-primary rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/industries" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            العودة لمكتبة القطاعات
          </Link>
          <div className="flex items-center gap-5 mb-6">
            <span className="text-6xl">{industry.icon}</span>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-3">
                كلمات مفتاحية عربية لـ{industry.nameAr}
              </h1>
              <p className="text-lg text-primary-foreground/60 mt-1">Arabic Keywords for {industry.nameEn}</p>
            </div>
          </div>
          <p className="text-primary-foreground/75 max-w-3xl text-lg leading-loose mt-4 mb-8">{industry.description}</p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mb-10">
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-xl px-4 py-2.5">
              <Search className="w-4 h-4 text-primary" />
              <span className="text-sm">{industry.serviceKeywords.length + industry.questionKeywords.length + industry.commercialKeywords.length} كلمة مفتاحية</span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-xl px-4 py-2.5">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="text-sm">{industry.contentIdeas.length} فكرة محتوى</span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-xl px-4 py-2.5">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm">{arabCountries.length} سوق عربي</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/auth">
              <Button className="gradient-bg h-13 px-8 text-base font-bold shadow-lg">
                <Search className="w-5 h-5 ml-2" />
                ابدأ التحليل المتقدم مجاناً
              </Button>
            </Link>
            <a href="#keywords-section">
              <Button variant="outline" className="h-13 px-8 text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <FileText className="w-5 h-5 ml-2" />
                عرض الكلمات المفتاحية
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Usage hint banner */}
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Lightbulb className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm text-muted-foreground">
            💡 <span className="font-semibold text-foreground">نصيحة:</span> اختر الدولة المستهدفة في الأسفل للحصول على كلمات مفتاحية مخصصة لسوقك المحلي. الكلمات التجارية مثالية لصفحات المنتجات.
          </p>
        </div>
      </div>

      <main className="flex-1 bg-muted/30 py-12" id="keywords-section">
        <div className="container mx-auto px-4 space-y-10">

          {/* Service Keywords */}
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Search className="w-5 h-5 text-primary" />
                  كلمات مفتاحية خدمية – {industry.nameAr}
                </CardTitle>
                <Badge className="bg-primary/10 text-primary">{industry.serviceKeywords.length} كلمة</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">كلمات يبحث عنها العملاء عند حاجتهم لخدمات في هذا القطاع</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right w-12">#</TableHead>
                    <TableHead className="text-right">الكلمة المفتاحية</TableHead>
                    <TableHead className="text-center w-24">النوع</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {industry.serviceKeywords.map((kw, i) => (
                    <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium text-muted-foreground">{i + 1}</TableCell>
                      <TableCell className="font-medium text-base">{kw}</TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">خدمي</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Question Keywords */}
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  كلمات مفتاحية سؤالية – {industry.nameAr}
                </CardTitle>
                <Badge className="bg-blue-500/10 text-blue-600">{industry.questionKeywords.length} سؤال</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">أسئلة يطرحها المستخدمون — مثالية لمقالات المدونة وأقسام FAQ</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right w-12">#</TableHead>
                    <TableHead className="text-right">السؤال / الكلمة</TableHead>
                    <TableHead className="text-center w-24">النوع</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {industry.questionKeywords.map((kw, i) => (
                    <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium text-muted-foreground">{i + 1}</TableCell>
                      <TableCell className="font-medium text-base">{kw}</TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">سؤال</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Commercial Keywords */}
          <Card className="shadow-md border-emerald-500/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  كلمات مفتاحية تجارية – {industry.nameAr}
                  <Star className="w-4 h-4 text-amber-500" />
                </CardTitle>
                <Badge className="bg-emerald-500/10 text-emerald-600">{industry.commercialKeywords.length} كلمة</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">⭐ كلمات ذات نية شرائية عالية — الأفضل لصفحات المنتجات والخدمات</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-emerald-500/5">
                    <TableHead className="text-right w-12">#</TableHead>
                    <TableHead className="text-right">الكلمة المفتاحية</TableHead>
                    <TableHead className="text-center w-24">النوع</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {industry.commercialKeywords.map((kw, i) => (
                    <TableRow key={i} className="hover:bg-emerald-500/5 transition-colors">
                      <TableCell className="font-medium text-muted-foreground">{i + 1}</TableCell>
                      <TableCell className="font-medium text-base">{kw}</TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20">تجاري ⭐</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Content Ideas */}
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  أفكار محتوى لـ{industry.nameAr}
                </CardTitle>
                <Badge className="bg-primary/10 text-primary">{industry.contentIdeas.length} فكرة</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">مواضيع مقالات وأدلة مقترحة لتغطية احتياجات جمهورك في هذا القطاع</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {industry.contentIdeas.map((idea, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-muted/40 border border-border/50 hover:bg-muted/60 hover:border-primary/20 transition-all">
                    <span className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">{i + 1}</span>
                    <span className="font-medium text-sm leading-relaxed">{idea}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Country-Specific Pages */}
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <MapPin className="w-5 h-5 text-primary" />
                كلمات مفتاحية لـ{industry.nameAr} حسب الدولة
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">💡 اختر الدولة المستهدفة للحصول على كلمات مخصصة لسلوك البحث المحلي</p>
            </CardHeader>
            <CardContent>
              {/* Top countries highlighted */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
                {topCountries.map(country => (
                  <Link
                    key={country.code}
                    to={`/industries/${industry.slug}/${country.nameEn.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-primary/20 bg-primary/5 hover:border-primary hover:bg-primary/10 transition-all text-center"
                  >
                    <span className="font-semibold text-sm">{country.nameAr}</span>
                    <Badge variant="outline" className="text-[10px]">مميز</Badge>
                  </Link>
                ))}
              </div>
              {/* Rest of countries */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {arabCountries.filter(c => !["sa", "ae", "eg", "kw", "qa", "ma"].includes(c.code)).map(country => (
                  <Link
                    key={country.code}
                    to={`/industries/${industry.slug}/${country.nameEn.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium"
                  >
                    <span>{country.nameAr}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <HelpCircle className="w-5 h-5 text-primary" />
                أسئلة شائعة عن SEO لـ{industry.nameAr}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">إجابات على أكثر الأسئلة شيوعاً حول تحسين محركات البحث في هذا القطاع</p>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {industry.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-right font-medium text-base">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed text-sm">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* CTA Card */}
          <Card className="bg-gradient-to-l from-primary/10 to-primary/5 border-primary/20 shadow-md">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-3">هل تريد تحليلاً أعمق لـ{industry.nameAr}؟</h3>
              <p className="text-muted-foreground mb-6">سجّل مجاناً واحصل على تحليل متقدم مع بيانات حجم البحث والمنافسة والاتجاهات</p>
              <Link to="/auth">
                <Button className="gradient-bg h-13 px-10 text-base font-bold shadow-lg">
                  <Search className="w-5 h-5 ml-2" />
                  ابدأ التحليل المتقدم مجاناً
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Other Industries */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">قطاعات أخرى قد تهمك</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {industries.filter(ind => ind.slug !== industry.slug).slice(0, 8).map(ind => (
                  <Link
                    key={ind.slug}
                    to={`/industries/${ind.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium"
                  >
                    <span>{ind.icon}</span>
                    <span>{ind.nameAr}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default IndustryKeywords;
