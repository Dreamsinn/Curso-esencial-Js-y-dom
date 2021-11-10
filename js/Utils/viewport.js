export function setViewportSize($el) {
    const viewportBlockSize = getViewPort()
    $el.style.blockSize = `${viewportBlockSize}px`
}

export function getViewPort() {
    return window.innerHeight
}

export function onViewportResize(callback) {
    window.addEventListener('resize', callback)
}

export function offViewportResize(callback) {
    window.removeEventListener('resize', callback)
}

export function viewportSize($el) {
    setViewportSize($el)

    onViewportResize(() => setViewportSize($el))
}