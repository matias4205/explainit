import { h } from 'preact'

import { useTheme } from '../Theme'
import IFrame from '../IFrame'

import { onIframeLoad } from '../../helpers'
import s from './styles.module.css'
import { angleDown, more } from '../../icons'

const Launcher = ({
  isOpen = false,
  handleToggle
}) => {
  const { primaryColor } = useTheme()

  return (
    <div
      id='explainit__launcher'
      style={`background-color: ${primaryColor[500]};`}
      className={`${s.explainit__launcher} ${isOpen ? ` ${s['explainit__launcher--open']}` : ''}`}
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
