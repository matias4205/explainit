import { h } from 'preact'
import { useEffect } from 'preact/hooks'

import { useTheme } from '../Theme'
import s from './styles.module.css'
import { angleDown, more } from '../../icons'
import useWindowSize from '../../hooks/useWindowSize'

const Launcher = ({
  isOpen = false,
  handleToggle
}) => {
  const { primaryColor } = useTheme()
  const { isMobile } = useWindowSize()

  useEffect(() => {
    window.addEventListener('message', () => {
      console.log('adsf')
    })
  }, [])

  return (
    <div
      id='explainit__launcher'
      style={`background-color: ${primaryColor[500]};`}
      className={`${s.explainit__launcher}${isMobile ? ` ${s['explainit__launcher--mobile']}` : ''}${isOpen ? ` ${s['explainit__launcher--open']}` : ''}`}
      onClick={handleToggle}
    >
      <span
        style={`display: inherit; color: ${primaryColor[900]}`}
        dangerouslySetInnerHTML={{ __html: isOpen ? (angleDown) : (more) }}
      />
    </div>
  )
}

export default Launcher
