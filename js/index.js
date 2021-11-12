import currentWeather from './current-weather.js'
import weeklyWeather from './weekly-weather.js'
import {viewportSize} from './Utils/viewport.js'
import './tabs.js'
// import "./template.js";





const $app = document.querySelector('#app')
const $loading = document.querySelector('#loading')
viewportSize($app)
viewportSize($loading)

weeklyWeather()
currentWeather()

