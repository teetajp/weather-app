import React from 'react';
import './App.css';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import WeatherForm from './features/weather/WeatherForm';
import WeatherDisplay from './features/weather/WeatherCard';
import { useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/teetajp/weather-app">
        TJ Pavaritpong
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer() {
  return (<>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Weather App
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Powered by React, Redux, Material UI, and OpenWeatherMap
      </Typography>
      <Copyright />
    </Box>
  </>);
}

function App() {
  const weatherError = useSelector(state => state.weather.error);
  const weatherStatus = useSelector(state => state.weather.status);
  // TODO: add typescript

  /*  TODO:
  - add spacing/margin around all componets from the edges
  - add spacing between components
  - set a theme for the app
  - make font for Temp bigger
  - adjust spacing between font and weather Icon
   */ 
  return (
    <>
      <CssBaseline  />
      <main>
        { weatherStatus === 'pending' ? <LinearProgress /> : 
          weatherStatus === 'failed' ? <Alert severity="error">{weatherError}</Alert> : null }
          <Container maxWidth="xl">
            <Typography variant="h1" align="center" color="textPrimary">Weather App</Typography>
            <Typography variant="h4" gutterBottom align="center" color="textSecondary">Search for a city to get its weather conditions.</Typography>
          </Container>
        <WeatherForm/>
        <br/>
        {/* Add spacing between form and cards */}
        <WeatherDisplay/>
      </main>
      <Footer  />
    </>
  );
}

export default App;
