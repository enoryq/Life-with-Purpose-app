
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useDailyReflections } from '@/hooks/useDailyReflections';

const CalendarWidget = () => {
  const { reflections } = useDailyReflections();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const reflectionDates = reflections.map(r => new Date(r.reflection_date));
  
  const selectedDateReflections = selectedDate 
    ? reflections.filter(r => r.reflection_date === format(selectedDate, 'yyyy-MM-dd'))
    : [];

  return (
    <div className="widget-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <CalendarIcon className="w-5 h-5 text-purple-600" />
        <h3 className="text-xl font-semibold text-gray-800">Reflection Calendar</h3>
      </div>

      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          modifiers={{
            reflection: reflectionDates
          }}
          modifiersStyles={{
            reflection: { 
              backgroundColor: 'rgb(147 51 234)', 
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '50%'
            }
          }}
          className={cn("w-full pointer-events-auto rounded-lg border border-purple-200")}
        />

        {selectedDate && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              {format(selectedDate, 'EEEE, MMMM d')}
            </h4>
            
            {selectedDateReflections.length > 0 ? (
              <div className="space-y-2">
                {selectedDateReflections.map((reflection) => (
                  <div key={reflection.id} className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-700 truncate">
                      {reflection.title || 'Daily Reflection'}
                    </span>
                    {reflection.mood && (
                      <Badge variant="secondary" className="text-xs">
                        {reflection.mood}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No reflections for this date</p>
            )}
          </div>
        )}

        <div className="text-xs text-gray-500 mt-2">
          <span className="inline-block w-3 h-3 bg-purple-600 rounded-full mr-2"></span>
          Days with reflections
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;
