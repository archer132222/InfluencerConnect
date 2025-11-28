import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { InfluencerCard } from "@/components/ui/influencer-card";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const influencers = [
    {
      name: "Ahmed Jalal",
      category: "Tech",
      product: "New Smartphone",
      views: "1M+",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Omar Shalan",
      category: "Gaming",
      product: "New Game",
      views: "1M+",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Sarah Wilson",
      category: "Fashion",
      product: "Luxury Perfume",
      views: "750K+",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Mike Johnson",
      category: "Tech",
      product: "Smart Watch",
      views: "500K+",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#660000]/20 to-black pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight">
              Connect your brand with <br />
              <span className="text-red-500">top influencers</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our smart platform suggests the perfect influencers for your product, ensuring maximum reach and engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/register">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 h-auto">
                  Create Account
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 h-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Watch Our Success Stories</h2>
            <p className="text-gray-400">Real campaigns, real results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {influencers.map((influencer, index) => (
              <InfluencerCard key={index} {...influencer} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="link" className="text-red-400 hover:text-red-300 group">
              View All Success Stories <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
