import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
