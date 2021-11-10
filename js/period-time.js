import { createDOM } from './Utils/dom.js'



function periodTimeTemplate({ temp, date, icon, description }) {
    return `
        <li class="dayWeather-item is-selected">
            <span class="dayWeather-time">${date}</span>
            <img class="dayWeather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" >
            <span class="dayWeather-temp">${temp}°</span>
        </li>
    `
}

export function createPeriodTime(weather) {
    //temp
    //icon
    //date
    //descripcion clima
    debugger
    const config = {
        temp: weather.main.temp,
        date: weather.dt,
        icon: weather.weather.icon,
        description: weather.weather[0].description,
    }

    return createDOM(periodTimeTemplate(config))
}