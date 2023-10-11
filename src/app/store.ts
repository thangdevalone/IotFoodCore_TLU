
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./rootSaga"
import storage from 'redux-persist/lib/storage';
import { PersistState, PersistedState, createMigrate, persistReducer, persistStore } from "redux-persist"
import rootReducer from "./rootReducer"
import { authSlice } from "@/features/auth/AuthSlice";
import { cartSlice } from "@/components/Common/CartDrawer/CartSlice";

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: 'root', 
  storage,
  debug:import.meta.env.MODE==="development",
  whitelist: ['auth','cart'],
  migrate: async (state: PersistedState,currentVersion:number)=>{
    console.log(state?._persist.version,currentVersion)
    if(state?._persist.version !==currentVersion){
      const newState: any = {...state,_persist:{...state?._persist,version:currentVersion}}
      newState[authSlice.name]=authSlice.getInitialState()
      newState[cartSlice.name]=cartSlice.getInitialState()
      return newState
    }
    else{
      return state
    }

  },
  version:import.meta.env.VITE_APP_VERSION,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer:persistedReducer,
  devTools:import.meta.env.MODE==="development",
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
