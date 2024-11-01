import React, { useEffect, useState } from 'react';

const Weather = () => {
  const [weather, setWeather] = useState({ temperature: null, description: '' });
  const city = "Chicago"; 
  const API_KEY = "2b48489910b25e006ab4b0e29e09b6d3"; 
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
        const geoData = await geoResponse.json();
        
        if (geoData.length > 0) {
          const { lat, lon } = geoData[0];

          const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
          const weatherData = await weatherResponse.json();

          if (weatherData.main) {
            setWeather({
              temperature: weatherData.main.temp,
              description: weatherData.weather[0].description,
            });
          } else {
            console.error('Error fetching weather data:', weatherData.error);
          }
        } else {
          console.error('City not found');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [city, API_KEY]);

  return (
    <div className='weather-info'>
      {weather.temperature !== null ? (
        <span className='p__opensans'>{` ${weather.temperature}°C, ${weather.description}`}</span>
      ) : (
        <span className='p__opensans'>Loading weather...</span>
      )}
    </div>
  );
};

export default Weather;
