import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import InfluencerDashboard from "@/pages/influencer-dashboard";
import CustomerDashboard from "@/pages/customer-dashboard";
import CreateAd from "@/pages/create-ad";
import InfluencerProfile from "@/pages/influencer-profile";
import ContactAdmin from "@/pages/contact-admin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/influencer-dashboard" component={InfluencerDashboard} />
      <Route path="/customer-dashboard" component={CustomerDashboard} />
      <Route path="/create-ad" component={CreateAd} />
      <Route path="/profile/:id" component={InfluencerProfile} />
      <Route path="/contact-admin" component={ContactAdmin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
