
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Crown } from 'lucide-react';

interface BreathingTechnique {
  id: string;
  name: string;
  description: string;
  pattern: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  cycles: number;
  color: string;
  benefits: string[];
}

const BreathingVisualizer = () => {
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [circleScale, setCircleScale] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const techniques: BreathingTechnique[] = [
    {
      id: 'box',
      name: 'Box Breathing',
      description: 'Equal parts inhale, hold, exhale, and hold. Great for stress reduction and improving concentration.',
      pattern: '4s - 4s - 4s - 4s',
      inhale: 4,
      hold1: 4,
      exhale: 4,
      hold2: 4,
      cycles: 5,
      color: 'from-blue-400 to-blue-600',
      benefits: ['Stress reduction', 'Better focus', 'Anxiety relief']
    },
    {
      id: '478',
      name: '4-7-8 Breathing',
      description: 'Inhale for 4, hold for 7, exhale for 8. Helps reduce anxiety and aids sleep.',
      pattern: '4s - 7s - 8s',
      inhale: 4,
      hold1: 7,
      exhale: 8,
      hold2: 0,
      cycles: 4,
      color: 'from-purple-400 to-purple-600',
      benefits: ['Sleep aid', 'Anxiety reduction', 'Relaxation']
    },
    {
      id: 'relaxing',
      name: 'Relaxing Breath',
      description: 'Long, slow breaths with slightly longer exhales to activate the parasympathetic nervous system.',
      pattern: '5s - 2s - 6s',
      inhale: 5,
      hold1: 2,
      exhale: 6,
      hold2: 0,
      cycles: 6,
      color: 'from-green-400 to-green-600',
      benefits: ['Deep relaxation', 'Lower heart rate', 'Calm mind']
    }
  ];

  const getPhaseInstruction = () => {
    if (!selectedTechnique) return '';
    
    switch (currentPhase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold1':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      case 'hold2':
        return 'Hold';
      default:
        return '';
    }
  };

  const getNextPhase = (phase: typeof currentPhase): typeof currentPhase => {
    const phases: (typeof currentPhase)[] = ['inhale', 'hold1', 'exhale', 'hold2'];
    const currentIndex = phases.indexOf(phase);
    return phases[(currentIndex + 1) % phases.length];
  };

  const startBreathing = () => {
    if (!selectedTechnique) return;
    
    setIsActive(true);
    setCurrentCycle(1);
    setCurrentPhase('inhale');
    setTimeRemaining(selectedTechnique.inhale);
    setCircleScale(1);

    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setCurrentPhase(currentPhase => {
            const nextPhase = getNextPhase(currentPhase);
            
            if (nextPhase === 'inhale') {
              setCurrentCycle(cycle => {
                const newCycle = cycle + 1;
                if (newCycle > selectedTechnique.cycles) {
                  setIsActive(false);
                  setCircleScale(1);
                  return 1;
                }
                return newCycle;
              });
            }

            const duration = nextPhase === 'inhale' ? selectedTechnique.inhale :
                           nextPhase === 'hold1' ? selectedTechnique.hold1 :
                           nextPhase === 'exhale' ? selectedTechnique.exhale :
                           selectedTechnique.hold2;

            return nextPhase;
          });
          
          return selectedTechnique[currentPhase === 'inhale' ? 'hold1' : 
                                  currentPhase === 'hold1' ? 'exhale' :
                                  currentPhase === 'exhale' ? 'hold2' : 'inhale'];
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseBreathing = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetBreathing = () => {
    setIsActive(false);
    setCurrentCycle(0);
    setCurrentPhase('inhale');
    setTimeRemaining(0);
    setCircleScale(1);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isActive && selectedTechnique) {
      const scale = currentPhase === 'inhale' ? 1.5 : 
                   currentPhase === 'exhale' ? 0.7 : 
                   circleScale;
      setCircleScale(scale);
    }
  }, [currentPhase, isActive]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (!selectedTechnique) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-800">Breathing Visualizer</h2>
            <Badge className="bg-yellow-100 text-yellow-800">Premium</Badge>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow the animation to practice different breathing patterns. 
            Choose a technique and press start when you're ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {techniques.map((technique) => (
            <Card 
              key={technique.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-300"
              onClick={() => setSelectedTechnique(technique)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{technique.name}</CardTitle>
                <p className="text-sm text-gray-600">{technique.pattern}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">{technique.description}</p>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-600">Benefits:</p>
                  <div className="flex flex-wrap gap-1">
                    {technique.benefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{selectedTechnique.name}</h3>
          <p className="text-gray-600">{selectedTechnique.description}</p>
        </div>
        <Button variant="outline" onClick={() => setSelectedTechnique(null)}>
          Choose Different Technique
        </Button>
      </div>

      <div className="text-center space-y-8">
        {/* Breathing Circle */}
        <div className="relative w-80 h-80 mx-auto flex items-center justify-center">
          <div 
            className={`w-64 h-64 rounded-full bg-gradient-to-br ${selectedTechnique.color} 
                       flex items-center justify-center text-white font-bold text-xl
                       transition-transform duration-1000 ease-in-out shadow-lg`}
            style={{ transform: `scale(${circleScale})` }}
          >
            {isActive ? (
              <div className="text-center">
                <div className="text-2xl mb-2">{getPhaseInstruction()}</div>
                <div className="text-lg">{timeRemaining}s</div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-lg mb-2">Press start to begin</div>
                <div className="text-sm opacity-75">{selectedTechnique.pattern}</div>
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        {isActive && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Cycle {currentCycle} of {selectedTechnique.cycles}</span>
              <span>{Math.round((currentCycle / selectedTechnique.cycles) * 100)}%</span>
            </div>
            <Progress value={(currentCycle / selectedTechnique.cycles) * 100} className="h-2" />
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!isActive ? (
            <Button 
              onClick={startBreathing}
              className={`bg-gradient-to-r ${selectedTechnique.color} text-white px-8 py-3`}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Breathing
            </Button>
          ) : (
            <Button onClick={pauseBreathing} variant="outline" className="px-8 py-3">
              <Pause className="w-5 h-5 mr-2" />
              Pause
            </Button>
          )}
          
          <Button onClick={resetBreathing} variant="outline" className="px-8 py-3">
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BreathingVisualizer;
