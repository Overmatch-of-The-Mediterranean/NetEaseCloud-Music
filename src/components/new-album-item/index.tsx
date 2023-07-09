import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { AlbumItemWrapper } from './style'
import { getImageUrl } from '@/utils/format'

interface IProps {
  children?: ReactNode,
  item:any
}

const NewAlbumItem: FC<IProps> = (props) => {
  const { item } = props
  return (
    <AlbumItemWrapper>
      <div className="top">
        <img src={ getImageUrl(item.picUrl,100) } alt="" />
        <a href="" className='cover sprite_cover'></a>
      </div>
      <div className="bottom">
        <div className="name">{item.name}</div>
        <div className="artist">{ item.artist.name }</div>
      </div>
    </AlbumItemWrapper>
  )
}

export default memo(NewAlbumItem)
