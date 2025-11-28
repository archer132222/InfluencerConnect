import { useState } from "react";
import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function CreateAd() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Submit
      setLocation('/customer-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-md mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-center mb-2">Create New Ad Request</h1>
          <div className="flex gap-2 justify-center">
            <div className={`h-1 w-8 rounded-full ${step >= 1 ? 'bg-red-600' : 'bg-gray-800'}`} />
            <div className={`h-1 w-8 rounded-full ${step >= 2 ? 'bg-red-600' : 'bg-gray-800'}`} />
          </div>
        </div>

        <Card className="bg-[#1a1a1a] border-white/10 text-white">
          <CardContent className="pt-6 space-y-6">
            {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Product Name</label>
                  <Input 
                    className="bg-[#2A2A2A] border-white/10 text-white placeholder:text-gray-500 focus:border-red-500/50" 
                    placeholder="Ex: Luxury Perfume Bottle" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Product Description</label>
                  <Textarea 
                    className="bg-[#2A2A2A] border-white/10 text-white placeholder:text-gray-500 min-h-[100px] focus:border-red-500/50" 
                    placeholder="Ex: A new fragrance for women, floral scent..." 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Target Audience</label>
                  <Input 
                    className="bg-[#2A2A2A] border-white/10 text-white placeholder:text-gray-500 focus:border-red-500/50" 
                    placeholder="Ex: Women 20-40 years old" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Preferred Platform</label>
                  <Input 
                    className="bg-[#2A2A2A] border-white/10 text-white placeholder:text-gray-500 focus:border-red-500/50" 
                    placeholder="Ex: TikTok, Instagram" 
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="text-center py-8">
                  <h3 className="text-xl font-bold mb-2">Review Request</h3>
                  <p className="text-gray-400">Please review your ad details before submitting.</p>
                </div>
                
                <div className="bg-[#2A2A2A] p-4 rounded-lg space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Product:</span>
                    <span className="font-medium">Luxury Perfume Bottle</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Platform:</span>
                    <span className="font-medium">TikTok</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Budget:</span>
                    <span className="font-medium text-green-400">Pending</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              {step > 1 && (
                <Button 
                  variant="outline" 
                  className="flex-1 border-white/10 hover:bg-white/10 text-white"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
              )}
              <Button 
                className="flex-1 bg-white text-black hover:bg-gray-200"
                onClick={handleNext}
              >
                {step === 2 ? "Submit Request" : "Next"}
                {step === 1 && <ChevronRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
