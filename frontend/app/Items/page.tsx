"use client";
 
import Sidebar from "@/app/components/sidebar";
import { useEffect, useState, useMemo } from "react";
 
type Item = {
  itemName: string;
  itemVariety: string;
  packingType: string;
  itemDetails: string;
};
 
export default function ShipmentStatusPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
 
  // 🔹 Fetch data from backend (PostgreSQL via API)
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/items");
        if (!res.ok) throw new Error("Failed to fetch items");
        const data: Item[] = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchItems();
  }, []);
 
  // 🔹 Filter items using useMemo (VDOM optimized)
  const filteredItems = useMemo(() => {
    const query = search.toLowerCase();
 
    return items.filter(
      (item) =>
        item.itemName.toLowerCase().includes(query) ||
        item.itemVariety.toLowerCase().includes(query) ||
        item.packingType.toLowerCase().includes(query) ||
        item.itemDetails.toLowerCase().includes(query)
    );
  }, [items, search]);
 
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <Sidebar />
 
      <div className="drawer-content bg-base-200 p-6">
        {/* Header + Search (Right aligned) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Items</h1>
 
          <input
            type="text"
            placeholder="Search items..."
            className="input input-bordered w-full md:w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
 
        {/* Table */}
        <div className="card bg-base-100 shadow rounded-xl">
          <div className="overflow-x-auto p-4">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Item Variety</th>
                  <th>Packing Type</th>
                  <th>Item Details</th>
                </tr>
              </thead>
 
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400">
                      No matching items found
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.itemName}</td>
                      <td>{item.itemVariety}</td>
                      <td>{item.packingType}</td>
                      <td>{item.itemDetails}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
 