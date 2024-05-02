import { useMemo } from "react";

function useDate(date: Date) {
  const day = useMemo(() => date.getDay(), [date]);

  const formatTime = () => {
    const exactDate = new Date();
    let hours = exactDate.getHours();
    const minutes = exactDate.getMinutes();
    const ampm = hours >= 11 ? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12; // La hora "0" debe mostrarse como "12"

    return hours + ":" + (minutes < 10 ? "0" : "") + minutes + ampm;
  };

  const formatWeekDay = () => {
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      weekday: "long",
    });
    const day = date.getDate();
    let suffix = "th";

    if (day === 1 || day === 21 || day === 31) {
      suffix = "st";
    } else if (day === 2 || day === 22) {
      suffix = "nd";
    } else if (day === 3 || day === 23) {
      suffix = "rd";
    }

    return formattedDate.replace(/\d+/, day + suffix);
  };

  return { formatTime, day, formatWeekDay, date };
}

export default useDate;
