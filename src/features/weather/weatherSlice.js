import { createSlice } from '@reduxjs/toolkit';

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

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        city: '',
        lat: '',
        lon: ''

    },
    reducers: {

    }
});