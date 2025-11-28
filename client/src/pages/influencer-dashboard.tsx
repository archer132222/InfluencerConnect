import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  Star, 
  ChevronDown,
  Video
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/lib/i18n";

export default function InfluencerDashboard() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-md mx-auto sm:max-w-3xl lg:max-w-5xl p-4 space-y-6">
        {/* Profile Header */}
        <Card className="bg-[#1a1a1a] border-white/10 text-white">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                 <Avatar className="h-24 w-24 border-4 border-[#2A2A2A]">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                  <AvatarFallback>OS</AvatarFallback>
                </Avatar>
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-full text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-bold">4.9</span>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <h1 className="text-2xl font-display font-bold">{language === 'ar' ? "عمر شعلان" : "Omar Shalan"}</h1>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                  <span>{t("inf.category")}: <span className="text-white">Gaming</span></span>
                  <span>{t("inf.followers")}: <span className="text-white">350K</span></span>
                </div>
              </div>

              <div className="mt-6 w-full">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="portfolio" className="border-white/10">
                    <AccordionTrigger className="text-white hover:no-underline hover:text-red-400 justify-center gap-2">
                      {t("inf.portfolio")}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-[#2A2A2A] rounded-lg p-4 mt-2 text-left rtl:text-right">
                        <div className="flex items-start gap-4">
                          <div className="h-20 w-32 bg-black/50 rounded flex items-center justify-center">
                            <Video className="h-8 w-8 text-gray-600" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-medium text-red-200">Energy Drink Campaign</h4>
                            <p className="text-sm text-gray-400">{t("inf.videoLink")}: youtube.com/watch?v=...</p>
                            <p className="text-sm text-green-400 font-medium">{t("inf.views")}: 500K+</p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-display font-bold px-2">{t("inf.myAds")}</h2>
          
          <div className="space-y-4">
            <Button variant="secondary" className="w-full h-auto py-4 px-6 justify-between bg-[#2A2A2A] hover:bg-[#333] text-white border-l-4 border-red-500 group rtl:border-l-0 rtl:border-r-4">
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-red-500" />
                <div className="text-left rtl:text-right">
                  <span className="block font-medium text-lg group-hover:underline decoration-red-500 underline-offset-4">{t("inf.newRequests")}</span>
                  <span className="text-xs text-gray-400">2 {t("inf.pending")}</span>
                </div>
              </div>
              <ChevronDown className="-rotate-90 h-5 w-5 text-gray-500 rtl:rotate-90" />
            </Button>

            <Button variant="secondary" className="w-full h-auto py-4 px-6 justify-between bg-[#2A2A2A] hover:bg-[#333] text-white border-l-4 border-yellow-500 group rtl:border-l-0 rtl:border-r-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-500" />
                <div className="text-left rtl:text-right">
                  <span className="block font-medium text-lg group-hover:underline decoration-yellow-500 underline-offset-4">{t("inf.inProgress")}</span>
                  <span className="text-xs text-gray-400">1 {t("inf.active")}</span>
                </div>
              </div>
              <ChevronDown className="-rotate-90 h-5 w-5 text-gray-500 rtl:rotate-90" />
            </Button>

            <Button variant="secondary" className="w-full h-auto py-4 px-6 justify-between bg-[#2A2A2A] hover:bg-[#333] text-white border-l-4 border-green-500 group rtl:border-l-0 rtl:border-r-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div className="text-left rtl:text-right">
                  <span className="block font-medium text-lg group-hover:underline decoration-green-500 underline-offset-4">{t("inf.completed")}</span>
                  <span className="text-xs text-gray-400">15 {t("inf.successful")}</span>
                </div>
              </div>
              <ChevronDown className="-rotate-90 h-5 w-5 text-gray-500 rtl:rotate-90" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
