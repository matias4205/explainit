import { h } from 'preact'
import { useTheme } from '../Theme'

import { angleDown, more } from '../../icons'

import s from './styles.module.css'

const Launcher = ({
  isOpen = false,
  handleToggle
}) => {
  const { primaryColor } = useTheme()

  return (
    <div
      id='explainit__launcher'
      className={`${s.explainit__launcher} ${isOpen ? ` ${s['explainit__launcher--open']}` : ''}`}
      style={`background-color: ${primaryColor[500]};`}
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
