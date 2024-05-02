"use client";

import React, { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useStorage from "@/hooks/useStorage";
import useDate from "@/hooks/useDate";
import { Item } from "@/hooks/useStorage";

function WaterPage() {
  const [glasses, setGlasses] = useState<Item[]>();
  const { getItemsFromStorage, saveItemOnStorage } = useStorage("water");
  const { formatTime, day, date } = useDate(new Date());

  const handleClick = () => {
    const newValue: Item = {
      id: date,
      weekDay: day,
      value: 1,
      time: formatTime(),
    };

    saveItemOnStorage(newValue);
    if (glasses) setGlasses([...glasses, newValue]);
    else setGlasses([newValue]);
  };

  useEffect(() => {
    setGlasses(getItemsFromStorage() as Item[]);
  }, [getItemsFromStorage]);

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-xl font-medium">Add Glasses</h1>
      <section className="flex gap-4 relative">
        <div className="flex justify-center shadow-md py-2 px-7 rounded-lg w-20">
          {glasses?.length || 0}
        </div>
        <button
          className="flex gap-2 bg-green-400 py-2 px-3 w-[136px] text-white shadow-md rounded-lg font-medium hover:bg-green-500 transition-all duration-300"
          onClick={handleClick}
        >
          <AddCircleIcon />
          Add Glass
        </button>
      </section>
      <div className="flex flex-col bg-gray-200 w-full rounded-lg">
        {glasses ? (
          glasses.map((glass, index) => (
            <p
              key={glass.id.toString()}
              className={`flex justify-between ${
                index === glasses.length - 1 || "border-b-2"
              } border-gray-300 py-2 px-4`}
            >
              <span>{glass.value} glass</span>
              <span>{glass.time}</span>
            </p>
          ))
        ) : (
          <p className=" p-10 text-center font-medium">Not Data Yet</p>
        )}
      </div>
    </div>
  );
}

export default WaterPage;
