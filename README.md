# 网易云项目

## 一.要点

 1. 二级路由使用懒加载，要在占位<Outlet/>的外层使用Suspense包裹，可以免除整体闪现的效果

    

 2. 通用样式的两种写法

    > 1.直接写class样式
    >
    > 2.使用主题
    >
    > ```typescript
    > const theme = {
    > color: {
    >  primary: '#C20C0C',
    >  ...
    > },
    > size: {},
    > mixin: {
    >  wrapv1: `
    >    width: 1100px;
    >    margin: 0 auto;
    >  `
    > }
    > }
    > 
    > export default theme
    > 
    > ```
    >
    > ```tsx
    > <ThemeProvider theme={theme}>
    >    <App />
    > </ThemeProvider>
    > ```



3.Class编程和TS结合

```react
type Iprops = ... // 声明props的类型
type IState = ... // 声明state的类型
Class demo2 extends PureComponent<Iprops, IState> {
	constructor (props:Iprops){
        this.state = ...
    }
}
   
```



4.webpack中开发环境和生产环境的区分

(1).手动区分

```typescript
export const BASE_URL = 'http://codercba.com.dev:9002'
export const BASE_URL = 'http://codercba.com.pro:9002'
```

(2).自动区分

```typescript
let BASE_URL
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://codercba.com.dev:9002'
} else {
  BASE_URL = 'http://codercba.com.pro:9002'
}
```

(3).在最外层通过配置文件(.env.development 和 .env.production)

```
REACT_APP_BASE_URL=http://codercba.com.dev:9002 //开发
REACT_APP_BASE_URL=http://codercba.com.pro:9002 // 生产
```

```typescript
可在react-app-env.d补充类型声明
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
    readonly REACT_APP_BASE_URL: string
  }
}
```



5.使用TS对Axios进行二次封装

```typescript
// 在index.ts文件中
import axios from "axios";
import type { AxiosInstance } from "axios";
import { HYRequestConfig } from "./type";


/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 * 
 *  2.响应结果的类型处理(泛型)
 */

class HYRequest {
    instance: AxiosInstance

    constructor(config: HYRequestConfig) {
        this.instance = axios.create(config)
		
        // 全局拦截
        this.instance.interceptors.request.use(config => {
            console.log('全局请求成功');
            return config
        }, err => {
            console.log('全局请求失败');
            return err
        })
        this.instance.interceptors.response.use(res => {
            console.log('全局响应成功');
            return res.data
        }, err => {
            console.log('全局响应失败');
            return err
        })

		// 不同实例拦截	
        this.instance.interceptors.request.use(
            config.interceptors?.requestSuccessFn,
            config.interceptors?.requestFailureFn
        )
        this.instance.interceptors.response.use(
            config.interceptors?.responseSuccessFn,
            config.interceptors?.responseFailtureFn
        )

    }

    request<T = any>(config:HYRequestConfig<T>) {
        // 单个请求拦截
        if (config.interceptors?.requestSuccessFn) {
            config = config.interceptors?.requestSuccessFn(config)
        }

        return new Promise<T>((resolve, reject) => {
            this.instance.request<any,T>(config).then(res => {
                if (config.interceptors?.responseSuccessFn) {
                    res = config.interceptors?.responseSuccessFn(res)
                }
                resolve(res)
            },
                err => {
                    reject(err)
                }
            )
        })
    }

    get<T = any>(config:HYRequestConfig<T>) {
        return this.request({...config,method:'GET'})
    }

    post<T = any>(config: HYRequestConfig<T>) {
        return this.request({...config,method:'POST'})
    }

    delete<T = any>(config: HYRequestConfig<T>) {
        return this.request({...config,method:'DELETE'})
    }

    patch<T = any>(config: HYRequestConfig<T>) {
        return this.request({...config,method:'PATCH'})
    }

}


export default HYRequest
```

```typescript
// 在type.ts文件种
import { AxiosRequestConfig, AxiosResponse } from "axios";


interface HYInterceptors<T = AxiosResponse> { 
    requestSuccessFn?: (config:AxiosRequestConfig) => AxiosRequestConfig,
    requestFailureFn?: (err:any) => any,
    responseSuccessFn?: (res:T) => T,
    responseFailtureFn?: (err:any) => any 
}

export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?:HYInterceptors<T>
 }
```



