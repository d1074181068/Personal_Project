import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
  tagTypes: ['labels', 'issue', 'issue_id', 'timeline'],
  endpoints: (build) => ({})
})
