import { useState } from "react";
import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  PlusCircle, 
  Clock, 
  History, 
  ChevronDown,
  ChevronLeft,
  Video,
  BarChart3,
  DollarSign,
  Calendar,
  MessageSquare
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

type ViewState = 'dashboard' | 'in-progress' | 'history';

export default function CustomerDashboard() {
  const { t, language } = useLanguage();
  const [view, setView] = useState<ViewState>('dashboard');

  const renderContent = () => {
    switch (view) {
      case 'in-progress':
        return (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div className="flex items-center gap-2 mb-6">
              <Button variant="ghost" size="icon" onClick={() => setView('dashboard')} className="text-white hover:bg-white/10">
                <ChevronLeft className="h-6 w-6 rtl:rotate-180" />
              </Button>
              <h2 className="text-xl font-display font-bold">{t("cust.running")}</h2>
            </div>

            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-[#2A2A2A] border-white/10 text-white">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 border-2 border-white/10">
                        <AvatarImage src={`https://images.unsplash.com/photo-${i === 1 ? '1472099645785-5658abf4ff4e' : i === 2 ? '1438761681033-6461ffad8d80' : '1500648767791-00dcc994a43e'}?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">{i === 1 ? "Omar Shalan" : i === 2 ? "Sarah Wilson" : "Ahmed Jalal"}</h3>
                          <Badge variant="secondary" className="text-xs bg-white/10 hover:bg-white/20 text-white border-none">
                            {i === 1 ? "Gaming" : i === 2 ? "Fashion" : "Tech"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">{i === 1 ? "New Game Launch" : i === 2 ? "Summer Collection" : "Smartphone Review"}</p>
                        
                        <div className="flex gap-4 pt-2 text-sm">
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Clock className="h-3 w-3" />
                            <span>{i === 1 ? "Filming" : i === 2 ? "Script Review" : "Editing"}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Calendar className="h-3 w-3" />
                            <span>Due: Oct {15 + i}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-auto">
                      <Button variant="outline" className="border-white/10 hover:bg-white/10 text-white">View Timeline</Button>
                      <Link href="/messages">
                        <Button className="bg-white text-black hover:bg-gray-200 w-full">Message</Button>
                      </Link>                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'history':
        return (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div className="flex items-center gap-2 mb-6">
              <Button variant="ghost" size="icon" onClick={() => setView('dashboard')} className="text-white hover:bg-white/10">
                <ChevronLeft className="h-6 w-6 rtl:rotate-180" />
              </Button>
              <h2 className="text-xl font-display font-bold">{t("cust.previous")}</h2>
            </div>

            {[1, 2].map((i) => (
              <Card key={i} className="bg-[#2A2A2A] border-white/10 text-white">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-24 bg-black/50 rounded flex items-center justify-center">
                          <Video className="h-8 w-8 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{i === 1 ? "Holiday Special Promo" : "Back to School Campaign"}</h3>
                          <p className="text-sm text-gray-400">Completed on {i === 1 ? "Dec 20, 2024" : "Aug 30, 2024"}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Total Spend</p>
                        <p className="font-bold text-xl text-green-400">${i === 1 ? "12,500" : "8,200"}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 bg-black/20 p-4 rounded-lg">
                      <div className="text-center border-r border-white/10 last:border-0">
                        <p className="text-xs text-gray-500 mb-1">Total Views</p>
                        <p className="font-bold text-lg">{i === 1 ? "2.4M" : "1.1M"}</p>
                      </div>
                      <div className="text-center border-r border-white/10 last:border-0">
                        <p className="text-xs text-gray-500 mb-1">Engagement</p>
                        <p className="font-bold text-lg">{i === 1 ? "8.5%" : "6.2%"}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">ROI</p>
                        <p className="font-bold text-lg text-green-400">{i === 1 ? "3.2x" : "2.1x"}</p>
                      </div>
                    </div>

                    <Button variant="ghost" className="w-full text-red-400 hover:text-red-300 hover:bg-red-900/10 gap-2">
                      <BarChart3 className="h-4 w-4" />
                      View Detailed Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      default:
        return (
          <div className="space-y-8 animate-in slide-in-from-left duration-300">
             <div className="flex items-center justify-between px-2">
              <h1 className="text-2xl font-display font-bold">{t("cust.myCampaigns")}</h1>
            </div>

            {/* Primary Action */}
            <Link href="/create-ad">
              <Button className="w-full h-auto py-6 bg-[#2A2A2A] hover:bg-[#333] border-2 border-dashed border-white/20 hover:border-white/40 group transition-all">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-red-600 rounded-full p-3 group-hover:scale-110 transition-transform">
                    <PlusCircle className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-lg font-medium">{t("cust.createNew")}</span>
                  <span className="text-sm text-gray-400">{t("cust.startNew")}</span>
                </div>
              </Button>
            </Link>

            {/* Dashboard Actions */}
            <div className="space-y-4">
              <h2 className="text-xl font-display font-bold px-2 text-gray-400">{t("cust.status")}</h2>
              
              <div className="space-y-4">
                <Button onClick={() => setView('in-progress')} variant="secondary" className="w-full h-auto py-4 px-6 justify-between bg-[#2A2A2A] hover:bg-[#333] text-white border-l-4 border-yellow-500 group rtl:border-l-0 rtl:border-r-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <div className="text-left rtl:text-right">
                      <span className="block font-medium text-lg group-hover:underline decoration-yellow-500 underline-offset-4">{t("inf.inProgress")}</span>
                      <span className="text-xs text-gray-400">3 {t("cust.running")}</span>
                    </div>
                  </div>
                  <ChevronDown className="-rotate-90 h-5 w-5 text-gray-500 rtl:rotate-90" />
                </Button>

                <Button onClick={() => setView('history')} variant="secondary" className="w-full h-auto py-4 px-6 justify-between bg-[#2A2A2A] hover:bg-[#333] text-white border-l-4 border-gray-500 group rtl:border-l-0 rtl:border-r-4">
                  <div className="flex items-center gap-3">
                    <History className="h-5 w-5 text-gray-400" />
                    <div className="text-left rtl:text-right">
                      <span className="block font-medium text-lg group-hover:underline decoration-gray-500 underline-offset-4">{t("cust.previous")}</span>
                      <span className="text-xs text-gray-400">{t("cust.history")}</span>
                    </div>
                  </div>
                  <ChevronDown className="-rotate-90 h-5 w-5 text-gray-500 rtl:rotate-90" />
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-md mx-auto sm:max-w-3xl lg:max-w-5xl p-4">
        {renderContent()}
      </div>
    </div>
  );
}
