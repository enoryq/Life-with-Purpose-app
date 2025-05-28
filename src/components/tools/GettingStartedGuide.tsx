
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CheckCircle } from 'lucide-react';

const GettingStartedGuide = () => {
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 border-2">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-purple-800 flex items-center justify-center gap-2">
          <Users className="w-6 h-6" />
          Getting Started Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-semibold text-purple-800 text-lg">First Time Here?</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                <span>Start with the <strong>Values Assessment</strong> to build your foundation</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                <span>Use <strong>Goal Setting</strong> to turn insights into actionable plans</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                <span>Build the habit with <strong>Daily Reflection</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</div>
                <span>Visualize your future with the <strong>Vision Board</strong></span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-purple-800 text-lg">Tips for Success</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Set aside dedicated, distraction-free time</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Be honest and authentic in your responses</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Remember: there are no right or wrong answers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Save your progress and revisit tools regularly</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GettingStartedGuide;
