
// app/page.tsx
"use client";

import { useState } from "react";
import TripsPieChart from "@/app/admin/components/tripsPieChart";
import TripsAndShipments from "@/app/admin/components/trip&shipment";
import Sidebar from "@/app/admin/components/sidebar";

export default function Home() {
  // 🔹 MOVE STATE HERE
  const [activeTab, setActiveTab] = useState<"trips" | "shipments">("trips");
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "quaterly">("day");


  return (
    <div className="flex min-h-screen font-sans bg-base-200">
      <div className="drawer lg:drawer-open min-h-screen w-full">
        {/* Sidebar */}
        <Sidebar />
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          <div className="p-4 md:p-6 lg:p-8 flex-1">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 h-full">
              {/* LEFT – Pie Chart */}
              <div className="lg:col-span-5 xl:col-span-4">
                <div className="card shadow-md rounded-3xl p-5 lg:p-6 h-[680px] flex items-center justify-center hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300">
                  <TripsPieChart activeSegment={activeTab}
                  timeRange={timeRange}
                  setTimeRange={setTimeRange} />
                </div>
              </div>

              {/* RIGHT – Trips & Shipments */}
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="card shadow-md rounded-3xl p-5 lg:p-6 h-[680px] flex flex-col hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300">
                  {/* Fixed Header */}
                  <h1 className="text-2xl font-bold mb-4 shrink-0">
                    Operations
                  </h1>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar">
                    <TripsAndShipments
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      timeRange={timeRange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
