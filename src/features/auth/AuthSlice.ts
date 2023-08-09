import { LoginForm, User } from "@/models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthState {
  isLoggedIn: boolean
  logging?: boolean
  actionAuth: "No action" | "Success" | "Failed"
  currentUser?: User
}
const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  actionAuth: "No action",
  currentUser: undefined,
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginForm>) {
      state.logging = true
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.logging = false
      state.isLoggedIn = true
      state.actionAuth = "Success"
      state.currentUser = action.payload
    },
    loginFailed(state) {
      state.logging = false
      state.actionAuth = "Failed"
      state.isLoggedIn = false
    },

    logout(state) {
      state={
        isLoggedIn: false,
        logging: false,
        actionAuth: "No action",
        currentUser: undefined,
      }
      
    },
  },
})

export const authActions = authSlice.actions

const authReducer = authSlice.reducer
export default authReducer
