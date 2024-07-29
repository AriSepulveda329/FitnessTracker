import { getActivitiesByName } from "@/lib/activities";
import StatsChart from "./StatsChart";
import { Suspense } from "react";

async function ItemsChart({ slug }: { slug: string }) {
  const activities = await getActivitiesByName(slug);

  return (
    <section className="w-full h-80 text-white text-2xl flex justify-center items-center mb-10">
      <StatsChart activities={activities} />
    </section>
  );
}

export default ItemsChart;