6.hooks类型封装

```typescript
type IRootType = ReturnType<typeof store.getState>
type IDispatchType = typeof store.dispatch

export const useAppSelector:TypedUseSelectorHook<IRootType> = useSelector
export const useAppDispatch:() => IDispatchType = useDispatch
export const shallowEqualApp = shallowEqual
```



7.跳转和超链接如何区分



8.createAsyncThunk可传入泛型

```typescript
// 第一个泛型参数代表createAsyncThunk函数返回值的类型
// 第二个泛型参数代表调用fetchSongDetailDataAction传入参数的类型，如，下面的id
// 第三个泛型参数代表getState函数返回state的类型
export const fetchSongDetailDataAction = createAsyncThunk<void, number,IThunkType>('songDetail', (id, { dispatch,getState }) => {}
                                                                ..

```









## 二.音乐播放功能(最复杂的部分)

定义的状态变量

```typescript
  const [isPlaying, setIsPlaying] = useState(false) 	// 控制歌曲的播放与暂停
  const [duration, setDuration] = useState(0)			// 存储音乐的总时间
  const [progress, setProgress] = useState(0)			// 存储进度条的实时数值
  const [currentTime, setCurrentTime] = useState(0) 	// 存储当前播放时间
  const [ isSliding, setIsSliding ] = useState(false) 	// 是否拖动的状态控制
```



player从redux中获取的数据

```typescript
const { currentSong = [], lyrics = [], lyricIndex,playMode } = useAppSelector((state) => ({
  currentSong: state.player.currentSong,
  lyrics: state.player.lyrics,
  lyricIndex: state.player.lyricIndex,
  playMode:state.player.playMode
}),shallowEqualApp)
```





1.初始化播放音乐

```tsx
// tsx中使用audio标签
<audio ref={audioRef} onTimeUpdate={ handleTimeUpdate } onEnded={ handleTimeEnd }/>

// 逻辑处理
// 1.首先获取audio元素
const audioRef = useRef<HTMLAudioElement>(null)

// 2.获取redux中存储的正在播放音乐的数据
const { currentSong = [] } = useAppSelector((state) => ({
    currentSong: state.player.currentSong,
   }),shallowEqualApp)

// 3.然后进行首次渲染播放的操作

useEffect(() => {
    // 通过封装的工具函数获取歌曲MP3的播放地址
    audioRef.current!.src = getSongPlayUrl(currentSong.id)
    // 通过audio元素提供的API来实现歌曲的播放
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

```



2.音乐的播放与暂停

```typescript
  function handlePlayBtnClick() {
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))

    setIsPlaying(!isPlaying)
  }
```



3.歌曲播放进度与歌词的对应

```tsx
// 歌曲在播放过程中，会实时调用onTimeUpdate的回调函数。
 <audio ref={audioRef} onTimeUpdate={ handleTimeUpdate } onEnded={ handleTimeEnd }/>


function handleTimeUpdate() {
    const currentTime = audioRef!.current!.currentTime * 1000

	// 通过 isSliding状态来控制拖拽时，进度条不跳跃的逻辑
    if (!isSliding) {
      const progress = (currentTime / duration) * 100
      setProgress(progress) // 进度条
      setCurrentTime(currentTime) // 现在播放时间
    }
	
    // 不同时间歌词匹配算法
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

    // 歌词显示组件
     message.open({
      content: lyrics[index].text,
      key: 'lyric',
      duration: 0
    })
  }
```



4.歌曲播放过程中点击与拖拽进度条的处理

```tsx
// 使用antd中的进度条组件
 <Slider
 	step={0.5}
 	value={progress}
 	tooltip={{ formatter: null }}
 	onChange={handleSliderChanging}
 	onAfterChange={handleSliderChanged}
/>

// 拖动逻辑进度条该表逻辑
function handleSliderChanging(value: number) {
  	setIsSliding(true)
  	setProgress(value	
                
  	const currentTime = (value / 100) * duration
  	setCurrentTime(currentTime)

}

// 点击与拖动进度条结束后，音乐实时播放的逻辑
function handleSliderChanged(value: number) {
   const currentTime = (value / 100) * duration
   
   audioRef!.current!.currentTime = currentTime / 1000
    
   setProgress(value)
   setCurrentTime(currentTime)
    setIsSliding(false)
}
```



