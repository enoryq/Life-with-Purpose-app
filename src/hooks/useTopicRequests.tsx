
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/components/ui/use-toast';

export const useTopicRequests = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const submitTopicRequest = async (data: {
    email: string;
    fullName: string;
    topicTitle: string;
    topicDescription: string;
    interestLevel: string;
  }) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting topic request:', data);
      
      const requestData = {
        user_id: user?.id || null,
        email: data.email,
        full_name: data.fullName,
        topic_title: data.topicTitle,
        topic_description: data.topicDescription,
        interest_level: data.interestLevel,
      };

      const { error } = await supabase
        .from('program_topic_requests')
        .insert([requestData]);

      if (error) {
        console.error('Error submitting topic request:', error);
        throw error;
      }

      toast({
        title: "Request Submitted!",
        description: "Thank you for your topic suggestion. We'll review it and get back to you soon.",
      });

      return true;
    } catch (error) {
      console.error('Error submitting topic request:', error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitTopicRequest,
    isSubmitting,
  };
};
