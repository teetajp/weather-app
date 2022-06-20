import React from 'react';
import './App.css';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import WeatherForm from './features/weather/WeatherForm';
import WeatherDisplay from './features/weather/WeatherCard';
import { useSelector } from 'react-redux';

// App idea: https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Weather-App.mdhttps://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Weather-App.md
function App() {
  const weatherError = useSelector(state => state.weather.error);
  const weatherStatus = useSelector(state => state.weather.status);

  return (
    <div>
      { weatherStatus === 'pending' ? <LinearProgress /> : 
        weatherStatus === 'failed' ? <Alert severity="error">{weatherError}</Alert> : null }
      <h1>Weather App</h1>
      <h2>Search for a city to get its weather conditions.</h2>
      <WeatherForm />
      <WeatherDisplay/>
    </div>
  );
}

export default App;
