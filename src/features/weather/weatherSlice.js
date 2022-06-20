import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://api.openweathermap.org/';

export const fetchWeather = createAsyncThunk('locations/fetchWeather', async (cityName) => {
    try {
        /* Three Geocoding API responses:
        *  1. Error (non-200 status code)
        *  2. 200 stats code but Empty array --> when search fails
        *  3. Non-empty array --> when search succeeds (can be more than 1 result in array, so we take top-most)
        */
        const coordinatesResponse = await axios.get(BASE_URL + `geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`);
        if (coordinatesResponse.data.length === 0) {
            throw Error('No results matching search term found.');
        }
        const {lat: latitude, lon: longitude } = coordinatesResponse.data[0]; // top-most result

        /* Three Geocoding API responses:
        *  1. Error (non-200 status code)
        *  2. non-empty object containing all the data
        *  3. error object containg "cod", for code, and "message" --> automatically caught as error
        */
        const weatherResponse = await axios.get(BASE_URL + `/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&lang=en`);
       
        const returnObject =  {
                id: weatherResponse.data.id,
                city: coordinatesResponse.data[0].name,
                state: coordinatesResponse.data[0].state,
                country: coordinatesResponse.data[0].country,
                description: weatherResponse.data.weather[0].description,
                temp: weatherResponse.data.main.temp,
                feels_like: weatherResponse.data.main.feels_like,
                humidity: weatherResponse.data.main.humidity,
                wind_speed: weatherResponse.data.wind.speed,
                weatherIcon: weatherResponse.data.weather[0].icon
        };
       return returnObject;
    } catch (err) {
        return err.message;
    }
})

// Sample weather object
// { 
//     id: 1,
//     city: "Bangkok",
//     state: "",
//     country: "TH",
//     description: "clear sky",
//     temp: 292.6,
//     feels_like: 300.1,
//     humidity: 61,
//     wind_speed: 1.5, (default of meters/sec)
//     weatherIcon: "01n"
// }

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        weatherData: [],
        status: 'idle',
        error: null
    },
    reducers: {
        weatherRemoved: (state, action) => {
            state.weatherData = state.weatherData.filter(location => location.id !== action.payload);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchWeather.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                // Add newly fetched weather data to the list
                if (!state.weatherData.find(weather => weather.id === action.payload.id)) {
                    state.weatherData = state.weatherData.concat(action.payload);
                } else {
                    state.error = 'Weather data for searched term already exists.';
                    console.log(state.error); // TODO: remove this and add an alert
                }
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.status = 'failed';
                // Save error message so we can display it to the user
                state.error = action.error.message;
            })
    }
});


// Action creators for each case reducer function
export const { weatherRemoved } = weatherSlice.actions;

export default weatherSlice.reducer;

export const selectAllWeatherData = state => state.weather.weatherData;