import AddButton from "@/components/AddButton";
import ItemsChart from "@/components/ItemsChart";
import ItemsTable from "@/components/ItemsTable";

function StatPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <ItemsChart slug={params.slug} />
      <ItemsTable type={params.slug} AddButton={AddButton} />
    </>
  );
}

export default StatPage;
