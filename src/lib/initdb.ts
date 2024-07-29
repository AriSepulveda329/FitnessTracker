import { neon } from "@neondatabase/serverless";
import env from "dotenv";

env.config();

export const sql = neon(process.env.DATABASE_URL || "");

export async function initdb() {
  try {
    await sql`SET timezone = 'America/Mexico_City';`;
    await sql`CREATE TABLE IF NOT EXISTS fitness_users (
    ID serial NOT NULL PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL UNIQUE,
    height smallint NOT NULL CHECK (height >= 4 AND height <= 280),
    hFormat char(2) CHECK (hFormat = 'cm' OR hFormat = 'ft') DEFAULT 'cm',
    wheight smallint NOT NULL CHECK (wheight >= 20 AND wheight <= 1100),
    wFormat char(2) CHECK (wFormat = 'kg' OR wFormat = 'lb') DEFAULT 'kg'
  );`;

    await sql`CREATE TABLE IF NOT EXISTS fitness_sessions (
    id text NOT NULL PRIMARY KEY UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    user_id integer NOT NULL,
    FOREIGN KEY (user_id) REFERENCES fitness_users(id)
  );`;

    await sql`CREATE TABLE IF NOT EXISTS fitness_activities (
    id serial PRIMARY KEY,
    user_id int NOT NULL,
    activities_name varchar(40) NOT NULL,
    value int NOT NULL,
    activity_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    calories int,
    FOREIGN KEY (user_id) REFERENCES fitness_users(id)
  );`;

    await sql`CREATE TABLE IF NOT EXISTS fitness_exercises (
    id serial PRIMARY KEY,
    user_id int NOT NULL,
    name varchar(40) NOT NULL,
    exercise_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    duration varchar(40) NOT NULL,
    calories int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES fitness_users (id)
  );`;
  } catch (error) {
    throw error;
  }
}
