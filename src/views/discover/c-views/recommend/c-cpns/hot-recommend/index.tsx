import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HotWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import SongsMenuItem from '@/components/songs-menu-item'
import { shallowEqualApp, useAppSelector } from '@/store'

interface IProps {
 children?: ReactNode
}

const HotRecommend: FC<IProps> = () => {

   const { hotRecommends } = useAppSelector((state) => ({
    hotRecommends: state.recommend.hotRecommends
   }),shallowEqualApp)

  return (
    <HotWrapper>
      <AreaHeaderV1
        title="热门推荐"
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
        moreText='更多'
        moreLink='/discover/songs'
      />
      <div className="recommend-list">
            {
              hotRecommends?.map((item, index) => {
                return (
                  <SongsMenuItem key={index} item={ item } />
                )
               })
            }
          </div>
    </HotWrapper>
  )
}

export default memo(HotRecommend)
