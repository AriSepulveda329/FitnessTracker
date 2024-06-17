"use client";
import React from "react";

function Error({ error }: { error: unknown }) {
  return (
    <main className="flex w-screen h-screen justify-center items-center bg-green-100">
      <section className="flex bg-white flex-col items-baseline p-8 rounded-lg shadow-md w-1/4">
        <p className="text-2xl font-medium mb-4">
          There was an error registering your account.
        </p>
        <p>Please, check the info you entered and try again later.</p>
      </section>
    </main>
  );
}

export default Error;
