
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CourseEnrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  status: 'active' | 'completed' | 'paused';
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export const useCourseEnrollment = (courseId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [enrollment, setEnrollment] = useState<CourseEnrollment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEnrollment = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('course_enrollments')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching enrollment:', error);
        return;
      }

      setEnrollment(data as CourseEnrollment);
    } catch (error) {
      console.error('Error fetching enrollment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const enrollInCourse = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to enroll in this course.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('course_enrollments')
        .insert({
          user_id: user.id,
          course_id: courseId,
          status: 'active',
        })
        .select()
        .single();

      if (error) {
        console.error('Error enrolling in course:', error);
        toast({
          title: "Enrollment Failed",
          description: "There was an error enrolling in the course.",
          variant: "destructive",
        });
        return;
      }

      setEnrollment(data as CourseEnrollment);
      toast({
        title: "Successfully Enrolled!",
        description: "You've been enrolled in the 30-Day Purpose Discovery program.",
      });
    } catch (error) {
      console.error('Error enrolling in course:', error);
      toast({
        title: "Enrollment Failed",
        description: "There was an error enrolling in the course.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchEnrollment();
  }, [user, courseId]);

  return {
    enrollment,
    isLoading,
    isEnrolled: !!enrollment,
    enrollInCourse,
  };
};
