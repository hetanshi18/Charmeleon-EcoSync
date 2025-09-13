import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, Leaf, Target, Lightbulb } from 'lucide-react';

interface CarbonBudgetResponse {
  original_credits: number;
  target_credits: number;
  reduction_percent: number;
  suggestions: string[];
}

const CarbonBudget = () => {
  const [file, setFile] = useState<File | null>(null);
  const [reductionPercent, setReductionPercent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CarbonBudgetResponse | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(selectedFile.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or JPG/PNG file",
          variant: "destructive"
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload your electricity bill",
        variant: "destructive"
      });
      return;
    }

    if (!reductionPercent || isNaN(Number(reductionPercent))) {
      toast({
        title: "Invalid percentage",
        description: "Please enter a valid reduction percentage",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('reduction_percent', reductionPercent);

      const response = await fetch('http://localhost:8011/carbon-budget/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CarbonBudgetResponse = await response.json();
      setResult(data);
      
      toast({
        title: "Analysis complete!",
        description: "Your carbon budget has been calculated",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to analyze your bill. Make sure the backend is running on port 8011.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Carbon Budget Calculator</h1>
          <p className="text-muted-foreground">Upload your electricity bill and set your reduction goal</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Upload Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Your Bill
              </CardTitle>
              <CardDescription>
                Upload your electricity bill (PDF or JPG) and set your reduction target
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="file">Electricity Bill</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="mt-2"
                  />
                  {file && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Selected: {file.name}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="reduction">Reduction Target (%)</Label>
                  <Input
                    id="reduction"
                    type="number"
                    min="1"
                    max="100"
                    value={reductionPercent}
                    onChange={(e) => setReductionPercent(e.target.value)}
                    placeholder="e.g., 20"
                    className="mt-2"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading || !file || !reductionPercent}
                  className="w-full"
                >
                  {loading ? 'Analyzing...' : 'Calculate Carbon Budget'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Your Carbon Budget
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <Leaf className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-red-600">{result.original_credits}</p>
                    <p className="text-sm text-muted-foreground">Current CO₂ (kg)</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">{result.target_credits}</p>
                    <p className="text-sm text-muted-foreground">Target CO₂ (kg)</p>
                  </div>
                </div>

                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-lg font-semibold text-blue-600">
                    {result.reduction_percent}% Reduction Goal
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Save {(result.original_credits - result.target_credits).toFixed(2)} kg CO₂
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Suggestions */}
        {result && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Energy Saving Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CarbonBudget;