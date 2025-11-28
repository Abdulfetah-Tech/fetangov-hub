import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'am' | 'or';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    
    // Hero
    'hero.title': 'OneGov Ethiopia',
    'hero.subtitle': 'Unified E-Government Platform',
    'hero.description': 'Access all government services in one place. Tax filing, ID renewal, business registration, and more - simplified for Ethiopian citizens.',
    'hero.cta': 'Get Started',
    'hero.learn': 'Learn More',
    
    // Services
    'services.title': 'Government Services',
    'services.subtitle': 'Access essential services online',
    'services.tax.title': 'Tax Services',
    'services.tax.desc': 'File taxes, view statements, and manage payments',
    'services.id.title': 'ID & Documents',
    'services.id.desc': 'Apply for or renew national ID, passports, and permits',
    'services.business.title': 'Business Registration',
    'services.business.desc': 'Register companies, obtain licenses and permits',
    'services.license.title': 'Licenses & Permits',
    'services.license.desc': 'Apply for driving licenses, professional permits',
    'services.land.title': 'Land Services',
    'services.land.desc': 'Land registration, title deeds, and property services',
    'services.social.title': 'Social Services',
    'services.social.desc': 'Healthcare, education, and welfare programs',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.overview': 'Your Services Overview',
    'dashboard.pending': 'Pending Applications',
    'dashboard.completed': 'Completed',
    'dashboard.inProgress': 'In Progress',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.notifications': 'Notifications',
    
    // Auth
    'auth.login.title': 'Sign In',
    'auth.login.subtitle': 'Access your OneGov account',
    'auth.register.title': 'Create Account',
    'auth.register.subtitle': 'Join millions of Ethiopians using OneGov',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.fullName': 'Full Name',
    'auth.phone': 'Phone Number',
    'auth.rememberMe': 'Remember me',
    'auth.forgotPassword': 'Forgot password?',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    
    // Common
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.continue': 'Continue',
    'common.back': 'Back',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.loading': 'Loading...',
    'common.success': 'Success',
    'common.error': 'Error',
    'common.viewAll': 'View All',
    'common.status': 'Status',
    'common.date': 'Date',
    'common.action': 'Action',
    
    // Footer
    'footer.rights': '© 2025 OneGov Ethiopia. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.help': 'Help Center',
  },
  am: {
    // Navigation
    'nav.home': 'መነሻ',
    'nav.services': 'አገልግሎቶች',
    'nav.about': 'ስለ እኛ',
    'nav.contact': 'አግኙን',
    'nav.login': 'ግባ',
    'nav.register': 'ተመዝገብ',
    'nav.dashboard': 'ዳሽቦርድ',
    'nav.logout': 'ውጣ',
    
    // Hero
    'hero.title': 'ዋንገቭ ኢትዮጵያ',
    'hero.subtitle': 'የተቀናጀ ኢ-መንግስት መድረክ',
    'hero.description': 'ሁሉንም የመንግስት አገልግሎቶች በአንድ ቦታ ያግኙ። ግብር መክፈል፣ መታወቂያ ማደስ፣ የንግድ ምዝገባ እና ሌሎችም - ለኢትዮጵያውያን ዜጎች ቀላል።',
    'hero.cta': 'ጀምር',
    'hero.learn': 'ተጨማሪ ይወቁ',
    
    // Services
    'services.title': 'የመንግስት አገልግሎቶች',
    'services.subtitle': 'አስፈላጊ አገልግሎቶችን በመስመር ላይ ያግኙ',
    'services.tax.title': 'የግብር አገልግሎቶች',
    'services.tax.desc': 'ግብር ያስገቡ፣ መግለጫዎችን ይመልከቱ እና ክፍያዎችን ያስተዳድሩ',
    'services.id.title': 'መታወቂያ እና ሰነዶች',
    'services.id.desc': 'ብሔራዊ መታወቂያ፣ ፓስፖርት እና ፈቃዶችን ያመልክቱ ወይም ያድሱ',
    'services.business.title': 'የንግድ ምዝገባ',
    'services.business.desc': 'ድርጅቶችን ይመዝገቡ፣ ፈቃዶችን ያግኙ',
    'services.license.title': 'ፈቃዶች',
    'services.license.desc': 'የመንጃ ፈቃድ፣ የሙያ ፈቃዶችን ያመልክቱ',
    'services.land.title': 'የመሬት አገልግሎቶች',
    'services.land.desc': 'የመሬት ምዝገባ፣ ካርታ እና ንብረት አገልግሎቶች',
    'services.social.title': 'ማህበራዊ አገልግሎቶች',
    'services.social.desc': 'ጤና፣ ትምህርት እና ደህንነት ፕሮግራሞች',
    
    // Dashboard
    'dashboard.welcome': 'እንኳን ደህና መጡ',
    'dashboard.overview': 'የአገልግሎቶች አጠቃላይ እይታ',
    'dashboard.pending': 'በመጠባበቅ ላይ',
    'dashboard.completed': 'የተጠናቀቁ',
    'dashboard.inProgress': 'በሂደት ላይ',
    'dashboard.quickActions': 'ፈጣን ድርጊቶች',
    'dashboard.recentActivity': 'የቅርብ ጊዜ እንቅስቃሴ',
    'dashboard.notifications': 'ማሳወቂያዎች',
    
    // Auth
    'auth.login.title': 'ግባ',
    'auth.login.subtitle': 'የዋንገቭ መለያዎን ይድረሱ',
    'auth.register.title': 'መለያ ፍጠር',
    'auth.register.subtitle': 'ዋንገቭን ከሚጠቀሙ በሚሊዮኖች ኢትዮጵያውያን ጋር ይቀላቀሉ',
    'auth.email': 'ኢሜይል',
    'auth.password': 'የይለፍ ቃል',
    'auth.confirmPassword': 'የይለፍ ቃል አረጋግጥ',
    'auth.fullName': 'ሙሉ ስም',
    'auth.phone': 'ስልክ ቁጥር',
    'auth.rememberMe': 'አስታውሰኝ',
    'auth.forgotPassword': 'የይለፍ ቃል ረሳሁ?',
    'auth.noAccount': 'መለያ የለዎትም?',
    'auth.hasAccount': 'መለያ አለዎት?',
    
    // Common
    'common.submit': 'ላክ',
    'common.cancel': 'ሰርዝ',
    'common.continue': 'ቀጥል',
    'common.back': 'ተመለስ',
    'common.search': 'ፈልግ',
    'common.filter': 'አጣራ',
    'common.loading': 'በመጫን ላይ...',
    'common.success': 'ተሳክቷል',
    'common.error': 'ስህተት',
    'common.viewAll': 'ሁሉንም ይመልከቱ',
    'common.status': 'ሁኔታ',
    'common.date': 'ቀን',
    'common.action': 'ተግባር',
    
    // Footer
    'footer.rights': '© 2025 ዋንገቭ ኢትዮጵያ። መብቱ በህግ የተጠበቀ ነው።',
    'footer.privacy': 'የግላዊነት ፖሊሲ',
    'footer.terms': 'የአገልግሎት ውል',
    'footer.help': 'የእገዛ ማዕከል',
  },
  or: {
    // Navigation
    'nav.home': 'Fuula Jalqabaa',
    'nav.services': 'Tajaajilawwan',
    'nav.about': 'Waa\'ee Keenya',
    'nav.contact': 'Nu Quunnamaa',
    'nav.login': 'Seeni',
    'nav.register': 'Galmaa\'i',
    'nav.dashboard': 'Daashboordii',
    'nav.logout': 'Ba\'i',
    
    // Hero
    'hero.title': 'WanGov Itoophiyaa',
    'hero.subtitle': 'Marsariitii E-Mootummaa Walitti Makame',
    'hero.description': 'Tajaajila mootummaa hunda bakka tokkotti argadhu. Gibira galchuu, eenyummaa haaromsuu, galmee daldalaa fi kkf - lammiilee Itoophiyaatiif salphifame.',
    'hero.cta': 'Jalqabi',
    'hero.learn': 'Dabalata Baruu',
    
    // Services
    'services.title': 'Tajaajila Mootummaa',
    'services.subtitle': 'Tajaajila barbaachisaa sarara irratti argadhu',
    'services.tax.title': 'Tajaajila Gibiraa',
    'services.tax.desc': 'Gibira galchi, ibsa ilaalii fi kaffaltii bulchi',
    'services.id.title': 'Eenyummaa fi Sanadoota',
    'services.id.desc': 'Eenyummaa biyyaalessaa, paaspoortii fi hayyama iyyadi',
    'services.business.title': 'Galmee Daldalaa',
    'services.business.desc': 'Dhaabbilee galmessi, hayyama argadhu',
    'services.license.title': 'Hayyamawwan',
    'services.license.desc': 'Hayyama konkolaataa oofuu fi ogummaa iyyadi',
    'services.land.title': 'Tajaajila Lafaa',
    'services.land.desc': 'Galmee lafaa, ragaa fi tajaajila qabiyyee',
    'services.social.title': 'Tajaajila Hawaasummaa',
    'services.social.desc': 'Fayyaa, barnootaa fi sagantaa nageenya',
    
    // Dashboard
    'dashboard.welcome': 'Baga nagaan dhufte',
    'dashboard.overview': 'Waliigala Tajaajilaa Kee',
    'dashboard.pending': 'Eegamaa',
    'dashboard.completed': 'Xumurame',
    'dashboard.inProgress': 'Adeemsa Irra',
    'dashboard.quickActions': 'Tarkaanfii Ariifataa',
    'dashboard.recentActivity': 'Sochii Dhiyoo',
    'dashboard.notifications': 'Beeksisawwan',
    
    // Auth
    'auth.login.title': 'Seeni',
    'auth.login.subtitle': 'Herrega WanGov kee seeni',
    'auth.register.title': 'Herrega Uumi',
    'auth.register.subtitle': 'Lammiilee Itoophiyaa miliyoonaan WanGov fayyadaman waliin makamii',
    'auth.email': 'Imeelii',
    'auth.password': 'Jecha Icciitii',
    'auth.confirmPassword': 'Jecha Icciitii Mirkaneessi',
    'auth.fullName': 'Maqaa Guutuu',
    'auth.phone': 'Lakkoofsa Bilbilaa',
    'auth.rememberMe': 'Na yaadadhu',
    'auth.forgotPassword': 'Jecha icciitii dagatte?',
    'auth.noAccount': 'Herrega hin qabdu?',
    'auth.hasAccount': 'Herrega qabdaa?',
    
    // Common
    'common.submit': 'Ergi',
    'common.cancel': 'Dhiisi',
    'common.continue': 'Itti Fufi',
    'common.back': 'Duubatti',
    'common.search': 'Barbaadi',
    'common.filter': 'Galmeessi',
    'common.loading': 'Fe\'aa jira...',
    'common.success': 'Milkaa\'e',
    'common.error': 'Dogoggora',
    'common.viewAll': 'Hunda Ilaali',
    'common.status': 'Haala',
    'common.date': 'Guyyaa',
    'common.action': 'Tarkaanfii',
    
    // Footer
    'footer.rights': '© 2025 WanGov Itoophiyaa. Mirgi seeraan eegame.',
    'footer.privacy': 'Imaammata Dhuunfaa',
    'footer.terms': 'Haala Tajaajilaa',
    'footer.help': 'Gargaarsa',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
