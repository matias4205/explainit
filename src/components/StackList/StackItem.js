import { h } from 'preact'
import { capitalize } from '../../utils'

import s from './styles.module.css'

const StackItem = ({ name, svg }) => (
  <li
    className={s.stack__item}
    title={capitalize(name)}
    dangerouslySetInnerHTML={{ __html: svg }}
  />
)

export default StackItem
