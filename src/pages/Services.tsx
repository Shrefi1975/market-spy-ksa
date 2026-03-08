import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  TrendingUp, 
  Target, 
  BarChart3, 
  FileText, 
  Users,
  ArrowLeft,
  Globe
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Search,
    title: "تحليل الكلمات المفتاحية",
    description: "اكتشف الكلمات المفتاحية الأكثر بحثاً في 23 دولة عربية مع تحليل دقيق لحجم البحث والمنافسة",
    features: [
      "تحليل 100,000+ كلمة مفتاحية عربية",
      "تصنيف حسب الدولة والمنطقة",
      "تحديد الكلمات طويلة الذيل المربحة",
      "تحليل نية البحث",
    ],
  },
  {
    icon: Globe,
    title: "تغطية 23 دولة عربية",
    description: "نغطي جميع الأسواق العربية من الخليج إلى المغرب مع مراعاة خصوصية كل سوق",
    features: [
      "السعودية والإمارات والكويت",
      "مصر والأردن ولبنان",
      "المغرب والجزائر وتونس",
      "وجميع الدول العربية الأخرى",
    ],
  },
  {
    icon: TrendingUp,
    title: "تتبع الاتجاهات الموسمية",
    description: "استفد من المواسم المحلية الهامة في كل دولة عربية مع تنبيهات ذكية",
    features: [
      "تتبع اتجاهات رمضان والعيد",
      "تحليل الأعياد الوطنية لكل دولة",
      "تنبيهات استباقية",
      "توصيات محتوى موسمية",
    ],
  },
  {
    icon: Target,
    title: "تحليل المنافسين",
    description: "اعرف كلمات منافسيك في أي سوق عربي واكتشف الفجوات في استراتيجيتهم",
    features: [
      "تحليل كلمات المنافسين",
      "مقارنة الترتيب",
      "اكتشاف الفرص غير المستغلة",
      "تقارير مقارنة شاملة",
    ],
  },
  {
    icon: BarChart3,
    title: "تقارير SEO متقدمة",
    description: "احصل على تقارير مفصلة وقابلة للتنفيذ لتحسين موقعك في أي سوق عربي",
    features: [
      "تقارير PDF و HTML احترافية",
      "توصيات تحسين المحتوى",
      "تحليل Meta Tags",
      "اقتراحات عناوين SEO",
    ],
  },
  {
    icon: FileText,
    title: "تحسين المحتوى",
    description: "اقتراحات ذكية لتحسين محتوى موقعك بناءً على بيانات البحث في كل دولة",
    features: [
      "تحليل كثافة الكلمات",
      "اقتراحات عناوين جذابة",
      "تحسين الوصف التعريفي",
      "نصائح هيكلة المحتوى",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">خدماتنا</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              نقدم مجموعة متكاملة من الخدمات المصممة خصيصاً لمساعدتك على النجاح في جميع الأسواق العربية
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-3xl p-8 border border-border/50 shadow-card hover:shadow-soft hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full gradient-bg" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 text-center p-12 rounded-3xl gradient-bg"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              جاهز لتحسين ظهورك في محركات البحث؟
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              ابدأ الآن واحصل على تحليل مجاني لموقعك في أي سوق عربي
            </p>
            <Link to="/">
              <Button className="h-14 px-10 text-lg font-bold bg-white text-primary rounded-xl hover:bg-white/90 transition-all duration-300">
                ابدأ التحليل المجاني
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
