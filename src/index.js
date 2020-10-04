import './loadStyles'
import stackIcons from './stackIcons'

import { capitalize } from './utils'
import { angleDown, more, facebook, website, linkedIn, twitter, close, github } from './icons'

/* Media SVGs */
const mediaSVGs = { facebook, website, linkedIn, twitter, github }

class ExplainIt {
  _normalizeStackNames = (stack) =>
    stack.map((stackItem = '') => stackItem.toLowerCase());

  _getStackHTML = (name) => {
    const wrapIntoUl = (svg) => `<li class="stack__item" title="${capitalize(name)}">${svg}</li>`
    const matchingStack = stackIcons[Object.keys(stackIcons).find((stackKey) => stackIcons[stackKey].test(name))]

    if (!matchingStack) return null

    return wrapIntoUl(matchingStack.svg)
  };

  _getMediaHTML = (mediaKey, value) => {
    const wrapIntoAnchor = (svg) =>
      `<a class="media__item" target="_blank" href="${value}">${svg}</a>`

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
      `<div class="card">
        <div class="card__head">
          <h2>Stack</h2>
        </div>
        <div class="card__content">
          <ul class="stack">
            ${this._renderStack(stack)}
          </ul>
        </div>
      </div>`
    ) : ''
  )

  _renderDescriptionCard = (description) => (
    description.length > 0 ? (
      `<div class="card">
        <div class="card__head">
          <h2>Description</h2>
        </div>
        <div class="card__content">
          <article class="description">
            ${description}
          </article>
        </div>
      </div>`
    ) : ''
  )

  _renderMediaCard = (media) => (
    this._hasMedia(media) ? (
      `<div class="card">
        <div class="card__content">
          <ul class="media">
            ${this._renderMedia(media)}
          </ul>
        </div>
      </div>`
    ) : ''
  )

  _renderShortDescription = (shortDescription) => (
    shortDescription.length > 0 ? (
      `<p class="shortDescription">
          ${shortDescription}
        </p>`
    ) : ''
  )

  getWidgetHTML = ({ title, shortDescription, description, stack, media }) => `
    <div id="explainit" class="explainit">
      <div id="explainit__frame" class="explainit__frame${this.isOpen ? ' explainit__frame--opened' : ''}">
        <div class="frame__inner">
          <div class="header">
            <button id="explainit__close" class="header__close">
              ${close}
            </button>
            <div class="header__bg"></div>
            <div class="header__content">
              <h1 class="title">${title}</h1>
              ${this._renderShortDescription(shortDescription)}
            </div>
          </div>
          <div class="content">
            <div class="content__inner">
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
    this.title = title
    this.shortDescription = shortDescription
    this.description = description
    this.stack = stack
    this.rootElm = rootElm || document.querySelector('body')
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

const explainit = new ExplainIt({
  title: 'Petgram',
  shortDescription: 'Petgram es una aplicación realizada en el curso de React Avanzado en Platzi. Es una aplicación similar a Instagram con el detalle que las imágenes que se muestran son de mascotas 🐶.',
  stack: ['graphql', 'react', 'redwood', 'next'],
  description: `
    <p>
      Petgram es una PWA(Progressive Web App) de aspecto similar a instagram donde podés encontrar fotos de
      mascotas.
    </p>
    <h3>¿Con que esta hecho?</h3>
    <ul>
      <li>
        ⚛️ React
      </li>
      <li>
        🚀 Apollo client (GraphQL)
      </li>
      <li>
        💅 Styled components
      </li>
      <li>
        🔍 Cypress
      </li>
    </ul>
    <h3>¿Que puedo hacer con Petgram?</h3>
    <p>
      Con Petgram podés crearte una cuenta y likear todas las publicaciones de gatitos que quieras 😉.
    </p>
    <h3>¿Dónde puedo verla?</h3>
    <p>Justo aca 👉 <a href="https://petgram-seven-ochre.vercel.app">https://petgram-seven-ochre.vercel.app</a></p>
  `,
  media: {
    website: 'https://mtprz.dev',
    twitter: 'https://twitter.com/matiasperz_',
    linkedIn: 'https://www.linkedin.com/in/matias-sebastian-perez-24012b180/',
    github: 'https://github.com/matias4205'
  }
})

// explainit.open()
