import React from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "ما هي أداة KeyRank وكيف تعمل؟",
    answer: "KeyRank هي أداة تحليل كلمات مفتاحية متخصصة للأسواق العربية. تستخدم الذكاء الاصطناعي المتقدم لتحليل موقعك ونشاطك التجاري، ثم تقترح كلمات مفتاحية ذهبية مع عناوين SEO وأوصاف Meta جاهزة للاستخدام."
  },
  {
    question: "ما هي الدول العربية المدعومة؟",
    answer: "ندعم 18 دولة عربية تشمل: السعودية، الإمارات، مصر، الكويت، قطر، البحرين، عُمان، الأردن، فلسطين، العراق، لبنان، سوريا، اليمن، المغرب، الجزائر، تونس، ليبيا، والسودان."
  },
  {
    question: "هل البيانات التي تقدمونها حقيقية ودقيقة؟",
    answer: "نعم، نستخدم بيانات حقيقية من محركات البحث ونحللها بناءً على كل سوق عربي والمواسم المحلية. نسبة دقة التحليل لدينا تصل إلى 100% بناءً على تقييمات عملائنا."
  },
  {
    question: "كم عدد الكلمات المفتاحية التي سأحصل عليها؟",
    answer: "ستحصل على 20-30 كلمة مفتاحية متنوعة تشمل كلمات رئيسية، كلمات طويلة الذيل، وأسئلة شائعة يبحث عنها جمهورك المستهدف في الدولة التي تختارها."
  },
  {
    question: "هل يمكنني تنزيل التقرير والاحتفاظ به؟",
    answer: "بالتأكيد! بعد اكتمال التحليل، يمكنك تنزيل تقرير شامل بصيغة HTML يحتوي على جميع الكلمات المفتاحية مع التوصيات والتحليلات المفصلة."
  },
  {
    question: "ما هي الباقات المتاحة وأسعارها؟",
    answer: "نقدم تجربة مجانية واحدة لتجربة الأداة. لدينا باقة احترافية بـ 49 ريال شهرياً (10 تحليلات) وباقة الشركات بـ 99 ريال شهرياً (تحليلات غير محدودة) مع دعم فني متميز."
  },
  {
    question: "هل بياناتي ومعلومات موقعي آمنة؟",
    answer: "نعم، نلتزم بأعلى معايير الأمان والخصوصية. بياناتك محمية 100% ولا نشاركها مع أي طرف ثالث. نستخدم تشفير SSL لحماية جميع الاتصالات."
  },
  {
    question: "كم يستغرق وقت التحليل؟",
    answer: "التحليل سريع جداً! يستغرق في المتوسط 3 ثوانٍ فقط للحصول على نتائج شاملة ومفصلة لموقعك."
  },
  {
    question: "هل يمكنني استهداف مناطق محددة؟",
    answer: "نعم، في بعض الدول مثل السعودية والإمارات ومصر، يمكنك اختيار مناطق محددة للاستهداف للحصول على نتائج أكثر دقة."
  }
];

const FAQSection: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-background to-primary/5">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <HelpCircle className="w-4 h-4" />
            الأسئلة الشائعة
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            كل ما تريد <span className="gradient-text">معرفته</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            إجابات على أكثر الأسئلة شيوعاً حول خدمتنا
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 px-6 overflow-hidden hover:border-primary/30 transition-all"
                >
                  <AccordionTrigger className="text-right text-base font-semibold hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
