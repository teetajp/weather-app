import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function WeatherCard({ city="Champaign", state="IL", country="USA", description="Clear sky", temp="298.15", humidity="65", weatherIcon="01d"}) {
    return (
    <>
        <h2>{city ? city + "," : ""} {state ? state + "," : ""} {country ? country : ""}</h2>
        <h3>{description}</h3>
        <h3> {temp - 273.15} °C</h3>
        <h3>Humidity: {humidity}%</h3>
        <img src={weatherIcon} alt="weatherIcon" />
    </>);
}