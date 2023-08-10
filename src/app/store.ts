
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./rootSaga"

import authReducer from "@/features/auth/AuthSlice"
import { persistStore } from "redux-persist"

const sagaMiddleware = createSagaMiddleware()

// const persistConfig = {
//   key: 'root', 
//   storage,
//   whitelist: ['auth']
// };


export const store = configureStore({
  reducer: {
    auth:authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
