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
        }),
        getLocationWeather: builder.query({
            async queryFn(cityName, _queryApi, _extraOptions, fetchWithBQ) {
                const coordinatesResult = await fetchWithBQ(`geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`);
                if (coordinatesResult.error) throw coordinatesResult.error;
                // Coordinates of the search result
                const latitude = coordinatesResult.data[0].lat;
                const longitude = coordinatesResult.data[0].lon;

                const weatherResult = await fetchWithBQ(`data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&lang=en`);
                return weatherResult.data
                    ? { coordinatesData: coordinatesResult.data, weatherData: weatherResult.data }
                    : { error: weatherResult.error }
            }
        })
    })
})

export const { useGetCoordinatesQuery, useGetWeatherQuery, useLazyGetLocationWeatherQuery } = weatherApiSlice;