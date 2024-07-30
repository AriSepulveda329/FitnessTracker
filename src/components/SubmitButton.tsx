"use client";

import React from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  text?: string;
}

function SubmitButton({ text = "Submit" }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`${
        pending ? "bg-green-800" : "bg-green-500 hover:bg-green-600"
      } text-white w-full py-2 mt-4 rounded transition-colors`}
      disabled={pending}
    >
      {pending ? "Checking..." : text}
    </button>
  );
}

export default SubmitButton;
