import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'

import Frame from './components/Frame'
import Header from './components/Header'
import Launcher from './components/Launcher/Launcher'
import StackList from './components/StackList/StackList'
import Description from './components/Description/Description'
import Media from './components/Media/Media'
import { ThemeProvider } from './components/Theme'
import IFrame from './components/IFrame'

import { configCheck } from './utils'
import { onIframeLoad } from './helpers'

import './styles.global.css'

const Explainit = ({
  config = {}
}) => {
  const [isOpen, setIsOpen] = useState(false)
  let {
    title = '',
    shortDescription = '',
    description = '',
    stack = [],
    media = {
      website: null,
      linkedIn: null,
      twitter: null,
      facebook: null,
      github: null
    }
  } = config

  configCheck(config)

  stack = stack.map((stackItem = '') => stackItem.toLowerCase())
  media = Object.keys(media)
    .filter((mediaKey) => Boolean(media[mediaKey]))
    .map((mediaKey) => ({ name: mediaKey, value: media[mediaKey] }))

  return (
    <div id='explainit' className='explainit'>
      <IFrame
        onLoad={onIframeLoad}
      >
        <ThemeProvider>
          {isOpen && (
            <Frame
              handleToggle={() => setIsOpen(!isOpen)}
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
        </ThemeProvider>
      </IFrame>
    </div>
  )
}

export default Explainit
