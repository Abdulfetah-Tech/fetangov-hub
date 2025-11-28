import { Shield, Zap, Globe, Smartphone, Lock, Headphones } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Bank-grade encryption and multi-factor authentication protect your data at all times.',
  },
  {
    icon: Zap,
    title: 'Fast Processing',
    description: 'Submit applications online and track progress in real-time. No more waiting in lines.',
  },
  {
    icon: Globe,
    title: 'Multilingual',
    description: 'Available in Amharic, Oromiffa, and English to serve all Ethiopian citizens.',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Access all services from your phone, anytime and anywhere across Ethiopia.',
  },
  {
    icon: Lock,
    title: 'Single Sign-On',
    description: 'One account to access all government services. Verify once, use everywhere.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Get help when you need it through chat, phone, or visit our service centers.',
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose OneGov?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Modern digital governance designed for Ethiopian citizens
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
