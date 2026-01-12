
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Truck {
  id: string
  truckNumber: string
  truckCapacity: number
  truckModel: string
  ownerPhoneNumber: string
  alternatePhoneNumber?: string
  createdAt: string
  updatedAt: string
}

export const truckApi = createApi({
  reducerPath: 'truckApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/trucks' }),
  tagTypes: ['Truck'],
  endpoints: (builder) => ({
    createTruck: builder.mutation<Truck, Partial<Truck>>({  
      query: (data) => ({
        url: "/createTruck",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Truck"],
    }),
    getAllTrucks: builder.query<Truck[], void>({  
      query: () => "/getAllTrucks",
      providesTags: ['Truck'], 
    }),
    getTruck: builder.query<Truck, string>({  
      query: (id) => `/getTruck/${id}`,
      providesTags: ['Truck'],
    }),
    updateTruck: builder.mutation<Truck, { id: string; data: Partial<Truck> }>({  
      query: ({ id, data }) => ({
        url: `/updateTruck/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Truck"],
    }),
    deleteFile: builder.mutation<void, string>({  
      query: (id) => ({
        url: `/deleteItem/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Truck'],
    }),
  }),
})

export const {
  useCreateTruckMutation,
  useGetAllTrucksQuery,
  useGetTruckQuery,
  useUpdateTruckMutation,
  useDeleteFileMutation,
} = truckApi;