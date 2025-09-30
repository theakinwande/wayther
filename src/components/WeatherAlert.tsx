'use client';

interface WeatherAlertProps {
  alert: {
    event: string;
    description: string;
    start: number;
    end: number;
  };
}

export default function WeatherAlert({ alert }: WeatherAlertProps) {
  const startDate = new Date(alert.start * 1000);
  const endDate = new Date(alert.end * 1000);
  
  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  return (
    <div className="bg-red-500/30 backdrop-blur-sm rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-xl font-bold">{alert.event}</h3>
      </div>
      <p className="text-sm mb-2">
        <span className="font-semibold">From:</span> {formatDate(startDate)}
        <br />
        <span className="font-semibold">To:</span> {formatDate(endDate)}
      </p>
      <p className="text-sm">{alert.description}</p>
    </div>
  );
}