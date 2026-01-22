"use client";

import { Menu, Filter, Truck, PackageCheck } from "lucide-react";
import { useState } from "react";
import { useGetAllTripsQuery } from "@/app/services/tripApi";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/sidebar";

/* ---------- UI Types ---------- */
type TripStatus = "On the Way" | "Delivered";

type TripUI = {
  id: string;
  customer: string;
  status: TripStatus;
  createdAt: string;
  totalAmount: number;
  itemsCount: number;
};

type DateFilter = "ALL" | "TODAY" | "WEEK" | "MONTH";

/* ---------- Backend → UI Status Mapper ---------- */
const mapBackendStatus = (status?: string): TripStatus => {
  if (status === "ONTHEWAY") return "On the Way";
  if (status === "COMPLETED") return "Delivered";
  return "On the Way"; // SAFE DEFAULT
};

/* ---------- Status Meta ---------- */
const statusMeta: Record<
  TripStatus,
  { icon: any; color: string; badge: string }
> = {
  "On the Way": {
    icon: Truck,
    color: "bg-warning/10 text-warning",
    badge: "badge-warning",
  },
  Delivered: {
    icon: PackageCheck,
    color: "bg-success/10 text-success",
    badge: "badge-success",
  },
};

export default function TripStatusPage() {
  const [dateFilter, setDateFilter] = useState<DateFilter>("ALL");
  const router = useRouter();

  /* ---------- API ---------- */
  const { data, isLoading, isError } = useGetAllTripsQuery();

  /* ---------- MAP BACKEND DATA ---------- */
  const Trips: TripUI[] =
    data?.map((trip: any) => ({
      id: String(trip.id),

      // Trips can have multiple shipments
      customer:
        trip.tripShipments?.[0]?.shipment?.business?.businessName ??
        "Multiple Customers",

      status: mapBackendStatus(trip.Status ?? trip.status),

      createdAt: trip.createdAt ?? new Date().toISOString(),

      totalAmount: trip.totalAmount ?? 0,

      itemsCount: trip.tripShipments?.length ?? 0,
    })) ?? [];

  /* ---------- DATE HELPERS ---------- */
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSameWeek = (date: Date) => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    return date >= startOfWeek;
  };

  const isSameMonth = (date: Date) => {
    const now = new Date();
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  };

  /* ---------- DATE FILTER ---------- */
  const filteredByDate = Trips.filter((t) => {
    const date = new Date(t.createdAt);
    if (dateFilter === "TODAY") return isToday(date);
    if (dateFilter === "WEEK") return isSameWeek(date);
    if (dateFilter === "MONTH") return isSameMonth(date);
    return true;
  });

  const getByStatus = (status: TripStatus) =>
    filteredByDate.filter((t) => t.status === status);

  const statuses: TripStatus[] = ["On the Way", "Delivered"];

  /* ---------- LOADING ---------- */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  /* ---------- ERROR ---------- */
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-error">
        Failed to load trips
      </div>
    );
  }

  /* ---------- UI ---------- */
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <Sidebar />
      <div className="drawer-content flex flex-col bg-base-200 p-6 gap-6">
        {/* HEADER */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="my-drawer"
            className="btn btn-square btn-ghost lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </label>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Trip Status</h1>
            <p className="text-sm text-gray-500">
              Track all trips by current progress
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 opacity-60" />
            <select
              className="select select-bordered"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as DateFilter)}
            >
              <option value="ALL">All Time</option>
              <option value="TODAY">Today</option>
              <option value="WEEK">This Week</option>
              <option value="MONTH">This Month</option>
            </select>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid sm:grid-cols-2 gap-4">
          {statuses.map((status) => {
            const Icon = statusMeta[status].icon;
            const count = getByStatus(status).length;

            return (
              <div
                key={status}
                className="card bg-base-100 shadow-md rounded-2xl p-4 flex items-center gap-4"
              >
                <div className={`p-3 rounded-xl ${statusMeta[status].color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold  text-center">{count}</p>
                  <p
  className={`text-sm font-medium ${
    status === "Delivered"
      ? "text-green-300"
      : status === "On the Way"
      ? "text-orange-300"
      : "text-gray-300"
  }`}
>
  {status}
</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* STATUS COLUMNS */}
        <div className="grid md:grid-cols-2 gap-4">
          {statuses.map((status) => {
            const list = getByStatus(status);
            const Icon = statusMeta[status].icon;

            return (
              <div
                key={status}
                className="card bg-base-100 shadow-xl rounded-2xl flex flex-col"
              >
                <div className="flex items-center gap-2 px-4 py-3">
                  <Icon className="w-5 h-5 opacity-70" />
                  <h2 className="font-semibold">{status}</h2>
                </div>

                {list.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-gray-400">
                    No trips
                  </div>
                ) : (
                  <ul className="p-4 space-y-3 overflow-y-auto max-h-[30rem] hide-scrollbar">
                    {list.map((t) => (
                      <li
                        key={t.id}
                       
                        className="rounded-xl p-4 bg-base-200 cursor-pointer hover:bg-base-300 readonly"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-semibold">Trip #{t.id}</p>
                          <span className={`badge ${statusMeta[status].badge}`}>
                            {t.status}
                          </span>
                        </div>

                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Customer: {t.customer}</p>
                          <p>
                            Date:{" "}
                            {new Date(t.createdAt).toLocaleDateString()}
                          </p>
                          <p>Shipments: {t.itemsCount}</p>
                        </div>

                        <p className="mt-2 font-bold">₹{t.totalAmount}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
