"use client";

import { UserErrors, signup } from "@/lib/actions";
import React from "react";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";

function RegisterForm() {
  const [state, formAction] = useFormState<
    { errors: UserErrors | null },
    FormData
  >(signup, { errors: null });

  return (
    <form className="flex w-full flex-col gap-y-4" action={formAction}>
      <fieldset>
        <label className="block font-medium mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="w-full px-3 py-2 border rounded appearance-none focus:outline-none focus:ring-2"
          type="text"
          id="name"
          name="name"
          placeholder="John Doe."
          required
        />
      </fieldset>
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
      <fieldset>
        <label className="block font-medium mb-2" htmlFor="height">
          Height
        </label>
        <div className="flex">
          <input
            className="w-full px-3 py-2 border rounded appearance-none focus:outline-none focus:ring-2"
            type="number"
            id="height"
            name="height"
            placeholder="140"
            min={4}
            max={280}
            required
          />
          <ul className="flex">
            <li>
              <input
                type="radio"
                id="cm"
                name="heightFormat"
                value="cm"
                className="hidden peer"
                defaultChecked
              />
              <label
                htmlFor="cm"
                className="flex items-center justify-center w-16 h-full border ml-2 rounded-l cursor-pointer peer-checked:bg-green-500 peer-checked:text-white peer-checked:border-none"
              >
                cm.
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="ft"
                name="heightFormat"
                value="ft"
                className="hidden peer"
              />
              <label
                htmlFor="ft"
                className="flex items-center justify-center w-16 h-full border rounded-r cursor-pointer peer-checked:bg-green-500 peer-checked:text-white peer-checked:border-none"
              >
                ft.
              </label>
            </li>
          </ul>
        </div>
      </fieldset>
      <fieldset>
        <label className="block font-medium mb-2" htmlFor="wheight">
          Wheight
        </label>
        <div className="flex">
          <input
            className="w-full px-3 py-2 border rounded appearance-none focus:outline-none focus:ring-2"
            type="number"
            id="wheight"
            name="wheight"
            placeholder="30"
            min={20}
            max={1100}
            required
          />
          <ul className="flex">
            <li>
              <input
                type="radio"
                id="kg"
                name="wheightFormat"
                value="kg"
                className="hidden peer"
                defaultChecked
              />
              <label
                htmlFor="kg"
                className="flex items-center justify-center w-16 h-full border ml-2 rounded-l cursor-pointer peer-checked:bg-green-500 peer-checked:text-white peer-checked:border-none"
              >
                kg.
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="lb"
                name="wheightFormat"
                value="lb"
                className="hidden peer"
              />
              <label
                htmlFor="lb"
                className="flex items-center justify-center w-16 h-full border rounded-r cursor-pointer peer-checked:bg-green-500 peer-checked:text-white peer-checked:border-none"
              >
                lb.
              </label>
            </li>
          </ul>
        </div>
      </fieldset>
      {state.errors && (
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

export default RegisterForm;
