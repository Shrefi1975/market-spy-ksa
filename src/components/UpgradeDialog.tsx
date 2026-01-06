import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, TrendingUp, Target, Award } from "lucide-react";

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpgradeDialog: React.FC<UpgradeDialogProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    onOpenChange(false);
    navigate('/subscribe');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" dir="rtl">
        <DialogHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            🎉 تهانينا! لقد أكملت تجربتك المجانية
          </DialogTitle>
          <DialogDescription className="text-center text-base mt-3">
            لقد استخدمت تحليلك المجاني الوحيد. للحصول على تحليلات أكثر دقة وميزات متقدمة، قم بالترقية الآن!
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-4">
          <h4 className="font-semibold text-lg text-center mb-4">مميزات الخطط المدفوعة:</h4>
          
          <div className="grid gap-3">
            <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium">تحليلات غير محدودة</p>
                <p className="text-sm text-muted-foreground">حلل عدد لا محدود من المواقع شهرياً</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">كلمات مفتاحية أكثر</p>
                <p className="text-sm text-muted-foreground">احصل على 50+ كلمة مفتاحية في كل تحليل</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="font-medium">تحليل منافسين متقدم</p>
                <p className="text-sm text-muted-foreground">اكتشف استراتيجيات منافسيك بالتفصيل</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="font-medium">تقارير PDF احترافية</p>
                <p className="text-sm text-muted-foreground">صدّر تقاريرك بتصميم احترافي</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-3 sm:flex-col">
          <Button 
            onClick={handleUpgrade}
            className="w-full gradient-bg text-white py-6 text-lg font-bold"
          >
            <Sparkles className="w-5 h-5 ml-2" />
            ترقية الآن - ابدأ من 150 ر.س فقط
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            لاحقاً
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeDialog;
