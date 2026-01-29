// "use client";
// "use client";
 
// import { useGetAllTripsQuery } from "@/app/services/tripApi";
// import Sidebar from "@/app/components/sidebar";
// import { Menu, Loader2, Truck, Package, Calendar, User, Phone } from "lucide-react";
// import { useState } from "react";
 
// export default function TripsPage() {
//   const { data: trips = [], isLoading, isError } = useGetAllTripsQuery();
//   const [selectedTrip, setSelectedTrip] = useState<any>(null);
 
//   return (
//     <div className="drawer lg:drawer-open min-h-screen">
//       {/* Sidebar */}
//       <Sidebar />
 
//       <div className="drawer-content bg-base-200 p-6">
//         {/* Header */}
//         <div className="flex items-center gap-4 mb-6">
//           <label htmlFor="my-drawer" className="btn btn-ghost btn-square lg:hidden">
//             <Menu className="h-5 w-5" />
//           </label>
//           <h1 className="text-2xl font-bold">Trips</h1>
//         </div>
 
//         {/* Table */}
//         <div className="card bg-base-100 shadow rounded-xl">
//           <div className="overflow-x-auto p-4">
//             <table className="table table-zebra w-full">
//               <thead className="text-black">
//                 <tr>
//                   <th>Trip Date</th>
//                   <th>Trip ID</th>
//                   {/* <th>Status</th> */}
//                   <th>Driver</th>
//                   <th>Shipments</th>
//                 </tr>
//               </thead>
 
//               <tbody>
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan={5} className="text-center">Loading...</td>
//                   </tr>
//                 ) : isError ? (
//                   <tr>
//                     <td colSpan={5} className="text-center text-red-500">Failed to load trips</td>
//                   </tr>
//                 ) : trips.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="text-center text-gray-400">No trips found</td>
//                   </tr>
//                 ) : (
//                   trips.map((trip) => (
//                     <tr key={trip.id}>
//                       {/* Trip Date */}
//                       <td>{new Date(trip.tripDate).toLocaleDateString("en-GB", {
//                         day: "2-digit", month: "short", year: "numeric"
//                       })}</td>
 
//                       {/* Trip ID */}
//                       <td>{String(trip.id).padStart(4, "0")}</td>
 
                     
//                       {/* Driver */}
//                       <td>{trip.driver?.Drivername || "-"}</td>
 
//                       {/* Shipments */}
//                       <td className="max-w-2xl whitespace-normal">
//                         {trip.tripShipments?.length === 0 ? (
//                           <span className="text-gray-400">-</span>
//                         ) : (
//                           trip.tripShipments.map((shipment) => (
//                             <div
//                               key={shipment.id}
//                               onClick={() => setSelectedTrip({
//                                 ...shipment,
//                                 tripId: trip.id,
//                                 driver: trip.driver,
//                                   businessName:shipment.shipment?.business?.businessName || "-",
//                                 otp: trip.shipmentOtps?.find(o => o.shipmentId === shipment.shipmentId),
//                                 itemDescription:shipment.shipment?.shipmentItems?.[0]?.item?.itemDescription || "-",
//                               })}
//                               className="hover:underline cursor-pointer text-primary"
//                             >
//                               Shipment ID: <strong>{String(shipment.shipmentId).padStart(4, "0")}</strong>
//                             </div>
//                           ))
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
 
//         {/* Enhanced Modal */}
//         {selectedTrip && (
//           <dialog id="shipment-modal" className="modal modal-open">
//             <div className="modal-box max-w-2xl bg-base-100">
//               <form method="dialog">
//                 {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button> */}
//               </form>
//               <h3 className="font-bold text-xl mb-6 flex items-center gap-3">
//                 <Package className="w-6 h-6 text-primary" />
//                 Shipment Details
//               </h3>
 
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
//                 <div className="space-y-3">
//                   <div>
//                     <p className="text-base-content/70">Trip ID</p>
//                     <p className="font-medium">#{String(selectedTrip.tripId).padStart(5, "0")}</p>
//                   </div>
//                   <div>
//                     <p className="text-base-content/70">itemDescription</p>
//                      <p className="font-medium">
//     {selectedTrip.itemDescription || "-"}
//   </p>
                   
//                   </div>
//                   <div>
//   <p className="text-base-content/70">Business Name</p>
//   <p className="font-medium">
//     {selectedTrip.businessName || "-"}
//   </p>
// </div>
 
// <div>
//   <p className="text-base-content/70">Delivery Address</p>
//   <p className="font-medium">
//     {selectedTrip.addressLine1 || "-"}
//   </p>
// </div>
 
//                   <div>
//                     <p className="text-base-content/70">OTP Code</p>
//                     <p className="font-mono font-bold text-lg">{selectedTrip.otp?.otpCode || "-"}</p>
//                   </div>
//                 </div>
 
//                 <div className="space-y-3">
//                   <div>
//                     <p className="text-base-content/70">Driver Name</p>
//                     <p className="font-medium">{selectedTrip.driver?.Drivername || "-"}</p>
//                   </div>
//                   <div>
//                     <p className="text-base-content/70">Driver Phone</p>
//                     <div className="flex items-center gap-2">
//                       <Phone className="w-4 h-4 opacity-70" />
//                       <p className="font-medium">{selectedTrip.driver?.phoneNumber || "-"}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
 
//               <div className="modal-action mt-8">
//                 <button className="btn btn-neutral" onClick={() => setSelectedTrip(null)}>
//                   Close
//                 </button>
//               </div>
//             </div>
//           </dialog>
//         )}
//       </div>
//     </div>
//     </div>
//     </div>
//   );
//   }
 


