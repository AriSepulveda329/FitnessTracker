import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { getActivitiesByName } from "@/lib/activities";
import { getExercisesFromStorage } from "@/lib/actions";

async function CaloriesCard() {
  const today = new Date();
  const activities = await getActivitiesByName("activity");
  const goals = await getActivitiesByName("goal");
  const exercises = await getExercisesFromStorage();
  const todayExercise = exercises?.find((ex) => ex.weekday == today.getDay());
  const getTotalCalories = () => {
    const caloriesFromExercise = todayExercise?.calories || 0;
    const caloriesFromActivities =
      activities?.reduce(
        (acc, curr) => (curr.calories ? acc + curr.calories : acc + 0),
        0
      ) || 0;
    const caloriesFromGoals =
      goals?.reduce(
        (acc, curr) => (curr.calories ? acc + curr.calories : acc + 0),
        0
      ) || 0;
    const totalCalories =
      caloriesFromExercise + caloriesFromActivities + caloriesFromGoals;
    return totalCalories;
  };
  const totalCalories = getTotalCalories();
  const caloriesPercentage = (getTotalCalories() * 100) / 2000;

  return (
    <div className="shadow-lg w-1/2 p-5 rounded-xl bg-white">
      <h1 className="text-2xl">Calories burned</h1>
      <div className="flex my-8">
        <div className="grow self-end">
          <p className="text-6xl">
            {totalCalories}
            <span className="text-2xl">cals</span>
          </p>
          <p className="text-lg text-gray-400">Today</p>
        </div>
        <LocalFireDepartmentIcon className="text-9xl text-green-400" />
      </div>
      <div className="w-full bg-green-200 h-8 rounded-full relative overflow-hidden">
        <div
          className={`bg-green-400 h-8 rounded-full absolute top-0 transition-all max-w-full`}
          style={{ width: `${caloriesPercentage}%` }}
        />
      </div>
    </div>
  );
}

export default CaloriesCard;
