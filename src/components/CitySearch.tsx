import { useState } from 'react'
import { getWeatherByCity } from '@/lib/fetchWeather'
import WeatherCard from './WeatherCard'

export default function CitySearch() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!city.trim()) return

    setLoading(true)
    setError(null)
    try {
      const data = await getWeatherByCity(city)
      setWeather(data)
    } catch (err) {
      setError('Ville introuvable ou erreur serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">🔍 Rechercher une ville</h2>

      <form onSubmit={handleSearch} className="flex gap-4">
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
        <div className="mt-6">
          <WeatherCard data={weather} />
        </div>
      )}
    </section>
  )
}