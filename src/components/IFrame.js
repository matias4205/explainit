import { h } from 'preact'
import { createPortal } from 'preact/compat'
import { useEffect, useRef } from 'preact/hooks'

const IFrame = ({ children, onLoad = () => {} }) => {
  const iframe = useRef(null)
  const containerEl = useRef(document.createElement('div'))

  useEffect(() => {
    iframe.current.contentDocument.body.appendChild(containerEl.current)
    iframe.current.onload = onLoad(iframe.current)
  }, [iframe])

  return (
    <iframe
      id='explainit__iframe' ref={iframe} style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        border: 'none',
        width: '100%'
      }}
      sandbox='allow-scripts allow-same-origin'
    >
      {createPortal(children, containerEl.current)}
    </iframe>
  )
}

export default IFrame
