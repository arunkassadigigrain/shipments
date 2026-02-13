"use client";
import { Menu, Truck, Plus, Trash2, AlertCircle } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import { useGetAllItemsQuery } from "@/app/admin/services/itemApi";
import { useGetAllCustomerQuery } from "@/app/admin/services/customerApi";
import { useCreateShipmentMutation } from "@/app/admin/services/shipmentApi";
import Sidebar from "@/app/admin/components/sidebar";

export default function AddShipment() {
  const { data: items = [], isLoading: itemsLoading } = useGetAllItemsQuery();
  const { data: businesses = [], isLoading: businessesLoading } =
    useGetAllCustomerQuery();

  const [createShipment, { isLoading: isSubmitting, isError, error }] =
    useCreateShipmentMutation();

  const [selectedBusinessId, setSelectedBusinessId] = useState("");

  const [isShippingSameAsBilling, setIsShippingSameAsBilling] = useState(true);

  const [contactPersonName, setContactPersonName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [billingAddress, setBillingAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    cityOrDistrict: "",
    stateOrProvince: "",
    postalCode: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    cityOrDistrict: "",
    stateOrProvince: "",
    postalCode: "",
  });

  const [rows, setRows] = useState([
    { itemId: "", quantity: 1, itemRate: "", subtotal: 0 },
  ]);

  const totalAmount = rows.reduce((sum, r) => sum + (r.subtotal || 0), 0);

  const isBusinessSelected = !!selectedBusinessId;

  const businessOptions = useMemo(
    () =>
      businesses.map((b) => ({
        value: b.id.toString(),
        label: b.businessName,
      })),
    [businesses],
  );

  const itemOptions = useMemo(
    () =>
      items.map((item) => ({
        value: item.id.toString(),
        label: `${item.itemDescription}`,
      })),
    [items],
  );

  const clearAll = () => {
    // Reset shipment items
    setRows([
      {
        itemId: "",
        quantity: 1,
        itemRate: "",
        subtotal: 0,
      },
    ]);

    // Reset business / customer info
    setSelectedBusinessId("");
    setContactPersonName("");
    setEmail("");
    setPhoneNumber("");

    // Reset billing address
    setBillingAddress({
      addressLine1: "",
      addressLine2: "",
      cityOrDistrict: "",
      stateOrProvince: "",
      postalCode: "",
    });

    // Reset shipping address
    setShippingAddress({
      addressLine1: "",
      addressLine2: "",
      cityOrDistrict: "",
      stateOrProvince: "",
      postalCode: "",
    });

    // Reset flags / messages
    setIsShippingSameAsBilling(true);
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const today = new Date().toISOString().split("T")[0];

  const handleBusinessChange = (selectedOption: any) => {
    const businessId = selectedOption?.value || "";
    setSelectedBusinessId(businessId);

    if (!businessId) {
      // Clear form
      setContactPersonName("");
      setEmail("");
      setPhoneNumber("");
      setBillingAddress({
        addressLine1: "",
        addressLine2: "",
        cityOrDistrict: "",
        stateOrProvince: "",
        postalCode: "",
      });
    } else {
      const selected = businesses.find((b) => b.id === Number(businessId));
      if (selected) {
        setContactPersonName(selected.contactPersonName || "");
        setEmail(selected.email || "");
        setPhoneNumber(selected.phoneNumber || "");

        if (selected.billingAddress) {
          setBillingAddress({
            addressLine1: selected.billingAddress.addressLine1 || "",
            addressLine2: selected.billingAddress.addressLine2 || "",
            cityOrDistrict: selected.billingAddress.cityOrDistrict || "",
            stateOrProvince: selected.billingAddress.stateOrProvince || "",
            postalCode: selected.billingAddress.postalCode?.toString() || "",
          });
        } else {
          // Clear billing address if business doesn't have one
          setBillingAddress({
            addressLine1: "",
            addressLine2: "",
            cityOrDistrict: "",
            stateOrProvince: "",
            postalCode: "",
          });
        }
      }
    }
  };

  const addRow = () => {
    setRows([...rows, { itemId: "", quantity: 1, itemRate: "", subtotal: 0 }]);
  };

  const removeRow = (index: any) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const updateRow = (index: any, field: any, value: any) => {
    setRows((prev) =>
      prev.map((row, i) => {
        if (i !== index) return row;
        const updated = { ...row, [field]: value };

        if (field === "quantity" || field === "itemRate") {
          const qty = field === "quantity" ? Number(value) : row.quantity;
          const rate =
            field === "itemRate" ? Number(value) : Number(row.itemRate);
          updated.subtotal = qty * rate;
        }

        return updated;
      }),
    );
  };
  const parts = [
    billingAddress.addressLine1,
    billingAddress.cityOrDistrict,
    billingAddress.stateOrProvince,
    billingAddress.postalCode,
  ].filter(Boolean);

  const fullBillingAddress = parts.join(", ");

  console.log(fullBillingAddress);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedBusinessId) {
      setErrorMessage("Business details are missing");
      return;
    }

    if (rows.some((r) => !r.itemId || r.quantity < 1 || !r.itemRate)) {
      setErrorMessage("Item details are missing");
      return;
    }

    const payload = {
      businessId: Number(selectedBusinessId),
      addressBar: isShippingSameAsBilling,
      ...(isShippingSameAsBilling
        ? {}
        : {
            shippingAddress: {
              addressLine1: shippingAddress.addressLine1.trim(),
              addressLine2: shippingAddress.addressLine2.trim() || undefined,
              cityOrDistrict: shippingAddress.cityOrDistrict.trim(),
              stateOrProvince: shippingAddress.stateOrProvince.trim(),
              postalCode: Number(shippingAddress.postalCode),
            },
          }),
      items: rows.map((r) => ({
        itemId: Number(r.itemId),
        quantity: Number(r.quantity),
        itemRate: Number(r.itemRate),
      })),
    };

    try {
      const response = await createShipment(payload).unwrap();

      setSuccessMessage(
        ` created successfully. Total ₹${totalAmount.toFixed(2)}`,
      );

      setSelectedBusinessId("");
      setContactPersonName("");
      setEmail("");
      setPhoneNumber("");
      setBillingAddress({
        addressLine1: "",
        addressLine2: "",
        cityOrDistrict: "",
        stateOrProvince: "",
        postalCode: "",
      });

      setRows([{ itemId: "", quantity: 1, itemRate: "", subtotal: 0 }]);
      setIsShippingSameAsBilling(true);
    } catch (err: any) {
      setErrorMessage(
        err?.data?.message || "Failed to create shipment. Please try again.",
      );
    }
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <Sidebar />
      <div className="drawer-content flex flex-col bg-base-200">
        {successMessage && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-green-100 border border-green-400 text-green-800 p-6 rounded-2xl shadow-lg max-w-sm w-full flex flex-col items-center relative z-50">
              <div className="text-lg font-semibold mb-2">
                ✅ Shipment Created Successfully
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
            />
          </div>
        )}

        <div className="flex-1 px-4 py-4 md:px-6 lg:px-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center animate-fadeIn">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-focus bg-clip-text text-transparent">
                Add New Shipment
              </h1>
              <p className="text-base-content/60 text-sm tracking-wide">
                Create and register a new shipment with item details
              </p>
            </div>

            <div className="card bg-base-100/80 backdrop-blur-md shadow-2xl border border-base-300/20 rounded-3xl overflow-hidden hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300">
              <div className="card-body p-6 md:p-8">
                {itemsLoading || businessesLoading ? (
                  <div className="space-y-10 animate-pulse">
                    <div className="h-8 w-48 bg-base-300 rounded"></div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="h-24 bg-base-300 rounded"></div>
                      <div className="h-24 bg-base-300 rounded"></div>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-8" onSubmit={handleSubmit}>
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
                    {/* Shipment Information */}
                    <div>
                      <h2 className="text-m sm:text-lg font-semibold text-base-content/90 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                          Shipment Information
                        </span>

                        <span className="text-m sm:text-sm md:text-base text-purple-600 font-medium flex items-center gap-1.5">
                          📅{" "}
                          {`${new Date().getDate()}/${new Date().toLocaleString(
                            "en-GB",
                            {
                              month: "short",
                            },
                          )}/${new Date().getFullYear()}`}
                        </span>
                      </h2>
                    </div>
                    <div>
                      <div className="sm:w-[360px] md:w-[360px] lg:w-[360 px] ">
                        <div className="form-control">
                          <label className="label ">
                            <span className="label-text font-medium text-sm pb-2">
                              Business Name
                              <span className="text-red-500 ml-1">*</span>
                            </span>
                          </label>

                          <Select
                            unstyled
                            isSearchable
                            isClearable
                            required
                            isDisabled={isSubmitting}
                            placeholder="- Search customer..."
                            options={businessOptions}
                            maxMenuHeight={160}
                            value={
                              businessOptions.find(
                                (option) => option.value === selectedBusinessId,
                              ) || null
                            }
                            components={{
                              DropdownIndicator: null,
                              IndicatorSeparator: null,
                            }}
                            onChange={handleBusinessChange}
                            classNames={{
                              control: ({ isFocused }) =>
                                `select select-bordered w-full rounded-2xl bg-base-100/50 border-base-300 transition-all duration-300 ${
                                  isFocused
                                    ? "border-primary ring-4 ring-primary/20"
                                    : ""
                                }`,
                              valueContainer: () => "px-8",
                              input: () => "text-sm",
                              placeholder: () => "text-sm text-base-content/60",
                              indicatorsContainer: () => "pr-2",
                              menu: () =>
                                "mt-2 rounded-xl border border-base-300 bg-base-100 shadow-lg",
                              option: ({ isFocused, isSelected }) =>
                                `px-3 py-2 cursor-pointer text-sm ${
                                  isFocused ? "bg-base-200" : ""
                                } ${
                                  isSelected
                                    ? "bg-primary text-primary-content"
                                    : ""
                                }`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Customer Details - Read-only when selected */}
                    <div>
                      <h2 className="text-lg font-semibold text-base-content/90 mb-3 flex items-center gap-2">
                        Customer Details
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="form-control">
                          <label className="label py-1">
                            <span className="label-text font-medium text-sm">
                              Contact Person Name
                              <span className="text-red-500 ml-1">*</span>
                            </span>
                          </label>
                          <input
                            type="text"
                            value={contactPersonName}
                            readOnly
                            onChange={(e) =>
                              setContactPersonName(e.target.value)
                            }
                            className={`input input-bordered w-full cursor-not-allowed rounded-2xl border-base-300 transition-all duration-300 outline-none ${
                              isBusinessSelected
                                ? "bg-neutral/10 text-base-content/70 cursor-not-allowed"
                                : "bg-base-100/50 focus:border-primary focus:ring-4 focus:ring-primary/20"
                            }`}
                            required
                            disabled={isBusinessSelected || isSubmitting}
                          />
                        </div>
                        <div className="form-control">
                          <label className="label py-1">
                            <span className="label-text font-medium text-sm">
                              Email<span className="text-red-500 ml-1">*</span>
                            </span>
                          </label>
                          <input
                            type="email"
                            value={email}
                            readOnly
                            onChange={(e) => setEmail(e.target.value)}
                            className={`input input-bordered w-full cursor-not-allowed rounded-2xl border-base-300 transition-all duration-300 outline-none ${
                              isBusinessSelected
                                ? "bg-neutral/10 text-base-content/70 cursor-not-allowed"
                                : "bg-base-100/50 focus:border-primary focus:ring-4 focus:ring-primary/20"
                            }`}
                            required
                            disabled={isBusinessSelected || isSubmitting}
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
                            readOnly
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className={`input input-bordered w-full cursor-not-allowed rounded-2xl border-base-300 transition-all duration-300 outline-none ${
                              isBusinessSelected
                                ? "bg-neutral/10 text-base-content/70 cursor-not-allowed"
                                : "bg-base-100/50 focus:border-primary focus:ring-4 focus:ring-primary/20"
                            }`}
                            required
                            disabled={isBusinessSelected || isSubmitting}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Billing Address - Read-only when selected */}
                    <div>
                      <h2 className="text-lg font-semibold text-base-content/90 mb-3 flex items-center gap-2">
                        Billing Address
                      </h2>
                      <div className="form-control md:col-span-2 flex gap-4">
                        {/* Address Line 1 */}
                        <div className="flex-1">
                          <label className="label ">
                            <span className="label-text font-medium text-sm">
                              Address Line 1
                              <span className="text-red-500 ml-1 mr-2">*</span>
                            </span>
                          </label>
                          <input
                            type="text"
                            value={fullBillingAddress}
                            readOnly
                            onChange={(e) =>
                              setBillingAddress((prev) => ({
                                ...prev,
                                addressLine1: e.target.value,
                              }))
                            }
                            className={`input input-bordered w-full cursor-not-allowed rounded-2xl border-base-300 transition-all duration-300 outline-none ${
                              isBusinessSelected
                                ? "bg-neutral/10 text-base-content/70 cursor-not-allowed"
                                : "bg-base-100/50 focus:border-primary focus:ring-4 focus:ring-primary/20"
                            }`}
                            required
                            disabled={isBusinessSelected || isSubmitting}
                          />
                        </div>

                        {/* Address Line 2 */}
                        <div className="flex-1">
                          <label className="label ">
                            <span className="label-text font-medium text-sm">
                              Address Line 2
                            </span>
                          </label>
                          <input
                            type="text"
                            value={billingAddress.addressLine2}
                            readOnly
                            onChange={(e) =>
                              setBillingAddress((prev) => ({
                                ...prev,
                                addressLine2: e.target.value,
                              }))
                            }
                            className={`input input-bordered w-full cursor-not-allowed rounded-2xl border-base-300 transition-all duration-300 outline-none ${
                              isBusinessSelected
                                ? "bg-neutral/10 text-base-content/70 cursor-not-allowed"
                                : "bg-base-100/50 focus:border-primary focus:ring-4 focus:ring-primary/20"
                            }`}
                            disabled={isBusinessSelected || isSubmitting}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Checkbox for shipping same as billing */}
                    <div className="form-control">
                      <label className="label cursor-pointer justify-start gap-3">
                        <input
                          type="checkbox"
                          checked={isShippingSameAsBilling}
                          onChange={(e) =>
                            setIsShippingSameAsBilling(e.target.checked)
                          }
                          className="checkbox checkbox-primary"
                          disabled={isSubmitting}
                        />
                        <span className="label-text font-medium">
                          Shipping address is same as Billing address
                        </span>
                      </label>
                    </div>

                    {/* Shipping Address */}
                    {!isShippingSameAsBilling && (
                      <div>
                        <h2 className="text-lg font-semibold text-base-content/90 mb-3 flex items-center gap-2">
                          Shipping Address
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="form-control md:col-span-2">
                            <label className="label ">
                              <span className="label-text font-medium text-sm">
                                Address Line 1
                                <span className="text-red-500 ml-1 mr-2">
                                  *
                                </span>
                              </span>
                            </label>
                            <input
                              type="text"
                              value={shippingAddress.addressLine1}
                              onChange={(e) =>
                                setShippingAddress((prev) => ({
                                  ...prev,
                                  addressLine1: e.target.value,
                                }))
                              }
                              className="input input-bordered  rounded-2xl bg-base-100/50 border-base-300 focus:border-primary outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                              // className="textarea textarea-bordered min-h-[px] resize-none rounded-2xl bg-base-100/50 outline-none border-base-300 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="form-control">
                            <label className="label ">
                              <span className="label-text font-medium text-sm">
                                Address Line 2
                              </span>
                            </label>
                            <input
                              type="text"
                              value={shippingAddress.addressLine2}
                              onChange={(e) =>
                                setShippingAddress((prev) => ({
                                  ...prev,
                                  addressLine2: e.target.value,
                                }))
                              }
                              className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="form-control">
                            <label className="label ">
                              <span className="label-text font-medium text-sm">
                                City / District
                                <span className="text-red-500 ml-1">*</span>
                              </span>
                            </label>
                            <input
                              type="text"
                              value={shippingAddress.cityOrDistrict}
                              onChange={(e) =>
                                setShippingAddress((prev) => ({
                                  ...prev,
                                  cityOrDistrict: e.target.value,
                                }))
                              }
                              className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="form-control">
                            <label className="label ">
                              <span className="label-text font-medium text-sm">
                                State / Province
                                <span className="text-red-500 ml-1">*</span>
                              </span>
                            </label>
                            <input
                              type="text"
                              value={shippingAddress.stateOrProvince}
                              onChange={(e) =>
                                setShippingAddress((prev) => ({
                                  ...prev,
                                  stateOrProvince: e.target.value,
                                }))
                              }
                              className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="form-control">
                            <label className="label ">
                              <span className="label-text font-medium text-sm">
                                Postal Code
                                <span className="text-red-500 ml-1">*</span>
                              </span>
                            </label>
                            <input
                              type="text"
                              value={shippingAddress.postalCode}
                              onWheel={(e) => e.currentTarget.blur()}
                              onChange={(e) =>
                                setShippingAddress((prev) => ({
                                  ...prev,
                                  postalCode: e.target.value,
                                }))
                              }
                              className="input input-bordered w-full rounded-2xl bg-base-100/50 border-base-300 focus:border-primary outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Shipment Items */}
                    <div>
                      <h2 className="text-lg font-semibold text-base-content/90 mb-6 flex items-center gap-2">
                        Shipment Items
                      </h2>
                      <div className="rounded-2xl border border-base-300/30 overflow-x-auto overflow-y-visible">
                        <table className="table table-zebra bg-base-100/50 w-full min-w-[760px]">
                          <thead className="bg-base-200/50">
                            <tr>
                              <th>S.No</th>
                              <th className="w-[40%]">
                                Item Details
                                <span className="text-red-500 ml-1">
                                  *
                                </span>{" "}
                              </th>
                              <th className="whitespace-nowrap">
                                Quantity
                                <span className="text-red-500 ml-1">*</span>
                              </th>
                              <th>
                                Rate (₹)
                                <span className="text-red-500 ml-1">*</span>
                              </th>
                              <th>Subtotal (₹)</th>
                              <th></th>
                            </tr>
                          </thead>

                          <tbody>
                            {rows.map((row, i) => {
                              const selectedItemOption =
                                itemOptions.find(
                                  (option) => option.value === row.itemId,
                                ) || null;

                              return (
                                <tr
                                  key={i}
                                  className="group hover:bg-base-200/30 transition-colors"
                                >
                                  {/* S.No */}
                                  <td className="text-center font-medium">
                                    {i + 1}
                                  </td>

                                  {/* Item Select */}
                                  {/* Item Select */}
                                  <td>
                                    <Select
                                      unstyled
                                      required
                                      isClearable
                                      isSearchable
                                      placeholder="- Search item..."
                                      // ────────────────────────────────────────────────────────────────
                                      // ← This is the only changed line – add this filter
                                      options={itemOptions.filter(
                                        (option) =>
                                          // Allow this row's currently selected item + exclude items already used in other rows
                                          option.value === row.itemId ||
                                          !rows.some(
                                            (r, rowIndex) =>
                                              rowIndex !== i &&
                                              r.itemId === option.value,
                                          ),
                                      )}
                                      components={{
                                        DropdownIndicator: null,
                                        IndicatorSeparator: null,
                                      }}
                                      maxMenuHeight={160}
                                      value={
                                        itemOptions.find(
                                          (opt) => opt.value === row.itemId,
                                        ) || null
                                      }
                                      onChange={(option) =>
                                        updateRow(
                                          i,
                                          "itemId",
                                          option?.value || "",
                                        )
                                      }
                                      isDisabled={isSubmitting}
                                      menuPortalTarget={
                                        typeof window !== "undefined"
                                          ? document.body
                                          : null
                                      }
                                      menuPosition="fixed"
                                      menuPlacement="auto"
                                      classNames={{
                                        control: ({ isFocused }) =>
                                          `select select-bordered w-full outline-none rounded-2xl bg-base-100/50 border-base-300 transition-all duration-300 ${
                                            isFocused
                                              ? "border-primary ring-4 ring-primary/20"
                                              : ""
                                          }`,
                                        valueContainer: () => "px-3",
                                        input: () => "text-sm",
                                        placeholder: () =>
                                          "text-sm text-base-content/60",
                                        indicatorsContainer: () => "pr-2",
                                        menu: () =>
                                          "mt-2 rounded-xl border border-base-300 bg-base-100 shadow-lg md-min",
                                        option: ({ isFocused, isSelected }) =>
                                          `px-3 py-2 cursor-pointer text-sm ${
                                            isFocused ? "bg-base-200" : ""
                                          } ${isSelected ? "bg-primary text-primary-content" : ""}`,
                                      }}
                                    />
                                  </td>

                                  {/* Quantity */}
                                  <td>
                                    <input
                                      type="numeric"
                                      min="1"
                                      required
                                      value={row.quantity}
                                      onChange={(e) =>
                                        updateRow(i, "quantity", e.target.value)
                                      }
                                      className="input input-bordered w-full rounded-2xl bg-base-100/50
                           border-base-300 focus:border-primary outline-none
                           focus:ring-4 focus:ring-primary/20
                           transition-all duration-300"
                                      disabled={isSubmitting}
                                    />
                                  </td>

                                  {/* Rate */}
                                  <td>
                                    <input
                                      type="numeric"
                                      step="0.01"
                                      min="0"
                                      required
                                      value={row.itemRate}
                                      onChange={(e) =>
                                        updateRow(i, "itemRate", e.target.value)
                                      }
                                      className="input input-bordered w-full rounded-2xl bg-base-100/50
                           border-base-300 focus:border-primary outline-none
                           focus:ring-4 focus:ring-primary/20
                           transition-all duration-300"
                                      disabled={isSubmitting}
                                    />
                                  </td>

                                  {/* Subtotal */}
                                  <td className="text-right font-medium">
                                    ₹{Number(row.subtotal || 0).toFixed(2)}
                                  </td>

                                  {/* Remove Row */}
                                  <td>
                                    {rows.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => removeRow(i)}
                                        className="btn btn-ghost btn-xs opacity-0
                             group-hover:opacity-100
                             text-error hover:bg-error/10
                             transition-opacity"
                                        disabled={isSubmitting}
                                      >
                                        <Trash2 className="h-5 w-5" />
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      <button
                        type="button"
                        onClick={addRow}
                        className="mt-4 flex items-center gap-2 text-primary font-medium hover:text-primary-focus transition-colors"
                        disabled={isSubmitting}
                      >
                        <Plus className="w-5 h-5" />
                        Add Item
                      </button>
                      <div className="flex justify-end mt-6">
                        <div className="text-right">
                          <span className="text-lg font-semibold text-base-content">
                            Total Amount:
                          </span>
                          <span className="ml-2 text-2xl font-bold text-primary">
                            ₹{totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex justify-end gap-4">
                      <button
                        type="submit"
                        className={`btn btn-primary rounded-2xl px-8 hover:shadow-xl hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300 font-medium${isSubmitting ? "loading" : ""}`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Create Shipment"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost border-primary/20 rounded-2xl px-8 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 font-medium"
                        disabled={isSubmitting}
                        onClick={clearAll}
                      >
                        Clear
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
