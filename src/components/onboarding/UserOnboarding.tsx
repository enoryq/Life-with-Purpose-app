
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Target, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface OnboardingData {
  motivation: string;
  currentFocus: string;
  experience: string;
  goals: string;
}

const UserOnboarding = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    motivation: '',
    currentFocus: '',
    experience: '',
    goals: ''
  });
  const navigate = useNavigate();

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    // Here you could save the onboarding data to the user's profile
    toast.success('Welcome aboard! Your personalized journey begins now.');
    navigate('/dashboard');
  };

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return data.motivation !== '';
      case 2:
        return data.currentFocus !== '';
      case 3:
        return data.goals !== '';
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-2xl border-2 border-purple-200 shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Let's Personalize Your Journey
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Help us understand what brought you here so we can create the perfect experience for you
          </CardDescription>
          <div className="mt-6">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-500 mt-2">Step {step} of {totalSteps}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  What brought you to Life with Purpose?
                </h3>
                <p className="text-gray-600">
                  Understanding your motivation helps us guide you better
                </p>
              </div>
              
              <RadioGroup 
                value={data.motivation} 
                onValueChange={(value) => setData({...data, motivation: value})}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-purple-50 transition-colors">
                  <RadioGroupItem value="clarity" id="clarity" />
                  <Label htmlFor="clarity" className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">Seeking clarity and direction</p>
                      <p className="text-sm text-gray-600">I want to understand my purpose and life direction</p>
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-purple-50 transition-colors">
                  <RadioGroupItem value="growth" id="growth" />
                  <Label htmlFor="growth" className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">Personal growth and development</p>
                      <p className="text-sm text-gray-600">I want to improve myself and develop new skills</p>
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-purple-50 transition-colors">
                  <RadioGroupItem value="meaning" id="meaning" />
                  <Label htmlFor="meaning" className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">Finding meaning and fulfillment</p>
                      <p className="text-sm text-gray-600">I want my life to feel more meaningful and purposeful</p>
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-purple-50 transition-colors">
                  <RadioGroupItem value="transition" id="transition" />
                  <Label htmlFor="transition" className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium">Life transition or change</p>
                      <p className="text-sm text-gray-600">I'm going through a major life change and need guidance</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  What's your main focus right now?
                </h3>
                <p className="text-gray-600">
                  This helps us recommend the most relevant content and tools
                </p>
              </div>
              
              <RadioGroup 
                value={data.currentFocus} 
                onValueChange={(value) => setData({...data, currentFocus: value})}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-purple-50 transition-colors">
                  <RadioGroupItem value="career" id="career" />
                  <Label htmlFor="career" className="flex-1 cursor-pointer">Career and professional development</Label>
                </div>
                
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-purple-50 transition-colors">
                  <RadioGroupItem value="relationships" id="relationships" />
                  <Label htmlFor="relationships" className="flex-1 cursor-pointer">Relationships and connections</Label>
                </div>
                
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-purple-50 transition-colors">
                  <RadioGroupItem value="health" id="health" />
                  <Label htmlFor="health" className="flex-1 cursor-pointer">Health and well-being</Label>
                </div>
                
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-purple-50 transition-colors">
                  <RadioGroupItem value="creativity" id="creativity" />
                  <Label htmlFor="creativity" className="flex-1 cursor-pointer">Creativity and self-expression</Label>
                </div>
                
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-purple-50 transition-colors">
                  <RadioGroupItem value="spirituality" id="spirituality" />
                  <Label htmlFor="spirituality" className="flex-1 cursor-pointer">Spirituality and inner growth</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  What would you like to achieve in the next 3 months?
                </h3>
                <p className="text-gray-600">
                  Share your goals so we can help you create a personalized action plan
                </p>
              </div>
              
              <Textarea
                value={data.goals}
                onChange={(e) => setData({...data, goals: e.target.value})}
                placeholder="Describe what you'd like to accomplish or work towards..."
                className="min-h-32 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="min-w-24"
            >
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 min-w-32"
            >
              <div className="flex items-center gap-2">
                {step === totalSteps ? 'Complete Setup' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserOnboarding;
