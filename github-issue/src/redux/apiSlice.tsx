import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from './store'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userReducer.token
      headers.set('if-none-match', '')
      headers.set('Content-Type', 'application/json')
      headers.set('Authorization', 'Bearer ' + token)
      return headers
    }
  }),
  tagTypes: ['labels', 'issue', 'issue_id', 'timeline'],
  endpoints: (build) => ({})
})
