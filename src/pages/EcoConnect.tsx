import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Leaf, 
  Award, 
  Heart,
  X,
  Sparkles,
  Battery,
  Home,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import MatchPopup from '@/components/eco-connect/MatchPopup';
import ProfileCard from '@/components/eco-connect/ProfileCard';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  full_name: string;
  username: string;
  avatar_url: string;
  sustainability_score: number;
  city: string;
  state: string;
  active_listings: number;
  sales_completed: number;
  average_rating: number;
  followers_count: number;
  following_count: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  reward: string;
  icon: string;
}

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Bike to Work Challenge',
    description: 'Use your bike for commuting for 3 consecutive days',
    duration: '3 days',
    reward: '50 Eco-Coins',
    icon: '🚴‍♂️'
  },
  {
    id: '2',
    title: 'Energy Saver Quest',
    description: 'Reduce your daily screen time by 1 hour',
    duration: '7 days',
    reward: '75 Eco-Coins',
    icon: '⚡'
  },
  {
    id: '3',
    title: 'Zero Waste Weekend',
    description: 'Go completely zero waste for the weekend',
    duration: '2 days',
    reward: '100 Eco-Coins',
    icon: '♻️'
  },
  {
    id: '4',
    title: 'Plant Parent Mission',
    description: 'Start a small herb garden at home',
    duration: '30 days',
    reward: '200 Eco-Coins',
    icon: '🌱'
  }
];

const EcoConnect = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedUser, setMatchedUser] = useState<UserProfile | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const { toast } = useToast();

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles_summary')
        .select('*')
        .limit(10);

      if (error) throw error;

      const formattedUsers = data?.map(user => ({
        id: user.id || '',
        full_name: user.full_name || 'Eco Enthusiast',
        username: user.username || 'eco_user',
        avatar_url: user.avatar_url || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000000)}?w=400&h=400&fit=crop&crop=face`,
        sustainability_score: user.sustainability_score || Math.floor(Math.random() * 100) + 50,
        city: user.city || 'EcoCity',
        state: user.state || 'Green State',
        active_listings: user.active_listings || Math.floor(Math.random() * 20),
        sales_completed: user.sales_completed || Math.floor(Math.random() * 50),
        average_rating: user.average_rating || Math.floor(Math.random() * 2) + 3.5,
        followers_count: user.followers_count || Math.floor(Math.random() * 500),
        following_count: user.following_count || Math.floor(Math.random() * 200)
      })) || [];

      setUsers(formattedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Use mock data if fetch fails
      setUsers([
        {
          id: '1',
          full_name: 'Maya Patel',
          username: 'eco_maya',
          avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b820?w=400&h=400&fit=crop&crop=face',
          sustainability_score: 92,
          city: 'Mumbai',
          state: 'Maharashtra',
          active_listings: 12,
          sales_completed: 35,
          average_rating: 4.8,
          followers_count: 245,
          following_count: 180
        },
        {
          id: '2',
          full_name: 'Arjun Singh',
          username: 'green_arjun',
          avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
          sustainability_score: 87,
          city: 'Delhi',
          state: 'Delhi',
          active_listings: 8,
          sales_completed: 22,
          average_rating: 4.6,
          followers_count: 156,
          following_count: 134
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentIndex >= users.length) return;

    const currentUser = users[currentIndex];

    if (direction === 'right') {
      setMatchedUser(currentUser);
      setChallenge(mockChallenges[Math.floor(Math.random() * mockChallenges.length)]);
      setShowMatch(true);
      
      toast({
        title: "🎉 Match Found!",
        description: `You connected with ${currentUser.full_name}!`,
      });
    }

    setCurrentIndex(prev => prev + 1);
  };

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(velocity) >= 500) {
      handleSwipe(velocity > 0 ? 'right' : 'left');
    } else if (Math.abs(offset) >= 150) {
      handleSwipe(offset > 0 ? 'right' : 'left');
    }
  };

  const currentUser = users[currentIndex];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-eco-muted/20 to-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-12 h-12 border-4 border-eco-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Finding eco-minded people nearby...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-eco-muted/20 to-background">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-eco-primary" />
              EcoConnect
            </h1>
            <p className="text-xs text-muted-foreground">Find your sustainability match</p>
          </div>
          <div className="w-16"></div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-8">
        {currentIndex >= users.length ? (
          <div className="text-center space-y-6 mt-20">
            <div className="bg-gradient-primary rounded-full p-8 w-24 h-24 mx-auto flex items-center justify-center">
              <Heart className="h-12 w-12 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">No More Profiles!</h2>
              <p className="text-muted-foreground">
                Check back later for more eco-minded people in your area.
              </p>
            </div>
            <Button onClick={() => window.location.reload()} className="bg-gradient-primary">
              <Sparkles className="h-4 w-4 mr-2" />
              Refresh Profiles
            </Button>
          </div>
        ) : (
          <div className="relative h-[600px] flex items-center justify-center">
            <AnimatePresence>
              {currentUser && (
                <ProfileCard
                  key={currentUser.id}
                  user={currentUser}
                  x={x}
                  rotate={rotate}
                  opacity={opacity}
                  onDragEnd={handleDragEnd}
                />
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-6">
              <Button
                size="lg"
                variant="outline"
                className="w-16 h-16 rounded-full border-2 border-destructive/20 hover:border-destructive hover:bg-destructive/10"
                onClick={() => handleSwipe('left')}
              >
                <X className="h-8 w-8 text-destructive" />
              </Button>
              <Button
                size="lg"
                className="w-16 h-16 rounded-full bg-gradient-primary hover:shadow-glow"
                onClick={() => handleSwipe('right')}
              >
                <Heart className="h-8 w-8 text-primary-foreground" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Match Popup */}
      <AnimatePresence>
        {showMatch && matchedUser && challenge && (
          <MatchPopup
            user={matchedUser}
            challenge={challenge}
            onClose={() => setShowMatch(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EcoConnect;