
"use client";

import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import {
  useGetTripQuery,
  useVerifyTripOTPMutation,
} from "@/app/admin/services/tripApi";
import { toast } from "react-toastify";
import {
  Loader2,
  Truck,
  User,
  Package,
  MapPin,
  Phone,
  Building,
  CheckCircle2,
} from "lucide-react";

/* -------------------- HELPERS -------------------- */
const extractTripId = (param: string) => {
  const parts = param.split("-TRIP");
  return parts.length === 2 ? parts[1] : "";
};

/* -------------------- PAGE -------------------- */
export default function TripDetailsPage() {
  const params = useParams<{ tripId: string }>();


  const actualTripId = useMemo(
    () => extractTripId(params.tripId),
    [params.tripId],
  );


  const { data, isLoading, error, refetch } = useGetTripQuery(actualTripId);
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyTripOTPMutation();

  const [otp, setOtp] = useState<Record<string, string>>({});

  /* -------------------- OTP VERIFY -------------------- */
  const handleVerifyOtp = async (shipmentId: number) => {
    const enteredOtp = otp[shipmentId];

    if (!enteredOtp?.trim()) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      await verifyOtp({
        tripId: Number(actualTripId),
        shipmentId,
        otpCode: Number(enteredOtp),
      }).unwrap();

      toast.success("OTP verified successfully");

      // ✅ Clear OTP field
      setOtp((prev) => ({ ...prev, [shipmentId]: "" }));

      // ✅ REFRESH trip data → status updates
      refetch();
    } catch {
      toast.error("Invalid OTP");
    }
  };

  /* -------------------- STATES -------------------- */
  if (!actualTripId) {
    return (
      <div className="text-center py-20 text-error">Invalid tracking link</div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="h-8 w-40 bg-base-300 rounded animate-pulse mb-6" />
        <div className="space-y-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-40 bg-base-200 rounded animate-pulse" />
            ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-20 text-error">
        Failed to load trip details
      </div>
    );
  }

  /* -------------------- UI -------------------- */
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Trip #{data.id}</h1>

      {/* Driver & Truck */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="card bg-base-100 shadow border border-base-200">
          <div className="card-body p-5">
            <h3 className="card-title flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Driver
            </h3>
            <p className="font-medium">{data.driver.Drivername}</p>
            <p className="flex items-center gap-1">
              <Phone className="w-4 h-4 opacity-70" />
              {data.driver.phoneNumber}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border border-base-200">
          <div className="card-body p-5">
            <h3 className="card-title flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              Truck
            </h3>
            <p className="font-medium">{data.truck.truckNumber}</p>
            <p className="text-sm opacity-80">
              {data.truck.truckModel} • {data.truck.truckCapacity} tons
            </p>
          </div>
        </div>
      </div>

      {/* Shipments */}
      <h2 className="text-xl font-semibold mb-4">
        Shipments ({data.tripShipments.length})
      </h2>

      <div className="space-y-4">
        {data.tripShipments.map((ts: any) => {
          const s = ts.shipment;
          const isDelivered = s.Status === "COMPLETED";

          return (
            <div
              key={s.id}
              className="card bg-base-100 shadow border border-base-200"
            >
              <div className="card-body p-5">
                <div className="flex justify-between mb-3">
                  <h3 className="font-semibold text-lg">
                    Shipment #{s.id}
                    {isDelivered && (
                      <span className="ml-2 inline-flex items-center gap-1 text-success text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        Delivered
                      </span>
                    )}
                  </h3>
                  <span className="text-sm opacity-70">
                    {new Date(s.shipmentDate).toLocaleDateString("en-IN")}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm mb-4">
                  <div>
                    <p className="flex items-center gap-1 font-medium">
                      <Building className="w-4 h-4 text-primary" />
                      {s.business.businessName}
                    </p>
                    <p>{s.business.contactPersonName}</p>
                    <p>{s.business.phoneNumber}</p>
                  </div>

                  <div className="flex gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                    <div>
                      <p>
                        {s.shippingAddress.addressLine1}{" "}
                        {s.shippingAddress.addressLine2}
                      </p>
                      <p className="opacity-80">
                        {s.shippingAddress.cityOrDistrict},{" "}
                        {s.shippingAddress.stateOrProvince} —{" "}
                        {s.shippingAddress.postalCode}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="table table-sm w-full">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th className="w-20">Qty</th>
                        {!isDelivered && <th className="w-64">Verify OTP</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {s.shipmentItems.map((item: any) => (
                        <tr key={item.id}>
                          <td className="font-medium">
                            {item.item.itemName} ({item.item.itemVariety})
                          </td>
                          <td>{item.quantity}</td>
                          {!isDelivered ? (
                            <td>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  maxLength={6}
                                  placeholder="OTP"
                                  className="input input-bordered input-xs w-28 text-center tracking-widest"
                                  value={otp[s.id] || ""}
                                  onChange={(e) =>
                                    setOtp((prev) => ({
                                      ...prev,
                                      [s.id]: e.target.value.replace(/\D/g, ""),
                                    }))
                                  }
                                />
                                <button
                                  className="btn btn-primary btn-xs"
                                  onClick={() => handleVerifyOtp(s.id)}
                                  disabled={
                                    isVerifying || (otp[s.id]?.length || 0) < 4
                                  }
                                >
                                  {isVerifying ? (
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                  ) : (
                                    "Verify"
                                  )}
                                </button>
                              </div>
                            </td>
                          ) : (
                            <td>
                              <span className="inline-flex items-center gap-1 text-success text-sm font-semibold">
                                <CheckCircle2 className="w-4 h-4" />
                                Verified
                              </span>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
