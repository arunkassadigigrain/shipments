import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { itemApi } from './admin/services/itemApi'
import { customerApi } from './admin/services/customerApi'
import { truckApi } from './admin/services/truckApi'
import { driverApi } from './admin/services/driverApi'
import { tripsApi } from './admin/services/tripApi'
import { shipmentApi } from './admin/services/shipmentApi'
import { authApi } from './admin/services/userApi'

export const store = configureStore({
  reducer: {
    [itemApi.reducerPath]: itemApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [truckApi.reducerPath]: truckApi.reducer,
    [driverApi.reducerPath]: driverApi.reducer,
    [tripsApi.reducerPath]: tripsApi.reducer,
    [shipmentApi.reducerPath]: shipmentApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(itemApi.middleware, customerApi.middleware, truckApi.middleware, driverApi.middleware, tripsApi.middleware, shipmentApi.middleware, authApi.middleware),
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

