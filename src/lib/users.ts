import { initdb, sql } from "./initdb";

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
  await initdb();

  const response = await sql(
    "INSERT INTO fitness_users (name, email, height, hformat, wheight, wformat) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;",
    [name, email, height, hformat, wheight, wformat]
  );
  return response[0].id;
}

export async function getUserByEmail(email: string): Promise<User> {
  await initdb();

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
  await initdb();

  try {
    if (!id) return;
    const response = await sql("SELECT * FROM fitness_users WHERE id = $1;", [
      id,
    ]);
    return response[0] as User;
  } catch (error) {
    throw error;
  }
}
