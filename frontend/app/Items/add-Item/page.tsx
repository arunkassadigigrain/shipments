// app/items/add/page.tsx
"use client";
import { useState } from "react";
import Sidebar from "@/app/components/sidebar";
import { Menu, Package } from "lucide-react";
import { useCreateItemMutation } from "@/app/services/itemApi";
import { toast } from "react-toastify";


export default function AddItem() {

  const [createItem, { isLoading, isError }] = useCreateItemMutation();

  const [form, setForm] = useState({
    itemName: '',
    itemVariety: '',
    packingType: '',
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
      await createItem({
        itemName: form.itemName,
        itemVariety: form.itemVariety,
        packingType: form.packingType,
      }).unwrap();

      toast.success("Item created successfully");

      setForm({
        itemName: "",
        itemVariety: "",
        packingType: "",
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
            <h1 className="text-lg font-semibold">Add Item</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 py-4 md:px-6 lg:px-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">

            {/* Header – elegant */}
            <div className="mb-8 text-center animate-fadeIn">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-focus bg-clip-text text-transparent">
                Add New Item
              </h1>
              <p className="text-base-content/60 text-sm tracking-wide">
                Register a new grain/item with premium quality standards
              </p>
            </div>

            {/* Premium Form Card */}
            <div className="card bg-base-100/80 backdrop-blur-md shadow-2xl border border-base-300/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300">
              <div className="card-body p-6 md:p-8">
                <h2 className="text-lg font-semibold text-base-content/90 mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Item Details
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit}>

                  {/* Item Name & Variety */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text font-medium text-sm">
                          Item Name
                          <span className="text-red-500 ml-1">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        name="itemName"
                        placeholder="Basmati Rice"
                        value={form.itemName}
                        onChange={handleChange}
                        className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text font-medium text-sm">
                          Item Variety
                          <span className="text-red-500 ml-1">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        name="itemVariety"
                        placeholder="1121, Pusa"
                        value={form.itemVariety}
                        onChange={handleChange}
                        className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Packing Type */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-medium text-sm">
                        Packing Type
                        <span className="text-red-500 ml-1">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="packingType"
                      placeholder="PP Bag, Jute Bag"
                      value={form.packingType}
                      onChange={handleChange}
                      className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                      required
                    />
                  </div>

                  {/* Premium Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-primary flex-1 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300 font-medium"
                    >
                      <Package className="w-5 h-5" />
                      Save Item
                    </button>

                    <button
                      type="button"
                      className="btn btn-ghost flex-1 rounded-2xl border border-base-300 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 font-medium"
                      onClick={() => setForm({ itemName: "", itemVariety: "", packingType: "" })}
                    >
                      Clear Form
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
