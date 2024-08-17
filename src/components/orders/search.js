import { IoIosSearch } from "react-icons/io";

export default function Search({ searchQuery, setSearchQuery }) {
  return (
    <div className="text-custom-text-2 relative">
      <span className="absolute top-3 left-2.5">
        <IoIosSearch />
      </span>

      <input
        type="text"
        placeholder="Search by Order ID, Name, or Payment Status..."
        className="border border-custom-border placeholder:text-sm text-custom-text-2 py-2 pl-8 px-5 rounded-md text-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
