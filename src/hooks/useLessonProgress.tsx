
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface LessonProgress {
  id: string;
  user_id: string;
  course_id: string;
  week_number: number;
  day_number: number;
  status: 'not_started' | 'in_progress' | 'completed';
  started_at?: string;
  completed_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const useLessonProgress = (courseId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProgress = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .order('week_number', { ascending: true })
        .order('day_number', { ascending: true });

      if (error) {
        console.error('Error fetching progress:', error);
        return;
      }

      setProgress(data || []);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLessonStatus = async (
    weekNumber: number,
    dayNumber: number,
    status: 'not_started' | 'in_progress' | 'completed',
    notes?: string
  ) => {
    if (!user) return;

    try {
      const updateData: any = {
        user_id: user.id,
        course_id: courseId,
        week_number: weekNumber,
        day_number: dayNumber,
        status,
      };

      if (status === 'in_progress' && !progress.find(p => p.week_number === weekNumber && p.day_number === dayNumber)?.started_at) {
        updateData.started_at = new Date().toISOString();
      }

      if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }

      if (notes !== undefined) {
        updateData.notes = notes;
      }

      const { data, error } = await supabase
        .from('lesson_progress')
        .upsert(updateData, {
          onConflict: 'user_id,course_id,week_number,day_number'
        })
        .select()
        .single();

      if (error) {
        console.error('Error updating lesson status:', error);
        toast({
          title: "Update Failed",
          description: "There was an error updating your progress.",
          variant: "destructive",
        });
        return;
      }

      setProgress(prev => {
        const updated = prev.filter(p => !(p.week_number === weekNumber && p.day_number === dayNumber));
        return [...updated, data].sort((a, b) => {
          if (a.week_number !== b.week_number) return a.week_number - b.week_number;
          return a.day_number - b.day_number;
        });
      });

      if (status === 'completed') {
        toast({
          title: "Lesson Completed!",
          description: `Day ${dayNumber} of Week ${weekNumber} marked as complete.`,
        });
      }
    } catch (error) {
      console.error('Error updating lesson status:', error);
    }
  };

  const getLessonStatus = (weekNumber: number, dayNumber: number): 'not_started' | 'in_progress' | 'completed' => {
    const lesson = progress.find(p => p.week_number === weekNumber && p.day_number === dayNumber);
    return lesson?.status || 'not_started';
  };

  useEffect(() => {
    fetchProgress();
  }, [user, courseId]);

  return {
    progress,
    isLoading,
    updateLessonStatus,
    getLessonStatus,
  };
};
