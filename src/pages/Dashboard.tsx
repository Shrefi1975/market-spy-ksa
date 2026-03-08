import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search, FileText, BarChart3, Compass, Tags,
  ShoppingCart, BookOpen, Lightbulb, Crown, TrendingUp,
  ArrowLeft, Sparkles, Zap
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";

const tools = [
  { title: "مولد الكلمات المفتاحية", desc: "اكتشف كلمات مفتاحية ذهبية للأسواق العربية", icon: Search, url: "/dashboard/keyword-generator", color: "from-primary to-primary/70", badge: "الأكثر استخداماً" },
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
  const usagePercent = subscription ? (subscription.searches_used / subscription.searches_limit) * 100 : 0;
  const planLabels: Record<string, string> = { free: 'مجاني', professional: 'احترافي', enterprise: 'مؤسسي' };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl gradient-dark p-8 lg:p-10"
      >
        {/* Background effects */}
        <div className="absolute inset-0 opacity-20" style={{
          background: "radial-gradient(circle at 80% 50%, hsl(var(--primary) / 0.3), transparent 60%)"
        }} />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary text-sm font-medium">لوحة التحكم</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              مرحباً، <span className="bg-gradient-to-r from-primary via-rose-400 to-amber-400 bg-clip-text text-transparent">{user?.email?.split('@')[0]}</span> 👋
            </h1>
            <p className="text-white/60">اختر أداة من أدوات SEO المتقدمة لبدء التحليل</p>
          </div>

          {subscription && (
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/10 text-center min-w-[120px]">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Crown className="w-4 h-4 text-primary" />
                  <span className="text-xs text-white/50">الخطة</span>
                </div>
                <p className="text-base font-bold text-white">{planLabels[subscription.plan] || 'مجاني'}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/10 min-w-[160px]">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Search className="w-4 h-4 text-primary" />
                  <span className="text-xs text-white/50">عمليات البحث</span>
                </div>
                <p className="text-base font-bold text-white mb-2">{subscription.searches_used} / {subscription.searches_limit}</p>
                <Progress value={usagePercent} className="h-1.5 bg-white/10" />
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/10 text-center min-w-[100px]">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-white/50">الحالة</span>
                </div>
                <p className="text-base font-bold text-emerald-400">نشط</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-primary/5 border border-primary/10 text-sm"
      >
        <TrendingUp className="w-5 h-5 text-primary shrink-0" />
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">نصيحة:</span> ابدأ بمولد الكلمات المفتاحية لاكتشاف فرص السوق، ثم استخدم باقي الأدوات لبناء استراتيجية متكاملة
        </p>
      </motion.div>

      {/* Tools Grid */}
      <div>
        <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
          <span className="w-1.5 h-6 gradient-bg rounded-full inline-block" />
          أدوات SEO المتقدمة
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link to={tool.url}>
                <Card className="relative h-full hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group rounded-2xl overflow-hidden">
                  {tool.badge && (
                    <div className="absolute top-0 right-0 px-3 py-1 gradient-bg text-primary-foreground text-[10px] font-bold rounded-bl-xl">
                      {tool.badge}
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:scale-105 transition-all`}>
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-sm mb-1.5 group-hover:text-primary transition-colors">{tool.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tool.desc}</p>
                    <div className="flex items-center gap-1 text-primary text-xs mt-3 opacity-0 group-hover:opacity-100 transition-all font-medium">
                      <span>استخدم الأداة</span>
                      <ArrowLeft className="w-3 h-3" />
                    </div>
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
