"use client";

import useDate from "@/hooks/useDate";
import useStorage, { Item } from "@/hooks/useStorage";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export interface AddButtonProps {
  items: Item[] | undefined;
  setItems: React.Dispatch<React.SetStateAction<Item[] | undefined>>;
}

function AddButton({ items, setItems }: AddButtonProps) {
  const { saveItemOnStorage } = useStorage("water");
  const { formatTime, day, date } = useDate(new Date());

  const handleClick = () => {
    const newValue: Item = {
      id: date,
      weekDay: day,
      value: 1,
      time: formatTime(),
    };

    saveItemOnStorage(newValue);
    if (items) setItems([...items, newValue]);
    else setItems([newValue]);
  };

  return (
    <section className="flex gap-4 relative">
      <div className="flex justify-center shadow-md py-2 px-7 rounded-lg w-20">
        {items?.length || 0}
      </div>
      <button
        className="flex gap-2 bg-green-400 py-2 px-3 w-[136px] text-white shadow-md rounded-lg font-medium hover:bg-green-500 transition-all duration-300"
        onClick={handleClick}
      >
        <AddCircleIcon />
        Add Glass
      </button>
    </section>
  );
}

export default AddButton;
