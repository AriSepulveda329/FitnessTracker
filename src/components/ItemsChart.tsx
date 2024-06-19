"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import useStorage, { Item } from "@/hooks/useStorage";

const weekDays = ["M", "T", "W", "Th", "F", "Sa", "S"];

function ItemsChart({ slug }: { slug: string }) {
  const [items, setItems] = useState<Item[]>();
  const { getItemsFromStorage } = useStorage(slug);

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
    setItems(getItemsFromStorage());
  }, [getItemsFromStorage]);

  return (
    <section className="w-full h-80 text-white text-2xl flex justify-center items-center mb-10">
      <LineChart
        xAxis={[{ data: weekDays, scaleType: "band" }]}
        series={[{ data: activitiesData }]}
      />
    </section>
  );
}

export default ItemsChart;
