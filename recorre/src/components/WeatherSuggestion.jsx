import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ userLocation }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = '47c248b3eb5c77b574285e9b0f41c9eb';

  useEffect(() => {
    const fetchWeather = async () => {
      // Asegúrate de que userLocation tenga valores válidos
      if (!userLocation || !userLocation.lat || !userLocation.lng) {
        setError('Ubicación no válida');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.lat}&lon=${userLocation.lng}&appid=${apiKey}&units=metric`
        );

        // Verifica que la respuesta tenga datos
        if (response.data) {
          setWeatherData(response.data);
        } else {
          setError('No se encontraron datos de clima');
        }
      } catch (err) {
        setError(`Error fetching weather data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [userLocation]);

  if (loading) return <p>Cargando clima...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <h2>Clima Actual</h2>
      {weatherData && (
        <>
          <p>Temperatura: {weatherData.main.temp} °C</p>
          <p>Descripción: {weatherData.weather[0].description}</p>
          <p>Humedad: {weatherData.main.humidity}%</p>
          <p>Viento: {weatherData.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

export default Weather;
