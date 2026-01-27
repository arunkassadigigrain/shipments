// "use client";

// import { Menu, Truck, Plus, Trash2, Package } from "lucide-react";
// import { useState, useMemo } from "react";
// import { toast } from "react-toastify";
// import Select from "react-select";
// import { useCreateTripMutation } from "@/app/services/tripApi";
// import { useGetAllTrucksQuery } from "@/app/services/truckApi";
// import { useGetAllDriverQuery } from "@/app/services/driverApi";
// import { useGetAllShipmentsQuery } from "@/app/services/shipmentApi";
// import Sidebar from "@/app/components/sidebar";

// interface ShipmentRow {
//   shipmentId: string;
//   businessName: string;
//   address: string;
//   phone: string;
// }

// export default function AddTrip() {
//   const { data: drivers = [] } = useGetAllDriverQuery();
//   const { data: trucks = [] } = useGetAllTrucksQuery();
//   const { data: shipments = [] } = useGetAllShipmentsQuery();

//   const [createTrip, { isLoading: isSubmitting }] = useCreateTripMutation();

//   // const pageLoading = driversLoading || trucksLoading || shipmentsLoading;

//   const [driverId, setDriverId] = useState<number | null>(null);
//   const [truckId, setTruckId] = useState<number | null>(null);
//   const [rows, setRows] = useState<ShipmentRow[]>([
//     { shipmentId: "", businessName: "", address: "", phone: "" },
//   ]);

//   const today = new Date().toISOString().split("T")[0];

//   const driverOptions = useMemo(
//     () =>
//       drivers.map((d) => ({
//         value: d.id,
//         label: d.Drivername,
//       })),
//     [drivers],
//   );

//   const truckOptions = useMemo(
//     () =>
//       trucks.map((t) => ({
//         value: t.id,
//         label: t.truckNumber,
//       })),
//     [trucks],
//   );

//   console.log(trucks, "11111111111111111111111")

//   const selectedDriver = drivers.find((d) => d.id === driverId);

//   const selectedShipmentIds = useMemo(
//     () => rows.map((r) => Number(r.shipmentId)).filter(Boolean),
//     [rows],
//   );

//   const addRow = () => {
//     setRows((prev) => [
//       ...prev,
//       { shipmentId: "", businessName: "", address: "", phone: "" },
//     ]);
//   };

//   const removeRow = (index: number) => {
//     if (rows.length > 1) {
//       setRows((prev) => prev.filter((_, i) => i !== index));
//     }
//   };

//   const clearAll = () => {
//     setRows([{ shipmentId: "", businessName: "", address: "", phone: "" }]);
//     setDriverId(null);
//     setTruckId(null);
//   };

//   const handleShipmentChange = (index: number, shipmentId: string) => {
//     const shipment = shipments.find((s) => s.id === Number(shipmentId));

//     if (!shipment) {
//       setRows((prev) =>
//         prev.map((row, i) =>
//           i === index
//             ? { ...row, shipmentId, businessName: "", address: "", phone: "" }
//             : row,
//         ),
//       );
//       return;
//     }

//     const formatShippingAddress = [
//       shipment.shippingAddress?.addressLine1 || "",
//       shipment.shippingAddress?.cityOrDistrict || "",
//       shipment.shippingAddress?.stateOrProvince || "",
//       shipment.shippingAddress?.postalCode || "",
//     ]
//       .filter(Boolean)
//       .join(", ");

