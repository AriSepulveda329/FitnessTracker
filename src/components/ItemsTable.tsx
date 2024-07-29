import { ItemUnits } from "@/utils/datasets";
import { DropDownButtonProps } from "./DropdownButton";
import { getActivitiesByName } from "@/lib/activities";
import { format } from "date-fns";

interface ItemsTableProps {
  type: string;
  AddButton: React.ComponentType;
  DropdownButton: React.ComponentType<DropDownButtonProps>;
}

async function ItemsTable({
  type,
  AddButton,
  DropdownButton,
}: ItemsTableProps) {
  const activities = await getActivitiesByName(type);
  const date = new Date();
  const todayActivities = activities.filter(
    (act) => act.weekday == date.getDay()
  );

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-xl font-medium">Add {ItemUnits[type].measure}</h1>
      <section className="flex gap-4 relative">
        <div className="flex justify-center shadow-md py-2 px-7 rounded-lg w-20">
          {todayActivities
            ? todayActivities.reduce((acc, { value }) => acc + value, 0)
            : 0}
        </div>
        {type === "water" ? <AddButton /> : <DropdownButton type={type} />}
      </section>
      <div className="flex flex-col bg-gray-200 w-full rounded-lg">
        {todayActivities.length > 0 ? (
          todayActivities.map((item, index) => {
            const time = format(new Date(item.time), "h:mm aaa");
            return (
              <p
                key={index}
                className={`flex justify-between ${
                  index === activities.length - 1 || "border-b-2"
                } border-gray-300 py-2 px-4`}
              >
                <span>
                  {item.value} {ItemUnits[type].unit}
                </span>
                <span>{time}</span>
              </p>
            );
          })
        ) : (
          <p className="p-10 text-center font-medium">Not Data Yet</p>
        )}
      </div>
    </div>
  );
}

export default ItemsTable;
