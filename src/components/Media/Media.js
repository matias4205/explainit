import { h } from 'preact'

import Card from '../Card'
import MediaItem from './MediaItem'

import styles from './styles.module.css'

const Media = ({
  media = []
}) => {
  return (
    <Card>
      <ul class={styles.media}>
        {media.map((item, index) => (
          <MediaItem {...item} key={index} />
        ))}
      </ul>
    </Card>
  )
}

export default Media
