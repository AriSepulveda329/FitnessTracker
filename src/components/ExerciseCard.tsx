import React, { useCallback, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddExerciseModal from "./AddExerciseModal";
import useStorage, { Exercise } from "@/hooks/useStorage";
import ExerciseActivity from "./ExerciseActivity";
import DayButton from "./DayButton";
import { useMyContext } from "@/utils/MyContext";

function ExerciseCard() {
  const { exercises, updateExercises } = useMyContext();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const {
    getExerciseFromStorage,
    deleteExercise,
    getExercisesFromStorage,
    date,
  } = useStorage("exercise");
  const [exercise, setExercise] = useState<Exercise>();
  const [wkDay, setWkDay] = useState(date.getDay());

  const handleDelete = (id: string) => {
    const filteredValues = exercises?.filter((ex) => ex.id !== id);
    deleteExercise(id);
    updateExercises(filteredValues);
    setExercise(undefined);
  };

  const handleChangeDay = (day: number) => {
    const foundExercise = exercises?.find((ex) => ex.weekDay === day);
    setWkDay(day);
    setExercise(foundExercise);
  };

  const saveExercises = useCallback(
    (newValue: Exercise) => {
      if (exercises) {
        updateExercises([...exercises, newValue]);
      } else updateExercises([newValue]);
      setExercise(newValue);
    },
    [exercises, updateExercises]
  );

  useEffect(() => {
    updateExercises(getExercisesFromStorage());
    setExercise(getExerciseFromStorage(date.getDay()));
  }, [getExerciseFromStorage, getExercisesFromStorage, updateExercises, date]);

  return (
    <div className="shadow-lg w-1/2 p-5 rounded-xl">
      <h1 className="text-2xl">Exercise days</h1>
      <div className="flex my-8">
        <div className="grow self-end">
          <p className="text-3xl">
            <span className="text-6xl">{exercises?.length || 0}</span> of{" "}
            <span className="text-6xl">5</span>
          </p>
          <p className="text-lg text-gray-400">This week</p>
        </div>
        <div className="flex">
          <DayButton
            handleChangeDay={handleChangeDay}
            exercises={exercises}
            wkDay={wkDay}
            day={1}
            weekLetter="M"
          />
          <DayButton
            handleChangeDay={handleChangeDay}
            exercises={exercises}
            wkDay={wkDay}
            day={2}
            weekLetter="T"
          />
          <DayButton
            handleChangeDay={handleChangeDay}
            exercises={exercises}
            wkDay={wkDay}
            day={3}
            weekLetter="W"
          />
          <DayButton
            handleChangeDay={handleChangeDay}
            exercises={exercises}
            wkDay={wkDay}
            day={4}
            weekLetter="Th"
          />
          <DayButton
            handleChangeDay={handleChangeDay}
            exercises={exercises}
            wkDay={wkDay}
            day={5}
            weekLetter="F"
          />
          <DayButton
            handleChangeDay={handleChangeDay}
            exercises={exercises}
            wkDay={wkDay}
            day={6}
            weekLetter="Sa"
          />
          <DayButton
            handleChangeDay={handleChangeDay}
            exercises={exercises}
            wkDay={wkDay}
            day={0}
            weekLetter="S"
          />
        </div>
      </div>
      {exercise ? (
        <ExerciseActivity
          title={exercise.exercise}
          startTime={exercise.startTime}
          duration={exercise.duration}
          handleDelete={() => handleDelete(exercise.id)}
        />
      ) : (
        <button
          className="flex gap-1 bg-green-400 text-white w-full justify-center rounded-full py-1.5 hover:bg-green-500 transition-colors"
          onClick={() => setIsOpenModal(true)}
        >
          <AddIcon />
          Add Exercise
        </button>
      )}
      <AddExerciseModal
        exDay={wkDay}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        saveActivities={saveExercises}
      />
    </div>
  );
}

export default ExerciseCard;
