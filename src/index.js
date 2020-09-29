import './loadStyles'
import stackIcons from './stackIcons'

console.log(stackIcons)

/* Media SVGs */
const mediaSVGs = {
  twitter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 25.99">
  <path id="twitter-icon" d="M28.711,9.858c.02.284.02.569.02.853,0,8.67-6.6,18.66-18.66,18.66A18.533,18.533,0,0,1,0,26.427a13.567,13.567,0,0,0,1.584.081,13.135,13.135,0,0,0,8.142-2.8,6.57,6.57,0,0,1-6.132-4.548,8.271,8.271,0,0,0,1.239.1,6.936,6.936,0,0,0,1.726-.223A6.559,6.559,0,0,1,1.3,12.6v-.081a6.6,6.6,0,0,0,2.964.832,6.568,6.568,0,0,1-2.03-8.772,18.642,18.642,0,0,0,13.523,6.863,7.4,7.4,0,0,1-.162-1.5,6.565,6.565,0,0,1,11.35-4.487,12.912,12.912,0,0,0,4.162-1.584,6.541,6.541,0,0,1-2.883,3.614A13.148,13.148,0,0,0,32,6.467a14.1,14.1,0,0,1-3.289,3.391Z" transform="translate(0 -3.381)"/>
  </svg>`,

  facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <path id="facebook-icon" d="M28.571,2.25H3.429A3.429,3.429,0,0,0,0,5.679V30.821A3.429,3.429,0,0,0,3.429,34.25h9.8V23.371h-4.5V18.25h4.5v-3.9c0-4.439,2.643-6.891,6.691-6.891a27.262,27.262,0,0,1,3.966.346v4.357H21.655a2.561,2.561,0,0,0-2.887,2.766V18.25h4.913L22.9,23.371H18.768V34.25h9.8A3.429,3.429,0,0,0,32,30.821V5.679A3.429,3.429,0,0,0,28.571,2.25Z" transform="translate(0 -2.25)"/>
  </svg>`,

  linkedIn: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 31.999">
  <path id="linkedin-icon" d="M7.163,32H.529V10.636H7.163ZM3.842,7.721A3.86,3.86,0,1,1,7.684,3.843,3.875,3.875,0,0,1,3.842,7.721ZM31.993,32h-6.62V21.6c0-2.479-.05-5.657-3.449-5.657-3.449,0-3.978,2.693-3.978,5.479V32H11.319V10.636h6.363V13.55h.093a6.971,6.971,0,0,1,6.277-3.45C30.766,10.1,32,14.521,32,20.264V32Z" transform="translate(0 -0.001)"/>
  </svg>`,

  website: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <path id="link-icon" d="M20.413,11.587A9.5,9.5,0,0,1,20.436,25l-.022.023-4.2,4.2A9.5,9.5,0,0,1,2.778,15.787L5.1,13.468a1,1,0,0,1,1.706.663,11.517,11.517,0,0,0,.606,3.3,1.006,1.006,0,0,1-.236,1.038l-.818.818a4.5,4.5,0,1,0,6.323,6.4l4.2-4.2a4.5,4.5,0,0,0,0-6.364,4.682,4.682,0,0,0-.646-.536A1,1,0,0,1,15.8,13.8a2.489,2.489,0,0,1,.731-1.863l1.316-1.316a1,1,0,0,1,1.287-.108,9.53,9.53,0,0,1,1.283,1.075Zm8.808-8.809a9.511,9.511,0,0,0-13.435,0l-4.2,4.2L11.564,7a9.5,9.5,0,0,0,1.305,14.487,1,1,0,0,0,1.286-.108l1.316-1.316A2.489,2.489,0,0,0,16.2,18.2a1,1,0,0,0-.434-.788,4.682,4.682,0,0,1-.646-.536,4.5,4.5,0,0,1,0-6.364l4.2-4.2a4.5,4.5,0,1,1,6.323,6.4l-.818.818a1.006,1.006,0,0,0-.236,1.038,11.517,11.517,0,0,1,.606,3.3,1,1,0,0,0,1.706.663l2.319-2.319a9.51,9.51,0,0,0,0-13.435Z" transform="translate(0 0)"/>
  </svg>`
}

class ExplainIt {
  normalizeStackNames = (stack) =>
    stack.map((stackItem = '') => stackItem.toLowerCase());

  getStackHTML = (name) => {
    const wrapIntoUl = (svg) => `<li class="stack__item">${svg}</li>`
    const matchingStack = stackIcons[Object.keys(stackIcons).find((stackKey) => stackIcons[stackKey].test(name))]

    if (!matchingStack) return null

    return wrapIntoUl(matchingStack.svg)
  };

  getMediaHTML = (mediaKey, value) => {
    const wrapIntoAnchor = (svg) =>
      `<a class="media__item" target="_blank" href="${value}">${svg}</a>`

    return wrapIntoAnchor(mediaSVGs[mediaKey])
  };

