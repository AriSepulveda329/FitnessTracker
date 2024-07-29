"use client";

import { saveActivityOnStorage } from "@/lib/actions";
import { ActivityInput } from "@/lib/activities";
import caloriesPerActivity from "@/utils/caloriesPerActivity";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";

function AddButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    const newValue: ActivityInput = {
      name: "water",
      value: 1,
      calories: caloriesPerActivity["water"] * 1,
    };

    setIsLoading(true);
    await saveActivityOnStorage(newValue);
    setIsLoading(false);
  };

  return (
    <button
      className={`flex gap-2 ${
        isLoading ? "bg-green-600" : "bg-green-400"
      } py-2 px-3 w-[136px] text-white shadow-md rounded-lg font-medium ${
        !isLoading && "hover:bg-green-500"
      } transition-all duration-300`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {!isLoading && <AddCircleIcon />}
      {isLoading ? "Saving Data..." : "Add Glass"}
    </button>
  );
}

export default AddButton;
