import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Video, 
  MapPin, 
  Instagram, 
  Twitter, 
  Youtube,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Link, useRoute } from "wouter";

export default function InfluencerProfile() {
  const { t, language } = useLanguage();
  const [, params] = useRoute("/profile/:id");
  const id = params?.id;

  // Mock data based on ID (in a real app this would fetch from API)
  const influencer = {
    name: language === 'ar' ? "عمر شعلان" : "Omar Shalan",
    category: "Gaming",
    followers: "350K",
    rating: "4.9",
    location: language === 'ar' ? "الرياض، السعودية" : "Riyadh, KSA",
    bio: language === 'ar' 
      ? "صانع محتوى ألعاب محترف. أشارك تجاربي في أحدث الألعاب وأقدم مراجعات تقنية."
      : "Professional gaming content creator. I share my experiences in the latest games and provide tech reviews.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    platforms: ["YouTube", "Twitch", "TikTok"],
    stats: [
      { label: "Avg. Views", value: "500K+" },
      { label: "Engagement", value: "8.5%" },
      { label: "Completed Ads", value: "42" }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Link href="/">
          <Button variant="ghost" className="mb-4 text-gray-400 hover:text-white gap-2 pl-0 hover:bg-transparent">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {language === 'ar' ? "العودة للرئيسية" : "Back to Home"}
          </Button>
        </Link>

        {/* Profile Header */}
        <Card className="bg-[#1a1a1a] border-white/10 text-white overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-[#660000] to-[#330000]" />
          <CardContent className="relative pt-0 pb-8 px-6">
            <div className="flex flex-col sm:flex-row items-start gap-6 -mt-12">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-[#1a1a1a]">
                  <AvatarImage src={influencer.image} />
                  <AvatarFallback>OS</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-1 right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-[#1a1a1a]" />
              </div>
              
              <div className="flex-1 pt-14 sm:pt-12 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-display font-bold flex items-center gap-2">
                      {influencer.name}
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20">
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Verified
                      </Badge>
                    </h1>
                    <div className="flex items-center gap-4 text-gray-400 mt-1 text-sm">
                      <span className="flex items-center gap-1">
                        <Video className="h-4 w-4" /> {influencer.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" /> {influencer.location}
                      </span>
                      <span className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" /> {influencer.rating}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      {language === 'ar' ? "تواصل معي" : "Contact Me"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {influencer.stats.map((stat, i) => (
                <div key={i} className="bg-[#2A2A2A] p-4 rounded-lg text-center">
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-bold">{language === 'ar' ? "نبذة عني" : "About Me"}</h3>
              <p className="text-gray-300 leading-relaxed">
                {influencer.bio}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">{language === 'ar' ? "أعمال سابقة" : "Portfolio"}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="group relative aspect-video bg-[#2A2A2A] rounded-lg overflow-hidden cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Video className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
