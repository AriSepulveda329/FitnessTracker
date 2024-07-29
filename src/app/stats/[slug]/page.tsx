import AddButton from "@/components/AddButton";
import DropdownButton from "@/components/DropdownButton";
import ItemsChart from "@/components/ItemsChart";
import ItemsTable from "@/components/ItemsTable";
import { Suspense } from "react";

function StatPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <ItemsChart slug={params.slug} />
      <Suspense fallback={"Loading..."}>
        <ItemsTable
          type={params.slug}
          AddButton={AddButton}
          DropdownButton={DropdownButton}
        />
      </Suspense>
    </>
  );
}

export default StatPage;
