const defaultConfig = {
    open: true,
    debug: true,
    animatable: true,
}


export default function draggable($el, config = defaultConfig) {
    if (!($el instanceof HTMLElement)) {
        return console.warn(`Elemento invalido, se esperava un HTMLElement y se redibió un ${$el}`)
    }
    let isOpen = config.open
    let isDragging = false
    const elementRect = $el.getBoundingClientRect()
    const ELEMENT_BLOCK_SIZE = elementRect.height

    const $marker = $el.querySelector('[data-marker]')
    const MARKER_BLOCK_SIZE = $marker.getBoundingClientRect().height


    const VISIBLE_Y_POSITION = 0
    const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARKER_BLOCK_SIZE
    let widgetPostion = VISIBLE_Y_POSITION
    isOpen ? open() : close()
    let startY = 0

    $marker.addEventListener('click', handleClick)
    $marker.addEventListener('pointerdown', handlePointerDown)
    $marker.addEventListener('pointerup', handlePointerUp)
    $marker.addEventListener('pointerout', handlePointerOut)
    $marker.addEventListener('pointercancel', handlePointerCancel)
    $marker.addEventListener('pointermove', handlePointerMove)

    if (config.animatable) {
        setAnimations()
    }

    function handlePointerUp() {
        logger('Pointer Up')
        dragEnd()
    }

    function handlePointerCancel() {
        logger('Pointer Cancel')
        dragEnd()
    }

    function handlePointerOut() {
        logger('Pointer Out')
        dragEnd()
    }

    function handlePointerDown(event) {
        logger('Pointer Down')
        startDrag(event)
    }

    function handleClick(event) {
        logger('click')
        toggle(event)
    }

    function handlePointerMove(event) {
        logger('Pointer Move')
        drag(event)

    }

    function pageY(event) {
        return event.pageY || event.thouches[0].pageY
    }

    function startDrag(event) {
        isDragging = true
        startY = pageY(event)
        logger({y})
    }

    function bounce() {
        if (widgetPostion < ELEMENT_BLOCK_SIZE / 2) {
            return open()
        }
        return close()
    }

    function dragEnd() {
        logger('DRAG END')
        isDragging = false
        bounce()
    }

    function setAnimations() {
        $el.style.transition = 'margin-bottom .3s'
    }

    function toggle() {
        if (!isDragging) {
            if (!isOpen) {
                return open()
            }
            return close()
        }
    }

    function logger(message) {
        if (config.debug) {
            console.warn(message)
        }
    }

    function open() {
        logger('abrir widget')
        isOpen = true
        widgetPostion = VISIBLE_Y_POSITION
        setWidgetPosition(widgetPostion)
    }

    function close() {
        logger('cerrar widget')
        isOpen = false
        widgetPostion = HIDDEN_Y_POSITION
        setWidgetPosition(widgetPostion)
    }

    function setWidgetPosition(value) {
        $el.style.marginBottom = `-${value}px`
    }

    function drag(event) {
        const cursorY = pageY(event)
        const movementY = cursorY - startY
        widgetPostion = widgetPostion + movementY
        startY = cursorY
        if (widgetPostion > HIDDEN_Y_POSITION) {
            return false
        }

        setWidgetPosition(widgetPostion)
    }
}