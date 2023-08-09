import { authSaga } from "@/features/auth/AuthSaga";
import { all } from "redux-saga/effects";

export default function * rootSaga(){
    yield all([authSaga()])
}