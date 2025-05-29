
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, Target, CheckCircle, Edit, Trash2, Plus, Clock, Star } from 'lucide-react';
import { useUserGoals } from '@/hooks/useUserGoals';

interface GoalFormData {
  title: string;
  description: string;
  deadline: string;
  category: string;
  steps: string[];
}

interface FormErrors {
  title?: string;
  description?: string;
  steps?: string;
}

const GoalSettingTemplate = () => {
  const { goals, saveGoal, updateGoalStatus } = useUserGoals();
  const [currentGoal, setCurrentGoal] = useState<GoalFormData>({
    title: '',
    description: '',
    deadline: '',
    category: '',
    steps: ['', '', '']
  });
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const categories = [
    { name: 'Career', color: 'bg-blue-100 text-blue-800', icon: '💼' },
    { name: 'Health', color: 'bg-green-100 text-green-800', icon: '🏃' },
    { name: 'Relationships', color: 'bg-pink-100 text-pink-800', icon: '❤️' },
    { name: 'Personal Growth', color: 'bg-purple-100 text-purple-800', icon: '🌱' },
    { name: 'Financial', color: 'bg-yellow-100 text-yellow-800', icon: '💰' },
    { name: 'Creative', color: 'bg-orange-100 text-orange-800', icon: '🎨' }
  ];

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!currentGoal.title?.trim()) newErrors.title = 'Goal title is required';
    if (!currentGoal.description?.trim()) newErrors.description = 'Description is required';
    if (currentGoal.steps?.filter(step => step.trim()).length === 0) {
      newErrors.steps = 'At least one action step is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...currentGoal.steps];
    newSteps[index] = value;
    setCurrentGoal({ ...currentGoal, steps: newSteps });
  };

  const addStep = () => {
    setCurrentGoal({ 
      ...currentGoal, 
      steps: [...currentGoal.steps, ''] 
    });
  };

  const removeStep = (index: number) => {
    const newSteps = currentGoal.steps.filter((_, i) => i !== index);
    setCurrentGoal({ ...currentGoal, steps: newSteps });
  };

  const handleSaveGoal = async () => {
    if (!validateForm()) return;

    await saveGoal({
      title: currentGoal.title,
      description: currentGoal.description,
      deadline: currentGoal.deadline || undefined,
      category: currentGoal.category || undefined,
      steps: currentGoal.steps.filter(step => step.trim()),
      status: 'active'
    });
    
    resetForm();
  };

  const resetForm = () => {
    setCurrentGoal({
      title: '',
      description: '',
      deadline: '',
      category: '',
      steps: ['', '', '']
    });
    setShowForm(false);
    setEditingGoal(null);
    setErrors({});
  };

  const toggleGoalComplete = async (goalId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'active' : 'completed';
    await updateGoalStatus(goalId, newStatus);
  };

  const getCategoryInfo = (categoryName: string) => {
    return categories.find(cat => cat.name === categoryName) || 
           { name: categoryName, color: 'bg-gray-100 text-gray-800', icon: '📋' };
  };

  const getGoalProgress = (goal: any) => {
    if (!goal.steps || goal.steps.length === 0) return 0;
    // This is a simplified progress calculation - in a real app you'd track individual step completion
    return goal.status === 'completed' ? 100 : 30; // Default to 30% for active goals
  };

  if (!showForm && goals.length === 0) {
    return (
      <Card className="w-full max-w-3xl mx-auto border-2 border-dashed border-gray-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Goal Setting Template
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 mt-4 max-w-md mx-auto">
            Transform your dreams into reality with SMART goals and actionable steps. 
            Create structured goals that you'll actually achieve.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-12">
          <Button 
            onClick={() => setShowForm(true)}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Goal
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showForm) {
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-xl border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Create a New Goal</CardTitle>
          <CardDescription className="text-purple-100">
            Use the SMART framework: Specific, Measurable, Achievable, Relevant, Time-bound
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
              Goal Title *
            </Label>
            <Input
              id="title"
              value={currentGoal.title}
              onChange={(e) => setCurrentGoal({ ...currentGoal, title: e.target.value })}
              placeholder="e.g., Run a 5K marathon in under 30 minutes"
              className={`h-12 ${errors.title ? 'border-red-500' : 'border-gray-200'} focus:border-purple-500`}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
              Detailed Description *
            </Label>
            <Textarea
              id="description"
              value={currentGoal.description}
              onChange={(e) => setCurrentGoal({ ...currentGoal, description: e.target.value })}
              placeholder="Describe your goal in detail. Why is it important to you? What will achieving it mean?"
              rows={4}
              className={`${errors.description ? 'border-red-500' : 'border-gray-200'} focus:border-purple-500`}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-sm font-semibold text-gray-700">
                Target Deadline
              </Label>
              <Input
                id="deadline"
                type="date"
                value={currentGoal.deadline}
                onChange={(e) => setCurrentGoal({ ...currentGoal, deadline: e.target.value })}
                className="h-12 border-gray-200 focus:border-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
                Category
              </Label>
              <select
                id="category"
                value={currentGoal.category}
                onChange={(e) => setCurrentGoal({ ...currentGoal, category: e.target.value })}
                className="w-full h-12 p-3 border border-gray-200 rounded-md focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.name} value={cat.name}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold text-gray-700">
                Action Steps * (break your goal into smaller, manageable steps)
              </Label>
              <Button
                type="button"
                onClick={addStep}
                variant="outline"
                size="sm"
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Step
              </Button>
            </div>
            {errors.steps && <p className="text-red-500 text-sm">{errors.steps}</p>}
            
            <div className="space-y-3">
              {currentGoal.steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <Input
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    placeholder={`Step ${index + 1}: What specific action will you take?`}
                    className="flex-1 border-gray-200 focus:border-purple-500"
                  />
                  {currentGoal.steps.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeStep(index)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-red-500 flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-gray-100">
            <Button 
              onClick={handleSaveGoal} 
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 font-semibold"
            >
              <Target className="w-4 h-4 mr-2" />
              Create Goal
            </Button>
            <Button 
              onClick={resetForm} 
              variant="outline" 
              className="px-6 border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const activeGoals = goals.filter(g => g.status === 'active');
  const completedGoals = goals.filter(g => g.status === 'completed');

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Your Goals</h2>
          <p className="text-gray-600 mt-1">
            {activeGoals.length} active • {completedGoals.length} completed
          </p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Goal
        </Button>
      </div>

      {activeGoals.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Active Goals
          </h3>
          <div className="grid gap-6">
            {activeGoals.map((goal) => {
              const categoryInfo = getCategoryInfo(goal.category);
              const progress = getGoalProgress(goal);
              
              return (
                <Card key={goal.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 bg-white">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-xl text-gray-800">{goal.title}</CardTitle>
                          {goal.category && (
                            <Badge className={`${categoryInfo.color} border-0 font-medium`}>
                              {categoryInfo.icon} {goal.category}
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-gray-600 leading-relaxed">
                          {goal.description}
                        </CardDescription>
                        
                        {goal.deadline && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            Target: {new Date(goal.deadline).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                        )}

                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-600">{progress}%</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          onClick={() => toggleGoalComplete(goal.id, goal.status)}
                          variant="outline"
                          size="sm"
                          className="border-green-200 text-green-600 hover:bg-green-50"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {goal.steps && goal.steps.length > 0 && (
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Action Steps</h4>
                        <div className="grid gap-2">
                          {goal.steps.map((step, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium text-xs flex-shrink-0 mt-0.5">
                                {index + 1}
                              </div>
                              <span className="text-gray-700 leading-relaxed">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {completedGoals.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Completed Goals
          </h3>
          <div className="grid gap-4">
            {completedGoals.map((goal) => {
              const categoryInfo = getCategoryInfo(goal.category);
              
              return (
                <Card key={goal.id} className="border-0 shadow-md bg-green-50/50 opacity-90">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-lg text-gray-700 line-through decoration-green-500">
                            {goal.title}
                          </CardTitle>
                          {goal.category && (
                            <Badge className={`${categoryInfo.color} border-0 font-medium opacity-75`}>
                              {categoryInfo.icon} {goal.category}
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-gray-600">
                          {goal.description}
                        </CardDescription>
                        {goal.completed_at && (
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            Completed on {new Date(goal.completed_at).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      <Button
                        onClick={() => toggleGoalComplete(goal.id, goal.status)}
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-600 hover:bg-gray-100"
                      >
                        Reactivate
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalSettingTemplate;
