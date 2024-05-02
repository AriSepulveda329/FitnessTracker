"use client";
import React, { useCallback, useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Styles from "@/styles/styles.module.css";
import DropdownButton from "@/components/DropdownButton";
import useStorage from "@/hooks/useStorage";
import useDate from "@/hooks/useDate";
import { Item } from "@/hooks/useStorage";

function SleepPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [sleeps, setSleeps] = useState<Item[]>();
  const [totalHours, setTotalHours] = useState(0);
  const { getItemsFromStorage, saveItemOnStorage } = useStorage("sleep");
  const { formatTime, day, date } = useDate(new Date());

  const handleClick = useCallback(
    (value: number) => {
      const newValue: Item = {
        id: date,
        weekDay: day,
        value: value,
        time: formatTime(),
      };

      saveItemOnStorage(newValue);
      if (sleeps) setSleeps([...sleeps, newValue]);
      else setSleeps([newValue]);
      setIsOpen(false);
    },
    [date, day, formatTime, saveItemOnStorage, sleeps]
  );

  useEffect(() => {
    setSleeps(getItemsFromStorage() as Item[]);
  }, [getItemsFromStorage]);

  useEffect(() => {
    const total = sleeps?.reduce((acc, curr) => acc + curr.value, 0);
    setTotalHours(total || 0);
  }, [sleeps]);

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-xl font-medium">Add Sleep Time</h1>
      <section className="flex gap-4 relative">
        <div className="flex justify-center shadow-md py-2 px-7 rounded-lg w-20">
          {totalHours}
        </div>
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
            value={1}
            textValue="1 hr"
            handleClick={handleClick}
          />
          <DropdownButton
            value={2}
            textValue="2 hr"
            handleClick={handleClick}
          />
          <DropdownButton
            value={5}
            textValue="5 hr"
            handleClick={handleClick}
          />
          <DropdownButton
            value={6}
            textValue="6 hr"
            handleClick={handleClick}
          />
          <DropdownButton
            value={7}
            textValue="7 hr"
            handleClick={handleClick}
          />
          <DropdownButton
            value={8}
            textValue="8 hr"
            handleClick={handleClick}
          />
        </div>
      </section>
      <div className="flex flex-col bg-gray-200 w-full rounded-lg transition-all">
        {sleeps ? (
          sleeps.map((sleep, index) => (
            <p
              key={sleep.id.toString()}
              className={`flex justify-between ${
                index === sleeps.length - 1 || "border-b-2"
              } border-gray-300 py-2 px-4`}
            >
              <span>{sleep.value} hr</span>
              <span>{sleep.time}</span>
            </p>
          ))
        ) : (
          <p className=" p-10 text-center font-medium">Not Data Yet</p>
        )}
      </div>
    </div>
  );
}

export default SleepPage;
