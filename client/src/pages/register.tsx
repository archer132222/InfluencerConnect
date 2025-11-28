import { useState, useEffect } from "react";
import { useUser } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import * as api from "@/lib/api";

export default function Register() {
  const { setUser, setIsLoading, isLoading, adFormData, clearAdFormData } = useUser();
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"customer" | "influencer">("customer");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    category: ""
  });
  const [errors, setErrors] = useState<{fullName?: string, email?: string, password?: string, category?: string, general?: string}>({});

  const validate = () => {
    const newErrors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName || formData.fullName.length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (activeTab === 'influencer' && (!formData.category || formData.category.length < 2)) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      const user = await api.register(
        formData.fullName,
        formData.email,
        formData.password,
        activeTab,
        activeTab === 'influencer' ? formData.category : undefined
      );
      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
      setLocation(activeTab === 'influencer' ? '/influencer-dashboard' : '/customer-dashboard');
      clearAdFormData();
    } catch (error: any) {
      setErrors({ general: error.message || 'Registration failed' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
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
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}
            {adFormData && (
              <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-600">
                  <p className="font-medium mb-1">Ad details saved!</p>
                  <p className="text-xs text-green-600/80">We've saved your ad information. Complete your signup to submit it.</p>
                </div>
              </div>
            )}

            <Tabs defaultValue="customer" onValueChange={(v) => setActiveTab(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#2A2A2A]">
                <TabsTrigger value="customer" className="data-[state=active]:bg-white data-[state=active]:text-black">{t("auth.brand")}</TabsTrigger>
                <TabsTrigger value="influencer" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">{t("auth.influencer")}</TabsTrigger>
              </TabsList>
              
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">{t("auth.fullName")}</label>
                  <Input 
                    className={`bg-[#2A2A2A] border-white/10 text-white placeholder:text-gray-500 ${errors.fullName ? "border-red-500" : ""}`}
                    placeholder="John Doe" 
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                  />
                  {errors.fullName && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">{t("auth.email")}</label>
                  <Input 
                    className={`bg-[#2A2A2A] border-white/10 text-white placeholder:text-gray-500 ${errors.email ? "border-red-500" : ""}`}
                    placeholder="name@example.com" 
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                   {errors.email && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">{t("auth.password")}</label>
                  <Input 
                    className={`bg-[#2A2A2A] border-white/10 text-white placeholder:text-gray-500 ${errors.password ? "border-red-500" : ""}`}
                    type="password" 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                  />
                   {errors.password && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.password}</p>}
                </div>
                
                {activeTab === 'influencer' && (
                   <div className="space-y-2">
                   <label className="text-sm font-medium text-gray-300">{t("auth.primaryCategory")}</label>
                   <Input 
                    className={`bg-[#2A2A2A] border-white/10 text-white placeholder:text-gray-500 ${errors.category ? "border-red-500" : ""}`}
                    placeholder="e.g. Gaming, Fashion, Tech"
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                   />
                    {errors.category && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.category}</p>}
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
