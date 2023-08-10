import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LoginForm, RegisterForm, User } from "@/models"

export interface AuthState {
  logging?: boolean
  registering?: boolean
  actionAuth: "No action" | "Success" | "Failed"
  currentUser?: User
  isRehydrating: boolean // Trạng thái khôi phục
}

const initialState: AuthState = {
  logging: false,
  registering: false,
  actionAuth: "No action",
  currentUser: undefined,
  isRehydrating: true, // Khởi tạo là true
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginForm>) {
      state.logging = true
      state.actionAuth = "No action"
    },

    loginSuccess(state, action: PayloadAction<User>) {
      state.logging = false
      state.actionAuth = "Success"
      state.currentUser = action.payload
    },
    loginFailed(state) {
      state.logging = false
      state.actionAuth = "Failed"
    },
    register(state, action: PayloadAction<RegisterForm>) {
      state.registering = true
      state.actionAuth = "No action"
    },
    registerSuccess(state, action: PayloadAction<User>) {
      state.registering = false
      state.actionAuth = "Success"
      state.currentUser = action.payload
    },
    registerFailed(state) {
      state.registering = false
      state.actionAuth = "Failed"
    },
    logout(state) {
      state.logging = false
      state.registering = false
      state.actionAuth = "No action"
      state.currentUser = undefined
    },
    resetAction(state) {
      state.actionAuth = "No action"
    },
    // ...các action khác
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.endsWith("/REHYDRATE"),
      (state) => {
        state.isRehydrating = false
      },
    )
  },
})

export const authActions = authSlice.actions

const authReducer = authSlice.reducer
export default authReducer
