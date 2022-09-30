import { apiSlice } from './apiSlice'
import { issueList, Assignee } from '../types/issueType'

interface GetIssueQueryParams {
  name: string
  repo: string
  token: string
  query: string
}

interface QueryParams {
  name: string
  repo: string
  token: string
}

export const issueApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllIssue: builder.query<issueList, GetIssueQueryParams>({
      query: ({ name, repo, token, query }) => ({
        url: `/${name}/${repo}/issues?${query}`,
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `token ${token}`
        })
      }),
      providesTags: ['issue']
    }),
    getAllAssignees: builder.query<Assignee[], QueryParams>({
      query: ({ name, repo, token }) => ({
        url: `/${name}/${repo}/assignees`,
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

export const { useGetAllIssueQuery, useGetAllAssigneesQuery } = issueApiSlice
