"use client";
import Sidebar from "@/app/admin/components/sidebar";
import { Menu, User, AlertCircle } from "lucide-react";
import { useCreateDriverMutation } from "@/app/admin/services/driverApi";
import { useGetAllTrucksQuery } from "@/app/admin/services/truckApi";
import { useMemo, useState } from "react";
import Select from "react-select";

export default function AddDriver() {
  const [createDriver, { isLoading, isError, error }] =
    useCreateDriverMutation();
  const { data: trucks = [], isLoading: trucksLoading } =
    useGetAllTrucksQuery();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedTruckId, setSelectedTruckId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    Drivername: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
  });

  const trucksOptions = useMemo(
    () =>
      trucks.map((truck) => ({
        value: truck.id,
        label: truck.truckNumber,
      })),
    [trucks],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTruckChange = (selectedOption: any) => {
    if (selectedOption) {
      setSelectedTruckId(selectedOption.value);
    } else {
      setSelectedTruckId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await createDriver({
        Drivername: formData.Drivername,
        phoneNumber: formData.phoneNumber,
        alternatePhoneNumber: formData.alternatePhoneNumber || undefined,
        truckId: selectedTruckId || undefined,
      }).unwrap();

      // ✅ response IS the driver object
      setSuccessMessage(
        `
        `,
      );

      // reset form
      setFormData({
        Drivername: "",
        phoneNumber: "",
        alternatePhoneNumber: "",
      });
      setSelectedTruckId(null);
    } catch (err: any) {
      setErrorMessage(
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

        {successMessage && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-green-100 border border-green-400 text-green-800 p-6 rounded-2xl shadow-lg max-w-sm w-full flex flex-col items-center relative z-50">
              <div className="text-lg font-medium mb-2">
                ✅ Driver Created Successfully!
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

                {isLoading || trucksLoading ? (
                  // ── Skeleton Loading UI ──
                  <div className="space-y-6 animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Driver Name - full width */}
                      <div className="form-control md:col-span-2">
                        <div className="h-5 w-32 bg-base-300 rounded mb-2"></div>
                        <div className="h-12 bg-base-300/60 rounded-2xl"></div>
                      </div>

                      {/* Truck Selection */}
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
                      <div className="form-control md:col-span-2 w-84">
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
                          className="input input-bordered w-full outline-none rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
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
                          inputMode="numeric"
                          pattern="[0-9]{10}"
                          maxLength={10}
                          value={formData.phoneNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ""); // digits only
                            setFormData({ ...formData, phoneNumber: value });
                            e.currentTarget.setCustomValidity("");
                          }}
                          onInvalid={(e) =>
                            e.currentTarget.setCustomValidity(
                              "Please enter a valid 10-digit phone number (e.g. 8555886124)",
                            )
                          }
                          className="input input-bordered w-full outline-none rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="form-control">
                        <label className="label py-1">
                          <span className="label-text font-medium text-sm">
                            Alternate Phone Number (Optional)
                          </span>
                        </label>
                        <input
                          type="tel"
                          pattern="[0-9]{10}"
                          maxLength={10}
                          name="alternatePhoneNumber"
                          value={formData.alternatePhoneNumber}
                          onChange={handleChange}
                          className="input input-bordered w-full outline-none rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="form-control w-86 md:col-span-2">
                      <label className="label py-1">
                        <span className="label-text font-medium text-sm">
                          Assign Truck (Optional)
                        </span>
                      </label>

                      <Select
                        unstyled
                        isSearchable
                        isClearable
                        isDisabled={isLoading}
                        placeholder="- Select a truck..."
                        options={trucksOptions}
                        maxMenuHeight={160}
                        value={
                          trucksOptions.find(
                            (option) => option.value === selectedTruckId,
                          ) || null
                        }
                        onChange={handleTruckChange}
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
                            `px-3 py-2 cursor-pointer text-sm
                             ${isFocused ? "bg-base-200" : ""}
                             ${isSelected ? "bg-primary text-primary-content" : ""}`,
                        }}
                      />
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
                        onClick={() => {
                          setFormData({
                            Drivername: "",
                            phoneNumber: "",
                            alternatePhoneNumber: "",
                          });
                          setSelectedTruckId(null);
                        }}
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
