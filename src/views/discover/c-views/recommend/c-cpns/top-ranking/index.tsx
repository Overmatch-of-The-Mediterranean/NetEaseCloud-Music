import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RankingWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { shallowEqualApp, useAppSelector } from '@/store'
import TopRankingItem from '../top-ranking-item'

interface IProps {
 children?: ReactNode
}

const TopRanking: FC<IProps> = () => {
  const { playlists } = useAppSelector((state) => ({
    playlists:state.recommend.playlists
  }),shallowEqualApp)

  return (
    <RankingWrapper>
      <AreaHeaderV1 title="榜单" moreLink='/discover/ranking' />
      <div className="content">
        {
          playlists?.map(item => {
            return (
              <TopRankingItem key={item?.id} item={ item } />
            )
           })
        }
      </div>
   </RankingWrapper>
 )
}

export default memo(TopRanking)
