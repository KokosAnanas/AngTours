export interface IWeatherResponse {
  current: IWeatherCurrent,
  hourly: IWeatherHourly
}

export type WeatherCurrentValue = 0 | 1;

export interface IWeatherCurrent {
  is_day: WeatherCurrentValue;
  rain: WeatherCurrentValue;
  snowfall: WeatherCurrentValue;
}

export interface IWeatherHourly {
  temperature_2m: number[];
}

export interface IWeatherData {
  isDay: WeatherCurrentValue,
  snowfall: WeatherCurrentValue,
  rain: WeatherCurrentValue,
  currentWeather: number
}
