"use client";

import { logout } from "@/lib/actions";
import React from "react";
import { useFormStatus } from "react-dom";

function LogoutButton() {
  const { pending } = useFormStatus();
  return (
    <form action={logout}>
      <button
        type="submit"
        className={`${
          pending ? "bg-green-600" : "bg-green-500"
        } text-white px-4 py-2 rounded hover:bg-green-600 transition-colors`}
        disabled={pending}
      >
        {pending ? "Waiting..." : "Logout"}
      </button>
    </form>
  );
}

export default LogoutButton;
