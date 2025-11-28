import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const CTASection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="py-20 hero-section">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
          Join millions of Ethiopians already using OneGov for faster, easier access to government services.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg" 
            className="btn-hero gap-2"
            onClick={() => navigate('/auth?mode=register')}
          >
            Create Free Account
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => navigate('/contact')}
          >
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
};
