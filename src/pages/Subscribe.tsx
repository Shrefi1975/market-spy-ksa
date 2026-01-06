import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, CreditCard, Building2, Copy, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const plans = [
  {
    id: 'professional',
    name: 'احترافي',
    price: 150,
    period: 'شهرياً',
    description: 'للمتاجر الصغيرة والمتوسطة',
    features: [
      '50 عملية بحث شهرياً',
      'تحليل متقدم للمنافسين',
      'تقارير SEO كاملة',
      'تنبيهات الاتجاهات الموسمية',
      'دعم أولوية 24/7',
      'تصدير البيانات',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'مؤسسي',
    price: 250,
    period: 'شهرياً',
    description: 'للشركات الكبيرة والوكالات',
    features: [
      'عمليات بحث غير محدودة',
      'API كامل الوصول',
      'تقارير مخصصة',
      'تحليل عدة مواقع',
      'مدير حساب مخصص',
      'تدريب الفريق',
      'تكامل مع أدواتك',
    ],
    popular: false,
  },
];

const bankDetails = {
  bankName: 'بنك الراجحي',
  accountName: 'مؤسسة ماركت ماو للتقنية',
  accountNumber: 'SA1234567890123456789012',
  iban: 'SA1234567890123456789012',
};

const Subscribe = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [step, setStep] = useState<'select' | 'payment' | 'confirm'>('select');
  const [transferReference, setTransferReference] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user, subscription } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'تم النسخ',
      description: `تم نسخ ${label} إلى الحافظة`,
    });
  };

  const handleSelectPlan = (planId: string) => {
    if (!user) {
      toast({
        title: 'يجب تسجيل الدخول',
        description: 'يرجى تسجيل الدخول أولاً للاشتراك في خطة',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }
    
    setSelectedPlan(planId);
    setStep('payment');
  };

  const handleSubmitPayment = async () => {
    if (!transferReference.trim()) {
      toast({
        title: 'خطأ',
        description: 'يرجى إدخال رقم مرجع التحويل',
        variant: 'destructive',
      });
      return;
    }

    if (!user || !selectedPlanData) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('payment_requests').insert({
        user_id: user.id,
        plan: selectedPlan as 'professional' | 'enterprise',
        amount: selectedPlanData.price,
        bank_transfer_reference: transferReference,
        status: 'pending',
      });

      if (error) throw error;

      setStep('confirm');
      toast({
        title: 'تم إرسال طلب الدفع بنجاح! 🎉',
        description: 'سيتم مراجعة الطلب وتفعيل اشتراكك خلال 24 ساعة',
      });
    } catch (error) {
      console.error('Error submitting payment:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء إرسال طلب الدفع. يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {step === 'select' && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  اختر <span className="gradient-text">خطتك</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  ارتقِ بمتجرك مع خطط الاشتراك المميزة
                </p>
              </motion.div>

              {subscription?.plan === 'free' && !subscription.free_trial_used && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-2xl mx-auto mb-8 p-4 bg-primary/10 border border-primary/20 rounded-xl text-center"
                >
                  <p className="text-primary font-medium">
                    🎁 لديك تجربة مجانية واحدة متاحة - استخدمها للتعرف على قوة الأداة!
                  </p>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative bg-card rounded-3xl p-8 border-2 transition-all duration-300 ${
                      plan.popular 
                        ? 'border-primary shadow-glow' 
                        : 'border-border/50 shadow-card hover:border-primary/50'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 gradient-bg px-6 py-2 rounded-full text-primary-foreground font-bold text-sm">
                        الأكثر شعبية
                      </div>
                    )}

                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground mb-6">{plan.description}</p>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-5xl font-bold gradient-text">{plan.price}</span>
                        <span className="text-muted-foreground">ر.س / {plan.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-6 h-6 gradient-bg rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      onClick={() => handleSelectPlan(plan.id)}
                      className={`w-full h-14 text-lg font-bold rounded-xl transition-all duration-300 ${
                        plan.popular 
                          ? 'gradient-bg shadow-glow hover:shadow-soft' 
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 ml-2" />
                      اشترك الآن
                    </Button>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {step === 'payment' && selectedPlanData && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <button
                onClick={() => setStep('select')}
                className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2"
              >
                ← العودة لاختيار الخطة
              </button>

              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  إتمام عملية <span className="gradient-text">الدفع</span>
                </h1>
                <p className="text-muted-foreground">
                  أكمل التحويل البنكي لتفعيل اشتراكك
                </p>
              </div>

              {/* Order Summary */}
              <div className="glass-card rounded-3xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  ملخص الطلب
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الخطة</span>
                    <span className="font-medium">{selectedPlanData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">المدة</span>
                    <span className="font-medium">شهر واحد</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-bold">المجموع</span>
                    <span className="font-bold gradient-text text-xl">{selectedPlanData.price} ر.س</span>
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div className="glass-card rounded-3xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  تفاصيل الحساب البنكي
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'اسم البنك', value: bankDetails.bankName },
                    { label: 'اسم الحساب', value: bankDetails.accountName },
                    { label: 'رقم الحساب', value: bankDetails.accountNumber },
                    { label: 'رقم الآيبان', value: bankDetails.iban },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium" dir="ltr">{item.value}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(item.value, item.label)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transfer Reference */}
              <div className="glass-card rounded-3xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-4">تأكيد التحويل</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      رقم مرجع التحويل البنكي
                    </label>
                    <Input
                      placeholder="أدخل رقم مرجع التحويل"
                      value={transferReference}
                      onChange={(e) => setTransferReference(e.target.value)}
                      className="h-14 text-lg bg-background/80 border-border/50 rounded-xl"
                      dir="ltr"
                    />
                  </div>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <p className="text-sm text-amber-600 flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>
                        يرجى إتمام التحويل البنكي ثم إدخال رقم المرجع هنا. سيتم تفعيل اشتراكك خلال 24 ساعة من استلام التحويل.
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSubmitPayment}
                disabled={isSubmitting || !transferReference.trim()}
                className="w-full h-14 text-lg font-bold gradient-bg rounded-xl shadow-glow hover:shadow-soft transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  'تأكيد الدفع'
                )}
              </Button>
            </motion.div>
          )}

          {step === 'confirm' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="w-24 h-24 gradient-bg rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="w-12 h-12 text-primary-foreground" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                تم استلام طلبك! 🎉
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                سيتم مراجعة طلب الدفع وتفعيل اشتراكك خلال 24 ساعة عمل.
                ستصلك رسالة تأكيد على بريدك الإلكتروني.
              </p>

              <div className="glass-card rounded-3xl p-6 mb-8 text-right">
                <h3 className="font-bold mb-4">تفاصيل الطلب:</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>الخطة: <span className="text-foreground font-medium">{selectedPlanData?.name}</span></p>
                  <p>المبلغ: <span className="text-foreground font-medium">{selectedPlanData?.price} ر.س</span></p>
                  <p>رقم المرجع: <span className="text-foreground font-medium" dir="ltr">{transferReference}</span></p>
                </div>
              </div>

              <Button
                onClick={() => navigate('/')}
                className="h-14 px-8 text-lg font-bold gradient-bg rounded-xl shadow-glow hover:shadow-soft transition-all duration-300"
              >
                العودة للرئيسية
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Subscribe;
