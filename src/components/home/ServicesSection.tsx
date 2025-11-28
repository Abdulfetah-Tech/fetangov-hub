import { useNavigate } from 'react-router-dom';
import { 
  Calculator, 
  CreditCard, 
  Building2, 
  FileText, 
  MapPin, 
  Heart,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: Calculator,
    titleKey: 'services.tax.title',
    descKey: 'services.tax.desc',
    path: '/services/tax',
    color: 'bg-chart-1/10 text-chart-1',
  },
  {
    icon: CreditCard,
    titleKey: 'services.id.title',
    descKey: 'services.id.desc',
    path: '/services/id',
    color: 'bg-chart-2/10 text-chart-2',
  },
  {
    icon: Building2,
    titleKey: 'services.business.title',
    descKey: 'services.business.desc',
    path: '/services/business',
    color: 'bg-chart-3/10 text-chart-3',
  },
  {
    icon: FileText,
    titleKey: 'services.license.title',
    descKey: 'services.license.desc',
    path: '/services/license',
    color: 'bg-chart-4/10 text-chart-4',
  },
  {
    icon: MapPin,
    titleKey: 'services.land.title',
    descKey: 'services.land.desc',
    path: '/services/land',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Heart,
    titleKey: 'services.social.title',
    descKey: 'services.social.desc',
    path: '/services/social',
    color: 'bg-destructive/10 text-destructive',
  },
];

export const ServicesSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30"
                onClick={() => navigate(service.path)}
              >
                <CardContent className="p-6">
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                    service.color
                  )}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t(service.descKey)}
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    <span>{t('common.viewAll')}</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/services')}
            className="gap-2"
          >
            {t('common.viewAll')} Services
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
