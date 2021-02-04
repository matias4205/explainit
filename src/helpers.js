import { MOBILE_BREAKPOINT } from './config'

export const onIframeLoad = (iframe) => {
  const styleNodes = document.querySelectorAll('style[data-explainit-style="true"]')
  styleNodes.forEach((el) => {
    iframe.contentDocument.head.appendChild(el.cloneNode(true))
  })

  iframe.style.height = iframe.contentWindow.document.body.scrollHeight
  iframe.contentWindow.onmessage = (e) => {
    console.log(e.data)
  }
}

export const getWindowSize = (_window = window) => ({
  height: _window.innerHeight,
  width: _window.innerWidth
})

export const getWindowSizeInfo = () => {
  const size = getWindowSize()
  return {
    size,
    ...getWindowType(size)
  }
}

const getWindowType = (size) => ({
  isMobile: size.width <= MOBILE_BREAKPOINT,
  isDesktop: size.width > MOBILE_BREAKPOINT
})
