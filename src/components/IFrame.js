import { h } from 'preact'
import { createPortal } from 'preact/compat'
import { useEffect, useRef } from 'preact/hooks'

const IFrame = ({ children, onLoad = () => {}, ...props }) => {
  const iframe = useRef(null)
  const containerEl = useRef(document.createElement('div'))

  useEffect(() => {
    iframe.current.contentDocument.head.insertAdjacentHTML(
      'afterbegin',
      '<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=no;" />'
    )
    containerEl.current.childNodes.forEach((n) => {
      iframe.current.contentDocument.body.appendChild(n)
    })
    iframe.current.onload = onLoad(iframe.current)
  }, [iframe])

  return (
    <iframe
      ref={iframe}
      style={{
        border: 'none'
      }}
      sandbox='allow-scripts allow-same-origin'
      {...props}
    >
      {createPortal(children, containerEl.current)}
    </iframe>
  )
}

export default IFrame
