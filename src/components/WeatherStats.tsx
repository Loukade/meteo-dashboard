'use client'

import React from 'react'
import { ForecastItem } from '@/types/forecast'

type WeatherStatsProps = {
  data: {
    list: ForecastItem[]
  }
}

export function formatDateJour(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export function formatDateHeure(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export default function WeatherStats({ data }: WeatherStatsProps) {
  // Regroupement des données par jour (format yyyy-mm-dd)
  const groupedByDay = data.list.reduce<Record<string, ForecastItem[]>>(
    (acc, item) => {
      const day = item.dt_txt.split(' ')[0]
      if (!acc[day]) acc[day] = []
      acc[day].push(item)
      return acc
    },
    {}
  )

  // Calcul des stats
  const statsByDay = Object.entries(groupedByDay).map(([day, items]) => {
    const tempsMax = Math.max(...items.map((i) => i.main.temp_max ?? i.main.temp))
    const tempsMin = Math.min(...items.map((i) => i.main.temp_min ?? i.main.temp))
    const humidMax = Math.max(...items.map((i) => i.main.humidity))
    const humidMin = Math.min(...items.map((i) => i.main.humidity))
    const ventMaxItem = items.reduce((prev, curr) =>
      curr.wind.speed > prev.wind.speed ? curr : prev
    )
    const ventMinItem = items.reduce((prev, curr) =>
      curr.wind.speed < prev.wind.speed ? curr : prev
    )

    return {
      day,
      tempsMax,
      tempsMin,
      humidMax,
      humidMin,
      ventMaxItem,
      ventMinItem,
    }
  })

  const jourLePlusChaud = statsByDay.reduce((prev, curr) =>
    curr.tempsMax > prev.tempsMax ? curr : prev
  )
  const jourLePlusHumide = statsByDay.reduce((prev, curr) =>
    curr.humidMax > prev.humidMax ? curr : prev
  )
  const jourLeMoinsChaud = statsByDay.reduce((prev, curr) =>
    curr.tempsMin < prev.tempsMin ? curr : prev
  )
  const jourLeMoinsHumide = statsByDay.reduce((prev, curr) =>
    curr.humidMin < prev.humidMin ? curr : prev
  )

  return (
    <section className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-4 sm:p-8 space-y-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-900 dark:text-blue-100">
        📊 Résumé des statistiques météo (5 jours)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-red-100 dark:bg-red-800 rounded-xl p-4">
          <h3 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">
            🔥 Journée la plus chaude
          </h3>
          <p>
            {formatDateJour(jourLePlusChaud.day)} avec une température maximale de{' '}
            <strong>{Math.round(jourLePlusChaud.tempsMax)}°C</strong>
          </p>
        </div>

        <div className="bg-blue-100 dark:bg-blue-800 rounded-xl p-4">
          <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">
            💧 Journée la plus humide
          </h3>
          <p>
            {formatDateJour(jourLePlusHumide.day)} avec un taux d&apos;humidité maximal de{' '}
            <strong>{jourLePlusHumide.humidMax}%</strong>
          </p>
        </div>

        <div className="bg-yellow-100 dark:bg-yellow-800 rounded-xl p-4">
          <h3 className="text-xl font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
            ❄️ Journée la plus fraîche
          </h3>
          <p>
            {formatDateJour(jourLeMoinsChaud.day)} avec une température minimale de{' '}
            <strong>{Math.round(jourLeMoinsChaud.tempsMin)}°C</strong>
          </p>
        </div>

        <div className="bg-green-100 dark:bg-green-800 rounded-xl p-4">
          <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">
            🌿 Journée la moins humide
          </h3>
          <p>
            {formatDateJour(jourLeMoinsHumide.day)} avec un taux d&apos;humidité minimal de{' '}
            <strong>{jourLeMoinsHumide.humidMin}%</strong>
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-center text-blue-900 dark:text-blue-100 mb-4">
          💨 Détails du vent
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-100 dark:bg-purple-800 rounded-xl p-4">
            <h4 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2">
              Vent le plus fort
            </h4>
            <p>
              {formatDateJour(jourLePlusChaud.day)} à{' '}
              <strong>{formatDateHeure(jourLePlusChaud.ventMaxItem.dt_txt)}</strong> —{' '}
              <strong>{Math.round(jourLePlusChaud.ventMaxItem.wind.speed * 3.6)} km/h</strong>
            </p>
          </div>

          <div className="bg-indigo-100 dark:bg-indigo-800 rounded-xl p-4">
            <h4 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
              Vent le plus faible
            </h4>
            <p>
              {formatDateJour(jourLeMoinsChaud.day)} à{' '}
              <strong>{formatDateHeure(jourLeMoinsChaud.ventMinItem.dt_txt)}</strong> —{' '}
              <strong>{Math.round(jourLeMoinsChaud.ventMinItem.wind.speed * 3.6)} km/h</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
