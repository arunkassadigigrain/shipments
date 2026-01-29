"use client";

// import Sidebar from "@/app/components/sidebar";
import { Menu, Filter } from "lucide-react";
import { useState } from "react";
import { useGetAllShipmentsQuery } from "@/app/admin/services/shipmentApi";
import { useRouter } from "next/navigation";
import { Truck, PackageCheck, Package, Calendar } from "lucide-react";
import Sidebar from "@/app/admin/components/sidebar";

/* ---------- UI Types ---------- */
type ShipmentStatus = "Created" | "On the Way" | "Delivered";

type Shipment = {
  id: string;
  customer: string;
  status: ShipmentStatus;
  createdAt: string;
  totalAmount: number;
  itemsCount: number;
};

type DateFilter = "ALL" | "TODAY" | "WEEK" | "MONTH";

/* ---------- Map backend status to UI ---------- */
const mapBackendStatus = (
  status: "CREATED" | "ONTHEWAY" | "COMPLETED"
): ShipmentStatus => {
  switch (status) {
    case "CREATED":
      return "Created";
    case "ONTHEWAY":
      return "On the Way";
    case "COMPLETED":
      return "Delivered";
    default:
      return "Created";
  }
};

const statusMeta: Record<ShipmentStatus, any> = {
  Created: {
    icon: Package,
    color: "bg-info/10 text-info",
    badge: "badge-info",
  },
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

export default function ShipmentStatusPage() {
  const [dateFilter, setDateFilter] = useState<DateFilter>("ALL");
  const router = useRouter();

  /* ---------- API ---------- */
  const { data, isLoading, isError } = useGetAllShipmentsQuery();

  /* ---------- SAFE DATA MAPPING ---------- */
  const shipments: Shipment[] =
    data?.map((s: any) => ({
      id: String(s.id),
      customer:
        s.business?.businessName ??
        s.business?.business_name ??
        "Unknown Customer",
      status: mapBackendStatus(s.Status ?? s.status),
      createdAt:
        s.createdAt ?? s.created_at ?? new Date().toISOString(),
      totalAmount: s.totalAmount ?? s.total_amount ?? 0,
      itemsCount:
        s.shipmentItems?.length ?? s.shipment_items?.length ?? 0,
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

  /* ---------- FILTER BY DATE ---------- */
  const filteredByDate = shipments.filter((s) => {
    const date = new Date(s.createdAt);
    if (dateFilter === "TODAY") return isToday(date);
    if (dateFilter === "WEEK") return isSameWeek(date);
    if (dateFilter === "MONTH") return isSameMonth(date);
    return true;
  });

  const getByStatus = (status: ShipmentStatus) =>
    filteredByDate.filter((s) => s.status === status);

  const statuses: ShipmentStatus[] = ["Created", "On the Way", "Delivered"];

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
        Failed to load shipments
      </div>
    );
  }

  /* ---------- UI ---------- */
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <Sidebar />
      <div className="drawer-content flex flex-col bg-base-200 p-6 gap-6">
        {/* HEADER */}
       
          <div className="flex items-start gap-3">
    {/* Drawer toggle button (mobile only) */}
    <label
      htmlFor="my-drawer"
      className="btn btn-square btn-ghost lg:hidden"
    >
      <Menu className="h-5 w-5" />
    </label>
    </div>

<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Shipment Status</h1>
            <p className="text-sm text-gray-500">
              Track all shipments by current progress
            </p>
          </div>

          <div className="flex items-center px-7 gap-2 hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300">
            <Filter className="w-6 h-6 opacity-60" />
            <select
              className="select select-bordered px-7 outline-none
 "
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
        <div className="grid sm:grid-cols-3 gap-4">
          {statuses.map((status) => {
            const Icon = statusMeta[status].icon;
            const count = getByStatus(status).length;
            return (
              <div
                key={status}
                className="card bg-base-100 shadow-md rounded-2xl p-4 flex items-center gap-4 hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300
 "
              >
                <div
                  className={`p-3 rounded-xl ${statusMeta[status].color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold  text-center">{count}</p>
                  <p
  className={`text-sm font-medium ${
    status === "Created"
      ? "text-blue-300"
      : status === "Delivered"
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
        <div className="grid md:grid-cols-3 gap-4 ">
          {statuses.map((status) => {
            const list = getByStatus(status);
            const Icon = statusMeta[status].icon;

            return (
              <div
                key={status}
                className="card bg-base-100 shadow-xl rounded-2xl flex flex-col hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300
 "
              >
                <div className="flex items-center justify-between px-4 py-3 ">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 opacity-70" />
                    <h2 className="font-semibold">{status}</h2>
                  </div>
                 
                </div>

                {list.length === 0 ? (
                  <div className="flex-1 flex py-7 items-center justify-center text-gray-400">
                    No shipments
                  </div>
                ) : (
                  <ul className="p-4 space-y-3 overflow-y-auto hide-scrollbar max-h-[32rem]">
                    {list.map((s) => (
                      <li
                        key={s.id}
                     
                        className="group  rounded-xl p-4 bg-base-200 cursor-pointer hover:bg-base-300 transition"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-semibold">
                            Shipment #{s.id}
                          </p>
                          <span
                            className={`badge ${statusMeta[status].color}`}
                          >
                            {s.status}
                          </span>
                        </div>

                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Customer: {s.customer}</p>
                          <p>
                            Date:{" "}
                            {new Date(s.createdAt).toLocaleDateString()}
                          </p>
                          <p>Items: {s.itemsCount}</p>
                        </div>

                        <p className="mt-2 font-bold">
                          ₹{s.totalAmount}
                        </p>
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

