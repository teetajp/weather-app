import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { fetchWeather } from './weatherSlice';


export default function WeatherForm() {
    const [searchCity, setSearchCity] = useState('');
    const dispatch = useDispatch();

    return (<>
        <Grid container alignItems="top">
            <Grid item xs={3}>
                <TextField fullWidth label="City" value={searchCity} onChange={(e) => setSearchCity(e.target.value)}/>
            </Grid>
            <Grid item xs={1.5}>
                <Button fullWidth sx={{ height: '56px' }} variant="contained" onClick={() => dispatch(fetchWeather(searchCity))}>Search</Button>
            </Grid>
        </Grid>
    </>);
}