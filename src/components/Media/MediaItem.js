import { h } from 'preact'

import { facebook, github, linkedIn, twitter, website } from '../../icons'

import styles from './styles.module.css'

const mediaSvgs = {
  facebook,
  github,
  linkedIn,
  twitter,
  website
}

const MediaItem = ({
  name,
  value
}) => {
  return (
    <a
      class={styles.media__item}
      target='_blank'
      rel='noopener noreferrer'
      href={value}
      dangerouslySetInnerHTML={{ __html: mediaSvgs[name] }}
    />
  )
}

export default MediaItem
