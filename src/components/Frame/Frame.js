import { h } from 'preact'

import IFrame from '../IFrame'

import { onIframeLoad } from '../../helpers'
import { close } from '../../icons'
import s from './styles.module.css'

const Frame = ({
  header,
  content,
  handleToggle
}) => {
  return (
    <IFrame
      onLoad={onIframeLoad}
      className={s.root}
    >
      <div id='explainit__frame'>
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
    </IFrame>
  )
}

export default Frame
