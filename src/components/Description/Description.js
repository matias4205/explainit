import { h } from 'preact'

import Card from '../Card'

import styles from './styles.module.css'

const Description = ({
  description = ''
}) => {
  return (
    <Card title='Descripcion'>
      <article
        class={styles.description}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </Card>
  )
}

export default Description
