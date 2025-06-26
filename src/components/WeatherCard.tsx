type WeatherData = {
  name: string;
  weather: { description: string }[];
  main: { temp: number };
};

type Props = {
  data: WeatherData;
};

export default function WeatherCard({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center space-y-4">
      <h1 className="text-2xl font-bold">{data.name}</h1>
      <p className="text-lg capitalize">{data.weather[0].description}</p>
      <p className="text-4xl font-semibold">{Math.round(data.main.temp)}°C</p>
    </div>
  )
}
