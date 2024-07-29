import { getUserSession } from "./auth";
import { initdb, sql } from "./initdb";

export interface Activity {
  name: string;
  weekday: number;
  value: number;
  time: Date;
  calories: number;
}

export interface ActivityInput {
  name: string;
  value: number;
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
