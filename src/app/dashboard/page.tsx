"use client";

import CaloriesCard from "@/components/CaloriesCard";
import ExerciseCard from "@/components/ExerciseCard";
import StatsCard from "@/components/StatsCard";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import BedIcon from "@mui/icons-material/Bed";
import React, { useCallback, useEffect, useMemo } from "react";
import useDate from "@/hooks/useDate";
import { MyContextProvider } from "@/utils/MyContext";

export default function Home() {
  const { formatWeekDay, day, date } = useDate(new Date());

  const today = useMemo(() => formatWeekDay(), [formatWeekDay]);

  // Función para borrar el localStorage
  const eraseLocalStorage = useCallback(() => {
    localStorage.clear();
    localStorage.setItem("lastErased", date.toISOString());
  }, [date]);

  // Verificar si hoy es lunes (día 1)
  const isMonday = useMemo(() => {
    return day === 1; // 1 es lunes
  }, [day]);

  useEffect(() => {
    const lastErased = localStorage.getItem("lastErased");
    if (
      isMonday &&
      (!lastErased || new Date(lastErased).getDate() !== new Date().getDate())
    ) {
      eraseLocalStorage();
    }
  }, [isMonday, eraseLocalStorage]);

  return (
    <main className="flex flex-col p-8 h-screen">
      <header>
        <p className="text-3xl font-medium">Fitness Dashboard</p>
        <p className="text-gray-500 text-xl my-3">{today}</p>
      </header>
      <div className="grow flex flex-col">
        <section className="flex justify-between gap-32 my-5 grow">
          <StatsCard
            url="../stats/activity"
            bgColor="bg-red-500"
            title="Activity"
            logo={<DirectionsRunIcon className="text-7xl" />}
            subtitle="Time"
            tableName="activity"
            typeData="mins"
          />
          <StatsCard
            url="../stats/water"
            bgColor="bg-blue-500"
            title="Water"
            logo={<LocalDrinkIcon className="text-7xl" />}
            subtitle="Glasses"
            tableName="water"
            typeData="glasses"
          />
          <StatsCard
            url="../stats/goal"
            bgColor="bg-orange-400"
            title="Goal"
            logo={<SportsScoreIcon className="text-7xl" />}
            subtitle="Distance"
            tableName="goal"
            typeData="meters"
          />
          <StatsCard
            url="../stats/sleep"
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
      </div>
    </main>
  );
}
