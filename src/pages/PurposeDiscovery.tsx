
import React from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCourseEnrollment } from '@/hooks/useCourseEnrollment';
import { useLessonProgress } from '@/hooks/useLessonProgress';
import ProgressSummary from '@/components/ProgressSummary';
import ProgramHeader from '@/components/ProgramHeader';
import ProgramOverview from '@/components/ProgramOverview';
import ProgramCurriculum from '@/components/ProgramCurriculum';
import ProgramPractices from '@/components/ProgramPractices';
import ProgramExperts from '@/components/ProgramExperts';
import CommunitySection from '@/components/CommunitySection';
import { 
  COURSE_ID, 
  programOverview, 
  weeklyModules, 
  dailyPractices, 
  programBenefits, 
  expertInsights 
} from '@/data/programData';

const PurposeDiscovery = () => {
  const { enrollment, isLoading: enrollmentLoading, isEnrolled, enrollInCourse } = useCourseEnrollment(COURSE_ID);
  const { progress, isLoading: progressLoading, updateLessonStatus, getLessonStatus } = useLessonProgress(COURSE_ID);

  // Calculate progress statistics
  const totalLessons = 30;
  const completedLessons = progress.filter(p => p.status === 'completed').length;
  const inProgressLessons = progress.filter(p => p.status === 'in_progress').length;
  
  // Find current lesson (first incomplete lesson)
  const currentLesson = progress.find(p => p.status === 'in_progress') || 
    weeklyModules.flatMap(week => 
      week.days.map(day => ({ week_number: week.week, day_number: day.day }))
    ).find(lesson => getLessonStatus(lesson.week_number, lesson.day_number) === 'not_started');
  
  const currentWeek = currentLesson?.week_number || 1;
  const currentDay = currentLesson?.day_number || 1;

  const handleStartLesson = (weekNumber: number, dayNumber: number) => {
    updateLessonStatus(weekNumber, dayNumber, 'in_progress');
  };

  const handleCompleteLesson = (weekNumber: number, dayNumber: number) => {
    updateLessonStatus(weekNumber, dayNumber, 'completed');
  };

  return (
    <Layout>
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <ProgramHeader
            programOverview={programOverview}
            isEnrolled={isEnrolled}
            enrollmentLoading={enrollmentLoading}
            onEnroll={enrollInCourse}
          />

          {isEnrolled && !progressLoading && (
            <div className="mb-8">
              <ProgressSummary
                totalLessons={totalLessons}
                completedLessons={completedLessons}
                inProgressLessons={inProgressLessons}
                currentWeek={currentWeek}
                currentDay={currentDay}
              />
            </div>
          )}

          <Tabs defaultValue={isEnrolled ? "curriculum" : "overview"} className="mb-16">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4 bg-gray-100">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="practices">Daily Practices</TabsTrigger>
              <TabsTrigger value="experts">Expert Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <ProgramOverview programBenefits={programBenefits} />
            </TabsContent>

            <TabsContent value="curriculum" className="mt-8">
              <ProgramCurriculum
                weeklyModules={weeklyModules}
                isEnrolled={isEnrolled}
                getLessonStatus={getLessonStatus}
                onStartLesson={handleStartLesson}
                onCompleteLesson={handleCompleteLesson}
              />
            </TabsContent>

            <TabsContent value="practices" className="mt-8">
              <ProgramPractices dailyPractices={dailyPractices} />
            </TabsContent>

            <TabsContent value="experts" className="mt-8">
              <ProgramExperts expertInsights={expertInsights} />
            </TabsContent>
          </Tabs>

          <CommunitySection />
        </div>
      </div>
    </Layout>
  );
};

export default PurposeDiscovery;
