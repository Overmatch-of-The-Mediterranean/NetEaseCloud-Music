import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { HeaderWrapper, LeftWrapper, RightWrapper } from './style'
import headerTitles from '@/assets/data/header_titles.json'

interface IProps {
 children?: ReactNode
}

const AppHeader: FC<IProps> = () => {

  function showItem(item:any) {
    if (item.type === 'path') {
      return (
        <NavLink to={item.link}>
          {item.title}
          <i className="sprite_01 icon"></i>
        </NavLink>
      )
    } else {
      return <a href={ item.link } target='_blank' rel="noreferrer">{ item.title}</a>
    }
   }

  return (
    <HeaderWrapper>
      <div className="content">
        <LeftWrapper>
          <a href="/" className='logo sprite_01'></a>
          <div className="title-list">
            {
              headerTitles.map((item, index) => {
                return (
                  <div className='item' key={index}>
                    { showItem(item) }
                  </div>
                )
              })
            }
          </div>

        </LeftWrapper>
        <RightWrapper>right</RightWrapper>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  )
}

export default memo(AppHeader)
