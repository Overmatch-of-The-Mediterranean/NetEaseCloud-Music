import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSongDetail, getSongLyric } from "../service";
import { ILyric, parseLyric } from "@/utils/parse-lyric";
import { IRootType } from "@/store";

interface IThunkType {
  state:IRootType
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
    // 2.对歌词进行解析(一个个对象的数组)
    const lyrics = parseLyric(lyricString)
    // 3.将歌词放到state中
    dispatch(changeLyricsAction(lyrics))
   })
})

export const changeMusicAction = createAsyncThunk<void, boolean, IThunkType>('changeMusic', (isNext: boolean, { dispatch, getState }) => {

  const state = getState()
  const songIndex = state.player.playSongIndex
  const songList = state.player.playSongList
  const playMode = state.player.playMode

  let newIndex = songIndex
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

interface IPlayerState {
  currentSong: any,
  lyrics: ILyric[],
  lyricIndex: number,
  playSongList: any[],
  playSongIndex: number,
  playMode:number
 }

const initialState: IPlayerState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1,
  playSongList: [
    {
            "name": "消愁",
            "id": 569200213,
            "pst": 0,
            "t": 0,
            "ar": [
                {
                    "id": 12138269,
                    "name": "毛不易",
                    "tns": [],
                    "alias": []
                }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": null,
            "fee": 8,
            "v": 111,
            "crbt": null,
            "cf": "",
            "al": {
                "id": 39483040,
                "name": "平凡的一天",
                "picUrl": "https://p2.music.126.net/vmCcDvD1H04e9gm97xsCqg==/109951163350929740.jpg",
                "tns": [],
                "pic_str": "109951163350929740",
                "pic": 109951163350929740
            },
            "dt": 261346,
            "h": {
                "br": 320000,
                "fid": 0,
                "size": 10456338,
                "vd": -23774,
                "sr": 44100
            },
            "m": {
                "br": 192000,
                "fid": 0,
                "size": 6273820,
                "vd": -21131,
                "sr": 44100
            },
            "l": {
                "br": 128000,
                "fid": 0,
                "size": 4182561,
                "vd": -19407,
                "sr": 44100
            },
            "sq": {
                "br": 774537,
                "fid": 0,
                "size": 25302837,
                "vd": -23307,
                "sr": 44100
            },
            "hr": null,
            "a": null,
            "cd": "2",
            "no": 4,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 2,
            "s_id": 0,
            "mark": 8192,
            "originCoverType": 1,
            "originSongSimpleData": null,
            "tagPicList": null,
            "resourceState": true,
            "version": 111,
            "songJumpInfo": null,
            "entertainmentTags": null,
            "awardTags": null,
            "single": 0,
            "noCopyrightRcmd": null,
            "rtype": 0,
            "rurl": null,
            "mst": 9,
            "cp": 2708402,
            "mv": 5958062,
            "publishTime": 1530547200007
    },
    {
            "name": "牧马城市（cover毛不易）",
            "id": 1912863933,
            "pst": 0,
            "t": 0,
            "ar": [
                {
                    "id": 51054736,
                    "name": "别动手啊",
                    "tns": [],
                    "alias": []
                }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": "",
            "fee": 0,
            "v": 7,
            "crbt": null,
            "cf": "",
            "al": {
                "id": 139008680,
                "name": "大河向西流",
                "picUrl": "https://p1.music.126.net/Q3RFTIuU7IphQSjXLRQGTQ==/109951166944641164.jpg",
                "tns": [],
                "pic_str": "109951166944641164",
                "pic": 109951166944641170
            },
            "dt": 256881,
            "h": {
                "br": 320000,
                "fid": 0,
                "size": 10277805,
                "vd": -8449,
                "sr": 48000
            },
            "m": {
                "br": 192000,
                "fid": 0,
                "size": 6166701,
                "vd": -5852,
                "sr": 48000
            },
            "l": {
                "br": 128000,
                "fid": 0,
                "size": 4111149,
                "vd": -4242,
                "sr": 48000
            },
            "sq": {
                "br": 1638801,
                "fid": 0,
                "size": 52622289,
                "vd": -8445,
                "sr": 48000
            },
            "hr": null,
            "a": null,
            "cd": "01",
            "no": 1,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 0,
            "s_id": 0,
            "mark": 128,
            "originCoverType": 2,
            "originSongSimpleData": {
                "songId": 542058293,
                "name": "牧马城市",
                "artists": [
                    {
                        "id": 12138269,
                        "name": "毛不易"
                    }
                ],
                "albumMeta": {
                    "id": 37542653,
                    "name": "牧马城市"
                }
            },
            "tagPicList": null,
            "resourceState": true,
            "version": 7,
            "songJumpInfo": null,
            "entertainmentTags": null,
            "awardTags": null,
            "single": 0,
            "noCopyrightRcmd": null,
            "rtype": 0,
            "rurl": null,
            "mst": 9,
            "cp": 0,
            "mv": 0,
            "publishTime": 0
    }
  ],
  playSongIndex: -1,
  playMode:0
}


const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    },
    changePlaySongListAction(state, { payload }) {
      state.playSongList = payload
    },
    changePlaySongIndexAction(state, { payload }) {
      state.playSongIndex = payload
    },
    changePlayModeAction(state, { payload }) {
      state.playMode = payload
     }
  }
})

export const {
  changeCurrentSongAction,
  changeLyricsAction,
  changeLyricIndexAction,
  changePlaySongListAction,
  changePlaySongIndexAction,
  changePlayModeAction
} = playerSlice.actions
export default playerSlice.reducer
