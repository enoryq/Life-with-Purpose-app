
import { useReflectionsFetch } from './useReflectionsFetch';
import { useReflectionSave } from './useReflectionSave';

interface DailyReflection {
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

interface ReflectionData {
  mood?: string;
  gratitude?: string;
  accomplishment?: string;
  challenge?: string;
  tomorrow?: string;
  title?: string;
}

export const useDailyReflections = () => {
  const { reflections, loading, fetchReflections } = useReflectionsFetch();
  const { saveReflection: saveReflectionData } = useReflectionSave();

  const saveReflection = async (reflectionData: ReflectionData) => {
    const result = await saveReflectionData(reflectionData);
    if (result?.success) {
      await fetchReflections();
    }
    return result;
  };

  return { reflections, loading, saveReflection, fetchReflections };
};
