"use client";

import { useEffect, useState } from "react";
import { AddButtonProps } from "./AddButton";
import useStorage, { Item } from "@/hooks/useStorage";
import { ItemUnits } from "@/utils/datasets";
import DropdownButton, { DropDownButtonProps } from "./DropdownButton";

interface ItemsTableProps {
  type: string;
  AddButton: React.ComponentType<AddButtonProps>;
  DropdownButton: React.ComponentType<DropDownButtonProps>;
}

function ItemsTable({ type, AddButton }: ItemsTableProps) {
  const [items, setItems] = useState<Item[]>();
  const { getItemsFromStorage } = useStorage(type);

  useEffect(() => {
    setItems(getItemsFromStorage() as Item[]);
  }, [getItemsFromStorage]);

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-xl font-medium">Add {ItemUnits[type].measure}</h1>
      {type === "water" ? (
        <AddButton items={items} setItems={setItems} />
      ) : (
        <DropdownButton items={items} setItems={setItems} type={type} />
      )}
      <div className="flex flex-col bg-gray-200 w-full rounded-lg">
        {items ? (
          items.map((item, index) => (
            <p
              key={item.id.toString()}
              className={`flex justify-between ${
                index === items.length - 1 || "border-b-2"
              } border-gray-300 py-2 px-4`}
            >
              <span>
                {item.value} {ItemUnits[type].unit}
              </span>
              <span>{item.time}</span>
            </p>
          ))
        ) : (
          <p className=" p-10 text-center font-medium">Not Data Yet</p>
        )}
      </div>
    </div>
  );
}

export default ItemsTable;
