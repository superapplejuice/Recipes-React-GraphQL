import React from 'react'
import { render } from 'react-dom'

import App from './components/App'

const rootElement = document.querySelector('#root')
const renderApp = () => <App />

render(renderApp(), rootElement)