//     setRows((prev) =>
//       prev.map((row, i) =>
//         i === index
//           ? {
//             shipmentId,
//             businessName: shipment.business?.businessName || "",
//             address: formatShippingAddress,
//             phone: shipment.business?.phoneNumber || "",
//           }
//           : row,
//       ),
//     );
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!driverId || !truckId) {
//       toast.error("Driver and Truck are required");
//       return;
//     }

//     if (rows.some((r) => !r.shipmentId)) {
//       toast.error("Please select all shipments");
//       return;
//     }

//     const payload = {
//       driverId: Number(driverId),
//       truckId: Number(truckId),
//       shipmentIds: rows.map((r) => Number(r.shipmentId)),
//     };

//     try {
//       await createTrip(payload).unwrap();
//       toast.success("Trip created successfully");
//       clearAll();
//     } catch (err: any) {
//       toast.error(err?.data?.error || "Failed to create trip");
//     }
//   };

//   return (
//     <div className="drawer lg:drawer-open min-h-screen">
//       <Sidebar />
//       <div className="drawer-content flex flex-col bg-base-200">
//         {/* Mobile Header */}
//         <div className="navbar bg-base-100 lg:hidden shadow-sm">
//           <div className="flex-none">
//             <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
//               <Menu className="h-5 w-5" />
//             </label>
//           </div>
//           <div className="flex-1 px-4">
//             <h1 className="text-lg font-semibold">Add Trip</h1>
//           </div>
//         </div>

//         <div className="flex-1 px-4 py-4 md:px-6 lg:px-8 overflow-y-auto">
//           <div className="max-w-6xl mx-auto">
//             <div className="mb-8 text-center animate-fadeIn">
//               <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-focus bg-clip-text text-transparent">
//                 Add New Trip
//               </h1>
//               <p className="text-base-content/60 text-sm tracking-wide">
//                 Create and register a new trip with assigned shipments
//               </p>
//             </div>

//             <div className="card bg-base-100/80 backdrop-blur-md shadow-2xl border border-base-300/20 rounded-3xl overflow-hidden hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300">
//               <div className="card-body p-6 md:p-8">
//                 <form className="space-y-8" onSubmit={handleSubmit}>
//                   {/* Trip Information */}
//                   <div>
//                     <h2 className="text-lg font-semibold text-base-content/90 mb-6 flex items-center gap-2">
//                       <Truck className="w-5 h-5 text-primary" />
//                       Trip Information
//                     </h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="form-control">
//                         <label className="label py-1">
//                           <span className="label-text font-medium text-sm">
//                             Trip Date{" "}
//                             <span className="text-red-500 ml-1">*</span>
//                           </span>
//                         </label>
//                         <input
//                           type="date"
//                           value={today}
//                           readOnly
//                           className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 cursor-not-allowed outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20"
//                         />
//                       </div>
//                        <div className="form-control">
//                         <label className="label py-1">
//                           <span className="label-text font-medium text-sm">
//                             Truck <span className="text-red-500 ml-1">*</span>
//                           </span>
//                         </label>
//                         <Select
//                           unstyled
//                           isSearchable
//                           placeholder="- Search truck..."
//                           options={truckOptions}
//                           value={
//                             truckOptions.find((opt) => opt.value === truckId) ||
//                             null
//                           }
//                           onChange={(option) =>
//                             setTruckId(option ? option.value : null)
//                           }
//                           isDisabled={isSubmitting}
//                           menuPortalTarget={
//                             typeof window !== "undefined" ? document.body : null
//                           }
//                           menuPosition="fixed"
//                           menuPlacement="auto"
//                           classNames={{
//                             control: ({ isFocused }) =>
//                               `select select-bordered w-full rounded-2xl bg-base-100/50 border-base-300 transition-all duration-300 ${isFocused
//                                 ? "border-primary ring-4 ring-primary/20"
//                                 : ""
//                               }`,
//                             valueContainer: () => "px-3",
//                             input: () => "text-sm",
//                             placeholder: () => "text-sm text-base-content/60",
//                             indicatorsContainer: () => "pr-2",
//                             menu: () =>
//                               "mt-2 rounded-xl border border-base-300 bg-base-100 shadow-lg",
//                             option: ({ isFocused, isSelected }) =>
//                               `px-3 py-2 cursor-pointer text-sm ${isFocused ? "bg-base-200" : ""
//                               } ${isSelected ? "bg-primary text-primary-content" : ""}`,
//                           }}
//                         />
//                       </div>

//                       <div className="form-control">
//                         <label className="label py-1">
//                           <span className="label-text font-medium text-sm">
//                             Driver Name<span className="text-red-500 ml-1">*</span>
//                           </span>
//                         </label>
//                         <Select
//                           unstyled
//                           isSearchable
//                           placeholder="- Search driver..."
//                           options={driverOptions}
//                           value={
//                             driverOptions.find(
//                               (opt) => opt.value === driverId,
//                             ) || null
//                           }
//                           onChange={(option) => setDriverId(option ? option.value : null)}

//                           isDisabled={isSubmitting}
//                           menuPortalTarget={
//                             typeof window !== "undefined" ? document.body : null
//                           }
//                           menuPosition="fixed"
//                           menuPlacement="auto"
//                           classNames={{
//                             control: ({ isFocused }) =>
//                               `select select-bordered w-full rounded-2xl bg-base-100/50 border-base-300 transition-all duration-300 ${isFocused
//                                 ? "border-primary ring-4 ring-primary/20"
//                                 : ""
//                               }`,
//                             valueContainer: () => "px-3",
//                             input: () => "text-sm",
//                             placeholder: () => "text-sm text-base-content/60",
//                             indicatorsContainer: () => "pr-2",
//                             menu: () =>
//                               "mt-2 rounded-xl border border-base-300 bg-base-100 shadow-lg",
//                             option: ({ isFocused, isSelected }) =>
//                               `px-3 py-2 cursor-pointer text-sm ${isFocused ? "bg-base-200" : ""
//                               } ${isSelected ? "bg-primary text-primary-content" : ""}`,
//                           }}
//                         />
//                       </div>

//                     </div>
//                   </div>

//                   {/* Driver Phone */}
//                   <div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="form-control">
//                         <label className="label py-1">
//                           <span className="label-text font-medium text-sm">
//                             Driver Phone Number
//                           </span>
//                         </label>
//                         <input
//                           type="tel"
//                           value={selectedDriver?.phoneNumber || ""}
//                           readOnly
//                           className="input input-bordered w-full rounded-2xl bg-neutral/10 text-base-content/70 border-base-300 cursor-not-allowed outline-none transition-all duration-300"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Assigned Shipments */}
//                   <div>
//                     <h2 className="text-lg font-semibold text-base-content/90 mb-6 flex items-center gap-2">
//                       <Package className="w-5 h-5 text-primary" />
//                       Assigned Shipments{" "}
//                       <span className="text-red-500 ml-1">*</span>
//                     </h2>

//                     <div className="rounded-2xl border border-base-300/30 overflow-x-auto">
//                       <table className="table table-zebra bg-base-100/50 w-full min-w-[900px]">
//                         <thead className="bg-base-200/50">
//                           <tr>
//                             <th className="w-[60px]">S.No</th>
//                             <th className="w-[160px]">Shipment ID</th>
//                             <th className="w-[200px]">Business Name</th>
//                             <th className="w-[360px]">Shipping Address</th>
//                             <th className="w-[160px]">Phone</th>
//                             <th className="w-[60px]"></th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {rows.map((row, i) => (
//                             <tr
//                               key={i}
//                               className="group hover:bg-base-200/30 transition-colors"
//                             >
//                               <td className="text-center font-medium">
//                                 {i + 1}
//                               </td>

//                               <td>
//                                 <Select
//                                   unstyled
//                                   isSearchable
//                                   placeholder="- Select Shipment..."
//                                   options={shipments
//                                     .filter(
//                                       (s) =>
//                                         !selectedShipmentIds.includes(s.id) ||
//                                         s.id === Number(row.shipmentId),
//                                     )
//                                     .map((s) => ({
//                                       value: s.id,
//                                       label: s.id.toString(),
//                                     }))}
//                                   value={
//                                     row.shipmentId
//                                       ? {
//                                         value: Number(row.shipmentId),
//                                         label: row.shipmentId.toString(),
//                                       }
//                                       : null
//                                   }
//                                   onChange={(option) =>
//                                     handleShipmentChange(
//                                       i,
//                                       option ? String(option.value) : "",
//                                     )
//                                   }
//                                   isDisabled={isSubmitting}
//                                   menuPortalTarget={
//                                     typeof window !== "undefined"
//                                       ? document.body
//                                       : null
//                                   }
//                                   menuPosition="fixed"
//                                   menuPlacement="auto"
//                                   classNames={{
//                                     control: ({ isFocused }) =>
//                                       `select select-bordered w-full rounded-2xl bg-base-100/50 border-base-300 transition-all duration-300 ${isFocused
//                                         ? "border-primary ring-4 ring-primary/20"
//                                         : ""
//                                       }`,
//                                     valueContainer: () => "px-3",
//                                     input: () => "text-sm",
//                                     placeholder: () =>
//                                       "text-sm text-base-content/60",
//                                     indicatorsContainer: () => "pr-2",
//                                     menu: () =>
//                                       "mt-2 rounded-xl border border-base-300 bg-base-100 shadow-lg",
//                                     option: ({ isFocused, isSelected }) =>
//                                       `px-3 py-2 cursor-pointer text-sm ${isFocused ? "bg-base-200" : ""
//                                       } ${isSelected ? "bg-primary text-primary-content" : ""}`,
//                                   }}
//                                 />
//                               </td>

//                               <td>
//                                 <input
//                                   className="input input-bordered w-full rounded-2xl bg-neutral/10 text-base-content/70 border-base-300 cursor-not-allowed"
//                                   value={row.businessName}
//                                   readOnly
//                                 />
//                               </td>

//                               <td>
//                                 <input
//                                   className="input input-bordered w-full rounded-2xl bg-neutral/10 text-base-content/70 border-base-300 cursor-not-allowed"
//                                   value={row.address}
//                                   readOnly
//                                 />
//                               </td>

//                               <td>
//                                 <input
//                                   type="tel"
//                                   className="input input-bordered w-full rounded-2xl bg-neutral/10 text-base-content/70 border-base-300 cursor-not-allowed"
//                                   value={row.phone}
//                                   readOnly
//                                 />
//                               </td>

//                               <td className="text-center">
//                                 {rows.length > 1 && (
//                                   <button
//                                     type="button"
//                                     onClick={() => removeRow(i)}
//                                     className="btn btn-ghost btn-xs opacity-0 group-hover:opacity-100 text-error hover:bg-error/10 transition-opacity"
//                                     disabled={isSubmitting}
//                                   >
//                                     <Trash2 className="h-5 w-5" />
//                                   </button>
//                                 )}
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>

//                     <button
//                       type="button"
//                       onClick={addRow}
//                       className="mt-4 flex items-center gap-2 text-primary font-medium hover:text-primary-focus transition-colors disabled:opacity-50"
//                       disabled={isSubmitting}
//                     >
//                       <Plus className="w-5 h-5" />
//                       Add Shipment
//                     </button>
//                   </div>

//                   {/* Buttons */}
//                   <div className="flex justify-end gap-4 pt-6">
//                     <button
//                       type="submit"
//                       className={`btn btn-primary rounded-2xl px-8 ${isSubmitting ? "loading" : ""}`}
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? "Creating..." : "Create Trip"}
//                     </button>

