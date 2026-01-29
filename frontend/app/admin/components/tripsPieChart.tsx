// // TripsPieChart.tsx
// "use client";

// import { ResponsivePie } from "@nivo/pie";
// import { useState, useMemo } from "react";
// import { useGetTripStatusQuery } from "@/app/services/tripApi";
// import { useGetShipmentStatusQuery } from "@/app/services/shipmentApi";

// type TripStatus = "CREATED" | "ONTHEWAY" | "COMPLETED";

// const STATUS_COLORS: Record<TripStatus, string> = {
//   CREATED: "#FFB74D",
//   ONTHEWAY: "#64B5F6",
//   COMPLETED: "#81C784",
// };

// const STATUS_LABELS: Record<TripStatus, string> = {
//   CREATED: "Created",
//   ONTHEWAY: "On the way",
//   COMPLETED: "Completed",
// };

// export default function TripsPieChart({
//   activeSegment,
// }: {
//   activeSegment: "trips" | "shipments";
// }) {
//   const [activeId, setActiveId] = useState<string | null>(null);
//   const [timeRange, setTimeRange] = useState<
//     "day" | "week" | "month" | "quaterly"
//   >("day");

//   const tripQuery = useGetTripStatusQuery(timeRange, {
//     skip: activeSegment !== "trips",
//   });

//   const shipmentQuery = useGetShipmentStatusQuery(timeRange, {
//     skip: activeSegment !== "shipments",
//   });

//   const apiData =
//     activeSegment === "trips" ? tripQuery.data : shipmentQuery.data;

//   const isLoading =
//     activeSegment === "trips" ? tripQuery.isLoading : shipmentQuery.isLoading;

//   const isError =
//     activeSegment === "trips" ? tripQuery.isError : shipmentQuery.isError;

//   const data = useMemo(() => {
//     if (!apiData?.pieChartData) return [];
//     const map: Record<string, number> = {};
//     apiData.pieChartData.forEach((item: any) => {
//       map[item.name] = item.value;
//     });

//     return (Object.keys(STATUS_LABELS) as TripStatus[]).map((status) => ({
//       id: status,
//       label: STATUS_LABELS[status],
//       value: map[status] ?? 0,
//     }));
//   }, [apiData]);

//   const totalTrips = useMemo(
//     () => data.reduce((sum, d) => sum + d.value, 0),
//     [data]
//   );

//   const hasData = data.some((d) => d.value > 0);

//   // --- Skeleton Loader ---
//   if (isLoading) {
//     return (
//       <div className="rounded-xl p-6 border border-gray-100 h-[450px] animate-pulse">
//         <div className="flex justify-between mb-8">
//           <div className="space-y-2">
//             <div className="h-6 w-32 bg-gray-200 rounded" />
//             <div className="h-4 w-24 bg-gray-100 rounded" />
//           </div>
//           <div className="h-12 w-24 bg-gray-200 rounded-lg" />
//         </div>
//         <div className="flex justify-center">
//           <div className="rounded-full border-[16px] border-gray-100 h-48 w-48 flex items-center justify-center">
//             <div className="h-20 w-20 bg-gray-50 rounded-full" />
//           </div>
//         </div>
//         <div className="grid grid-cols-3 gap-4 mt-10">
//           <div className="h-16 bg-gray-100 rounded-lg" />
//           <div className="h-16 bg-gray-100 rounded-lg" />
//           <div className="h-16 bg-gray-100 rounded-lg" />
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="rounded-xl p-6 border border-gray-100 h-[360px] flex items-center justify-center text-red-500 text-sm font-medium">
//         Failed to load trip data
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-xl p-2 sm:p-6">
//       {/* Header */}
//       <div className="flex flex-row justify-between items-center mb-6 gap-3">
//         <div>
//           <h2 className="text-lg sm:text-xl font-bold">Trip Status</h2>
//           <p className="text-xs sm:text-sm text-gray-500">Current overview</p>
//         </div>

//         <div className="bg-blue-50 px-3 py-2 rounded-lg text-center min-w-[100px]">
//           <p className="text-[10px] uppercase tracking-wider text-blue-600 font-bold">
//             Total Trips
//           </p>
//           <p className="text-xl sm:text-2xl font-black text-blue-900">
//             {totalTrips}
//           </p>
//         </div>
//       </div>

//       {/* Time Range Selector */}
//       <div className="relative flex p-1 rounded-xl w-64 sm:w-80 mb-6 bg-base-200/60 shadow-inner">
//         {/* Sliding background - Perfect 25% Width */}
//         <div
//           className={`absolute top-1 left-1 bottom-1 w-[calc(25%-2px)]
//       rounded-lg bg-base-100
//       border border-primary/25
//       shadow-sm
//       transition-all duration-300 ease-out
//       ${
//         timeRange === "day"
//           ? "translate-x-0"
//           : timeRange === "week"
//             ? "translate-x-[100%]"
//             : timeRange === "month"
//               ? "translate-x-[200%]"
//               : "translate-x-[300%]"
//       }`}
//         />

