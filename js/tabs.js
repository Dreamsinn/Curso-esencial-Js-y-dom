const $tabContainer = document.querySelector('#tabs')
const $tabList = $tabContainer.querySelectorAll('.tab')

const today = new Date()
let weekday = today.getDay()

const week = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado'
]

function nextDay(day) {
    if (day === 6) {
        return 0
    }
    return day + 1
}

$tabList.forEach(($tab, index) => {
    $tab.addEventListener('click', handleSelectTabClic)
    if (index === 0) {
        $tab.textContent = 'Hoy'
        weekday = nextDay(weekday)
        return
    }
    $tab.textContent = week[weekday]
    weekday = nextDay(weekday)

})


function handleSelectTabClic(event) {
    const $tabSelected = event.target
    const $tabActive = document.querySelector('.tab[aria-selected="true"]')
    $tabActive.removeAttribute('aria-selected')
    $tabSelected.setAttribute('aria-selected', true)

    const id = $tabSelected.id
    const $tabPanel = document.querySelector(`[aria-labelledby=${id}]`)
    const $tabPanelSelected = document.querySelector(`.tabPanel:not([hidden])`)
    $tabPanel.hidden = false
    $tabPanelSelected.hidden = true


    const $templateId = id.charAt(4)
    const $templateSelected = document.querySelector(`#template-${$templateId}00`)
    const $templateActive = document.querySelector('.is-selected')

    $templateSelected.classList.add('is-selected')
    $templateActive.classList.remove('is-selected')
}