"use server";

import { redirect } from "next/navigation";
import { saveUser } from "./users";
import { revalidatePath } from "next/cache";

function isInvalidText(text: string) {
  return !text || text.trim() === "";
}

function isInvalidNumber(number: number, min: number, max: number) {
  return !number || (number <= min && number >= max);
}

export const userSubmitHandler = async (
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

  if (isInvalidText(user.name)) return { message: "Not valid username." };
  else if (isInvalidText(user.email) || !user.email.includes("@"))
    return { message: "Not valid email." };
  else if (isInvalidNumber(user.height, 4, 280))
    return { message: "Not valid height value." };
  else if (isInvalidNumber(user.wheight, 20, 1100))
    return { message: "Not valid wheight value." };
  else if (user.hformat !== "cm" && user.hformat !== "ft")
    return { message: "Not valid height format." };
  else if (user.wformat !== "kg" && user.wformat !== "lb")
    return { message: "Not valid wheight format." };

  await saveUser(user);
  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
};
