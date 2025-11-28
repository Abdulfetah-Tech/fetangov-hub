import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Target, Users, Shield, Zap, Building, Globe } from 'lucide-react';

const milestones = [
  { year: '2020', title: 'Project Inception', description: 'OneGov concept developed in line with Ethiopia\'s Digital Transformation Strategy' },
  { year: '2022', title: 'Development Phase', description: 'Platform architecture designed with cloud-native, modular approach' },
  { year: '2024', title: 'Pilot Launch', description: 'Initial services launched in select urban and rural regions' },
  { year: '2025', title: 'Nationwide Expansion', description: 'Platform expanded to cover all major government services' },
];

const team = [
  { name: 'Ministry of Innovation & Technology', role: 'Lead Partner', icon: Building },
  { name: 'Adama Science & Technology University', role: 'Technical Development', icon: Target },
  { name: 'Ethiopian Government Agencies', role: 'Service Integration', icon: Shield },
];

const About = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero */}
      <section className="hero-section py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            About OneGov Ethiopia
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Transforming public service delivery through unified digital governance
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  To streamline public service delivery in Ethiopia by consolidating government services 
                  into a single, accessible, and secure digital interface. We aim to reduce bureaucratic 
                  delays, promote transparency, and ensure inclusivity for all citizens.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/5 border-secondary/20">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                  <Globe className="h-6 w-6 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground">
                  To establish Ethiopia as a leader in smart governance in Africa, creating a dynamic 
                  ecosystem that not only streamlines government services but also fosters innovation 
                  across public and private sectors.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Key Objectives */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Key Objectives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Users, title: 'User Convenience', desc: 'Single interface for all government services' },
                { icon: Zap, title: 'Operational Efficiency', desc: 'Automated workflows and secure authentication' },
                { icon: Shield, title: 'Transparency & Trust', desc: 'Clear pricing and fraud prevention' },
                { icon: Globe, title: 'Accessibility', desc: 'Multilingual support for all Ethiopians' },
              ].map((obj, index) => {
                const Icon = obj.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{obj.title}</h3>
                      <p className="text-sm text-muted-foreground">{obj.desc}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Our Journey</h2>
            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-4 mb-6 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {milestone.year.slice(2)}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className="text-sm text-muted-foreground">{milestone.year}</p>
                    <h3 className="font-semibold text-foreground">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div>
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Our Partners</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map((partner, index) => {
                const Icon = partner.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{partner.name}</h3>
                      <p className="text-sm text-muted-foreground">{partner.role}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
