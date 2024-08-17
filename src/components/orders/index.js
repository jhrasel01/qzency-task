"use client";

import { orderList as initialOrderList } from "@/data/orderList";
import { useMemo, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { toast } from "react-toastify";
import { CustomButton, CustomContainer } from "../ui";
import CreateOrder from "./createOrder";
import Filters from "./filter/Filters";
import OrderCount from "./orderCount";
import OrderList from "./orderList";
import Search from "./search";
import Tabs from "./tabs";

export default function Orders() {
  const [orders, setOrders] = useState(initialOrderList);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    dateCreated: "",
    status: [],
    paymentStatus: [],
    customDateRange: [],
  });
  const [activeTab, setActiveTab] = useState("all");

  // deleteOrder
  const deleteOrder = (orderId) => {
    setOrders(orders.filter((order) => order._id.$oid !== orderId));
    toast.success(`Order ID ${orderId} has been successfully deleted!`);
  };

  // deleteSelectedOrders
  const deleteSelectedOrders = () => {
    setOrders(
      orders.filter((order) => !selectedOrders.includes(order._id.$oid))
    );
    setSelectedOrders([]);
    toast.success("Selected orders have been successfully deleted!");
  };

  // toggleSelectOrder
  const toggleSelectOrder = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const isAnyOrderSelected = selectedOrders.length > 0;

  // searchQuery
  const normalizedSearchQuery = searchQuery.replace(/#/g, "").toLowerCase();

  // filteredOrders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const orderId = order._id.$oid.replace(/#/g, "").toLowerCase();
      const customerName =
        `${order.user.firstName} ${order.user.lastName}`.toLowerCase();
      const paymentStatus = order.payment.status.toLowerCase();
      const paymentPhone = order.user.phone.toLowerCase();
      const paymentAddress = order.shipping.address.toLowerCase();
      const status = order.status.toLowerCase();

      const orderDate = new Date(order.createdAt.$date);
      const now = new Date();
      const dateFilter = filters.dateCreated;

      let dateCondition = true;
      if (dateFilter === "week") {
        dateCondition = (now - orderDate) / (1000 * 60 * 60 * 24) <= 7;
      } else if (dateFilter === "month") {
        dateCondition = (now - orderDate) / (1000 * 60 * 60 * 24) <= 30;
      } else if (dateFilter === "month3") {
        dateCondition = (now - orderDate) / (1000 * 60 * 60 * 24) <= 90;
      } else if (dateFilter === "year") {
        dateCondition = (now - orderDate) / (1000 * 60 * 60 * 24) <= 365;
      } else if (dateFilter === "custom") {
        const [startDate, endDate] = filters.customDateRange;
        const start = new Date(startDate);
        const end = new Date(endDate);
        dateCondition = orderDate >= start && orderDate <= end;
      }

      const statusCondition =
        filters.status.length === 0 ||
        filters.status.includes(order.status.toLowerCase());

      const tabCondition =
        activeTab === "all" || order.status.toLowerCase() === activeTab;

      return (
        (orderId.includes(normalizedSearchQuery) ||
          customerName.includes(normalizedSearchQuery) ||
          paymentStatus.includes(normalizedSearchQuery) ||
          paymentPhone.includes(normalizedSearchQuery) ||
          status.includes(normalizedSearchQuery) ||
          paymentAddress.includes(normalizedSearchQuery)) &&
        dateCondition &&
        statusCondition &&
        tabCondition &&
        (filters.paymentStatus.length === 0 ||
          filters.paymentStatus.includes(paymentStatus))
      );
    });
  }, [orders, selectedOrders, searchQuery, filters, activeTab]);

  // count total order
  const statusCounts = useMemo(() => {
    const counts = {
      all: orders.length,
      processing: 0,
      confirmed: 0,
      shipped: 0,
      delivered: 0,
      return: 0,
      cancel: 0,
    };

    orders.forEach((order) => {
      const status = order.status.toLowerCase();
      if (counts[status] !== undefined) {
        counts[status]++;
      }
    });

    return counts;
  }, [orders]);

  return (
    <>
      <div className="mt-8">
        <CustomContainer>
          <CreateOrder />

          <div className="bg-white rounded-xl shadow-custom-shadow mt-8 mb-5">
            <OrderCount orders={orders} />

            {isAnyOrderSelected && (
              <div className="flex justify-start mb-4 pl-5">
                <CustomButton
                  onClick={deleteSelectedOrders}
                  className="bg-custom-red-light text-custom-red"
                >
                  Delete Selected Item
                  <CiTrash />
                </CustomButton>
              </div>
            )}

            <div className="flex flex-col laptop:flex-row items-center justify-between gap-5 pb-5 px-5">
              <div>
                <Tabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  counts={statusCounts}
                />
              </div>

              <div className="flex flex-col tab:flex-row items-center gap-4">
                <div>
                  <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                </div>
                <div>
                  <Filters setFilters={setFilters} />
                </div>
              </div>
            </div>

            {filteredOrders.length > 0 ? (
              <OrderList
                orders={filteredOrders}
                deleteOrder={deleteOrder}
                toggleSelectOrder={toggleSelectOrder}
                selectedOrders={selectedOrders}
              />
            ) : (
              <div className="py-5 text-center text-custom-text-2">
                No results found for {searchQuery}
              </div>
            )}
          </div>
        </CustomContainer>
      </div>
    </>
  );
}
