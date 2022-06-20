import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_BASE_URL = 'http://api.openweathermap.org/';
// Must get API key from https://home.openweathermap.org/users/sign_up at paste it in .env as REACT_APP_OPENWEATHER_API_KEY

export const fetchWeather = createAsyncThunk('locations/fetchWeather', async (cityName) => {
    try {
        const coordinatesResponse = await axios.get(API_BASE_URL + `geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`);
        if (coordinatesResponse.data.length === 0) {
            throw Error('No results matching search term found.');
        }
        // Fetch the weather data for the top-most result of the searched term
        const weatherResponse = await axios.get(API_BASE_URL + `/data/2.5/weather?lat=${coordinatesResponse.data[0].lat}&lon=${coordinatesResponse.data[0].lon}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&lang=en`);
       
       return {
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
                state.status = 'pending';
                state.error = null;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                // Add newly fetched weather data to the list
                if (!state.weatherData.find(weather => weather.id === action.payload.id)) {
                    state.weatherData = state.weatherData.concat(action.payload);
                    state.error = null;
                } else {
                    state.status = 'failed';
                    state.error = 'Error: City already added.';
                }
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                // Save error message so we can display it to the user
                state.error = action.error.message;
                state.status = 'failed';
            })
    }
});


// Action creators for each case reducer function
export const { weatherRemoved } = weatherSlice.actions;

export default weatherSlice.reducer;

export const selectAllWeatherData = state => state.weather.weatherData;