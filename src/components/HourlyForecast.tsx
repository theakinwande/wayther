'use client';

interface HourlyData {
  dt: number;
  temp: number;
  pop: number;
  weather: Array<{
    icon: string;
    description: string;
  }>;
}

interface HourlyForecastProps {
  forecast: HourlyData[];
}

export default function HourlyForecast({ forecast }: HourlyForecastProps) {
  if (!forecast || !forecast.length) return null;

  // Display only the next 24 hours
  const next24Hours = forecast.slice(0, 24);

  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {next24Hours.map((hour, index) => {
          const date = new Date(hour.dt * 1000);
          const hourString = date.getHours();
          const displayHour = hourString === 0 ? '12 AM' : 
                             hourString === 12 ? '12 PM' : 
                             hourString > 12 ? `${hourString - 12} PM` : 
                             `${hourString} AM`;
          
          return (
            <div 
              key={index} 
              className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 min-w-[70px] sm:min-w-[80px] flex-shrink-0"
            >
              <p className="text-xs sm:text-sm font-medium">{displayHour}</p>
              <img 
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} 
                alt={hour.weather[0].description}
                className="w-8 h-8 sm:w-10 sm:h-10 my-1"
              />
              <p className="text-base sm:text-lg font-semibold">{Math.round(hour.temp)}°C</p>
              <p className="text-xs opacity-70">{Math.round(hour.pop * 100)}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}