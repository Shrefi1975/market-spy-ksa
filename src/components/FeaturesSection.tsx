import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Search, FileText, BarChart3, Compass, Tags,
  ShoppingCart, BookOpen, Lightbulb, ArrowLeft, Star
} from "lucide-react";

const tools = [
  { icon: Search, title: "مولد الكلمات المفتاحية", description: "اكتشف كلمات مفتاحية ذهبية مع تحليل حجم البحث والمنافسة للأسواق العربية", url: "/dashboard/keyword-generator", color: "from-primary to-primary/70", badge: "الأكثر استخداماً" },
  { icon: BarChart3, title: "تقدير صعوبة الكلمة", description: "قيّم صعوبة التصدر من 0 إلى 100 مع تحليل عوامل المنافسة في السوق العربي", url: "/dashboard/keyword-difficulty", color: "from-blue-500 to-blue-400" },
  { icon: Compass, title: "كشف نية البحث", description: "صنّف الكلمات تلقائياً: معلوماتي، تجاري، شرائي، أو توجيهي", url: "/dashboard/search-intent", color: "from-emerald-500 to-emerald-400" },
  { icon: FileText, title: "مولد هيكل المقال", description: "أنشئ هيكل مقال SEO احترافي مع عناوين H1-H3 ومواضيع فرعية", url: "/dashboard/article-outline", color: "from-violet-500 to-violet-400" },
  { icon: Tags, title: "مولد وسوم الميتا", description: "عناوين SEO، أوصاف ميتا، وعلامات Schema احترافية", url: "/dashboard/meta-tags", color: "from-amber-500 to-amber-400" },
  { icon: ShoppingCart, title: "كلمات التجارة الإلكترونية", description: "كلمات مفتاحية متخصصة لـ Shopify، Amazon، سلة، وزد", url: "/dashboard/ecommerce-keywords", color: "from-rose-500 to-rose-400" },
  { icon: BookOpen, title: "موجز المحتوى", description: "موجز محتوى شامل مع كلمات ثانوية وأسئلة شائعة ومواضيع منافسين", url: "/dashboard/content-brief", color: "from-cyan-500 to-cyan-400" },
  { icon: Lightbulb, title: "استراتيجية SEO", description: "خطة SEO متكاملة مع خارطة كلمات وتقويم محتوى واستراتيجية نمو", url: "/dashboard/seo-strategy", color: "from-orange-500 to-orange-400" },
];

const FeaturesSection = () => {
  return (
    <section className="py-28 relative overflow-hidden" id="tools">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-muted/30" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6"
          >
            <Star className="w-4 h-4" />
            أدوات احترافية
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            8 أدوات <span className="gradient-text">SEO متقدمة</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            صُممت خصيصاً لفهم سلوك البحث العربي مع دعم اللهجات المحلية والمرادفات
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.url}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <Link to={tool.url} className="block h-full">
                <div className="relative group h-full flex flex-col bg-card rounded-2xl p-7 border border-border/60 hover:border-primary/40 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                  {/* Badge */}
                  {tool.badge && (
                    <div className="absolute -top-3 right-4 px-3 py-1 gradient-bg text-primary-foreground text-[11px] font-bold rounded-full shadow-soft">
                      {tool.badge}
                    </div>
                  )}
                  
                  <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mb-5 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300`}>
                    <tool.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">{tool.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{tool.description}</p>
                  <div className="flex items-center gap-1.5 text-primary text-sm mt-5 font-medium opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <span>جرّب الآن</span>
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
