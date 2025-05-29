
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
  
  // Function to check if a lesson is unlocked
  const isLessonUnlocked = (week: number, day: number): boolean => {
    if (!isEnrolled) return false;
    if (week === 1 && day === 1) return true; // First lesson is always unlocked
    
    // Check if previous lesson is completed
    if (day > 1) {
      // Check previous day in same week
      const prevDayStatus = getLessonStatus(week, day - 1);
      return prevDayStatus === 'completed';
    } else {
      // Check last day of previous week (assuming 7 days per week)
      const prevWeekLastDayStatus = getLessonStatus(week - 1, 7);
      return prevWeekLastDayStatus === 'completed';
    }
  };

  // Function to check if a week should be expanded by default
  const shouldExpandWeek = (week: number): boolean => {
    if (!isEnrolled) return false;
    
    // Expand if any lesson in the week is in progress or if it's the current week
    const weekLessons = weeklyModules.find(m => m.week === week)?.days || [];
    return weekLessons.some(day => {
      const status = getLessonStatus(week, day.day);
      const isUnlocked = isLessonUnlocked(week, day.day);
      return (status === 'in_progress') || (isUnlocked && status === 'not_started');
    });
  };

  return (
    <div className="space-y-6">
      {weeklyModules.map((module) => {
        const shouldExpand = shouldExpandWeek(module.week);
        
        return (
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
              <Accordion 
                type="single" 
                collapsible 
                defaultValue={shouldExpand ? `week-${module.week}` : undefined}
              >
                <AccordionItem value={`week-${module.week}`} className="border-none">
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                    View Daily Lessons
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid gap-4">
                      {module.days.map((day) => {
                        const isLocked = !isLessonUnlocked(module.week, day.day);
                        
                        return (
                          <LessonCard
                            key={day.day}
                            week={module.week}
                            day={day.day}
                            title={day.title}
                            description={day.description}
                            status={isEnrolled ? getLessonStatus(module.week, day.day) : 'not_started'}
                            isLocked={isLocked}
                            onStart={() => onStartLesson(module.week, day.day)}
                            onComplete={() => onCompleteLesson(module.week, day.day)}
                          />
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProgramCurriculum;
