import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Leaf, ExternalLink, ShieldCheck, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BrandProfile {
  id: number;
  brand_name: string;
  description?: string;
  website_url?: string;
  carbon_neutral: boolean;
  certifications?: any;
  verification_status: string;
  sustainability_report_url?: string;
}

interface BrandProfileCardProps {
  brandName: string;
}

export function BrandProfileCard({ brandName }: BrandProfileCardProps) {
  const [brandProfile, setBrandProfile] = useState<BrandProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrandProfile();
  }, [brandName]);

  const fetchBrandProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('brand_profiles')
        .select('*')
        .eq('brand_name', brandName)
        .single();

      if (error) throw error;
      setBrandProfile(data);
    } catch (error) {
      console.error('Error fetching brand profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-gradient-card shadow-soft border-border/50">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-eco-muted rounded w-1/3"></div>
            <div className="h-4 bg-eco-muted rounded w-full"></div>
            <div className="h-4 bg-eco-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!brandProfile) {
    return null;
  }

  const certifications = Array.isArray(brandProfile.certifications) 
    ? brandProfile.certifications 
    : typeof brandProfile.certifications === 'string' 
      ? JSON.parse(brandProfile.certifications) 
      : [];

  return (
    <Card className="bg-gradient-card shadow-soft border-border/50 mb-6">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-verified/10 rounded-full p-2">
              <Award className="h-6 w-6 text-verified" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                {brandProfile.brand_name}
                <ShieldCheck className="h-5 w-5 text-verified" />
              </h2>
              <Badge className="bg-verified text-white">
                Verified Sustainable Brand
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-2">
            {brandProfile.carbon_neutral && (
              <Badge className="bg-eco-primary text-primary-foreground">
                <Leaf className="h-3 w-3 mr-1" />
                Carbon Neutral
              </Badge>
            )}
            {brandProfile.verification_status === 'verified' && (
              <Badge className="bg-verified text-white">
                Verified
              </Badge>
            )}
          </div>
        </div>

        {brandProfile.description && (
          <p className="text-muted-foreground mb-4">{brandProfile.description}</p>
        )}

        {certifications.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Certifications & Standards</h4>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {brandProfile.website_url && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(brandProfile.website_url, '_blank')}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              Visit Website
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}
          {brandProfile.sustainability_report_url && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(brandProfile.sustainability_report_url, '_blank')}
              className="flex items-center gap-2"
            >
              <Leaf className="h-4 w-4" />
              Sustainability Report
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}