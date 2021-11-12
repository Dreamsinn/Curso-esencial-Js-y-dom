import {formatTemp, formatVelocity} from './Utils/format-data.js'


export function dailyWeather(weather) {
    tempData(weather)
    atmosphereData(weather)
}

export function tempData(weather) {
    const $actualTemplate = document.querySelector('.is-selected')
    const $actualTemplateId = $actualTemplate.id
    const $tabIndex = $actualTemplateId.charAt(9)
    const dayWeather = weather[Math.abs($tabIndex)]

    const maxTempMesure = document.querySelector('#mesure-0')
    maxTempMesure.textContent = `${formatTemp(maxTempDay(dayWeather))}`

    const minTempMesure = document.querySelector('#mesure-1')
    minTempMesure.textContent = `${formatTemp(minTempDay(dayWeather))}`
}

export function atmosphereData(weather) {
    const $actualTemplate = document.querySelector('.is-selected')
    const $actualTemplateId = $actualTemplate.id
    const $tabIndex = $actualTemplateId.charAt(9)
    const $templeIndex = $actualTemplateId.charAt(10)

    const actualTemplateWind = weather[$tabIndex][$templeIndex].wind.speed
    const actualTemplateHumidity = weather[$tabIndex][$templeIndex].main.humidity

    const windMesure = document.querySelector('#mesure-2')
    windMesure.textContent = formatVelocity(`${actualTemplateWind}`)


    const humidityMesure = document.querySelector('#mesure-3')
    humidityMesure.textContent = `${actualTemplateHumidity}%`
}

export function maxTempDay(weather) {
    let maxTemp = -200
    weather.forEach((index) => {
        if (index.main.temp_max > maxTemp) {
            maxTemp = index.main.temp_max
        }
    })
    return maxTemp
}

function minTempDay(weather) {
    let minTemp = 100
    weather.forEach((index) => {
        if (index.main.temp_min < minTemp) {
            minTemp = index.main.temp_min
        }
    })
    return minTemp
}
