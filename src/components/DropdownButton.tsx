"use client";

import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Styles from "@/styles/styles.module.css";
import { ItemUnits } from "@/utils/datasets";
import { Activity, ActivityInput } from "@/lib/activities";
import { saveActivityOnStorage } from "@/lib/actions";
import caloriesPerActivity from "@/utils/caloriesPerActivity";

export interface DropDownButtonProps {
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

function DropdownButton({ type }: DropDownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async (value: number) => {
    const input: ActivityInput = {
      name: type,
      value: value,
      calories: caloriesPerActivity[type] * value,
    };

    setIsOpen(false);
    await saveActivityOnStorage(input);
  };

  return (
    <>
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
    </>
  );
}

export default DropdownButton;
