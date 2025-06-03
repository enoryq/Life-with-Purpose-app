
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Palette, Image, Target, Plus, X } from 'lucide-react';
import { useVisionBoard } from '@/hooks/useVisionBoard';
import { useToolSession } from '@/hooks/useToolSession';

const VisionBoardCreator = () => {
  const { visionItems, saveVisionItem, updateVisionItemStatus } = useVisionBoard();
  const { startSession, endSession, isTracking } = useToolSession('Vision Board');
  const [currentItem, setCurrentItem] = useState({
    title: '',
    description: '',
    category: '',
    timeframe: ''
  });
  const [showForm, setShowForm] = useState(false);

  // Start session when component mounts
  useEffect(() => {
    startSession({ action: 'view_vision_board', total_items: visionItems.length });
    
    return () => {
      if (isTracking) {
        endSession({ 
          action: 'exit_vision_board', 
          total_items: visionItems.length,
          items_added: 0 // This could be tracked with state
        });
      }
    };
  }, []);

  const categories = [
    { name: 'Career', color: 'bg-blue-500', emoji: '💼' },
    { name: 'Health', color: 'bg-green-500', emoji: '🌱' },
    { name: 'Relationships', color: 'bg-pink-500', emoji: '❤️' },
    { name: 'Travel', color: 'bg-purple-500', emoji: '✈️' },
    { name: 'Personal Growth', color: 'bg-orange-500', emoji: '🌟' },
    { name: 'Financial', color: 'bg-yellow-500', emoji: '💰' },
    { name: 'Creative', color: 'bg-indigo-500', emoji: '🎨' },
    { name: 'Lifestyle', color: 'bg-teal-500', emoji: '🏡' }
  ];

  const timeframes = ['1 year', '3 years', '5 years', '10+ years'];

  const addVisionItem = async () => {
    if (currentItem.title && currentItem.description) {
      await saveVisionItem({
        title: currentItem.title,
        description: currentItem.description,
        category: currentItem.category || undefined,
        timeframe: currentItem.timeframe || undefined,
        status: 'active'
      });
      
      setCurrentItem({ title: '', description: '', category: '', timeframe: '' });
      setShowForm(false);
      
      // Track vision item creation
      if (isTracking) {
        endSession({ 
          action: 'vision_item_created',
          item_data: { 
            category: currentItem.category, 
            timeframe: currentItem.timeframe 
          }
        });
        startSession({ action: 'post_creation_view' });
      }
    }
  };

  const removeVisionItem = async (id: string) => {
    await updateVisionItemStatus(id, 'achieved'); // Mark as achieved instead of deleting
  };

  const getCategoryInfo = (categoryName: string) => {
    return categories.find(cat => cat.name === categoryName) || { color: 'bg-gray-500', emoji: '📌' };
  };

  const handleShowForm = () => {
    setShowForm(true);
    if (isTracking) {
      endSession({ action: 'start_creating_vision' });
      startSession({ action: 'create_vision_item' });
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    if (isTracking) {
      endSession({ action: 'cancelled_vision_creation' });
      startSession({ action: 'return_to_board' });
    }
  };

  if (!showForm && visionItems.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <Palette className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <CardTitle className="text-2xl">Vision Board Creator</CardTitle>
          <CardDescription>
            Visualize your dreams and aspirations by creating a digital vision board
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            A vision board helps you clarify, concentrate, and maintain focus on your life goals.
          </p>
          <Button 
            onClick={handleShowForm}
            className="bg-gradient-to-r from-purple-600 to-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Vision
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showForm) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Add to Your Vision Board</CardTitle>
          <CardDescription>
            Describe something you want to achieve or experience in your life
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Vision Title</label>
            <Input
              value={currentItem.title}
              onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
              placeholder="e.g., Own my dream home, Travel to Japan, Start my own business"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={currentItem.description}
              onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
              placeholder="Describe your vision in detail. What does it look like? How will it feel?"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                value={currentItem.category}
                onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.name} value={cat.name}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Timeframe</label>
              <select
                value={currentItem.timeframe}
                onChange={(e) => setCurrentItem({ ...currentItem, timeframe: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="">When do you want this?</option>
                {timeframes.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={addVisionItem} className="bg-gradient-to-r from-purple-600 to-blue-600">
              Add to Vision Board
            </Button>
            <Button onClick={handleCancelForm} variant="outline">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const activeItems = visionItems.filter(item => item.status === 'active');

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent">
            Your Vision Board
          </h2>
          <p className="text-gray-600 mt-2">Visualize your dreams and make them reality</p>
        </div>
        <Button 
          onClick={handleShowForm}
          className="bg-gradient-to-r from-purple-600 to-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Vision
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeItems.map((item) => {
          const categoryInfo = getCategoryInfo(item.category);
          return (
            <Card 
              key={item.id} 
              className="relative group hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className={`h-2 ${categoryInfo.color} rounded-t-lg`}></div>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{categoryInfo.emoji}</span>
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      {item.category && (
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => removeVisionItem(item.id)}
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm mb-3">{item.description}</p>
                {item.timeframe && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Target className="w-3 h-3" />
                    {item.timeframe}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {activeItems.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">✨ Daily Affirmation</h3>
            <p className="text-gray-700">
              "I am actively working towards my dreams and creating the life I envision. 
              Every step I take brings me closer to my goals."
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VisionBoardCreator;
