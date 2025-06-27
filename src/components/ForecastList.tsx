'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import ForecastModal from './ForecastModal'

export default function ForecastList({ data }: { data: any }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedItems, setSelectedItems] = useState<any[] | null>(null)

  // Regrouper les données par jour
  const groupedByDate: { [key: string]: any[] } = {}

  data.list.forEach((item: any) => {
    const date = item.dt_txt.split(' ')[0]
    if (!groupedByDate[date]) groupedByDate[date] = []
    groupedByDate[date].push(item)
  })

  const handleOpenModal = (date: string, items: any[]) => {
    setSelectedDate(date)
    setSelectedItems(items)
  }

  const handleCloseModal = () => {
    setSelectedDate(null)
    setSelectedItems(null)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 w-full">
      {Object.entries(groupedByDate)
  .filter(([date]) => date !== new Date().toISOString().split('T')[0]) // filtre aujourd'hui
  .map(([date, items]) => {
    const maxTemp = Math.max(...items.map(i => i.main.temp_max));
    const maxTempItem = items.find(i => i.main.temp_max === maxTemp) || items[0];
    return (
      <button
        key={date}
        onClick={() => handleOpenModal(date, items)}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-6 text-left"
      >
        <p className="text-xl font-bold text-blue-800 dark:text-blue-100">
        {format(new Date(date + "T00:00:00Z"), "EEEE d MMM", { locale: fr })}
        </p>
        <div className="flex items-center justify-between mt-4">
          <img
            src={`https://openweathermap.org/img/wn/${maxTempItem.weather[0].icon}@2x.png`}
            alt={maxTempItem.weather[0].description}
            className="w-14 h-14"
          />
          <div className="text-right">
            <p className="text-sm capitalize text-gray-600 dark:text-gray-300">
              {maxTempItem.weather[0].description}
            </p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {Math.round(maxTemp)}°C
            </p>
          </div>
        </div>
      </button>
    )
  })}

      {selectedDate && selectedItems && (
        <ForecastModal
          date={selectedDate}
          items={selectedItems}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
