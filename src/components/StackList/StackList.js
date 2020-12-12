import { h } from 'preact'

import Card from '../Card'
import StackItem from './StackItem'

import stackIcons from '../../stackIcons'
import s from './styles.module.css'

const StackList = ({ stack = [] }) => (
  <Card title='Stack'>
    <ul className={s.stack}>
      {stack.map((stackItemName, index) => {
        const matchingStack = stackIcons[Object.keys(stackIcons).find((stackKey) => stackIcons[stackKey].test(stackItemName))]

        return (
          <StackItem key={index} {...matchingStack} />
        )
      })}
    </ul>
  </Card>
)

export default StackList
