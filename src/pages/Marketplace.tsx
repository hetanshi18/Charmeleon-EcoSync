import { useState, useEffect } from "react";
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { MarketplaceTabs } from "@/components/marketplace/MarketplaceTabs";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { BusinessCard } from "@/components/marketplace/BusinessCard";
import { BrandProfileCard } from "@/components/marketplace/BrandProfileCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Leaf, Users, Recycle, TrendingUp, ArrowRight, User, LogOut, ChevronLeft, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import heroImage from "@/assets/marketplace-hero.jpg";
import { ProductUploadForm } from "@/components/marketplace/ProductUploadForm";

interface Product {
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
  listing_type?: string;
  business_id?: number;
  brand_profile_id?: number;
  vendor?: {
    business_name: string;
    is_verified?: boolean;
  };
  seller?: {
    username: string;
    avatar_url?: string;
  };
}

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

const Marketplace = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [brandProfiles, setBrandProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<"grid" | "list">("grid");
  const [currentTab, setCurrentTab] = useState("all");
  const [selectedBusinessId, setSelectedBusinessId] = useState<number | null>(null);
  const [selectedBusinessUserId, setSelectedBusinessUserId] = useState<string | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [showBusinessUpload, setShowBusinessUpload] = useState(false);
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account.",
    });
    navigate("/");
  };

  useEffect(() => {
    fetchProducts();
    fetchBrandProfiles();
  }, []);

  useEffect(() => {
    if (currentTab === 'handmade' && !selectedBusinessId) {
      fetchBusinesses();
    } else {
      filterProductsByTab();
    }
  }, [products, currentTab, selectedBusinessId, selectedBrandId]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          users!listings_seller_id_fkey(username, avatar_url, full_name),
          home_businesses:business_id(business_name),
          brand_profiles:brand_profile_id(brand_name, verification_status)
        `)
        .eq('status', 'active')
        .eq('is_available', true)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      const formattedProducts = data?.map(listing => {
        return {
          id: listing.id,
          name: listing.title,
          description: listing.description,
          price_inr: listing.price,
          images: listing.images,
          sustainability_score: listing.sustainability_score,
          carbon_footprint: listing.carbon_saved_kg,
          condition: listing.condition,
          is_eco_friendly: listing.listing_type === 'handmade' || listing.listing_type === 'brand_product',
          is_second_hand: listing.listing_type === 'thrift',
          listing_type: listing.listing_type,
          business_id: listing.business_id,
          brand_profile_id: listing.brand_profile_id,
          vendor: listing.home_businesses ? {
            business_name: listing.home_businesses.business_name,
            is_verified: false
          } : listing.listing_type === 'brand_product' && listing.brand_profiles ? {
            business_name: listing.brand_profiles.brand_name,
            is_verified: listing.brand_profiles.verification_status === 'verified'
          } : undefined,
          seller: {
            username: listing.listing_type === 'brand_product' && listing.brand_profiles 
              ? listing.brand_profiles.brand_name
              : listing.users?.username || 'Unknown',
            avatar_url: listing.users?.avatar_url
          }
        };
      }) || [];

      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('home_businesses')
        .select(`
          *,
          users!home_businesses_user_id_fkey(username, avatar_url, full_name, city, sustainability_score)
        `);

      if (error) throw error;

      const businessIds = data?.map(b => b.id) || [];
      const { data: productCounts } = await supabase
        .from('listings')
        .select('business_id')
        .eq('listing_type', 'handmade')
        .eq('status', 'active')
        .eq('is_available', true)
        .in('business_id', businessIds);

      const countMap = new Map();
      productCounts?.forEach(p => {
        countMap.set(p.business_id, (countMap.get(p.business_id) || 0) + 1);
      });

      const formattedBusinesses = data?.map(business => ({
        id: business.id,
        business_name: business.business_name,
        description: business.description,
        user_id: business.user_id,
        owner: business.users ? {
          username: business.users.username,
          avatar_url: business.users.avatar_url,
          full_name: business.users.full_name,
          city: business.users.city,
          sustainability_score: business.users.sustainability_score
        } : undefined,
        product_count: countMap.get(business.id) || 0
      })) || [];

      setBusinesses(formattedBusinesses);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      toast({
        title: "Error",
        description: "Failed to load businesses. Please try again.",
        variant: "destructive"
      });
    }
  };

  const fetchBrandProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('brand_profiles')
        .select('*')
        .eq('verification_status', 'verified');

      if (error) throw error;
      setBrandProfiles(data || []);
    } catch (error) {
      console.error('Error fetching brand profiles:', error);
    }
  };

  const filterProductsByTab = () => {
    let filtered = products;
    
    switch (currentTab) {
      case "thrifted":
        // Only show products with listing_type 'thrift'
        filtered = products.filter(p => p.listing_type === 'thrift');
        break;
      case "handmade":
        if (selectedBusinessId) {
          filtered = products.filter(p => 
            p.business_id === selectedBusinessId && p.listing_type === 'handmade'
          );
        } else {
          filtered = products.filter(p => p.listing_type === 'handmade');
        }
        break;
      case "brands":
        if (selectedBrandId) {
          // Show products for selected brand only
          filtered = products.filter(p => 
            p.listing_type === 'brand_product' && 
            p.brand_profile_id === selectedBrandId
          );
        } else {
          // Don't show any products when no brand is selected
          filtered = [];
        }
        break;
      default:
        filtered = products;
    }
    
    setFilteredProducts(filtered);
  };

  const handleBusinessClick = (businessId: number, userId: string) => {
    setSelectedBusinessId(businessId);
    setSelectedBusinessUserId(userId);
  };

  const handleBrandClick = (brandId: number) => {
    setSelectedBrandId(brandId);
  };

  const handleBackToBusinesses = () => {
    setSelectedBusinessId(null);
    setSelectedBusinessUserId(null);
    setShowBusinessUpload(false);
  };

  const handleBackToBrands = () => {
    setSelectedBrandId(null);
  };

  const handleBusinessUploadSuccess = () => {
    setShowBusinessUpload(false);
    fetchProducts();
  };

  const handleSearch = (query: string) => {
    let baseProducts = products;
    
    // Apply tab filter first
    switch (currentTab) {
      case "thrift":
        baseProducts = products.filter(p => p.listing_type === 'thrift');
        break;
      case "handmade":
        if (selectedBusinessId) {
          baseProducts = products.filter(p => 
            p.business_id === selectedBusinessId && p.listing_type === 'handmade'
          );
        } else {
          baseProducts = products.filter(p => p.listing_type === 'handmade');
        }
        break;
      case "brands":
        if (selectedBrandId) {
          baseProducts = products.filter(p => 
            p.listing_type === 'brand_product' && 
            p.brand_profile_id === selectedBrandId
          );
        } else {
          baseProducts = [];
        }
        break;
      default:
        baseProducts = products;
    }
    
    // Apply search filter
    if (query.trim()) {
      baseProducts = baseProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setFilteredProducts(baseProducts);
  };

  const handleFilter = (filters: any) => {
    console.log('Applying filters:', filters);
  };

  const renderContent = () => {
    // Handmade tab - show businesses
    if (currentTab === 'handmade' && !selectedBusinessId) {
      if (loading) {
        return (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading home businesses...</p>
          </div>
        );
      }
      
      if (businesses.length === 0) {
        return (
          <div className="text-center py-20 space-y-4">
            <Leaf className="h-16 w-16 text-eco-primary mx-auto opacity-50" />
            <h3 className="text-xl font-medium text-foreground">No businesses found</h3>
            <p className="text-muted-foreground">
              Be the first to create a home business and start selling!
            </p>
          </div>
        );
      }
      
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => (
            <BusinessCard
              key={business.id}
              business={business}
              onClick={handleBusinessClick}
            />
          ))}
        </div>
      );
    }

    // Handmade tab - show products for selected business
    if (currentTab === 'handmade' && selectedBusinessId) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleBackToBusinesses}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Businesses
              </Button>
              <h3 className="text-lg font-semibold text-foreground">
                Products from {businesses.find(b => b.id === selectedBusinessId)?.business_name}
              </h3>
            </div>
            <Button 
              onClick={() => setShowBusinessUpload(true)}
              className="bg-gradient-primary flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Upload Product
            </Button>
          </div>

          {showBusinessUpload && (
            <div className="mb-6">
              <ProductUploadForm 
                listingType="handmade"
                businessId={selectedBusinessId}
                onSuccess={handleBusinessUploadSuccess}
                onCancel={() => setShowBusinessUpload(false)}
              />
            </div>
          )}
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <Leaf className="h-16 w-16 text-eco-primary mx-auto opacity-50" />
              <h3 className="text-xl font-medium text-foreground">No products yet</h3>
              <p className="text-muted-foreground">
                This business hasn't uploaded any products yet.
              </p>
            </div>
          ) : (
            <div className={
              currentView === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  view={currentView}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    // Brands tab - show brand cards or products for selected brand
    if (currentTab === 'brands') {
      if (selectedBrandId) {
        const selectedBrand = brandProfiles.find(b => b.id === selectedBrandId);
        
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleBackToBrands}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Brands
              </Button>
              <h3 className="text-lg font-semibold text-foreground">
                Products from {selectedBrand?.brand_name}
              </h3>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <Leaf className="h-16 w-16 text-eco-primary mx-auto opacity-50" />
                <h3 className="text-xl font-medium text-foreground">No products yet</h3>
                <p className="text-muted-foreground">
                  This brand hasn't uploaded any products yet.
                </p>
              </div>
            ) : (
              <div className={
                currentView === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    view={currentView}
                  />
                ))}
              </div>
            )}
          </div>
        );
      }
      
      // Show brand cards only
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandProfiles.map((brand) => (
            <div key={brand.id} onClick={() => handleBrandClick(brand.id)} className="cursor-pointer">
              <BrandProfileCard brandName={brand.brand_name} />
            </div>
          ))}
        </div>
      );
    }

    // Loading state for other tabs
    if (loading) {
      return (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading sustainable products...</p>
        </div>
      );
    }

    // No products found
    if (filteredProducts.length === 0) {
      return (
        <div className="text-center py-20 space-y-4">
          <Leaf className="h-16 w-16 text-eco-primary mx-auto opacity-50" />
          <h3 className="text-xl font-medium text-foreground">No products found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or check back later for new listings.
          </p>
        </div>
      );
    }

    // Default product grid for "all" and "thrift" tabs
    return (
      <div className={
        currentView === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
      }>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            view={currentView}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-eco-muted/20 to-background">
      <nav className="border-b border-border/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-gradient-primary rounded-lg p-2">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">EcoNest</h1>
                <p className="text-xs text-muted-foreground">Sustainable Marketplace</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Welcome back, <span className="text-foreground font-medium">{user?.email}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
      
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImage}
            alt="Sustainable Marketplace"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge className="bg-eco-primary text-primary-foreground px-4 py-2 text-sm font-medium">
              <Leaf className="h-4 w-4 mr-2" />
              Neighborhood Sustainability Hub
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Sustainable
              <span className="bg-gradient-primary bg-clip-text text-transparent ml-4">
                Marketplace
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Buy, sell, and exchange sustainable products within your community. 
              Reduce waste, support local makers, and build a greener neighborhood together.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <Users className="h-5 w-5 text-eco-primary" />
              <span className="text-foreground font-medium">500+ Members</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <Recycle className="h-5 w-5 text-accent" />
              <span className="text-foreground font-medium">2,000+ Items Saved</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <TrendingUp className="h-5 w-5 text-sustainable" />
              <span className="text-foreground font-medium">85% Carbon Reduction</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all">
              Start Shopping
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-border/50 bg-white/10 backdrop-blur-sm hover:bg-white/20">
              List Your Items
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="space-y-8">
          <MarketplaceHeader
            onSearch={handleSearch}
            onFilter={handleFilter}
            onViewToggle={setCurrentView}
            currentView={currentView}
          />

          <MarketplaceTabs 
            onTabChange={(tab) => {
              setCurrentTab(tab);
              if (tab !== 'handmade') {
                handleBackToBusinesses();
              }
              if (tab !== 'brands') {
                handleBackToBrands();
              }
            }} 
            onProductUpload={fetchProducts}
          >
            {renderContent()}
          </MarketplaceTabs>
        </div>
      </section>
    </div>
  );
};

export default Marketplace;