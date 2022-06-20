import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { addLocation } from '../weather/locationsSlice';
import { useGetCoordinatesQuery, useGetWeatherQuery, useLazyGetLocationWeatherQuery } from '../api/weatherApiSlice';
import { skipToken } from '@reduxjs/toolkit/query/react';


export default function WeatherForm() {
    //  TODO: Make text field and button align on the same row/height
    const [searchCity, setSearchCity] = useState('');
    const dispatch = useDispatch();
    // const { data: coordinatesData, isSuccess: foundCity } = useGetCoordinatesQuery(cityName ? cityName : skipToken);
    const [trigger, result] = useLazyGetLocationWeatherQuery()
    console.log(result.data)

    const handleSearchButtonClick = () => {
        // dispatch(addLocation(searchCity));
        // console.log(locations);
        // TODO: check if search query is valid
        // const { data: coordinatesData, isSuccess: foundCity } = useGetCoordinatesQuery(searchCity ? searchCity : skipToken);
        // TODO: If so, then get weather and add to weatherlist, with lat/lon as ID
        // TODO: If not, show an alert that its invalid 
        trigger(searchCity);
    }
    return (<>
    <Grid container>
        <Grid item xs={2}>
            <TextField fullWidth label="City" value={searchCity} onChange={(e) => setSearchCity(e.target.value)}/>
        </Grid>
        <Button variant="contained" onClick={() => handleSearchButtonClick()}>Search</Button>
    </Grid>
    </>);
}