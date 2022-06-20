import { configureStore } from '@reduxjs/toolkit'
import weatherSliceReducer from '../features/weather/weatherSlice';

export const store = configureStore({
  reducer: {
    weather: weatherSliceReducer
  }
})