//         {/* Buttons - flex-1 ensures equal distribution */}
//         {(["day", "week", "month", "quaterly"] as const).map((range) => (
//           <button
//             key={range}
//             className={`
//         relative z-10 flex-1
//         h-9
//         flex items-center justify-center
//         text-xs sm:text-sm font-bold leading-none capitalize
//         transition-colors duration-300 cursor-pointer
//         ${
//           timeRange === range
//             ? "text-primary"
//             : "text-base-content/60 hover:text-base-content"
//         }
//       `}
//             onClick={() => setTimeRange(range)}
//           >
//             {range === "day"
//               ? "Today"
//               : range === "quaterly"
//                 ? "Quarter"
//                 : range}
//           </button>
//         ))}
//       </div>

//       {/* Chart Container */}
//       <div className="h-[240px] sm:h-[280px] p-6 w-full relative">
//         {hasData ? (
//           <ResponsivePie
//             data={data}
//             colors={(d) => STATUS_COLORS[d.id as TripStatus]}
//             margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
//             innerRadius={0.7}
//             padAngle={2}
//             cornerRadius={6}
//             activeOuterRadiusOffset={8}
//             borderWidth={0}
//             enableArcLinkLabels={false} // Hidden for cleaner mobile look, use custom labels below
//             arcLabelsSkipAngle={10}
//             arcLabelsTextColor="#ffffff"
//             onMouseEnter={(datum) => setActiveId(datum.id as string)}
//             onMouseLeave={() => setActiveId(null)}
//           />
//         ) : (
//           <div className="p-6 h-full flex items-center justify-center text-gray-400 text-sm italic">
//             No trips in selected period
//           </div>
//         )}
//       </div>

//       {/* Responsive Custom Legend / Quick Summary */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-6">
//         {data.map((item) => (
//           <div
//             key={item.id}
//             onMouseEnter={() => setActiveId(item.id)}
//             onMouseLeave={() => setActiveId(null)}
//             className={`rounded-xl flex items-center justify-between sm:flex-col sm:justify-center sm:text-center
//             }`}
//           >
//             <div className="flex items-center gap-1">
//               {/* The "3 dot" style visibility - Color Indicator */}
//               <span
//                 className="w-2.5 h-2.5 rounded-full"
//                 style={{
//                   backgroundColor: STATUS_COLORS[item.id as TripStatus],
//                 }}
//               />
//               <p className="text-xs sm:text-sm font-semibold text-gray-600">
//                 {item.label}
//               </p>
//             </div>
//             <p
//               className="text-base sm:text-lg font-bold"
//               style={{ color: STATUS_COLORS[item.id as TripStatus] }}
//             >
//               {item.value}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { ResponsivePie } from "@nivo/pie";
import { useState, useMemo } from "react";
import { useGetTripStatusQuery } from "@/app/admin/services/tripApi";
import { useGetShipmentStatusQuery } from "@/app/admin/services/shipmentApi";

type TripStatus = "CREATED" | "ONTHEWAY" | "COMPLETED";

const STATUS_COLORS: Record<TripStatus, string> = {
  CREATED: "#FFB74D",
  ONTHEWAY: "#64B5F6",
  COMPLETED: "#81C784",
};

const STATUS_LABELS: Record<TripStatus, string> = {
  CREATED: "Created",
  ONTHEWAY: "On the way",
  COMPLETED: "Completed",
};

