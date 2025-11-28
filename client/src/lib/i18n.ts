import { create } from 'zustand';

type Language = 'en' | 'ar';

const translations = {
  en: {
    // Navbar
    "app.name": "Influencer",
    "app.name.suffix": "Connect",
    "nav.welcome": "Welcome",
    "nav.newCampaign": "New Campaign",
    "nav.dashboard": "Dashboard",
    "nav.signIn": "Sign In",
    "nav.createAccount": "Create Account",
    "nav.signOut": "Sign Out",
    
    // Home
    "hero.title.prefix": "Connect your brand with",
    "hero.title.highlight": "top influencers",
    "hero.subtitle": "Our smart platform suggests the perfect influencers for your product, ensuring maximum reach and engagement.",
    "home.successStories": "Watch Our Success Stories",
    "home.realResults": "Real campaigns, real results.",
    "home.viewAll": "View All Success Stories",
    
    // Auth
    "auth.signIn.title": "Sign In",
    "auth.signIn.subtitle": "Welcome back to Influencer Connect",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.asBrand": "As Brand",
    "auth.asInfluencer": "As Influencer",
    "auth.or": "Or continue with",
    "auth.google": "Sign in with Google",
    "auth.noAccount": "Don't have an account?",
    "auth.createAccount.title": "Create Account",
    "auth.createAccount.subtitle": "Join the fastest growing influencer network",
    "auth.fullName": "Full Name",
    "auth.primaryCategory": "Primary Category",
    "auth.alreadyHave": "Already have an account?",
    "auth.brand": "Brand",
    "auth.influencer": "Influencer",

    // Influencer Dashboard
    "inf.category": "Category",
    "inf.followers": "Followers",
    "inf.portfolio": "Previous Ads / Portfolio",
    "inf.videoLink": "Video Link",
    "inf.views": "Views",
    "inf.myAds": "My Ads",
    "inf.newRequests": "New Requests",
    "inf.pending": "pending approvals",
    "inf.inProgress": "Ads in Progress",
    "inf.active": "active campaign",
    "inf.completed": "Completed Ads",
    "inf.successful": "successful campaigns",

    // Customer Dashboard
    "cust.myCampaigns": "My Campaigns",
    "cust.createNew": "Create New Ad",
    "cust.startNew": "Start a new campaign with an influencer",
    "cust.status": "Status",
    "cust.running": "active campaigns running",
    "cust.previous": "Previous Ads",
    "cust.history": "View history and reports",

    // Create Ad
    "ad.create.title": "Create New Ad Request",
    "ad.productName": "Product Name",
    "ad.productDesc": "Product Description",
    "ad.targetAudience": "Target Audience",
    "ad.platform": "Preferred Platform",
    "ad.review": "Review Request",
    "ad.reviewDesc": "Please review your ad details before submitting.",
    "ad.budget": "Budget",
    "ad.pending": "Pending",
    "ad.back": "Back",
    "ad.next": "Next",
    "ad.submit": "Submit Request",
    
    // Common
    "common.product": "Product",
    "common.views": "Views",
  },
  ar: {
    // Navbar
    "app.name": "انفلونسر",
    "app.name.suffix": "كونكت",
    "nav.welcome": "مرحباً",
    "nav.newCampaign": "حملة جديدة",
    "nav.dashboard": "لوحة التحكم",
    "nav.signIn": "تسجيل الدخول",
    "nav.createAccount": "إنشاء حساب",
    "nav.signOut": "تسجيل الخروج",

    // Home
    "hero.title.prefix": "صل علامتك التجارية بـ",
    "hero.title.highlight": "أفضل المؤثرين",
    "hero.subtitle": "منصتنا الذكية تقترح لك المؤثرين المناسبين لمنتجك لضمان أقصى وصول وتفاعل.",
    "home.successStories": "شاهد نجاحات عملائنا",
    "home.realResults": "حملات حقيقية، نتائج حقيقية.",
    "home.viewAll": "عرض جميع قصص النجاح",

    // Auth
    "auth.signIn.title": "تسجيل الدخول",
    "auth.signIn.subtitle": "مرحباً بعودتك إلى انفلونسر كونكت",
    "auth.email": "البريد الإلكتروني",
    "auth.password": "كلمة المرور",
    "auth.asBrand": "كعلامة تجارية",
    "auth.asInfluencer": "كمؤثر",
    "auth.or": "أو الاستمرار مع",
    "auth.google": "تسجيل الدخول عبر جوجل",
    "auth.noAccount": "ليس لديك حساب؟",
    "auth.createAccount.title": "إنشاء حساب",
    "auth.createAccount.subtitle": "انضم إلى أسرع شبكة مؤثرين نمواً",
    "auth.fullName": "الاسم الكامل",
    "auth.primaryCategory": "التصنيف الأساسي",
    "auth.alreadyHave": "لديك حساب بالفعل؟",
    "auth.brand": "علامة تجارية",
    "auth.influencer": "مؤثر",

    // Influencer Dashboard
    "inf.category": "التصنيف",
    "inf.followers": "المتابعين",
    "inf.portfolio": "الإعلانات السابقة / المعرض",
    "inf.videoLink": "رابط الفيديو",
    "inf.views": "المشاهدات",
    "inf.myAds": "إعلاناتي",
    "inf.newRequests": "الطلبات الجديدة",
    "inf.pending": "بانتظار الموافقة",
    "inf.inProgress": "الإعلانات قيد التنفيذ",
    "inf.active": "حملة نشطة",
    "inf.completed": "الإعلانات المكتملة",
    "inf.successful": "حملة ناجحة",

    // Customer Dashboard
    "cust.myCampaigns": "حملاتي",
    "cust.createNew": "إنشاء إعلان جديد",
    "cust.startNew": "ابدأ حملة جديدة مع مؤثر",
    "cust.status": "الحالة",
    "cust.running": "حملات نشطة حالياً",
    "cust.previous": "إعلاناتي السابقة",
    "cust.history": "عرض السجل والتقارير",

    // Create Ad
    "ad.create.title": "إنشاء طلب إعلان جديد",
    "ad.productName": "اسم المنتج",
    "ad.productDesc": "وصف المنتج",
    "ad.targetAudience": "الفئة المستهدفة",
    "ad.platform": "المنصة المفضلة",
    "ad.review": "مراجعة الطلب",
    "ad.reviewDesc": "يرجى مراجعة تفاصيل الإعلان قبل الإرسال.",
    "ad.budget": "الميزانية",
    "ad.pending": "قيد الانتظار",
    "ad.back": "رجوع",
    "ad.next": "التالي",
    "ad.submit": "إرسال الطلب",

    // Common
    "common.product": "المنتج",
    "common.views": "المشاهدات",
  }
};

interface LanguageState {
  language: Language;
  t: (key: keyof typeof translations['en']) => string;
  setLanguage: (lang: Language) => void;
  dir: () => 'ltr' | 'rtl';
}

export const useLanguage = create<LanguageState>((set, get) => ({
  language: 'en',
  setLanguage: (lang) => {
    set({ language: lang });
    // Update HTML direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  },
  t: (key) => {
    const lang = get().language;
    return translations[lang][key as keyof typeof translations['en']] || key;
  },
  dir: () => get().language === 'ar' ? 'rtl' : 'ltr',
}));
