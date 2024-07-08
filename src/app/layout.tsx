import type { Metadata } from "next";
import { roboto } from "../ui/fonts";
import "./global.css";

export const metadata: Metadata = {
  title: "Fitness Tracker",
  description: "Portfolio project by Ari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className={`${roboto.className} h-full`}>{children}</body>
    </html>
  );
}
