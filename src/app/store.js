import { configureStore } from '@reduxjs/toolkit'
import locationsReducer from '../features/weather/locationsSlice';

export const store = configureStore({
  reducer: {
    locations: locationsReducer
  }
})