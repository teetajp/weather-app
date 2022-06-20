import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { selectAllWeatherData, weatherRemoved } from './weatherSlice';

export default function WeatherDisplay () {
    const weatherData = useSelector(selectAllWeatherData);
    
    return (
        <Grid container spacing={3}>
            {weatherData.map(weatherLocation => (
                <Grid item xs={3} key={weatherLocation.id}>
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
                <h2>{(temp - 273.15).toFixed(1)} °C</h2>
            </Box>
            
            <CardContent>
                <h2>{city && city !== state ? city + "," : ""} {state ? state + "," : ""} {country ? country : ""}</h2>
                <h3>Feels like {(feels_like - 273.15).toFixed(1)} °C</h3>
                <h3>{description.charAt(0).toUpperCase() + description.slice(1)}</h3>
                <h3>Wind speed: {wind_speed} m/s</h3>
                <h3>Humidity: {humidity}%</h3>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => dispatch(weatherRemoved(id))}>Dismiss</Button>
            </CardActions>
        </Card>
    );
}