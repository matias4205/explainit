import { h } from 'preact'

import s from './styles.module.css'

const Card = ({ children, title }) => {
  return (
    <div class={s.card}>
      {title && (
        <div class={s.card__head}>
          <h2>{title}</h2>
        </div>
      )}
      <div class={s.card__content}>
        {children}
      </div>
    </div>
  )
}

export default Card
