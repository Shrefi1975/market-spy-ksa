import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, Users } from "lucide-react";

const testimonials = [
  { name: "أحمد الراشد", role: "صاحب متجر إلكتروني", location: "الرياض", content: "بفضل KeyRank، زادت مبيعاتي بنسبة 150% خلال 3 أشهر فقط. الكلمات المفتاحية المقترحة كانت دقيقة جداً وساعدتني في استهداف العملاء الصحيحين.", rating: 5, metric: "+150% مبيعات" },
  { name: "سارة المنصور", role: "مديرة وكالة تسويق", location: "جدة", content: "أداة لا غنى عنها لأي مسوق في السعودية. التحليل الموسمي رائع ويساعدنا في التخطيط لحملات رمضان واليوم الوطني بشكل احترافي.", rating: 5, metric: "وكالة #1" },
  { name: "محمد العتيبي", role: "مؤسس شركة ناشئة", location: "الدمام", content: "كنت أبحث عن أداة تفهم السوق المحلي، وأخيراً وجدتها! KeyRank غيّرت طريقة تفكيرنا في SEO وزادت حركة الزوار العضوية بشكل ملحوظ.", rating: 5, metric: "+200% زوار" },
  { name: "نورة القحطاني", role: "صاحبة متجر أزياء", location: "مكة المكرمة", content: "استطعت زيادة ترتيب موقعي في جوجل من الصفحة الخامسة إلى الصفحة الأولى خلال شهرين فقط. النتائج كانت مذهلة!", rating: 5, metric: "صفحة #1" },
  { name: "فهد الشمري", role: "مدير تسويق إلكتروني", location: "الخبر", content: "تقارير التحليل الموسمي ساعدتنا في مضاعفة مبيعات رمضان هذا العام. أداة احترافية بكل المقاييس.", rating: 5, metric: "2× مبيعات رمضان" },
  { name: "ريم الحربي", role: "مستشارة SEO", location: "جدة", content: "أستخدم KeyRank مع جميع عملائي الآن. توفر وقتاً كبيراً في البحث عن الكلمات المفتاحية وتعطي نتائج دقيقة للسوق السعودي.", rating: 5, metric: "15+ عميل" },
];

const TestimonialsSection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            قصص نجاح حقيقية
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ماذا يقول <span className="gradient-text">عملاؤنا</span>؟
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نتائج حقيقية من أصحاب الأعمال في المملكة العربية السعودية
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative bg-card rounded-3xl p-7 border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-500"
            >
              {/* Metric badge */}
              <div className="absolute -top-3 left-4 px-3 py-1 gradient-bg text-primary-foreground text-xs font-bold rounded-full shadow-soft">
                {t.metric}
              </div>

              <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
              
              <div className="flex items-center gap-0.5 mb-5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-base leading-relaxed mb-6 text-muted-foreground">
                "{t.content}"
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-border/50">
                <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold">{t.name}</h4>
                  <p className="text-sm text-muted-foreground">{t.role} • {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
