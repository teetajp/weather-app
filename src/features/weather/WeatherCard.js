import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query/react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useGetCoordinatesQuery, useGetWeatherQuery } from '../api/weatherApiSlice';

export const WeatherDisplay = () => {
    // TODO: fetch data from list of cities
    const dispatch = useDispatch();
    const locations = useSelector((state) => state.locations);
    console.log(locations);
    return (
        <Grid container spacing={3}>
            {locations.map(location => (
                <Grid item xs={3}>
                    <WeatherCard key={location} cityName={location} />
                </Grid>
            ))}
        </Grid>
        
    );
}
// TODO: style weather card component
export default function WeatherCard({ cityName="" }) {
    const { data: coordinatesData, isSuccess: foundCity } = useGetCoordinatesQuery(cityName ? cityName : skipToken);
    const { data: weatherData, isSuccess: weatherSuccess } = useGetWeatherQuery(foundCity ? {latitude: coordinatesData[0].lat, longitude: coordinatesData[0].lon} : skipToken);

    if (!foundCity) {
        return <h2>Error: Could not find city</h2>;
    } else if (foundCity && !weatherSuccess) {
        return <h2>Loading Weather</h2>
    } else {
        console.log(weatherData);
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
                <Button size="small" color="primary">Dismiss</Button>
            </CardActions>
        </Card>
    );
}