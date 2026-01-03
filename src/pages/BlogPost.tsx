import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "./Blog";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />
      
      <article className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowRight className="w-4 h-4" />
              العودة للمدونة
            </Link>

            <div className="gradient-bg px-4 py-1.5 rounded-full text-primary-foreground text-sm font-medium inline-block mb-6">
              {post.category}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {post.readTime}
              </span>
              <Button variant="outline" size="sm" className="mr-auto">
                <Share2 className="w-4 h-4 ml-2" />
                مشاركة
              </Button>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-5xl mx-auto mb-12"
          >
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl shadow-card"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div 
              className="prose prose-lg prose-gray dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA */}
            <div className="mt-16 p-8 rounded-3xl gradient-bg text-center">
              <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                هل تريد تحسين ظهور موقعك في محركات البحث؟
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                جرب KeyRank الآن واحصل على تحليل مجاني لموقعك
              </p>
              <Link to="/">
                <Button className="h-12 px-8 text-lg font-bold bg-white text-primary rounded-xl hover:bg-white/90">
                  ابدأ التحليل المجاني
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Related Posts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto mt-24"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              مقالات ذات صلة
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  to={`/blog/${relatedPost.id}`}
                  className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-card hover:shadow-soft transition-all duration-300 group"
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold line-clamp-2 group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
