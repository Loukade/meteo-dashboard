'use client'

import { useEffect, useState } from 'react'
import WeatherCard from '@/components/WeatherCard'
import { getWeatherByCoords } from '@/lib/fetchWeather'
import CitySearch from '@/components/CitySearch'

export default function Home() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const data = await getWeatherByCoords(latitude, longitude)
          setWeather(data)
        } catch (err) {
          console.log(err)
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

  return (
    <main className="min-h-screen w-full flex flex-col items-center p-8 gap-12 bg-gradient-to-br from-blue-200 via-sky-100 to-blue-400 dark:from-blue-900 dark:via-sky-900 dark:to-blue-800 transition-colors">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-900 dark:text-blue-100 drop-shadow-lg">🌤️ Dashboard météo géolocalisée</h1>

      {loading && <p className="mb-4 text-lg text-blue-800 dark:text-blue-200">Chargement météo...</p>}
      {error && <p className="mb-4 text-red-500 text-lg">{error}</p>}

      {weather && <WeatherCard data={weather} />}
      <CitySearch />

    </main>
  )
}
