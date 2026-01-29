
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Customer {
  id: number
  businessName: string
  contactPersonName: string
  phoneNumber: string
  email: string
  billingAddress: BillingAddress
  createdAt: string
  updatedAt: string
}


export interface BillingAddress {
  addressLine1: string
  addressLine2?: string
  cityOrDistrict: string
  stateOrProvince: string
  postalCode: number
}

export interface CreateCustomerPayload {
  businessName: string
  contactPersonName: string
  phoneNumber: string
  email: string
  billingAddress: BillingAddress
}



export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/business',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
   }),
  tagTypes: ['Customer'],
  endpoints: (builder) => ({
    createCustomer: builder.mutation<Customer, CreateCustomerPayload>({  
      query: (data) => ({
        url: "/createBusiness",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customer"],
    }),
    getAllCustomer: builder.query<Customer[], void>({  
      query: () => "/getAllBusiness",
      providesTags: ['Customer'], 
    }),
    getCustomer: builder.query<Customer, string>({  
      query: (id) => `/getBusiness/${id}`,
      providesTags: ['Customer'],
    }),
    updateCustomer: builder.mutation<Customer, { id: string; data: Partial<Customer> }>({  
      query: ({ id, data }) => ({
        url: `/updateBusiness/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Customer"],
    }),
    deleteCustomer: builder.mutation<void, string>({  
      query: (id) => ({
        url: `/deleteBusiness/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Customer'],
    }),
  }),
})

export const {
  useCreateCustomerMutation,
  useGetAllCustomerQuery,
  useGetCustomerQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi