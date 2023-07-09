import React, { memo, useRef } from 'react'
import type { ElementRef, FC, ReactNode } from 'react'
import { AlbumWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { Carousel } from 'antd'
import { shallowEqualApp, useAppSelector } from '@/store'
import NewAlbumItem from '@/components/new-album-item'

interface IProps {
 children?: ReactNode
}

const NewAlbum: FC<IProps> = () => {
  const CarouselRef = useRef<ElementRef<typeof Carousel>>(null)
  const { newAlbums } = useAppSelector((state) => ({
    newAlbums: state.recommend.newAlbums
  }),shallowEqualApp)

  function handleClick(isRight:boolean) {
    isRight ? CarouselRef.current?.next() : CarouselRef.current?.prev()
   }

  return (
    <AlbumWrapper>
      <AreaHeaderV1 title='新碟上架' moreLink='/discover/album' />
      <div className="content">
        <div className="sprite_02 arrow arrow-left" onClick={()=>handleClick(false)}></div>
        <div className="album">
          <Carousel ref={ CarouselRef } dots={ false } speed={1500}>
              {
                [0, 1].map(item => {
                  return (
                    <div key={item}>
                      <div className="album-list">
                        {
                          newAlbums.slice(item * 5, (item + 1) * 5).map((item, index) => {
                            return <NewAlbumItem key={index} item={ item } />
                          })
                        }
                      </div>
                    </div>
                  )
                })
              }
            </Carousel>
        </div>
        <div className="sprite_02 arrow arrow-right" onClick={()=>handleClick(true)}></div>
      </div>
   </AlbumWrapper>
 )
}

export default memo(NewAlbum)
