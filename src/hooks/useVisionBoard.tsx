
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface VisionBoardItem {
  id: string;
  title: string;
  description?: string;
  category?: string;
  timeframe?: string;
  status: 'active' | 'achieved' | 'paused';
  achieved_at?: string;
  created_at: string;
}

export const useVisionBoard = () => {
  const [visionItems, setVisionItems] = useState<VisionBoardItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchVisionItems = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vision_board_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVisionItems(data || []);
    } catch (error) {
      console.error('Error fetching vision items:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveVisionItem = async (itemData: Omit<VisionBoardItem, 'id' | 'created_at'>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('vision_board_items')
        .insert({
          user_id: user.id,
          ...itemData
        });

      if (error) throw error;

      // Track activity
      await supabase
        .from('user_activities')
        .insert({
          user_id: user.id,
          activity_type: 'vision_item_created',
          activity_data: { item_title: itemData.title, category: itemData.category }
        });

      await fetchVisionItems();
    } catch (error) {
      console.error('Error saving vision item:', error);
    }
  };

  const updateVisionItemStatus = async (itemId: string, status: 'active' | 'achieved' | 'paused') => {
    if (!user) return;

    try {
      const updateData: any = { status };
      if (status === 'achieved') {
        updateData.achieved_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('vision_board_items')
        .update(updateData)
        .eq('id', itemId)
        .eq('user_id', user.id);

      if (error) throw error;

      if (status === 'achieved') {
        // Track activity
        await supabase
          .from('user_activities')
          .insert({
            user_id: user.id,
            activity_type: 'vision_item_achieved',
            activity_data: { item_id: itemId }
          });
      }

      await fetchVisionItems();
    } catch (error) {
      console.error('Error updating vision item:', error);
    }
  };

  useEffect(() => {
    fetchVisionItems();
  }, [user]);

  return { visionItems, loading, saveVisionItem, updateVisionItemStatus, fetchVisionItems };
};
