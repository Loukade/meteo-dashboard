const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

export async function getWeatherByCoords(lat: number, lon: number) {

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`
  )

  if (!res.ok) throw new Error('Erreur API météo')
  return res.json()
}

export async function getWeatherByCity(city: string) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
  )
  if (!res.ok) throw new Error('Ville introuvable')
  return res.json()
}

export async function getForecastByCoords(lat: number, lon: number) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
  )
  if (!res.ok) throw new Error('Erreur lors du chargement des prévisions')
  return res.json()
}

export async function getForecastByCity(city: string) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
  )
  if (!res.ok) throw new Error('Erreur lors du chargement des prévisions')
  return res.json()
}
