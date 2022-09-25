import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type LabelsType = {
  color: string
  default: boolean
  description: string | null
  id: number
  name: string
  node_id: string
  url: string
}

interface QueryParams {
  name: string
  repo: string
  token: string
}

interface CreateQueryParams extends QueryParams {
  body: {
    name: string
    color: string
    description: string
  }
  labelName?: string
}

interface DeleteQueryparams extends QueryParams {
  labelName: string
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/repos' }),
  tagTypes: ['labels'],
  endpoints: (builder) => ({
    getLabel: builder.query<LabelsType[], QueryParams>({
      query: ({ name, repo, token }) => ({
        url: `/${name}/${repo}/labels`,
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `token ${token}`
        })
      }),
      providesTags: ['labels']
    }),
    createLabel: builder.mutation<LabelsType, CreateQueryParams>({
      query: ({ name, repo, body, token }) => ({
        url: `/${name}/${repo}/labels`,
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `token ${token}`
        }),
        body: body
      }),
      invalidatesTags: ['labels']
    }),
    updateLabel: builder.mutation<LabelsType, CreateQueryParams>({
      query: ({ name, repo, labelName, body, token }) => ({
        url: `/${name}/${repo}/labels/${labelName}`,
        method: 'PATCH',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `token ${token}`
        }),
        body: body
      }),
      invalidatesTags: ['labels']
    }),
    deleteLabel: builder.mutation<null, DeleteQueryparams>({
      query: ({ name, repo, labelName, token }) => ({
        url: `/${name}/${repo}/labels/${labelName}`,
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `token ${token}`
        })
      }),
      invalidatesTags: ['labels']
    })
  })
})

export const {
  useGetLabelQuery,
  useCreateLabelMutation,
  useUpdateLabelMutation,
  useDeleteLabelMutation
} = apiSlice
