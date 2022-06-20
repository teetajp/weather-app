import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import { selectAllWeatherData, weatherRemoved } from './weatherSlice';

export default function WeatherDisplay () {
    const weatherData = useSelector(selectAllWeatherData);
    
    return (
        <Grid container spacing={4} justifyContent="center">
            {weatherData.map(weatherLocation => (
                <Grid item xs="auto" key={weatherLocation.id}>
                    <WeatherCard {...weatherLocation}/>
                </Grid>
            ))}
        </Grid>
        
    );
}

const WeatherCard = ({ id="", city="", state="", country="", description="Description", temp="-273.15", feels_like="-273.15", humidity="50", wind_speed="0", weatherIcon="10d"}) => {
    const dispatch = useDispatch();
    return (
        <Card variant="outlined" sx={{ maxWidth: 345 }}>
            <Box sx={{ display: 'flex' }}>
                <CardMedia component="img" sx={{ width: 100}} image={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={weatherIcon} />
                <Typography variant="h2">{(temp - 273.15).toFixed(1)} °C</Typography>
            </Box>
            
            <CardContent align="left">
                <Typography variant="h4" gutterBottom>{city && city !== state ? city + "," : ""} {state ? state + "," : ""} {country ? country : ""}</Typography>
                <Typography variant="h5" gutterBottom>Feels like {(feels_like - 273.15).toFixed(1)} °C</Typography>
                <Typography variant="h5" gutterBottom>{description.charAt(0).toUpperCase() + description.slice(1)}</Typography>
                <Typography variant="h5" gutterBottom>Wind speed: {wind_speed} m/s</Typography>
                <Typography variant="h5">Humidity: {humidity}%</Typography>
            </CardContent>
            <CardActions>
                <Button size="large" color="warning" onClick={() => dispatch(weatherRemoved(id))}>Dismiss</Button>
            </CardActions>
        </Card>
    );
}