import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const weatherApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://api.openweathermap.org/'}),
    endpoints: builder => ({
        getCoordinates: builder.query({
            query: (cityName) => `/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
        }),
        getWeather: builder.query({
            query: ({latitude, longitude}) => `/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&lang=en`
        })
    })
})

export const { useGetCoordinatesQuery, useGetWeatherQuery } = weatherApiSlice;