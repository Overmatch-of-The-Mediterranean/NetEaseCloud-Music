import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { MenuItemWrapper } from './style'
import { formatCount, getImageUrl } from '@/utils/format'

interface IProps {
  children?: ReactNode,
  item:any
}

const SongsMenuItem: FC<IProps> = (props) => {
  const { item } = props

  return (
    <MenuItemWrapper>
      <div className="top">
        <img src={ getImageUrl(item.picUrl,140) } alt="" />
        <div className="cover sprite_covor">
            <div className="info sprite_covor">
              <span>
                <i className='sprite_icon headset'></i>
                { formatCount(item.playCount) }
              </span>
              <i className='sprite_icon play'></i>
            </div>
        </div>
      </div>

      <div className="bottom">{ item.name }</div>
    </MenuItemWrapper>
 )
}

export default memo(SongsMenuItem)
