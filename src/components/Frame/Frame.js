import { h } from 'preact'
import { close } from '../../icons'

import s from './styles.module.css'

const Frame = ({
  header,
  content,
  handleToggle
}) => {
  return (
    <div id='explainit__frame' className={s.root}>
      <button
        id='explainit__close' className={s.header__close}
        dangerouslySetInnerHTML={{ __html: close }}
        onClick={handleToggle}
      />
      <div className={s.frame__inner}>
        {header}
        <div className={s.content}>
          <div className={s.content__inner}>
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Frame
