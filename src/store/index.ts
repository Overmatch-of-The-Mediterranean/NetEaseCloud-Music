import { configureStore } from "@reduxjs/toolkit";
import { useSelector,TypedUseSelectorHook, useDispatch, shallowEqual } from 'react-redux'
import counterReducer from './modules/counter'
import recommendReducer from '@/views/discover/c-views/recommend/store/recommend'
import playerReducer from '@/views/player/store/player'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    recommend: recommendReducer,
    player:playerReducer
  }
})

export type IRootType = ReturnType<typeof store.getState>
type IDispatchType = typeof store.dispatch

export const useAppSelector:TypedUseSelectorHook<IRootType> = useSelector
export const useAppDispatch:() => IDispatchType = useDispatch
export const shallowEqualApp = shallowEqual

export default store
