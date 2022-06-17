import { createSlice } from '@reduxjs/toolkit';

export const locationsSlice = createSlice({
    name: 'locations',
    initialState: {
        locationsList: ["Champaign", "Bangkok"]
        // locationsList: ["Champaign", "Bangkok", "Kansas City", "London", "New Jersey", "Paris"],
    },
    reducers: {
        addLocation: (state, action) => {
            // TODO: check that id doesnt match existing data (using city ID from current weather API)
            state.locationsList.push(action.payload);
        },
        removeLocation: (state, action) => {
            state.locationsList = state.locationsList.filter(location => location !== action.payload);
        },
    }
});


// Action creators for each case reducer function
export const { addLocation, removeLocation } = locationsSlice.actions;

export default locationsSlice.reducer;