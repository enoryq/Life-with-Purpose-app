
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';
import { useUserValues } from '@/hooks/useUserValues';
import { useToolSession } from '@/hooks/useToolSession';

const ValuesAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { values, saveValues } = useUserValues();
  const { startSession, endSession, isTracking } = useToolSession('Values Assessment');

  // Start session when component mounts
  useEffect(() => {
    startSession({ action: 'start_assessment', existing_values: values.length });
    
    return () => {
      if (isTracking) {
        endSession({ 
          action: 'exit_assessment', 
          questions_answered: responses.length,
          completed: showResults 
        });
      }
    };
  }, []);

  const valuesOptions = [
    { name: 'Family', description: 'Close relationships with loved ones' },
    { name: 'Achievement', description: 'Accomplishing goals and success' },
    { name: 'Adventure', description: 'Excitement and new experiences' },
    { name: 'Creativity', description: 'Self-expression and innovation' },
    { name: 'Security', description: 'Stability and safety' },
    { name: 'Service', description: 'Helping others and making a difference' },
    { name: 'Knowledge', description: 'Learning and understanding' },
    { name: 'Freedom', description: 'Independence and autonomy' }
  ];

  const questions = valuesOptions.map(value => ({
    text: `How important is ${value.name.toLowerCase()} to you?`,
    description: value.description,
    value: value.name
  }));

  const handleResponse = async (rating: number) => {
    const newResponses = [...responses, rating];
    setResponses(newResponses);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Save to database
      const valuesData = valuesOptions.map((value, index) => ({
        name: value.name,
        rating: newResponses[index]
      }));
      
      await saveValues(valuesData);
      setShowResults(true);
      
      // Track completion
      if (isTracking) {
        endSession({ 
          action: 'assessment_completed',
          total_questions: questions.length,
          top_values: valuesData.sort((a, b) => b.rating - a.rating).slice(0, 3)
        });
        startSession({ action: 'view_results' });
      }
    }
  };

  const getTopValues = () => {
    return valuesOptions
      .map((value, index) => ({ ...value, rating: responses[index] || 0 }))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setResponses([]);
    setShowResults(false);
    
    if (isTracking) {
      endSession({ action: 'restart_assessment' });
      startSession({ action: 'retake_assessment' });
    }
  };

  // Check if user has recent assessment
  const hasRecentAssessment = values.length > 0 && 
    new Date(values[0].assessment_date).toDateString() === new Date().toDateString();

  if (hasRecentAssessment && !showResults && responses.length === 0) {
    const todaysValues = values.filter(v => 
      new Date(v.assessment_date).toDateString() === new Date().toDateString()
    );
    
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Today's Values Assessment</CardTitle>
          <CardDescription className="text-center">
            You've already completed your values assessment today. Here are your results:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {todaysValues
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3)
            .map((value, index) => (
            <div key={value.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  #{index + 1}
                </Badge>
                <div>
                  <h3 className="font-semibold text-lg">{value.value_name}</h3>
                </div>
              </div>
              <div className="flex">
                {[...Array(value.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
          <div className="text-center">
            <Button onClick={resetAssessment} variant="outline">
              Retake Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const topValues = getTopValues();
    
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Your Core Values</CardTitle>
          <CardDescription className="text-center">
            Based on your responses, here are your top 3 core values
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {topValues.map((value, index) => (
            <div key={value.name} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  #{index + 1}
                </Badge>
                <div>
                  <h3 className="font-semibold text-lg">{value.name}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              </div>
              <div className="flex">
                {[...Array(value.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Use these values to guide your decisions and align your life with what matters most to you.
            </p>
            <Button onClick={resetAssessment} variant="outline">
              Take Assessment Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Values Assessment Tool</CardTitle>
        <CardDescription className="text-center">
          Discover your core values by rating their importance to you
        </CardDescription>
        <Progress 
          value={(currentQuestion / questions.length) * 100} 
          className="w-full mt-4"
        />
        <p className="text-sm text-gray-600 text-center">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold">{questions[currentQuestion].text}</h3>
          <p className="text-gray-600">{questions[currentQuestion].description}</p>
        </div>
        
        <div className="space-y-3">
          <p className="text-center font-medium">Rate from 1 (not important) to 5 (extremely important)</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                onClick={() => handleResponse(rating)}
                variant="outline"
                className="w-12 h-12 rounded-full hover:bg-purple-100"
              >
                {rating}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValuesAssessment;
