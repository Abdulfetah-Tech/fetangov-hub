import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const languages: { code: Language; name: string; native: string }[] = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'am', name: 'Amharic', native: 'አማርኛ' },
  { code: 'or', name: 'Oromiffa', native: 'Afaan Oromoo' },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const currentLang = languages.find(l => l.code === language);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">OG</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">OneGov</span>
            <span className="text-[10px] text-muted-foreground -mt-1">Ethiopia</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.home')}
          </Link>
          <Link to="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.services')}
          </Link>
          <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.about')}
          </Link>
          <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.contact')}
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{currentLang?.native}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={cn(language === lang.code && 'bg-accent')}
                >
                  <span className="mr-2">{lang.native}</span>
                  <span className="text-muted-foreground">({lang.name})</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate">{user?.fullName}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  {t('nav.dashboard')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('nav.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
                {t('nav.login')}
              </Button>
              <Button size="sm" onClick={() => navigate('/auth?mode=register')}>
                {t('nav.register')}
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card animate-slide-up">
          <nav className="container mx-auto flex flex-col px-4 py-4 gap-2">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/services"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.services')}
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            {!isAuthenticated && (
              <>
                <hr className="my-2 border-border" />
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/auth');
                  }}
                >
                  {t('nav.login')}
                </Button>
                <Button
                  className="justify-start"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/auth?mode=register');
                  }}
                >
                  {t('nav.register')}
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
