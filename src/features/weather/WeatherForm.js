import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { fetchWeather } from './weatherSlice';


export default function WeatherForm() {
    // TODO: style component
    const [searchCity, setSearchCity] = useState('');
    const dispatch = useDispatch();
    

    const handleSearchButtonClick = () => {
        dispatch(fetchWeather(searchCity));
        // TODO: Show alert if there is an error message
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