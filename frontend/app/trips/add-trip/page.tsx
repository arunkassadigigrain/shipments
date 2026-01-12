"use client";

import Sidebar from "@/app/components/sidebar";
import { Menu, Truck, Plus } from "lucide-react";
import { useState } from "react";

type TripRow = {
  shipmentId: string;
  businessName: string;
  address: string;
  phone: string;
};

export default function AddTrip() {
  const [rows, setRows] = useState<TripRow[]>([{
    shipmentId: "",
    businessName: "",
    address: "",
    phone: "",
  }]);

  const addRow = () => {
    setRows([...rows, { shipmentId: "", businessName: "", address: "", phone: "" }]);
  };

  const removeRow = (index: number) => {
    if (rows.length > 1) setRows(rows.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setRows([{ shipmentId: "", businessName: "", address: "", phone: "" }]);
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <Sidebar />

      <div className="drawer-content flex flex-col bg-base-200">
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

        {/* Main Content */}
        <div className="flex-1 px-4 py-4 md:px-6 lg:px-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Elegant Header */}
            <div className="mb-8 text-center animate-fadeInUp">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-focus bg-clip-text text-transparent">
                Create New Trip
              </h1>
              <p className="text-base-content/60 text-sm tracking-wide">
                Assign shipments to a truck and driver for delivery
              </p>
            </div>

            {/* Premium Form Card */}
            <div className="card bg-base-100/80 backdrop-blur-md shadow-2xl border border-base-300/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300">
              <div className="card-body p-6 md:p-8">
                <form className="space-y-8">
                  {/* Trip Details */}
                  <div>
                    <h2 className="text-lg font-semibold text-base-content/90 mb-6 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-primary" />
                      Trip Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control">
                        <label className="label py-1"><span className="label-text font-medium text-sm">Trip ID</span></label>
                        <input type="text" value="TR-0001" readOnly className="input input-bordered rounded-2xl bg-base-200" />
                      </div>
                      <div className="form-control">
                        <label className="label py-1"><span className="label-text font-medium text-sm">Trip Date <span className="text-red-500">*</span></span></label>
                        <input type="date" className="input input-bordered rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all" required />
                      </div>
                      <div className="form-control">
                        <label className="label py-1"><span className="label-text font-medium text-sm">Select Truck <span className="text-red-500">*</span></span></label>
                        <select className="select select-bordered rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20" required>
                          <option>- Select Truck -</option>
                        </select>
                      </div>
                      <div className="form-control">
                        <label className="label py-1"><span className="label-text font-medium text-sm">Select Driver <span className="text-red-500">*</span></span></label>
                        <select className="select select-bordered rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20" required>
                          <option>- Select Driver -</option>
                        </select>
                      </div>
                      <div className="form-control md:col-span-2">
                        <label className="label py-1"><span className="label-text font-medium text-sm">Driver Phone</span></label>
                        <input type="tel" placeholder="+91 XXXXX XXXXX" className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all" />
                      </div>
                    </div>
                  </div>

                  {/* Shipments Table */}
                  <div>
                    <h2 className="text-lg font-semibold text-base-content/90 mb-6">
                      Assigned Shipments <span className="text-red-500">*</span>
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="table table-zebra w-full">
                        <thead className="bg-base-200">
                          <tr>
                            <th>S.No</th>
                            <th>Shipment ID</th>
                            <th>Business Name</th>
                            <th>Shipping Address</th>
                            <th>Phone Number</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, i) => (
                            <tr key={i} className="hover:bg-base-200/50">
                              <td className="text-center font-medium">{i + 1}</td>
                              <td>
                                <select className="select select-bordered w-full rounded-xl" required>
                                  <option>- Select -</option>
                                </select>
                              </td>
                              <td><input className="input input-bordered w-full rounded-xl" placeholder="Auto-filled" readOnly /></td>
                              <td><input className="input input-bordered w-full rounded-xl" placeholder="Auto-filled" readOnly /></td>
                              <td><input type="tel" className="input input-bordered w-full rounded-xl" placeholder="Auto-filled" readOnly /></td>
                              <td className="text-center">
                                {rows.length > 1 && (
                                  <button type="button" onClick={() => removeRow(i)} className="btn btn-ghost btn-sm text-error hover:bg-error/10">
                                    ✕
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
                      className="mt-4 btn btn-outline btn-sm rounded-xl hover:bg-primary hover:text-white hover:border-primary transition"
                    >
                      <Plus className="w-4 h-4" />
                      Add Shipment
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6">
                    <button
                      type="submit"
                      className="btn btn-primary flex-1 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300 font-medium"
                    >
                      <Truck className="w-5 h-5" />
                      Create Trip
                    </button>
                    <button
                      type="button"
                      onClick={clearAll}
                      className="btn btn-ghost flex-1 rounded-2xl border border-base-300 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 font-medium"
                    >
                      Clear All
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