//                     <button
//                       type="button"
//                       className="btn btn-ghost rounded-2xl px-8"
//                       disabled={isSubmitting}
//                       onClick={clearAll}
//                     >
//                       Clear
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Menu, Truck, Plus, Trash2, Package } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { useCreateTripMutation } from "@/app/services/tripApi";
import { useGetAllTrucksQuery } from "@/app/services/truckApi";
import { useGetAllDriverQuery } from "@/app/services/driverApi";
import { useGetAllCreatedQuery } from "@/app/services/shipmentApi";
import Sidebar from "@/app/components/sidebar";

interface ShipmentRow {
  shipmentId: string;
  businessName: string;
  address: string;
  phone: string;
}

export default function AddTrip() {
  const { data: drivers = [] } = useGetAllDriverQuery();
  const { data: trucks = [] } = useGetAllTrucksQuery();
  const { data: shipments = [] } = useGetAllCreatedQuery();

  const [createTrip, { isLoading: isSubmitting }] = useCreateTripMutation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [driverId, setDriverId] = useState<number | null>(null);
  const [truckId, setTruckId] = useState<number | null>(null);
  const [rows, setRows] = useState<ShipmentRow[]>([
    { shipmentId: "", businessName: "", address: "", phone: "" },
  ]);

  const today = new Date().toISOString().split("T")[0];

  const driverOptions = useMemo(
    () =>
      drivers.map((d) => ({
        value: d.id,
        label: d.Drivername,
      })),
    [drivers],
  );

  const truckOptions = useMemo(
    () =>
      trucks.map((t) => ({
        value: t.id,
        label: t.truckNumber,
      })),
    [trucks],
  );

  useEffect(() => {
    if (truckId) {
      const selectedTruck = trucks.find((t) => t.id === truckId);
      if (selectedTruck?.defaultDriverId) {
        setDriverId(selectedTruck.defaultDriverId);
      }
    }
    // Optional: clear driver if truck is cleared (uncomment if desired)
    // else {
    //   setDriverId(null);
    // }
  }, [truckId, trucks]);

  const selectedDriver = drivers.find((d) => d.id === driverId);

  const selectedShipmentIds = useMemo(
    () => rows.map((r) => Number(r.shipmentId)).filter(Boolean),
    [rows],
  );

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { shipmentId: "", businessName: "", address: "", phone: "" },
    ]);
  };

  const removeRow = (index: number) => {
    if (rows.length > 1) {
      setRows((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const clearAll = () => {
    setRows([{ shipmentId: "", businessName: "", address: "", phone: "" }]);
    setDriverId(null);
    setTruckId(null);
  };

  const handleShipmentChange = (index: number, shipmentId: string) => {
    const shipment = shipments.find((s) => s.id === Number(shipmentId));

    if (!shipment) {
      setRows((prev) =>
        prev.map((row, i) =>
          i === index
            ? { ...row, shipmentId, businessName: "", address: "", phone: "" }
            : row,
        ),
      );
      return;
    }

    const formatShippingAddress = [
      shipment.shippingAddress?.addressLine1 || "",
      shipment.shippingAddress?.cityOrDistrict || "",
      shipment.shippingAddress?.stateOrProvince || "",
      shipment.shippingAddress?.postalCode || "",
    ]
      .filter(Boolean)
      .join(", ");

    setRows((prev) =>
      prev.map((row, i) =>
        i === index
          ? {
              shipmentId,
              businessName: shipment.business?.businessName || "",
              address: formatShippingAddress,
              phone: shipment.business?.phoneNumber || "",
            }
          : row,
      ),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!driverId || !truckId) {
      toast.error("Driver and Truck are required");
      return;
    }

    if (rows.some((r) => !r.shipmentId)) {
      toast.error("Please select all shipments");
      return;
    }

    const payload = {
      driverId: Number(driverId),
      truckId: Number(truckId),
      shipmentIds: rows.map((r) => Number(r.shipmentId)),
    };

    try {
      const response = await createTrip(payload).unwrap();
      setSuccessMessage(`Your Trip ID is #${response.trip.id}`);
      clearAll();
      // toast.success("Trip created successfully");
    } catch (err: any) {
      toast.error(err?.data?.error || "Failed to create trip");
    }
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <Sidebar />
      <div className="drawer-content flex flex-col bg-base-200">
        {successMessage && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-green-100 border border-green-400 text-green-800 p-6 rounded-2xl shadow-lg max-w-sm w-full flex flex-col items-center relative z-50">
              <div className="text-lg font-medium mb-2">
                ✅ Trip Created Successfully!
              </div>
              <div className="text-sm mb-4">{successMessage}</div>
              <button
                className="bg-green-200 hover:bg-green-300 text-green-800 font-bold px-4 py-2 rounded-lg"
                onClick={() => setSuccessMessage(null)}
              >
                Close
              </button>
            </div>
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setSuccessMessage(null)}
            ></div>
          </div>
        )}
        {/* Mobile Header */}
        <div className="navbar bg-base-100 lg:hidden shadow-sm">
          <div className="flex-none">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
              <Menu className="h-5 w-5" />
            </label>
          </div>
          <div className="flex-1 px-4">
            <h1 className="text-lg font-semibold">Add Trip</h1>
          </div>
        </div>

        <div className="flex-1 px-4 py-4 md:px-6 lg:px-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center animate-fadeIn">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-focus bg-clip-text text-transparent">
                Add New Trip
              </h1>
              <p className="text-base-content/60 text-sm tracking-wide">
                Create and register a new trip with assigned shipments
              </p>
            </div>

            <div className="card bg-base-100/80 backdrop-blur-md shadow-2xl border border-base-300/20 rounded-3xl overflow-hidden hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300">
              <div className="card-body p-6 md:p-8">
                <form className="space-y-8" onSubmit={handleSubmit}>
                  {/* Trip Information */}
                  <div>
                    <h2 className="text-lg font-semibold text-base-content/90 mb-6 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-primary" />
                      Trip Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Trip Date{" "}
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        </label>
                        <input
                          type="date"
                          value={today}
                          readOnly
                          className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 cursor-not-allowed outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20"
                        />
                      </div>

                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Truck <span className="text-red-500 ml-1">*</span>
                          </span>
                        </label>
                        <Select
                          unstyled
                          isSearchable
                          placeholder="- Search truck..."
                          options={truckOptions}
                          value={
                            truckOptions.find((opt) => opt.value === truckId) ||
                            null
                          }
                          onChange={(option) =>
                            setTruckId(option ? option.value : null)
                          }
                          isDisabled={isSubmitting}
                          menuPortalTarget={
                            typeof window !== "undefined" ? document.body : null
                          }
                          menuPosition="fixed"
                          menuPlacement="auto"
                          classNames={{
                            control: ({ isFocused }) =>
                              `select select-bordered w-full rounded-2xl bg-base-100/50 border-base-300 transition-all duration-300 ${
                                isFocused
                                  ? "border-primary ring-4 ring-primary/20"
                                  : ""
                              }`,
                            valueContainer: () => "px-3",
                            input: () => "text-sm",
                            placeholder: () => "text-sm text-base-content/60",
                            indicatorsContainer: () => "pr-2",
                            menu: () =>
                              "mt-2 rounded-xl border border-base-300 bg-base-100 shadow-lg",
                            option: ({ isFocused, isSelected }) =>
                              `px-3 py-2 cursor-pointer text-sm ${
                                isFocused ? "bg-base-200" : ""
                              } ${
                                isSelected
                                  ? "bg-primary text-primary-content"
                                  : ""
                              }`,
                          }}
                        />
                      </div>

                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Driver Name
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        </label>
                        <Select
                          unstyled
                          isSearchable
                          placeholder="- Search driver..."
                          options={driverOptions}
                          value={
                            driverOptions.find(
                              (opt) => opt.value === driverId,
                            ) || null
                          }
                          onChange={(option) =>
                            setDriverId(option ? option.value : null)
                          }
                          isDisabled={isSubmitting}
                          menuPortalTarget={
                            typeof window !== "undefined" ? document.body : null
                          }
                          menuPosition="fixed"
                          menuPlacement="auto"
                          classNames={{
                            control: ({ isFocused }) =>
                              `select select-bordered w-full rounded-2xl bg-base-100/50 border-base-300 transition-all duration-300 ${
                                isFocused
                                  ? "border-primary ring-4 ring-primary/20"
                                  : ""
                              }`,
                            valueContainer: () => "px-3",
                            input: () => "text-sm",
                            placeholder: () => "text-sm text-base-content/60",
                            indicatorsContainer: () => "pr-2",
                            menu: () =>
                              "mt-2 rounded-xl border border-base-300 bg-base-100 shadow-lg",
                            option: ({ isFocused, isSelected }) =>
                              `px-3 py-2 cursor-pointer text-sm ${
                                isFocused ? "bg-base-200" : ""
                              } ${
                                isSelected
                                  ? "bg-primary text-primary-content"
                                  : ""
                              }`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Driver Phone */}
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Driver Phone Number
                          </span>
                        </label>
                        <input
                          type="tel"
                          value={selectedDriver?.phoneNumber || ""}
                          readOnly
                          className="input input-bordered w-full rounded-2xl bg-neutral/10 text-base-content/70 border-base-300 cursor-not-allowed outline-none transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Assigned Shipments */}
                  <div>
                    <h2 className="text-lg font-semibold text-base-content/90 mb-6 flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      Assigned Shipments{" "}
                      <span className="text-red-500 ml-1">*</span>
                    </h2>

                    <div className="rounded-2xl border border-base-300/30 overflow-x-auto">
                      <table className="table table-zebra bg-base-100/50 w-full min-w-[900px]">
                        <thead className="bg-base-200/50">
                          <tr>
                            <th className="w-[60px]">S.No</th>
                            <th className="w-[160px]">Shipment ID</th>
                            <th className="w-[200px]">Business Name</th>
                            <th className="w-[360px]">Shipping Address</th>
                            <th className="w-[160px]">Phone</th>
                            <th className="w-[60px]"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, i) => (
                            <tr
                              key={i}
                              className="group hover:bg-base-200/30 transition-colors"
                            >
                              <td className="text-center font-medium">
                                {i + 1}
                              </td>

                              <td>
                                <Select
                                  unstyled
                                  isSearchable
                                  placeholder="- Select Shipment..."
                                  options={shipments
                                    .filter(
                                      (s) =>
                                        !selectedShipmentIds.includes(s.id) ||
                                        s.id === Number(row.shipmentId),
                                    )
                                    .map((s) => ({
                                      value: s.id,
                                      label: s.id.toString(),
                                    }))}
                                  value={
                                    row.shipmentId
                                      ? {
                                          value: Number(row.shipmentId),
                                          label: row.shipmentId.toString(),
                                        }
                                      : null
                                  }
                                  onChange={(option) =>
                                    handleShipmentChange(
                                      i,
                                      option ? String(option.value) : "",
                                    )
                                  }
                                  isDisabled={isSubmitting}
                                  menuPortalTarget={
                                    typeof window !== "undefined"
                                      ? document.body
                                      : null
                                  }
                                  menuPosition="fixed"
                                  menuPlacement="auto"
                                  classNames={{
                                    control: ({ isFocused }) =>
                                      `select select-bordered w-full rounded-2xl bg-base-100/50 border-base-300 transition-all duration-300 ${
                                        isFocused
                                          ? "border-primary ring-4 ring-primary/20"
                                          : ""
                                      }`,
                                    valueContainer: () => "px-3",
                                    input: () => "text-sm",
                                    placeholder: () =>
                                      "text-sm text-base-content/60",
                                    indicatorsContainer: () => "pr-2",
                                    menu: () =>
                                      "mt-2 rounded-xl border border-base-300 bg-base-100 shadow-lg",
                                    option: ({ isFocused, isSelected }) =>
                                      `px-3 py-2 cursor-pointer text-sm ${
                                        isFocused ? "bg-base-200" : ""
                                      } ${
                                        isSelected
                                          ? "bg-primary text-primary-content"
                                          : ""
                                      }`,
                                  }}
                                />
                              </td>

                              <td>
                                <input
                                  className="input input-bordered w-full rounded-2xl bg-neutral/10 text-base-content/70 border-base-300 cursor-not-allowed"
                                  value={row.businessName}
                                  readOnly
                                />
                              </td>

                              <td>
                                <input
                                  className="input input-bordered w-full rounded-2xl bg-neutral/10 text-base-content/70 border-base-300 cursor-not-allowed"
                                  value={row.address}
                                  readOnly
                                />
                              </td>

                              <td>
                                <input
                                  type="tel"
                                  className="input input-bordered w-full rounded-2xl bg-neutral/10 text-base-content/70 border-base-300 cursor-not-allowed"
                                  value={row.phone}
                                  readOnly
                                />
                              </td>

                              <td className="text-center">
                                {rows.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeRow(i)}
                                    className="btn btn-ghost btn-xs opacity-0 group-hover:opacity-100 text-error hover:bg-error/10 transition-opacity"
                                    disabled={isSubmitting}
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <button
                      type="button"
                      onClick={addRow}
                      className="mt-4 flex items-center gap-2 text-primary font-medium hover:text-primary-focus transition-colors disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      <Plus className="w-5 h-5" />
                      Add Shipment
                    </button>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-4 pt-6">
                    <button
                      type="submit"
                      className={`btn btn-primary rounded-2xl px-8 ${
                        isSubmitting ? "loading" : ""
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating..." : "Create Trip"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-ghost rounded-2xl px-8"
                      disabled={isSubmitting}
                      onClick={clearAll}
                    >
                      Clear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
