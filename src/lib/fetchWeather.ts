const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

export async function getWeatherByCoords(lat: number, lon: number) {

  console.log(API_KEY);
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`
  )

  if (!res.ok) throw new Error('Erreur API météo')
  return res.json()
}
