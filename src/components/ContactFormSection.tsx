import React from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ContactFormSection: React.FC = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم إرسال رسالتك! ✨",
      description: "سنتواصل معك في أقرب وقت ممكن",
    });
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <MessageSquare className="w-4 h-4" />
            تواصل معنا
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            لديك سؤال؟ <span className="gradient-text">نحن هنا لمساعدتك</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            فريقنا جاهز للإجابة على استفساراتك ومساعدتك في تحسين ظهورك الرقمي
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">البريد الإلكتروني</h3>
                  <p className="text-muted-foreground">info@keyrank.sa</p>
                </div>
              </div>
            </div>

            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">الهاتف / واتساب</h3>
                  <p className="text-muted-foreground" dir="ltr">+966 56 617 5512</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
              <h3 className="font-bold text-lg mb-2">🚀 ابدأ رحلة نجاحك</h3>
              <p className="text-muted-foreground text-sm">
                انضم لآلاف المواقع السعودية التي تثق بنا لتحسين ظهورها في محركات البحث
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="bg-card/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-border/50">
              <h3 className="text-xl font-bold mb-6">أرسل لنا رسالة</h3>
              
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="الاسم الكامل"
                    className="h-12 text-base rounded-xl bg-background/50"
                    required
                  />
                  <Input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    className="h-12 text-base rounded-xl bg-background/50"
                    required
                  />
                </div>
                
                <Input
                  placeholder="الموضوع"
                  className="h-12 text-base rounded-xl bg-background/50"
                  required
                />
                
                <Textarea
                  placeholder="رسالتك..."
                  className="min-h-[120px] text-base rounded-xl resize-none bg-background/50"
                  required
                />
                
                <Button 
                  type="submit"
                  className="w-full h-12 text-base font-bold gradient-bg rounded-xl shadow-glow hover:shadow-soft transition-all duration-300"
                >
                  <Send className="w-5 h-5 ml-2" />
                  إرسال الرسالة
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
