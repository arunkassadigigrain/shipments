"use client";
import { Menu, Truck as TruckIcon, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useCreateTruckMutation } from "@/app/admin/services/truckApi";
import { useGetAllDriverQuery } from "@/app/admin/services/driverApi"; // ← add this import
import { useState } from "react";
import Select from "react-select"; // assuming you're using react-select
import Sidebar from "@/app/admin/components/sidebar";

interface DriverOption {
  value: number;
  label: string;
}

export default function AddTruck() {
  const [createTruck, { isLoading, isError, error }] = useCreateTruckMutation();

  // Fetch all drivers (assuming your query is named getAllDriver)
  const { data: drivers = [], isLoading: isDriversLoading } =
    useGetAllDriverQuery();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const driverOptions: DriverOption[] = drivers.map((driver: any) => ({
    value: driver.id,
    label: `${driver.Drivername} • ${driver.phoneNumber}`,
  }));

  const [form, setForm] = useState({
    truckNumber: "",
    truckCapacity: "",
    truckModel: "",
    ownerPhoneNumber: "",
    alternatePhoneNumber: "",
    defaultDriverId: null as number | null, // ← new field
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
        truckCapacity: form.truckCapacity,
        truckModel: form.truckModel,
        ownerPhoneNumber: form.ownerPhoneNumber,
        alternatePhoneNumber: form.alternatePhoneNumber,
        defaultDriverId: form.defaultDriverId ?? undefined, // send only if selected
      }).unwrap();

      setSuccessMessage(
        `
        `,
      );

      setForm({
        truckNumber: "",
        truckCapacity: "",
        truckModel: "",
        ownerPhoneNumber: "",
        alternatePhoneNumber: "",
        defaultDriverId: null,
      });
    } catch (err: any) {
      console.error("Create truck failed:", err);
    }
  };

  const handleClear = () => {
    setForm({
      truckNumber: "",
      truckCapacity: "",
      truckModel: "",
      ownerPhoneNumber: "",
      alternatePhoneNumber: "",
      defaultDriverId: null,
    });
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <Sidebar />
      <div className="drawer-content flex flex-col bg-base-200">

        {successMessage && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-green-100 border border-green-400 text-green-800 p-6 rounded-2xl shadow-lg max-w-sm w-full flex flex-col items-center relative z-50">
              <div className="text-lg font-medium mb-2">
                ✅ Truck Created Successfully!
              </div>

              <div className="text-sm mb-4 text-center">{successMessage}</div>

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

                {isLoading || isDriversLoading ? (
                  // ── Skeleton Loading UI ── (extended a bit)
                  <div className="space-y-6 animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control">
                        <div className="h-5 w-32 bg-base-300 rounded mb-2"></div>
                        <div className="h-12 bg-base-300/60 rounded-2xl"></div>
                      </div>
                      <div className="form-control">
                        <div className="h-5 w-40 bg-base-300 rounded mb-2"></div>
                        <div className="h-12 bg-base-300/60 rounded-2xl"></div>
                      </div>
                      <div className="form-control">
                        <div className="h-5 w-32 bg-base-300 rounded mb-2"></div>
                        <div className="h-12 bg-base-300/60 rounded-2xl"></div>
                      </div>
                      <div className="form-control">
                        <div className="h-5 w-40 bg-base-300 rounded mb-2"></div>
                        <div className="h-12 bg-base-300/60 rounded-2xl"></div>
                      </div>
                      <div className="form-control md:col-span-2">
                        <div className="h-5 w-40 bg-base-300 rounded mb-2"></div>
                        <div className="h-12 bg-base-300/60 rounded-2xl"></div>
                      </div>
                      {/* extra row for driver select skeleton */}
                      <div className="form-control md:col-span-2">
                        <div className="h-5 w-36 bg-base-300 rounded mb-2"></div>
                        <div className="h-12 bg-base-300/60 rounded-2xl"></div>
                      </div>
                    </div>

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
                            : "Failed to create truck. Please check the details."}
                        </span>
                      </div>
                    )}

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
                          // placeholder="e.g. HR38 AB 1234"
                          className="input input-bordered w-full outline-none rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          required
                          disabled={isLoading}
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
                          type="text"
                          name="truckCapacity"
                          value={form.truckCapacity}
                          onChange={handleChange}
                          // placeholder="e.g. 20"
                          className="input input-bordered w-full outline-none rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          required
                          disabled={isLoading}
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
                          // placeholder="e.g. Tata 407, Ashok Leyland"
                          className="input input-bordered w-full outline-none rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Truck owner Phone Number
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        </label>
                        <input
                          type="tel"
                          name="ownerPhoneNumber"
                          value={form.ownerPhoneNumber}
                          pattern="[0-9]{10}"
                          maxLength={10}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ""); // digits only
                            setForm({ ...form, ownerPhoneNumber: value });
                            e.currentTarget.setCustomValidity("");
                          }}
                          onInvalid={(e) =>
                            e.currentTarget.setCustomValidity(
                              "Please enter a valid 10-digit phone number (e.g. 8555886124)",
                            )
                          }
                          // placeholder="e.g. 9876543210"
                          className="input input-bordered w-full outline-none rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
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
                          name="alternatePhoneNumber"
                          value={form.alternatePhoneNumber}
                          inputMode="numeric"
                          maxLength={10}
                          pattern="[0-9]{10}"
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ""); // digits only
                            setForm({ ...form, alternatePhoneNumber: value });
                            e.currentTarget.setCustomValidity("");
                          }}
                          onInvalid={(e) =>
                            e.currentTarget.setCustomValidity(
                              "Please enter a valid 10-digit phone number (e.g. 8555886124)",
                            )
                          }
                          // placeholder="Optional"
                          className="input input-bordered w-full outline-none rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          disabled={isLoading}
                        />
                      </div>

                      {/* ← NEW: Default Driver Selection */}
                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Default Driver
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        </label>
                        <Select
                          unstyled
                          isSearchable
                          isClearable
                          required
                          placeholder="- Search driver..."
                          options={driverOptions}
                          value={
                            driverOptions.find(
                              (opt) => opt.value === form.defaultDriverId,
                            ) || null
                          }
                          onChange={(option) =>
                            setForm({
                              ...form,
                              defaultDriverId: option ? option.value : null,
                            })
                          }
                          isDisabled={isLoading || isDriversLoading}
                          menuPortalTarget={
                            typeof window !== "undefined" ? document.body : null
                          }
                          menuPosition="fixed"
                          menuPlacement="auto"
                          classNames={{
                            control: ({ isFocused }) =>
                              `input input-bordered w-full outline-none rounded-2xl bg-base-100/50 border-base-300 transition-all duration-300 ${
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
                              } ${isSelected ? "bg-primary text-primary-content" : ""}`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Premium Buttons */}
                    <div className="flex gap-4 pt-6">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`btn btn-primary flex-1 outline-none rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300 font-medium ${
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
                            <TruckIcon className="w-5 h-5" />
                            Save Truck
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
