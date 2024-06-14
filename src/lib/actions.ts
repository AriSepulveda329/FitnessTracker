"use server";

import { redirect } from "next/navigation";
import { saveUser } from "./users";

function isInvalidText(text: string) {
  return !text || text.trim() === "";
}

function isInvalidNumber(number: number, min: number, max: number) {
  return !number || (number <= min && number >= max);
}

export const submitHandler = async (
  prevState: { message: string | null },
  formData: FormData
) => {
  const user = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    height: parseInt(formData.get("height") as string),
    hformat: formData.get("heightFormat") as "cm" | "ft",
    wheight: parseInt(formData.get("wheight") as string),
    wformat: formData.get("wheightFormat") as "kg" | "lb",
  };

  if (
    isInvalidText(user.name) ||
    isInvalidText(user.email) ||
    isInvalidNumber(user.height, 4, 280) ||
    isInvalidNumber(user.wheight, 20, 1100) ||
    (user.hformat !== "cm" && user.hformat !== "ft") ||
    (user.wformat !== "kg" && user.wformat !== "lb") ||
    !user.email.includes("@")
  ) {
    return { message: "Not valid input." };
  }
  await saveUser(user);
  redirect("/");
};
