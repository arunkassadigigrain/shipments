// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export type Status = "CREATED" | "ONTHEWAY" | "COMPLETED";

// export interface Driver {
//   id: number;
//   Drivername: string;
//   phoneNumber: string;
//   alternatePhoneNumber?: string | null;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Truck {
//   id: number;
//   truckNumber: string;
//   truckCapacity: number;
//   truckModel: string;
//   ownerPhoneNumber: string;
//   alternatePhoneNumber?: string | null;
//   createdAt: string;
//   updatedAt: string;
// }
// export interface Item {
//   id: number;
//   itemName: string;
//   itemVariety: string;
//   packingType: string;
//   itemDescription: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface ShipmentItem {
//   id: number;
//   shipmentId: number;
//   itemId: number;
//   quantity: number;
//   itemRate: string;
//   subtotal: string;
//   createdAt: string;

//   item: Item;
// }

// export interface Shipment {
//   id: number;
//   shipmentDate: string;
//   businessId: number;
//   shippingAddressId: number;
//   totalAmount: string;
//   Status: Status;
//   createdAt: string;
//   updatedAt: string;
//     shipmentItems?: ShipmentItem[];
//      business?: Business;

// }
// export interface Business {
//   id: number;
//   businessName: string;
//   contactPersonName: string;
//   phoneNumber: string;
//   email: string;
//   billingAddressId: number;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface ShippingAddress {
//   id: number;
//   addressLine1: string;
//   addressLine2: string;
//   cityOrDistrict: string;
//   stateOrProvince: string;
//   postalCode: number;
// }

// /* ================= RELATION TABLES ================= */

// export interface TripShipment {
//   id: number;
//   tripId: number;
//   shipmentId: number;
//   createdAt: string;
//   shipment?: Shipment;
// }

// export interface ShipmentOTP {
//   id: number;
//   tripId: number;
//   shipmentId: number;
//   otpCode: number;
//   isVerified: boolean;
//   expiresAt: string;
//   createdAt: string;
//   updatedAt: string;
//   shipment?: Shipment;
// }

// /* ================= MAIN TRIP INTERFACE ================= */

// export interface Trip {
//   id: number;
//   tripDate: string;
//   Status: Status;
//   driverId: number;
//   truckId: number;

//   driver?: Driver;
//   truck?: Truck;

//   tripShipments: TripShipment[];
//   shipmentOtps: ShipmentOTP[];

//   createdAt: string;
//   updatedAt: string;
// }

// export interface CreateTripPayload {
//   driverId: number;
//   truckId: number;
//   shipmentIds: number[];
//   tripDate?: string;
// }
// export const tripsApi = createApi({
//   reducerPath: "tripsApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8000/api/trips",
//   }),
//   tagTypes: ["Trip"],
//   endpoints: (builder) => ({
//     // Create new shipment
//     createTrip: builder.mutation<Trip, CreateTripPayload>({
//       query: (data) => ({
//         url: "/createTrip",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Trip"],
//     }),

//     verifyTripOTP: builder.mutation<Trip, CreateTripPayload>({
//       query: (data) => ({
//         url: "/verifyOtp",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Trip"],
//     }),

//     // Get all shipments
//     getAllTrips: builder.query<Trip[], void>({
//       query: () => "/getAllTrips",
//       providesTags: ["Trip"],
//     }),

//     getTripStatus: builder.query({
//       query: (range) => ({
//         url: `/getTripsByDateRange/${range}`,
//         method: "GET",
//         credentials: "include",
//       }),
//     }),

//     // Get single shipment by ID
//     getTrip: builder.query<Trip, number | string>({
//       query: (id) => `/getTrip/${id}`,
//       providesTags: ["Trip"],
//     }),
//   }),
// });

// export const {
//   useCreateTripMutation,
//   useGetAllTripsQuery,
//   useGetTripQuery,
//   useVerifyTripOTPMutation,
//   useGetTripStatusQuery,
// } = tripsApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* ================= ENUM ================= */

export type Status = "CREATED" | "ONTHEWAY" | "COMPLETED";

/* ================= CORE MODELS ================= */

