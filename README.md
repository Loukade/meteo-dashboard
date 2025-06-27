# Geo-Localized Weather Dashboard

A modern weather dashboard built with Next.js that shows real-time weather and 5-day forecasts based on your geolocation or searched cities.

---

## Features

- Automatic geolocation-based weather display  
- Search weather by city name with live search  
- Detailed 3-hour interval forecast in a modal popup  
- Real-time weather icons and descriptions  
- Forecast list with date/time and temperature details  
- **Interactive weather charts** (temperature, humidity, wind) with beautiful tooltips and day labels  
- Smooth transitions and interactive components  
- Responsive, mobile-friendly design  
- Elegant loading spinner and error handling (non-blocking alert for geolocation errors)  
- Custom footer and improved navigation  
- Consistent date formatting and tooltips across all views  

---

## Tech Stack

- Next.js 15 (app directory, React Server Components)  
- React hooks (`useState`, `useEffect`)  
- Tailwind CSS for styling  
- OpenWeatherMap API for weather and forecast data  
- Recharts for interactive charts  

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
/components        # React components (WeatherCard, CitySearch, ForecastModal, WeatherStats, Footer, etc.)
/lib               # API fetch helpers (fetchWeather.ts)
```

---

## Usage

- On load, the app requests geolocation permission and fetches current weather + 5-day forecast for your location.  
- You can search for any city with the search bar and get the same detailed weather + forecast data.  
- Click on any weather card to open a modal with 3-hour interval detailed forecasts.  
- Click the "Voir les graphiques météo de la semaine" button to access interactive charts for temperature, humidity, and wind, with day labels and tooltips.  
- If geolocation fails, a non-blocking alert is shown but the rest of the dashboard remains usable.  

---

## User Experience & Accessibility

- Fully responsive and mobile-friendly layout  
- Accessible color contrasts and focus states  
- Keyboard navigation supported  
- Loading and error states are visually clear and non-intrusive  
- Footer with author credit and modern design  

---

## Future Improvements

- Store favorite cities locally for quick access.  
- Push notifications for weather alerts (rain, storms, etc.).  
- Multi-language support (i18n).  
- Accessibility enhancements and keyboard navigation.

---

## License

MIT License © 2025 Loukade

---
