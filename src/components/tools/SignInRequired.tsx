
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignInRequired = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200">
        <CardHeader className="text-center py-12">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-purple-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
            Sign In Required
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our interactive tools and templates are designed to provide personalized guidance 
            for your growth journey. Please sign in to access these powerful features and 
            track your progress over time.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-12">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Personalized Experience</h4>
                <p className="text-sm text-gray-600">Your tool results are saved and used to provide customized recommendations</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Progress Tracking</h4>
                <p className="text-sm text-gray-600">Monitor your growth journey and see how your insights evolve over time</p>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3">
                  Sign In to Get Started
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Don't have an account? No problem! You can create one during the sign-in process.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInRequired;
