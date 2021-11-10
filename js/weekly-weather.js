import { getWeeklyWeather } from './services/weather.js'
import { getLatLon } from './geolocation.js'
import { formatWeekList } from './Utils/format-data.js'
import { createDOM } from './Utils/dom.js'
import { createPeriodTime } from './period-time.js'



function tabPanelTemplate(id) {
    return `
        <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
            <div class="dayWeather" id="dayWeather-${id}">
                <ul class="dayWeather-list" id="dayWeather-list-${id}">
                    
                </ul>
            </div>
        </div>
    `
}

function createTabPanel(id) {
    const $panel = createDOM(tabPanelTemplate(id))
    if (id > 0) {
        $panel.hidden = true
    }
    return $panel
}

function configWeeklyWeather(weekList) {
    // const $container = document.querySelector('.weeklyWeather')
    const $container = document.querySelector('.weeklyWeather')

    weekList.forEach((day, index) => {
        const $panel = createTabPanel(index)
        $container.append($panel)
        debugger
        day.forEach((weather, idnexWheather) => {
            $panel.querySelector('.dayWeather-list').append(createPeriodTime(weather))

        })
    })
}

export default async function weeklyWeather() {
    const { lat, lon, isError } = await getLatLon()
    if (isError) return console.log('ha ocurrido error en la ubicación')

    const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(lat, lon)
    if (weeklyWeatherError) return console.log('a ocurrido un error trayendo el pronostico del clima')

    const weekList = formatWeekList(weather.list)

    configWeeklyWeather(weekList)
}