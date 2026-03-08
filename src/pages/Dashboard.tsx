import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search, FileText, BarChart3, Compass, Tags,
  ShoppingCart, BookOpen, Lightbulb, ArrowLeft, Crown
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const tools = [
  { title: "مولد الكلمات المفتاحية", desc: "اكتشف كلمات مفتاحية ذهبية بالذكاء الاصطناعي", icon: Search, url: "/dashboard/keyword-generator", color: "from-primary to-primary/70" },
  { title: "تقدير صعوبة الكلمة", desc: "قيّم صعوبة التصدر من 0 إلى 100", icon: BarChart3, url: "/dashboard/keyword-difficulty", color: "from-blue-500 to-blue-400" },
  { title: "كشف نية البحث", desc: "صنّف الكلمات حسب نية المستخدم", icon: Compass, url: "/dashboard/search-intent", color: "from-emerald-500 to-emerald-400" },
  { title: "مولد هيكل المقال", desc: "أنشئ هيكل مقال محسّن لـ SEO", icon: FileText, url: "/dashboard/article-outline", color: "from-violet-500 to-violet-400" },
  { title: "مولد وسوم الميتا", desc: "عناوين ووصف ميتا احترافية", icon: Tags, url: "/dashboard/meta-tags", color: "from-amber-500 to-amber-400" },
  { title: "كلمات التجارة الإلكترونية", desc: "كلمات مفتاحية لمتاجر إلكترونية", icon: ShoppingCart, url: "/dashboard/ecommerce-keywords", color: "from-rose-500 to-rose-400" },
  { title: "موجز المحتوى", desc: "أنشئ موجز محتوى شامل لأي كلمة", icon: BookOpen, url: "/dashboard/content-brief", color: "from-cyan-500 to-cyan-400" },
  { title: "استراتيجية SEO", desc: "خطة SEO كاملة لموقعك", icon: Lightbulb, url: "/dashboard/seo-strategy", color: "from-orange-500 to-orange-400" },
];

const Dashboard: React.FC = () => {
  const { user, subscription } = useAuth();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          مرحباً، <span className="gradient-text">{user?.email?.split('@')[0]}</span> 👋
        </h1>
        <p className="text-muted-foreground mt-1">اختر أداة من أدوات SEO لبدء التحليل</p>
      </div>

      {/* Stats */}
      {subscription && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Search className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">عمليات البحث</p>
                <p className="text-lg font-bold">{subscription.searches_used} / {subscription.searches_limit}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Crown className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">الخطة الحالية</p>
                <p className="text-lg font-bold">{subscription.plan === 'free' ? 'مجاني' : subscription.plan === 'professional' ? 'احترافي' : 'مؤسسي'}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">الحالة</p>
                <p className="text-lg font-bold text-emerald-500">نشط</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tools Grid */}
      <div>
        <h2 className="text-lg font-bold mb-4">أدوات SEO بالذكاء الاصطناعي</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={tool.url}>
                <Card className="h-full hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-5">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3`}>
                      <tool.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{tool.title}</h3>
                    <p className="text-xs text-muted-foreground">{tool.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
