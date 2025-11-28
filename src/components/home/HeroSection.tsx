import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import heroBg from '@/assets/hero-bg.jpg';

export const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 overlay-dark" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6 animate-fade-in">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Secure • Fast • Reliable</span>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-card mb-4 animate-slide-up">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-card/90 font-medium mb-4 animate-slide-up">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg text-card/70 mb-8 max-w-2xl animate-slide-up">
            {t('hero.description')}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12 animate-slide-up">
            <Button 
              size="lg" 
              className="btn-hero gap-2 text-base"
              onClick={() => navigate('/auth?mode=register')}
            >
              {t('hero.cta')}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 text-base bg-transparent border-card/30 text-card hover:bg-card/10"
              onClick={() => navigate('/services')}
            >
              {t('hero.learn')}
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-md animate-fade-in">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-accent mb-1">
                <Users className="h-4 w-4" />
                <span className="text-2xl font-bold">2M+</span>
              </div>
              <p className="text-xs text-card/60">Active Users</p>
            </div>
            <div className="text-center border-x border-card/20">
              <div className="flex items-center justify-center gap-1 text-accent mb-1">
                <Shield className="h-4 w-4" />
                <span className="text-2xl font-bold">50+</span>
              </div>
              <p className="text-xs text-card/60">Services</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-accent mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-2xl font-bold">24/7</span>
              </div>
              <p className="text-xs text-card/60">Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
