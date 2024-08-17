"use client";

import { useMemo } from "react";
import { CiCalendar } from "react-icons/ci";

export default function OrderCount({ orders }) {
  // totalRevenue
  const totalRevenue = useMemo(() => {
    return orders
      .filter((order) => order.status.toLowerCase() === "delivered")
      .reduce((acc, order) => acc + order.totalAmount.grandTotal, 0);
  }, [orders]);

  // totalOrderItems
  const totalOrderItems = useMemo(() => {
    return orders.reduce(
      (acc, order) =>
        acc +
        order.products.reduce(
          (subAcc, product) => subAcc + product.quantity,
          0
        ),
      0
    );
  }, [orders]);

  // Return Items
  const totalReturnItems = useMemo(() => {
    return orders.filter((order) => order.status.toLowerCase() === "return")
      .length;
  }, [orders]);

  // totalFulfilledOrders
  const totalFulfilledOrders = useMemo(() => {
    return orders.filter((order) => order.status.toLowerCase() === "delivered")
      .length;
  }, [orders]);

  return (
    <>
      <div className="p-5 flex flex-col laptop:flex-row items-center gap-5">
        {/* select date */}
        <div className="text-custom-text-2 font-normal text-sm flex items-center gap-2 rounded-lg border border-custom-border py-4 px-4 w-[150px]">
          <CiCalendar className="text-2xl" />
          Select Dates
        </div>

        <ul className="grid grid-cols-2 tab:grid-cols-4 items-center gap-2 rounded-lg border border-custom-border  laptop:w-[calc(100%-170px)]">
          <li className="border-b tab:border-b-0 border-r border-custom-border py-[7px] px-4">
            <h6 className="text-sm font-medium text-custom-text-2">
              Total Revenue
            </h6>
            <h4 className="text-base font-bold text-custom-text-1">
              ৳ {totalRevenue.toFixed(2)}
            </h4>
          </li>

          <li className="border-b tab:border-b-0 border-r border-custom-border py-[7px] px-4">
            <h6 className="text-sm font-medium text-custom-text-2">
              Order item
            </h6>
            <h4 className="text-base font-bold text-custom-text-1">
              {totalOrderItems}
            </h4>
          </li>

          <li className="border-r border-custom-border py-[7px] px-4">
            <h6 className="text-sm font-medium text-custom-text-2">
              Return item
            </h6>
            <h4 className="text-base font-bold text-custom-text-1">
              {totalReturnItems}
            </h4>
          </li>

          <li className="py-[7px] px-4">
            <h6 className="text-sm font-medium text-custom-text-2">
              Fulfilled orders
            </h6>
            <h4 className="text-base font-bold text-custom-text-1">
              {totalFulfilledOrders}
            </h4>
          </li>
        </ul>
      </div>
    </>
  );
}
