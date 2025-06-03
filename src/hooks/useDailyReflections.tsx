
import { useReflectionsFetch } from './useReflectionsFetch';
import { useReflectionSave } from './useReflectionSave';

interface ReflectionData {
  mood?: string;
  gratitude?: string;
  accomplishment?: string;
  challenge?: string;
  tomorrow?: string;
  title?: string;
}

export const useDailyReflections = () => {
  const { reflections, loading, fetchReflections, setReflections } = useReflectionsFetch();
  const { saveReflection } = useReflectionSave();

  const handleSaveReflection = async (reflectionData: ReflectionData) => {
    const result = await saveReflection(reflectionData);
    if (result.success) {
      await fetchReflections();
    }
    return result;
  };

  const getTodaysReflections = () => {
    const today = new Date().toISOString().split('T')[0];
    return reflections.filter(r => r.reflection_date === today);
  };

  const getReflectionsByDate = (date: string) => {
    return reflections.filter(r => r.reflection_date === date);
  };

  return {
    reflections,
    loading,
    saveReflection: handleSaveReflection,
    fetchReflections,
    getTodaysReflections,
    getReflectionsByDate,
    setReflections
  };
};
