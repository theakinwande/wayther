const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

// Check if API key is configured
if (!API_KEY) {
  console.warn('OpenWeatherMap API key is not configured. Please set NEXT_PUBLIC_OPENWEATHERMAP_API_KEY in your environment variables.');
}

// Debug mode for better error reporting
const DEBUG_MODE = process.env.NODE_ENV === 'development';

// Mock data functions
function getMockWeatherData(): WeatherData {
  return {
    current: {
      dt: Math.floor(Date.now() / 1000),
      temp: 22,
      feels_like: 21,
      humidity: 65,
      wind_speed: 12,
      uvi: 5,
      visibility: 10000,
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d"
        }
      ]
    },
    hourly: [
      {
        dt: Math.floor(Date.now() / 1000) + 3600,
        temp: 22,
        pop: 0,
        weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }]
      },
      {
        dt: Math.floor(Date.now() / 1000) + 7200,
        temp: 21,
        pop: 0,
        weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }]
      },
      {
        dt: Math.floor(Date.now() / 1000) + 10800,
        temp: 20,
        pop: 0,
        weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }]
      }
    ],
    alerts: []
  };
}

function getMockGeocodingData(location: string): GeocodingData[] {
  return [
    {
      name: location || "Demo City",
      lat: 40.7128,
      lon: -74.0060,
      country: "US",
      state: "Demo State"
    }
  ];
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
      console.warn('Using mock data due to missing API key');
      return getMockWeatherData();
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    
    if (DEBUG_MODE) {
      console.log('Fetching weather from:', url.replace(API_KEY, '***'));
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      console.error('Weather API error:', {
        status: response.status,
        statusText: response.statusText,
        errorData: errorData
      });
      
      // Fallback to mock data on API errors
      console.warn('Falling back to mock data due to API error');
      return getMockWeatherData();
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
      console.warn('Using mock geocoding data due to missing API key');
      return getMockGeocodingData(location);
    }
    
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=5&appid=${API_KEY}`;
    
    if (DEBUG_MODE) {
      console.log('Geocoding location from:', url.replace(API_KEY, '***'));
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      console.error('Geocoding API error:', {
        status: response.status,
        statusText: response.statusText,
        errorData: errorData
      });
      
      // Fallback to mock data on API errors
      console.warn('Falling back to mock geocoding data due to API error');
      return getMockGeocodingData(location);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error geocoding location:', error);
    throw error;
  }
}