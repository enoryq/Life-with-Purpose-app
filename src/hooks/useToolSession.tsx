
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface ToolSession {
  id?: string;
  tool_name: string;
  session_start: string;
  session_end?: string;
  duration_minutes?: number;
  activity_data?: any;
}

export const useToolSession = (toolName: string) => {
  const { user } = useAuth();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const sessionStartTime = useRef<Date | null>(null);

  const startSession = async (activityData?: any) => {
    if (!user || isTracking) return;

    try {
      sessionStartTime.current = new Date();
      const { data, error } = await supabase
        .from('tool_usage_sessions')
        .insert({
          user_id: user.id,
          tool_name: toolName,
          session_start: sessionStartTime.current.toISOString(),
          activity_data: activityData
        })
        .select()
        .single();

      if (error) throw error;
      
      setSessionId(data.id);
      setIsTracking(true);
      console.log(`Started tracking session for ${toolName}`);
    } catch (error) {
      console.error('Error starting tool session:', error);
    }
  };

  const endSession = async (additionalData?: any) => {
    if (!user || !sessionId || !sessionStartTime.current) return;

    try {
      const endTime = new Date();
      const durationMinutes = Math.round((endTime.getTime() - sessionStartTime.current.getTime()) / (1000 * 60));

      const { error } = await supabase
        .from('tool_usage_sessions')
        .update({
          session_end: endTime.toISOString(),
          duration_minutes: durationMinutes,
          activity_data: additionalData
        })
        .eq('id', sessionId);

      if (error) throw error;

      // Track the session completion activity
      await supabase
        .from('user_activities')
        .insert({
          user_id: user.id,
          activity_type: 'tool_session_completed',
          activity_data: {
            tool_name: toolName,
            duration_minutes: durationMinutes,
            session_id: sessionId
          }
        });

      console.log(`Ended tracking session for ${toolName}, duration: ${durationMinutes} minutes`);
      
      setSessionId(null);
      setIsTracking(false);
      sessionStartTime.current = null;
    } catch (error) {
      console.error('Error ending tool session:', error);
    }
  };

  // Auto-end session on component unmount
  useEffect(() => {
    return () => {
      if (isTracking) {
        endSession();
      }
    };
  }, [isTracking]);

  return {
    startSession,
    endSession,
    isTracking,
    sessionId
  };
};
