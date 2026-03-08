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
import { ArrowLeft, Search, Globe, Lightbulb, HelpCircle, MapPin } from "lucide-react";

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
      <section className="relative py-20 bg-gradient-to-b from-foreground to-foreground/95 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-60 h-60 bg-primary rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/industries" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            العودة لمكتبة القطاعات
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">{industry.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">كلمات مفتاحية عربية لـ{industry.nameAr}</h1>
              <p className="text-lg text-primary-foreground/70 mt-2">Arabic Keywords for {industry.nameEn}</p>
            </div>
          </div>
          <p className="text-primary-foreground/80 max-w-3xl text-lg leading-relaxed">{industry.description}</p>
          <div className="mt-8">
            <Link to="/auth">
              <Button className="gradient-bg h-12 px-8 text-base">
                <Search className="w-5 h-5 ml-2" />
                ابدأ التحليل المتقدم مجاناً
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <main className="flex-1 bg-muted/30 py-12">
        <div className="container mx-auto px-4 space-y-12">

          {/* Service Keywords */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Search className="w-5 h-5 text-primary" />
                كلمات مفتاحية خدمية – {industry.nameAr}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">#</TableHead>
                    <TableHead className="text-right">الكلمة المفتاحية</TableHead>
                    <TableHead className="text-center">النوع</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {industry.serviceKeywords.map((kw, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{i + 1}</TableCell>
                      <TableCell className="font-medium">{kw}</TableCell>
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <HelpCircle className="w-5 h-5 text-primary" />
                كلمات مفتاحية سؤالية – {industry.nameAr}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">#</TableHead>
                    <TableHead className="text-right">السؤال / الكلمة</TableHead>
                    <TableHead className="text-center">النوع</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {industry.questionKeywords.map((kw, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{i + 1}</TableCell>
                      <TableCell className="font-medium">{kw}</TableCell>
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Globe className="w-5 h-5 text-primary" />
                كلمات مفتاحية تجارية – {industry.nameAr}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">#</TableHead>
                    <TableHead className="text-right">الكلمة المفتاحية</TableHead>
                    <TableHead className="text-center">النوع</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {industry.commercialKeywords.map((kw, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{i + 1}</TableCell>
                      <TableCell className="font-medium">{kw}</TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20">تجاري</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Content Ideas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Lightbulb className="w-5 h-5 text-primary" />
                أفكار محتوى لـ{industry.nameAr}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {industry.contentIdeas.map((idea, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <span className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0 mt-0.5">{i + 1}</span>
                    <span className="font-medium">{idea}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Country-Specific Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MapPin className="w-5 h-5 text-primary" />
                كلمات مفتاحية لـ{industry.nameAr} حسب الدولة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {arabCountries.map(country => (
                  <Link
                    key={country.code}
                    to={`/arabic-keywords-for-${industry.slug}/${country.nameEn.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium"
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span>{country.nameAr}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <HelpCircle className="w-5 h-5 text-primary" />
                أسئلة شائعة عن SEO لـ{industry.nameAr}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {industry.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-right font-medium">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Other Industries */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">قطاعات أخرى قد تهمك</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {industries.filter(ind => ind.slug !== industry.slug).slice(0, 8).map(ind => (
                  <Link
                    key={ind.slug}
                    to={`/arabic-keywords-for-${ind.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium"
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
