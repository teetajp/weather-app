import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://api.openweathermap.org/';

export const fetchWeather = createAsyncThunk('locations/fetchWeather', async (cityName) => {
    // check asyncThunk parameters (state, dispatch)
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
                humidity: weatherResponse.data.main.humidity,
                weatherIcon: weatherResponse.data.weather[0].icon
        };
       return returnObject;
    } catch (err) {
        return err.message;
    }
})

export const locationsSlice = createSlice({
    name: 'locations',
    initialState: {
        weatherData: [{ // sample weather object
            id: 1,
            city: "Bangkok",
            state: "",
            country: "TH",
            description: "clear sky",
            temp: 292.6,
            humidity: 61,
            weatherIcon: "01n"
        }],
        status: 'idle',
        error: null
    },
    reducers: {
        weatherRemoved: (state, action) => {
            state.weatherData = state.weatherData.filter(location => location.id !== action.payload);
        },
    },
    extraReducers(builder) {
        // TODO: fix this as it causes React to stop rendering
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
                    console.log(state.error);
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
export const { weatherAdded, weatherRemoved } = locationsSlice.actions;

export default locationsSlice.reducer;

export const selectAllWeatherData = state => state.locations.weatherData;

export const selectWeatherById = (state, weatherId) => {
    state.locations.find(weather => weather.id === weatherId);
}

// {
//     // Multiple possible status enum values
//     status: 'idle' | 'loading' | 'succeeded' | 'failed',
//     error: string | null
// }