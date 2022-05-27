import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initContract } from './assets/js/near/utils'

const container = document.querySelector('#root')
const root = createRoot(container) // createRoot(container!) if you use TypeScript

window.nearInitPromise = initContract()
  .then(() => {
    <App />
    root.render(<App tab="home" />)
  })
  .catch(console.error)
