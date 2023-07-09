import React, { Suspense, memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { DiscoverWrapper } from './style'
import NavBar from './c-cpns/nav-bar'

interface IProps {
 children?: ReactNode
}

const Discover: FC<IProps> = () => {
  return (
    <DiscoverWrapper>
      <div className="nav wrapv1">
        <NavBar/>
      </div>
      <Suspense fallback="loading......">
        <div className="main">
          <Outlet/>
        </div>
      </Suspense>
    </DiscoverWrapper>
 )
}

export default memo(Discover)

