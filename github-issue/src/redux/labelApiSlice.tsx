import { apiSlice } from './apiSlice'
export type LabelsType = {
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

export const labelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLabel: builder.query<LabelsType[], QueryParams>({
      query: ({ name, repo }) => ({
        url: `/repos/${name}/${repo}/labels`,
        method: 'GET'
      }),
      providesTags: ['labels']
    }),
    createLabel: builder.mutation<LabelsType, CreateQueryParams>({
      query: ({ name, repo, body }) => ({
        url: `/repos/${name}/${repo}/labels`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['labels']
    }),
    updateLabel: builder.mutation<LabelsType, CreateQueryParams>({
      query: ({ name, repo, labelName, body }) => ({
        url: `/repos/${name}/${repo}/labels/${labelName}`,
        method: 'PATCH',
        body: body
      }),
      invalidatesTags: ['labels']
    }),
    deleteLabel: builder.mutation<null, DeleteQueryparams>({
      query: ({ name, repo, labelName }) => ({
        url: `/repos/${name}/${repo}/labels/${labelName}`,
        method: 'DELETE'
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
} = labelApiSlice
