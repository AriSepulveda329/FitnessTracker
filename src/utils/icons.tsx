import {
  DirectionsWalk,
  DirectionsRun,
  DirectionsBike,
  Pool,
  FitnessCenter,
  Sports,
} from "@mui/icons-material";

const icons = [
  { name: "Walk", icon: <DirectionsWalk fontSize="large" /> },
  { name: "Run", icon: <DirectionsRun fontSize="large" /> },
  { name: "Bike", icon: <DirectionsBike fontSize="large" /> },
  { name: "Swim", icon: <Pool fontSize="large" /> },
  { name: "Gym", icon: <FitnessCenter fontSize="large" /> },
  { name: "Other", icon: <Sports fontSize="large" /> },
];

export default icons;
