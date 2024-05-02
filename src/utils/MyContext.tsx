import { Exercise } from "@/hooks/useStorage";
import React, { useCallback, useContext, useState } from "react";

interface MyContextType {
  exercises: Exercise[] | undefined;
  updateExercises: (newValue: Exercise[] | undefined) => void;
}

const MyContext = React.createContext<MyContextType | undefined>(undefined);

export const MyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [exercises, setExercises] = useState<Exercise[]>();

  const updateExercises = useCallback((newValue: Exercise[] | undefined) => {
    setExercises(newValue);
  }, []);

  return (
    <MyContext.Provider value={{ exercises, updateExercises }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error(
      "useMyContext debe ser utilizado dentro de un MyContextProvider"
    );
  }
  return context;
};

export default MyContext;
