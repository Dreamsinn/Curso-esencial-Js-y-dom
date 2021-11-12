import {createDOM} from './Utils/dom.js'
import {formatDate, formatTemp} from "./Utils/format-data.js";

function periodTimeTemplate({temp, date, icon, description, id}, isSelected) {
    return `
         <li class="dayWeather-item ${isSelected}" id="template-${id}0" >
            <span class="dayWeather-time" id="template-${id}">${date}</span>
            <img class="dayWeather-icon" height="48" width="48" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" rain="" id="template-${id}">
            <span class="dayWeather-temp" id="template-${id}">${temp}</span>
        </li>
    `
}

function templateIsSelected(weather) {
    if (weather.dt === "") {
         return "is-selected"
    }
}

function nowInFirstHourDay(weather) {
    const dateOptions = {
        hour: 'numeric',
        hour12: true,
    }
    if (weather.dt === "") {
        return weather.dt = "Ahora"
    }
    return formatDate(new Date(weather.dt * 1000), dateOptions)
}

export function createPeriodTime(weather, index) {
    //temp
    //icon
    //date
    //descripcion clima
    //select primero
    const isSelected = templateIsSelected(weather)
    const temp = formatTemp(weather.main.temp)
    const date = nowInFirstHourDay(weather)
    const config = {
        temp,
        date,
        icon: weather.weather[0].icon,
        description: weather.weather[0].description,
        id: index
    }
    return createDOM(periodTimeTemplate(config, isSelected))
}

