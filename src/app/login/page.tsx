"use client";

import SubmitButton from "@/components/SubmitButton";
import { UserErrors, login } from "@/lib/actions";
import React from "react";
import { useFormState } from "react-dom";

function LoginPage() {
  const [state, formAction] = useFormState<
    { errors: UserErrors | null } | undefined,
    FormData
  >(login, { errors: null });
  return (
    <main className="flex w-screen h-screen justify-center items-center bg-green-100">
      <section className="flex bg-white flex-col items-center p-8 rounded-lg shadow-md w-[24rem]">
        <p className="text-2xl font-medium mb-2">Welcome!</p>
        <form className="flex w-full flex-col gap-y-4" action={formAction}>
          <fieldset>
            <label className="block font-medium mb-2" htmlFor="name">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded appearance-none focus:outline-none focus:ring-2"
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@email.com"
              required
            />
          </fieldset>
          {state?.errors && (
            <ul id="form-errors" className="text-red-500">
              {Object.keys(state.errors).map(
                (error) =>
                  state.errors && <li key={error}>{state.errors[error]}</li>
              )}
            </ul>
          )}
          <SubmitButton />
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
