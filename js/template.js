export default function WeeklyWeatherClickEvent($el) {
    $el.addEventListener('click', handleSelectTemplateClick)
}

function handleSelectTemplateClick(event) {
    const $panelSelected = event.target
    const id = $panelSelected.id

    const targetIsNotTab = !(id.substring(0, 3) === "tab")
    const targetIsTemplate = !isNaN(Math.abs(id.charAt(9)))

    if (targetIsNotTab && targetIsTemplate) {
        const idNumbers = id.substring(9, 11)

        const $templateSelected = document.querySelector(`#template-${idNumbers}0`)
        const $templateActive = document.querySelector('.is-selected')

        $templateSelected.classList.add('is-selected')
        $templateActive.classList.remove('is-selected')
    }
}
