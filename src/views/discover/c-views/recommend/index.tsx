import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

import TopBanner from './c-cpns/top-banner'
import HotRecommend from './c-cpns/hot-recommend'
import { RecommendWrapper } from './style'
import {  useAppDispatch } from '@/store'

import { fetchRecommendDataAction,fetchTopRankingDataAction } from "./store/recommend";
import NewAlbum from './c-cpns/new-album'
import TopRanking from './c-cpns/top-ranking'
import UserLogin from './c-cpns/user-login'
import SettleSinger from './c-cpns/settle-singer'
import HotAnchor from './c-cpns/hot-anchor'


interface IProps {
 children?: ReactNode
}

const Recommend: FC<IProps> = () => {


  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchRecommendDataAction())
    dispatch(fetchTopRankingDataAction())
   },[])


  return (
    <RecommendWrapper>
      <TopBanner />
      <div className="content wrap-v2">
        <div className="left">
          <HotRecommend />
          <NewAlbum />
          <TopRanking />
        </div>
        <div className="right">
          <UserLogin />
          <SettleSinger />
          <HotAnchor/>
        </div>
      </div>


    </RecommendWrapper>
  )
}

export default memo(Recommend)
