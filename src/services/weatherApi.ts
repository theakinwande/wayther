const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

// Check if API key is configured
if (!API_KEY) {
  console.warn('OpenWeatherMap API key is not configured. Please set NEXT_PUBLIC_OPENWEATHERMAP_API_KEY in your environment variables.');
}

export interface WeatherData {
  current: {
    dt: number;
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    uvi: number;
    visibility: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
  };
  hourly: {
    dt: number;
    temp: number;
    pop: number; // probability of precipitation
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
  }[];
  alerts?: {
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
  }[];
}

export interface GeocodingData {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export async function getWeatherByCoordinates(lat: number, lon: number): Promise<WeatherData> {
  try {
    if (!API_KEY) {
      throw new Error('OpenWeatherMap API key is not configured. Please set NEXT_PUBLIC_OPENWEATHERMAP_API_KEY in your environment variables.');
    }
    
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(`Failed to fetch weather data: ${errorData.message || response.statusText}`);
    }
    
    const data = await response.json();
    
    // Convert the response to match our WeatherData interface
    return {
      current: {
        dt: data.dt,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        uvi: data.uvi || 0, // Use API UV index if available, otherwise 0
        visibility: data.visibility || 10000, // Use API visibility if available, default 10km
        weather: data.weather
      },
      hourly: [], // Basic API doesn't provide hourly data
      alerts: [] // Basic API doesn't provide alerts
    };
    
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export async function geocodeLocation(location: string): Promise<GeocodingData[]> {
  try {
    if (!API_KEY) {
      throw new Error('OpenWeatherMap API key is not configured. Please set NEXT_PUBLIC_OPENWEATHERMAP_API_KEY in your environment variables.');
    }
    
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=5&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(`Failed to geocode location: ${errorData.message || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error geocoding location:', error);
    throw error;
  }
}