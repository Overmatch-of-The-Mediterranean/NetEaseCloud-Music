import React, { Suspense, useEffect } from 'react'
import routes from './router'
import { useRoutes } from 'react-router-dom'

import AppHeader from './components/app-header'
// import AppFooter from './components/app-footer'
import AppPlayerBar from './views/player/app-player-bar'
import { useAppDispatch } from './store'
import { fetchSongDetailDataAction } from './views/player/store/player'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchSongDetailDataAction(569213220))
  },[])

  return (
    <div className="App">
      <AppHeader/>
      <Suspense fallback="loading......">
        {useRoutes(routes)}
      </Suspense>
      {/* <AppFooter /> */}
      <AppPlayerBar/>
    </div>
  )
}

export default App
