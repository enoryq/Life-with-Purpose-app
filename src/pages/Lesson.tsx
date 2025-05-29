
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import LessonDetail from '@/components/LessonDetail';
import { getLessonContent } from '@/data/lessonContent';
import { useLessonProgress } from '@/hooks/useLessonProgress';
import { useCourseEnrollment } from '@/hooks/useCourseEnrollment';
import { COURSE_ID } from '@/data/programData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Lock } from 'lucide-react';

const Lesson = () => {
  const { week, day } = useParams<{ week: string; day: string }>();
  const navigate = useNavigate();
  const weekNumber = parseInt(week || '1');
  const dayNumber = parseInt(day || '1');
  
  const { isEnrolled } = useCourseEnrollment(COURSE_ID);
  const { progress, updateLessonStatus, getLessonStatus } = useLessonProgress(COURSE_ID);
  
  const lessonContent = getLessonContent(weekNumber, dayNumber);
  const lessonStatus = getLessonStatus(weekNumber, dayNumber);

  // Check if lesson is unlocked (previous lessons completed)
  const isLessonUnlocked = () => {
    if (!isEnrolled) return false;
    if (weekNumber === 1 && dayNumber === 1) return true; // First lesson is always unlocked
    
    // Check if previous lesson is completed
    if (dayNumber > 1) {
      // Check previous day in same week
      const prevDayStatus = getLessonStatus(weekNumber, dayNumber - 1);
      return prevDayStatus === 'completed';
    } else {
      // Check last day of previous week
      const prevWeekLastDayStatus = getLessonStatus(weekNumber - 1, 7);
      return prevWeekLastDayStatus === 'completed';
    }
  };

  const handleStartLesson = () => {
    updateLessonStatus(weekNumber, dayNumber, 'in_progress');
  };

  const handleCompleteLesson = () => {
    updateLessonStatus(weekNumber, dayNumber, 'completed');
  };

  const handleBack = () => {
    navigate('/programs/purpose-discovery');
  };

  if (!isEnrolled) {
    return (
      <Layout>
        <div className="pt-20 pb-16 px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  Enrollment Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  You need to be enrolled in the 30-Day Purpose Discovery program to access lessons.
                </p>
                <Button onClick={handleBack}>
                  Go to Program Page
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  if (!lessonContent) {
    return (
      <Layout>
        <div className="pt-20 pb-16 px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Lesson Not Found</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  The requested lesson (Week {weekNumber}, Day {dayNumber}) could not be found.
                </p>
                <Button onClick={handleBack}>
                  Back to Curriculum
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isLessonUnlocked()) {
    return (
      <Layout>
        <div className="pt-20 pb-16 px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-gray-500" />
                  Lesson Locked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  This lesson is locked. You must complete the previous lesson before accessing this content.
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Week {weekNumber}, Day {dayNumber}: {lessonContent.title}
                </p>
                <Button onClick={handleBack}>
                  Back to Curriculum
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-20 pb-16 px-4">
        <LessonDetail
          lessonContent={lessonContent}
          status={lessonStatus}
          onStart={handleStartLesson}
          onComplete={handleCompleteLesson}
          onBack={handleBack}
        />
      </div>
    </Layout>
  );
};

export default Lesson;
