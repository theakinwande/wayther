# Wayther - Modern Weather App

A beautiful, modern weather application built with Next.js, featuring a glassmorphism design, real-time weather data, and comprehensive weather information display.

## ✨ Features

- **Modern Glassmorphism Design**: Beautiful translucent cards with backdrop blur effects
- **Real-time Weather Data**: Powered by OpenWeatherMap API
- **Comprehensive Weather Information**:
  - Current temperature in Celsius
  - Feels-like temperature
  - Humidity levels
  - Wind speed in km/h
  - UV Index with proper capping
  - Visibility in kilometers
  - Precipitation likelihood
  - Hourly forecast
  - Weather alerts
- **Friendly Typography**: Uses Inter and Poppins fonts for a modern, approachable look
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Custom Scrollbars**: Beautiful gradient scrollbars for enhanced UX
- **Location Search**: Search weather by city name with autocomplete
- **Smooth Animations**: Hover effects and transitions throughout

## 🚀 Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom gradients
- **Fonts**: Inter & Poppins from Google Fonts
- **API**: OpenWeatherMap API
- **Icons**: Weather icons from OpenWeatherMap
- **Build Tool**: Turbopack for fast development

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wayther
```

2. Install dependencies:
```bash
npm install
```

3. Get your OpenWeatherMap API key:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your free API key

4. Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variable in Vercel dashboard:
   - **Key**: `NEXT_PUBLIC_OPENWEATHERMAP_API_KEY`
   - **Value**: Your OpenWeatherMap API key
4. Deploy!

**Important**: Make sure the environment variable name is exactly `NEXT_PUBLIC_OPENWEATHERMAP_API_KEY` (case-sensitive).

## 🎨 Design Highlights

### Glassmorphism Cards
- Semi-transparent backgrounds with backdrop blur
- Gradient borders and subtle shadows
- Hover effects with scale transformations

### Color Scheme
- **Temperature Cards**: Blue to purple gradients
- **Humidity**: Green to teal gradients  
- **Wind**: Orange to red gradients
- **UV Index**: Purple to pink gradients
- **Visibility**: Cyan to blue gradients
- **Precipitation**: Indigo to purple gradients

### Custom Features
- **Custom Scrollbars**: Gradient blue-to-purple scrollbars
- **Smooth Transitions**: 300ms transitions on all interactive elements
- **Responsive Grid**: Adaptive layout from 2 to 6 columns

## 📱 Responsive Layout

- **Mobile**: 2-column grid for weather stats
- **Tablet**: 3-column grid for weather stats  
- **Desktop**: 6-column grid showing all weather information

## 🔧 API Integration

The app integrates with OpenWeatherMap API and converts units appropriately:
- Temperature: Celsius (metric units)
- Wind Speed: km/h (converted from m/s)
- Visibility: Kilometers (converted from meters)

## 🌟 Future Enhancements

- [ ] Dark mode toggle
- [ ] Weather maps integration
- [ ] 7-day forecast
- [ ] Weather notifications
- [ ] Multiple location saving
- [ ] Historical weather data

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js and Tailwind CSS
