import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Crown, CreditCard } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const UserMenu = () => {
  const { user, subscription, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          className="text-primary-foreground/80 hover:text-primary-foreground"
          onClick={() => navigate('/auth')}
        >
          تسجيل الدخول
        </Button>
        <Button
          className="gradient-bg shadow-glow hover:shadow-soft"
          onClick={() => navigate('/auth')}
        >
          ابدأ مجاناً
        </Button>
      </div>
    );
  }

  const planLabels = {
    free: 'مجاني',
    professional: 'احترافي',
    enterprise: 'مؤسسي',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground"
        >
          <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="hidden md:inline">{user.email?.split('@')[0]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2">
          <p className="text-sm font-medium">{user.email}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <Crown className="w-3 h-3" />
            {subscription ? planLabels[subscription.plan] : 'مجاني'}
          </p>
        </div>
        <DropdownMenuSeparator />
        {subscription?.plan === 'free' && (
          <DropdownMenuItem onClick={() => navigate('/subscribe')}>
            <CreditCard className="w-4 h-4 ml-2" />
            ترقية الخطة
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={async () => {
            await signOut();
            navigate('/');
          }}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="w-4 h-4 ml-2" />
          تسجيل الخروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
