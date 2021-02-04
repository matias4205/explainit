import { h } from 'preact'
import { createPortal, forwardRef } from 'preact/compat'
import { useEffect, useRef } from 'preact/hooks'

import s from './styles.module.css'

const IFrame = forwardRef(({ children, isOpen = false, onLoad = () => {}, ...props }, ref) => {
  const containerEl = useRef(document.createElement('div'))

  useEffect(() => {
    ref.current.contentDocument.head.insertAdjacentHTML(
      'afterbegin',
      '<meta name="viewport" content="width=device-width, initial-scale=1">'
    )
    containerEl.current.childNodes.forEach((n) => {
      ref.current.contentDocument.body.appendChild(n)
    })
    ref.current.contentWindow.onload = () => onLoad(ref.current)
  }, [ref])

  return (
    <iframe
      ref={ref}
      className={`${s.root} ${isOpen ? s.isOpen : ''}`}
      sandbox='allow-scripts allow-same-origin'
      {...props}
    >
      {createPortal(children, containerEl.current)}
    </iframe>
  )
})

export default IFrame