export default function TripsPieChart({
  activeSegment,
  timeRange,
  setTimeRange,
}: {
  activeSegment: "trips" | "shipments";
  timeRange: "day" | "week" | "month" | "quaterly";
  setTimeRange: (r: "day" | "week" | "month" | "quaterly") => void;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const tripQuery = useGetTripStatusQuery(timeRange, {
    skip: activeSegment !== "trips",
  });

  const shipmentQuery = useGetShipmentStatusQuery(timeRange, {
    skip: activeSegment !== "shipments",
  });

  const apiData =
    activeSegment === "trips" ? tripQuery.data : shipmentQuery.data;

  const isLoading =
    activeSegment === "trips" ? tripQuery.isLoading : shipmentQuery.isLoading;

  const isError =
    activeSegment === "trips" ? tripQuery.isError : shipmentQuery.isError;

  // Helper for dynamic labels
  const segmentLabel = activeSegment === "trips" ? "Trip" : "Shipment";

  const data = useMemo(() => {
    if (!apiData?.pieChartData) return [];
    const map: Record<string, number> = {};
    apiData.pieChartData.forEach((item: any) => {
      map[item.name] = item.value;
    });

    return (Object.keys(STATUS_LABELS) as TripStatus[]).map((status) => ({
      id: status,
      label: STATUS_LABELS[status],
      value: map[status] ?? 0,
    }));
  }, [apiData]);

  const totalCount = useMemo(
    () => data.reduce((sum, d) => sum + d.value, 0),
    [data],
  );

  const hasData = data.some((d) => d.value > 0);

  // --- Skeleton Loader ---
  if (isLoading) {
    return (
      <div className="rounded-xl p-6 border border-gray-100 h-[450px] animate-pulse">
        <div className="flex justify-between mb-8">
          <div className="space-y-2">
            <div className="h-6 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-100 rounded" />
          </div>
          <div className="h-12 w-24 bg-gray-200 rounded-lg" />
        </div>
        <div className="flex justify-center">
          <div className="rounded-full border-[16px] border-gray-100 h-48 w-48 flex items-center justify-center">
            <div className="h-20 w-20 bg-gray-50 rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-10">
          <div className="h-16 bg-gray-100 rounded-lg" />
          <div className="h-16 bg-gray-100 rounded-lg" />
          <div className="h-16 bg-gray-100 rounded-lg" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl p-6 border border-gray-100 h-[360px] flex items-center justify-center text-red-500 text-sm font-medium">
        Failed to load {activeSegment} data
      </div>
    );
  }

  return (
    <div className="rounded-xl p-2 sm:p-6 ">
      {/* Header */}
      <div className="flex flex-row justify-between items-center mb-6 gap-3 h-[80px] ">
        <div>
          <h2 className="text-lg sm:text-xl font-bold">
            {segmentLabel} Status
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">Current overview</p>
        </div>

        <div className="bg-blue-50 px-3 py-2 rounded-lg text-center min-w-[100px]">
          <p className="text-[10px] uppercase tracking-wider text-blue-600 font-bold">
            Total {activeSegment}
          </p>
          <p className="text-xl sm:text-2xl font-black text-blue-900">
            {totalCount}
          </p>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="relative flex p-1 rounded-xl w-64 sm:w-80 mb-6 bg-base-200/60 shadow-inner">
        <div
          className={`absolute top-1 left-1 bottom-1 w-[calc(25%-2px)]
      rounded-lg bg-base-100
      border border-primary/25
      shadow-sm
      transition-all duration-300 ease-out
      ${
        timeRange === "day"
          ? "translate-x-0"
          : timeRange === "week"
            ? "translate-x-[100%]"
            : timeRange === "month"
              ? "translate-x-[200%]"
              : "translate-x-[300%]"
      }`}
        />

        {(["day", "week", "month", "quaterly"] as const).map((range) => (
          <button
            key={range}
            className={`
        relative z-10 flex-1
        h-9
        flex items-center justify-center
        text-xs sm:text-sm font-bold leading-none capitalize
        transition-colors duration-300 cursor-pointer
        ${
          timeRange === range
            ? "text-primary"
            : "text-base-content/60 hover:text-base-content"
        }
      `}
            onClick={() => setTimeRange(range)}
          >
            {range === "day"
              ? "Today"
              : range === "quaterly"
                ? "Quarter"
                : range}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="h-[340px] sm:h-[280px] p-6 w-full relative">
        {hasData ? (
          <ResponsivePie
            data={data}
            colors={(d) => STATUS_COLORS[d.id as TripStatus]}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            innerRadius={0.7}
            padAngle={2}
            cornerRadius={6}
            activeOuterRadiusOffset={8}
            borderWidth={0}
            enableArcLinkLabels={false}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor="#ffffff"
            onMouseEnter={(datum) => setActiveId(datum.id as string)}
            onMouseLeave={() => setActiveId(null)}
          />
        ) : (
          <div className="p-6 h-full flex items-center justify-center text-gray-400 text-sm italic">
            No {activeSegment} in selected period
          </div>
        )}
      </div>

      {/* Responsive Custom Legend / Quick Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-6">
        {data.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl flex items-center justify-between sm:flex-col sm:justify-center sm:text-center`}
          >
            <div className="flex items-center gap-1">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: STATUS_COLORS[item.id as TripStatus],
                }}
              />
              <p className="text-xs sm:text-sm font-semibold text-gray-600">
                {item.label}
              </p>
            </div>
            <p
              className="text-base sm:text-lg font-bold"
              style={{ color: STATUS_COLORS[item.id as TripStatus] }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
