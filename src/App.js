import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import WeatherForm from './features/weather/WeatherForm';
import WeatherDisplay from './features/weather/WeatherCard';
import { addLocation } from './features/weather/locationsSlice';
import { useGetCoordinatesQuery, useGetWeatherQuery } from './features/api/weatherApiSlice';
import { selectAllWeatherData } from './features/weather/weatherApi';

// TODO: style app with material UI

// App idea: https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Weather-App.mdhttps://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Weather-App.md
function App() {
  // const locations = useSelector((state) => state.locations.locationsList);
  const locations = useSelector(selectAllWeatherData);

  return (
    <div>
      <h1>Weather App</h1>
      <h2>Search for a city to get its weather conditions.</h2>
      <WeatherForm />
      <WeatherDisplay locations={locations}/>
    </div>
  );
}

export default App;