  renderStack = (stack = []) =>
    this.normalizeStackNames(stack).reduce(
      (prev, stackItem) => prev + (this.getStackHTML(stackItem) || ''),
      ''
    );

  renderMedia = (media) =>
    Object.keys(media)
      .filter((mediaKey) => Boolean(media[mediaKey]))
      .reduce(
        (prev, mediaKey) => prev + this.getMediaHTML(mediaKey, media[mediaKey]),
        ''
      );

  hasMedia = (media = {}) =>
    Object.keys(media).some((mediaKey) => media[mediaKey]);

  getWidgetHTML = ({ title, shortDescription, description, stack, media }) => `
    <div id="explainit" class="explainit">
      <div id="explainit__frame" class="explainit__frame${this.isOpen ? ' explainit__frame--opened' : ''}">
        <div class="frame__inner">
          <div class="header">
            <div class="header__overlay"></div>
            <div class="header__content">
              <h1 class="title">${title}</h1>
              ${
                shortDescription.length > 0
                  ? `
                  <p class="shortDescription">
                    ${shortDescription}
                  </p>
                `
                  : ''
              }
            </div>
          </div>
          <div class="content">
            <div class="content__inner">
              ${
                stack.length > 0
                  ? `<div class="card">
                      <div class="card__head">
                        <h2>Stack</h2>
                      </div>
                      <div class="card__content">
                        <ul class="stack">
                          ${this.renderStack(stack)}
                        </ul>
                      </div>
                    </div>`
                  : ''
              }
              ${
                description.length > 0
                  ? `
                  <div class="card">
                    <div class="card__head">
                      <h2>Description</h2>
                    </div>
                    <div class="card__content">
                      <article class="description">
                        ${description}
                      </article>
                    </div>
                  </div>
                `
                  : ''
              }
              ${
                this.hasMedia(media)
                  ? `
                  <div class="card">
                    <div class="card__content">
                      <ul class="media">
                        ${this.renderMedia(media)}
                      </ul>
                    </div>
                  </div>
                `
                  : ''
              }
            </div>
          </div>
        </div>
      </div>
      <div id="explainit__launcher" class="explainit__launcher">
        ${
          this.isOpen ? (`
            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 25.34 15.499">
              <g id="arrow" transform="translate(-25.672 -607.672)">
                <line id="Línea_1" data-name="Línea 1" x2="9.842" y2="9.842" transform="translate(28.5 610.5)" fill="none" stroke="var(--green-900)" stroke-linecap="round" stroke-width="4"/>
                <line id="Línea_2" data-name="Línea 2" x1="9.842" y2="9.842" transform="translate(38.342 610.5)" fill="none" stroke="var(--green-900)" stroke-linecap="round" stroke-width="4"/>
              </g>
            </svg>
          `) : (`
            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 23.73 5.405">
              <path id="more"
                d="M1.9-2.426A2.7,2.7,0,0,1,2.624-4.4a2.628,2.628,0,0,1,1.964-.738A2.628,2.628,0,0,1,6.552-4.4a2.7,2.7,0,0,1,.725,1.978A2.654,2.654,0,0,1,6.552-.461,2.654,2.654,0,0,1,4.588.264,2.654,2.654,0,0,1,2.624-.461,2.654,2.654,0,0,1,1.9-2.426Zm9.176,0A2.7,2.7,0,0,1,11.8-4.4a2.628,2.628,0,0,1,1.964-.738,2.628,2.628,0,0,1,1.964.738,2.7,2.7,0,0,1,.725,1.978,2.654,2.654,0,0,1-.725,1.964,2.654,2.654,0,0,1-1.964.725A2.654,2.654,0,0,1,11.8-.461,2.654,2.654,0,0,1,11.074-2.426Zm9.176,0A2.7,2.7,0,0,1,20.975-4.4a2.628,2.628,0,0,1,1.964-.738A2.628,2.628,0,0,1,24.9-4.4a2.7,2.7,0,0,1,.725,1.978A2.654,2.654,0,0,1,24.9-.461a2.654,2.654,0,0,1-1.964.725,2.654,2.654,0,0,1-1.964-.725A2.654,2.654,0,0,1,20.25-2.426Z"
                transform="translate(-1.898 5.142)" fill="var(--green-900)" />
            </svg>
          `)
        }
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
      facebook: null
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
      facebook: media.facebook
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
          facebook: this.media.facebook
        }
      })
    )

    const trigger = document.getElementById('explainit__launcher')
    // const content = document.getElementById("explainit__frame");

    trigger.addEventListener('click', () => {
      this.toggle()
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
  shortDescription: 'Petgram es una aplicación realizada en el curso de React Avanzado en Platzi. Es una aplicación similar a Instagram con el detalle que las imágenes que se muestran son de mascotas.',
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
    linkedIn: 'https://www.linkedin.com/in/matias-sebastian-perez-24012b180/'
  }
})

explainit.open()
