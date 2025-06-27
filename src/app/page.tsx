'use client'

import { useEffect, useState } from 'react'
import WeatherCard from '@/components/WeatherCard'
import ForecastList from '@/components/ForecastList'
import CitySearch from '@/components/CitySearch'
import { getWeatherByCoords, getForecastByCoords } from '@/lib/fetchWeather'
import WeatherStats from '@/components/WeatherStats'
import Footer from '@/components/Footer'

export default function Home() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const data = await getWeatherByCoords(latitude, longitude)
          const forecastData = await getForecastByCoords(latitude, longitude)
          setWeather(data)
          setForecast(forecastData)
        } catch {
          setError('Erreur lors du chargement de la météo')
        } finally {
          setLoading(false)
        }
      },
      () => {
        setError("Impossible d'accéder à la localisation")
        setLoading(false)
      }
    )
  }, [])

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-6"></div>
      <p className="text-xl text-blue-900 dark:text-blue-100 font-semibold">Chargement météo...</p>
    </div>
  );

  return (
    <main className="min-h-screen w-full flex flex-col items-center p-4 sm:p-8 gap-12 bg-gradient-to-br from-blue-200 via-sky-100 to-blue-400 dark:from-blue-900 dark:via-sky-900 dark:to-blue-800 transition-colors">
      {error && (
        <div className="w-full max-w-xl mx-auto flex items-center gap-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-200 rounded-xl px-4 py-3 mb-4 shadow">
          <span className="text-2xl">⚠️</span>
          <span className="font-semibold">{error}</span>
        </div>
      )}
      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-900 dark:text-blue-100 drop-shadow-lg">
        🌤️ Dashboard météo géolocalisée
      </h1>
      <a
        href="/graphs"
        className="inline-block mt-6 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:scale-105 transition text-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        aria-label="Voir les graphiques météo de la semaine"
      >
        📈 Voir les graphiques météo de la semaine
      </a>

      {weather && <WeatherCard data={weather} />}

      {forecast && (
        <section className="w-full max-w-5xl">
          <h2 className="text-2xl font-semibold text-blue-900 dark:text-blue-100 mb-4 text-center">📅 Prévisions à 5 jours</h2>
          <ForecastList data={forecast} />
        </section>
      )}

      {forecast && <WeatherStats data={forecast} />}

      <CitySearch />
      <Footer />
    </main>
  )
}
