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
import { ArrowLeft, Search, MapPin, Lightbulb, HelpCircle, TrendingUp } from "lucide-react";

const IndustryCountryKeywords: React.FC = () => {
  const { slug, country: countrySlug } = useParams<{ slug: string; country: string }>();
  const industry = slug ? getIndustryBySlug(slug) : undefined;
  const country = arabCountries.find(c => c.nameEn.toLowerCase().replace(/\s+/g, "-") === countrySlug);

  useEffect(() => {
    if (industry && country) {
      document.title = `كلمات مفتاحية لـ${industry.nameAr} في ${country.nameAr} | KeyRank`;
      const metaDesc = document.querySelector('meta[name="description"]');
      const desc = `اكتشف أفضل الكلمات المفتاحية لـ${industry.nameAr} في ${country.nameAr}. كلمات بحث محلية، أسئلة شائعة، وأفكار محتوى مخصصة للسوق ${country.regionAr}.`;
      if (metaDesc) metaDesc.setAttribute("content", desc);
      else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = desc;
        document.head.appendChild(meta);
      }
    }
    window.scrollTo(0, 0);
  }, [industry, country]);

  if (!industry || !country) {
    return (
      <div className="min-h-screen flex flex-col" dir="rtl">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">الصفحة غير موجودة</h1>
            <Link to="/industries" className="text-primary hover:underline">العودة لمكتبة القطاعات</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Generate country-specific keywords
  const localizedService = industry.serviceKeywords.map(kw => `${kw} في ${country.nameAr}`);
  const localizedQuestions = industry.questionKeywords.map(kw => `${kw} في ${country.nameAr}`);
  const localizedCommercial = industry.commercialKeywords.map(kw => `${kw} في ${country.nameAr}`);
  const localizedContentIdeas = industry.contentIdeas.map(idea => `${idea} في ${country.nameAr}`);

  const otherCountries = arabCountries.filter(c => c.code !== country.code).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-b from-foreground to-foreground/95 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-primary rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link to={`/arabic-keywords-for-${industry.slug}`} className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            العودة لـ{industry.nameAr}
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">{country.flag}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">كلمات مفتاحية لـ{industry.nameAr} في {country.nameAr}</h1>
              <p className="text-lg text-primary-foreground/70 mt-2">{industry.nameEn} Keywords in {country.nameEn}</p>
            </div>
          </div>
          <p className="text-primary-foreground/80 max-w-3xl text-lg leading-relaxed">
            اكتشف الكلمات المفتاحية الأكثر بحثاً في قطاع {industry.nameAr} داخل {country.nameAr}. كلمات محلية مخصصة تراعي اللهجة والسلوك البحثي في السوق {country.regionAr}.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Badge className="bg-primary/20 text-primary-foreground border-0 text-sm px-3 py-1">{country.currency}</Badge>
            <Badge className="bg-primary-foreground/10 text-primary-foreground border-0 text-sm px-3 py-1">{country.regionAr}</Badge>
          </div>
          <div className="mt-8">
            <Link to="/auth">
              <Button className="gradient-bg h-12 px-8 text-base">
                <Search className="w-5 h-5 ml-2" />
                حلل كلماتك المفتاحية الآن
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <main className="flex-1 bg-muted/30 py-12">
        <div className="container mx-auto px-4 space-y-12">

          {/* Market Info */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h2 className="text-lg font-bold mb-2">نبذة عن سوق {industry.nameAr} في {country.nameAr}</h2>
                  <p className="text-muted-foreground leading-relaxed">{country.marketInfo}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Keywords */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Search className="w-5 h-5 text-primary" />
                كلمات خدمية – {industry.nameAr} في {country.nameAr}
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
                  {localizedService.map((kw, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
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
                أسئلة بحثية – {industry.nameAr} في {country.nameAr}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">#</TableHead>
                    <TableHead className="text-right">السؤال</TableHead>
                    <TableHead className="text-center">النوع</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {localizedQuestions.map((kw, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
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
                <MapPin className="w-5 h-5 text-primary" />
                كلمات تجارية – {industry.nameAr} في {country.nameAr}
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
                  {localizedCommercial.map((kw, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
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
                أفكار محتوى لـ{industry.nameAr} في {country.nameAr}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {localizedContentIdeas.map((idea, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <span className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0 mt-0.5">{i + 1}</span>
                    <span className="font-medium">{idea}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Other Countries */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{industry.nameAr} في دول عربية أخرى</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {otherCountries.map(c => (
                  <Link
                    key={c.code}
                    to={`/arabic-keywords-for-${industry.slug}/${c.nameEn.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium"
                  >
                    <span className="text-lg">{c.flag}</span>
                    <span>{c.nameAr}</span>
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
                أسئلة شائعة
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

        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default IndustryCountryKeywords;
