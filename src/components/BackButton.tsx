"use client";

import styles from "@/styles/styles.module.css";
import { useRouter } from "next/navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function BackButton() {
  const router = useRouter();

  return (
    <nav
      className={`${styles.backButton} mb-3 cursor-pointer text-lg flex items-center w-fit`}
      onClick={() => router.back()}
    >
      <ChevronLeftIcon />
      Home
    </nav>
  );
}

export default BackButton;
