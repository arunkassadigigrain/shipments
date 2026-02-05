"use client";

import Sidebar from "@/app/admin/components/sidebar";
import { useState, useMemo } from "react";
import { useGetAllItemsQuery } from "@/app/admin/services/itemApi";
import { Menu } from "lucide-react";

type item = {
  id: string;
  itemName: string;
  itemVariety: string;
  packingType: string;
  itemDescription?: string;
};

export default function ShipmentStatusPage() {
  const [search, setSearch] = useState("");

  // 🔹 RTK Query hook
  const { data: items = [], isLoading, isError } = useGetAllItemsQuery();

  // 🔹 Filter items
  const filteredItems = useMemo(() => {
    const query = search.toLowerCase();

    return items.filter(
      (item) =>
        item.itemName.toLowerCase().includes(query) ||
        item.itemVariety.toLowerCase().includes(query) ||
        item.packingType.toLowerCase().includes(query) ||
        item.itemDescription?.toLowerCase().includes(query),
    );
  }, [items, search]);

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <Sidebar />
      <div className="drawer-content bg-base-200 p-6">
        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          {/* Drawer toggle button (mobile only) */}
          <label
            htmlFor="my-drawer"
            className="btn btn-square btn-ghost lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </label>

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
              <thead className="text-black">
                <tr>
                  <th>Item Name</th>
                  <th>Item Variety</th>
                  <th>Packing Type</th>
                  <th>ItemDescription</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={4} className="text-center text-red-500">
                      Failed to load items
                    </td>
                  </tr>
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400">
                      No matching items found
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.itemName}</td>
                      <td>{item.itemVariety}</td>
                      <td>{item.packingType}</td>
                      <td>{item.itemDescription ?? "-"}</td>
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
