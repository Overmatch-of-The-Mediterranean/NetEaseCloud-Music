import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { BarOperator, BarPlayerInfo,BarControl, PlayerBarWrapper } from './style'
import { Link } from 'react-router-dom'
import { Slider,message } from 'antd'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import { getImageUrl } from '@/utils/format'
import { getSongPlayUrl } from '@/utils/handle-player'
import { formatTime } from '@/utils/format'
import { ILyric } from '@/utils/parse-lyric'
import { changeLyricIndexAction, changeMusicAction, changePlayModeAction } from '../store/player'

interface IProps {
 children?: ReactNode
}

const AppPlayerBar: FC<IProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [ isSliding, setIsSliding ] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  const { currentSong = [], lyrics = [], lyricIndex,playMode } = useAppSelector((state) => ({
    currentSong: state.player.currentSong,
    lyrics: state.player.lyrics,
    lyricIndex: state.player.lyricIndex,
    playMode:state.player.playMode
   }),shallowEqualApp)

  const dispatch = useAppDispatch()

  useEffect(() => {
    audioRef.current!.src = getSongPlayUrl(currentSong.id)
    audioRef.current
      ?.play()
      .then(() => {
          setIsPlaying(true)
        console.log('播放成功');

        })
      .catch(() => {
          setIsPlaying(false)
          console.log('播放失败')

      })

    setDuration(currentSong.dt)
   },[currentSong])


   /**
    * 歌曲进度逻辑
    */
  function handleTimeUpdate() {
    const currentTime = audioRef!.current!.currentTime * 1000


    if (!isSliding) {
      const progress = (currentTime / duration) * 100
      setProgress(progress) // 进度条
      setCurrentTime(currentTime) // 现在播放时间
    }

    let index:number = lyrics.length - 1
    for (let i = 0; i < lyrics.length; i++) {
      /* eslint-disabled */
      const lyric:ILyric = lyrics[i]
      if (lyric.time > currentTime) {
        index = i - 1
        break
      }
    }
    if (lyricIndex === index || index === -1) return
    dispatch(changeLyricIndexAction(index))
    // console.log(lyrics[index].text);

     message.open({
      content: lyrics[index].text,
      key: 'lyric',
      duration: 0
    })



  }

  /**
   * 歌曲播放完后的自动处理
   */
  function handleTimeEnd() {
    if (playMode === 2) {
      audioRef.current!.currentTime = 0
      audioRef.current?.play()
    } else {
      handleChangeMusic(true)
     }
  }

  /**
   * 歌曲播放逻辑
   */
  function handlePlayBtnClick() {
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))

    setIsPlaying(!isPlaying)
  }

/**
 * 不同模式下歌曲切换逻辑
 */
  function handleChangeMusic(isNext:boolean) {
    dispatch(changeMusicAction(isNext))
   }


  /**
   * 拖拽与点击进度条改变歌曲进度逻辑
   */
  function handleSliderChanging(value: number) {
    setIsSliding(true)
    setProgress(value)

    const currentTime = (value / 100) * duration
    setCurrentTime(currentTime)


   }

  function handleSliderChanged(value: number) {
    const currentTime = (value / 100) * duration

    audioRef!.current!.currentTime = currentTime / 1000

    setProgress(value)
    setCurrentTime(currentTime)
    setIsSliding(false)
  }

  /**
   * 切换播放模式处理
   */
  function handleChangeLoop() {
    let newPlayMode = playMode + 1
    if (newPlayMode > 2) newPlayMode = 0
    dispatch(changePlayModeAction(newPlayMode))
  }
  return (
    <PlayerBarWrapper className='sprite_playbar'>
      <div className="content wrap-v2">
        <BarControl isplaying={ isPlaying.toString() }>
          <button className='sprite_playbar btn prev' onClick={()=>handleChangeMusic(false)}></button>
          <button className='sprite_playbar btn play' onClick={handlePlayBtnClick}></button>
          <button className='sprite_playbar btn next' onClick={()=>handleChangeMusic(true)}></button>
        </BarControl>
        <BarPlayerInfo>
          <div className="image">
            <Link to="/player">
              <img src={ getImageUrl(currentSong?.al?.picUrl,34) } alt="" />
            </Link>
          </div>
          <div className="info">
            <div className="song">
              <span className='song-name'>{ currentSong.name }</span>
              <span className='singer-name'>{ currentSong.ar?.[0].name }</span>
            </div>
            <div className="progress">
              <Slider
                step={0.5}
                value={progress}
                tooltip={{ formatter: null }}
                onChange={handleSliderChanging}
                onAfterChange={handleSliderChanged}
              />
              <div className="time">
                <span className='current'>{ formatTime(currentTime) }</span>
                <span className="divider">/</span>
                <span className='total-time'>{ formatTime(duration) }</span>
              </div>
            </div>
          </div>
        </BarPlayerInfo>
        <BarOperator playMode={ playMode }>
          <div className="left">
            {/* <button className="btn pip"></button> */}
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className='btn sprite_playbar volume'></button>
            <button className='btn sprite_playbar loop' onClick={handleChangeLoop}></button>
            <button className='btn sprite_playbar playlist'></button>
          </div>
        </BarOperator>
      </div>
      <audio ref={audioRef} onTimeUpdate={ handleTimeUpdate } onEnded={ handleTimeEnd }/>
   </PlayerBarWrapper>
 )
}

export default memo(AppPlayerBar)
