"use client";
import Sidebar from "@/app/components/sidebar";
import { Menu, UserPlus } from "lucide-react";
import { useCreateCustomerMutation } from "@/app/services/customerApi";
import { useState } from "react";
import { toast } from "react-toastify";


export default function AddCustomer() {

  const [createCustomer, { isLoading, isError }] = useCreateCustomerMutation();

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


  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      billingAddress: {
        ...form.billingAddress,
        [e.target.name]: e.target.value,
      },
    });
  };



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createCustomer(form).unwrap();
      toast.success("Business created successfully");
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
    } catch (err) {
      toast.error("Failed to create business");
    }
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
            <h1 className="text-lg font-semibold">Add Customer</h1>
          </div>
        </div>

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

                <form className="space-y-8" onSubmit={handleSubmit}>

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
                            Business Name
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        </label>
                        <input
                          type="text"
                          name="businessName"
                          value={form.businessName}
                          onChange={handleChange}
                          placeholder="e.g. Digi Grain"
                          className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          required
                        />
                      </div>

                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Contact Person
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        </label>
                        <input
                          type="text"
                          name="contactPersonName"
                          value={form.contactPersonName}
                          onChange={handleChange}
                          placeholder="e.g. Praven Gade"
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
                          name="phoneNumber"
                          value={form.phoneNumber}
                          onChange={handleChange}
                          placeholder="e.g. +91 9392382434"
                          className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          required
                        />
                      </div>

                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Email Address
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="e.g. praveen@digigrain.in"
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
                          name="addressLine1"
                          value={form.billingAddress.addressLine1}
                          onChange={handleAddressChange}
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
                          name="addressLine2"
                          value={form.billingAddress.addressLine2}
                          onChange={handleAddressChange}
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
                          name="cityOrDistrict"
                          value={form.billingAddress.cityOrDistrict}
                          onChange={handleAddressChange}
                          placeholder="e.g. Hyderabad"
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
                          name="stateOrProvince"
                          value={form.billingAddress.stateOrProvince}
                          onChange={handleAddressChange}
                          placeholder="e.g. Telangana"
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
                          name="postalCode"
                          value={form.billingAddress.postalCode}
                          onChange={handleAddressChange}
                          placeholder="e.g. 500001"
                          className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
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
                      className="btn btn-primary flex-1 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300 font-medium"
                    >
                      <UserPlus className="w-5 h-5" />
                      Save Customer
                    </button>

                    <button
                      type="button"
                      className="btn btn-ghost flex-1 rounded-2xl border border-base-300 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 font-medium"
                      onClick={() => setForm({
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
                      })}
                    >
                      Cancel
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