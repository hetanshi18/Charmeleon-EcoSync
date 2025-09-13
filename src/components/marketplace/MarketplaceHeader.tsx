import { Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface MarketplaceHeaderProps {
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
  onViewToggle: (view: "grid" | "list") => void;
  currentView: "grid" | "list";
}

export function MarketplaceHeader({
  onSearch,
  onFilter,
  onViewToggle,
  currentView,
}: MarketplaceHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search sustainable products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 bg-gradient-card border-border/50 shadow-soft"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="border-border/50 bg-gradient-card shadow-soft hover:shadow-medium transition-all"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <div className="flex bg-gradient-card rounded-lg p-1 shadow-soft">
            <Button
              variant={currentView === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewToggle("grid")}
              className="h-8 w-8 p-0"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={currentView === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewToggle("list")}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="bg-gradient-card rounded-lg p-6 shadow-medium border border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select onValueChange={(value) => onFilter({ category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thrifted">Thrifted Items</SelectItem>
                  <SelectItem value="handmade">Handmade Products</SelectItem>
                  <SelectItem value="sustainable-brands">Sustainable Brands</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Price Range</label>
              <Select onValueChange={(value) => onFilter({ priceRange: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-500">₹0 - ₹500</SelectItem>
                  <SelectItem value="500-2000">₹500 - ₹2,000</SelectItem>
                  <SelectItem value="2000-5000">₹2,000 - ₹5,000</SelectItem>
                  <SelectItem value="5000+">₹5,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Sustainability Score</label>
              <Select onValueChange={(value) => onFilter({ sustainabilityScore: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High (8-10)</SelectItem>
                  <SelectItem value="medium">Medium (5-7)</SelectItem>
                  <SelectItem value="low">Low (1-4)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Condition</label>
              <Select onValueChange={(value) => onFilter({ condition: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="like-new">Like New</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-eco-muted text-eco-primary">
              Eco-Friendly Only
            </Badge>
            <Badge variant="secondary" className="bg-verified/10 text-verified">
              Verified Sellers
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
}