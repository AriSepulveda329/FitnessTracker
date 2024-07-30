import React from "react";
import Styles from "@/styles/styles.module.css";
import { Exercise } from "@/lib/activities";

interface DayButtonProps {
  handleChangeDay(day: number): void;
  exercises: Exercise[] | undefined;
  day: number;
  wkDay: number;
  weekLetter: string;
}

function DayButton({
  handleChangeDay,
  exercises,
  wkDay,
  day,
  weekLetter,
}: DayButtonProps) {
  return (
    <div className="flex flex-col items-center ml-2">
      <button
        onClick={() => handleChangeDay(day)}
        className={`w-7 h-24 relative ${
          exercises?.find((ex) => ex.weekday === day)
            ? `bg-green-500 ${Styles.checkDay}`
            : "bg-green-200"
        } ${
          wkDay === day && "translate-y-[-8px]"
        } rounded-full hover:ring-1 hover:translate-y-[-8px] transition-transform`}
      />
      <p
        className={`mt-1  ${
          wkDay === day ? "text-black font-bold" : "text-gray-400"
        }`}
      >
        {weekLetter}
      </p>
    </div>
  );
}

export default DayButton;
