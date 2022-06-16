import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    city: '',
    lat: '',
    lon: ''
}

export const retrieveLatitudeLongtitude = (cityName) => {
    // TODO: retrieve city from API

    // Call Geocoding API to get lat/lon of the first result
    // Then call the Current Weather Data API
    const geocodingApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.REACT_APP_TRIAL_KEY}`;
    return geocodingApiUrl;
}

export const retrieveWeather = (latitude, longtitude) => {
    let city, state, country, description, temp, humidity, weatherIcon = "";
    return { city, state, country, description, temp, humidity, weatherIcon};
}

// TODO: Configure initial state
// TODO: create weatherSlice reducer to add weather data to the store
// TODO: create weatherSlice reducer to remove weather data from the store
// TODO: createAsyncThunk for fetching Weather API
export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        addLocation: (state, action) => {
            state.location = ""
        }, // add a location and its weather data
        removeLocation: (state) => {
            state.location = ""
        }, // remove the location and its weather data
    }
});


// Action creators for each case reducer function
export const { addLocation, removeLocation } = weatherSlice.actions;

export default weatherSlice.reducer;