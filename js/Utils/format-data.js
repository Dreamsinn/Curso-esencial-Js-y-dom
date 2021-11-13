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




