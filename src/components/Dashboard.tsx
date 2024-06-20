"use client";

import useDate from "@/hooks/useDate";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import LogoutButton from "./LogoutButton";

interface DashboardProps extends PropsWithChildren {
  username: string;
}

function Dashboard({ children, username }: DashboardProps) {
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
      <header className="flex items-center">
        <p className="text-3xl font-medium grow">Fitness Dashboard</p>
        <p className="text-lg mr-4">Bienvenido {username}!</p>
        <LogoutButton />
      </header>
      <p className="text-gray-500 text-xl my-3">{today}</p>
      <div className="grow flex flex-col">{children}</div>
    </main>
  );
}

export default Dashboard;
