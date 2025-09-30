'use client';

import { useState } from 'react';

interface DebugInfoProps {
  error: string;
}

export default function DebugInfo({ error }: DebugInfoProps) {
  const [showDebug, setShowDebug] = useState(false);
  
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
  const hasApiKey = !!apiKey;
  
  return (
    <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
      <button 
        onClick={() => setShowDebug(!showDebug)}
        className="text-yellow-400 text-sm hover:text-yellow-300 transition-colors"
      >
        {showDebug ? 'Hide' : 'Show'} Debug Information
      </button>
      
      {showDebug && (
        <div className="mt-3 text-xs text-yellow-200 space-y-2">
          <div>
            <strong>API Key Status:</strong> {hasApiKey ? '✅ Configured' : '❌ Missing'}
          </div>
          <div>
            <strong>Environment:</strong> {process.env.NODE_ENV}
          </div>
          <div>
            <strong>Error Message:</strong> {error || 'No error'}
          </div>
          <div className="mt-3 p-2 bg-black/20 rounded">
            <strong>Setup Instructions:</strong>
            <ol className="list-decimal list-inside mt-1 space-y-1 text-xs">
              <li>Get API key from OpenWeatherMap</li>
              <li>In Vercel dashboard, go to Settings → Environment Variables</li>
              <li>Add: NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_key_here</li>
              <li>Redeploy your application</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}