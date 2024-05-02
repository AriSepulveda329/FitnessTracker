"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Styles from "@/styles/styles.module.css";
import DropdownButton from "@/components/DropdownButton";
import useStorage from "@/hooks/useStorage";
import useDate from "@/hooks/useDate";
import { Item } from "@/hooks/useStorage";
import caloriesPerActivity from "@/utils/caloriesPerActivity";

function ActivityPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [activities, setActivities] = useState<Item[]>();
  const [totalTime, setTotalTime] = useState(0);
  const { getItemsFromStorage, saveItemOnStorage } = useStorage("activity");
  const { formatTime, day, date } = useDate(new Date());

  const handleClick = useCallback(
    (value: number) => {
      const foundActivity = caloriesPerActivity.find(
        (act) => act.name === "Walk"
      );
      const newValue: Item = {
        id: date,
        weekDay: day,
        value: value,
        time: formatTime(),
        calories: foundActivity ? foundActivity.cpm * value : 0,
      };

      saveItemOnStorage(newValue);
      if (activities) setActivities([...activities, newValue]);
      else setActivities([newValue]);
      setIsOpen(false);
    },
    [activities, saveItemOnStorage, day, formatTime, date]
  );

  useEffect(() => {
    setActivities(getItemsFromStorage());
  }, [getItemsFromStorage]);

  useEffect(() => {
    const total = activities?.reduce((acc, curr) => acc + curr.value, 0);
    setTotalTime(total || 0);
  }, [activities]);

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-xl font-medium">Add Activity Time</h1>
      <section className="flex gap-4 relative">
        <div className="shadow-md py-2 px-7 rounded-lg w-20">{totalTime}</div>
        <button
          className="flex gap-2 bg-green-400 py-2 px-3 w-32 text-white shadow-md rounded-lg font-medium hover:bg-green-500 transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          Add Time
          <KeyboardArrowDownIcon
            className={`${
              isOpen && Styles.dropDownIcon
            } transition-transform duration-300`}
          />
        </button>
        <div
          className={`${
            isOpen ? "h-60" : "h-0"
          } absolute flex flex-col bg-white top-12 left-24 w-32 shadow-md rounded-lg overflow-hidden transition-all duration-500 z-10`}
        >
          <DropdownButton
            value={5}
            textValue="5 min"
            handleClick={handleClick}
          />
          <DropdownButton
            value={10}
            textValue="10 min"
            handleClick={handleClick}
          />
          <DropdownButton
            value={15}
            textValue="15 min"
            handleClick={handleClick}
          />
          <DropdownButton
            value={30}
            textValue="30 min"
            handleClick={handleClick}
          />
          <DropdownButton
            value={45}
            textValue="45 min"
            handleClick={handleClick}
          />
          <DropdownButton
            value={60}
            textValue="60 min"
            handleClick={handleClick}
          />
        </div>
      </section>
      <div className="flex flex-col bg-gray-200 w-full rounded-lg">
        {activities ? (
          activities.map((activity, index) => (
            <p
              key={activity.id.toString()}
              className={`flex justify-between ${
                index === activities.length - 1 || "border-b-2"
              } border-gray-300 py-2 px-4`}
            >
              <span>{activity.value} min</span>
              <span>{activity.time}</span>
            </p>
          ))
        ) : (
          <p className=" p-10 text-center font-medium">Not Data Yet</p>
        )}
      </div>
    </div>
  );
}

export default ActivityPage;
