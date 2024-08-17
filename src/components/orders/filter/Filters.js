import { CustomButton } from "@/components/ui";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import Accordion from "./accordion";

export default function Filters({ setFilters }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [status, setStatus] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [customDateRange, setCustomDateRange] = useState(["", ""]);
  const dropdownRef = useRef(null);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenFilter(false);
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

  const handleStatusChange = (event) => {
    const value = event.target.id;
    setStatus((prev) => {
      const newStatus = prev.includes(value)
        ? prev.filter((status) => status !== value)
        : [...prev, value];
      console.log("Updated Status:", newStatus);
      return newStatus;
    });
  };

  const handlePaymentStatusChange = (event) => {
    const value = event.target.id;
    setPaymentStatus((prev) =>
      prev.includes(value)
        ? prev.filter((status) => status !== value)
        : [...prev, value]
    );
  };

  const handleApplyFilters = () => {
    console.log("Applying Filters:", {
      dateCreated: selectedDate,
      status,
      paymentStatus,
      customDateRange,
    });
    setFilters({
      dateCreated: selectedDate,
      status,
      paymentStatus,
      customDateRange,
    });
    handleCloseFilter();
  };

  return (
    <>
      <div className="relative">
        <CustomButton
          onClick={handleOpenFilter}
          className="border border-custom-border"
        >
          <IoFilterOutline />
          Filter
        </CustomButton>
        {openFilter && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-12 right-0 w-[320px] bg-white rounded-lg shadow-md border border-custom-border z-10"
          >
            <div className="">
              <div className="flex items-center gap-3 px-5 py-5">
                <h4 className="text-base text-custom-text-1 font-semibold">
                  Filters your orders
                </h4>
                <button
                  className="text-sm text-custom-text-2 font-semibold underline"
                  onClick={() => {
                    setStatus([]);
                    setPaymentStatus([]);
                    setSelectedDate("");
                    setCustomDateRange(["", ""]);
                  }}
                >
                  Reset
                </button>
              </div>

              <div className="max-h-[400px] overflow-y-auto p-5 pt-0">
                {/* Date */}
                <Accordion title="Date Created">
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
                            setCustomDateRange([
                              e.target.value,
                              customDateRange[1],
                            ])
                          }
                        />
                        <input
                          type="date"
                          className="border border-gray-300 rounded-md px-3 py-2"
                          onChange={(e) =>
                            setCustomDateRange([
                              customDateRange[0],
                              e.target.value,
                            ])
                          }
                        />
                      </div>
                    )}
                  </div>
                </Accordion>

                {/* Status */}
                <Accordion title="Status">
                  <div className="text-sm text-custom-text-2 font-medium flex flex-col gap-4">
                    {[
                      "processing",
                      "shipped",
                      "delivered",
                      "cancelled",
                      "confirmed",
                    ].map((statusItem) => (
                      <div className="flex items-center gap-2" key={statusItem}>
                        <input
                          type="checkbox"
                          id={statusItem}
                          name="status"
                          checked={status.includes(statusItem)}
                          onChange={handleStatusChange}
                        />
                        <label className="cursor-pointer" htmlFor={statusItem}>
                          {statusItem.charAt(0).toUpperCase() +
                            statusItem.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </Accordion>

                {/* Payment Status */}
                <Accordion title="Payment Status">
                  <div className="text-sm text-custom-text-2 font-medium flex flex-col gap-4">
                    {[
                      "paid",
                      "unpaid",
                      "refunded",
                      "inProgress",
                      "canceled",
                    ].map((paymentStatusItem) => (
                      <div
                        className="flex items-center gap-2"
                        key={paymentStatusItem}
                      >
                        <input
                          type="checkbox"
                          id={paymentStatusItem}
                          name="paymentStatus"
                          checked={paymentStatus.includes(paymentStatusItem)}
                          onChange={handlePaymentStatusChange}
                        />
                        <label
                          className="cursor-pointer"
                          htmlFor={paymentStatusItem}
                        >
                          {paymentStatusItem.charAt(0).toUpperCase() +
                            paymentStatusItem.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </Accordion>
              </div>

              <div className="px-5 pt-4 pb-5 flex items-center justify-end gap-3">
                <CustomButton
                  onClick={handleCloseFilter}
                  className="border border-custom-border"
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  onClick={handleApplyFilters}
                  className="border border-custom-blue bg-custom-blue text-white"
                >
                  Apply Filter
                </CustomButton>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
