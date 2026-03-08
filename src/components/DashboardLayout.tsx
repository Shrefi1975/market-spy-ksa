import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search, FileText, Target, BarChart3, Lightbulb, Tags,
  ShoppingCart, BookOpen, LayoutDashboard, LogOut,
  Moon, Sun, Crown, Compass, ArrowRight
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarProvider, SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const tools = [
  { title: "لوحة التحكم", url: "/dashboard", icon: LayoutDashboard },
  { title: "مولد الكلمات المفتاحية", url: "/dashboard/keyword-generator", icon: Search },
  { title: "تقدير صعوبة الكلمة", url: "/dashboard/keyword-difficulty", icon: BarChart3 },
  { title: "كشف نية البحث", url: "/dashboard/search-intent", icon: Compass },
  { title: "مولد هيكل المقال", url: "/dashboard/article-outline", icon: FileText },
  { title: "مولد وسوم الميتا", url: "/dashboard/meta-tags", icon: Tags },
  { title: "كلمات التجارة الإلكترونية", url: "/dashboard/ecommerce-keywords", icon: ShoppingCart },
  { title: "موجز المحتوى", url: "/dashboard/content-brief", icon: BookOpen },
  { title: "استراتيجية SEO", url: "/dashboard/seo-strategy", icon: Lightbulb },
];

function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { user, subscription, signOut } = useAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = React.useState(document.documentElement.classList.contains('dark'));

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const planLabels: Record<string, string> = { free: 'مجاني', professional: 'احترافي', enterprise: 'مؤسسي' };
  const usagePercent = subscription ? (subscription.searches_used / subscription.searches_limit) * 100 : 0;

  return (
    <Sidebar collapsible="icon" side="right" className="border-l border-border">
      <SidebarContent className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
              <Search className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-lg font-bold">
                <span className="text-foreground">Key</span>
                <span className="text-primary">Rank</span>
              </span>
            )}
          </Link>
        </div>

        <Separator />

        {/* Tools */}
        <SidebarGroup>
          <SidebarGroupLabel>أدوات SEO</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tools.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.url} className={isActive ? "bg-primary/10 text-primary font-medium" : ""}>
                        <item.icon className="w-4 h-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom section */}
        <div className="mt-auto p-4 space-y-3">
          {!collapsed && subscription && (
            <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4">
              <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-2">
                <Crown className="w-3.5 h-3.5 text-primary" />
                <span>{planLabels[subscription.plan] || 'مجاني'}</span>
              </div>
              <div className="text-sm font-bold text-center mb-2">
                {subscription.searches_used} / {subscription.searches_limit} بحث
              </div>
              <Progress value={usagePercent} className="h-1.5 mb-3" />
              {subscription.plan === 'free' && (
                <Button size="sm" className="w-full gradient-bg text-xs font-bold rounded-xl" onClick={() => navigate('/subscribe')}>
                  ترقية الخطة
                </Button>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            <button onClick={toggleDark} className="w-9 h-9 rounded-xl flex items-center justify-center bg-muted hover:bg-muted/80 transition-colors">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            {!collapsed && (
              <button
                onClick={async () => { await signOut(); navigate('/'); }}
                className="flex-1 flex items-center gap-2 text-sm text-destructive hover:bg-destructive/10 rounded-xl px-3 py-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                تسجيل الخروج
              </button>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

const DashboardLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b border-border px-4 bg-background/95 backdrop-blur-md sticky top-0 z-30">
            <SidebarTrigger />
            <div className="mr-auto flex items-center gap-2">
              <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <ArrowRight className="w-3 h-3" />
                العودة للرئيسية
              </Link>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-8 overflow-auto bg-muted/20">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
