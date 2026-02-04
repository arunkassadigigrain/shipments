
"use client";

import { useRouter } from "next/navigation";
// import { Pen } from "lucide-react"; // ← added for the pen icon
import { useGetTripsByTimeQuery } from "@/app/admin/services/tripApi";
import { useGetShipmentByTimeQuery } from "@/app/admin/services/shipmentApi";

export default function TripsAndShipments({
  activeTab,
  setActiveTab,
  timeRange,
}: {
  activeTab: "trips" | "shipments";
  setActiveTab: (tab: "trips" | "shipments") => void;
  timeRange: "day" | "week" | "month" | "quaterly";
}) {
  const router = useRouter(); // ← added

  const {
    data,
    isLoading: tripsLoading,
    isError: tripsError,
  } = useGetTripsByTimeQuery(timeRange, {
    skip: activeTab !== "trips",
  });

  const trips = Array.isArray(data) ? data : [];

  const {
    data: shipments = [],
    isLoading: shipmentsLoading,
    isError: shipmentsError,
  } = useGetShipmentByTimeQuery(timeRange, {
    skip: activeTab !== "shipments",
  });

  const isLoading = activeTab === "trips" ? tripsLoading : shipmentsLoading;
  const isError = activeTab === "trips" ? tripsError : shipmentsError;

  const handleCreateClick = () => {
    if (activeTab === "trips") {
      router.push("/admin/trips/add-trip");
    } else {
      router.push("/admin/shipments/add-shipment");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300">
      {/* Segmented Control + Create Button */}
      <div className="flex justify-between items-center mb-6">
        {/* Segmented Control */}
        <div className="relative flex p-1 rounded-xl w-fit bg-base-200/60">
          {/* Sliding Background */}
          <div
            className={`absolute top-1 left-1 h-10 w-[calc(50%-4px)]
              rounded-lg bg-base-100
              border border-primary/25
              shadow-sm
              transition-all duration-300
              ${
                activeTab === "shipments"
                  ? "translate-x-[calc(100%+4px)]"
                  : "translate-x-0"
              }`}
          />

          {/* Trips */}
          <button
            className={`relative z-10 h-10 min-w-[120px]
              flex items-center justify-center
              text-sm font-semibold leading-none
              rounded-lg cursor-pointer
              transition-all duration-300
              ${
                activeTab === "trips"
                  ? "text-primary"
                  : "text-base-content/60 hover:text-base-content"
              }`}
            onClick={() => setActiveTab("trips")}
          >
            Trips
          </button>

          {/* Shipments */}
          <button
            className={`relative z-10 h-10 min-w-[120px]
              flex items-center justify-center
              text-sm font-semibold leading-none
              rounded-lg cursor-pointer
              transition-all duration-300
              ${
                activeTab === "shipments"
                  ? "text-primary"
                  : "text-base-content/60 hover:text-base-content"
              }`}
            onClick={() => setActiveTab("shipments")}
          >
            Shipments
          </button>
        </div>

        {/* Small circle + pen icon button */}
        <button
          onClick={handleCreateClick}
          // title="home"
          className="btn bg-base-100 text-primary hover:bg-primary/10 rounded-3xl  transition-all"
          title={`Create new ${activeTab === "trips" ? "Trip" : "Shipment"}`}
        >
          {/* <Pen className="h-4 w-4 text-primary" />  */}
        <h1> {`Create new ${activeTab === "trips" ? "Trip" : "Shipment"}`} </h1>
          
        </button>
      </div>

      {/* Content */}
      {isError ? (
        <div className="alert alert-error shadow-lg">
          <span>Failed to load data. Please try again later.</span>
        </div>
      ) : isLoading ? (
        <SkeletonLoader />
      ) : activeTab === "trips" ? (
        <TripsList trips={trips} />
      ) : (
        <ShipmentsList shipments={shipments} />
      )}
    </div>
  );
}

// Skeleton Loader
function SkeletonLoader() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-base-200 rounded-xl p-5 animate-pulse flex flex-col sm:flex-row gap-4"
        >
          <div className="skeleton h-10 w-32 rounded-lg" />
          <div className="flex-1 space-y-3">
            <div className="skeleton h-5 w-3/4 rounded" />
            <div className="skeleton h-4 w-1/2 rounded" />
            <div className="skeleton h-4 w-2/3 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Trips List
function TripsList({ trips }: { trips: any[] }) {
  if (trips.length === 0) {
    return (
      <div className="text-center py-12 text-base-content/60">
        No trips found.
      </div>
    );
  }

  return (
    <div className="grid gap-4 hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300">
      {trips.map((trip) => (
        <div
          key={trip.id}
          className="bg-base-100 rounded-xl shadow-sm border border-base-200 p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="font-semibold text-lg">
                Trip #{trip.id} • {new Date(trip.tripDate).toLocaleDateString()}
              </h3>
              <p className="text-sm text-base-content/70 mt-1">
                Driver: {trip.driver?.Drivername || "N/A"} • Truck:{" "}
                {trip.truck?.truckNumber || "N/A"} • Driver CellNo:{" "}
                {trip.truck?.ownerPhoneNumber || "N/A"}
              </p>
            </div>
            <div
              className={`badge badge-lg font-medium border ${
                trip.Status === "COMPLETED"
                  ? "bg-green-200 text-green-700 border-green-200"
                  : trip.Status === "CREATED"
                    ? "bg-blue-200 text-blue-700 border-blue-200"
                    : trip.Status === "ONTHEWAY"
                      ? "bg-orange-200 text-orange-700 border-orange-200"
                      : "bg-gray-100 text-gray-700 border-gray-200"
              }`}
            >
              {trip.Status}
            </div>
          </div>

          {trip.tripShipments?.length > 0 && (
            <div className="mt-2 pt-2 border-t border-base-200">
              <p className="text-sm font-medium mb-2">
                Shipments: {trip.tripShipments?.length}
              </p>
              <ul className="text-sm space-y-1">
                {trip.tripShipments.map((ts: any) => (
                  <li key={ts.id}>
                    Shipment #{ts.shipmentId} •{" "}
                    {ts.shipment?.business?.businessName || "N/A"}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Shipments List
function ShipmentsList({ shipments }: { shipments: any[] }) {
  if (shipments.length === 0) {
    return (
      <div className="text-center py-12 text-base-content/60">
        No shipments found.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {shipments.map((shipment) => (
        <div
          key={shipment.id}
          className="bg-base-100 rounded-xl shadow-sm border border-base-200 p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="font-semibold text-lg">
                Shipment #{shipment.id} •{" "}
                {new Date(shipment.shipmentDate).toLocaleDateString()}
              </h3>
              <p className="text-sm text-base-content/70 mt-1">
                Business Name: {shipment.business?.businessName || "N/A"} •
                Address {shipment.shippingAddress?.addressLine1},{" "}
                {shipment.shippingAddress?.cityOrDistrict}
              </p>
            </div>
            <div
              className={`badge badge-lg font-medium border ${
                shipment.Status === "COMPLETED"
                  ? "bg-green-200 text-green-700 border-green-200"
                  : shipment.Status === "CREATED"
                    ? "bg-blue-200 text-blue-700 border-blue-200"
                    : shipment.Status === "ONTHEWAY"
                      ? "bg-orange-200 text-orange-700 border-orange-200"
                      : "bg-gray-100 text-gray-700 border-gray-200"
              }`}
            >
              {shipment.Status}
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-base-200">
            <p className="text-sm font-medium mb-2">
              Items: {shipment?.shipmentItems?.length}
            </p>
            <ul className="text-sm space-y-1">
              {shipment.shipmentItems?.map((item: any) => (
                <li key={item.id}>
                  {item.item?.itemName || "Item"} × {item.quantity} (₹
                  {item.subtotal})
                </li>
              ))}
              <h3 className=""> Total : {shipment?.totalAmount} </h3>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}