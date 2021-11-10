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
/*estas dos funciones hacen lo mimso, serar la primera array (40 elementos), en una array con 5 arrays de 8 elemntos (40/8=5)
export function formatWeekList(rawData) {
    const weekList = []
    while (rawData.length > 0) {
        weekList.push(rawData.splice(0, 8))
    }

    return weekList
}*/

// La API como coje a partid del momento que del dia qu estas, las primeras 8 prediciones no tienen porque ser de hoy, las he separado por las de hoy, y luego de 8 en 8, me he cargado el array inicial
export function formatWeekList(rawData) {
    const weekList = []
    let dayList = []
    const toDay = new Date().getDay()


    rawData.forEach((item, index) => {
        let itemDay = new Date(item.dt * 1000).getDay()
        dayList.push(item)
        rawData.splice(index, 1)
        if (!(toDay === itemDay)) {
            weekList.push(dayList)
            while (rawData.length > index) {
                weekList.push(rawData.splice(0, 8))
            }
        }
    })
    weekList.splice(5, 1)
    return weekList
}


