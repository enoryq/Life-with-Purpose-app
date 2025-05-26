
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import LessonCard from '@/components/LessonCard';

interface WeeklyModule {
  week: number;
  title: string;
  description: string;
  days: Array<{
    day: number;
    title: string;
    description: string;
  }>;
}

interface ProgramCurriculumProps {
  weeklyModules: WeeklyModule[];
  isEnrolled: boolean;
  getLessonStatus: (week: number, day: number) => 'not_started' | 'in_progress' | 'completed';
  onStartLesson: (week: number, day: number) => void;
  onCompleteLesson: (week: number, day: number) => void;
}

const ProgramCurriculum = ({
  weeklyModules,
  isEnrolled,
  getLessonStatus,
  onStartLesson,
  onCompleteLesson
}: ProgramCurriculumProps) => {
  return (
    <div className="space-y-6">
      {weeklyModules.map((module) => (
        <Card key={module.week} className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Week {module.week}: {module.title}</CardTitle>
                <CardDescription className="mt-2">{module.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Accordion type="single" collapsible>
              <AccordionItem value={`week-${module.week}`} className="border-none">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                  View Daily Lessons
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid gap-4">
                    {module.days.map((day) => (
                      <LessonCard
                        key={day.day}
                        day={day.day}
                        title={day.title}
                        description={day.description}
                        status={isEnrolled ? getLessonStatus(module.week, day.day) : 'not_started'}
                        onStart={() => onStartLesson(module.week, day.day)}
                        onComplete={() => onCompleteLesson(module.week, day.day)}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProgramCurriculum;
