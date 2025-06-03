
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface EngagementMetrics {
  id: string;
  metric_date: string;
  total_session_time: number;
  tools_used: string[];
  reflections_count: number;
  goals_created: number;
  goals_completed: number;
  streak_days: number;
  created_at: string;
  updated_at: string;
}

interface ToolUsageSession {
  id: string;
  tool_name: string;
  session_start: string;
  session_end: string;
  duration_minutes: number;
  activity_data: any;
  created_at: string;
}

export const useEngagementMetrics = () => {
  const [metrics, setMetrics] = useState<EngagementMetrics[]>([]);
  const [sessions, setSessions] = useState<ToolUsageSession[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchMetrics = async (days: number = 30) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const { data, error } = await supabase
        .from('user_engagement_metrics')
        .select('*')
        .eq('user_id', user.id)
        .gte('metric_date', startDate.toISOString().split('T')[0])
        .order('metric_date', { ascending: false });

      if (error) throw error;
      setMetrics(data || []);
    } catch (error) {
      console.error('Error fetching engagement metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async (days: number = 30) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const { data, error } = await supabase
        .from('tool_usage_sessions')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching tool sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTodaysMetrics = () => {
    const today = new Date().toISOString().split('T')[0];
    return metrics.find(m => m.metric_date === today);
  };

  const getTotalTimeThisWeek = () => {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekStartStr = weekStart.toISOString().split('T')[0];

    return metrics
      .filter(m => m.metric_date >= weekStartStr)
      .reduce((total, m) => total + m.total_session_time, 0);
  };

  const getMostUsedTools = (limit: number = 5) => {
    const toolCounts: { [key: string]: number } = {};
    
    sessions.forEach(session => {
      if (session.tool_name) {
        toolCounts[session.tool_name] = (toolCounts[session.tool_name] || 0) + (session.duration_minutes || 0);
      }
    });

    return Object.entries(toolCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([tool, minutes]) => ({ tool, minutes }));
  };

  const getStreakDays = () => {
    if (metrics.length === 0) return 0;
    
    const sortedMetrics = [...metrics].sort((a, b) => 
      new Date(b.metric_date).getTime() - new Date(a.metric_date).getTime()
    );
    
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < sortedMetrics.length; i++) {
      const metricDate = new Date(sortedMetrics[i].metric_date);
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      
      if (metricDate.toDateString() === expectedDate.toDateString() && 
          (sortedMetrics[i].total_session_time > 0 || sortedMetrics[i].reflections_count > 0)) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  useEffect(() => {
    if (user) {
      fetchMetrics();
      fetchSessions();
    }
  }, [user]);

  return {
    metrics,
    sessions,
    loading,
    fetchMetrics,
    fetchSessions,
    getTodaysMetrics,
    getTotalTimeThisWeek,
    getMostUsedTools,
    getStreakDays
  };
};
