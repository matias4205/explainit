// eslint-disable-next-line import/no-webpack-loader-syntax
import styles from './styles.module.css'

const strStyles = styles.toString()
const styleTag = document.createElement('style')

styleTag.innerHTML = strStyles

document.head.appendChild(styleTag)

export default {
  ...styles.locals
}
