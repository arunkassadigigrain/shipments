"use client";

import Sidebar from "@/app/components/sidebar";
import { Menu, Truck, Plus } from "lucide-react";
import { useState } from "react";
import {useGetAllItemsQuery} from "@/app/services/itemApi";

export default function AddShipment() {
  const [rows, setRows] = useState([
    {
      itemName: "",
      variety: "",
      packing: "",
      qty: 1,
      rate: "",
      Subtotal: "",
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      { itemName: "", variety: "", packing: "", qty: 1, rate: "" },
    ]);
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
            <h1 className="text-lg font-semibold">Add Shipment</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 py-4 md:px-6 lg:px-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">

            {/* Elegant Header */}
            <div className="mb-8 text-center animate-fadeIn">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-focus bg-clip-text text-transparent">
                Add New Shipment
              </h1>
              <p className="text-base-content/60 text-sm tracking-wide">
                Create and register a new shipment with item details
              </p>
            </div>

            {/* Premium Form Card */}
            <div className="card bg-base-100/80 backdrop-blur-md shadow-2xl border border-base-300/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300">
              <div className="card-body p-6 md:p-8">

                <form className="space-y-8">

                  {/* ===== Shipment ID & Date ===== */}
                  <div>
                    <h2 className="text-lg font-semibold text-base-content/90 mb-6 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-primary" />
                      Shipment Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Shipment ID
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 0001"
                          className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          required
                        />
                      </div>

                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Shipment Date
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        </label>
                        <input
                          type="date"
                          className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* ===== Customer Details ===== */}
                  <div>
                    <h2 className="text-lg font-semibold text-base-content/90 mb-6 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Customer Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Business Name
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        </label>
                        <select className="select select-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300" required>
                          <option value="">- Select select select -</option>
                        </select>
                      </div>

                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Contact Person Name
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        </label>
                        <input
                          type="text"
                          className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          required
                        />
                      </div>

                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Email
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        </label>
                        <input
                          type="email"
                          className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          required
                        />
                      </div>

                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Phone Number
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. 81234 56789"
                          className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* ===== Billing Address ===== */}
                  <div>
                    <h2 className="text-lg font-semibold text-base-content/90 mb-6 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Billing Address
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control md:col-span-2">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Address Line 1
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        </label>
                        <textarea
                          className="textarea textarea-bordered min-h-[100px] resize-none rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          placeholder="Street, Building, Area"
                          required
                        />
                      </div>

                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Address Line 2
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Landmark, Floor (optional)"
                          className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                        />
                      </div>

                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            City / District
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Mumbai"
                          className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          required
                        />
                      </div>

                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            State / Province
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Maharashtra"
                          className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          required
                        />
                      </div>

                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Postal Code
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 400001"
                          className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* ===== Shipment Details (Table) ===== */}
                  <div>
                    <h2 className="text-lg font-semibold text-base-content/90 mb-6 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Shipment Items
                    </h2>

                    <div className="overflow-x-auto rounded-2xl border border-base-300/30">
                      <table className="table bg-base-100/50">
                        <thead className="bg-base-200/50">
                          <tr>
                            <th className="text-sm font-medium">S.No</th>
                            <th className="text-sm font-medium">Item Details</th>
                            <th className="text-sm font-medium">Quantity</th>
                            <th className="text-sm font-medium">Rate</th>
                            <th className="text-sm font-medium">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((_, i) => (
                            <tr key={i} className="hover:bg-base-200/30 transition-colors">
                              <td className="text-center font-medium">{i + 1}</td>
                              <td>
                                <select className="select select-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20">
                                  <option>- Select Select select select -</option>
                                </select>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  placeholder="Enter"
                                  className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                                  onChange={(e) =>
                                    (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  placeholder="Rate"
                                  className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                                />
                              </td>
                              <td>
                                <input
                                  disabled
                                  placeholder="0.00"
                                  className="input input-bordered w-full rounded-2xl bg-neutral/20"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <button
                      type="button"
                      onClick={addRow}
                      className="mt-4 flex items-center gap-2 text-primary font-medium hover:text-primary-focus transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                      Add Item
                    </button>

                    <div className="flex justify-end mt-6">
                      <div className="text-right">
                        <span className="text-lg font-semibold text-base-content">
                          Total Cost:
                        </span>
                        <span className="ml-4 text-2xl font-bold text-primary">
                          ₹0.00
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Premium Buttons */}
                  <div className="flex gap-4 pt-6">
                    <button
                      type="submit"
                      className="btn btn-primary flex-1 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300 font-medium"
                    >
                      <Truck className="w-5 h-5" />
                      Submit Shipment
                    </button>

                    <button
                      type="button"
                      className="btn btn-ghost flex-1 rounded-2xl border border-base-300 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 font-medium"
                    >
                      Clear Shipment
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