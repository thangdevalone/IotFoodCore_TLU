import { createSlice } from "@reduxjs/toolkit"

export interface ChatState {
  open:boolean
}

const initialState: ChatState = {
  open:false
}

const chatSlice=createSlice({
  name: "chat",
  initialState,
  reducers: {
    toggleOpen(state){
      state.open=!state.open
    }
  }
})

export const chatActions = chatSlice.actions

const chatReducer = chatSlice.reducer
export default chatReducer