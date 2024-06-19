"use client";

import useDate from "@/hooks/useDate";
import useStorage, { Item } from "@/hooks/useStorage";
import React, { useCallback, useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Styles from "@/styles/styles.module.css";
import { ItemUnits } from "@/utils/datasets";

export interface DropDownButtonProps {
  items: Item[] | undefined;
  setItems: React.Dispatch<React.SetStateAction<Item[] | undefined>>;
  type: string;
}

type statsValuesType = {
  [index: string]: number[];
};

const statsValues: statsValuesType = {
  sleep: [1, 2, 3, 4, 5, 6, 7, 8],
  goal: [50, 100, 150, 500, 1000],
  activity: [5, 10, 15, 30, 45, 60],
};

function DropdownButton({ items, setItems, type }: DropDownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { saveItemOnStorage } = useStorage(type);
  const { formatTime, day, date } = useDate(new Date());
  const [totalItems, setTotalItems] = useState(0);

  const handleClick = useCallback(
    (value: number) => {
      const newValue: Item = {
        id: date,
        weekDay: day,
        value: value,
        time: formatTime(),
      };

      saveItemOnStorage(newValue);
      if (items) setItems([...items, newValue]);
      else setItems([newValue]);
      setIsOpen(false);
    },
    [date, day, formatTime, saveItemOnStorage, items, setItems]
  );

  useEffect(() => {
    const total = items?.reduce((acc, curr) => acc + curr.value, 0);
    setTotalItems(total || 0);
  }, [items]);

  return (
    <section className="flex gap-4 relative">
      <div className="flex justify-center shadow-md py-2 px-7 rounded-lg w-20">
        {totalItems}
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
        {statsValues[type].map((value) => (
          <button
            className="py-2 hover:bg-gray-200 transition-colors duration-500"
            onClick={() => handleClick(value)}
            key={value}
          >
            {`${value} ${ItemUnits[type].unit}`}
          </button>
        ))}
      </div>
    </section>
  );
}

export default DropdownButton;
