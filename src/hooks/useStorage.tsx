import { useCallback, useMemo } from "react";

export interface Item {
  id: Date;
  value: number;
  weekDay: number;
  time: string;
  calories?: number;
}

export interface Exercise {
  id: string;
  exercise: string;
  weekDay: number;
  startTime: string;
  duration: number;
  calories: number;
}

function useStorage(table: string) {
  const date = useMemo(() => new Date(), []);

  const getItemsFromStorage = useCallback((): Item[] | undefined => {
    const items = localStorage.getItem(table) || "";
    if (items) {
      const weekItems: Item[] = JSON.parse(items).filter(
        (item: Item) => item.weekDay === date.getDay()
      );
      return weekItems.length > 0 ? weekItems : undefined;
    }
  }, [date, table]);

  const getExerciseFromStorage = useCallback(
    (weekDay: number): Exercise | undefined => {
      const items = localStorage.getItem(table) || "";
      if (items) {
        const exercise: Exercise = JSON.parse(items).find(
          (exercise: Exercise) => exercise.weekDay === weekDay
        );
        return exercise;
      }
    },
    [table]
  );

  const getExercisesFromStorage = useCallback((): Exercise[] => {
    const items = localStorage.getItem(table) || "";
    const exercises: Exercise[] = items ? JSON.parse(items) : [];
    return exercises;
  }, [table]);

  const saveItemOnStorage = useCallback(
    (newValue: Item) => {
      const savedItems = getItemsFromStorage() || [];
      savedItems.push(newValue);
      localStorage.setItem(table, JSON.stringify(savedItems));
    },
    [getItemsFromStorage, table]
  );

  const saveExerciseOnStorage = useCallback(
    (newValue: Exercise) => {
      const items = localStorage.getItem(table) || "";
      const parseExercises = items ? JSON.parse(items) : [];
      parseExercises.push(newValue);
      localStorage.setItem(table, JSON.stringify(parseExercises));
    },
    [table]
  );

  const deleteExercise = useCallback(
    (id: string) => {
      const items = localStorage.getItem(table) || "";
      const newData = JSON.parse(items).filter(
        (item: Exercise) => item.id !== id
      );
      localStorage.setItem(table, JSON.stringify(newData));
    },
    [table]
  );

  return {
    table,
    date,
    getItemsFromStorage,
    getExerciseFromStorage,
    getExercisesFromStorage,
    saveItemOnStorage,
    saveExerciseOnStorage,
    deleteExercise,
  };
}

export default useStorage;
