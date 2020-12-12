import { h, render } from 'preact'

import ExplainIt from './ExplainIt'

import s from './styles.global.css'

render(
  <ExplainIt config={{
    title: 'Petgram',
    shortDescription: 'Petgram es una aplicación realizada en el curso de React Avanzado en Platzi. Las imágenes que se muestran son de mascotas 🐶.',
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
  }}
  />, document.querySelector('#main'))
