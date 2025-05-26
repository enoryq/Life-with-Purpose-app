
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ExpertInsight {
  expert: string;
  title: string;
  insight: string;
}

interface ProgramExpertsProps {
  expertInsights: ExpertInsight[];
}

const ProgramExperts = ({ expertInsights }: ProgramExpertsProps) => {
  return (
    <div className="grid gap-6">
      {expertInsights.map((expert, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <blockquote className="text-lg text-gray-700 italic mb-4">
              "{expert.insight}"
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {expert.expert.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-semibold text-gray-800">{expert.expert}</div>
                <div className="text-gray-600 text-sm">{expert.title}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProgramExperts;
