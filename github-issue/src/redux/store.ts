import { apiSlice } from './apiSlice'
import { configureStore } from '@reduxjs/toolkit'

import queryReducer from './querySlice'
import tokenReducer from './tokenSlice'
import newIssueReducer from './newIssueSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    queryReducer: queryReducer,
    tokenReducer: tokenReducer,
    newIssueReducer: newIssueReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware)
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
