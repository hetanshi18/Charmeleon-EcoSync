import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Leaf, 
  Users, 
  TrendingDown, 
  Recycle, 
  Car, 
  ShoppingBag,
  ArrowRight,
  CheckCircle,
  Globe,
  Heart
} from 'lucide-react';

const LandingPage = () => {
  const { user } = useAuth();

  // If user is already signed in, redirect to main app
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-eco-muted/20 to-background">
      {/* Header */}
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

            <Button asChild variant="outline">
              <Link to="/auth" className="flex items-center gap-2">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Build Your
              <span className="bg-gradient-primary bg-clip-text text-transparent block">
                Sustainable Future
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join a community of eco-conscious individuals tracking carbon footprints, 
              sharing sustainable products, and creating positive environmental impact together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-gradient-primary hover:shadow-glow transition-all">
              <Link to="/auth" className="flex items-center gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-eco-primary">10K+</div>
              <div className="text-muted-foreground">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-eco-primary">50K+</div>
              <div className="text-muted-foreground">Trips Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-eco-primary">2.3M</div>
              <div className="text-muted-foreground">CO₂ Saved (kg)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
              Everything You Need for Sustainable Living
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive tools to track, improve, and share your environmental impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-border/50 shadow-medium hover:shadow-strong transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="bg-gradient-primary rounded-lg p-3 w-12 h-12 flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-primary-foreground" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">Carbon Budget Tracking</h4>
                <p className="text-muted-foreground">
                  Monitor your daily carbon footprint with intelligent tracking and personalized recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-medium hover:shadow-strong transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="bg-gradient-primary rounded-lg p-3 w-12 h-12 flex items-center justify-center">
                  <Car className="h-6 w-6 text-primary-foreground" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">Trip Tracker</h4>
                <p className="text-muted-foreground">
                  Log your journeys and discover eco-friendly transportation alternatives for every trip.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-medium hover:shadow-strong transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="bg-gradient-primary rounded-lg p-3 w-12 h-12 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-primary-foreground" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">Sustainable Marketplace</h4>
                <p className="text-muted-foreground">
                  Discover and share eco-friendly products with your community through our swipe-based marketplace.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-medium hover:shadow-strong transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="bg-gradient-primary rounded-lg p-3 w-12 h-12 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">Community Connection</h4>
                <p className="text-muted-foreground">
                  Connect with like-minded individuals and share sustainable living tips and achievements.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-medium hover:shadow-strong transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="bg-gradient-primary rounded-lg p-3 w-12 h-12 flex items-center justify-center">
                  <Recycle className="h-6 w-6 text-primary-foreground" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">Impact Analytics</h4>
                <p className="text-muted-foreground">
                  Visualize your environmental impact with detailed analytics and progress tracking.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-medium hover:shadow-strong transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="bg-gradient-primary rounded-lg p-3 w-12 h-12 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary-foreground" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">Global Challenges</h4>
                <p className="text-muted-foreground">
                  Participate in community challenges and contribute to global sustainability goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                  Why Choose EcoNest?
                </h3>
                <p className="text-muted-foreground text-lg">
                  Join thousands of users who are making a real difference in the fight against climate change.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-eco-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Science-Based Tracking</h4>
                    <p className="text-muted-foreground">
                      Our carbon calculations are based on the latest climate science and verified methodologies.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-eco-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Community Driven</h4>
                    <p className="text-muted-foreground">
                      Learn from others, share your journey, and stay motivated with community support.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-eco-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Actionable Insights</h4>
                    <p className="text-muted-foreground">
                      Get personalized recommendations to reduce your environmental impact effectively.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-primary rounded-2xl p-8 text-center space-y-6">
                <Heart className="h-16 w-16 text-primary-foreground mx-auto" />
                <div className="text-primary-foreground">
                  <h4 className="text-2xl font-bold mb-2">Ready to Make a Difference?</h4>
                  <p className="text-primary-foreground/80 mb-6">
                    Join our community today and start your journey towards sustainable living.
                  </p>
                  <Button asChild variant="secondary" size="lg" className="bg-white text-eco-primary hover:bg-white/90">
                    <Link to="/auth" className="flex items-center gap-2">
                      Get Started Now
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-primary rounded-lg p-2">
                  <Leaf className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-bold text-foreground">EcoNest</h1>
                  <p className="text-xs text-muted-foreground">Sustainable Communities</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                Building a sustainable future, one community at a time.
              </p>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-foreground">Features</h5>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Carbon Tracking</div>
                <div>Trip Monitoring</div>
                <div>Sustainable Marketplace</div>
                <div>Community Challenges</div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-foreground">Community</h5>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Join Us</div>
                <div>Success Stories</div>
                <div>Environmental Impact</div>
                <div>Support</div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-foreground">Company</h5>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>About</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>Contact</div>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 mt-12 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2025 EcoNest. All rights reserved. Building sustainable communities worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;