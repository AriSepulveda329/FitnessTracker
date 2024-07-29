"use client";

import { saveActivityOnStorage } from "@/lib/actions";
import { ActivityInput } from "@/lib/activities";
import caloriesPerActivity from "@/utils/caloriesPerActivity";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function AddButton() {
  const handleClick = async () => {
    const newValue: ActivityInput = {
      name: "water",
      value: 1,
      calories: caloriesPerActivity["water"] * 1,
    };

    await saveActivityOnStorage(newValue);
  };

  return (
    <button
      className="flex gap-2 bg-green-400 py-2 px-3 w-[136px] text-white shadow-md rounded-lg font-medium hover:bg-green-500 transition-all duration-300"
      onClick={handleClick}
    >
      <AddCircleIcon />
      Add Glass
    </button>
  );
}

export default AddButton;