5.在redux中存放歌曲相关数据和歌词解析的处理，以及添加榜单中的歌曲至播放列表

```typescript
  // 添加榜单中的歌曲至播放列表
function handleRankingPlay(id:number) {
  dispatch(fetchSongDetailDataAction(id))
}


export const fetchSongDetailDataAction = createAsyncThunk<void, number,IThunkType>('songDetail', (id, { dispatch,getState }) => {

  /**
   * 两种情况
   * 1.歌曲不在播放列表
   * 2.歌曲已在播放列表
   */
  const playSongList = getState().player.playSongList
  const findIndex = playSongList.findIndex(item => item.id === id)
  if (findIndex === -1) {

    getSongDetail(id).then(res => {
      if (!res.songs.length) return
      const newPlaySongList = [...playSongList, res.songs[0]]

      dispatch(changeCurrentSongAction(res.songs[0]))
      dispatch(changePlaySongListAction(newPlaySongList))
      dispatch(changePlaySongIndexAction(findIndex))
    })
  } else {
    const song = playSongList[findIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(findIndex))
   }



  getSongLyric(id).then(res => {
    // 1.获取歌词的字符串
    const lyricString = res.lrc.lyric
    // 2.对歌词进行解析(一个个对象的数组)，parseLyric函数是封装的一个歌词解析工具
    const lyrics = parseLyric(lyricString)
    // 3.将歌词放到state中
    dispatch(changeLyricsAction(lyrics))
   })
})
```



6.不同播放模式下，切换歌曲的处理

```typescript
// playMode 0代表顺序播放，1代表随机播放，2代表单曲循环


/**
 * 不同模式下歌曲切换逻辑
*/
function handleChangeMusic(isNext:boolean) {
    dispatch(changeMusicAction(isNext))
}


export const changeMusicAction = createAsyncThunk<void, boolean, IThunkType>('changeMusic', (isNext: boolean, { dispatch, getState }) => {

  const state = getState()
  const songIndex = state.player.playSongIndex
  const songList = state.player.playSongList
  const playMode = state.player.playMode

  let newIndex = songIndex
  // 随机播放切换时的处理
  if (playMode === 1) {
    let newIndexCopy = Math.floor(Math.random() * songList.length)
    // 随机切换不同歌
    while (newIndex === newIndexCopy) {
      newIndexCopy = Math.floor(Math.random() * songList.length)
    }
    newIndex = newIndexCopy
    dispatch(changeCurrentSongAction(songList[newIndex]))
    dispatch(changePlaySongIndexAction(newIndex))
    getSongLyric(songList[newIndex].id).then(res => {
    // 1.获取歌词的字符串
    const lyricString = res.lrc.lyric
    // 2.对歌词进行解析(一个个对象的数组)
    const lyrics = parseLyric(lyricString)
    // 3.将歌词放到state中
    dispatch(changeLyricsAction(lyrics))
   })
  } else {
    newIndex = isNext ? newIndex + 1 : newIndex - 1
    if (newIndex > songList.length - 1) newIndex = 0
    if (newIndex < 0)  newIndex = songList.length - 1
    dispatch(changeCurrentSongAction(songList[newIndex]))
    dispatch(changePlaySongIndexAction(newIndex))
    getSongLyric(songList[newIndex].id).then(res => {
    // 1.获取歌词的字符串
    const lyricString = res.lrc.lyric
    // 2.对歌词进行解析(一个个对象的数组)
    const lyrics = parseLyric(lyricString)
    // 3.将歌词放到state中
    dispatch(changeLyricsAction(lyrics))
   })
  }
})
```



7.歌曲播放完后的自动处理

```typescript
<audio ref={audioRef} onTimeUpdate={ handleTimeUpdate } onEnded={ handleTimeEnd }/>
    
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
```



8.切换播放模式处理

```typescript
  /**
   * 切换播放模式处理
   */
  function handleChangeLoop() {
    let newPlayMode = playMode + 1
    if (newPlayMode > 2) newPlayMode = 0
    dispatch(changePlayModeAction(newPlayMode))
  }
```

