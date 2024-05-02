"use client";

import React, { useCallback, useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Styles from "@/styles/styles.module.css";
import DropdownButton from "@/components/DropdownButton";
import useStorage from "@/hooks/useStorage";
import useDate from "@/hooks/useDate";
import { Item } from "@/hooks/useStorage";
import caloriesPerActivity from "@/utils/caloriesPerActivity";

function GoalPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [goals, setGoals] = useState<Item[]>();
  const [totalDistance, setTotalDistance] = useState(0);
  const { getItemsFromStorage, saveItemOnStorage } = useStorage("goal");
  const { formatTime, day, date } = useDate(new Date());

  const handleClick = useCallback(
    (value: number) => {
      const foundActivity = caloriesPerActivity.find(
        (act) => act.name === "Goal"
      );
      const newValue: Item = {
        id: date,
        weekDay: day,
        value: value,
        time: formatTime(),
        calories: foundActivity ? foundActivity.cpm * value : 0,
      };

      saveItemOnStorage(newValue);
      if (goals) setGoals([...goals, newValue]);
      else setGoals([newValue]);
      setIsOpen(false);
    },
    [date, day, goals, formatTime, saveItemOnStorage]
  );

  useEffect(() => {
    setGoals(getItemsFromStorage() as Item[]);
  }, [getItemsFromStorage]);

  useEffect(() => {
    const total = goals?.reduce((acc, curr) => acc + curr.value, 0);
    setTotalDistance(total || 0);
  }, [goals]);

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-xl font-medium">Add Distance</h1>
      <section className="flex gap-4 relative">
        <div className="flex justify-center shadow-md py-2 px-7 rounded-lg w-20">
          {totalDistance}
        </div>
        <button
          className="flex gap-2 bg-green-400 py-2 px-3 w-[152px] text-white shadow-md rounded-lg font-medium hover:bg-green-500 transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          Add Distance
          <KeyboardArrowDownIcon
            className={`${
              isOpen && Styles.dropDownIcon
            } transition-transform duration-300`}
          />
        </button>
        <div
          className={`${
            isOpen ? "h-[200px]" : "h-0"
          } absolute flex flex-col bg-white top-12 left-24 w-[152px] shadow-md rounded-lg overflow-hidden transition-all duration-500 z-10`}
        >
          <DropdownButton
            value={50}
            textValue="50 m"
            handleClick={handleClick}
          />
          <DropdownButton
            value={100}
            textValue="100 m"
            handleClick={handleClick}
          />
          <DropdownButton
            value={150}
            textValue="150 m"
            handleClick={handleClick}
          />
          <DropdownButton
            value={500}
            textValue="500 m"
            handleClick={handleClick}
          />
          <DropdownButton
            value={1000}
            textValue="1000 m"
            handleClick={handleClick}
          />
        </div>
      </section>
      <div className="flex flex-col bg-gray-200 w-full rounded-lg">
        {goals ? (
          goals.map((goal, index) => (
            <p
              key={goal.id.toString()}
              className={`flex justify-between ${
                index === goals.length - 1 || "border-b-2"
              } border-gray-300 py-2 px-4`}
            >
              <span>{goal.value} m</span>
              <span>{goal.time}</span>
            </p>
          ))
        ) : (
          <p className=" p-10 text-center font-medium">Not Data Yet</p>
        )}
      </div>
    </div>
  );
}

export default GoalPage;
