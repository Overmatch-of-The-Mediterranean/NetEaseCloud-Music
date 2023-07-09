import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import 'normalize.css'
import '@/assets/css/index.less'

import store from './store'
import { Provider } from 'react-redux'
import theme from './assets/theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

// const obj = {
//   name: '1',
//   age: 18
// }

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </HashRouter>
    </Provider>
  // </React.StrictMode>
)
