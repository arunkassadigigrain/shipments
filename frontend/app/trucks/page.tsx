"use client";

import Sidebar from "@/app/components/sidebar";
import { useState, useMemo } from "react";
import { useGetAllTrucksQuery } from "@/app/services/truckApi";
import { Menu } from "lucide-react";
type Truck = {
  id: number;
  truckCapacity: number;
  truckNumber: string;
  truckModel: string;
  ownerPhoneNumber: string;
  alternatePhoneNumber: string;
};

export default function TrucksPage() {
  const [search, setSearch] = useState("");

  const {
    data: Trucks = [],
    isLoading,
    isError,
  } = useGetAllTrucksQuery();

  const filteredTrucks = useMemo(() => {
    const query = search.toLowerCase();
    return Trucks.filter(
      (Truck: any) =>
        Truck.truckNumber.toLowerCase().includes(query) ||
        Truck.ownerPhoneNumber.toLowerCase().includes(query)
    );
  }, [Trucks, search]);

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <Sidebar />
      <div className="drawer-content bg-base-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">ALL Trucks</h1>

          <input
            type="text"
            placeholder="Search trucks..."
            className="input input-bordered w-full md:w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="card bg-base-100 shadow rounded-xl">
          <div className="overflow-x-auto p-4">
            <table className="table table-zebra w-full text-black">
              <thead>
                <tr>
                  <th>Truck Number</th>
                  <th>Truck Model</th>
                  <th>Owner Phone</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={3} className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={3} className="text-center text-red-500">
                      Failed to load trucks
                    </td>
                  </tr>
                ) : filteredTrucks.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center text-gray-400">
                      No matching trucks found
                    </td>
                  </tr>
                ) : (
                  filteredTrucks.map((item: any) => (
                    <tr key={item.id}>
                      <td>{item.truckNumber}</td>
                      <td>{item.truckModel}</td>
                      <td>{item.ownerPhoneNumber}</td>
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

