import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Package, ArrowRight, User } from "lucide-react";

interface Business {
  id: number;
  business_name: string;
  description?: string;
  user_id: string;
  owner?: {
    username: string;
    avatar_url?: string;
    full_name?: string;
    city?: string;
    sustainability_score?: number;
  };
  product_count?: number;
}

interface BusinessCardProps {
  business: Business;
  onClick: (businessId: number, userId: string) => void;
}

export function BusinessCard({ business, onClick }: BusinessCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="bg-gradient-card hover:shadow-glow transition-all duration-300 border border-border/50 group cursor-pointer"
          onClick={() => onClick(business.id, business.user_id)}>
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 ring-2 ring-eco-primary/20">
            <AvatarImage src={business.owner?.avatar_url} />
            <AvatarFallback className="bg-eco-primary/10 text-eco-primary font-semibold">
              {business.owner?.username ? getInitials(business.owner.username) : <User className="h-5 w-5" />}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-foreground group-hover:text-eco-primary transition-colors">
                {business.business_name}
              </CardTitle>
              <Badge className="bg-eco-primary/20 text-eco-primary border-eco-primary/30">
                Handmade
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{business.owner?.username || 'Unknown'}</span>
              </div>
              
              {business.owner?.city && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{business.owner.city}</span>
                </div>
              )}
              
              {business.owner?.sustainability_score && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-sustainable text-sustainable" />
                  <span className="text-sustainable font-medium">
                    {business.owner.sustainability_score}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {business.description && (
          <CardDescription className="text-muted-foreground leading-relaxed">
            {business.description}
          </CardDescription>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>{business.product_count || 0} products available</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-eco-primary hover:text-eco-primary hover:bg-eco-primary/10 group-hover:translate-x-1 transition-all"
          >
            View Products
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}