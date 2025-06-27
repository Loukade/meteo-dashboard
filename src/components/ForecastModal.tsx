'use client'

import { format } from 'date-fns'
import fr from 'date-fns/locale/fr'

type ForecastModalProps = {
  items: any[]
  onClose: () => void
}

export default function ForecastModal({ items, onClose }: ForecastModalProps) {
  return (
    <div className="fixed inset-0 bg-blue-500 bg-opacity-25 flex justify-center items-start pt-20 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-2xl font-bold"
          aria-label="Fermer la modale"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900 dark:text-blue-100">
          Prévisions détaillées
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {items.map((forecast) => {
            const date = new Date((forecast.dt + new Date().getTimezoneOffset() * 60) * 1000)
            return (
              <div
                key={forecast.dt}
                className="bg-blue-100 dark:bg-blue-900 rounded-xl p-4 flex flex-col items-center text-center shadow"
              >
                <p className="font-semibold text-lg">{format(date, 'HH:mm', { locale: fr })}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                  alt={forecast.weather[0].description}
                  className="w-16 h-16"
                />
                <p className="capitalize">{forecast.weather[0].description}</p>
                <p className="mt-2 font-bold text-xl">{Math.round(forecast.main.temp)}°C</p>
                <p>Humidité: {forecast.main.humidity}%</p>
                <p>Vent: {Math.round(forecast.wind.speed*3.6)} km/h</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
