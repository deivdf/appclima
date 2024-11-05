//se importa desde aca y no de types para aprovechar lo que dan zod o valibot
import { Weather } from "../hooks/useWeather"

type Props = {
    weather: Weather
}

export default function CardComponent({weather}:Props) {
  return (
    <div>
        <h2>Clima en:</h2>
        <p>{weather.name}</p>
        <p>{weather.main.temp}&deg;C</p>
        <p>Temperatura maxima: {weather.main.temp_max}&deg;C</p>
        <p>Temperatura minima: {weather.main.temp_min}&deg;C</p>
    </div>
  )
}
