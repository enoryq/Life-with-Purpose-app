
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface UserValue {
  id: string;
  value_name: string;
  rating: number;
  assessment_date: string;
}

export const useUserValues = () => {
  const [values, setValues] = useState<UserValue[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchValues = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_values')
        .select('*')
        .eq('user_id', user.id)
        .order('assessment_date', { ascending: false });

      if (error) throw error;
      setValues(data || []);
    } catch (error) {
      console.error('Error fetching values:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveValues = async (valuesData: Array<{name: string, rating: number}>) => {
    if (!user) return;

    try {
      // Delete existing values for today
      await supabase
        .from('user_values')
        .delete()
        .eq('user_id', user.id)
        .eq('assessment_date', new Date().toISOString().split('T')[0]);

      // Insert new values
      const { error } = await supabase
        .from('user_values')
        .insert(
          valuesData.map(value => ({
            user_id: user.id,
            value_name: value.name,
            rating: value.rating
          }))
        );

      if (error) throw error;

      // Track activity
      await supabase
        .from('user_activities')
        .insert({
          user_id: user.id,
          activity_type: 'values_assessment_completed',
          activity_data: { values_count: valuesData.length }
        });

      await fetchValues();
    } catch (error) {
      console.error('Error saving values:', error);
    }
  };

  useEffect(() => {
    fetchValues();
  }, [user]);

  return { values, loading, saveValues, fetchValues };
};
