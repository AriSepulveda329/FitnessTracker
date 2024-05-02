import React, { useCallback, useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Styles from "@/styles/styles.module.css";
import useStorage, { Exercise } from "@/hooks/useStorage";
import useDate from "@/hooks/useDate";
import caloriesPerActivity from "@/utils/caloriesPerActivity";

interface AddExerciseModal {
  isOpen: boolean;
  onClose(): void;
  saveActivities(activity: Exercise): void;
  exDay: number;
}

function AddExerciseModal({
  isOpen,
  onClose,
  saveActivities,
  exDay,
}: AddExerciseModal) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { saveExerciseOnStorage } = useStorage("exercise");
  const { date } = useDate(new Date());
  const [exercise, setExercise] = useState("Walk");
  const [hours, setHours] = useState("1");
  const [minutes, setMinutes] = useState("00");
  const [ampm, setAmpm] = useState("am");
  const [duration, setDuration] = useState(15);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const foundActivity = caloriesPerActivity.find(
      (act) => act.name === exercise
    );
    const newItem: Exercise = {
      id: date.toISOString(),
      exercise: exercise,
      weekDay: exDay,
      startTime: hours + ":" + minutes + " " + ampm,
      duration: duration,
      calories: foundActivity ? foundActivity.cpm * duration : 0,
    };
    saveExerciseOnStorage(newItem);
    saveActivities(newItem);
    setExercise("Walk");
    setHours("1");
    setMinutes("00");
    setAmpm("am");
    setDuration(15);
    onClose();
  };

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
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label>Pick an Exercise:</label>
          <select
            className="my-2 border border-gray-400 rounded-md p-1 hover:ring-1"
            onChange={(e) => setExercise(e.target.value)}
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
              onChange={(e) => setHours(e.target.value)}
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
              onChange={(e) => setMinutes(e.target.value)}
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
              onChange={(e) => setAmpm(e.target.value)}
            >
              <option value="am">AM</option>
              <option value="pm">PM</option>
            </select>
          </section>
          <label>Choose a Duration:</label>
          <select
            className="my-2 border border-gray-400 rounded-lg p-1 hover:ring-1"
            onChange={(e) => setDuration(parseInt(e.target.value))}
          >
            <option value={15}>15 min</option>
            <option value={30}>30 min</option>
            <option value={45}>45 min</option>
            <option value={60}>1 hr</option>
            <option value={90}>1.5 hrs</option>
            <option value={120}>2 hrs</option>
          </select>
          <button
            type="submit"
            className="mt-2 bg-green-400 rounded-full text-white py-1 hover:bg-green-500 transition-colors"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddExerciseModal;
