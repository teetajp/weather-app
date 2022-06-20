import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { selectAllWeatherData, weatherRemoved } from './locationsSlice';

export default function WeatherDisplay () {
    const weatherData = useSelector(selectAllWeatherData);
    const weatherStatus = useSelector(state => state.locations.status);
    const weatherError = useSelector(state => state.locations.error);

    // console.log(weatherData);
    return (
        <Grid container spacing={3}>
            {weatherData.map(weatherLocation => (
                <Grid item xs={3} key={weatherLocation.id}>
                    <WeatherCard data={weatherLocation}/>
                </Grid>
            ))}
        </Grid>
        
    );
}
// TODO: style weather card component
const WeatherCard = ({ data }) => {
    // if (!foundCity) {
    //     return <h2>Searching for City...</h2>;
    // } else if (foundCity && !weatherSuccess) {
    //     return <h2>Loading Weather...</h2>
    
    return <WeatherContent id={data.id} city={data.city} state={data.state} country={data.country} description={data.description} temp={data.temp} humidity={data.humidity} weatherIcon={data.weatherIcon}/>;
}

const WeatherContent = ({ id="", city="", state="", country="", description="Description", temp="-273.15", humidity="50", weatherIcon="10d"}) => {
    const dispatch = useDispatch();
    // TODO: add loading bar from https://mui.com/material-ui/react-progress/
    return (
        <Card variant="outlined" sx={{ maxWidth: 345 }}>
            <CardMedia component="img" sx={{ width: 100}} image={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={weatherIcon}/>
            <CardContent>
                <h2>{city && city !== state ? city + "," : ""} {state ? state + "," : ""} {country ? country : ""}</h2>
                <h3>{(temp - 273.15).toFixed(1)} °C</h3>
                <h3>{description.charAt(0).toUpperCase() + description.slice(1)}</h3>
                <h3>Humidity: {humidity}%</h3>
            </CardContent>
            <CardActions>
                {/* TODO: add onClick to dismiss the button */}
                <Button size="small" color="primary" onClick={() => dispatch(weatherRemoved(id))}>Dismiss</Button>
            </CardActions>
        </Card>
    );
}