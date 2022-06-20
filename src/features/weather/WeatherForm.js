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
        <Grid container>
            <Grid item xs={2}>
                <TextField fullWidth label="City" value={searchCity} onChange={(e) => setSearchCity(e.target.value)}/>
            </Grid>
            <Button variant="contained" onClick={() => dispatch(fetchWeather(searchCity))}>Search</Button>
        </Grid>
    </>);
}