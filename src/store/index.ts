import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './modules/counter'
import { useSelector,TypedUseSelectorHook, useDispatch, shallowEqual } from 'react-redux'


const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

type IRootType = ReturnType<typeof store.getState>
type IDispatchType = typeof store.dispatch

export const useAppSelector:TypedUseSelectorHook<IRootType> = useSelector
export const useAppDispatch:() => IDispatchType = useDispatch
export const shallowEqualApp = shallowEqual

export default store
