import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface BillingAddress {
  id: number;
  addressLine1: string;
  addressLine2?: string | null;
  cityOrDistrict: string;
  stateOrProvince: string;
  postalCode: number;
}

export interface ShippingAddress {
  id: number;
  addressLine1: string;
  addressLine2?: string | null;
  cityOrDistrict: string;
  stateOrProvince: string;
  postalCode: number;
}

export interface Business {
  id: number;
  businessName: string;
  contactPersonName: string;
  phoneNumber: string;
  email: string;
  billingAddressId: number;
  billingAddress: BillingAddress;
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

export interface ShipmentItem {
  id: number;
  shipmentId: number;
  itemId: number;
  quantity: number;
  itemRate: number;
  subtotal: number;
  item?: Item;
  createdAt: string;
}

export interface Shipment {
  id: number;
  shipmentDate: string;
  businessId: number;
  business: Business;
  shippingAddressId: number;
  shippingAddress: ShippingAddress;
  totalAmount: number;
  shipmentItems: ShipmentItem[];
  status: "CREATED" | "ONTHEWAY" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
}

export interface CreateShipmentPayload {
  businessId: number;
  addressBar: boolean;
  shippingAddress?: {
    addressLine1: string;
    addressLine2?: string;
    cityOrDistrict: string;
    stateOrProvince: string;
    postalCode: number | string;
  };
  items: Array<{
    itemId: number;
    quantity: number;
    itemRate: number;
  }>;
}

export const shipmentApi = createApi({
  reducerPath: "shipmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/shipments",
  }),
  tagTypes: ["Shipment"],
  endpoints: (builder) => ({
    createShipment: builder.mutation<Shipment, CreateShipmentPayload>({
      query: (data) => ({
        url: "/createshipment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Shipment"],
    }),

    // Get all shipments
    getAllShipments: builder.query<Shipment[], void>({
      query: () => "/getallshipments",
      providesTags: ["Shipment"],
    }),

    getShipmentStatus: builder.query({
      query: (range) => ({
        url: `/getShipmentByDateRange/${range}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getShipmentByTime: builder.query<any[], string>({
      query: (range) => ({
        url: `/getShipmentByTime/${range}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getAllCreated: builder.query<Shipment[], void>({
      query: () => "/getAllCreated",
      providesTags: ["Shipment"],
    }),

    // Get single shipment by ID
    getShipment: builder.query<Shipment, number | string>({
      query: (id) => `/getshipment/${id}`,
      providesTags: (result, error, id) => [{ type: "Shipment", id }],
    }),
  }),
});

export const {
  useCreateShipmentMutation,
  useGetAllShipmentsQuery,
  useGetShipmentStatusQuery,
  useGetAllCreatedQuery,
  useGetShipmentByTimeQuery,
  useGetShipmentQuery,
} = shipmentApi;
