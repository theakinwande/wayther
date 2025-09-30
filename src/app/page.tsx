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
  const [usingMockData, setUsingMockData] = useState(false);

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
      setUsingMockData(false);

      const weatherData = await getWeatherByCoordinates(lat, lon);
      setWeather(weatherData);

      if (weatherData.alerts) {
        setAlerts(weatherData.alerts);
      }

      setLoading(false);
      
      // Check if we're using mock data (temperature around 22°C indicates mock data)
      if (Math.abs(weatherData.current.temp - 22) < 1) {
        setUsingMockData(true);
        setError('Using demo data. Please configure your API key for real weather data.');
      }
    } catch (err) {
      console.error('Weather fetch error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch weather data. Please check your API key configuration.');
      }
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
      console.error('Search error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch weather data. Please check your API key configuration.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-6xl">
        <header className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Wayther
          </h1>
          <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8">Your personal weather companion</p>
          <SearchBar onSearch={handleSearch} />
        </header>

        <main>
          {loading && (
            <div className="flex justify-center items-center my-8 sm:my-16">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-400 border-t-transparent"></div>
                <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-purple-400 opacity-20"></div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-xl p-4 sm:p-6 text-center my-4 sm:my-8 max-w-md mx-auto">
              <div className="text-red-400 text-base sm:text-lg mb-2">⚠️ Error</div>
              <p className="text-white text-sm sm:text-base">{error}</p>

            </div>
          )}

          {weather && (
            <>
              {usingMockData && (
                <div className="bg-yellow-500/20 backdrop-blur-md border border-yellow-500/30 rounded-xl p-3 sm:p-4 text-center mb-4 sm:mb-6">
                  <div className="text-yellow-400 text-sm sm:text-base mb-1">⚠️ Demo Mode</div>
                  <p className="text-white text-xs sm:text-sm">Using sample data. Set up your API key for real weather data.</p>
                </div>
              )}
              
              <WeatherCard weather={weather} location={location} />

              <div className="mt-6 sm:mt-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Hourly Forecast</h2>
                <HourlyForecast forecast={weather.hourly} />
              </div>

              {alerts.length > 0 && (
                <div className="mt-6 sm:mt-8">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Weather Alerts</h2>
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
