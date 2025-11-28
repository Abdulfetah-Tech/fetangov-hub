import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import heroBg from '@/assets/hero-bg.jpg';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    rememberMe: false,
  });
  
  const { t } = useLanguage();
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        toast({
          title: t('common.success'),
          description: 'Welcome back to OneGov!',
        });
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: t('common.error'),
            description: 'Passwords do not match',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }
        await register({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          phone: formData.phone,
        });
        toast({
          title: t('common.success'),
          description: 'Account created successfully!',
        });
      }
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: t('common.error'),
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 bg-background">
        <div className="mx-auto w-full max-w-sm">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="mb-8 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('common.back')}
          </Button>

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">OG</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">OneGov</span>
              <span className="text-xs text-muted-foreground -mt-1">Ethiopia</span>
            </div>
          </div>

          <Card className="border-0 shadow-none">
            <CardHeader className="px-0">
              <CardTitle className="text-2xl">
                {mode === 'login' ? t('auth.login.title') : t('auth.register.title')}
              </CardTitle>
              <CardDescription>
                {mode === 'login' ? t('auth.login.subtitle') : t('auth.register.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="fullName">{t('auth.fullName')}</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Abebe Bikila"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('auth.phone')}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+251 91 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">{t('auth.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t('auth.password')}</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                {mode === 'register' && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                )}

                {mode === 'login' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="rememberMe"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, rememberMe: checked as boolean })
                        }
                      />
                      <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
                        {t('auth.rememberMe')}
                      </Label>
                    </div>
                    <Button variant="link" className="p-0 h-auto text-sm">
                      {t('auth.forgotPassword')}
                    </Button>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {mode === 'login' ? t('auth.login.title') : t('auth.register.title')}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">
                  {mode === 'login' ? t('auth.noAccount') : t('auth.hasAccount')}
                </span>{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                >
                  {mode === 'login' ? t('nav.register') : t('nav.login')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:flex-1 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 hero-section opacity-90" />
        <div className="relative flex flex-col justify-center p-12 text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">
            Access All Government Services in One Place
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>Tax filing and payments</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>ID and passport renewal</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>Business registration</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>Licenses and permits</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>Land and property services</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Auth;
