"use client";
import Sidebar from "@/app/components/sidebar" 
import { useState } from "react";
import { Menu, UserPlus, AlertCircle } from "lucide-react";
import { useCreateCustomerMutation } from "@/app/services/customerApi";
import { toast } from "react-toastify";

export default function AddCustomer() {
  
  const [createCustomer, { isLoading, isError, error }] = useCreateCustomerMutation();

  const [form, setForm] = useState({
    businessName: "",
    contactPersonName: "",
    phoneNumber: "",
    email: "",
    billingAddress: {
      addressLine1: "",
      addressLine2: "",
      cityOrDistrict: "",
      stateOrProvince: "",
      postalCode: 0,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      billingAddress: {
        ...form.billingAddress,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createCustomer(form).unwrap();
      toast.success("Customer created successfully");

      setForm({
        businessName: "",
        contactPersonName: "",
        phoneNumber: "",
        email: "",
        billingAddress: {
          addressLine1: "",
          addressLine2: "",
          cityOrDistrict: "",
          stateOrProvince: "",
          postalCode: 0,
        },
      });
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create customer");
    }
  };

  const handleClear = () => {
    setForm({
      businessName: "",
      contactPersonName: "",
      phoneNumber: "",
      email: "",
      billingAddress: {
        addressLine1: "",
        addressLine2: "",
        cityOrDistrict: "",
        stateOrProvince: "",
        postalCode: 0,
      },
    });
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <Sidebar />
      <div className="drawer-content flex flex-col bg-base-200">
        {/* Mobile Header */}
        {/* <div className="navbar bg-base-100 lg:hidden shadow-sm">
          <div className="flex-none">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
              <Menu className="h-5 w-5" />
            </label>
          </div>
          <div className="flex-1 px-4">
            <h1 className="text-lg font-semibold">Add Customer</h1>
          </div>
        </div> */}

        {/* Main Content */}
        <div className="flex-1 px-4 py-4 md:px-6 lg:px-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            {/* Elegant Header */}
            <div className="mb-8 text-center animate-fadeIn animation-delay-200">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-focus bg-clip-text text-transparent">
                Add New Customer
              </h1>
              <p className="text-base-content/60 text-sm tracking-wide">
                Register a new business and billing details
              </p>
            </div>

            {/* Premium Form Card */}
            <div className="card bg-base-100/80 backdrop-blur-md shadow-2xl border border-base-300/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300">
              <div className="card-body p-6 md:p-8">
                {isLoading ? (
                  // ── Skeleton Loading State (written directly) ──
                  <div className="space-y-10 animate-pulse">
                    {/* Business Details Skeleton */}
                    <div>
                      <div className="h-7 w-48 bg-base-300 rounded mb-6"></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                          <div className="h-5 w-32 bg-base-300 rounded mb-2"></div>
                          <div className="h-12 bg-base-300/60 rounded-2xl"></div>
                        </div>
                        <div className="form-control">
                          <div className="h-5 w-32 bg-base-300 rounded mb-2"></div>
                          <div className="h-12 bg-base-300/60 rounded-2xl"></div>
                        </div>
                        <div className="form-control">
                          <div className="h-5 w-32 bg-base-300 rounded mb-2"></div>
                          <div className="h-12 bg-base-300/60 rounded-2xl"></div>
                        </div>
                        <div className="form-control">
                          <div className="h-5 w-32 bg-base-300 rounded mb-2"></div>
                          <div className="h-12 bg-base-300/60 rounded-2xl"></div>
                        </div>
                      </div>
                    </div>

                    {/* Billing Address Skeleton */}
                    <div>
                      <div className="h-7 w-48 bg-base-300 rounded mb-6"></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control md:col-span-2">
                          <div className="h-5 w-40 bg-base-300 rounded mb-2"></div>
                          <div className="h-32 bg-base-300/60 rounded-2xl"></div>
                        </div>
                        <div className="form-control">
                          <div className="h-5 w-32 bg-base-300 rounded mb-2"></div>
                          <div className="h-12 bg-base-300/60 rounded-2xl"></div>
                        </div>
                        <div className="form-control">
                          <div className="h-5 w-32 bg-base-300 rounded mb-2"></div>
                          <div className="h-12 bg-base-300/60 rounded-2xl"></div>
                        </div>
                        <div className="form-control">
                          <div className="h-5 w-32 bg-base-300 rounded mb-2"></div>
                          <div className="h-12 bg-base-300/60 rounded-2xl"></div>
                        </div>
                        <div className="form-control">
                          <div className="h-5 w-32 bg-base-300 rounded mb-2"></div>
                          <div className="h-12 bg-base-300/60 rounded-2xl"></div>
                        </div>
                      </div>
                    </div>

                    {/* Buttons Skeleton */}
                    <div className="flex gap-4 pt-6">
                      <div className="btn btn-primary flex-1 h-12 rounded-2xl opacity-50"></div>
                      <div className="btn btn-ghost flex-1 h-12 rounded-2xl opacity-50"></div>
                    </div>
                  </div>
                ) : (
                  // ── Real Form (unchanged) ──
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    {isError && (
                      <div className="alert alert-error shadow-lg rounded-2xl">
                        <AlertCircle className="w-6 h-6" />
                        <span>
                          {error && "data" in error && (error.data as any)?.message
                            ? (error.data as any).message
                            : "Failed to create customer. Please check the details."}
                        </span>
                      </div>
                    )}

                    {/* ===== Business Details ===== */}
                    <div>
                      <h2 className="text-lg font-semibold text-base-content/90 mb-6 flex items-center gap-2">
                        <UserPlus className="w-5 h-5 text-primary" />
                        Business Details
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                          <label className="label py-1">
                            <span className="label-text font-medium text-sm">
                              Business Name<span className="text-red-500 ml-1">*</span>
                            </span>
                          </label>
                          <input
                            type="text"
                            name="businessName"
                            value={form.businessName}
                            onChange={handleChange}
                            placeholder="e.g. Digi Grain"
                            disabled={isLoading}
                            className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 outline-none focus:ring-primary/20 transition-all duration-300"
                            required
                          />
                        </div>

                        <div className="form-control">
                          <label className="label py-1">
                            <span className="label-text font-medium text-sm">
                              Contact Person<span className="text-red-500 ml-1">*</span>
                            </span>
                          </label>
                          <input
                            type="text"
                            name="contactPersonName"
                            value={form.contactPersonName}
                            onChange={handleChange}
                            placeholder="e.g. Praven Gade"
                            disabled={isLoading}
                            className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                            required
                          />
                        </div>

                        <div className="form-control">
                          <label className="label py-1">
                            <span className="label-text font-medium text-sm">
                              Phone Number<span className="text-red-500 ml-1">*</span>
                            </span>
                          </label>
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            placeholder="e.g. +91 9392382434"
                            disabled={isLoading}
                            className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                            required
                          />
                        </div>

                        <div className="form-control">
                          <label className="label py-1">
                            <span className="label-text font-medium text-sm">
                              Email Address<span className="text-red-500 ml-1">*</span>
                            </span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="e.g. praveen@digigrain.in"
                            disabled={isLoading}
                            className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300"
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
                              Address Line 1<span className="text-red-500 ml-1 mr-2">*</span>
                            </span>
                          </label>
                          <textarea
                            name="addressLine1"
                            value={form.billingAddress.addressLine1}
                            onChange={handleAddressChange}
                            disabled={isLoading}
                            className="textarea textarea-bordered min-h-[100px] outline-none resize-none rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                            placeholder="Street, Building, Area"
                            required
                          />
                        </div>

                        <div className="form-control">
                          <label className="label py-1">
                            <span className="label-text font-medium text-sm">Address Line 2</span>
                          </label>
                          <input
                            type="text"
                            name="addressLine2"
                            value={form.billingAddress.addressLine2}
                            onChange={handleAddressChange}
                            disabled={isLoading}
                            placeholder="Landmark, Floor (optional)"
                            className="input input-bordered w-full rounded-2xl outline-none bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          />
                        </div>

                        <div className="form-control">
                          <label className="label py-1">
                            <span className="label-text font-medium text-sm">
                              City / District<span className="text-red-500 ml-1">*</span>
                            </span>
                          </label>
                          <input
                            type="text"
                            name="cityOrDistrict"
                            value={form.billingAddress.cityOrDistrict}
                            onChange={handleAddressChange}
                            disabled={isLoading}
                            placeholder="e.g. Hyderabad"
                            className="input input-bordered w-full rounded-2xl outline-none bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                            required
                          />
                        </div>

                        <div className="form-control">
                          <label className="label py-1">
                            <span className="label-text font-medium text-sm">
                              State / Province<span className="text-red-500 ml-1">*</span>
                            </span>
                          </label>
                          <input
                            type="text"
                            name="stateOrProvince"
                            value={form.billingAddress.stateOrProvince}
                            onChange={handleAddressChange}
                            disabled={isLoading}
                            placeholder="e.g. Telangana"
                            className="input input-bordered w-full rounded-2xl outline-none bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                            required
                          />
                        </div>

                        <div className="form-control">
                          <label className="label py-1">
                            <span className="label-text font-medium text-sm">
                              Postal Code<span className="text-red-500 ml-1">*</span>
                            </span>
                          </label>
                          <input
                            type="numeric"
                            name="postalCode"
                            value={form.billingAddress.postalCode}
                            onChange={handleAddressChange}
                            disabled={isLoading}
                            placeholder="e.g. 500001"
                            className="input input-bordered w-full rounded-2xl outline-none bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Premium Buttons */}
                    <div className="flex gap-4 pt-6">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`btn btn-primary flex-1 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300 font-medium ${
                          isLoading ? "opacity-75 cursor-wait" : ""
                        }`}
                      >
                        {isLoading ? (
                          <>
                            <span className="loading loading-spinner loading-md"></span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-5 h-5" />
                            Save Customer
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        disabled={isLoading}
                        className="btn btn-ghost flex-1 rounded-2xl border border-base-300 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 font-medium"
                        onClick={handleClear}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}