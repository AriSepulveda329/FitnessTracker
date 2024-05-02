import React from "react";

interface DropDownButtonProps {
  value: number;
  textValue: string;
  handleClick(value: number): void;
}

function DropdownButton({
  value,
  handleClick,
  textValue,
}: DropDownButtonProps) {
  return (
    <button
      className="py-2 hover:bg-gray-200 transition-colors duration-500"
      onClick={() => handleClick(value)}
    >
      {textValue}
    </button>
  );
}

export default DropdownButton;
