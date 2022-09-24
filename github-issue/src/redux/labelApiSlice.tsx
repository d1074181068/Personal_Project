import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type LabelsArrType = {
  color: string
  default: boolean
  description: string | null
  id: number
  name: string
  node_id: string
  url: string
}[]

type QueryParams = {
  name: string
  repo: string
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/repos' }),
  endpoints: (builder) => ({
    getLabel: builder.query<LabelsArrType, QueryParams>({
      query: ({ name, repo }) => ({
        url: `/${name}/${repo}/labels`,
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
    })
  })
})

export const { useGetLabelQuery } = apiSlice
