"use client";

import React, { useEffect, useState } from "react";
import DayButton from "./DayButton";
import ExerciseActivity from "./ExerciseActivity";
import AddIcon from "@mui/icons-material/Add";
import AddExerciseModal from "./AddExerciseModal";
import { Exercise } from "@/lib/activities";

interface WeekButtonsRowProps {
  exercises: Exercise[];
}

function WeekButtonsRow({ exercises }: WeekButtonsRowProps) {
  const date = new Date();
  const [wkDay, setWkDay] = useState(date.getDay());
  const [exercise, setExercise] = useState<Exercise>();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleChangeDay = (day: number) => {
    const foundExercise = exercises.find((ex) => ex.weekday === day);
    setWkDay(day);
    setExercise(foundExercise);
  };

  useEffect(() => {
    setExercise(exercises.find((ex) => ex.weekday === date.getDay()));
    console.log(exercise);
  }, [exercises]);

  return (
    <>
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
          title={exercise.name}
          startTime={exercise.startTime}
          duration={exercise.duration}
          id={exercise.id}
          setExercise={setExercise}
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
      />
    </>
  );
}

export default WeekButtonsRow;
