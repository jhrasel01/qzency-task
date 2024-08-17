import { CustomButton } from "../ui";

export default function Tabs({ activeTab, onTabChange, counts }) {
  const statuses = [
    "all",
    "processing",
    "confirmed",
    "shipped",
    "delivered",
    "return",
    "cancel",
  ];

  return (
    <div className="text-sm font-medium text-custom-text-2 flex flex-wrap items-center gap-2.5">
      {statuses.map((status) => (
        <CustomButton
          key={status}
          className={`pr-2 rounded-md border border-custom-border flex items-center gap-2 ${
            activeTab === status ? "bg-custom-blue-light text-custom-blue" : ""
          }`}
          onClick={() => onTabChange(status)}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
          <span
            className={`text-xs py-0.5 px-2 rounded ${
              activeTab === status
                ? "bg-custom-blue text-white"
                : "bg-custom-blue-light text-custom-blue"
            }`}
          >
            {counts[status] || 0}
          </span>
        </CustomButton>
      ))}
    </div>
  );
}
