import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Sparkles, Crown, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const plans = [
  {
    id: "free",
    name: "مجاني",
    price: "0",
    period: "للأبد",
    description: "تجربة واحدة مجانية لكل مستخدم",
    icon: Gift,
    features: [
      "تجربة واحدة مجانية",
      "تحليل أساسي للكلمات",
      "تقارير PDF بسيطة",
      "دعم عبر البريد",
    ],
    popular: false,
    buttonText: "ابدأ مجاناً",
    gradient: "from-slate-500 to-slate-600",
  },
  {
    id: "professional",
    name: "احترافي",
    price: "150",
    period: "شهرياً",
    description: "للمتاجر الصغيرة والمتوسطة",
    icon: Crown,
    features: [
      "50 عملية بحث شهرياً",
      "تحليل متقدم للمنافسين",
      "تقارير SEO كاملة",
      "تنبيهات الاتجاهات الموسمية",
      "دعم أولوية 24/7",
      "تصدير البيانات",
    ],
    popular: true,
    buttonText: "اشترك الآن",
    gradient: "from-primary to-accent",
  },
];

const PricingSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePlanClick = (planId: string) => {
    if (planId === "free") {
      if (!user) {
        navigate("/auth");
      }
      return;
    }
    navigate("/subscribe");
  };

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            أسعار بسيطة وشفافة
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            خطط <span className="gradient-text">الأسعار</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            اختر الخطة المناسبة لحجم أعمالك واحتياجاتك
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-card rounded-3xl p-8 border-2 transition-all duration-300 ${
                plan.popular 
                  ? "border-primary shadow-glow scale-105" 
                  : "border-border/50 shadow-card hover:border-primary/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 gradient-bg px-6 py-2 rounded-full text-primary-foreground font-bold text-sm flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  الأكثر شعبية
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
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
                onClick={() => handlePlanClick(plan.id)}
                className={`w-full h-14 text-lg font-bold rounded-xl transition-all duration-300 ${
                  plan.popular 
                    ? "gradient-bg shadow-glow hover:shadow-soft hover:scale-[1.02]" 
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            إلغاء في أي وقت
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            دعم فني متواصل
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            ضمان استرداد 14 يوم
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;