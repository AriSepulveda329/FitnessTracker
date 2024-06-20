import CaloriesCard from "@/components/CaloriesCard";
import ExerciseCard from "@/components/ExerciseCard";
import StatsCard from "@/components/StatsCard";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import BedIcon from "@mui/icons-material/Bed";
import { MyContextProvider } from "@/utils/MyContext";
import { verifyAuth } from "@/lib/auth";
import Dashboard from "@/components/Dashboard";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user, data } = await verifyAuth();

  if (!user) return redirect("/");

  return (
    <Dashboard username={data.name}>
      <section className="flex justify-between gap-32 my-5 grow">
        <StatsCard
          url="/stats/activity"
          bgColor="bg-red-500"
          title="Activity"
          logo={<DirectionsRunIcon className="text-7xl" />}
          subtitle="Time"
          tableName="activity"
          typeData="mins"
        />
        <StatsCard
          url="/stats/water"
          bgColor="bg-blue-500"
          title="Water"
          logo={<LocalDrinkIcon className="text-7xl" />}
          subtitle="Glasses"
          tableName="water"
          typeData="glasses"
        />
        <StatsCard
          url="/stats/goal"
          bgColor="bg-orange-400"
          title="Goal"
          logo={<SportsScoreIcon className="text-7xl" />}
          subtitle="Distance"
          tableName="goal"
          typeData="meters"
        />
        <StatsCard
          url="/stats/sleep"
          bgColor="bg-green-400"
          title="Sleep"
          logo={<BedIcon className="text-7xl" />}
          subtitle="Hours slept"
          tableName="sleep"
          typeData="hrs"
        />
      </section>
      <section className="flex gap-32">
        <MyContextProvider>
          <ExerciseCard />
          <CaloriesCard />
        </MyContextProvider>
      </section>
    </Dashboard>
  );
}
