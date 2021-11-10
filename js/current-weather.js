// import weather from '../data/current-weather.js'
import {formatDate, formatTemp} from './Utils/format-data.js'
import {weatherConditionsCodes} from './constants.js'
import {getLatLon} from './geolocation.js'
import {getCurrentWeather} from './services/weather.js'


function setCurrentCity($el /*elemento = container, en este caso*/, city) {
    $el.textContent = city
}

function setCurrentDate($el) {
    const date = new Date()
    $el.textContent = formatDate(date)
}

function setCurrentTemp($el, temp) {
    $el.textContent = formatTemp(temp)
}

function solarStatus(sunriseTime, sunsetTime) {
    // const currentHours = new Date().getHours()
    const currentHours = new Date().getHours() + new Date().getMinutes() / 100
    // const sunsetHours = sunsetTime.getHours()
    const sunsetHours = sunsetTime.getHours() + sunsetTime.getMinutes() / 100
    // const sunriseHours = sunriseTime.getHours()
    const sunriseHours = sunriseTime.getHours() + sunriseTime.getMinutes() / 100

    if (currentHours > sunsetHours || currentHours < sunriseHours) {
        return 'night'
    }
    return 'morning'
}

function setBackground($el, conditionCode, solarStatus) {
    const weatherType = weatherConditionsCodes[conditionCode]
    const size = window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches ? '@2x' : ''

    $el.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`
}

function showCurrentWeather($app, $loader) {
    $app.hidden = false
    $loader.hidden = true
}

function configCurrentWeather(weather) {
    const $app = document.querySelector('#app')
    const $loading = document.querySelector('#loading')
    // loader
    showCurrentWeather($app, $loading)
    // date
    const $currentWeatherDate = document.querySelector('#current-weather-date')
    setCurrentDate($currentWeatherDate)
    // city
    // const $currentWeatherCity = document.querySelector('#current-weather-city')
    // $currentWeatherCity.textContent = weather.name
    // esto funcionaria, para que quede mas ordenado, porque se requeriran mas funciones aqui, creamos la setCurrentCity fuera y:
    const $currentWeatherCity = document.querySelector('#current-weather-city')
    const city = weather.name
    setCurrentCity($currentWeatherCity, city)
    // temp
    const $currentWeatherTemp = document.querySelector('#current-weather-temp')
    const temp = weather.main.temp
    setCurrentTemp($currentWeatherTemp, temp)
    // backgraund
    const sunriseTime = new Date(weather.sys.sunrise * 1000)
    const sunsetTime = new Date(weather.sys.sunset * 1000)
    const conditionCode = String(weather.weather[0].id).charAt()
    // weather[0] es porque te puede dar una array con varios climas si por emeplo lluve y hace viento, de esta forma solo cogemos la id del primero, y con el charAt(0), cogemos el primer digito
    setBackground($app, conditionCode, solarStatus(sunriseTime, sunsetTime))

}

export default async function currentWeather() {
    // Geo // API - weather // config

    const { lat, lon, isError } = await getLatLon()
    if (isError) return console.log('ha ocurrido error en la ubicación')
    // console.log(lat, lon)

    const { isError: currentWeatherError, data: weather } = await getCurrentWeather(lat, lon)
    // como el isError se llama igual que el isError anterior mejor bautizarlo
    // a rebautizar data como weather nos permite comentar los datos de prueba o comentar la linea anterior para ir viendo si las cosas si funciona
    if (currentWeatherError) return console.log('a ocurrido un error trayendo los datos del clima')

    configCurrentWeather(weather)
}
