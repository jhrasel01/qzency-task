"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { CustomButton } from "../ui";

export default function OrderModal({ isOpen, onClose, addOrder }) {
  const [orderData, setOrderData] = useState({
    orderId: "",
    customerName: "",
    phone: "",
    address: "",
    totalAmount: "",
    quantity: "",
    paymentStatus: "",
    deliveryMethod: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addOrder(orderData);
    toast.success("Order created successfully!");
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Create New Order</h2>
          <form onSubmit={handleSubmit}>
            {/* Add form fields here */}
            <input
              type="text"
              name="orderId"
              value={orderData.orderId}
              onChange={handleChange}
              placeholder="Order ID"
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="text"
              name="customerName"
              value={orderData.customerName}
              onChange={handleChange}
              placeholder="Customer Name"
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="text"
              name="phone"
              value={orderData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="text"
              name="address"
              value={orderData.address}
              onChange={handleChange}
              placeholder="Address"
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="text"
              name="totalAmount"
              value={orderData.totalAmount}
              onChange={handleChange}
              placeholder="Total Amount"
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="number"
              name="quantity"
              value={orderData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="text"
              name="paymentStatus"
              value={orderData.paymentStatus}
              onChange={handleChange}
              placeholder="Payment Status"
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="text"
              name="deliveryMethod"
              value={orderData.deliveryMethod}
              onChange={handleChange}
              placeholder="Delivery Method"
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="text"
              name="status"
              value={orderData.status}
              onChange={handleChange}
              placeholder="Status"
              className="mb-2 p-2 border rounded w-full"
            />
            <div className="flex justify-end mt-4">
              <CustomButton
                type="button"
                onClick={onClose}
                className="mr-2 bg-gray-300"
              >
                Close
              </CustomButton>
              <CustomButton type="submit" className="bg-custom-blue text-white">
                Create Order
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
