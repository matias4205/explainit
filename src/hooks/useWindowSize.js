import { useState, useEffect } from 'preact/hooks'
import { getWindowSizeInfo } from '../helpers'

export default () => {
  const [size, setSize] = useState(getWindowSizeInfo())

  useEffect(() => {
    window.onmessage = (e) => {
      console.log(e)
    }
  }, [])

  return size
}
