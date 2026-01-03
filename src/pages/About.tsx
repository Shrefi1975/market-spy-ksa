import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Target, Users, Award, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "الدقة",
    description: "نلتزم بتقديم بيانات دقيقة ومحدثة تساعدك على اتخاذ قرارات صحيحة",
  },
  {
    icon: Users,
    title: "العميل أولاً",
    description: "نضع احتياجات عملائنا في صدارة أولوياتنا ونسعى لتحقيق نجاحهم",
  },
  {
    icon: Award,
    title: "الجودة",
    description: "نسعى للتميز في كل ما نقدمه من خدمات وحلول تقنية متطورة",
  },
  {
    icon: Lightbulb,
    title: "الابتكار",
    description: "نطور أدواتنا باستمرار لمواكبة التغيرات في السوق السعودي",
  },
];

const About = () => {
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
              من <span className="gradient-text">نحن</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              نحن فريق سعودي متخصص في تحليل السوق الرقمي وتحسين محركات البحث، 
              نسعى لمساعدة أصحاب الأعمال في المملكة العربية السعودية على تحقيق النجاح الرقمي
            </p>
          </motion.div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center mb-24"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                قصتنا
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                انطلقت KeyRank من جدة عام 2024 برؤية واضحة: تمكين أصحاب الأعمال السعوديين 
                من فهم سلوك المستهلك المحلي واستهداف الكلمات المفتاحية الأكثر ربحية.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                لاحظنا أن معظم أدوات SEO العالمية لا تفهم خصوصية السوق السعودي - 
                المواسم المحلية مثل رمضان واليوم الوطني، واللهجات المختلفة، وسلوك البحث الفريد.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                لذلك أنشأنا KeyRank كأداة مصممة خصيصاً للسوق السعودي، 
                مبنية على بيانات حقيقية وتحليل عميق لاحتياجات السوق المحلي.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl gradient-bg opacity-20 absolute inset-0" />
              <div className="aspect-square rounded-3xl border-2 border-primary/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl font-bold gradient-text mb-4">K</div>
                  <div className="text-2xl font-bold">KeyRank</div>
                  <div className="text-muted-foreground">جدة، السعودية</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              قيمنا
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 rounded-3xl bg-card border border-border/50 shadow-card hover:shadow-soft transition-all duration-300"
              >
                <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 p-12 rounded-3xl gradient-bg"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">200+</div>
              <div className="text-primary-foreground/80">عميل سعودي</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">50K+</div>
              <div className="text-primary-foreground/80">كلمة مفتاحية</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">98%</div>
              <div className="text-primary-foreground/80">رضا العملاء</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">24/7</div>
              <div className="text-primary-foreground/80">دعم فني</div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
