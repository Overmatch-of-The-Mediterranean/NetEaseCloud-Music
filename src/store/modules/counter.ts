import { createSlice,PayloadAction } from '@reduxjs/toolkit'

interface IState {
  counter: number,
  name: string,
  age:number
}

const initialState:IState = {
    counter: 100,
    name: 'tom',
    age:18
  }

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeName(state, { payload }:PayloadAction<string>) {
      state.name = payload
     }
  }
})


export const { changeName } = counterSlice.actions
export default counterSlice.reducer
