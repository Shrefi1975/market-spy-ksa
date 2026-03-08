import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Target, Users, Award, Lightbulb, Search, TrendingUp, BarChart3, LineChart, Sparkles } from "lucide-react";
import heroAbout from "@/assets/hero-about.jpg";

const values = [
  {
    icon: Target,
    title: "الدقة",
    description: "نلتزم بتقديم بيانات دقيقة ومحدثة تساعدك على اتخاذ قرارات صحيحة في جميع الأسواق العربية",
  },
  {
    icon: Users,
    title: "العميل أولاً",
    description: "نضع احتياجات عملائنا في صدارة أولوياتنا ونسعى لتحقيق نجاحهم في كافة الدول العربية",
  },
  {
    icon: Award,
    title: "الجودة",
    description: "نسعى للتميز في كل ما نقدمه من خدمات وحلول تقنية متطورة تناسب كل سوق عربي",
  },
  {
    icon: Lightbulb,
    title: "الابتكار",
    description: "نطور أدواتنا باستمرار لمواكبة التغيرات في الأسواق العربية المختلفة",
  },
];

// Floating icons for animation
const floatingIcons = [
  { Icon: Search, delay: 0 },
  { Icon: TrendingUp, delay: 0.5 },
  { Icon: BarChart3, delay: 1 },
  { Icon: Target, delay: 1.5 },
  { Icon: LineChart, delay: 2 },
  { Icon: Sparkles, delay: 2.5 },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />
      
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroAbout} alt="" className="w-full h-full object-cover" />
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
              من <span className="gradient-text">نحن</span>
            </h1>
            <p className="text-xl text-primary-foreground/70 max-w-3xl mx-auto leading-relaxed">
              نحن فريق عربي متخصص في تحليل الأسواق الرقمية وتحسين محركات البحث، 
              نسعى لمساعدة أصحاب الأعمال في جميع الدول العربية على تحقيق النجاح الرقمي
            </p>
          </motion.div>
        </div>
      </section>

          {/* Story Section with Animated Hero */}
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
                انطلقت KeyRank عام 2024 برؤية واضحة: تمكين أصحاب الأعمال العرب 
                من فهم سلوك المستهلك المحلي واستهداف الكلمات المفتاحية الأكثر ربحية في 23 دولة عربية.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                لاحظنا أن معظم أدوات SEO العالمية لا تفهم خصوصية الأسواق العربية - 
                المواسم المحلية مثل رمضان والأعياد الوطنية، واللهجات المختلفة، وسلوك البحث الفريد لكل دولة.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                لذلك أنشأنا KeyRank كأداة مصممة خصيصاً للأسواق العربية، 
                مبنية على بيانات حقيقية وتحليل عميق لاحتياجات كل سوق محلي.
              </p>
            </div>
            
            {/* Animated SEO Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[350px] lg:h-[400px]"
            >
              {/* Central SEO Element */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Orbiting circles */}
                <div className="absolute w-[280px] h-[280px] lg:w-[350px] lg:h-[350px] rounded-full border border-primary/20 animate-[spin_30s_linear_infinite]" />
                <div className="absolute w-[200px] h-[200px] lg:w-[260px] lg:h-[260px] rounded-full border border-primary/30 animate-[spin_20s_linear_infinite_reverse]" />
                <div className="absolute w-[120px] h-[120px] lg:w-[170px] lg:h-[170px] rounded-full border border-primary/40 animate-[spin_15s_linear_infinite]" />

                {/* Central SEO Text */}
                <motion.div
                  className="relative z-10 text-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full gradient-bg flex items-center justify-center shadow-glow">
                    <span className="text-2xl lg:text-3xl font-bold text-white">SEO</span>
                  </div>
                </motion.div>

                {/* Floating Icons around */}
                {floatingIcons.map(({ Icon, delay }, index) => {
                  const angle = (index * 60) * (Math.PI / 180);
                  const radius = 100;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <motion.div
                      key={index}
                      className="absolute"
                      style={{ 
                        left: `calc(50% + ${x}px)`, 
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.2, 1],
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="p-2 lg:p-3 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg">
                        <Icon 
                          size={18} 
                          className="text-primary lg:w-5 lg:h-5"
                          strokeWidth={1.5}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Floating particles */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-2 h-2 rounded-full bg-primary/40"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
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
              <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">23</div>
              <div className="text-primary-foreground/80">دولة عربية</div>
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
