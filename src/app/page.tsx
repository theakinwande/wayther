'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import HourlyForecast from '@/components/HourlyForecast';
import WeatherAlert from '@/components/WeatherAlert';
import { getWeatherByCoordinates, geocodeLocation, WeatherData } from '@/services/weatherApi';

interface WeatherAlert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags?: string[];
}

export default function Home() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);

  // Get user's location on initial load
  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setError('Unable to get your location. Please search for a city.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  }, []);

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError('');

      const weatherData = await getWeatherByCoordinates(lat, lon);
      setWeather(weatherData);

      if (weatherData.alerts) {
        setAlerts(weatherData.alerts);
      }

      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data');
      setLoading(false);
    }
  };

  const handleSearch = async (searchLocation: string) => {
    if (!searchLocation) return;

    setLocation(searchLocation);
    setLoading(true);
    setError('');

    try {
      const geoData = await geocodeLocation(searchLocation);

      if (geoData && geoData.length > 0) {
        const { lat, lon, name } = geoData[0];
        setLocation(name);
        await fetchWeatherByCoords(lat, lon);
      } else {
        setError('Location not found. Please try another search.');
      }

      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Wayther
          </h1>
          <p className="text-gray-300 text-lg mb-8">Your personal weather companion</p>
          <SearchBar onSearch={handleSearch} />
        </header>

        <main>
          {loading && (
            <div className="flex justify-center items-center my-16">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent"></div>
                <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-purple-400 opacity-20"></div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-xl p-6 text-center my-8 max-w-md mx-auto">
              <div className="text-red-400 text-lg mb-2">⚠️ Error</div>
              <p className="text-white">{error}</p>
            </div>
          )}

          {weather && (
            <>
              <WeatherCard weather={weather} location={location} />

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Hourly Forecast</h2>
                <HourlyForecast forecast={weather.hourly} />
              </div>

              {alerts.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4">Weather Alerts</h2>
                  {alerts.map((alert, index) => (
                    <WeatherAlert key={index} alert={alert} />
                  ))}
                </div>
              )}
            </>
          )}
        </main>

        <footer className="mt-12 text-center text-sm opacity-80">
          <p>© 2025 Wayther App - Weather data powered by OpenWeatherMap</p>
        </footer>
      </div>
    </div>
  );
}
