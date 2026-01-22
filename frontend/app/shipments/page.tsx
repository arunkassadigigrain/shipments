"use client";
 
import { useMemo, useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/app/components/sidebar";
import { useGetAllShipmentsQuery } from "@/app/services/shipmentApi";
import type { Shipment } from "@/app/services/shipmentApi";
 
/* ===================== STATUS BADGE ===================== */
// const StatusBadge = ({ status }: { status: Shipment["status"] }) => {
//   const styles = {
//     CREATED: "badge badge-info",
//     ONTHEWAY: "badge badge-warning",
//     COMPLETED: "badge badge-success",
//   };
 
//   const labels = {
//     CREATED: "Shipment Created",
//     ONTHEWAY: "Shipment On the Way",
//     COMPLETED: "Completed",
//   };
 
//   return <span className={styles[status]}>{labels[status]}</span>;
// };
 
export default function ShipmentPage() {
  const [search, setSearch] = useState("");
 
  const {
    data: shipments = [],
    isLoading,
    isError,
  } = useGetAllShipmentsQuery();
 
  /* ===================== SEARCH FILTER ===================== */
  const filteredShipments = useMemo(() => {
    const q = search.toLowerCase();
 
    return shipments.filter((s) =>
      s.id.toString().includes(q) ||
      s.business.businessName.toLowerCase().includes(q) ||
      s.business.phoneNumber.includes(q) ||
      s.shippingAddress.addressLine1.toLowerCase().includes(q) ||
   
      s.shippingAddress.cityOrDistrict.toLowerCase().includes(q) ||
      s.shippingAddress.stateOrProvince.toLowerCase().includes(q)  
     
    );
  }, [shipments, search]);
 
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      {/* Sidebar */}
      <Sidebar />
 
      <div className="drawer-content bg-base-200 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <label
            htmlFor="my-drawer"
            className="btn btn-ghost btn-square lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </label>
 
          <h1 className="text-2xl font-bold">Shipments</h1>
 
          <input
            type="text"
            placeholder="Search shipment..."
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
                  <th>Shipment Date</th>
                  <th>Shipment ID</th>
                  {/* <th>Status</th> */}
                  <th>Business Name</th>
                  <th>Phone Number</th>
                  <th>Shipping Address</th>
                </tr>
              </thead>
 
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={5} className="text-center text-red-500">
                      Failed to load shipments
                    </td>
                  </tr>
                ) : filteredShipments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400">
                      No shipments found
                    </td>
                  </tr>
                ) : (
                  filteredShipments.map((s) => (
                    <tr key={s.id}>
                      <td>
                        {new Date(s.shipmentDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
 
                      <td>{String(s.id).padStart(4, "0")}</td>
 
                      {/* <td>
                        <StatusBadge status={s.status} />
                      </td> */}
 
                      <td>{s.business.businessName}</td>
 
                      <td>{s.business.phoneNumber}</td>
 
                      <td className="max-w-md whitespace-normal">
                        {s.shippingAddress.addressLine1}
                        {s.shippingAddress.addressLine2 && (
                          <> , {s.shippingAddress.addressLine2}</>
                        )}
                        <br />
                        {s.shippingAddress.cityOrDistrict},{" "}
                        {s.shippingAddress.stateOrProvince} -{" "}
                        {s.shippingAddress.postalCode}
                      </td>
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
 