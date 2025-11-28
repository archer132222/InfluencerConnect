import { useState } from "react";
import { useUser } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

export default function Register() {
  const { login, isLoading } = useUser();
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"customer" | "influencer">("customer");

  const handleRegister = () => {
    login(activeTab);
    setTimeout(() => {
      setLocation(activeTab === 'influencer' ? '/influencer-dashboard' : '/customer-dashboard');
    }, 900);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[calc(100vh-64px)]">
        <Card className="w-full max-w-md bg-[#1a1a1a] border-white/10 text-white">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-display">{t("auth.createAccount.title")}</CardTitle>
            <p className="text-sm text-gray-400">{t("auth.createAccount.subtitle")}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="customer" onValueChange={(v) => setActiveTab(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#2A2A2A]">
                <TabsTrigger value="customer" className="data-[state=active]:bg-white data-[state=active]:text-black">{t("auth.brand")}</TabsTrigger>
                <TabsTrigger value="influencer" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">{t("auth.influencer")}</TabsTrigger>
              </TabsList>
              
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">{t("auth.fullName")}</label>
                  <Input className="bg-[#2A2A2A] border-white/10 text-white placeholder:text-gray-500" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">{t("auth.email")}</label>
                  <Input className="bg-[#2A2A2A] border-white/10 text-white placeholder:text-gray-500" placeholder="name@example.com" type="email" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">{t("auth.password")}</label>
                  <Input className="bg-[#2A2A2A] border-white/10 text-white placeholder:text-gray-500" type="password" placeholder="••••••••" />
                </div>
                
                {activeTab === 'influencer' && (
                   <div className="space-y-2">
                   <label className="text-sm font-medium text-gray-300">{t("auth.primaryCategory")}</label>
                   <Input className="bg-[#2A2A2A] border-white/10 text-white placeholder:text-gray-500" placeholder="e.g. Gaming, Fashion, Tech" />
                 </div>
                )}
              </div>
            </Tabs>

            <Button 
              onClick={handleRegister} 
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white border-none"
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t("nav.createAccount")}
            </Button>

            <div className="text-center text-sm text-gray-400">
              {t("auth.alreadyHave")}{" "}
              <Link href="/login" className="text-white hover:underline font-medium">
                {t("nav.signIn")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
