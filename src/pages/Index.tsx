// Neighborhood Sustainability Tracker - Landing Page
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Leaf, 
  Users, 
  Recycle, 
  TrendingUp, 
  ArrowRight, 
  ShoppingBag,
  Home,
  Award,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/marketplace-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-eco-muted/20 to-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-primary rounded-lg p-2">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">EcoNest</h1>
                <p className="text-xs text-muted-foreground">Sustainable Communities</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <Link to="/marketplace" className="text-foreground hover:text-eco-primary transition-colors">
                Marketplace
              </Link>
              <Link to="/eco-connect" className="text-foreground hover:text-eco-primary transition-colors">
                EcoConnect
              </Link>
              <Link to="/dashboard" className="text-foreground hover:text-eco-primary transition-colors">
                Dashboard
              </Link>
              <Link to="/community" className="text-foreground hover:text-eco-primary transition-colors">
                Community
              </Link>
              <Button asChild className="bg-gradient-primary hover:shadow-glow transition-all">
                <Link to="/auth">Join Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Sustainable Community"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <Badge className="bg-eco-primary text-primary-foreground px-6 py-3 text-base font-medium shadow-medium">
              <Leaf className="h-5 w-5 mr-2" />
              Building Sustainable Neighborhoods Together
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-bold text-foreground leading-tight">
              Track, Trade, and
              <span className="bg-gradient-primary bg-clip-text text-transparent block">
                Transform
              </span>
              <span className="text-4xl md:text-5xl text-muted-foreground block mt-4">
                Your Community's Impact
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join your neighborhood's sustainability journey. Monitor energy usage, 
              trade eco-friendly products, earn rewards, and build a greener future together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button size="lg" asChild className="bg-gradient-primary hover:shadow-glow transition-all text-lg px-8 py-4">
              <Link to="/auth">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-border/50 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-lg px-8 py-4">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything You Need for 
            <span className="text-eco-primary"> Sustainable Living</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform makes it easy to reduce your environmental impact
            while building stronger community connections.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 border-border/50 group">
            <CardContent className="p-8 text-center space-y-4">
              <div className="bg-eco-primary/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingBag className="h-8 w-8 text-eco-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Sustainable Marketplace</h3>
              <p className="text-muted-foreground">
                Buy, sell, and trade eco-friendly products within your neighborhood community.
              </p>
              <Button variant="ghost" className="text-eco-primary hover:text-eco-primary/80">
                Explore Marketplace →
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 border-border/50 group">
            <CardContent className="p-8 text-center space-y-4">
              <div className="bg-sustainable/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 className="h-8 w-8 text-sustainable" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Impact Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your carbon footprint, energy usage, and sustainability metrics in real-time.
              </p>
              <Button variant="ghost" className="text-sustainable hover:text-sustainable/80">
                View Dashboard →
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 border-border/50 group">
            <CardContent className="p-8 text-center space-y-4">
              <div className="bg-accent/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">EcoConnect</h3>
              <p className="text-muted-foreground">
                Connect with like-minded eco warriors and unlock sustainability challenges together.
              </p>
              <Button variant="ghost" className="text-accent hover:text-accent/80" asChild>
                <Link to="/eco-connect">
                  Find Eco Partners →
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 border-border/50 group">
            <CardContent className="p-8 text-center space-y-4">
              <div className="bg-verified/10 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8 text-verified" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Eco Rewards</h3>
              <p className="text-muted-foreground">
                Earn eco-coins for sustainable actions and redeem them for local rewards.
              </p>
              <Button variant="ghost" className="text-verified hover:text-verified/80">
                Earn Rewards →
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-secondary py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Making Real Impact Together
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-12">
            Our community is already making a difference
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary-foreground">2,500+</p>
              <p className="text-primary-foreground/80">Community Members</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary-foreground">50,000kg</p>
              <p className="text-primary-foreground/80">CO₂ Reduced</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary-foreground">15,000+</p>
              <p className="text-primary-foreground/80">Items Exchanged</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary-foreground">₹12L+</p>
              <p className="text-primary-foreground/80">Community Savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-card rounded-2xl p-12 shadow-strong border border-border/50">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Join the Sustainable Revolution?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start tracking your impact, connect with neighbors, and build a more sustainable future today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-primary hover:shadow-glow transition-all text-lg px-8 py-4">
              <Link to="/auth">
                Get Started Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-border/50 text-lg px-8 py-4">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
