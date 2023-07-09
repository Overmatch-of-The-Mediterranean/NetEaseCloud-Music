import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { SingerWrapper } from './style'
import AreaHeaderV2 from '@/components/area-header-v2'
import { shallowEqualApp, useAppSelector } from '@/store'
import { getImageUrl } from '@/utils/format'

interface IProps {
 children?: ReactNode
}

const SettleSinger: FC<IProps> = () => {
  const { settleSingers } = useAppSelector((state) => ({
    settleSingers:state.recommend.settleSingers
   }),shallowEqualApp)

  return (
    <SingerWrapper>
      <AreaHeaderV2 title="入驻歌手" moreText="查看全部 &gt;" />
      <div className='singers'>
        {
          settleSingers.map(item => {
            return (
              <a href="" key={item.id} className='item'>
                <img src={ getImageUrl(item.picUrl,62) } alt="" />
                <div className="info">
                  <div className="name">{ item.name }</div>
                  <div className="alia">{ item.alias.join(' ') }</div>
                </div>
              </a>
            )
          })
        }
      </div>
   </SingerWrapper>
 )
}

export default memo(SettleSinger)
