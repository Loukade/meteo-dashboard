'use client'

import { useState } from 'react'
import { getWeatherByCity, getForecastByCity } from '@/lib/fetchWeather'
import WeatherCard from './WeatherCard'
import ForecastList from './ForecastList'
import WeatherStats from './WeatherStats'

export default function CitySearch() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!city.trim()) return

    setLoading(true)
    setError(null)
    setWeather(null)
    setForecast(null)

    try {
      const weatherData = await getWeatherByCity(city)
      const forecastData = await getForecastByCity(city)
      setWeather(weatherData)
      setForecast(forecastData)
    } catch {
      setError('Ville introuvable ou erreur serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-4 sm:p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">🔍 Rechercher une ville</h2>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Ex: Paris"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          Rechercher
        </button>
      </form>

      {loading && <p className="mt-4">Recherche en cours...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {weather && (
        <div className="mt-6 w-full flex justify-center">
          <WeatherCard data={weather} />
        </div>
      )}
      {forecast && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">📅 Prévisions à 5 jours</h3>
          <ForecastList data={forecast} />
        </div>
      )}

      {forecast && <div className="mt-6 w-full flex justify-center"><WeatherStats data={forecast} /></div>}
    </section>
  )
}
