// // app/page.tsx  or wherever your Home component lives
// import { Menu, Package } from "lucide-react";
// import TripsPieChart from "./components/tripsPieChart";
// import TripsAndShipments from "./components/trip&shipment";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen font-sans bg-base-200">
//       <div className="drawer lg:drawer-open">
//         <input id="my-drawer" type="checkbox" className="drawer-toggle" />

//         {/* Drawer Content (main area) */}
//         <div className="drawer-content flex flex-col">

//           {/* Main content - two column layout on lg+ */}
//           <div className="p-4 md:p-6 lg:p-8">
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 ">
//               {/* Left column - Pie Chart (statistics/overview) */}
//               <div className="lg:col-span-5 xl:col-span-4 hover:shadow-xl rounded-3xl hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300">
//                 <div className="card bg-base-100 shadow-md rounded-3xl p-5 lg:p-6 h-full">
//                   <div className="min-h-[320px] md:min-h-[380px]">
//                     <TripsPieChart />
//                   </div>
//                 </div>
//               </div>

//               {/* Right column - Operations / Trips & Shipments */}
//               <div className="lg:col-span-7 xl:col-span-8">
//                 <div className="card bg-base-100 shadow-md rounded-3xl p-5 lg:p-6 hover:shadow-2xl hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300">
//                   <h1 className="text-2xl font-bold mb-6">Operations</h1>
//                   <TripsAndShipments />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/page.tsx
"use client";

import { useState } from "react";
import TripsPieChart from "./components/tripsPieChart";
import TripsAndShipments from "./components/trip&shipment";
import Sidebar from "./components/sidebar";

export default function Home() {
  // 🔹 MOVE STATE HERE
  const [activeTab, setActiveTab] = useState<"trips" | "shipments">("trips");

  // return (
  //   <div className="flex min-h-screen font-sans bg-base-200">
  //     <div className="drawer lg:drawer-open min-h-screen">
  //       <Sidebar />
  //       <input id="my-drawer" type="checkbox" className="drawer-toggle" />

  //       <div className="drawer-content flex flex-col">
  //         <div className="p-4 md:p-6 lg:p-8 flex-1">
  //           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 h-full">
  //             {/* Left - Pie Chart */}
  //             <div className="lg:col-span-5 xl:col-span-4">
  //               <div className="card bg-base-100 shadow-md rounded-3xl p-5 lg:p-6 h-[680px]">
  //                 <TripsPieChart activeSegment={activeTab} />
  //               </div>
  //             </div>

  //             {/* Right - Trips & Shipments */}
  //             <div className="lg:col-span-7 xl:col-span-8">
  //               <div className="card bg-base-100 shadow-md rounded-3xl p-5 lg:p-6 h-[680px] flex flex-col">
  //                 {/* Fixed Header */}
  //                 <h1 className="text-2xl font-bold mb-4 shrink-0">
  //                   Operations
  //                 </h1>

  //                 {/* Scrollable Content */}
  //                 <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar">
  //                   <TripsAndShipments
  //                     activeTab={activeTab}
  //                     setActiveTab={setActiveTab}
  //                   />
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
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
                <div className="card bg-base-100 shadow-md rounded-3xl p-5 lg:p-6 h-[680px] flex items-center justify-center">
                  <TripsPieChart activeSegment={activeTab} />
                </div>
              </div>

              {/* RIGHT – Trips & Shipments */}
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="card bg-base-100 shadow-md rounded-3xl p-5 lg:p-6 h-[680px] flex flex-col">
                  {/* Fixed Header */}
                  <h1 className="text-2xl font-bold mb-4 shrink-0">
                    Operations
                  </h1>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar">
                    <TripsAndShipments
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
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
