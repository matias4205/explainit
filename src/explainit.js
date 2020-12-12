import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'

import Frame from './components/Frame'
import Header from './components/Header'
import Launcher from './components/Launcher/Launcher'
import StackList from './components/StackList/StackList'
import Description from './components/Description/Description'
import Media from './components/Media/Media'
import { ThemeProvider } from './components/Theme'

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

  stack = stack.map((stackItem = '') => stackItem.toLowerCase())
  media = Object.keys(media)
    .filter((mediaKey) => Boolean(media[mediaKey]))
    .map((mediaKey) => ({ name: mediaKey, value: media[mediaKey] }))

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
                <Description description={description} />
                <Media media={media} />
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
