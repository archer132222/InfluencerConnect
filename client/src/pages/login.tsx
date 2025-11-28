import { useState } from "react";
import { useUser } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Login() {
  const { login, isLoading } = useUser();
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{email?: string, password?: string}>({});

  const validate = () => {
    const newErrors: {email?: string, password?: string} = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;

    // Mock logic: emails containing "inf" or "omar" are influencers, others are brands
    const role = (email.toLowerCase().includes('inf') || email.toLowerCase().includes('omar')) 
      ? 'influencer' 
      : 'customer';

    login(role);
    setTimeout(() => {
      setLocation(role === 'influencer' ? '/influencer-dashboard' : '/customer-dashboard');
    }, 900);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[calc(100vh-64px)]">
        <Card className="w-full max-w-md bg-[#1a1a1a] border-white/10 text-white">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-display">{t("auth.signIn.title")}</CardTitle>
            <p className="text-sm text-gray-400">{t("auth.signIn.subtitle")}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">{t("auth.email")}</label>
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  className={`bg-[#2A2A2A] border-white/10 text-white placeholder:text-gray-500 focus:border-red-500/50 focus:ring-red-500/20 ${errors.email ? "border-red-500" : ""}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({...errors, email: undefined});
                  }}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.email}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">{t("auth.password")}</label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className={`bg-[#2A2A2A] border-white/10 text-white placeholder:text-gray-500 focus:border-red-500/50 focus:ring-red-500/20 ${errors.password ? "border-red-500" : ""}`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({...errors, password: undefined});
                  }}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.password}
                  </p>
                )}
              </div>
            </div>

            <Button 
              onClick={handleLogin} 
              disabled={isLoading}
              className="w-full bg-red-600 text-white hover:bg-red-700 border-none"
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t("auth.signIn.title")}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#1a1a1a] px-2 text-gray-400">{t("auth.or")}</span>
              </div>
            </div>

            <Button variant="outline" className="w-full border-white/10 bg-white text-black hover:bg-gray-100">
              <svg className="mr-2 h-4 w-4 rtl:ml-0 rtl:mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.17c-.22-.66-.35-1.36-.35-2.17s.13-1.51.35-2.17V7.01H2.18c-.87 1.73-1.37 3.69-1.37 5.74s.5 4.01 1.37 5.74l3.66-2.83z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.01l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              {t("auth.google")}
            </Button>

            <div className="text-center text-sm text-gray-400">
              {t("auth.noAccount")}{" "}
              <Link href="/register" className="text-white hover:underline font-medium">
                {t("nav.createAccount")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
