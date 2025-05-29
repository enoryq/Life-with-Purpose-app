
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Clock, Target, BookOpen, Lightbulb, ArrowLeft } from 'lucide-react';
import { LessonContent } from '@/data/lessonContent';

interface LessonDetailProps {
  lessonContent: LessonContent;
  status: 'not_started' | 'in_progress' | 'completed';
  onStart: () => void;
  onComplete: () => void;
  onBack: () => void;
}

const LessonDetail = ({ lessonContent, status, onStart, onComplete, onBack }: LessonDetailProps) => {
  const [responses, setResponses] = useState<{ [key: string]: string }>({});

  const handleResponseChange = (questionIndex: number, value: string) => {
    setResponses(prev => ({
      ...prev,
      [`question_${questionIndex}`]: value
    }));
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in_progress':
        return <Clock className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Curriculum
        </Button>
        <Badge className={`text-sm ${getStatusColor()}`}>
          <span className="flex items-center gap-1">
            {getStatusIcon()}
            {status === 'not_started' ? 'Not Started' : status === 'in_progress' ? 'In Progress' : 'Completed'}
          </span>
        </Badge>
      </div>

      {/* Lesson Header */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-lg font-semibold">
                {lessonContent.day}
              </div>
              <div>
                <CardTitle className="text-2xl">Week {lessonContent.week}: {lessonContent.title}</CardTitle>
                <CardDescription className="text-lg mt-1">{lessonContent.description}</CardDescription>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {lessonContent.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Learning Objectives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {lessonContent.objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Lesson Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            Lesson Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Introduction */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Introduction</h3>
            <p className="text-gray-700 leading-relaxed">{lessonContent.content.introduction}</p>
          </div>

          <Separator />

          {/* Main Content */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Main Content</h3>
            <div className="space-y-4">
              {lessonContent.content.mainContent.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Exercise */}
          {lessonContent.content.exercise && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  {lessonContent.content.exercise.title}
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Instructions:</h4>
                    <ul className="space-y-1 ml-4">
                      {lessonContent.content.exercise.instructions.map((instruction, index) => (
                        <li key={index} className="list-disc text-gray-700">{instruction}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Reflection Questions:</h4>
                    <div className="space-y-4">
                      {lessonContent.content.exercise.questions.map((question, index) => (
                        <div key={index} className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            {index + 1}. {question}
                          </label>
                          <Textarea
                            placeholder="Write your response here..."
                            value={responses[`question_${index}`] || ''}
                            onChange={(e) => handleResponseChange(index, e.target.value)}
                            className="min-h-[100px]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Reflection */}
          {lessonContent.content.reflection && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-500" />
                  {lessonContent.content.reflection.title}
                </h3>
                <div className="space-y-4">
                  {lessonContent.content.reflection.questions.map((question, index) => (
                    <div key={index} className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {index + 1}. {question}
                      </label>
                      <Textarea
                        placeholder="Write your reflection here..."
                        value={responses[`reflection_${index}`] || ''}
                        onChange={(e) => handleResponseChange(index, e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Key Takeaways */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Key Takeaways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {lessonContent.keyTakeaways.map((takeaway, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">{takeaway}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 justify-center">
            {status === 'not_started' && (
              <Button onClick={onStart} size="lg" className="px-8">
                <BookOpen className="mr-2 w-5 h-5" />
                Start Lesson
              </Button>
            )}
            
            {status === 'in_progress' && (
              <Button onClick={onComplete} size="lg" className="px-8">
                <CheckCircle className="mr-2 w-5 h-5" />
                Mark as Complete
              </Button>
            )}
            
            {status === 'completed' && (
              <Button variant="outline" size="lg" className="px-8" disabled>
                <CheckCircle className="mr-2 w-5 h-5" />
                Lesson Completed
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonDetail;
