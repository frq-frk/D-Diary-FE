import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { combineReducers } from "redux";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
    user: userReducer,
  });
  
const persistedReducer = persistReducer(persistConfig, reducers)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(logger)
      .concat(thunk)
  },
})

const persistor = persistStore(store)

export { store, persistor }
