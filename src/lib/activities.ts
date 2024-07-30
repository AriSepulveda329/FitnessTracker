import { getUserSession } from "./auth";
import { initdb, sql } from "./initdb";

export interface Activity {
  name: string;
  weekday: number;
  value: number;
  time: Date;
  calories: number;
}

export interface Exercise {
  id: number;
  name: string;
  weekday: number;
  startTime: string;
  duration: number;
  calories: number;
}

export interface ActivityInput {
  name: string;
  value: number;
  calories: number;
}

export interface ExerciseInput {
  name: string;
  exerciseDate: Date;
  startTime: string;
  duration: number;
  calories: number;
}

export async function getActivitiesByName(
  activityName: string
): Promise<Activity[]> {
  await initdb();
  const user = await getUserSession();
  const userId = user.session?.userId || "";
  try {
    const response = await sql(
      `SELECT activities_name, EXTRACT(DOW FROM activity_time) AS weekday, value, activity_time AS time, calories FROM fitness_activities 
       WHERE user_id = $1 AND activities_name = $2 
             AND activity_time >= DATE_TRUNC('week', CURRENT_DATE) AND activity_time < DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '1 week';`,
      [userId, activityName]
    );
    return response as Activity[];
  } catch (error) {
    throw error;
  }
}

export async function saveActivity({ name, value, calories }: ActivityInput) {
  await initdb();
  const user = await getUserSession();
  const userId = user.session?.userId || "";
  try {
    await sql(
      `INSERT INTO fitness_activities (user_id, activities_name, activity_time, calories, value) 
      VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4);`,
      [userId, name, calories, value]
    );
  } catch (error) {
    throw error;
  }
}

export async function getWeekExercises() {
  await initdb();
  const user = await getUserSession();
  const userId = user.session?.userId || "";
  try {
    const response = await sql(
      `SELECT id, name, EXTRACT(DOW FROM exercise_time) AS weekday, start_time, duration, calories FROM fitness_exercises 
       WHERE user_id = $1 AND exercise_time >= DATE_TRUNC('week', CURRENT_DATE) AND exercise_time < DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '1 week';`,
      [userId]
    );
    return response as Exercise[];
  } catch (error) {
    throw error;
  }
}

export async function saveExercise({
  name,
  startTime,
  duration,
  calories,
  exerciseDate,
}: ExerciseInput) {
  await initdb();
  const user = await getUserSession();
  const userId = user.session?.userId || "";

  await sql(
    "INSERT INTO fitness_exercises (user_id, name, exercise_time, start_time, duration, calories) VALUES ($1, $2, $3, $4, $5, $6)",
    [userId, name, exerciseDate, startTime, duration, calories]
  );
}

export async function deleteExercise(id: number) {
  await initdb();
  try {
    await sql(`DELETE FROM fitness_exercises WHERE id = $1`, [id]);
  } catch (error) {
    throw error;
  }
}
