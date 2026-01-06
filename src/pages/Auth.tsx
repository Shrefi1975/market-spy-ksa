import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Loader2, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { z } from 'zod';

const signUpSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
  fullName: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
});

const signInSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(1, 'كلمة المرور مطلوبة'),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { signIn, signUp, user, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const validateForm = () => {
    setErrors({});
    
    try {
      if (isLogin) {
        signInSchema.parse({ email, password });
      } else {
        signUpSchema.parse({ email, password, fullName });
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: 'خطأ في تسجيل الدخول',
              description: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'خطأ',
              description: error.message,
              variant: 'destructive',
            });
          }
          return;
        }

        toast({
          title: 'تم تسجيل الدخول بنجاح! 🎉',
          description: 'مرحباً بك مجدداً',
        });
        navigate('/');
      } else {
        // Check IP before registration
        try {
          const { data: ipCheckData } = await supabase.functions.invoke('ip-check', {
            body: { action: 'check-registration', email },
          });

          if (ipCheckData && !ipCheckData.allowed) {
            toast({
              title: 'غير مسموح بالتسجيل',
              description: ipCheckData.reason || 'يرجى المحاولة لاحقاً',
              variant: 'destructive',
            });
            return;
          }
        } catch (ipError) {
          console.error('IP check error:', ipError);
          // Continue with registration if IP check fails
        }

        const { error } = await signUp(email, password, fullName);
        
        if (error) {
          if (error.message.includes('User already registered')) {
            toast({
              title: 'المستخدم موجود بالفعل',
              description: 'هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'خطأ في التسجيل',
              description: error.message,
              variant: 'destructive',
            });
          }
          return;
        }

        toast({
          title: 'تم إنشاء الحساب بنجاح! 🎉',
          description: 'يمكنك الآن استخدام الأداة',
        });
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-24 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
              </h1>
              <p className="text-muted-foreground">
                {isLogin 
                  ? 'أهلاً بعودتك! سجل الدخول للمتابعة' 
                  : 'انضم إلينا وابدأ تحليل الكلمات المفتاحية'
                }
              </p>
            </div>

            <div className="glass-card rounded-3xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الاسم الكامل</label>
                    <div className="relative">
                      <User className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="أدخل اسمك الكامل"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pr-12 h-14 text-lg bg-background/80 border-border/50 rounded-xl"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-sm text-destructive">{errors.fullName}</p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">البريد الإلكتروني</label>
                  <div className="relative">
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pr-12 h-14 text-lg bg-background/80 border-border/50 rounded-xl"
                      dir="ltr"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">كلمة المرور</label>
                  <div className="relative">
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-12 pl-12 h-14 text-lg bg-background/80 border-border/50 rounded-xl"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                  {!isLogin && (
                    <p className="text-xs text-muted-foreground">
                      يجب أن تكون 8 أحرف على الأقل
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 text-lg font-bold gradient-bg rounded-xl shadow-glow hover:shadow-soft transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                      جاري المعالجة...
                    </>
                  ) : isLogin ? (
                    'تسجيل الدخول'
                  ) : (
                    'إنشاء حساب'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setErrors({});
                    }}
                    className="text-primary font-medium hover:underline"
                  >
                    {isLogin ? 'أنشئ حساباً جديداً' : 'سجل الدخول'}
                  </button>
                </p>
              </div>
            </div>

            {!isLogin && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                🎁 احصل على تجربة مجانية واحدة عند التسجيل
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Auth;
