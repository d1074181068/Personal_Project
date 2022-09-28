import { apiSlice } from './apiSlice'
import { issueList } from '../types/issueType'

interface QueryParams {
  name: string
  repo: string
  token: string
}

export const issueApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllIssue: builder.query<issueList, QueryParams>({
      query: ({ name, repo, token }) => ({
        url: `/${name}/${repo}/issues`,
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `token ${token}`
        })
      }),
      providesTags: ['issue']
    })
  })
})

export const { useGetAllIssueQuery } = issueApiSlice
