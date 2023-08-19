import { RecommendFoodData } from "@/models"
import { createSlice,PayloadAction } from "@reduxjs/toolkit"


export interface AdminState {
  isSelected:boolean,
  product: {selected:number,data:RecommendFoodData[]},
}

const initialState: AdminState = {
  isSelected:false,
  product: {selected:0,data:[]},
}

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    selectRowFood(state,action:PayloadAction<RecommendFoodData>){
      if(state.isSelected===false) state.isSelected=true
      state.product.selected+=1
      state.product.data=[...state.product.data,action.payload]
    },
    removeRowFood(state){
      state.isSelected=false
      state.product.selected=0
      state.product.data=[]
    }
    // ...các action khác
  },
})

export const adminActions = adminSlice.actions

const adminReducer = adminSlice.reducer
export default adminReducer
