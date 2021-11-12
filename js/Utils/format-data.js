const defaultDateOptions = {
    day: 'numeric',
    weekday: 'long',
    month: 'long',
}

export function formatDate(date, options = defaultDateOptions) {
    return new Intl.DateTimeFormat('es', options).format(date)
}

export function formatTemp(value) {
    return `${Math.floor(value)}°`
}

export function formatVelocity(value) {
    return `${(value * 3600 / 1000).toFixed(1)}Km/h`
}

export function formatWeekList(rawData) {
    let weekList = []
    let dayList = []
    let lastDay = rawData[0].dt_txt.substring(0, 10)

    rawData.forEach((item) => {
        if (item.dt_txt.substring(0, 10) === lastDay) {
            dayList.push(item)
            return
        }
        weekList.push(dayList)
        dayList = []
        lastDay = item.dt_txt.substring(0, 10)
        dayList.push(item)
    })
    weekList.push(dayList)

    weekList.splice(5, 1)
    selectFirstHourDay(weekList)
    return weekList
}

function selectFirstHourDay(weekList) {
    weekList.map((item) => {
        item.map((weather) => {
            if (weather === weekList[0][0]) {
                weather.dt = ""
            }
        })
    })
    return weekList
}

// La API como coje a partid del momento que del dia qu estas, las primeras 8 prediciones no tienen porque ser de hoy, las he separado por las de hoy, y luego de 8 en 8, me he cargado el array inicial

/*export function formatWeekList(rawData) {
    let dayList = []
    const weekList = []
    rawData.forEach((item, index) => {
        dayList.push(item)
        if ((index + 1) % 8 === 0) {
            weekList.push(dayList)
            dayList = []
        }
    })
    return weekList
}*/
/*estas dos funciones hacen lo mimso, serar la primera array (40 elementos), en una array con 5 arrays de 8 elemntos (40/8=5), aunque la segunda deja a rawdata vacio
export function formatWeekList(rawData) {
    const weekList = []
    while (rawData.length > 0) {
        weekList.push(rawData.splice(0, 8))
    }

    return weekList
}*/


