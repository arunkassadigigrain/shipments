import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { itemApi } from './services/itemApi'
import { customerApi } from './services/customerApi'
import { truckApi } from './services/truckApi'
import { driverApi } from './services/driverApi'
import { tripsApi } from './services/tripApi'
import { shipmentApi } from './services/shipmentApi'

export const store = configureStore({
  reducer: {
    [itemApi.reducerPath]: itemApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [truckApi.reducerPath]: truckApi.reducer,
    [driverApi.reducerPath]: driverApi.reducer,
    [tripsApi.reducerPath]: tripsApi.reducer,
    [shipmentApi.reducerPath]: shipmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(itemApi.middleware, customerApi.middleware, truckApi.middleware, driverApi.middleware, tripsApi.middleware, shipmentApi.middleware),
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