export interface Driver {
  id: number;
  Drivername: string;
  phoneNumber: string;
  alternatePhoneNumber?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Truck {
  id: number;
  truckNumber: string;
  truckCapacity: number;
  truckModel: string;
  ownerPhoneNumber: string;
  alternatePhoneNumber?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Item {
  id: number;
  itemName: string;
  itemVariety: string;
  packingType: string;
  itemDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface Business {
  id: number;
  businessName: string;
  contactPersonName: string;
  phoneNumber: string;
  email: string;
  billingAddressId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ShippingAddress {
  id: number;
  addressLine1: string;
  addressLine2?: string | null;
  cityOrDistrict: string;
  stateOrProvince: string;
  postalCode: number;
}

/* ================= SHIPMENT ================= */

export interface ShipmentItem {
  id: number;
  shipmentId: number;
  itemId: number;
  quantity: number;
  itemRate: string; // Decimal → string
  subtotal: string; // Decimal → string
  createdAt: string;
  item: Item;
}

export interface Shipment {
  id: number;
  shipmentDate: string;
  businessId: number;
  shippingAddressId: number;
  totalAmount: string;
  Status: Status;
  createdAt: string;
  updatedAt: string;

  shipmentItems: ShipmentItem[];
  business: Business;
  shippingAddress: ShippingAddress;
}

/* ================= RELATIONS ================= */

export interface TripShipment {
  id: number;
  tripId: number;
  shipmentId: number;
  createdAt: string;
  shipment: Shipment;
}

export interface ShipmentOTP {
  id: number;
  tripId: number;
  shipmentId: number;
  otpCode: number;
  isVerified: boolean;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  shipment: Shipment;
}

/* ================= TRIP ================= */

export interface Trip {
  id: number;
  tripDate: string;
  Status: Status;
  driverId: number;
  truckId: number;

  driver: Driver;
  truck: Truck;

  tripShipments: TripShipment[];
  shipmentOtps: ShipmentOTP[];

  createdAt: string;
  updatedAt: string;
}

/* ================= PAYLOADS ================= */

export interface CreateTripPayload {
  driverId: number;
  truckId: number;
  shipmentIds: number[];
  tripDate?: string;
}

export interface VerifyTripOTPPayload {
  tripId: number;
  shipmentId: number;
  otpCode: number;
}

/* ================= API ================= */

export const tripsApi = createApi({
  reducerPath: "tripsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/trips",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ["Trip"],
  endpoints: (builder) => ({
    /* -------- CREATE TRIP -------- */
    createTrip: builder.mutation<
      { message: string; trip: Trip },
      CreateTripPayload
    >({
      query: (data) => ({
        url: "/createTrip",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Trip"],
    }),

    /* -------- VERIFY OTP -------- */
    verifyTripOTP: builder.mutation<
      { message: string; trip: Trip },
      VerifyTripOTPPayload
    >({
      query: (data) => ({
        url: "/verifyOtp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Trip"],
    }),

    /* -------- GET ALL TRIPS -------- */
    getAllTrips: builder.query<Trip[], void>({
      query: () => "/getAllTrips",
      providesTags: ["Trip"],
    }),

    getTripsByTime: builder.query< { trips: any[] }, string>({
      query: (range) => `/getTripByTime/${range}`,
      providesTags: ["Trip"],
    }),

    /* -------- TRIP STATUS (CHART) -------- */
    getTripStatus: builder.query<
      {
        labels: string[];
        datasets: unknown[];
        totals: Record<Status, number>;
      },
      string
    >({
      query: (range) => `/getTripsByDateRange/${range}`,
    }),

    /* -------- GET SINGLE TRIP -------- */
    getTrip: builder.query<Trip, number | string>({
      query: (id) => `/getTrip/${id}`,
      providesTags: ["Trip"],
    }),
  }),
});

/* ================= HOOKS ================= */

export const {
  useCreateTripMutation,
  useVerifyTripOTPMutation,
  useGetAllTripsQuery,
  useGetTripQuery,
  useGetTripStatusQuery,
  useGetTripsByTimeQuery,
} = tripsApi;
