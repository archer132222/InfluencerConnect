import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { InfluencerCard } from "@/components/ui/influencer-card";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Home() {
  const { t, language } = useLanguage();
  
  const influencers = [
    {
      name: language === 'ar' ? "أحمد جلال" : "Ahmed Jalal",
      category: "Tech",
      product: language === 'ar' ? "هاتف ذكي" : "New Smartphone",
      views: "1M+",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: language === 'ar' ? "عمر شعلان" : "Omar Shalan",
      category: "Gaming",
      product: language === 'ar' ? "لعبة جديدة" : "New Game",
      views: "1M+",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: language === 'ar' ? "سارة ويلسون" : "Sarah Wilson",
      category: "Fashion",
      product: language === 'ar' ? "عطر فاخر" : "Luxury Perfume",
      views: "750K+",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: language === 'ar' ? "مايك جونسون" : "Mike Johnson",
      category: "Tech",
      product: language === 'ar' ? "ساعة ذكية" : "Smart Watch",
      views: "500K+",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#660000]/20 to-black pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight">
              {t("hero.title.prefix")} <br />
              <span className="text-red-500">{t("hero.title.highlight")}</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/register">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 h-auto">
                  {t("nav.createAccount")}
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 h-auto">
                  {t("nav.signIn")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">{t("home.successStories")}</h2>
            <p className="text-gray-400">{t("home.realResults")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {influencers.map((influencer, index) => (
              <InfluencerCard key={index} {...influencer} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="link" className="text-red-400 hover:text-red-300 group gap-2">
              {t("home.viewAll")} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
