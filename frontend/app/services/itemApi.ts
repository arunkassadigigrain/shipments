
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Item {
  id: string
  itemName: string
  itemVariety: string
  packingType: string
  itemDescription?: string
  createdAt: string
  updatedAt: string
}

export const itemApi = createApi({
  reducerPath: 'itemApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/items' }),
  tagTypes: ['Item'],
  endpoints: (builder) => ({
    createItem: builder.mutation<Item, Partial<Item>>({  
      query: (data) => ({
        url: "/createItem",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Item"],
    }),
    getAllItems: builder.query<Item[], void>({  
      query: () => "/getItems",
      providesTags: ['Item'], 
    }),
    getItem: builder.query<Item, string>({  
      query: (id) => `/getItem/${id}`,
      providesTags: ['Item'],
    }),
    updateItem: builder.mutation<Item, { id: string; data: Partial<Item> }>({  
      query: ({ id, data }) => ({
        url: `/updateItem/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Item"],
    }),
    deleteFile: builder.mutation<void, string>({  
      query: (id) => ({
        url: `/deleteItem/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Item'],
    }),
  }),
})

export const {
  useCreateItemMutation,
  useGetAllItemsQuery,
  useGetItemQuery,
  useUpdateItemMutation,
  useDeleteFileMutation,
} = itemApi