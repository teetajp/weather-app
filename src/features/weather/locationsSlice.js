import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://api.openweathermap.org/';

export const fetchCityWeather = createAsyncThunk('locations/fetchCityWeather', async (cityName) => {
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
       console.log(returnObject);
       return returnObject;
    } catch (err) {
        return err.message;
    }
})

export const locationsSlice = createSlice({
    name: 'locations',
    initialState: {
        weatherData: [{ // sample weather object
            city: "Bangkok",
            state: "",
            country: "TH",
            description: "clear sky",
            temp: 292.6,
            humidity: 61,
            weatherIcon: "01n"
        }]
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
    // extraReducers(builder) { .TODO: fix this as it causes React to stop rendering
    //     builder.addCase()
    // }
});


// Action creators for each case reducer function
export const { addLocation, removeLocation } = locationsSlice.actions;

export default locationsSlice.reducer;

export const selectAllWeatherData = state => state.locations.weatherData;

export const selectWeatherByLatLon = (state, lat, lon) => {
    state.locations.find(loc => loc.lat === lat && loc.lon === lon);
}