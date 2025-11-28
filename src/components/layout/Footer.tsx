import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">OG</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">OneGov</span>
                <span className="text-xs text-muted -mt-1">Ethiopia</span>
              </div>
            </div>
            <p className="text-sm text-muted">
              Unified E-Government Platform for Ethiopian citizens. Access all government services in one place.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-sm text-muted hover:text-background transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted hover:text-background transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted hover:text-background transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted hover:text-background transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/tax" className="text-sm text-muted hover:text-background transition-colors">
                  {t('services.tax.title')}
                </Link>
              </li>
              <li>
                <Link to="/services/id" className="text-sm text-muted hover:text-background transition-colors">
                  {t('services.id.title')}
                </Link>
              </li>
              <li>
                <Link to="/services/business" className="text-sm text-muted hover:text-background transition-colors">
                  {t('services.business.title')}
                </Link>
              </li>
              <li>
                <Link to="/services/license" className="text-sm text-muted hover:text-background transition-colors">
                  {t('services.license.title')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Addis Ababa, Ethiopia<br />Bole Road, ECA Building</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+251 11 518 6000</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>support@onegov.et</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-background/20" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
          <p>{t('footer.rights')}</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-background transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="hover:text-background transition-colors">
              {t('footer.terms')}
            </Link>
            <Link to="/help" className="hover:text-background transition-colors">
              {t('footer.help')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
