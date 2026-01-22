// app/drivers/add/page.tsx
"use client";
import Sidebar from "@/app/components/sidebar";
import { Menu, User, AlertCircle } from "lucide-react";
import { useCreateDriverMutation } from "@/app/services/driverApi";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddDriver() {
  const [createDriver, { isLoading, isError, error }] =
    useCreateDriverMutation();

  const [formData, setFormData] = useState({
    Drivername: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createDriver({
        Drivername: formData.Drivername,
        phoneNumber: formData.phoneNumber,
        alternatePhoneNumber: formData.alternatePhoneNumber,
      }).unwrap();

      toast.success("Driver created successfully");

      setFormData({
        Drivername: "",
        phoneNumber: "",
        alternatePhoneNumber: "",
      });
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Failed to create driver. Please try again.",
      );
    }
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
            <h1 className="text-lg font-semibold">Add Driver</h1>
          </div>
        </div> */}

        {/* Main Content */}
        <div className="flex-1 px-4 py-4 md:px-6 lg:px-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            {/* Elegant Header */}
            <div className="mb-8 text-center animate-fadeIn">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-focus bg-clip-text text-transparent">
                Add New Driver
              </h1>
              <p className="text-base-content/60 text-sm tracking-wide">
                Register a new driver in the system
              </p>
            </div>

            {/* Premium Form Card */}
            <div className="card bg-base-100/80 backdrop-blur-md shadow-2xl border border-base-300/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300">
              <div className="card-body p-6 md:p-8">
                <h2 className="text-lg font-semibold text-base-content/90 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Driver Details
                </h2>

                {isLoading ? (
                  // ── Skeleton Loading UI (written directly) ──
                  <div className="space-y-6 animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Driver Name - full width */}
                      <div className="form-control md:col-span-2">
                        <div className="h-5 w-32 bg-base-300 rounded mb-2"></div>
                        <div className="h-12 bg-base-300/60 rounded-2xl"></div>
                      </div>

                      {/* Phone Number */}
                      <div className="form-control">
                        <div className="h-5 w-32 bg-base-300 rounded mb-2"></div>
                        <div className="h-12 bg-base-300/60 rounded-2xl"></div>
                      </div>

                      {/* Alternate Phone */}
                      <div className="form-control">
                        <div className="h-5 w-40 bg-base-300 rounded mb-2"></div>
                        <div className="h-12 bg-base-300/60 rounded-2xl"></div>
                      </div>
                    </div>

                    {/* Buttons skeleton */}
                    <div className="flex gap-4 pt-6">
                      <div className="btn btn-primary flex-1 h-12 rounded-2xl opacity-50"></div>
                      <div className="btn btn-ghost flex-1 h-12 rounded-2xl opacity-50"></div>
                    </div>
                  </div>
                ) : (
                  // ── Real Form ──
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {isError && (
                      <div className="alert alert-error shadow-lg rounded-2xl">
                        <AlertCircle className="w-6 h-6" />
                        <span>
                          {error &&
                          "data" in error &&
                          (error.data as any)?.message
                            ? (error.data as any).message
                            : "Failed to create driver. Please check the details."}
                        </span>
                      </div>
                    )}

                    {/* Driver Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control md:col-span-2">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Driver Name
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        </label>
                        <input
                          type="text"
                          name="Drivername"
                          value={formData.Drivername}
                          onChange={handleChange}
                          placeholder="e.g. Ram Singh"
                          className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          required
                          disabled={isLoading}
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
                          pattern="[0-9]{10}"
                          maxLength={10}
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="e.g. 9876543210"
                          className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Alternate Phone Number
                          </span>
                        </label>
                        <input
                          type="tel"
                          pattern="[0-9]{10}"
                          maxLength={10}
                          name="alternatePhoneNumber"
                          value={formData.alternatePhoneNumber}
                          onChange={handleChange}
                          placeholder="Optional"
                          className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          disabled={isLoading}
                        />
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
                            <User className="w-5 h-5" />
                            Save Driver
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        disabled={isLoading}
                        className="btn btn-ghost flex-1 rounded-2xl border border-base-300 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 font-medium"
                        onClick={() =>
                          setFormData({
                            Drivername: "",
                            phoneNumber: "",
                            alternatePhoneNumber: "",
                          })
                        }
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
