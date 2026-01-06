import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Target, 
  Zap, 
  Shield, 
  DollarSign, 
  Eye 
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "تحليل الأسواق العربية",
    description: "بيانات حصرية عن البحث المحلي في 18 دولة عربية من الخليج إلى المغرب",
  },
  {
    icon: Target,
    title: "استهداف دقيق",
    description: "اكتشاف الفرص غير المستخدمة في كل سوق عربي",
  },
  {
    icon: Zap,
    title: "تحديثات لحظية",
    description: "تتبع الاتجاهات الموسمية (رمضان، الأعياد، المناسبات المحلية)",
  },
  {
    icon: Shield,
    title: "تحليل المنافسة",
    description: "مقارنة مباشرة مع أقوى المنافسين في كل سوق",
  },
  {
    icon: DollarSign,
    title: "نتائج حقيقية",
    description: "تكلفة النقرة (CPC) والمنافسة لكل كلمة مفتاحية",
  },
  {
    icon: Eye,
    title: "رؤية شاملة",
    description: "نصائح SEO مخصصة باللغة العربية لتحسين ظهورك",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            مميزات <span className="gradient-text">فريدة</span> للأسواق العربية
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            أدوات متقدمة صُممت خصيصاً لفهم سلوك المستهلك العربي وتحقيق أقصى استفادة
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
  );
};

export default FeaturesSection;
