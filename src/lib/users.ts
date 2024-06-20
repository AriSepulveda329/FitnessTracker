import db from "./initdb";

interface User {
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
  const response = await db.query(
    "INSERT INTO users (name, email, height, hformat, wheight, wformat) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;",
    [name, email, height, hformat, wheight, wformat]
  );
  return response.rows[0].id;
}

export async function getUserByEmail(email: string): Promise<User> {
  try {
    const response = await db.query("SELECT * FROM users WHERE email = $1;", [
      email,
    ]);
    return response.rows[0];
  } catch (error) {
    throw error;
  }
}
