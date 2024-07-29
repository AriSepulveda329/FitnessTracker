import { SvgIconProps } from "@mui/material";
import styles from "../styles/styles.module.css";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { getActivitiesByName } from "@/lib/activities";

interface StatsCardInterface {
  title: string;
  logo: React.ReactElement<SvgIconProps>;
  subtitle: string;
  tableName: string;
  bgColor: string;
  url: string;
  typeData: string;
}

async function StatsCard({
  title,
  logo,
  subtitle,
  tableName,
  bgColor,
  url,
  typeData,
}: StatsCardInterface) {
  const activities = await getActivitiesByName(tableName);
  const date = new Date();
  const todayActivities = activities.filter(
    (act) => act.weekday == date.getDay()
  );
  const totalValues =
    todayActivities.length > 0
      ? todayActivities.reduce((acc, curr) => acc + curr.value, 0)
      : 0;

  return (
    <Link
      className={`${bgColor} ${styles.statCard} flex flex-col justify-evenly items-center w-72 min-h-80 text-white py-5 rounded-xl shadow-lg cursor-pointer`}
      href={url}
    >
      <p className="font-semibold text-xl">{title}</p>
      {logo}
      <p className="text-lg">{subtitle}</p>
      <p className="relative overflow-hidden w-full text-center">
        <span className={`${styles.statText} font-medium text-2xl`}>
          {totalValues + " " + typeData}
        </span>
        <span
          className={`${styles.addDataText} font-medium text-2xl ${bgColor} w-52`}
        >
          <AddIcon /> Add Data
        </span>
      </p>
    </Link>
  );
}

export default StatsCard;
