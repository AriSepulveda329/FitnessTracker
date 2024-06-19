import BackButton from "@/components/BackButton";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function Layout({ children }: { children: React.ReactNode }) {
  const { user } = await verifyAuth();

  if (!user) return redirect("/");
  return (
    <main className="py-8 grid grid-cols-4">
      <div className="col-span-2 col-start-2">
        <BackButton />
        {children}
      </div>
    </main>
  );
}

export default Layout;
