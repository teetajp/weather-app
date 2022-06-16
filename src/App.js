import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import WeatherCard from './features/weather/WeatherCard';
import { retrieveLatitudeLongitude } from './features/weather/locationsSlice';

// TODO: style app with material UI

// App idea: https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Weather-App.mdhttps://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Weather-App.md
function App() {
  const [city, setCity] = useState('');

  const handleButtonClick = () => {
    console.log(retrieveLatitudeLongitude(city));
  }

  return (
    <div>
      <h1>Weather App</h1>
      <h2>Search for a city to get its weather conditions.</h2>
      <div>
        {/*  : Make text field and button align on the same row/height */}
        <TextField label="City" value={city} onChange={(e) => setCity(e.target.value)}/>
        <Button variant="contained" onClick={handleButtonClick}>Search</Button>
      </div>
      {/* TODO: Add list comprehension to display weather card for each city that we have added */}
      <WeatherCard />
    </div>
  );
}

export default App;
