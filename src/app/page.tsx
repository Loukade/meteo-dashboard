'use client'

import { useEffect, useState } from 'react'
import WeatherCard from '@/components/WeatherCard'
import { getWeatherByCoords } from '@/lib/fetchWeather'

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
          console.log(err);
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

  if (loading) return <div className="text-center mt-10">Chargement météo...</div>
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      {weather && <WeatherCard data={weather} />}
    </main>
  )
}
