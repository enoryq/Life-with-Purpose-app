
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface ProgramPracticesProps {
  dailyPractices: string[];
}

const ProgramPractices = ({ dailyPractices }: ProgramPracticesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          Daily Practices (30-40 minutes total)
        </CardTitle>
        <CardDescription>
          Establish a powerful daily routine that supports your purpose discovery journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {dailyPractices.map((practice, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-600 font-semibold">
                {index + 1}
              </div>
              <span className="text-gray-800 font-medium">{practice}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Pro Tip</h4>
          <p className="text-yellow-700">
            Consistency beats perfection. It's better to do these practices for 5 minutes daily than 
            to skip days and try to make up for lost time. Start small and build momentum.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramPractices;
