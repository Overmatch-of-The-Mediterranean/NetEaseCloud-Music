import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HeaderV1 } from './style'
import { Link } from 'react-router-dom'

interface IProps {
  children?: ReactNode,
  title?: string,
  keywords?:any[]
  moreText?: string,
  moreLink?: string
}

const AreaHeaderV1: FC<IProps> = (props) => {
  const { title='默认标题', keywords=[], moreText='更多', moreLink='默认链接' } = props

  return (
    <HeaderV1  className="sprite_02">
      <div className="left">
        <div className="title">{ title }</div>
        <div className="keywords">
          {
            keywords.map((item) => {
              return (
                <div className="item" key={item}>
                  <span className="text">{item}</span>
                  <span className="divider">|</span>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="right">
        <Link className="more" to={moreLink}>{ moreText }</Link>
        <i className='icon sprite_02'></i>
      </div>

    </HeaderV1>
  )
}

export default memo(AreaHeaderV1)
