"use client";
import Sidebar from "@/app/components/sidebar";
import { Menu, Truck as TruckIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useCreateTruckMutation } from "@/app/services/truckApi";
import { useState } from "react";

export default function AddTruck() {
  const [createTruck, { isLoading, isError }] = useCreateTruckMutation();
  const [form, setForm] = useState({
      truckNumber: '',
      truckCapacity: '',
      truckModel: '',
      ownerPhoneNumber: '',
      alternatePhoneNumber: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createTruck({
        truckNumber: form.truckNumber,
        truckCapacity: Number(form.truckCapacity),
        truckModel: form.truckModel,
        ownerPhoneNumber: form.ownerPhoneNumber,
        alternatePhoneNumber: form.alternatePhoneNumber,
      }).unwrap();

      toast.success("Truck details created successfully");

      setForm({
        truckNumber: "",
        truckCapacity: "",
        truckModel: "",
        ownerPhoneNumber: "",
        alternatePhoneNumber: "",
      });
    } catch (error: string | any) {
      console.error("Create item failed:", error);

      toast.error(
        error?.data?.message || "Failed to create item. Please try again."
      );
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
            <h1 className="text-lg font-semibold">Add Truck</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 py-4 md:px-6 lg:px-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">

            {/* Elegant Header */}
            <div className="mb-8 text-center animate-fadeIn">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-focus bg-clip-text text-transparent">
                Add New Truck
              </h1>
              <p className="text-base-content/60 text-sm tracking-wide">
                Register a new truck in the system
              </p>
            </div>

            {/* Premium Form Card */}
            <div className="card bg-base-100/80 backdrop-blur-md shadow-2xl border border-base-300/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300">
              <div className="card-body p-6 md:p-8">

                <h2 className="text-lg font-semibold text-base-content/90 mb-6 flex items-center gap-2">
                  <TruckIcon className="w-5 h-5 text-primary" />
                  Truck Details
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit}>

                  {/* Truck Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text font-medium text-sm">
                          Truck Number
                          <span className="text-red-500 ml-1">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        name="truckNumber"
                        value={form.truckNumber}
                        onChange={handleChange}
                        placeholder="e.g. HR38 AB 1234"
                        className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text font-medium text-sm">
                          Truck Capacity (Tons)
                          <span className="text-red-500 ml-1">*</span>
                        </span>
                      </label>
                      <input
                        type="number"
                        name="truckCapacity"
                        value={form.truckCapacity}
                        onChange={handleChange}
                        placeholder="e.g. 20"
                        className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text font-medium text-sm">
                          Truck Model
                          <span className="text-red-500 ml-1">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        name="truckModel"
                        value={form.truckModel}
                        onChange={handleChange}
                        placeholder="e.g. Tata 407, Ashok Leyland"
                        className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text font-medium text-sm">
                          Owner Phone Number
                          <span className="text-red-500 ml-1">*</span>
                        </span>
                      </label>
                      <input
                        type="tel"
                        name="ownerPhoneNumber"
                        value={form.ownerPhoneNumber}
                        onChange={handleChange}
                        placeholder="e.g. 9876543210"
                        className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="form-control md:col-span-2">
                      <label className="label py-1">
                        <span className="label-text font-medium text-sm">
                          Alternate Phone Number
                        </span>
                      </label>
                      <input
                        type="tel"
                        placeholder="Optional"
                        className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                      />
                    </div>

                  </div>

                  {/* Premium Buttons */}
                  <div className="flex gap-4 pt-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-primary flex-1 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300 font-medium"
                    >
                      <TruckIcon className="w-5 h-5" />
                      Save Truck
                    </button>

                    <button
                      type="button"
                      className="btn btn-ghost flex-1 rounded-2xl border border-base-300 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 font-medium"
                      onClick={() => {}}
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