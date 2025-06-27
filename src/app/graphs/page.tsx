'use client'

import { useEffect, useState } from 'react'
import { getForecastByCoords } from '@/lib/fetchWeather'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import Link from 'next/link'
import { ForecastItem } from '@/types/forecast'
import Footer from '@/components/Footer'

type ChartData = {
  date: string
  temperature: number
  humidity: number
  wind: number
}

export default function Graphs() {
  const [data, setData] = useState<ChartData[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState<string | null>(null)

  useEffect(() => {
    document.body.classList.add('bg-gradient-to-br', 'from-blue-200', 'via-sky-100', 'to-blue-400', 'dark:from-blue-900', 'dark:via-sky-900', 'dark:to-blue-800', 'transition-colors');
    return () => {
      document.body.classList.remove('bg-gradient-to-br', 'from-blue-200', 'via-sky-100', 'to-blue-400', 'dark:from-blue-900', 'dark:via-sky-900', 'dark:to-blue-800', 'transition-colors');
    };
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const forecast = await getForecastByCoords(pos.coords.latitude, pos.coords.longitude)
          setCity(forecast.city?.name || null)
          // Préparer données pour les graphiques
          const chartData = forecast.list.map((item: ForecastItem) => {
            // Utilise dt_txt si disponible (heure locale fournie par l'API)
            const dateStr = item.dt_txt ? item.dt_txt : new Date((item.dt + forecast.city.timezone) * 1000).toISOString().replace('T', ' ').slice(0, 16);
            return {
              date: dateStr,
              temperature: item.main.temp,
              humidity: item.main.humidity,
              wind: +(item.wind.speed * 3.6).toFixed(2),
            };
          })
          setData(chartData)
        } catch {
          setError('Erreur lors du chargement des données météo')
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
      <p className="text-xl text-blue-900 dark:text-blue-100 font-semibold">Chargement des graphiques météo...</p>
    </div>
  );
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <span className="text-5xl mb-4 text-red-500">⚠️</span>
        <p className="text-2xl font-bold text-red-600 mb-4 text-center">{error}</p>
        <Link
          href="/"
          className="mt-2 px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );

  // Génère dayTicks : date exacte du premier point de chaque jour (clé yyyy-mm-dd)
  const dayTicks: string[] = [];
  const seenDays = new Set<string>();
  data.forEach(d => {
    const dateObj = new Date(d.date);
    const dayKey = dateObj.toISOString().slice(0, 10); // yyyy-mm-dd
    if (!seenDays.has(dayKey)) {
      seenDays.add(dayKey);
      dayTicks.push(d.date);
    }

    console.log(dayTicks);
  });

  // Récupère toutes les dates de minuit présentes dans les données (même logique que le tooltip)
  const midnightTicks = data
    .map(d => d.date)
    .filter(dateStr => {
      const date = new Date(dateStr);
      return date.getHours() === 0 && date.getMinutes() === 0;
    });

  const dayTickFormatter = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });
  };

  // Typage du CustomTooltip
  type TooltipPayload = { name: string; value: number; color: string };
  type TooltipProps = {
    active?: boolean;
    payload?: TooltipPayload[];
    label?: string;
  };

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (!active || !payload || !payload.length || !label) return null;
    const date = new Date(label);
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-sm">
        <div className="font-bold mb-2">
          {date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} à {date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false })}
        </div>
        {payload.map((entry, idx) => (
          <div key={idx} className="mb-1" style={{ color: entry.color }}>
            {entry.name} : <span className="font-semibold">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center p-8 gap-12 max-w-6xl mx-auto relative">
      <div className="w-full flex justify-end mb-8">
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:scale-105 transition text-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          aria-label="Retour à l&apos;accueil"
        >
          Accueil
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        📈 <span className="font-extrabold">Graphiques météo semaine</span>
        {city && <span className="text-blue-600 font-extrabold "> ({city})</span>}
      </h1>

      <div className="w-full max-w-4xl mx-auto overflow-x-auto mb-10">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 40, bottom: 30, left: 0, right: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                ticks={midnightTicks}
                tickFormatter={dayTickFormatter}
                height={40}
                tick={{ fontSize: 13, fontWeight: 'bold' }}
              />
              <YAxis unit="°C" tick={{ fontSize: 12, fontWeight: 'bold' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" align="center" wrapperStyle={{ marginBottom: 16, fontWeight: 'bold' }} />
              <Line type="monotone" dataKey="temperature" stroke="#ef4444" name="Température (°C)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto overflow-x-auto mb-10">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 40, bottom: 30, left: 0, right: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                ticks={midnightTicks}
                tickFormatter={dayTickFormatter}
                height={40}
                tick={{ fontSize: 13, fontWeight: 'bold' }}
              />
              <YAxis unit="%" tick={{ fontSize: 12, fontWeight: 'bold' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" align="center" wrapperStyle={{ marginBottom: 16, fontWeight: 'bold' }} />
              <Line type="monotone" dataKey="humidity" stroke="#3b82f6" name="Humidité (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto overflow-x-auto mb-10">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 40, bottom: 30, left: 0, right: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                ticks={midnightTicks}
                tickFormatter={dayTickFormatter}
                height={40}
                tick={{ fontSize: 13, fontWeight: 'bold' }}
              />
              <YAxis unit="km/h" tick={{ fontSize: 12, fontWeight: 'bold' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" align="center" wrapperStyle={{ marginBottom: 16, fontWeight: 'bold' }} />
              <Line type="monotone" dataKey="wind" stroke="#10b981" name="Vent (km/h)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <Footer />
    </main>
  )
}
