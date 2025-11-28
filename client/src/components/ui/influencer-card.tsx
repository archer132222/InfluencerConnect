import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Smartphone, Gamepad2, Shirt } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface InfluencerProps {
  name: string;
  category: string;
  product: string;
  views: string;
  image: string;
}

export function InfluencerCard({ name, category, product, views, image }: InfluencerProps) {
  const { t } = useLanguage();
  
  return (
    <Card className="bg-[#2A2A2A] border-none text-white overflow-hidden hover:scale-105 transition-transform duration-300">
      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
        <Avatar className="h-24 w-24 border-2 border-white/20">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        
        <div className="space-y-1">
          <h3 className="font-display font-bold text-lg">{name}</h3>
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            {category === 'Tech' && <Smartphone className="h-3 w-3" />}
            {category === 'Gaming' && <Gamepad2 className="h-3 w-3" />}
            {category === 'Fashion' && <Shirt className="h-3 w-3" />}
            {category}
          </p>
        </div>

        <div className="w-full pt-4 border-t border-white/10 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">{t("common.product")}:</span>
            <span className="font-medium text-red-200">{product}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">{t("common.views")}:</span>
            <span className="font-medium flex items-center gap-1">
              <Eye className="h-3 w-3" /> {views}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
