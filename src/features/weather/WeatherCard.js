import React from 'react';
import { useDispatch } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query/react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useGetCoordinatesQuery, useGetWeatherQuery } from '../api/weatherApiSlice';
import { removeLocation } from './locationsSlice';

export default function WeatherDisplay ({ locations }) {
    // TODO: fetch data from list of cities
   
    console.log(locations);
    return (
        <Grid container spacing={3}>
            {locations.map(location => (
                <Grid item xs={3} key={location}>
                    <WeatherCard cityName={location} />
                </Grid>
            ))}
        </Grid>
        
    );
}
// TODO: style weather card component
const WeatherCard = ({ cityName="" }) => {
    const { data: coordinatesData, isSuccess: foundCity } = useGetCoordinatesQuery(cityName ? cityName : skipToken);
    const { data: weatherData, isSuccess: weatherSuccess } = useGetWeatherQuery(foundCity ? {latitude: coordinatesData[0].lat, longitude: coordinatesData[0].lon} : skipToken);

    if (!foundCity) {
        return <h2>Searching for City...</h2>;
    } else if (foundCity && !weatherSuccess) {
        return <h2>Loading Weather...</h2>
    } else {
        // console.log(weatherData);
        return (<WeatherContent
            city={coordinatesData[0].name}
            state={coordinatesData[0].state}
            country={coordinatesData[0].country}
            description={weatherData.weather[0].description}
            temp={weatherData.main.temp}
            humidity={weatherData.main.humidity}
            weatherIcon={weatherData.weather[0].icon}
        />);
    }
}

const WeatherContent = ({ city="", state="", country="", description="Description", temp="-273.15", humidity="50", weatherIcon="10d"}) => {
    const dispatch = useDispatch();

    return (
        <Card variant="outlined" sx={{ maxWidth: 345 }}>
            {/* Call weather API to get weather Icon image */}
            <CardMedia component="img" sx={{ width: 100}} image={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={weatherIcon}/>
            <CardContent>
                <h2>{city && city !== state ? city + "," : ""} {state ? state + "," : ""} {country ? country : ""}</h2>
                <h3>{(temp - 273.15).toFixed(1)} °C</h3>
                <h3>{description.charAt(0).toUpperCase() + description.slice(1)}</h3>
                <h3>Humidity: {humidity}%</h3>
            </CardContent>
            <CardActions>
                {/* TODO: add onClick to dismiss the button */}
                <Button size="small" color="primary" onClick={() => dispatch(removeLocation(city))}>Dismiss</Button>
            </CardActions>
        </Card>
    );
}