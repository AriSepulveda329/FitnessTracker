import RegisterForm from "@/components/RegisterForm";
import { verifyAuth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Register() {
  const { user } = await verifyAuth();

  if (user) return redirect("/dashboard");

  return (
    <main className="flex w-screen h-screen justify-center items-center bg-green-100">
      <section className="flex bg-white flex-col items-center p-8 rounded-lg shadow-md w-[24rem]">
        <p className="text-2xl font-medium mb-2">Welcome!</p>
        <p className="mb-6">Tell us about you before we start!</p>
        <RegisterForm />
        <Link href={"/login"} className="mt-4 text-green-600 hover:underline">
          I already have an account
        </Link>
      </section>
    </main>
  );
}

export default Register;
