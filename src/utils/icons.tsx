import {
  DirectionsWalk,
  DirectionsRun,
  DirectionsBike,
  Pool,
  FitnessCenter,
  Sports,
  SvgIconComponent,
} from "@mui/icons-material";

type IconsType = {
  [index: string]: JSX.Element;
};

const icons: IconsType = {
  walk: <DirectionsWalk fontSize="large" />,
  run: <DirectionsRun fontSize="large" />,
  bike: <DirectionsBike fontSize="large" />,
  swim: <Pool fontSize="large" />,
  gym: <FitnessCenter fontSize="large" />,
  other: <Sports fontSize="large" />,
};

export default icons;
