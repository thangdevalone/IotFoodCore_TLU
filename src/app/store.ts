
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./rootSaga"
import storage from 'redux-persist/lib/storage';

import { persistReducer, persistStore } from "redux-persist"
import rootReducer from "./rootReducer"

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: 'root', 
  storage,
  whitelist: ['auth','cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer:persistedReducer,
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
