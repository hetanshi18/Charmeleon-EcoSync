import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Sparkles, 
  Zap, 
  Award,
  X,
  Calendar,
  Gift,
  Target
} from 'lucide-react';

interface UserProfile {
  id: string;
  full_name: string;
  username: string;
  avatar_url: string;
  sustainability_score: number;
  city: string;
  state: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  reward: string;
  icon: string;
}

interface MatchPopupProps {
  user: UserProfile;
  challenge: Challenge;
  onClose: () => void;
}

const MatchPopup: React.FC<MatchPopupProps> = ({ user, challenge, onClose }) => {
  const [showChallenge, setShowChallenge] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChallenge(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const energyParticles = Array.from({ length: 12 }, (_, i) => i);

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Energy Particles Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {energyParticles.map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-eco-primary rounded-full"
            initial={{
              x: '50vw',
              y: '50vh',
              scale: 0,
              opacity: 0
            }}
            animate={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        ))}
      </div>

      <Card className="bg-gradient-card shadow-strong border border-border/50 max-w-md w-full overflow-hidden relative">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 z-10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        {!showChallenge ? (
          /* Match Announcement */
          <div className="p-8 text-center space-y-6">
            {/* Energy Surge Animation */}
            <motion.div
              className="relative mx-auto"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 300 }}
            >
              <motion.div
                className="w-32 h-32 bg-gradient-primary rounded-full mx-auto flex items-center justify-center relative overflow-hidden"
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(34, 197, 94, 0.4)",
                    "0 0 0 20px rgba(34, 197, 94, 0)",
                    "0 0 0 0 rgba(34, 197, 94, 0.4)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="h-16 w-16 text-primary-foreground" />
                
                {/* Energy Lines */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 bg-primary-foreground"
                    style={{
                      height: '60px',
                      left: '50%',
                      top: '50%',
                      originY: '100%',
                      rotate: i * 45
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: [0, 1, 0] }}
                    transition={{ 
                      duration: 0.8, 
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 1.5
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Match Found!
              </h1>
              <p className="text-lg text-eco-primary font-semibold">
                Eco Quest Unlocked
              </p>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Avatar className="w-16 h-16 border-4 border-eco-primary">
                <AvatarImage src={user.avatar_url} />
                <AvatarFallback>{user.full_name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <h3 className="font-bold text-lg text-foreground">{user.full_name}</h3>
                <p className="text-muted-foreground">@{user.username}</p>
                <Badge className="bg-eco-primary text-primary-foreground mt-1">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Eco Score: {user.sustainability_score}
                </Badge>
              </div>
            </motion.div>

            <motion.p
              className="text-muted-foreground"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              You both share a passion for sustainable living!
            </motion.p>
          </div>
        ) : (
          /* Challenge Reveal */
          <motion.div
            className="p-8 space-y-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <motion.div
                className="w-20 h-20 bg-gradient-secondary rounded-full mx-auto flex items-center justify-center mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Target className="h-10 w-10 text-primary-foreground" />
              </motion.div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                New Challenge Unlocked!
              </h2>
              <p className="text-muted-foreground">
                Complete this eco-challenge together
              </p>
            </div>

            <Card className="bg-eco-muted/20 border border-eco-primary/20 p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{challenge.icon}</div>
                <div className="space-y-3 flex-1">
                  <h3 className="font-bold text-lg text-foreground">{challenge.title}</h3>
                  <p className="text-muted-foreground">{challenge.description}</p>
                  
                  <div className="flex gap-4">
                    <Badge variant="outline" className="border-accent/20 text-accent">
                      <Calendar className="h-3 w-3 mr-1" />
                      {challenge.duration}
                    </Badge>
                    <Badge variant="outline" className="border-featured/20 text-featured">
                      <Gift className="h-3 w-3 mr-1" />
                      {challenge.reward}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={onClose}
              >
                Maybe Later
              </Button>
              <Button 
                className="flex-1 bg-gradient-primary hover:shadow-glow" 
                onClick={onClose}
              >
                <Award className="h-4 w-4 mr-2" />
                Accept Challenge
              </Button>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default MatchPopup;