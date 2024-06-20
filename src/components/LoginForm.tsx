"use client";

import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import { UserErrors, login } from "@/lib/actions";

function LoginForm() {
  const [state, formAction] = useFormState<
    { errors: UserErrors | null } | undefined,
    FormData
  >(login, { errors: null });

  return (
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
  );
}

export default LoginForm;
