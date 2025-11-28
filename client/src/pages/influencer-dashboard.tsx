import { useState } from "react";
import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Briefcase,
  Clock,
  CheckCircle2,
  Star,
  ChevronDown,
  ChevronLeft,
  Video,
  Calendar,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";

type ViewState = "dashboard" | "new-requests" | "in-progress" | "completed";

export default function InfluencerDashboard() {
  const { t, language } = useLanguage();
  const [view, setView] = useState<ViewState>("dashboard");

  const renderContent = () => {
    switch (view) {
      case "new-requests":
        return (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div className="flex items-center gap-2 mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setView("dashboard")}
                className="text-white hover:bg-white/10"
              >
                <ChevronLeft className="h-6 w-6 rtl:rotate-180" />
              </Button>
              <h2 className="text-xl font-display font-bold">
                {t("inf.newRequests")}
              </h2>
            </div>

            {[1, 2].map((i) => (
              <Card key={i} className="bg-[#2A2A2A] border-white/10 text-white">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 justify-between">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={`https://images.unsplash.com/photo-${i === 1 ? "1560250097-0b93528c311a" : "1599305445671-ac291c95dddb"}?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                          />
                          <AvatarFallback>B</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-lg">
                            {i === 1 ? "TechGear Pro" : "FashionNova"}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {i === 1
                              ? "New Smartphone Launch Review"
                              : "Summer Collection Haul"}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 text-sm text-gray-300">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-400" />
                          <span>$2,500</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-400" />
                          <span>Due: Oct 15</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-400 max-w-xl">
                        {i === 1
                          ? "We want you to review our latest flagship phone focusing on gaming performance and camera quality."
                          : "Showcase 3-5 outfits from our new summer line in a dynamic TikTok style video."}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 justify-center min-w-[140px]">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-white/10 hover:bg-white/10 text-white"
                      >
                        Decline
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full text-gray-400 hover:text-white"
                      >
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "in-progress":
        return (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div className="flex items-center gap-2 mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setView("dashboard")}
                className="text-white hover:bg-white/10"
              >
                <ChevronLeft className="h-6 w-6 rtl:rotate-180" />
              </Button>
              <h2 className="text-xl font-display font-bold">
                {t("inf.inProgress")}
              </h2>
            </div>

            <Card className="bg-[#2A2A2A] border-white/10 text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-900/50 rounded-lg flex items-center justify-center">
                      <Video className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold">Energy Drink Campaign</h3>
                      <p className="text-sm text-gray-400">PowerUp Energy</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-yellow-500 border-yellow-500/20 bg-yellow-500/10"
                  >
                    Content Creation
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="w-full bg-black/30 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full w-[60%]" />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Script Approved</span>
                    <span className="text-white font-medium">
                      Filming in progress
                    </span>
                    <span>Final Review</span>
                  </div>

                  <div className="bg-black/20 p-4 rounded-lg space-y-2">
                    <h4 className="text-sm font-medium text-gray-300">
                      Requirements Checklist
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="line-through text-gray-500">
                          Submit Script for Approval
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <div className="h-4 w-4 border-2 border-yellow-500 rounded-full" />
                        <span>Film Video Content</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <div className="h-4 w-4 border-2 border-gray-600 rounded-full" />
                        <span>Submit Draft for Review</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-white text-black hover:bg-gray-200">
                    Upload Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "completed":
        return (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div className="flex items-center gap-2 mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setView("dashboard")}
                className="text-white hover:bg-white/10"
              >
                <ChevronLeft className="h-6 w-6 rtl:rotate-180" />
              </Button>
              <h2 className="text-xl font-display font-bold">
                {t("inf.completed")}
              </h2>
            </div>

            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-[#2A2A2A] border-white/10 text-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-24 w-36 bg-black/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Video className="h-8 w-8 text-gray-600" />
                    </div>
                    <div className="flex-grow space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">Gaming Headset Review</h3>
                          <p className="text-sm text-gray-400">Logitech G</p>
                        </div>
                        <Badge className="bg-green-900/30 text-green-400 border-green-900/50">
                          Paid
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 py-2">
                        <div>
                          <p className="text-xs text-gray-500">Views</p>
                          <p className="font-bold text-lg">1.2M</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Likes</p>
                          <p className="font-bold text-lg">85K</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Earnings</p>
                          <p className="font-bold text-lg text-green-400">
                            $3,200
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 text-sm text-blue-400 hover:text-blue-300 cursor-pointer">
                        <span>View Analytics Report</span>
                        <ChevronDown className="-rotate-90 h-4 w-4 rtl:rotate-90" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      default:
        return (
          <div className="space-y-4 animate-in slide-in-from-left duration-300">
            <h2 className="text-xl font-display font-bold px-2">
              {t("inf.myAds")}
            </h2>

            <div className="space-y-4">
              <Button
                onClick={() => setView("new-requests")}
                variant="secondary"
                className="w-full h-auto py-4 px-6 justify-between bg-[#2A2A2A] hover:bg-[#333] text-white border-l-4 border-red-500 group rtl:border-l-0 rtl:border-r-4"
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-red-500" />
                  <div className="text-left rtl:text-right">
                    <span className="block font-medium text-lg group-hover:underline decoration-red-500 underline-offset-4">
                      {t("inf.newRequests")}
                    </span>
                    <span className="text-xs text-gray-400">
                      2 {t("inf.pending")}
                    </span>
                  </div>
                </div>
                <ChevronDown className="-rotate-90 h-5 w-5 text-gray-500 rtl:rotate-90" />
              </Button>

              <Button
                onClick={() => setView("in-progress")}
                variant="secondary"
                className="w-full h-auto py-4 px-6 justify-between bg-[#2A2A2A] hover:bg-[#333] text-white border-l-4 border-yellow-500 group rtl:border-l-0 rtl:border-r-4"
              >
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <div className="text-left rtl:text-right">
                    <span className="block font-medium text-lg group-hover:underline decoration-yellow-500 underline-offset-4">
                      {t("inf.inProgress")}
                    </span>
                    <span className="text-xs text-gray-400">
                      1 {t("inf.active")}
                    </span>
                  </div>
                </div>
                <ChevronDown className="-rotate-90 h-5 w-5 text-gray-500 rtl:rotate-90" />
              </Button>

              <Button
                onClick={() => setView("completed")}
                variant="secondary"
                className="w-full h-auto py-4 px-6 justify-between bg-[#2A2A2A] hover:bg-[#333] text-white border-l-4 border-green-500 group rtl:border-l-0 rtl:border-r-4"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <div className="text-left rtl:text-right">
                    <span className="block font-medium text-lg group-hover:underline decoration-green-500 underline-offset-4">
                      {t("inf.completed")}
                    </span>
                    <span className="text-xs text-gray-400">
                      15 {t("inf.successful")}
                    </span>
                  </div>
                </div>
                <ChevronDown className="-rotate-90 h-5 w-5 text-gray-500 rtl:rotate-90" />
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-md mx-auto sm:max-w-3xl lg:max-w-5xl p-4 space-y-6">
        {/* Profile Header (Only visible on main dashboard view) */}
        {view === "dashboard" && (
          <Card className="bg-[#1a1a1a] border-white/10 text-white animate-in fade-in slide-in-from-top-4 duration-500">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-[#2A2A2A]">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                    <AvatarFallback>OS</AvatarFallback>
                  </Avatar>
                  <div className="absolute -left-20 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-full text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-bold">4.9</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h1 className="text-2xl font-display font-bold">
                    {language === "ar" ? "عمر شعلان" : "Omar Shalan"}
                  </h1>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                    <span>
                      {t("inf.category")}:{" "}
                      <span className="text-white">Gaming</span>
                    </span>
                    <span>
                      {t("inf.followers")}:{" "}
                      <span className="text-white">350K</span>
                    </span>
                  </div>
                </div>

                <div className="mt-6 w-full">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem
                      value="portfolio"
                      className="border-white/10"
                    >
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
                              <h4 className="font-medium text-red-200">
                                Energy Drink Campaign
                              </h4>
                              <p className="text-sm text-gray-400">
                                {t("inf.videoLink")}: youtube.com/watch?v=...
                              </p>
                              <p className="text-sm text-green-400 font-medium">
                                {t("inf.views")}: 500K+
                              </p>
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
        )}

        {/* Dynamic Content Area */}
        {renderContent()}
      </div>
    </div>
  );
}
