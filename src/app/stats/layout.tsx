"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { usePathname, useRouter } from "next/navigation";
import styles from "@/styles/styles.module.css";
import useStorage, { Item } from "@/hooks/useStorage";
import { LineChart } from "@mui/x-charts/LineChart";

const weekDays = ["M", "T", "W", "Th", "F", "Sa", "S"];

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [pageName, setPageName] = useState("");
  const { getItemsFromStorage } = useStorage(pageName);
  const [items, setItems] = useState<Item[]>();

  const getItemsData = useCallback(() => {
    interface DataItem {
      weekDay: number;
      value: number;
    }

    if (!items) return null;
    const reducedItems = items.reduce(
      (acc: DataItem[], { weekDay, value }: DataItem) => {
        if (!acc[weekDay]) acc[weekDay] = { weekDay, value: 0 };
        acc[weekDay].value += value;
        return acc;
      },
      [] as DataItem[]
    );

    let weekDataset: number[] = [];

    for (let i = 1; i <= 7; i++) {
      const foundItem =
        i < 7
          ? reducedItems.find((item) => item?.weekDay === i)
          : reducedItems.find((item) => item?.weekDay === 0);
      if (foundItem) weekDataset.push(foundItem.value);
      else weekDataset.push(0);
    }

    return weekDataset;
  }, [items]);

  const activitiesData = useMemo(() => getItemsData(), [getItemsData]) || [];

  useEffect(() => {
    setPageName(pathname.split("/")[2]);
  }, [pathname]);

  useEffect(() => {
    setItems(getItemsFromStorage());
  }, [getItemsFromStorage]);

  return (
    <div className="py-8 grid grid-cols-4">
      <div className="col-span-2 col-start-2">
        <h1
          className={`${styles.backButton} mb-3 cursor-pointer text-lg flex items-center w-fit`}
          onClick={() => router.back()}
        >
          <ChevronLeftIcon />
          Home
        </h1>
        <div className="w-full h-80 text-white text-2xl flex justify-center items-center mb-10">
          <LineChart
            xAxis={[{ data: weekDays, scaleType: "band" }]}
            series={[{ data: activitiesData }]}
          />
        </div>
        {children}
      </div>
    </div>
  );
}

export default Layout;
