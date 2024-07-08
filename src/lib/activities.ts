import { getUserSession } from "./auth";
import { initdb, sql } from "./initdb";

export interface Activity {
  name: string;
  weekday: number;
  value: number;
  time: Date;
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
      "SELECT activities_name, EXTRACT(DOW FROM activity_time) AS weekday, value, activity_time::time AS time, calories FROM fitness_activities WHERE user_id = $1 AND activities_name = $2 AND EXTRACT(DAY FROM AGE(NOW(), activity_time)) < 7;",
      [userId, activityName]
    );
    return response as Activity[];
  } catch (error) {
    throw error;
  }
}
