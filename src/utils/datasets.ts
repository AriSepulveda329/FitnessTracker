export const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type ItemUnitsType = {
  [index: string]: { measure: string; unit: string };
};

export const ItemUnits: ItemUnitsType = {
  water: {
    measure: "Glasses",
    unit: "glass",
  },
  sleep: {
    measure: "Time",
    unit: "hrs.",
  },
  goal: {
    measure: "Distance",
    unit: "m.",
  },
  activity: {
    measure: "Time",
    unit: "mins.",
  },
};
