
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface UserGoal {
  id: string;
  title: string;
  description?: string;
  category?: string;
  deadline?: string;
  steps: string[];
  status: 'active' | 'completed' | 'paused';
  completed_at?: string;
  created_at: string;
}

export const useUserGoals = () => {
  const [goals, setGoals] = useState<UserGoal[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchGoals = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGoals(data || []);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveGoal = async (goalData: Omit<UserGoal, 'id' | 'created_at'>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_goals')
        .insert({
          user_id: user.id,
          ...goalData
        });

      if (error) throw error;

      // Track activity
      await supabase
        .from('user_activities')
        .insert({
          user_id: user.id,
          activity_type: 'goal_created',
          activity_data: { goal_title: goalData.title, category: goalData.category }
        });

      await fetchGoals();
    } catch (error) {
      console.error('Error saving goal:', error);
    }
  };

  const updateGoalStatus = async (goalId: string, status: 'active' | 'completed' | 'paused') => {
    if (!user) return;

    try {
      const updateData: any = { status };
      if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('user_goals')
        .update(updateData)
        .eq('id', goalId)
        .eq('user_id', user.id);

      if (error) throw error;

      if (status === 'completed') {
        // Track activity
        await supabase
          .from('user_activities')
          .insert({
            user_id: user.id,
            activity_type: 'goal_completed',
            activity_data: { goal_id: goalId }
          });
      }

      await fetchGoals();
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [user]);

  return { goals, loading, saveGoal, updateGoalStatus, fetchGoals };
};
