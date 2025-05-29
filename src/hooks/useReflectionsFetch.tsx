
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
  title?: string;
  created_at: string;
}

export const useReflectionsFetch = () => {
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
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReflections(data || []);
    } catch (error) {
      console.error('Error fetching reflections:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReflections();
  }, [user]);

  return { reflections, loading, fetchReflections, setReflections };
};
