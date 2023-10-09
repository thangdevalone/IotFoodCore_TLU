import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface AppSlice {
  width:number
}

const initialState: AppSlice = {
  width:window.innerWidth
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setWidth(state,action:PayloadAction<number>){
      if(!state.width){
        state.width=action.payload
      } if(state.width+20<action.payload || state.width+20>action.payload){
        state.width=action.payload
      }
    }
  }
  
})

export const appActions = appSlice.actions

const appReducer = appSlice.reducer
export default appReducer
