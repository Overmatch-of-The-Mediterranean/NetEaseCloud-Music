import React, { memo, useRef, useState } from 'react'
import type { ElementRef, FC, ReactNode } from 'react'
import { Carousel } from 'antd'
import classNames from 'classnames'

import { BannerWrapper, ControlWrapper, RightWrapper,LeftWrapper } from './style'

import { shallowEqualApp, useAppSelector } from '@/store'

interface IProps {
 children?: ReactNode
}

const TopBanner: FC<IProps> = () => {
  // 记录第几张图片
  const [currentIndex, setCurrentIndex] = useState(0)

   const { banners } = useAppSelector((state) => ({
    banners:state.recommend.banners
   }), shallowEqualApp)

  // 获取轮播图元素，以实现点击切换功能
   const CarouselRef = useRef<ElementRef<typeof Carousel>>(null)


  // 事件处理
  function handleClick(isRight:boolean) {
    isRight ? CarouselRef.current?.next() : CarouselRef.current?.prev()
   }

  function handleBeforeChange() {
    setCurrentIndex(-1)
  }

  function handleAfterChange(current:number) {
    setCurrentIndex(current)
  }
  // 同步动态切换背景图
  let bgUrl
  if (currentIndex >= 0 && banners?.length > 0) {
      bgUrl = banners[currentIndex]?.imageUrl + '?imageView&blur=40x20'
  }


  return (
    <BannerWrapper style={{background:`url('${bgUrl}') center center/6000px`}}>
      <div className="banner wrap-v2">
        <LeftWrapper>
          <Carousel
            autoplay
            effect='fade'
            dots={false}
            ref={CarouselRef}
            afterChange={handleAfterChange}
            beforeChange={handleBeforeChange}
          >
              {
               banners?.map(item => {
                 return (
                   <div className="banner-item" key={item.imageUrl}>
                     <img className='image' src={item.imageUrl} alt={ item.typeTile } />
                   </div>
                 )
               })
             }
          </Carousel>
          <ul className="indicator">
            {
              banners?.map((item, index) => {
                return <li key={item.imageUrl} className={classNames('item',{active:index === currentIndex}) } ></li>
              })
            }
          </ul>
        </LeftWrapper>
        <RightWrapper></RightWrapper>
        <ControlWrapper>
          <div className="btn left" onClick={()=>handleClick(false)}></div>
          <div className="btn right" onClick={()=>handleClick(true)}></div>
        </ControlWrapper>
      </div>
    </BannerWrapper>
  )
}

export default memo(TopBanner)
