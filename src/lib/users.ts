import db from "../../initdb";

interface User {
  name: string;
  email: string;
  height: number;
  hformat: "cm" | "ft";
  wheight: number;
  wformat: "kg" | "lb";
}

export async function saveUser({
  name,
  email,
  height,
  hformat,
  wheight,
  wformat,
}: User) {
  try {
    await db.query(
      "INSERT INTO users (name, email, height, hformat, wheight, wformat) VALUES ($1, $2, $3, $4, $5, $6);",
      [name, email, height, hformat, wheight, wformat]
    );
  } catch (error) {
    throw error;
  }
}
