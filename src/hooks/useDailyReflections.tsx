
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface DailyReflection {
  id: string;
  reflection_date: string;
  mood?: string;
  gratitude?: string;
  accomplishment?: string;
  challenge?: string;
  tomorrow?: string;
  created_at: string;
}

export const useDailyReflections = () => {
  const [reflections, setReflections] = useState<DailyReflection[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchReflections = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('daily_reflections')
        .select('*')
        .eq('user_id', user.id)
        .order('reflection_date', { ascending: false });

      if (error) throw error;
      setReflections(data || []);
    } catch (error) {
      console.error('Error fetching reflections:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveReflection = async (reflectionData: Omit<DailyReflection, 'id' | 'created_at' | 'reflection_date'>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('daily_reflections')
        .upsert({
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
          activity_data: { mood: reflectionData.mood }
        });

      await fetchReflections();
    } catch (error) {
      console.error('Error saving reflection:', error);
    }
  };

  useEffect(() => {
    fetchReflections();
  }, [user]);

  return { reflections, loading, saveReflection, fetchReflections };
};
