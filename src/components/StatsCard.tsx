"use client";

import { SvgIconProps } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../styles/styles.module.css";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import useStorage from "@/hooks/useStorage";
import Link from "next/link";

interface StatsCardInterface {
  title: string;
  logo: React.ReactElement<SvgIconProps>;
  subtitle: string;
  tableName: string;
  bgColor: string;
  url: string;
  typeData: string;
}

interface Item {
  id: Date;
  value: number;
  weekDay: number;
  time: string;
}

function StatsCard({
  title,
  logo,
  subtitle,
  tableName,
  bgColor,
  url,
  typeData,
}: StatsCardInterface) {
  const router = useRouter();
  const [totalValues, setTotalValues] = useState(0);
  const [items, setItems] = useState<Item[]>();
  const { getItemsFromStorage } = useStorage(tableName);

  useEffect(() => {
    setItems(getItemsFromStorage());
  }, [getItemsFromStorage]);

  useEffect(() => {
    const total = items?.reduce((acc, curr) => acc + curr.value, 0);
    setTotalValues(total || 0);
  }, [items]);

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
