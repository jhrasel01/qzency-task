"use client";

import { CustomButton } from "@/components/ui";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";

export default function DatePicker({ setFilters }) {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [customDateRange, setCustomDateRange] = useState(["", ""]);
  const dropdownRef = useRef(null);

  const handleOpenDatePicker = () => {
    setOpenDatePicker(true);
  };

  const handleCloseDatePicker = () => {
    setOpenDatePicker(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDatePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.id);
  };

  const handleApplyDateFilter = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      dateCreated: selectedDate,
      customDateRange,
    }));
    handleCloseDatePicker();
  };

  return (
    <div className="relative">
      <CustomButton
        onClick={handleOpenDatePicker}
        className="border border-custom-border"
      >
        <IoCalendarOutline />
        Select Dates
      </CustomButton>
      {openDatePicker && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-12 left-0 w-[320px] bg-white rounded-lg shadow-md border border-custom-border z-10"
        >
          <div className="p-5">
            <div className="text-sm text-custom-text-2 font-medium flex flex-col gap-4">
              {["all", "week", "month", "month3", "year", "custom"].map(
                (date) => (
                  <div className="flex items-center gap-2" key={date}>
                    <input
                      type="radio"
                      id={date}
                      name="dateCreated"
                      checked={selectedDate === date}
                      onChange={handleDateChange}
                    />
                    <label className="cursor-pointer" htmlFor={date}>
                      {date === "custom"
                        ? "Custom date"
                        : date === "all"
                        ? "All time"
                        : `Last ${
                            date === "week"
                              ? "week"
                              : date === "month"
                              ? "month"
                              : date === "month3"
                              ? "3 months"
                              : date === "year"
                              ? "year"
                              : ""
                          }`}
                    </label>
                  </div>
                )
              )}
              {selectedDate === "custom" && (
                <div className="flex flex-col gap-2 mt-1">
                  <input
                    type="date"
                    className="border border-gray-300 rounded-md px-3 py-2"
                    onChange={(e) =>
                      setCustomDateRange([e.target.value, customDateRange[1]])
                    }
                  />
                  <input
                    type="date"
                    className="border border-gray-300 rounded-md px-3 py-2"
                    onChange={(e) =>
                      setCustomDateRange([customDateRange[0], e.target.value])
                    }
                  />
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <CustomButton
                onClick={handleCloseDatePicker}
                className="border border-custom-border"
              >
                Cancel
              </CustomButton>
              <CustomButton
                onClick={handleApplyDateFilter}
                className="border border-custom-blue bg-custom-blue text-white"
              >
                Apply
              </CustomButton>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
