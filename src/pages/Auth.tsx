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
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { signIn, signUp, signInWithGoogle, user, loading } = useAuth();
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

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast({
          title: 'خطأ في تسجيل الدخول',
          description: error.message,
          variant: 'destructive',
        });
      }
    } finally {
      setIsGoogleLoading(false);
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

            <div className="glass-card rounded-3xl p-8 border border-primary/10">
              {/* Google Sign In Button */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="w-full h-14 text-lg font-medium rounded-xl mb-6 border-2 hover:bg-muted/50 transition-all"
              >
                {isGoogleLoading ? (
                  <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                ) : (
                  <svg className="w-5 h-5 ml-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                {isGoogleLoading ? 'جاري التحميل...' : 'المتابعة مع Google'}
              </Button>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">أو</span>
                </div>
              </div>

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