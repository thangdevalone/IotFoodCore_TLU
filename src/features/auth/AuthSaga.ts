import History from "@/Router/History"
import authApi from "@/api/authApi"
import StorageKeys from "@/constants/storage-keys"
import { LoginForm, RegisterForm, User } from "@/models"

import { PayloadAction } from "@reduxjs/toolkit"
import { call, delay, put, takeLatest } from "redux-saga/effects"
import { authActions } from "./AuthSlice"

type ApiResAuth = {
  status: boolean
  type: string
  message: string
  data: User
}

function* handleLogin(action: PayloadAction<LoginForm>) {
  try {
    const res: ApiResAuth = yield call(authApi.login, action.payload)
    const user = res.data
    yield put(authActions.loginSuccess(user))
    localStorage.setItem(StorageKeys.TOKEN, user.token)
    localStorage.setItem(StorageKeys.NAMEUSER, user.accountName)
    localStorage.setItem(StorageKeys.USER, JSON.stringify(user))
    History.push("/")
  } catch (error) {
    // Handle the error here
    yield put(authActions.loginFailed())
    yield delay(100)
    yield put(authActions.resetAction())
  }
}
function* handleRegister(action: PayloadAction<RegisterForm>) {
  try {
    const res: ApiResAuth = yield call(authApi.register, action.payload)
    const user = res.data
    yield put(authActions.registerSuccess(user))
    localStorage.setItem(StorageKeys.TOKEN, user.token)
    localStorage.setItem(StorageKeys.NAMEUSER, user.accountName)
    localStorage.setItem(StorageKeys.USER, JSON.stringify(user))
    History.push("/")
  } catch (error) {
    // Handle the error here
    yield put(authActions.registerFailed())
    yield delay(100)
    yield put(authActions.resetAction())
  }
}
function* handleLogout() {
  localStorage.removeItem(StorageKeys.TOKEN)
  localStorage.removeItem(StorageKeys.NAMEUSER)
  localStorage.removeItem(StorageKeys.USER)
}

export function* authSaga() {
  yield takeLatest(authActions.login.type, handleLogin)
  yield takeLatest(authActions.register.type, handleRegister)
  yield takeLatest(authActions.logout.type, handleLogout)
}
