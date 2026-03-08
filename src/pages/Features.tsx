import React from "react";
import heroFeatures from "@/assets/hero-features.jpg";
import Navbar from "@/components/Navbar";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Target, 
  Zap, 
  Shield, 
  DollarSign, 
  Eye,
  Globe,
  Smartphone,
  Clock,
  Users,
  TrendingUp,
  Lock
} from "lucide-react";

const allFeatures = [
  {
    icon: BarChart3,
    title: "تحليل السوق السعودي",
    description: "بيانات حصرية عن البحث المحلي في المملكة العربية السعودية مع تحديثات يومية",
  },
  {
    icon: Target,
    title: "استهداف دقيق",
    description: "اكتشاف الفرص غير المستخدمة في مدينتك المحددة مع تحليل المنافسين",
  },
  {
    icon: Zap,
    title: "تحديثات لحظية",
    description: "تتبع الاتجاهات الموسمية (رمضان، اليوم الوطني، العيد) بشكل آني",
  },
  {
    icon: Shield,
    title: "تحليل المنافسة",
    description: "مقارنة مباشرة مع أقوى المنافسين في السوق السعودي",
  },
  {
    icon: DollarSign,
    title: "نتائج حقيقية",
    description: "تكلفة النقرة (CPC) والمنافسة لكل كلمة مفتاحية بالريال السعودي",
  },
  {
    icon: Eye,
    title: "رؤية شاملة",
    description: "نصائح SEO مخصصة باللغة العربية لتحسين ظهورك في محركات البحث",
  },
  {
    icon: Globe,
    title: "تغطية جغرافية",
    description: "تحليل مخصص لكل مدينة سعودية رئيسية مع بيانات ديموغرافية",
  },
  {
    icon: Smartphone,
    title: "تحسين الجوال",
    description: "تقارير مخصصة لتحسين تجربة البحث عبر الهواتف الذكية",
  },
  {
    icon: Clock,
    title: "تقارير فورية",
    description: "احصل على تحليلك الكامل خلال دقائق معدودة",
  },
  {
    icon: Users,
    title: "فهم الجمهور",
    description: "تحليل سلوك المستهلك السعودي وأنماط البحث الموسمية",
  },
  {
    icon: TrendingUp,
    title: "توقعات ذكية",
    description: "تنبؤات متقدمة لاتجاهات السوق المستقبلية",
  },
  {
    icon: Lock,
    title: "أمان البيانات",
    description: "حماية كاملة لبياناتك مع تشفير متقدم ومعايير أمان عالية",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroFeatures} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary-foreground">
              مميزات <span className="gradient-text">KeySaudi</span>
            </h1>
            <p className="text-xl text-primary-foreground/70 max-w-3xl mx-auto">
              اكتشف جميع الأدوات والمميزات التي ستساعدك على السيطرة على السوق السعودي
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="feature-card group"
              >
                <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-glow transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
