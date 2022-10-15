import { apiSlice } from './apiSlice'
import { configureStore } from '@reduxjs/toolkit'

import queryReducer from './querySlice'
import userReducer from './userSlice'
import issueReducer from './issueSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    queryReducer: queryReducer,
    userReducer: userReducer,
    issueReducer: issueReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware)
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
