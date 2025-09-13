import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface BusinessCreationFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function BusinessCreationForm({ onSuccess, onCancel }: BusinessCreationFormProps) {
  const [formData, setFormData] = useState({
    business_name: "",
    description: "",
    website_url: "",
    business_registration: ""
  });
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a business profile",
        variant: "destructive"
      });
      return;
    }

    setCreating(true);
    
    try {
      const { error } = await supabase
        .from('home_businesses')
        .insert({
          user_id: user.id,
          business_name: formData.business_name,
          description: formData.description,
          website_url: formData.website_url || null,
          business_registration: formData.business_registration || null
        });

      if (error) throw error;

      toast({
        title: "Business created successfully!",
        description: "Your business profile has been created. You can now upload products.",
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error creating business:', error);
      toast({
        title: "Creation failed",
        description: "There was an error creating your business profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Store className="h-5 w-5" />
          Create Your Business Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="business_name">Business Name *</Label>
            <Input
              id="business_name"
              value={formData.business_name}
              onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
              placeholder="e.g., Sarah's Handmade Crafts"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Business Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell us about your business and what you create..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website_url">Website URL (optional)</Label>
            <Input
              id="website_url"
              type="url"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              placeholder="https://yourbusiness.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="business_registration">Business Registration Number (optional)</Label>
            <Input
              id="business_registration"
              value={formData.business_registration}
              onChange={(e) => setFormData({ ...formData, business_registration: e.target.value })}
              placeholder="Your business registration number"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={creating} className="flex-1">
              {creating ? "Creating..." : "Create Business"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}