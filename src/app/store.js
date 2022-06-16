import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import locationsReducer from '../features/weather/locationsSlice';
import { weatherApiSlice } from '../features/api/weatherApiSlice';

export const store = configureStore({
  reducer: {
    locations: locationsReducer,
    [weatherApiSlice.reducerPath]: weatherApiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(weatherApiSlice.middleware)
})