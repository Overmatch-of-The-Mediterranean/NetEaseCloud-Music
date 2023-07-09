import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getArtistList, getBanners, getHotRecommends, getNewAlbum, getTopRanking } from "../service/recommend";

export const fetchRecommendDataAction = createAsyncThunk('recommend', (arg, { dispatch }) => {
  getBanners().then((res) => {
    dispatch(changeBannersAction(res.banners))
  })

  getHotRecommends(8).then((res) => {
    dispatch(changeHotRecommendAction(res.result))
   })

  getNewAlbum().then((res) => {
    dispatch(changeNewAlbumAction(res.albums))
  })

  getArtistList(5).then(res => {

    dispatch(changeSettleSingersDataAction(res.artists))
   })

  // 使用extraReducers存储数据的方式
  // return res.banners
})

export const fetchTopRankingDataAction = createAsyncThunk('TopRanking', (arg, { dispatch }) => {
  // 单个获取数据方式
  // getTopRanking(19723756).then(res => {
  //   console.log(res);
  //   dispatch(changeUpRankingAction(res.playlist))
  // })
  // getTopRanking(3779629).then(res => {
  //   console.log(res);
  //   dispatch(changeNewRankingAction(res.playlist))
  // })
  // getTopRanking(2884035).then(res => {
  //   console.log(res);
  //   dispatch(changeOriginRankingAction(res.playlist))
  // })



  // 一起获得数据存入同一个数组中
  // 1. 保证获取全部数据后，一起进行dispatch
  // 2. 保证了获取数据的顺序
  const ids = [19723756, 3779629, 2884035]

  const promises: Promise<any>[] = []
  for (const id of ids) {
    promises.push(getTopRanking(id))
   }

  Promise.all(promises).then(res => {
    const playlists = res.map(item => item.playlist)
    dispatch(changeTopRankingAction(playlists))
   })





 })


interface IRecommendState {
  banners: any[],
  hotRecommends: any[],
  newAlbums: any[],
  // upRanking: any[]
  // newRanking: any[],
  // originRanking: any[]
  playlists: any[],
  settleSingers: any[]

}


const initialState:IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: [],
  // upRanking: [],
  // newRanking: [],
  // originRanking: []

  playlists: [],
  settleSingers:[]
}

export const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAlbumAction(state, { payload }) {
      state.newAlbums = payload
    },
    changeTopRankingAction(state, { payload }) {
      state.playlists = payload
    },
    changeSettleSingersDataAction(state, { payload }) {
      state.settleSingers = payload
    }
    // changeUpRankingAction(state, { payload }) {
    //   state.upRanking = payload
    // },
    // changeNewRankingAction(state, { payload }) {
    //   state.newRanking = payload
    // },
    // changeOriginRankingAction(state, { payload }) {
    //   state.originRanking = payload
    // },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchBannerDataAction.pending, (state, { payload }) => {
  //       console.log('pending');

  //     })
  //     .addCase(fetchBannerDataAction.fulfilled, (state, { payload }) => {
  //       state.banners = payload
  //     })
  //     .addCase(fetchBannerDataAction.rejected, (state, { payload }) => {
  //       console.log('rejected');

  //     })
  // }
})

export const {
  changeBannersAction,
  changeHotRecommendAction,
  changeNewAlbumAction,
  changeTopRankingAction,
  changeSettleSingersDataAction
  // changeUpRankingAction,
  // changeNewRankingAction,
  // changeOriginRankingAction
} = recommendSlice.actions
export default recommendSlice.reducer
