import History from "@/Router/History"
import authApi from "@/api/authApi"
import StorageKeys from "@/constants/storage-keys"
import { LoginForm, User } from "@/models"

import { PayloadAction } from "@reduxjs/toolkit"
import { call, fork, put, take } from "redux-saga/effects"
import { authActions } from "./AuthSlice"

type ApiResAuth = {
  status: boolean
  type: string
  message: string
  data: User
}

function* handleLogin(payload: LoginForm) {
  try {
    const res: ApiResAuth = yield call(authApi.login, payload)
    const user = res.data
    yield put(authActions.loginSuccess(user))
    localStorage.setItem(StorageKeys.TOKEN, user.token)
    localStorage.setItem(StorageKeys.NAMEUSER, user.accountName)
    History.push("/")
  } catch (error) {
    // Handle the error here
  }
}
function* handleLogout() {
  localStorage.removeItem(StorageKeys.TOKEN)
  localStorage.removeItem(StorageKeys.NAMEUSER)
  yield put(authActions.logout())
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem(StorageKeys.TOKEN))

    if (!isLoggedIn) {
      const action: PayloadAction<LoginForm> = yield take(
        authActions.login.type,
      )
      yield fork(handleLogin, action.payload)
    }

    yield take(authActions.logout.type)
    yield call(handleLogout)
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow)
}
