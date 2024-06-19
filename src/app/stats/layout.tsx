import BackButton from "@/components/BackButton";

function Layout({ children }: { children: React.ReactNode }) {
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
