import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
 
interface Driver{
    id: number
    Drivername: string;
    phoneNumber: string;
    alternatePhoneNumber: string;
    truckId?: number;
    createdAt: string
    updatedAt: string
}
 
export const driverApi = createApi({
  reducerPath: 'driverApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/drivers',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
   }),
  tagTypes: ['Driver'],
  endpoints: (builder) => ({
    createDriver: builder.mutation<Driver, Partial<Driver>>({  
      query: (data) => ({
        url: "/Createdriver",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Driver"],
    }),
    getAllDriver: builder.query<Driver[], void>({  
      query: () => "/getdriver",
      providesTags: ['Driver'],
    }),
    getDriver: builder.query<Driver, string>({  
      query: (id) => `/getDriver/${id}`,
      providesTags: ['Driver'],
    }),
    updateDriver: builder.mutation<Driver, { id: string; data: Partial<Driver> }>({  
      query: ({ id, data }) => ({
        url: `/updateDriver/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Driver"],
    }),
    deleteFile: builder.mutation<void, string>({  
      query: (id) => ({
        url: `/deleteDrriver/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Driver'],
    }),
  }),
})
 
export const {
  useCreateDriverMutation,
  useGetAllDriverQuery,
  useGetDriverQuery,
  useUpdateDriverMutation,
  useDeleteFileMutation,
} = driverApi
 