import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RankingItemWrapper } from './style'
import { getImageUrl } from '@/utils/format'
import { useAppDispatch } from '@/store'
import { fetchSongDetailDataAction } from '@/views/player/store/player'

interface IProps {
  children?: ReactNode,
  item:any
}

const TopRankingItem: FC<IProps> = (props) => {
  const { item = {} } = props
  const { tracks = [] } = item

  const dispatch = useAppDispatch()

  // 添加榜单中的歌曲至播放列表
  function handleRankingPlay(id:number) {
    dispatch(fetchSongDetailDataAction(id))
   }

  return (
    <RankingItemWrapper>
      <div className="header">
        <div className="image">
          <img src={getImageUrl(item.coverImgUrl, 80)} alt="" />
          <a href="" className="sprite_cover"></a>
        </div>
        <div className="info">
          <div className="name">{ item.name }</div>
          <button className='btn sprite_02 play'></button>
          <button className='btn sprite_02 favor'></button>
        </div>
      </div>
      <div className="list">
        {
          tracks.slice(0,10).map((item:any,index:any) => {
            return (
              <div className="item" key={item.id}>
                <div className="index">{ index + 1 }</div>
                <div className="info">
                  <div className="name">{ item.name }</div>
                  <div className="operator">
                    <button className="btn sprite_02 play" onClick={()=>handleRankingPlay(item.id)}></button>
                    <button className="btn sprite_icon2 add"></button>
                    <button className="btn sprite_02 favor"></button>
                  </div>
                </div>
              </div>
            )
           })
        }
      </div>
      <div className="footer">
        <a href="#/discover/ranking">查看全部 &gt;</a>
      </div>
   </RankingItemWrapper>
 )
}

export default memo(TopRankingItem)