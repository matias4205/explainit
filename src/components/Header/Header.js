import { h } from 'preact'
import { banners } from '../../config'
import { useTheme } from '../Theme'

import s from './styles.module.css'

const Header = ({
  title,
  shortDescription
}) => {
  const { primaryColor } = useTheme()

  return (
    <div
      className={s.root}
      style={`background: linear-gradient(to bottom, ${primaryColor[500]}, ${primaryColor[700]});`}
    >
      <div className={s.header__bg} style={banners.hideout} />
      <div className={s.header__content}>
        <h1 className={s.title}>
          {title}
        </h1>
        <p className={s.shortDescription}>
          {shortDescription}
        </p>
      </div>
    </div>
  )
}

export default Header
