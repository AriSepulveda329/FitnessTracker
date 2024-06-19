import styles from "@/styles/styles.module.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Link from "next/link";

function BackButton() {
  return (
    <Link
      className={`${styles.backButton} mb-3 cursor-pointer text-lg flex items-center w-fit`}
      href={"/dashboard"}
    >
      <ChevronLeftIcon />
      Dashboard
    </Link>
  );
}

export default BackButton;
