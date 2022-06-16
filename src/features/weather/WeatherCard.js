import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

// TODO: fetch weather data from OpenWeather API

// TODO: style weather card component
export default function WeatherCard({ city="Champaign", state="IL", country="USA", description="Clear sky", temp="298.15", humidity="65", weatherIcon="01d"}) {
    return (
        <Card variant="outlined" sx={{ maxWidth: 345 }}>
            {/* Call weather API to get weather Icon image */}
            <CardMedia component="img" height="140" image={weatherIcon} alt={weatherIcon}/>
            <CardContent>
                <h2>{city ? city + "," : ""} {state ? state + "," : ""} {country ? country : ""}</h2>
                <h3>{temp - 273.15} °C</h3>
                <h3>{description}</h3>
                <h3>Humidity: {humidity}%</h3>
            </CardContent>
            <CardActions>
                {/* TODO: add onClick to dismiss the button */}
                <Button size="small" color="primary">Dismiss</Button>
            </CardActions>
        </Card>
    );
}