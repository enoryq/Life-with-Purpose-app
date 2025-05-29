
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReflectionCard from './ReflectionCard';

interface ReflectionData {
  id: string;
  reflection_date: string;
  mood?: string;
  gratitude?: string;
  accomplishment?: string;
  challenge?: string;
  tomorrow?: string;
  title?: string;
  created_at: string;
}

interface CalendarViewProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  reflections: ReflectionData[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ selectedDate, onSelectDate, reflections }) => {
  const reflectionDates = reflections.map(r => new Date(r.reflection_date));
  
  const selectedDateReflections = selectedDate 
    ? reflections.filter(r => r.reflection_date === format(selectedDate, 'yyyy-MM-dd'))
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Select a Date</CardTitle>
          <CardDescription>
            Dates with reflections are highlighted
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelectDate}
            modifiers={{
              reflection: reflectionDates
            }}
            modifiersStyles={{
              reflection: { 
                backgroundColor: 'rgb(147 51 234)', 
                color: 'white',
                fontWeight: 'bold'
              }
            }}
            className={cn("w-full pointer-events-auto")}
          />
        </CardContent>
      </Card>

      <div className="lg:col-span-2">
        {selectedDate && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Reflections for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </h3>
            
            {selectedDateReflections.length > 0 ? (
              selectedDateReflections.map((reflection) => (
                <ReflectionCard key={reflection.id} reflection={reflection} />
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No reflections for this date</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
