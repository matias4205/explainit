import { h, render } from 'preact'

import { banners, themes } from './config'
import ExplainIt from './ExplainIt'

const renderWidget = ({
  rootElm = null,
  ...config
}) => (
  render(
    <ExplainIt config={config} />,
    rootElm || document.body
  )
)

export {
  ExplainIt, renderWidget,
  banners,
  themes
}
export default {
  renderWidget,
  banners,
  themes
}
