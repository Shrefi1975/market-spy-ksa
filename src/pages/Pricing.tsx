import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "مجاني",
    price: "0",
    period: "للأبد",
    description: "مثالي للبدء واستكشاف الأداة",
    features: [
      "5 عمليات بحث شهرياً",
      "تحليل أساسي للكلمات",
      "تقارير PDF بسيطة",
      "دعم عبر البريد",
    ],
    popular: false,
    buttonText: "ابدأ مجاناً",
  },
  {
    name: "احترافي",
    price: "199",
    period: "شهرياً",
    description: "للمتاجر الصغيرة والمتوسطة",
    features: [
      "50 عملية بحث شهرياً",
      "تحليل متقدم للمنافسين",
      "تقارير SEO كاملة",
      "تنبيهات الاتجاهات الموسمية",
      "دعم أولوية 24/7",
      "تصدير البيانات",
    ],
    popular: true,
    buttonText: "ابدأ الآن",
  },
  {
    name: "مؤسسي",
    price: "499",
    period: "شهرياً",
    description: "للشركات الكبيرة والوكالات",
    features: [
      "عمليات بحث غير محدودة",
      "API كامل الوصول",
      "تقارير مخصصة",
      "تحليل عدة مواقع",
      "مدير حساب مخصص",
      "تدريب الفريق",
      "تكامل مع أدواتك",
    ],
    popular: false,
    buttonText: "تواصل معنا",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              خطط <span className="gradient-text">الأسعار</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              اختر الخطة المناسبة لحجم أعمالك واحتياجاتك
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-card rounded-3xl p-8 border-2 transition-all duration-300 ${
                  plan.popular 
                    ? "border-primary shadow-glow scale-105" 
                    : "border-border/50 shadow-card hover:border-primary/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 gradient-bg px-6 py-2 rounded-full text-primary-foreground font-bold text-sm">
                    الأكثر شعبية
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold gradient-text">{plan.price}</span>
                    <span className="text-muted-foreground">ر.س / {plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 gradient-bg rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full h-14 text-lg font-bold rounded-xl transition-all duration-300 ${
                    plan.popular 
                      ? "gradient-bg shadow-glow hover:shadow-soft" 
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
