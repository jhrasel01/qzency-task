"use client";

import { useEffect, useState } from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { CiTrash } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { CustomButton } from "../ui";

export default function OrderList({
  orders,
  deleteOrder,
  toggleSelectOrder,
  selectedOrders,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const customTh =
    "text-xs font-semibold py-3 px-5 text-left text-custom-text-2 align-middle";
  const customTd =
    "text-xs font-normal py-3 px-5 text-custom-text-2 align-middle";

  // renderPagination
  const renderPagination = () => {
    const pages = [];
    if (currentPage > 1) {
      pages.push(
        <CustomButton
          key="prev"
          onClick={() => handleClick(currentPage - 1)}
          className="bg-white border border-custom-border"
        >
          <BsArrowLeft />
          Prev
        </CustomButton>
      );
    }

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <CustomButton
            key={i}
            onClick={() => handleClick(i)}
            className={`!px-4 ${
              i === currentPage ? "bg-custom-blue text-white" : ""
            }`}
          >
            {i}
          </CustomButton>
        );
      } else if (
        (i === currentPage - 2 || i === currentPage + 2) &&
        totalPages > 5
      ) {
        pages.push(<span key={`dots-${i}`}>...</span>);
      }
    }

    if (currentPage < totalPages) {
      pages.push(
        <CustomButton
          key="next"
          onClick={() => handleClick(currentPage + 1)}
          className="bg-white border border-custom-border"
        >
          Next
          <BsArrowRight />
        </CustomButton>
      );
    }

    return pages;
  };

  // handleCopy
  const handleCopy = (orderId) => {
    navigator.clipboard.writeText(orderId).then(
      () => toast.success(`Order ID ${orderId} copied to clipboard!`),
      (err) => toast.error(`Failed to copy Order ID ${orderId}: ${err}`)
    );
  };

  // handleDelete
  const handleDelete = (orderId) => {
    deleteOrder(orderId);
  };

  return (
    <div className="py-5 pt-0 relative overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-[#F9FAFB]">
            <th className={`${customTh} inline-flex items-center gap-2`}>
              <input
                type="checkbox"
                id="selectAll"
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  if (isChecked) {
                    orders.forEach((order) =>
                      toggleSelectOrder(order._id.$oid)
                    );
                  } else {
                    selectedOrders.forEach((orderId) =>
                      toggleSelectOrder(orderId)
                    );
                  }
                }}
              />
              <label htmlFor="selectAll">Order Id</label>
            </th>
            <th className={customTh}>Creating date</th>
            <th className={customTh}>Customer info</th>
            <th className={customTh}>Total</th>
            <th className={customTh}>Quantity</th>
            <th className={customTh}>Payment status</th>
            <th className={customTh}>Delivery method</th>
            <th className={customTh}>Status</th>
            <th className={customTh}>
              <FiPlus className="text-lg" />
            </th>
          </tr>
        </thead>

        <tbody>
          {currentOrders.map((order) => (
            <tr key={order._id.$oid} className="border-b border-custom-border">
              <td className={customTd}>
                <div className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order._id.$oid)}
                    onChange={() => toggleSelectOrder(order._id.$oid)}
                    id={`order-${order._id.$oid}`}
                  />
                  <label htmlFor={`order-${order._id.$oid}`}>
                    #{order._id.$oid}
                  </label>
                  <button
                    onClick={() => handleCopy(`#${order._id.$oid}`)}
                    className="text-base text-custom-blue"
                  >
                    <AiOutlineCopy />
                  </button>
                </div>
              </td>
              <td className={customTd}>
                <ClientSideDate date={order.createdAt.$date} />
              </td>
              <td className={customTd}>
                {order.user.firstName} {order.user.lastName}
                <p className="text-custom-text-orange py-1">
                  {order.user.phone}
                </p>
                {order.shipping.address}
              </td>
              <td className={customTd}>৳ {order.totalAmount.grandTotal}</td>
              <td className={customTd}>
                {order.products.reduce(
                  (acc, product) => acc + product.quantity,
                  0
                )}
                <span> items</span>
              </td>
              <td className={customTd}>
                <span
                  className={`py-1.5 px-4 rounded-full text-sm ${
                    order.payment.status === "Paid"
                      ? "bg-custom-green-light text-custom-green"
                      : order.payment.status === "Cancelled"
                      ? "bg-custom-red-light text-custom-red"
                      : order.payment.status === "Refunded"
                      ? "bg-custom-red-light text-custom-red"
                      : order.payment.status === "Unpaid"
                      ? "bg-custom-yellow-light text-custom-yellow"
                      : order.payment.status === "Inprogress"
                      ? "bg-custom-sky-blue-light text-custom-sky-blue"
                      : "bg-custom-gray-light text-custom-gray"
                  }`}
                >
                  {order.payment.status}
                </span>
              </td>
              <td className={customTd}>{order.delivery.deliveryMethod}</td>
              <td className={customTd}>
                <span className="py-1.5 px-4 rounded-full bg-custom-blue-light text-xs">
                  {order.status}
                </span>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <CustomButton
                    onClick={() => handleDelete(order._id.$oid)}
                    className="bg-custom-red-light text-custom-red !text-lg"
                  >
                    <CiTrash />
                  </CustomButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-5 flex justify-center">{renderPagination()}</div>
    </div>
  );
}

// ClientSideDate
function ClientSideDate({ date }) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (date) {
      setFormattedDate(new Date(date).toLocaleString());
    }
  }, [date]);

  return <>{formattedDate}</>;
}
