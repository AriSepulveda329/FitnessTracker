import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Styles from "@/styles/styles.module.css";
import icons from "@/utils/icons";
import { formatDuration } from "date-fns";
import { useState } from "react";
import { deleteExerciseFromStorage } from "@/lib/actions";

interface ExerciseActivityInterface {
  title: string;
  startTime: string;
  duration: number;
  id: number;
  setExercise(ex: any): void;
}

function ExerciseActivity({
  title,
  startTime,
  duration,
  id,
  setExercise,
}: ExerciseActivityInterface) {
  const [pending, setPending] = useState(false);
  const icon = icons[title.toLowerCase()];
  const durationString = formatDuration(
    { minutes: duration },
    { format: ["hours", "minutes"], delimiter: " and " }
  );

  const handleDelete = async () => {
    setPending(true);
    await deleteExerciseFromStorage(id);
    setExercise(undefined);
    setPending(false);
  };

  return (
    <div className="flex gap-5 items-center">
      {icon}
      <div className="grow">
        <p className="text-lg">{title}</p>
        <p className="text-md">{`${startTime} - ${durationString}`}</p>
      </div>
      <button
        onClick={() => handleDelete()}
        className={Styles.rumble}
        disabled={pending}
      >
        <CloseOutlinedIcon className="text-4xl" />
      </button>
    </div>
  );
}

export default ExerciseActivity;
