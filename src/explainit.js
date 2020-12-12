import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'

import Frame from './components/Frame'
import Header from './components/Header'
import Card from './components/Card'
import Launcher from './components/Launcher/Launcher'

import { ThemeProvider } from './components/Theme'
import StackList from './components/StackList/StackList'

const Explainit = ({
  config: {
    title = '',
    shortDescription = '',
    description = '',
    stack = [],
    rootElm = document.body,
    media = {
      website: null,
      linkedIn: null,
      twitter: null,
      facebook: null,
      github: null
    }
  } = {}
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ThemeProvider>
      <div id='explainit' className='explainit'>
        {isOpen && (
          <Frame
            header={
              <Header title={title} shortDescription={shortDescription} />
            }
            content={
              <Fragment>
                <StackList stack={stack} />
              </Fragment>
            }
          />
        )}
        <Launcher isOpen={isOpen} handleToggle={() => setIsOpen(!isOpen)} />
      </div>
    </ThemeProvider>
  )
}

export default Explainit
