# Geo-Localized Weather Dashboard

A modern weather dashboard built with Next.js that shows real-time weather and 5-day forecasts based on your geolocation or searched cities.

---

## Features

- Automatic geolocation-based weather display  
- Search weather by city name with live search  
- Detailed 3-hour interval forecast in a modal popup  
- Responsive and clean UI with light/dark mode support  
- Real-time weather icons and descriptions  
- Forecast list with date/time and temperature details  
- Smooth transitions and interactive components  

---

## Tech Stack

- Next.js 15 (app directory, React Server Components)  
- React hooks (`useState`, `useEffect`)  
- Tailwind CSS for styling  
- OpenWeatherMap API for weather and forecast data  

---

## Getting Started

### Prerequisites

- Node.js (v16 or newer recommended)  
- OpenWeatherMap API key (free to get at https://openweathermap.org/api)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Loukade/weather-dashboard.git
   cd weather-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env.local` file at the root and add your OpenWeatherMap API key:

   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
/app               # Next.js app directory
/components        # React components (WeatherCard, CitySearch, ForecastModal, etc.)
/lib               # API fetch helpers (fetchWeather.ts)
```

---

## Usage

- On load, the app requests geolocation permission and fetches current weather + 5-day forecast for your location.  
- You can search for any city with the search bar and get the same detailed weather + forecast data.  
- Click on any weather card to open a modal with 3-hour interval detailed forecasts.  
- Supports light and dark modes (toggle available).

---

## Future Improvements

- Add graphical charts for temperature, wind, and precipitation using chart libraries like `recharts` or `chart.js`.  
- Store favorite cities locally for quick access.  
- Push notifications for weather alerts (rain, storms, etc.).  
- Multi-language support (i18n).  
- Accessibility enhancements and keyboard navigation.

---

## License

MIT License © 2025 Loukade

---
