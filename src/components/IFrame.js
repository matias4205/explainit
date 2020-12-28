import { h, render } from 'preact'
import { useEffect, useRef } from 'preact/hooks'

const IFrame = ({ children }) => {
  const iframe = useRef(null)

  useEffect(() => {
    if (iframe) {
      render(
        children,
        iframe.current.contentDocument.body
      )
    }
  }, [iframe])

  return (
    <iframe id='explainit__iframe' ref={iframe} />
  )
}

export default IFrame
