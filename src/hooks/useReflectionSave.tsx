
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface ReflectionData {
  mood?: string;
  gratitude?: string;
  accomplishment?: string;
  challenge?: string;
  tomorrow?: string;
  title?: string;
}

export const useReflectionSave = () => {
  const { user } = useAuth();

  const saveReflection = async (reflectionData: ReflectionData) => {
    if (!user) return;

    try {
      // Don't use upsert anymore since we want to allow multiple reflections per day
      const { error } = await supabase
        .from('daily_reflections')
        .insert({
          user_id: user.id,
          reflection_date: new Date().toISOString().split('T')[0],
          ...reflectionData
        });

      if (error) throw error;

      // Track activity
      await supabase
        .from('user_activities')
        .insert({
          user_id: user.id,
          activity_type: 'daily_reflection_completed',
          activity_data: { mood: reflectionData.mood, title: reflectionData.title }
        });

      return { success: true };
    } catch (error) {
      console.error('Error saving reflection:', error);
      return { success: false, error };
    }
  };

  return { saveReflection };
};
