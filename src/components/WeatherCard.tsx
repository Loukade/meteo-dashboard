'use client'

type WeatherCardProps = {
  data: {
    name: string
    weather: { description: string; icon: string }[]
    main: { temp: number; temp_min: number; temp_max: number }
  }
}

export default function WeatherCard({ data }: WeatherCardProps) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`

  return (
    <section className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-4 md:p-10 flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-10 transition-colors hover:shadow-blue-500/40">
      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 flex-grow">
        <h2 className="text-4xl font-extrabold tracking-tight">{data.name}</h2>
        <p className="capitalize text-xl text-gray-600 dark:text-gray-300">{data.weather[0].description}</p>
        <div className="mt-6 text-gray-700 dark:text-gray-400 space-y-1 text-lg">
          <p>
            Température mini : <span className="font-semibold">{Math.round(data.main.temp_min)}°C</span>
          </p>
          <p>
            Température maxi : <span className="font-semibold">{Math.round(data.main.temp_max)}°C</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <img
          src={iconUrl}
          alt={data.weather[0].description}
          className="w-36 h-36 animate-fadeIn"
          loading="lazy"
        />
        <span className="mt-4 text-7xl font-extrabold">{Math.round(data.main.temp)}°C</span>
      </div>
    </section>
  )
}
