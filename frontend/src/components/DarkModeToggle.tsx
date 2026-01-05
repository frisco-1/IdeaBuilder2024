import { useEffect, useState } from "react";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Toggle dark mode"
      className={`
        relative flex items-center w-16 h-8 rounded-full border transition-colors duration-300
        ${dark ? "bg-gray-800 border-gray-700" : "bg-gray-200 border-gray-300"}
      `}
    >
      {/* Sun Icon */}
      <IoSunnyOutline
        className={`absolute left-1 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-300
          ${dark ? "text-gray-400" : "text-yellow-500"}
        `}
      />

      {/* Moon Icon */}
      <IoMoonOutline
        className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-300
          ${dark ? "text-white" : "text-gray-500"}
        `}
      />

      {/* Slider Knob */}
      <span
        className={`
          absolute top-0.5 left-0.5 h-7 w-7 rounded-full bg-white shadow-md transform transition-transform duration-300
          ${dark ? "translate-x-8" : "translate-x-0"}
        `}
      />
    </button>
  );
}