import { LoginForm, RegisterForm, User } from "@/models"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface AuthState {
  isLoggedIn: boolean
  logging?: boolean
  registering?: boolean
  actionAuth: "No action" | "Success" | "Failed"
  currentUser?: User
}
const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  registering: false,
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
      state.isLoggedIn = false
      state.actionAuth = "Failed"
    },
    register(state, action: PayloadAction<RegisterForm>) {
      state.registering = true
    },
    registerSuccess(state, action: PayloadAction<User>) {
      state.registering = false
      state.isLoggedIn = true
      state.actionAuth = "Success"
      state.currentUser = action.payload
    },
    registerFailed(state) {
      state.registering = false
      state.actionAuth = "Failed"
    },
    logout(state) {
      state = {
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
