import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  PlusCircle, 
  Clock, 
  History, 
  ChevronDown 
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function CustomerDashboard() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-md mx-auto sm:max-w-3xl lg:max-w-5xl p-4 space-y-8">
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
            <Button variant="secondary" className="w-full h-auto py-4 px-6 justify-between bg-[#2A2A2A] hover:bg-[#333] text-white border-l-4 border-yellow-500 group rtl:border-l-0 rtl:border-r-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-500" />
                <div className="text-left rtl:text-right">
                  <span className="block font-medium text-lg group-hover:underline decoration-yellow-500 underline-offset-4">{t("inf.inProgress")}</span>
                  <span className="text-xs text-gray-400">3 {t("cust.running")}</span>
                </div>
              </div>
              <ChevronDown className="-rotate-90 h-5 w-5 text-gray-500 rtl:rotate-90" />
            </Button>

            <Button variant="secondary" className="w-full h-auto py-4 px-6 justify-between bg-[#2A2A2A] hover:bg-[#333] text-white border-l-4 border-gray-500 group rtl:border-l-0 rtl:border-r-4">
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
    </div>
  );
}
