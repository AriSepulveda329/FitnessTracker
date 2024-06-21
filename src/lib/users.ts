import { sql } from "./initdb";

export interface User {
  id?: number;
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
}: User): Promise<number> {
  const response = await sql(
    "INSERT INTO fitness_users (name, email, height, hformat, wheight, wformat) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;",
    [name, email, height, hformat, wheight, wformat]
  );
  return response[0].id;
}

export async function getUserByEmail(email: string): Promise<User> {
  try {
    const response = await sql(
      "SELECT * FROM fitness_users WHERE email = $1;",
      [email]
    );
    return response[0] as User;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(id: string): Promise<User | undefined> {
  try {
    if (!id) return;
    const response = await sql("SELECT * FROM fitness_users WHERE id = $1;", [
      parseInt(id),
    ]);
    return response[0] as User;
  } catch (error) {
    throw error;
  }
}
