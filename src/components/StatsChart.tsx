"use client";

import { Activity } from "@/lib/activities";
import { LineChart } from "@mui/x-charts/LineChart";
import React, { useCallback, useEffect, useMemo } from "react";

const weekDays = ["M", "T", "W", "Th", "F", "Sa", "S"];

function StatsChart({ activities }: { activities: Activity[] }) {
  const getItemsData = useCallback(() => {
    interface DataItem {
      weekday: number;
      value: number;
    }

    if (!activities) return null;
    const reducedItems = activities.reduce(
      (acc: DataItem[], { weekday, value }: DataItem) => {
        if (!acc[weekday - 1]) acc[weekday - 1] = { weekday, value: 0 };
        acc[weekday - 1].value += value;
        return acc;
      },
      [] as DataItem[]
    );

    let weekDataset: number[] = [];

    for (let i = 1; i <= 7; i++) {
      const foundItem =
        i < 7
          ? reducedItems.find((item) => item?.weekday == i)
          : reducedItems.find((item) => item?.weekday == 0);
      if (foundItem) weekDataset.push(foundItem.value);
      else weekDataset.push(0);
    }

    return weekDataset;
  }, [activities]);

  const activitiesData = useMemo(() => getItemsData(), [getItemsData]) || [];
  return (
    <LineChart
      xAxis={[{ data: weekDays, scaleType: "band" }]}
      series={[{ data: activitiesData }]}
    />
  );
}

export default StatsChart;
