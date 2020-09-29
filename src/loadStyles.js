import styles from './styles.css'

const strStyles = styles.toString()
const styleTag = document.createElement('style')

styleTag.innerHTML = strStyles

document.head.appendChild(styleTag)
