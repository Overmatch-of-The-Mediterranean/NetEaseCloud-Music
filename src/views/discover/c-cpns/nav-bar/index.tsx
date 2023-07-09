import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavWrapper } from './style'
import { discoverData } from '@/assets/data/local_data'
import { NavLink } from 'react-router-dom'

interface IProps {
 children?: ReactNode
}

const NavBar: FC<IProps> = () => {
  return (
    <NavWrapper>
      <div className="nav wrap-v1">
        {
          discoverData.map(item => {
            return (
              <div className='item' key={item.title}>
                <NavLink to={ item.link }>{ item.title }</NavLink>
              </div>
            )
          })
        }
      </div>
   </NavWrapper>
 )
}

export default memo(NavBar)
