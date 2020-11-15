/* eslint-disable import/no-webpack-loader-syntax */
import styles from './loadStyles'
import stackIcons from './stackIcons'
import { themes, banners } from './config'

import { capitalize, lightenDarkenColor, renderStringArray } from './utils'
import { angleDown, more, facebook, website, linkedIn, twitter, close, github, check } from './icons'

const mediaSVGs = { facebook, website, linkedIn, twitter, github }

class ExplainIt {
  _buildTheme = ({ primaryColor }) => ({
    primaryColor: {
      100: lightenDarkenColor(primaryColor, 40),
      300: lightenDarkenColor(primaryColor, 20),
      500: lightenDarkenColor(primaryColor, 0),
      700: lightenDarkenColor(primaryColor, -20),
      900: lightenDarkenColor(primaryColor, -60)
    }
  })

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

  _renderThemePicker = (themes, primaryColor) => {
    const themePickerList = renderStringArray(themes.map(([title, value]) => {
      return (
        `<li class="${styles.themePicker__item}">
          <button
            style="background: ${value};"
            class="${styles.swatch} ${primaryColor['500'] === value ? styles['swatch--active'] : ''}"
            title="${title}"
          >
            <span>
              ${check}
            </span>
          </button>
        </li>`
      )
    }))

    return (
      `<ul class="${styles.themePicker}">
        ${themePickerList}
        <li class="${styles.themePicker__item}">
          <div class="${styles.themeInput}">
            <span class="${styles.themeInput__addon}">
              <button class="${styles.swatch}" title="custom"></button>
            </span>
            <input placeholder="${primaryColor['500']}"></input>
          </div>
        </li>
      </ul>`
    )
  }

  _renderDevPanel = ({ config: { isDev, theme } }) => {
    if (!isDev) return ''

    return (
      `<div class="${styles.card}">
        <div class="${styles.card__head}">
          <h2>Dev panel</h2>
        </div>
        <div class="${styles.card__content}">
          ${this._renderThemePicker(Object.entries(themes), theme.primaryColor)}
        </div>
      </div>`
    )
  }

  _renderStack = (stack = []) =>
    renderStringArray(
      this._normalizeStackNames(stack)
        .map(stackItem => this._getStackHTML(stackItem))
    )

  _renderMedia = (media) =>
    renderStringArray(
      Object.keys(media)
        .filter((mediaKey) => Boolean(media[mediaKey]))
        .map(mediaKey => this._getMediaHTML(mediaKey, media[mediaKey]))
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

  _getWidgetHTML = (config) => {
    const { title, shortDescription, description, stack, media, config: { theme } } = config

    return (
      `<div id="explainit" class="explainit">
        <div id="explainit__frame" class="explainit__frame${this.isOpen ? ' explainit__frame--opened' : ''}">
          <button id="explainit__close" class="${styles.header__close}">
            ${close}
          </button>
          <div class="${styles.frame__inner}">
            <div
              class="${styles.header}"
              style="background: linear-gradient(to bottom, ${theme.primaryColor[500]}, ${theme.primaryColor[700]});"
            >
              <div class="${styles.header__bg}" style="background-image: ${banners.hideout}"></div>
              <div class="${styles.header__content}">
                <h1 class="${styles.title}">${title}</h1>
                ${this._renderShortDescription(shortDescription)}
              </div>
            </div>
            <div class="${styles.content}">
              <div class="${styles.content__inner}">
                ${this._renderDevPanel(config)}
                ${this._renderStackCard(stack)}
                ${this._renderDescriptionCard(description)}
                ${this._renderMediaCard(media)}
              </div>
            </div>
          </div>
        </div>
        <div
          id="explainit__launcher"
          class="explainit__launcher ${this.isOpen ? ' explainit__launcher--open' : ''}"
          style="background-color: ${theme.primaryColor[500]};"
        >
          <span style="display: inherit; color: ${theme.primaryColor[900]}">
            ${this.isOpen ? (angleDown) : (more)}
          </span>
        </div>
      </div>`
    )
  };

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
    },
    config = {
      isDev: false
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
    this.config = {
      ...config,
      theme: this._buildTheme({
        primaryColor: themes.turquoise
      })
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
      this._getWidgetHTML({
        title: this.title,
        shortDescription: this.shortDescription,
        description: this.description,
        stack: this.stack,
        media: this.media,
        config: this.config
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
