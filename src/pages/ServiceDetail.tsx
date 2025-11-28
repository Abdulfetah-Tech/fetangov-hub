import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Upload,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const serviceData: Record<string, {
  title: string;
  description: string;
  processingTime: string;
  fee: string;
  requirements: string[];
  steps: string[];
}> = {
  'tax': {
    title: 'Tax Filing Services',
    description: 'File your annual income tax returns, view tax statements, and manage payments through our secure online portal.',
    processingTime: '3-5 business days',
    fee: 'Free for individual returns',
    requirements: [
      'Valid National ID or Passport',
      'TIN (Tax Identification Number)',
      'Previous year income statements',
      'Bank account details for refunds',
    ],
    steps: [
      'Create or login to your OneGov account',
      'Navigate to Tax Services',
      'Select the appropriate tax form',
      'Fill in your income details',
      'Upload supporting documents',
      'Review and submit your return',
      'Pay any taxes due or await refund',
    ],
  },
  'id': {
    title: 'National ID Services',
    description: 'Apply for a new national ID card or renew your existing one. Required for all Ethiopian citizens above 18.',
    processingTime: '7-14 business days',
    fee: 'ETB 100 (new) / ETB 50 (renewal)',
    requirements: [
      'Birth Certificate or old ID',
      'Two recent passport photos',
      'Proof of residence (utility bill)',
      'Kebele ID or recommendation letter',
    ],
    steps: [
      'Create or login to your OneGov account',
      'Complete the ID application form',
      'Upload required documents',
      'Schedule an appointment for biometrics',
      'Visit the service center on your appointment date',
      'Pay the processing fee',
      'Receive your ID at the center or by mail',
    ],
  },
  'business': {
    title: 'Business Registration',
    description: 'Register your business entity in Ethiopia. We support sole proprietorships, partnerships, and corporations.',
    processingTime: '5-10 business days',
    fee: 'Starting from ETB 500',
    requirements: [
      'Valid ID of all owners/directors',
      'Proposed business name (3 options)',
      'Business address proof',
      'Memorandum of Association (for companies)',
      'Initial capital deposit proof',
    ],
    steps: [
      'Create or login to your OneGov account',
      'Select business type',
      'Reserve your business name',
      'Complete registration forms',
      'Upload incorporation documents',
      'Pay registration fees',
      'Receive your business certificate',
    ],
  },
  'license': {
    title: 'Licenses & Permits',
    description: 'Apply for driving licenses, professional permits, and various government-issued licenses.',
    processingTime: '5-14 business days',
    fee: 'Varies by license type',
    requirements: [
      'Valid National ID',
      'Medical fitness certificate',
      'Training/examination certificates',
      'Passport photos',
    ],
    steps: [
      'Create or login to your OneGov account',
      'Select license type',
      'Complete application form',
      'Upload required documents',
      'Schedule examination (if required)',
      'Pass examination',
      'Receive your license',
    ],
  },
};

const ServiceDetail = () => {
  const { t } = useLanguage();
  const { serviceType } = useParams<{ serviceType: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const service = serviceData[serviceType || ''] || serviceData['tax'];

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/auth?mode=register');
    } else {
      navigate(`/apply/${serviceType}`);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="hero-section py-12">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/services')}
            className="mb-4 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {service.title}
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            {service.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-info" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Processing Time</p>
                      <p className="font-semibold text-sm">{service.processingTime}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Service Fee</p>
                      <p className="font-semibold text-sm">{service.fee}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Documents</p>
                      <p className="font-semibold text-sm">{service.requirements.length} required</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Required Documents</CardTitle>
                  <CardDescription>
                    Make sure you have these documents ready before applying
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Process Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Application Process</CardTitle>
                  <CardDescription>
                    Follow these steps to complete your application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    {service.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold text-primary">{index + 1}</span>
                        </div>
                        <div className="pt-1">
                          <span className="text-sm text-foreground">{step}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Ready to Apply?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Start your application now and track progress online
                    </p>
                  </div>
                  <Button className="w-full gap-2" size="lg" onClick={handleApply}>
                    {isAuthenticated ? 'Start Application' : 'Sign Up to Apply'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        Applications are processed Monday to Friday, 8:30 AM - 5:30 PM
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        You'll receive email updates on your application status
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contact our support team for assistance with your application
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Phone:</strong> +251 11 518 6000</p>
                    <p><strong>Email:</strong> support@onegov.et</p>
                    <p><strong>Hours:</strong> Mon-Fri, 8:30 AM - 5:30 PM</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetail;
