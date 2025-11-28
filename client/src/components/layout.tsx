import { useState, useEffect } from "react";
import { useUser } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  LogOut, 
  PlusCircle, 
  User, 
  Menu, 
  Globe,
  Bell,
  MessageSquare,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { user, logout } = useUser();
  const { language, setLanguage, t } = useLanguage();
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [recentNotifications, setRecentNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`/api/campaign-requests/influencer/${user?.id}`);
      if (response.ok) {
        const requests = await response.json();
        const pendingRequests = requests.filter((req: any) => req.status === 'pending');
        setNotificationCount(pendingRequests.length);
        setRecentNotifications(pendingRequests.slice(0, 3));
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    setLocation("/");
    setIsOpen(false);
  };

  return (
    <nav className="border-b border-white/10 bg-[#660000] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex-shrink-0 flex items-center cursor-pointer">
              <span className="font-display font-bold text-2xl tracking-tighter">
                {t("app.name")}<span className="text-red-200">{t("app.name.suffix")}</span>
              </span>
            </Link>
            
            {/* Language Switcher (Desktop) */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="uppercase">{language}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-[#1a1a1a] border-white/10 text-white">
                  <DropdownMenuItem onClick={() => setLanguage('en')} className="hover:bg-white/10 cursor-pointer">
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('ar')} className="hover:bg-white/10 cursor-pointer text-right font-sans">
                    العربية
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            {user ? (
              <>
                <span className="text-sm font-medium text-red-100">
                  {t("nav.welcome")}, {user.name}
                </span>
                {user.role === 'customer' && (
                  <Link href="/create-ad">
                    <Button variant="secondary" size="sm" className="gap-2 bg-white text-[#660000] hover:bg-red-50">
                      <PlusCircle className="h-4 w-4" />
                      {t("nav.newCampaign")}
                    </Button>
                  </Link>
                )}

                {/* Notifications Dropdown */}
                {user.role === 'influencer' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-white hover:bg-white/10 relative"
                        data-testid="button-notifications"
                      >
                        <Bell className="h-4 w-4" />
                        {notificationCount > 0 && (
                          <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full text-xs font-bold flex items-center justify-center text-white">
                            {notificationCount > 9 ? '9+' : notificationCount}
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600 text-white w-72">
                      <div className="p-3 border-b border-slate-600">
                        <h3 className="font-semibold text-sm flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          Pending Requests
                        </h3>
                      </div>
                      {recentNotifications.length > 0 ? (
                        <>
                          {recentNotifications.map((notif) => (
                            <DropdownMenuItem 
                              key={notif.id} 
                              className="p-3 hover:bg-slate-700 cursor-pointer flex flex-col items-start"
                              data-testid={`notification-item-${notif.id}`}
                            >
                              <p className="text-sm font-medium">{notif.campaign?.productName}</p>
                              <p className="text-xs text-slate-400">Budget: ${notif.budget}</p>
                            </DropdownMenuItem>
                          ))}
                          <DropdownMenuItem className="p-2 border-t border-slate-600 hover:bg-slate-700">
                            <Link href="/influencer-dashboard" className="text-xs text-center w-full">
                              View all requests
                            </Link>
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <div className="p-4 text-center text-slate-400 text-sm">
                          No pending requests
                        </div>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                <Link href={user.role === 'influencer' ? '/influencer-dashboard' : '/customer-dashboard'}>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
                    <LayoutDashboard className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {t("nav.dashboard")}
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-white hover:bg-white/10 hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                    {t("nav.signIn")}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-green-600 hover:bg-green-700 text-white border-none">
                    {t("nav.createAccount")}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
             <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10"
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">Switch Language</span>
              </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side={language === 'ar' ? 'left' : 'right'} className="bg-[#1a1a1a] border-l border-white/10 text-white">
                <div className="flex flex-col space-y-4 mt-8">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 px-2 pb-4 border-b border-white/10">
                        <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                        </div>
                      </div>
                      
                      {user.role === 'influencer' && (
                        <div className="px-4 py-3 border-b border-white/10">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-sm font-semibold flex items-center gap-2">
                              <Bell className="h-4 w-4" />
                              Notifications
                              {notificationCount > 0 && (
                                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                                  {notificationCount}
                                </span>
                              )}
                            </p>
                          </div>
                          {recentNotifications.length > 0 ? (
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                              {recentNotifications.map((notif) => (
                                <div key={notif.id} className="text-xs bg-slate-700/30 p-2 rounded border border-slate-600">
                                  <p className="font-medium">{notif.campaign?.productName}</p>
                                  <p className="text-slate-400">Budget: ${notif.budget}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400">No pending requests</p>
                          )}
                        </div>
                      )}

                      <Link href={user.role === 'influencer' ? '/influencer-dashboard' : '/customer-dashboard'} onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 hover:text-white">
                          <LayoutDashboard className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                          {t("nav.dashboard")}
                        </Button>
                      </Link>

                      {user.role === 'customer' && (
                        <Link href="/create-ad" onClick={() => setIsOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 hover:text-white">
                            <PlusCircle className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                            {t("nav.newCampaign")}
                          </Button>
                        </Link>
                      )}

                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-red-400 hover:bg-red-900/20 hover:text-red-300"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                        {t("nav.signOut")}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 hover:text-white">
                          {t("nav.signIn")}
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white border-none">
                          {t("nav.createAccount")}
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
