import { orderList } from "@/data/orderList";
import { useState } from "react";
import { CiExport } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import * as XLSX from "xlsx";
import { CustomButton } from "../ui";

export default function CreateOrder() {
  const [orders, setOrders] = useState(orderList);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      orders.map((order) => ({
        OrderId: order._id.$oid,
        CreatingDate: new Date(order.createdAt.$date).toLocaleString(),
        CustomerInfo: `${order.user.firstName} ${order.user.lastName} (${order.user.phone})`,
        Total: `৳ ${order.totalAmount.grandTotal}`,
        Quantity:
          order.products.reduce((acc, product) => acc + product.quantity, 0) +
          " items",
        PaymentStatus: order.payment.status,
        DeliveryMethod: order.delivery.deliveryMethod,
        Status: order.status,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");

    XLSX.writeFile(wb, "orders.xlsx");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        {/* left */}
        <h2 className="text-2xl font-medium text-custom-text-1">Orders</h2>

        {/* right */}
        <div className="font-normal flex items-center gap-3 text-custom-text-2">
          <CustomButton className="bg-white" onClick={exportToExcel}>
            <CiExport className="text-lg" />
            Export
          </CustomButton>

          <CustomButton className="bg-custom-blue text-white">
            <FiPlus className="text-lg" />
            Create order
          </CustomButton>
        </div>
      </div>
    </>
  );
}
