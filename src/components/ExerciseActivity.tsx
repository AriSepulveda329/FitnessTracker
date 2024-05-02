import React, { useMemo } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Styles from "@/styles/styles.module.css";
import icons from "@/utils/icons";

interface ExerciseActivityInterface {
  title: string;
  startTime: string;
  duration: number;
  handleDelete(): void;
}

function ExerciseActivity({
  title,
  startTime,
  duration,
  handleDelete,
}: ExerciseActivityInterface) {
  const icon = useMemo(() => icons.find((i) => i.name === title), [title]);

  const durationToString = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const extraMins = mins % 60;
    const hourFormat = hours > 1 ? hours + " hrs" : hours + " hr";
    const minFormat = mins > 59 ? extraMins + " mins" : mins + " mins";
    return hours >= 1 ? `${hourFormat} ${minFormat}` : minFormat;
  };

  const durationString = useMemo(() => durationToString(duration), [duration]);

  return (
    <div className="flex gap-5 items-center">
      {icon?.icon}
      <div className="grow">
        <p className="text-lg">{title}</p>
        <p className="text-md">{`${startTime} - ${durationString}`}</p>
      </div>
      <button onClick={() => handleDelete()} className={Styles.rumble}>
        <CloseOutlinedIcon className="text-4xl" />
      </button>
    </div>
  );
}

export default ExerciseActivity;
