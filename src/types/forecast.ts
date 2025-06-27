export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    humidity: number;
    temp_max?: number;
    temp_min?: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
} 