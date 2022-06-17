import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import WeatherDisplay from './features/weather/WeatherCard';
import { addLocation } from './features/weather/locationsSlice';

// TODO: style app with material UI

// App idea: https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Weather-App.mdhttps://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Weather-App.md
function App() {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.locationsList);
  
  const handleSearchButtonClick = () => {
    dispatch(addLocation(city));
    // console.log(locations);
    // TODO: check if search query is valid
    // TODO: If so, then get weather and add to weatherlist, with lat/lon as ID
    // TODO: If not, show an alert that its invalid 
  }

  return (
    <div>
      <h1>Weather App</h1>
      <h2>Search for a city to get its weather conditions.</h2>
      <div>
        {/*  TODO: Make text field and button align on the same row/height */}
        <TextField label="City" value={city} onChange={(e) => setCity(e.target.value)}/>
        <Button variant="contained" onClick={() => handleSearchButtonClick()}>Search</Button>
      </div>
      <WeatherDisplay locations={locations}/>
    </div>
  );
}

export default App;