"use client";

import {useGetAllTripsQuery} from "@/app/admin/services/tripApi";
import Sidebar from "@/app/admin/components/sidebar";
import { Menu, Package,  Phone } from "lucide-react";
import { useState } from "react";

export default function TripsPage() {
  const { data: trips = [], isLoading, isError } = useGetAllTripsQuery  ();
  const [selectedTrip, setSelectedTrip] = useState<any>(null);

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="drawer-content bg-base-200 p-6">

        {/* Table */}
        <div className="card bg-base-100 shadow rounded-xl">
          <div className="overflow-x-auto p-4">
            <table className="table table-zebra w-full">
              <thead className="text-black">
                <tr>
                  <th>Trip Date</th>
                  <th>Trip ID</th>
                  {/* <th>Status</th> */}
                  <th>Driver</th>
                  <th>Shipments</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center">Loading...</td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={5} className="text-center text-red-500">Failed to load trips</td>
                  </tr>
                ) : trips.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400">No trips found</td>
                  </tr>
                ) : (
                  trips.map((trip) => (
                    <tr key={trip.id}>
                      {/* Trip Date */}
                      <td>{new Date(trip.tripDate).toLocaleDateString("en-GB", {
                        day: "2-digit", month: "short", year: "numeric"
                      })}</td>

                      {/* Trip ID */}
                      <td>{String(trip.id).padStart(4, "0")}</td>

                     
                      {/* Driver */}
                      <td>{trip.driver?.Drivername || "-"}</td>

                      {/* Shipments */}
                      <td className="max-w-2xl whitespace-normal">
                        {trip.tripShipments?.length === 0 ? (
                          <span className="text-gray-400">-</span>
                        ) : (
                          trip.tripShipments.map((shipment) => (
                            <div
                              key={shipment.id}
                              onClick={() => setSelectedTrip({
                                ...shipment,
                                tripId: trip.id,
                                driver: trip.driver,
                                  businessName:shipment.shipment?.business?.businessName || "-",
                                    addressLine1: [
                                      shipment.shipment?.shippingAddress?.addressLine1,
                                      shipment.shipment?.shippingAddress?.cityOrDistrict,
                                      shipment.shipment?.shippingAddress?.stateOrProvince,
                                      shipment.shipment?.shippingAddress?.postalCode,

                                    ].filter(Boolean).join(",")|| "-",
                                otp: trip.shipmentOtps?.find(o => o.shipmentId === shipment.shipmentId),
                                itemDescription:shipment.shipment?.shipmentItems?.[0]?.item?.itemDescription || "-",
                                  tripStatus: trip.Status,
                                // status: shipment.shipment?.Status || "-",
                              })}
                              className="hover:underline cursor-pointer text-primary"
                            >
                              Shipment ID: <strong>{String(shipment.shipmentId).padStart(4, "0")}</strong>
                            </div>
                          ))
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

        {/* Enhanced Modal */}
        {selectedTrip && (
          <dialog id="shipment-modal" className="modal modal-open">
       
            <div className="modal-box max-w-2xl bg-base-100 rounded-3xl ">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-3 border-b pb-2">
                <Package className="w-6 h-6 text-primary" />
               Trip Details
                <button
                  className="btn btn-sm btn-circle btn-ghost ml-auto"
                  onClick={() => setSelectedTrip(null)}
                >
                  ✕
                </button>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-base-200">
                    <p className="text-xs text-blue-700">Shipment ID</p>
                    <p className="font-semibold text-lg">
                      #{String(selectedTrip.tripId).padStart(4, "0")}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-base-200">
                    <p className="text-xs text-blue-700">Item Description</p>
                    <p className="font-medium">
                      {selectedTrip.itemDescription || "-"}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-base-200">
                    <p className="text-xs text-blue-700">Business Name</p>
                    <p className="font-medium">
                      {selectedTrip.businessName || "-"}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-base-200">
                    <p className="text-xs text-blue-700">Delivery Address</p>
                    <p className="font-medium">
                      {selectedTrip.addressLine1 || "-"}
                    </p>
                  </div>
                 
                  <div className="p-3 rounded-lg bg-base-200">
                    <p className="text-xs text-blue-700">OTP Code</p>
                    <p className="font-mono font-bold text-lg">
                      {selectedTrip.otp?.otpCode || "-"}
                    </p>
                  </div>
                </div>

               

                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-base-200">
                    <p className="text-xs text-blue-700">Driver Name</p>
                    <p className="font-medium ">
                      {selectedTrip.driver?.Drivername || "-"}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-base-200 flex items-center gap-2">
                    <Phone className="w-4 h-4 opacity-70" />
                    <p className="text-xs text-blue-700">DriverPhoneNumber :</p>
                    <p className="font-medium my-2 mx-3">
                      {selectedTrip.driver?.phoneNumber || "-"}
                    </p>
                  </div>
                   <div className="p-3 rounded-lg bg-base-200 flex items-center justify-between">
                    <p className="text-xs text-blue-700">Trip Status</p>
                    <span
                      className={`badge ${
                        selectedTrip.tripStatus === "ONTHEWAY"
                          ? "badge-warning"
                          : "badge-success"
                      }`}
                    >
                      {selectedTrip.tripStatus}
                    </span>
                  </div>
                </div>
              </div>
              </div>
          </dialog>
        )}
      </div>
    </div>
    </div>
    </div>
  );
  }
 

