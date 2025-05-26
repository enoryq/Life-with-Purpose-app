
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, Target, CheckCircle } from 'lucide-react';

const GoalSettingTemplate = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const [currentGoal, setCurrentGoal] = useState({
    title: '',
    description: '',
    deadline: '',
    category: '',
    steps: ['', '', '']
  });
  const [showForm, setShowForm] = useState(false);

  const categories = ['Career', 'Health', 'Relationships', 'Personal Growth', 'Financial', 'Creative'];

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...currentGoal.steps];
    newSteps[index] = value;
    setCurrentGoal({ ...currentGoal, steps: newSteps });
  };

  const saveGoal = () => {
    if (currentGoal.title && currentGoal.description) {
      setGoals([...goals, { ...currentGoal, id: Date.now(), completed: false }]);
      setCurrentGoal({
        title: '',
        description: '',
        deadline: '',
        category: '',
        steps: ['', '', '']
      });
      setShowForm(false);
    }
  };

  const toggleGoalComplete = (id: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  if (!showForm && goals.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <CardTitle className="text-2xl">Goal Setting Template</CardTitle>
          <CardDescription>
            Create SMART goals and track your progress with actionable steps
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600"
          >
            Create Your First Goal
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showForm) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Create a New Goal</CardTitle>
          <CardDescription>
            Use the SMART framework: Specific, Measurable, Achievable, Relevant, Time-bound
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              value={currentGoal.title}
              onChange={(e) => setCurrentGoal({ ...currentGoal, title: e.target.value })}
              placeholder="e.g., Run a 5K marathon"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description</Label>
            <Textarea
              id="description"
              value={currentGoal.description}
              onChange={(e) => setCurrentGoal({ ...currentGoal, description: e.target.value })}
              placeholder="Describe your goal in detail. Why is it important to you?"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deadline">Target Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={currentGoal.deadline}
                onChange={(e) => setCurrentGoal({ ...currentGoal, deadline: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={currentGoal.category}
                onChange={(e) => setCurrentGoal({ ...currentGoal, category: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Action Steps (break your goal into smaller steps)</Label>
            {currentGoal.steps.map((step, index) => (
              <Input
                key={index}
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                placeholder={`Step ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={saveGoal} className="bg-gradient-to-r from-purple-600 to-blue-600">
              Save Goal
            </Button>
            <Button onClick={() => setShowForm(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Goals</h2>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600"
        >
          Add New Goal
        </Button>
      </div>

      <div className="grid gap-6">
        {goals.map((goal) => (
          <Card key={goal.id} className={goal.completed ? 'opacity-75' : ''}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className={`text-xl ${goal.completed ? 'line-through' : ''}`}>
                      {goal.title}
                    </CardTitle>
                    {goal.category && (
                      <Badge variant="secondary">{goal.category}</Badge>
                    )}
                  </div>
                  <CardDescription>{goal.description}</CardDescription>
                </div>
                <Button
                  onClick={() => toggleGoalComplete(goal.id)}
                  variant={goal.completed ? "default" : "outline"}
                  size="sm"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {goal.completed ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {goal.deadline && (
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Target: {new Date(goal.deadline).toLocaleDateString()}
                </div>
              )}
              <div className="space-y-2">
                <h4 className="font-medium">Action Steps:</h4>
                {goal.steps.filter((step: string) => step.trim()).map((step: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    {step}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GoalSettingTemplate;
