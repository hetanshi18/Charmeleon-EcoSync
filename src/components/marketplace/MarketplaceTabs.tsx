import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Recycle, Hammer, Award, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductUploadForm } from "./ProductUploadForm";
import { BusinessCreationForm } from "./BusinessCreationForm";

interface MarketplaceTabsProps {
  children: React.ReactNode;
  onTabChange: (tab: string) => void;
  onProductUpload: () => void;
}

export function MarketplaceTabs({ children, onTabChange, onProductUpload }: MarketplaceTabsProps) {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadType, setUploadType] = useState<"thrifted" | "handmade">("handmade");
  const [showBusinessForm, setShowBusinessForm] = useState(false);

  const handleUploadClick = (type: "thrifted") => {
    setUploadType(type);
    setShowUploadForm(true);
  };

  const handleCreateBusinessClick = () => {
    setShowBusinessForm(true);
  };

  const handleBusinessSuccess = () => {
    setShowBusinessForm(false);
    onProductUpload();
  };

  const handleUploadSuccess = () => {
    setShowUploadForm(false);
    onProductUpload();
  };

  const handleCancel = () => {
    setShowUploadForm(false);
    setShowBusinessForm(false);
  };
  return (
    <Tabs defaultValue="all" onValueChange={onTabChange} className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 bg-gradient-card shadow-soft border border-border/50">
        <TabsTrigger 
          value="all" 
          className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
        >
          All Items
        </TabsTrigger>
        <TabsTrigger 
          value="thrifted"
          className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
        >
          <Recycle className="h-4 w-4 mr-2" />
          Thrifted
          <Badge variant="secondary" className="ml-2 bg-accent/20 text-accent">
            Popular
          </Badge>
        </TabsTrigger>
        <TabsTrigger 
          value="handmade"
          className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
        >
          <Hammer className="h-4 w-4 mr-2" />
          Handmade
        </TabsTrigger>
        <TabsTrigger 
          value="brands"
          className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
        >
          <Award className="h-4 w-4 mr-2" />
          Sustainable Brands
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-6">
        <div className="text-center py-4">
          <p className="text-muted-foreground">
            Discover all sustainable products from your neighborhood
          </p>
        </div>
        {children}
      </TabsContent>

      <TabsContent value="thrifted" className="space-y-6">
        <div className="bg-gradient-card p-6 rounded-lg shadow-soft border border-border/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Recycle className="h-6 w-6 text-accent" />
              <h2 className="text-xl font-semibold text-foreground">Thrifted & Second-Hand</h2>
              <Badge className="bg-accent text-accent-foreground">
                Reduces Waste
              </Badge>
            </div>
            <Button onClick={() => handleUploadClick("thrifted")} className="bg-gradient-primary">
              <Plus className="h-4 w-4 mr-2" />
              Upload Thrifted Item
            </Button>
          </div>
          <p className="text-muted-foreground mb-4">
            Give pre-loved items a second life. From vintage furniture to gently used electronics, 
            find quality products while reducing environmental impact.
          </p>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium text-eco-primary">Average CO₂ Saved:</span>
              <span className="text-accent font-semibold">12kg per item</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-eco-primary">Price Savings:</span>
              <span className="text-accent font-semibold">Up to 70%</span>
            </div>
          </div>
        </div>
        
        {showUploadForm && uploadType === "thrifted" && (
          <ProductUploadForm 
            listingType="thrifted" 
            onSuccess={handleUploadSuccess}
            onCancel={handleCancel}
          />
        )}
        
        {children}
      </TabsContent>

      <TabsContent value="handmade" className="space-y-6">
        <div className="bg-gradient-card p-6 rounded-lg shadow-soft border border-border/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Hammer className="h-6 w-6 text-eco-primary" />
              <h2 className="text-xl font-semibold text-foreground">Handmade & Local Products</h2>
              <Badge className="bg-eco-primary text-primary-foreground">
                Community Made
              </Badge>
            </div>
            <Button onClick={handleCreateBusinessClick} className="bg-gradient-primary">
              <Plus className="h-4 w-4 mr-2" />
              Create Business
            </Button>
          </div>
          <p className="text-muted-foreground mb-4">
            Support your neighbors by purchasing handcrafted, handmade, and locally produced items. 
            From organic soaps to handwoven textiles, discover unique products made with care.
          </p>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium text-eco-primary">Local Impact:</span>
              <span className="text-sustainable font-semibold">Supports 50+ families</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-eco-primary">Transport Footprint:</span>
              <span className="text-sustainable font-semibold">Near Zero</span>
            </div>
          </div>
        </div>
        
        {showBusinessForm && (
          <BusinessCreationForm 
            onSuccess={handleBusinessSuccess}
            onCancel={handleCancel}
          />
        )}
        
        {children}
      </TabsContent>

      <TabsContent value="brands" className="space-y-6">
        <div className="bg-gradient-card p-6 rounded-lg shadow-soft border border-border/50">
          <div className="flex items-center gap-3 mb-3">
            <Award className="h-6 w-6 text-verified" />
            <h2 className="text-xl font-semibold text-foreground">Verified Sustainable Brands</h2>
            <Badge className="bg-verified text-white">
              Certified
            </Badge>
          </div>
          <p className="text-muted-foreground mb-4">
            Shop from environmentally responsible brands that prioritize sustainability. 
            All brands are verified for their eco-credentials and ethical practices.
          </p>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium text-eco-primary">Verification Standards:</span>
              <span className="text-verified font-semibold">Carbon Neutral + Fair Trade</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-eco-primary">Impact Tracking:</span>
              <span className="text-verified font-semibold">Full Lifecycle Assessment</span>
            </div>
          </div>
        </div>
        {children}
      </TabsContent>
    </Tabs>
  );
}