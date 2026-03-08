import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Auth from "./pages/Auth";
import Subscribe from "./pages/Subscribe";
import CountryLanding from "./pages/CountryLanding";
import NotFound from "./pages/NotFound";
import Industries from "./pages/Industries";
import IndustryKeywords from "./pages/IndustryKeywords";
import IndustryCountryKeywords from "./pages/IndustryCountryKeywords";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import KeywordGenerator from "./pages/dashboard/KeywordGenerator";
import KeywordDifficulty from "./pages/dashboard/KeywordDifficulty";
import SearchIntent from "./pages/dashboard/SearchIntent";
import ArticleOutline from "./pages/dashboard/ArticleOutline";
import MetaTags from "./pages/dashboard/MetaTags";
import EcommerceKeywords from "./pages/dashboard/EcommerceKeywords";
import ContentBrief from "./pages/dashboard/ContentBrief";
import SeoStrategy from "./pages/dashboard/SeoStrategy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/country/:countryCode" element={<CountryLanding />} />
            
            {/* Industry Keyword Pages */}
            <Route path="/industries" element={<Industries />} />
            <Route path="/arabic-keywords-for-:slug" element={<IndustryKeywords />} />
            <Route path="/arabic-keywords-for-:slug/:country" element={<IndustryCountryKeywords />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="keyword-generator" element={<KeywordGenerator />} />
              <Route path="keyword-difficulty" element={<KeywordDifficulty />} />
              <Route path="search-intent" element={<SearchIntent />} />
              <Route path="article-outline" element={<ArticleOutline />} />
              <Route path="meta-tags" element={<MetaTags />} />
              <Route path="ecommerce-keywords" element={<EcommerceKeywords />} />
              <Route path="content-brief" element={<ContentBrief />} />
              <Route path="seo-strategy" element={<SeoStrategy />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
