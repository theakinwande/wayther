'use client';

interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    uvi: number;
    visibility: number;
    weather: Array<{
      icon: string;
      description: string;
    }>;
  };
}

interface WeatherCardProps {
  weather: WeatherData;
  location: string;
}

export default function WeatherCard({ weather, location }: WeatherCardProps) {
  if (!weather) return null;

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-purple-500/20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold">{location}</h2>
          <p className="text-xl">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <div className="text-8xl font-bold bg-gradient-to-b from-white to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
            {Math.round(weather.current.temp)}°C
          </div>
          <div className="ml-6">
            <div className="relative">
              <img 
                src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} 
                alt={weather.current.weather[0].description}
                className="w-20 h-20 drop-shadow-lg"
              />
              <div className="absolute -inset-2 bg-blue-400/20 rounded-full blur-xl"></div>
            </div>
            <p className="text-xl capitalize font-medium text-blue-100">{weather.current.weather[0].description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm p-4 rounded-xl text-center border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
          <p className="text-sm text-blue-200 mb-1">Feels Like</p>
          <p className="text-2xl font-bold text-white">{Math.round(weather.current.feels_like)}°C</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-sm p-4 rounded-xl text-center border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
          <p className="text-sm text-green-200 mb-1">Humidity</p>
          <p className="text-2xl font-bold text-white">{weather.current.humidity}%</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm p-4 rounded-xl text-center border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
          <p className="text-sm text-orange-200 mb-1">Wind</p>
          <p className="text-2xl font-bold text-white">{Math.round(weather.current.wind_speed * 3.6)} km/h</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm p-4 rounded-xl text-center border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
          <p className="text-sm text-purple-200 mb-1">UV Index</p>
          <p className="text-2xl font-bold text-white">{weather.current.uvi < 11 ? Math.round(weather.current.uvi) : '11+'}</p>
        </div>
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm p-4 rounded-xl text-center border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
          <p className="text-sm text-cyan-200 mb-1">Visibility</p>
          <p className="text-2xl font-bold text-white">{(weather.current.visibility / 1000).toFixed(1)} km</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm p-4 rounded-xl text-center border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
          <p className="text-sm text-indigo-200 mb-1">Precipitation</p>
          <p className="text-2xl font-bold text-white">{weather.current.humidity > 70 ? 'High' : weather.current.humidity > 40 ? 'Med' : 'Low'}</p>
        </div>
      </div>
    </div>
  );
}