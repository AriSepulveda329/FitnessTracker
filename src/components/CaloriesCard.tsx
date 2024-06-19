"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import useStorage, { Exercise, Item } from "@/hooks/useStorage";
import useDate from "@/hooks/useDate";
import { useMyContext } from "@/utils/MyContext";

function CaloriesCard() {
  const { getItemsFromStorage: getActivitiesFromStorage } =
    useStorage("activity");
  const { getItemsFromStorage: getGoalsFromStorage } = useStorage("goal");
  const { day } = useDate(new Date());
  const { exercises } = useMyContext();
  const [exercise, setExercise] = useState<Exercise>();
  const [activities, setActivities] = useState<Item[]>();
  const [goals, setGoals] = useState<Item[]>();
  const [caloriesPercentage, setCaloriesPercentage] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  const getTotalPercentageCalories = useCallback(() => {
    const caloriesFromExercise = exercise?.calories || 0;
    const caloriesFromActivities =
      activities?.reduce(
        (acc, curr) => (curr.calories ? acc + curr.calories : acc + 0),
        0
      ) || 0;
    const caloriesFromGoals =
      goals?.reduce(
        (acc, curr) => (curr.calories ? acc + curr.calories : acc + 0),
        0
      ) || 0;
    const totalCalories =
      caloriesFromExercise + caloriesFromActivities + caloriesFromGoals;
    setTotalCalories(totalCalories);
    return (totalCalories * 100) / 2000;
  }, [activities, exercise, goals]);

  useEffect(() => {
    setExercise(exercises?.find((ex) => ex.weekDay === day));
    setActivities(getActivitiesFromStorage());
    setGoals(getGoalsFromStorage());
  }, [getActivitiesFromStorage, getGoalsFromStorage, exercises, day]);

  useEffect(() => {
    setCaloriesPercentage(getTotalPercentageCalories());
  }, [getTotalPercentageCalories]);

  return (
    <div className="shadow-lg w-1/2 p-5 rounded-xl bg-white">
      <h1 className="text-2xl">Calories burned</h1>
      <div className="flex my-8">
        <div className="grow self-end">
          <p className="text-6xl">
            {totalCalories}
            <span className="text-2xl">cals</span>
          </p>
          <p className="text-lg text-gray-400">Today</p>
        </div>
        <LocalFireDepartmentIcon className="text-9xl text-green-400" />
      </div>
      <div className="w-full bg-green-200 h-8 rounded-full relative overflow-hidden">
        <div
          className={`bg-green-400 h-8 rounded-full absolute top-0 transition-all max-w-full`}
          style={{ width: `${caloriesPercentage}%` }}
        />
      </div>
    </div>
  );
}

export default CaloriesCard;
