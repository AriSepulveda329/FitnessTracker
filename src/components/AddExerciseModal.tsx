"use client";

import React, { useCallback, useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Styles from "@/styles/styles.module.css";
import { useFormState } from "react-dom";
import { ExerciseErrors, saveExerciseOnStorage } from "@/lib/actions";
import SubmitButton from "./SubmitButton";

interface AddExerciseModal {
  isOpen: boolean;
  onClose(): void;
  exDay: number;
}

function AddExerciseModal({ isOpen, onClose, exDay }: AddExerciseModal) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [state, formAction] = useFormState<
    { errors: ExerciseErrors | null },
    FormData
  >(saveExerciseOnStorage, { errors: null });

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  useEffect(() => {
    if (!state.errors) {
      onClose();
    }
  }, [state]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bg-black w-screen top-0 left-0 z-10 h-screen bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-96" ref={modalRef}>
        <section className={`${Styles.rumble} flex`}>
          <h1 className="text-lg font-medium mb-2 grow">Add Exercise</h1>
          <CloseIcon className="cursor-pointer" onClick={() => onClose()} />
        </section>
        <form className="flex flex-col" action={formAction}>
          <input
            type="number"
            id="dow"
            name="dow"
            value={exDay}
            className=" hidden"
          />
          <label>Pick an Exercise:</label>
          <select
            className="my-2 border border-gray-400 rounded-md p-1 hover:ring-1"
            id="exercise_name"
            name="exercise_name"
          >
            <option value="Walk">Walk</option>
            <option value="Run">Run</option>
            <option value="Bike">Biking</option>
            <option value="Swim">Swim</option>
            <option value="Gym">Gym</option>
            <option value="Other">Other Activity</option>
          </select>
          <label>Choose a Start Time:</label>
          <section className="flex gap-3 my-2">
            <select
              className="border border-gray-400 rounded-md p-1 grow hover:ring-1"
              id="hours"
              name="hours"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="12">11</option>
              <option value="12">12</option>
            </select>
            <select
              className="border border-gray-400 rounded-lg p-1 grow hover:ring-1"
              id="minutes"
              name="minutes"
            >
              <option value="00">00</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="35">35</option>
              <option value="40">40</option>
              <option value="45">45</option>
              <option value="50">50</option>
              <option value="55">55</option>
              <option value="60">60</option>
            </select>
            <select
              className="border border-gray-400 rounded-lg p-1 grow hover:ring-1"
              id="ampm"
              name="ampm"
            >
              <option value="am">AM</option>
              <option value="pm">PM</option>
            </select>
          </section>
          <label>Choose a Duration:</label>
          <select
            className="my-2 border border-gray-400 rounded-lg p-1 hover:ring-1"
            id="duration"
            name="duration"
          >
            <option value={15}>15 min</option>
            <option value={30}>30 min</option>
            <option value={45}>45 min</option>
            <option value={60}>1 hr</option>
            <option value={90}>1.5 hrs</option>
            <option value={120}>2 hrs</option>
          </select>
          {state?.errors && (
            <ul id="form-errors" className="text-red-500">
              {Object.keys(state.errors).map(
                (error) =>
                  state.errors && <li key={error}>{state.errors[error]}</li>
              )}
            </ul>
          )}
          <SubmitButton text="Add" />
        </form>
      </div>
    </div>
  );
}

export default AddExerciseModal;
