"use server";

import { redirect } from "next/navigation";
import { getUserByEmail, saveUser } from "./users";
import { revalidatePath } from "next/cache";
import { closeSession, createAuthSession, getUserSession } from "./auth";
import { getActivitiesByName } from "./activities";

export interface UserErrors {
  [index: string]: string;
}

interface DatabaseError {
  message: string;
  code?: string;
  constraint?: string;
}

function isDatabaseError(error: any): error is DatabaseError {
  return error.constraint !== undefined;
}

function isInvalidText(text: string) {
  return !text || text.trim() === "";
}

function isInvalidNumber(number: number, min: number, max: number) {
  return !number || (number <= min && number >= max);
}

export const signup = async (
  prevState: { errors: UserErrors | null },
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

  let errors: UserErrors = {};

  if (isInvalidText(user.name)) errors.name = "Not valid username.";
  if (isInvalidText(user.email) || !user.email.includes("@"))
    errors.email = "Not valid email.";
  if (isInvalidNumber(user.height, 4, 280))
    errors.height = "Not valid height value.";
  if (isInvalidNumber(user.wheight, 20, 1100))
    errors.wheight = "Not valid wheight value.";
  if (user.hformat !== "cm" && user.hformat !== "ft")
    errors.hformat = "Not valid height format.";
  if (user.wformat !== "kg" && user.wformat !== "lb")
    errors.wformat = "Not valid wheight format.";

  if (Object.keys(errors).length > 0) return { errors };

  try {
    const id = await saveUser(user);
    await createAuthSession(id.toString());
    revalidatePath("/", "layout");
    redirect("/dashboard");
  } catch (error) {
    if (isDatabaseError(error)) {
      return {
        errors: { email: "Email already exists. Please choose another one." },
      };
    }
    throw error;
  }
};

export const login = async (
  prevState: { errors: UserErrors | null } | undefined,
  formData: FormData
) => {
  const email = formData.get("email") as string;

  try {
    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.id) {
      return {
        errors: {
          email: "Could not authenticate user, please check your credentials.",
        } as UserErrors,
      };
    }
    await createAuthSession(existingUser.id.toString());
    revalidatePath("/", "layout");
    redirect("/dashboard");
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  await closeSession();
  redirect("/");
};

export const getActivitiesFromStorage = async (activityName: string) => {
  const result = await getActivitiesByName(activityName);
  return result;
};
