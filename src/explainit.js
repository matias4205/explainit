/* eslint-disable import/no-webpack-loader-syntax */
import styles from './loadStyles'
import stackIcons from './stackIcons'

import { capitalize } from './utils'
import { angleDown, more, facebook, website, linkedIn, twitter, close, github } from './icons'

const mediaSVGs = { facebook, website, linkedIn, twitter, github }

class ExplainIt {
  _configCheck = (config) => {
    if (!config.title) throw new Error('You must provide a title')
    if (config.shortDescription.length > 150) console.warn('Your short description should have a maximum length of 150!')
  }

  _normalizeStackNames = (stack) =>
    stack.map((stackItem = '') => stackItem.toLowerCase());

  _getStackHTML = (name) => {
    const wrapIntoUl = (svg) => `<li class="${styles.stack__item}" title="${capitalize(name)}">${svg}</li>`
    const matchingStack = stackIcons[Object.keys(stackIcons).find((stackKey) => stackIcons[stackKey].test(name))]

    if (!matchingStack) return null

    return wrapIntoUl(matchingStack.svg)
  };

  _getMediaHTML = (mediaKey, value) => {
    const wrapIntoAnchor = (svg) =>
      `<a class="${styles.media__item}" target="_blank" href="${value}">${svg}</a>`

    return wrapIntoAnchor(mediaSVGs[mediaKey])
  };

  _renderStack = (stack = []) =>
    this._normalizeStackNames(stack).reduce(
      (prev, stackItem) => prev + (this._getStackHTML(stackItem) || ''),
      ''
    )

  _renderMedia = (media) =>
    Object.keys(media)
      .filter((mediaKey) => Boolean(media[mediaKey]))
      .reduce(
        (prev, mediaKey) => prev + this._getMediaHTML(mediaKey, media[mediaKey]),
        ''
      )

  _hasMedia = (media = {}) =>
    Object.keys(media).some((mediaKey) => media[mediaKey])

  _renderStackCard = (stack) => (
    stack.length > 0 ? (
      `<div class="${styles.card}">
        <div class="${styles.card__head}">
          <h2>Stack</h2>
        </div>
        <div class="${styles.card__content}">
          <ul class="${styles.stack}">
            ${this._renderStack(stack)}
          </ul>
        </div>
      </div>`
    ) : ''
  )

  _renderDescriptionCard = (description) => (
    description.length > 0 ? (
      `<div class="${styles.card}">
        <div class="${styles.card__head}">
          <h2>Description</h2>
        </div>
        <div class="${styles.card__content}">
          <article class="${styles.description}">
            ${description}
          </article>
        </div>
      </div>`
    ) : ''
  )

  _renderMediaCard = (media) => (
    this._hasMedia(media) ? (
      `<div class="${styles.card}">
        <div class="${styles.card__content}">
          <ul class="${styles.media}">
            ${this._renderMedia(media)}
          </ul>
        </div>
      </div>`
    ) : ''
  )

  _renderShortDescription = (shortDescription) => (
    shortDescription.length > 0 ? (
      `<p class="${styles.shortDescription}">
          ${shortDescription}
        </p>`
    ) : ''
  )

  getWidgetHTML = ({ title, shortDescription, description, stack, media }) => `
    <div id="explainit" class="explainit">
      <div id="explainit__frame" class="explainit__frame${this.isOpen ? ' explainit__frame--opened' : ''}">
        <button id="explainit__close" class="${styles.header__close}">
          ${close}
        </button>
        <div class="${styles.frame__inner}">
          <div class="${styles.header}">
            <div class="${styles.header__bg}"></div>
            <div class="${styles.header__content}">
              <h1 class="${styles.title}">${title}</h1>
              ${this._renderShortDescription(shortDescription)}
            </div>
          </div>
          <div class="${styles.content}">
            <div class="${styles.content__inner}">
              ${this._renderStackCard(stack)}
              ${this._renderDescriptionCard(description)}
              ${this._renderMediaCard(media)}
            </div>
          </div>
        </div>
      </div>
      <div id="explainit__launcher" class="explainit__launcher ${this.isOpen ? ' explainit__launcher--open' : ''}">
        ${this.isOpen ? (angleDown) : (more)}
      </div>
    </div>
  `;

  constructor ({
    title = '',
    shortDescription = '',
    description = '',
    stack = [],
    rootElm = null,
    media = {
      website: null,
      linkedIn: null,
      twitter: null,
      facebook: null,
      github: null
    }
  } = {}) {
    this._configCheck({
      title,
      shortDescription,
      description,
      stack,
      rootElm,
      media
    })

    this.title = title
    this.shortDescription = shortDescription
    this.description = description
    this.stack = stack
    this.rootElm = rootElm || document.body
    this.media = {
      website: media.website,
      linkedIn: media.linkedIn,
      twitter: media.twitter,
      facebook: media.facebook,
      github: media.github
    }

    this.isOpen = false

    this._initWidget()
  }

  _render () {
    this._removePreviousNode()
    this._initWidget()
  };

  _removePreviousNode () {
    // eslint-disable-next-line no-unused-expressions
    document.getElementById('explainit')?.remove()
  }

  _initWidget () {
    this.rootElm.insertAdjacentHTML(
      'beforeend',
      this.getWidgetHTML({
        title: this.title,
        shortDescription: this.shortDescription,
        description: this.description,
        stack: this.stack,
        media: {
          website: this.media.website,
          linkedIn: this.media.linkedIn,
          twitter: this.media.twitter,
          facebook: this.media.facebook,
          github: this.media.github
        }
      })
    )

    const launcher = document.getElementById('explainit__launcher')
    const mobileClose = document.getElementById('explainit__close')
    // const content = document.getElementById("explainit__frame");

    launcher.addEventListener('click', () => {
      this.toggle()
    })

    mobileClose.addEventListener('click', () => {
      this.close()
    })
  }

  close () {
    this.isOpen = false
    this._render()
  }

  open () {
    this.isOpen = true
    this._render()
  }

  toggle () {
    this.isOpen ? this.close() : this.open()
  }
}

export default ExplainIt
