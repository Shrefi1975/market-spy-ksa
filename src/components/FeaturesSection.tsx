import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Search, FileText, BarChart3, Compass, Tags,
  ShoppingCart, BookOpen, Lightbulb, ArrowLeft
} from "lucide-react";

const tools = [
  {
    icon: Search,
    title: "مولد الكلمات المفتاحية",
    description: "اكتشف كلمات مفتاحية ذهبية مع تحليل حجم البحث والمنافسة للأسواق العربية",
    url: "/dashboard/keyword-generator",
    color: "from-primary to-primary/70",
  },
  {
    icon: BarChart3,
    title: "تقدير صعوبة الكلمة",
    description: "قيّم صعوبة التصدر من 0 إلى 100 مع تحليل عوامل المنافسة في السوق العربي",
    url: "/dashboard/keyword-difficulty",
    color: "from-blue-500 to-blue-400",
  },
  {
    icon: Compass,
    title: "كشف نية البحث",
    description: "صنّف الكلمات تلقائياً: معلوماتي، تجاري، شرائي، أو توجيهي",
    url: "/dashboard/search-intent",
    color: "from-emerald-500 to-emerald-400",
  },
  {
    icon: FileText,
    title: "مولد هيكل المقال",
    description: "أنشئ هيكل مقال SEO احترافي مع عناوين H1-H3 ومواضيع فرعية",
    url: "/dashboard/article-outline",
    color: "from-violet-500 to-violet-400",
  },
  {
    icon: Tags,
    title: "مولد وسوم الميتا",
    description: "عناوين SEO، أوصاف ميتا، وعلامات Schema احترافية",
    url: "/dashboard/meta-tags",
    color: "from-amber-500 to-amber-400",
  },
  {
    icon: ShoppingCart,
    title: "كلمات التجارة الإلكترونية",
    description: "كلمات مفتاحية متخصصة لـ Shopify، Amazon، سلة، وزد",
    url: "/dashboard/ecommerce-keywords",
    color: "from-rose-500 to-rose-400",
  },
  {
    icon: BookOpen,
    title: "موجز المحتوى",
    description: "موجز محتوى شامل مع كلمات ثانوية وأسئلة شائعة ومواضيع منافسين",
    url: "/dashboard/content-brief",
    color: "from-cyan-500 to-cyan-400",
  },
  {
    icon: Lightbulb,
    title: "استراتيجية SEO",
    description: "خطة SEO متكاملة مع خارطة كلمات وتقويم محتوى واستراتيجية نمو",
    url: "/dashboard/seo-strategy",
    color: "from-orange-500 to-orange-400",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-muted/30" id="tools">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            8 أدوات <span className="gradient-text">SEO متقدمة</span> للأسواق العربية
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            أدوات SEO متقدمة صُممت خصيصاً لفهم سلوك البحث العربي مع دعم اللهجات المحلية والمرادفات
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.url}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link to={tool.url} className="block h-full">
                <div className="feature-card group h-full flex flex-col">
                  <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mb-5 group-hover:shadow-glow transition-all duration-300`}>
                    <tool.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">{tool.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{tool.description}</p>
                  <div className="flex items-center gap-1 text-primary text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
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
