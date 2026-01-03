import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "أحمد الراشد",
    role: "صاحب متجر إلكتروني",
    location: "الرياض",
    content: "بفضل KeyRank، زادت مبيعاتي بنسبة 150% خلال 3 أشهر فقط. الكلمات المفتاحية المقترحة كانت دقيقة جداً وساعدتني في استهداف العملاء الصحيحين.",
    rating: 5,
  },
  {
    name: "سارة المنصور",
    role: "مديرة وكالة تسويق رقمي",
    location: "جدة",
    content: "أداة لا غنى عنها لأي مسوق في السعودية. التحليل الموسمي رائع ويساعدنا في التخطيط لحملات رمضان واليوم الوطني بشكل احترافي.",
    rating: 5,
  },
  {
    name: "محمد العتيبي",
    role: "مؤسس شركة ناشئة",
    location: "الدمام",
    content: "كنت أبحث عن أداة تفهم السوق المحلي، وأخيراً وجدتها! KeyRank غيّرت طريقة تفكيرنا في SEO وزادت حركة الزوار العضوية بشكل ملحوظ.",
    rating: 5,
  },
  {
    name: "نورة القحطاني",
    role: "صاحبة متجر أزياء",
    location: "مكة المكرمة",
    content: "استطعت زيادة ترتيب موقعي في جوجل من الصفحة الخامسة إلى الصفحة الأولى خلال شهرين فقط. النتائج كانت مذهلة!",
    rating: 5,
  },
  {
    name: "فهد الشمري",
    role: "مدير تسويق إلكتروني",
    location: "الخبر",
    content: "تقارير التحليل الموسمي ساعدتنا في مضاعفة مبيعات رمضان هذا العام. أداة احترافية بكل المقاييس.",
    rating: 5,
  },
  {
    name: "ريم الحربي",
    role: "مستشارة SEO",
    location: "جدة",
    content: "أستخدم KeyRank مع جميع عملائي الآن. توفر وقتاً كبيراً في البحث عن الكلمات المفتاحية وتعطي نتائج دقيقة للسوق السعودي.",
    rating: 5,
  },
  {
    name: "عبدالله الزهراني",
    role: "صاحب متجر إلكترونيات",
    location: "الرياض",
    content: "أفضل استثمار قمت به لمتجري. الاشتراك الشهري يعود علي بأضعاف قيمته من خلال زيادة المبيعات.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ماذا يقول <span className="gradient-text">عملاؤنا</span>؟
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            قصص نجاح حقيقية من أصحاب الأعمال في المملكة العربية السعودية
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="testimonial-card relative"
            >
              <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/20" />
              
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-lg leading-relaxed mb-8 text-muted-foreground">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 gradient-bg rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-muted-foreground">
                    {testimonial.role} • {testimonial.location}
                  </p>
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
