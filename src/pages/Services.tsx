import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calculator, 
  CreditCard, 
  Building2, 
  FileText, 
  MapPin, 
  Heart,
  Car,
  GraduationCap,
  Briefcase,
  Home,
  Search,
  ArrowRight,
  Filter
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', label: 'All Services' },
  { id: 'tax', label: 'Tax & Finance' },
  { id: 'identity', label: 'Identity Documents' },
  { id: 'business', label: 'Business' },
  { id: 'transport', label: 'Transport' },
  { id: 'property', label: 'Property' },
  { id: 'social', label: 'Social Services' },
];

const services = [
  {
    icon: Calculator,
    title: 'Tax Filing',
    description: 'File your annual income tax returns online',
    category: 'tax',
    popular: true,
    path: '/services/tax',
  },
  {
    icon: Calculator,
    title: 'VAT Registration',
    description: 'Register for Value Added Tax',
    category: 'tax',
    popular: false,
    path: '/services/tax/vat',
  },
  {
    icon: CreditCard,
    title: 'National ID Card',
    description: 'Apply for or renew your national ID',
    category: 'identity',
    popular: true,
    path: '/services/id',
  },
  {
    icon: CreditCard,
    title: 'Passport Services',
    description: 'Apply for new passport or renewal',
    category: 'identity',
    popular: true,
    path: '/services/id/passport',
  },
  {
    icon: FileText,
    title: 'Birth Certificate',
    description: 'Request birth certificate copies',
    category: 'identity',
    popular: false,
    path: '/services/id/birth',
  },
  {
    icon: Building2,
    title: 'Business Registration',
    description: 'Register a new business or company',
    category: 'business',
    popular: true,
    path: '/services/business',
  },
  {
    icon: Briefcase,
    title: 'Trade License',
    description: 'Apply for business trade license',
    category: 'business',
    popular: false,
    path: '/services/business/trade',
  },
  {
    icon: Building2,
    title: 'TIN Registration',
    description: 'Get your Tax Identification Number',
    category: 'business',
    popular: true,
    path: '/services/business/tin',
  },
  {
    icon: Car,
    title: 'Driving License',
    description: 'Apply for or renew driving license',
    category: 'transport',
    popular: true,
    path: '/services/license/driving',
  },
  {
    icon: Car,
    title: 'Vehicle Registration',
    description: 'Register or transfer vehicle ownership',
    category: 'transport',
    popular: false,
    path: '/services/license/vehicle',
  },
  {
    icon: MapPin,
    title: 'Land Title Deed',
    description: 'Apply for land ownership certificate',
    category: 'property',
    popular: false,
    path: '/services/land',
  },
  {
    icon: Home,
    title: 'Building Permit',
    description: 'Apply for construction permits',
    category: 'property',
    popular: false,
    path: '/services/land/building',
  },
  {
    icon: Heart,
    title: 'Health Insurance',
    description: 'Enroll in national health insurance',
    category: 'social',
    popular: false,
    path: '/services/social/health',
  },
  {
    icon: GraduationCap,
    title: 'Education Services',
    description: 'School enrollment and transcripts',
    category: 'social',
    popular: false,
    path: '/services/social/education',
  },
];

const Services = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Header */}
      <section className="hero-section py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {t('services.title')}
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            {t('services.subtitle')}
          </p>
          
          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={`${t('common.search')} services...`}
              className="pl-12 h-12 bg-card border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  activeCategory === category.id && 'bg-primary text-primary-foreground'
                )}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredServices.length} services
          </p>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={index}
                  className="group cursor-pointer hover:shadow-md transition-all duration-300 border-border/50 hover:border-primary/30"
                  onClick={() => navigate(service.path)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      {service.popular && (
                        <Badge variant="secondary" className="text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      <span>Apply Now</span>
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No services found matching your criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Services;
