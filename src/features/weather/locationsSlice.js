import { createSlice } from '@reduxjs/toolkit';

const locationData = {
    city: '',
    lat: '',
    lon: ''
}

/** Retrives the latitude and longitude of a city from the OpenWeather API
 *  - Uses the city from the top search result when more than one result is returned
 * 
 * @param {*} cityName city to search for
 * @returns an object containing the latitude and longitude of the given city
 */
export const retrieveLatitudeLongitude = (cityName) => {
    // TODO: implement by calling Geocoding API and using async/await and fetch
    const geocodingApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.REACT_APP_TRIAL_KEY}`;
    return geocodingApiUrl;
}

/** Retrieves the current weather data for a location from the OpenWeather API given a latitude and longitude
 * 
 * @param {*} latitude latitude of the location to search
 * @param {*} longitude longitude of the location to search
 * @returns object containing the current weather data at the given latitude and longitude
 */
export const retrieveWeather = (latitude, longitude) => {
    let city, state, country, description, temp, humidity, weatherIcon = "";
    return { city, state, country, description, temp, humidity, weatherIcon};
}

// TODO: create weatherSlice reducer to add weather data to the store
// TODO: create weatherSlice reducer to remove weather data from the store
// TODO: createAsyncThunk for fetching Weather API ---> checkout RTK Query for data fetching
export const locationsSlice = createSlice({
    name: 'locations',
    // initialState: [],
    initialState: ["Champaign", "Bangkok"],
    // initialState: ["Champaign", "Bangkok", "Kansas City", "London", "New Jersey", "Paris"],
    // TODO: add some sort of ID system instead of latitude and longitude
    reducers: {
        addLocation: (state, action) => {
            // TODO: check that id doesnt match existing data (using city ID from current weather API)
            state.locationsList.push(action.payload.newLocation);
        },
        removeLocation: (state, action) => {
            state.locationsList = state.locationsList.filter(location => location.id !== action.payload.id);
        },
    }
});


// Action creators for each case reducer function
export const { addLocation, removeLocation } = locationsSlice.actions;

export default locationsSlice.reducer;