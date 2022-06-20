import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { useGetCoordinatesQuery, useGetWeatherQuery } from '../api/weatherApiSlice';
import axios from 'axios';
const BASE_URL = 'http://api.openweathermap.org/';

const fetchCoordinates = createAsyncThunk('locations/fetchCoordinates', async (cityName) => {
    try {
        const response = await axios.get(BASE_URL + `geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`);
        return response.data;
    } catch (err) {
        return err.message;
    }
})

export function fetchCityWeather() {

}

const initialState = {
    weatherList: [],
    status: 'idle',
    error: null
}
export const locationsSlice = createSlice({
    name: 'locations',
    initialState: {
        locationsList: [],
        // locationsList: ["Champaign", "Bangkok"],
        weatherList: []
        // locationsList: ["Champaign", "Bangkok", "Kansas City", "London", "New Jersey", "Paris"],
    },
    reducers: {
        addLocation: (state, action) => {
            // TODO: check that id doesnt match existing data (using city ID from current weather API)
            state.locationsList.push(action.payload);
            // const { data: coordinatesData, isSuccess: foundCity } = useGetCoordinatesQuery(cityName ? cityName : skipToken);
    
        },
        removeLocation: (state, action) => {
            state.locationsList = state.locationsList.filter(location => location !== action.payload);
        },
    },
    extraReducers(builder) {
        builder.addCase()
    }
});


// Action creators for each case reducer function
export const { addLocation, removeLocation } = locationsSlice.actions;

export default locationsSlice.reducer;

export const selectAllWeatherData = state => state.locations;

export const selectWeatherByLatLon = (state, lat, lon) => {
    state.locations.find(loc => loc.lat === lat && loc.lon === lon);
}