import { apiSlice } from './apiSlice'
import { issueList, issueItem, Assignee } from '../types/issueType'

interface GetIssueQueryParams {
  name: string
  repo: string
  token: string
  query: string
  perPage: number
  page: number
}

interface QueryParams {
  name: string
  repo: string
  token: string
}

interface CreateIssueParams extends QueryParams {
  body: {
    title: string
    body: string
    labels: string[]
    assignees: string[]
  }
}

export const issueApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllIssue: builder.query<issueList, GetIssueQueryParams>({
      query: ({ name, repo, token, query, perPage, page }) => ({
        url: `/${name}/${repo}/issues?per_page=${perPage}${query}`,
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
          'if-none-match': ''
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
      })
    }),
    createIssue: builder.mutation<issueItem, CreateIssueParams>({
      query: ({ name, repo, body, token }) => ({
        url: `/${name}/${repo}/issues`,
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `token ${token}`
        }),
        body: body
      }),
      invalidatesTags: ['issue']
    })
  })
})

export const {
  useGetAllIssueQuery,
  useGetAllAssigneesQuery,
  useCreateIssueMutation
} = issueApiSlice
