import { getExercisesFromStorage } from "@/lib/actions";
import WeekButtonsRow from "./WeekButtonsRow";

async function ExerciseCard() {
  const exercises = await getExercisesFromStorage();
  return (
    <div className="shadow-lg w-1/2 p-5 rounded-xl bg-white">
      <h1 className="text-2xl">Exercise days</h1>
      <WeekButtonsRow exercises={exercises} />
    </div>
  );
}

export default ExerciseCard;
