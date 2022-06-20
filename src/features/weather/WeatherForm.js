import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { fetchWeather } from '../weather/locationsSlice';


export default function WeatherForm() {
    //  TODO: Make text field and button align on the same row/height
    const [searchCity, setSearchCity] = useState('');
    const dispatch = useDispatch();
    

    const handleSearchButtonClick = () => {
        dispatch(fetchWeather(searchCity));
        // TODO: check if search query is valid
        // TODO: If so, then get weather and add to weatherlist, with lat/lon as ID
        // TODO: If not, show an alert that its invalid 
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