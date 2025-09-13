import { Heart, Eye, ShoppingCart, Leaf, Award, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description?: string;
    price_inr: number;
    images?: any;
    sustainability_score?: number;
    carbon_footprint?: number;
    condition?: string;
    is_eco_friendly?: boolean;
    is_second_hand?: boolean;
    vendor?: {
      business_name: string;
      is_verified?: boolean;
    };
    seller?: {
      username: string;
      avatar_url?: string;
    };
  };
  view?: "grid" | "list";
}

export function ProductCard({ product, view = "grid" }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  
  const getSustainabilityColor = (score?: number) => {
    if (!score) return "text-muted-foreground";
    if (score >= 8) return "text-verified";
    if (score >= 6) return "text-sustainable";
    return "text-accent";
  };

  const getSustainabilityLabel = (score?: number) => {
    if (!score) return "Not Rated";
    if (score >= 8) return "Excellent";
    if (score >= 6) return "Good";
    if (score >= 4) return "Fair";
    return "Poor";
  };

  if (view === "list") {
    return (
      <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 border-border/50">
        <CardContent className="p-6">
          <div className="flex gap-6">
            <div className="w-32 h-32 bg-eco-muted rounded-lg flex items-center justify-center overflow-hidden">
              {product.images ? (
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Leaf className="h-12 w-12 text-eco-primary" />
              )}
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{product.name}</h3>
                  {product.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-eco-primary">₹{product.price_inr}</p>
                  {product.carbon_footprint && (
                    <p className="text-xs text-muted-foreground">
                      {product.carbon_footprint}kg CO₂
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Seller Info */}
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={product.seller?.avatar_url} />
                    <AvatarFallback className="text-xs bg-eco-muted text-eco-primary">
                      {product.vendor?.business_name?.[0] || product.seller?.username?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {product.vendor?.business_name || product.seller?.username}
                  </span>
                  {product.vendor?.is_verified && (
                    <Award className="h-4 w-4 text-verified" />
                  )}
                </div>

                {/* Badges */}
                <div className="flex gap-2">
                  {product.is_eco_friendly && (
                    <Badge variant="secondary" className="bg-eco-muted text-eco-primary">
                      <Leaf className="h-3 w-3 mr-1" />
                      Eco-Friendly
                    </Badge>
                  )}
                  {product.is_second_hand && (
                    <Badge variant="secondary" className="bg-accent/10 text-accent">
                      <Recycle className="h-3 w-3 mr-1" />
                      Second-Hand
                    </Badge>
                  )}
                  {product.condition && (
                    <Badge variant="outline">
                      {product.condition}
                    </Badge>
                  )}
                </div>

                {/* Sustainability Score */}
                {product.sustainability_score && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Impact:</span>
                    <span className={`text-sm font-medium ${getSustainabilityColor(product.sustainability_score)}`}>
                      {getSustainabilityLabel(product.sustainability_score)} ({product.sustainability_score}/10)
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className="text-muted-foreground hover:text-accent"
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current text-accent' : ''}`} />
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="default" size="sm" className="ml-auto">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 border-border/50 group">
      <CardContent className="p-0">
        <div className="relative">
          <div className="aspect-square bg-eco-muted rounded-t-lg flex items-center justify-center overflow-hidden">
            {product.images ? (
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <Leaf className="h-16 w-16 text-eco-primary" />
            )}
          </div>
          
          {/* Floating Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.is_eco_friendly && (
              <Badge className="bg-eco-primary text-primary-foreground shadow-soft">
                <Leaf className="h-3 w-3 mr-1" />
                Eco
              </Badge>
            )}
            {product.vendor?.is_verified && (
              <Badge className="bg-verified text-white shadow-soft">
                <Award className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          {/* Heart Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-2 right-2 bg-white/80 hover:bg-white shadow-soft"
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current text-accent' : 'text-muted-foreground'}`} />
          </Button>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-foreground line-clamp-1">{product.name}</h3>
            {product.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {product.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-eco-primary">₹{product.price_inr}</p>
            {product.sustainability_score && (
              <div className="text-right">
                <p className={`text-sm font-medium ${getSustainabilityColor(product.sustainability_score)}`}>
                  {getSustainabilityLabel(product.sustainability_score)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {product.sustainability_score}/10
                </p>
              </div>
            )}
          </div>

          {/* Seller Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-5 w-5">
                <AvatarImage src={product.seller?.avatar_url} />
                <AvatarFallback className="text-xs bg-eco-muted text-eco-primary">
                  {product.vendor?.business_name?.[0] || product.seller?.username?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">
                {product.vendor?.business_name || product.seller?.username}
              </span>
            </div>
            
            {product.carbon_footprint && (
              <p className="text-xs text-muted-foreground">
                {product.carbon_footprint}kg CO₂
              </p>
            )}
          </div>

          <div className="flex gap-2">
            {product.condition && (
              <Badge variant="outline" className="text-xs">
                {product.condition}
              </Badge>
            )}
            {product.is_second_hand && (
              <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                <Recycle className="h-3 w-3 mr-1" />
                Thrifted
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}