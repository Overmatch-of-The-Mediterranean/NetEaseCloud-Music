import React, { Suspense } from 'react'
import routes from './router'
import { useRoutes } from 'react-router-dom'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <Suspense fallback="loading......">
        {useRoutes(routes)}
      </Suspense>
      <AppFooter/>
    </div>
  )
}

export default App
