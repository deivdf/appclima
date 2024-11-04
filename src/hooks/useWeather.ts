import axios from "axios"
import { SearchType, Weather } from "../types"

export default function useWeather() {
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
            
        }catch (error){
            alert(error)
        }
    }
    return{
        feachWeather
    }
}