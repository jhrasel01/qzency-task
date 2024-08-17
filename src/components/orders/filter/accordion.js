"use client";

import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-custom-border rounded-lg mb-4 last:mb-0">
      <button
        onClick={toggleAccordion}
        className="w-full text-left text-sm text-custom-text-2 font-medium px-4 py-2 flex items-center justify-between bg-[#F9FAFB] rounded-lg"
      >
        <span>{title}</span>

        <MdKeyboardArrowDown
          className={`transition-transform duration-300 text-lg ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-4 bg-white border-t border-custom-border rounded-b-lg">
          {children}
        </div>
      )}
    </div>
  );
}
