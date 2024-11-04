import axios from "axios"
import { SearchType } from "../types"
// import { z } from "zod"
import { number, object, string, InferOutput, parse, optional} from 'valibot'
import { useState } from "react"
// function isWeatherResponse(weather: unknown): weather is Weather {
//     return(
//         //tipar lo resultados devuelotos por la api y validar que sea un objeto con un boleano
//         //type guard o assertion
//         Boolean(weather) &&
//         typeof weather === 'object' &&
//         typeof(weather as Weather).name === 'string' &&
//         typeof(weather as Weather).main === 'number' &&
//         typeof(weather as Weather).main.temp_max === 'number' &&
//         typeof(weather as Weather).main.temp_min === 'number'
//         )
// }
//validacion de tipo con z de Zod
// const Weather = z.object({
//     name: z.string(),
//     main: z.object({
//         temp: z.number(),
//         temp_min: z.number(),
//         temp_max: z.number()
//     })
// })
// type Weather = z.infer<typeof Weather>
// validacion de tipo con valibot a travez de inferencia
const WeatherSchema = object({
    name: string(),
    main: object({
        name: optional(string()),
        temp: number(),
        temp_min: number(),
        temp_max: number()
    })
})
type Weather = InferOutput<typeof WeatherSchema>
export default function useWeather() {
    const [weather, setWeather] = useState<Weather>({
        name: '',
        main: {
            temp: 0,
            temp_min: 0,
            temp_max: 0
        }
    })
    const feachWeather = async (search: SearchType) =>{
        const apikey = import.meta.env.VITE_API_KEY
        try{
            const geoUrl= `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apikey}`
            const {data} = await axios(geoUrl)
            const lat = data[0].lat
            const lon = data[0].lon
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
            //catear el tyepe
            // const {data: weatherData} = await axios<Weather>(weatherUrl)
            // console.log(weatherData.main.temp)
            // console.log(weatherData.name)
            //type guard
            // const {data: weatherResult} = await axios<Weather>(weatherUrl)
            // const result = isWeatherResponse(weatherResult)
            // if(result){
            //     console.log(weatherResult.name)
            // }else{
            //     console.log('error respuesta mal formada')
            // }
            //con libreria zod
            // const {data: weatherResult} = await axios<Weather>(weatherUrl)
            // const result = Weather.safeParse(weatherResult)
            // if(result.success){
            //     setWeather(result.data)
            // }else{
            //     console.log('error respuesta mal formada')
            // }
            // tipado con valivolt
            const {data: weatherResult} = await axios<Weather>(weatherUrl)
            const result = parse(WeatherSchema, weatherResult);
            if(result){
                setWeather(result)
            }else{
                console.log('error respuesta mal formada')
            }
            
        }catch (error){
            alert(error)
        }
    }
    return{
        feachWeather
    }
}