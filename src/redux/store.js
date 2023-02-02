import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const store = configureStore({
    reducer : {
        user : userReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        }).concat(logger).concat(thunk)
    },
})

export default store;