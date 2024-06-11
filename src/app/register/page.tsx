"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Register() {
  const [name, setName] = useState("");
  const [wheight, setWheight] = useState<number>();
  const [heightFormat, setHeightFormat] = useState<"cm" | "ft">("cm");
  const [height, setHeight] = useState<number>();
  const [wheightFormat, setWheightFormat] = useState<"kg" | "lb">("kg");
  const router = useRouter();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, wheight, heightFormat, height, wheightFormat);
    router.push("/");
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-green-100">
      <div className="flex bg-white flex-col items-center p-8 rounded-lg shadow-md">
        <p className="text-2xl font-medium mb-2">Welcome!</p>
        <p className="mb-6">Could you tell us about you before we start?</p>
        <form
          className="flex w-full flex-col gap-y-4"
          onSubmit={(e) => submitHandler(e)}
        >
          <div>
            <label className="block font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded appearance-none focus:outline-none focus:ring-2"
              type="text"
              id="name"
              placeholder="John Doe."
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-2" htmlFor="height">
              Height
            </label>
            <section className="flex">
              <input
                className="w-full px-3 py-2 border rounded appearance-none focus:outline-none focus:ring-2"
                type="number"
                id="height"
                placeholder="140"
                min={100}
                max={300}
                onChange={(e) => setHeight(parseInt(e.target.value))}
              />
              <ul className="flex">
                <li>
                  <input
                    type="radio"
                    id="cm"
                    name="heightFormat"
                    value="cm"
                    className="hidden peer"
                    onChange={(e) => setHeightFormat(e.target.value as "cm")}
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
                    onChange={(e) => setHeightFormat(e.target.value as "ft")}
                  />
                  <label
                    htmlFor="ft"
                    className="flex items-center justify-center w-16 h-full border rounded-r cursor-pointer peer-checked:bg-green-500 peer-checked:text-white peer-checked:border-none"
                  >
                    ft.
                  </label>
                </li>
              </ul>
            </section>
          </div>
          <div>
            <label className="block font-medium mb-2" htmlFor="wheight">
              Wheight
            </label>
            <section className="flex">
              <input
                className="w-full px-3 py-2 border rounded appearance-none focus:outline-none focus:ring-2"
                type="number"
                id="wheight"
                placeholder="30"
                min={15}
                max={300}
                onChange={(e) => setWheight(parseInt(e.target.value))}
              />
              <ul className="flex">
                <li>
                  <input
                    type="radio"
                    id="kg"
                    name="wheightFormat"
                    value="kg"
                    className="hidden peer"
                    onChange={(e) => setWheightFormat(e.target.value as "kg")}
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
                    onChange={(e) => setWheightFormat(e.target.value as "lb")}
                  />
                  <label
                    htmlFor="lb"
                    className="flex items-center justify-center w-16 h-full border rounded-r cursor-pointer peer-checked:bg-green-500 peer-checked:text-white peer-checked:border-none"
                  >
                    lb.
                  </label>
                </li>
              </ul>
            </section>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white w-full py-2 mt-4 rounded hover:bg-green-600 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
