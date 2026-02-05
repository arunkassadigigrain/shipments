"use client";

import { useMemo, useState } from "react";
import { Menu, Package } from "lucide-react";
import Sidebar from "@/app/admin/components/sidebar";
import { useGetAllShipmentsQuery } from "@/app/admin/services/shipmentApi";

/* ===================== STATUS BADGE ===================== */
type ShipmentStatus = "CREATED" | "ONTHEWAY" | "COMPLETED";

const StatusBadge = ({ status }: { status: ShipmentStatus }) => {
  const meta: Record<
    ShipmentStatus,
    {
      label: string;
      className: string;
    }
  > = {
    CREATED: {
      label: "CREATED",
      className: "badge badge-info gap-2",
    },
    ONTHEWAY: {
      label: "ON THE WAY",
      className: "badge badge-warning gap-2",
    },
    COMPLETED: {
      label: "COMPLETED",
      className: "badge badge-success gap-2",
    },
  };

  return <span className={meta[status].className}>{meta[status].label}</span>;
};

export default function ShipmentPage() {
  const [search, setSearch] = useState("");
  const [selectedShipment, setSelectedShipment] = useState<any>(null);

  const {
    data: shipments = [],
    isLoading,
    isError,
  } = useGetAllShipmentsQuery();

  /* ===================== SEARCH FILTER ===================== */
  const filteredShipments = useMemo(() => {
    const q = search.toLowerCase();

    return shipments.filter(
      (s: any) =>
        s.id.toString().includes(q) ||
        s.business.businessName.toLowerCase().includes(q) ||
        s.business.phoneNumber.includes(q) ||
        s.shippingAddress.addressLine1.toLowerCase().includes(q) ||
        s.shippingAddress.cityOrDistrict.toLowerCase().includes(q) ||
        s.shippingAddress.stateOrProvince.toLowerCase().includes(q),
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
                  <th>Business Name</th>
                  <th>Phone Number</th>
                  <th>Shipping Address</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={6} className="text-center text-red-500">
                      Failed to load shipments
                    </td>
                  </tr>
                ) : filteredShipments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-400">
                      No shipments found
                    </td>
                  </tr>
                ) : (
                  filteredShipments.map((s: any) => (
                    <tr key={s.id}>
                      <td>
                        {new Date(s.shipmentDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      <td
                        className="text-primary cursor-pointer hover:underline font-medium"
                        onClick={() => setSelectedShipment(s)}
                      >
                        Shipment #{String(s.id).padStart(4, "0")}
                      </td>

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

                      {/* ✅ STATUS WORKS HERE */}
                      <td>
                        <StatusBadge status={s.Status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {selectedShipment && (
              <dialog className="modal modal-open">
                {/* Header */}

                <div className="modal-box max-w-2xl bg-base-100 rounded-3xl ">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-3 border-b pb-2">
                    <Package className="w-6 h-6 text-primary" />
                    Shipment #{String(selectedShipment.id).padStart(4, "0")}
                    <button
                      className="btn btn-sm btn-circle btn-ghost ml-auto"
                      onClick={() => setSelectedShipment(null)}
                    >
                      ✕
                    </button>
                  </h3>

               

                  {/* Business Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="p-3 bg-base-200 rounded-lg">
                      <p className="text-xs text-blue-700">Business Name</p>
                      <p className="font-medium">
                        {selectedShipment.business.businessName}
                      </p>
                    </div>

                    <div className="p-3 bg-base-200 rounded-lg">
                      <p className="text-xs text-blue-700">Phone Number</p>
                      <p className="font-medium">
                        {selectedShipment.business.phoneNumber}
                      </p>
                     
                    </div>

                    <div className="p-3 bg-base-200 rounded-lg ">
                      <p className="text-xs text-blue-700">Shipping Address</p>
                      <p className="font-medium">
                        {selectedShipment.shippingAddress.addressLine1},{" "}
                        {selectedShipment.shippingAddress.addressLine2},{" "}
                        {selectedShipment.shippingAddress.cityOrDistrict},{" "}
                        {selectedShipment.shippingAddress.stateOrProvince},{""}
                        {selectedShipment.shippingAddress.postalCode}
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="mt-4">
                    <p className="text-sm text-blue-700 text-center md-2">
                      Shipment Items
                    </p>

                    {selectedShipment.shipmentItems.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex justify-between p-3 bg-base-200 rounded-lg mb-2 text-sm"
                      >
                        {/* ✅ ITEM DESCRIPTION */}
                        <p className="text-sm text-gray-700">
                          {item.item?.itemDescription || "-"}
                        </p>

                        <span>Quantity:{item.quantity}</span>
                        <span>₹Rate:{item.itemRate}</span>
                        <span>Subtotal: {item.subtotal}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-3 p-3 rounded-lg font-semibold text-sm">
                    <span className="mr-4">Total:</span>
                    <span className="text-primary">
                      ₹{Number(selectedShipment.totalAmount)}
                    </span>
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