import { apiSlice } from './apiSlice'
import {
  issueList,
  issueItem,
  Assignee,
  Timeline,
  Comment
} from '../types/issueType'

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
interface UpdateIssueParams extends QueryParams {
  issueNumber: string
  body: {
    title?: string
    body?: string
    labels?: string[]
    assignees?: string[]
  }
}
interface GetIssueQueryParams extends QueryParams {
  query: string
  page: number
}
interface SingleIssueParams extends QueryParams {
  issueId: string
}

interface CommentParams extends QueryParams {
  commentId: number
  body: { body: string }
}

export const issueApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllIssue: builder.query<issueList, GetIssueQueryParams>({
      query: ({ name, repo, token, query }) => ({
        url: `/${name}/${repo}/issues?${query}`,
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
          'if-none-match': ''
        })
      }),
      providesTags: ['issue']
    }),
    getIssue: builder.query<issueItem, SingleIssueParams>({
      query: ({ name, repo, token, issueId }) => ({
        url: `/${name}/${repo}/issues/${issueId}`,
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
          'if-none-match': ''
        })
      }),
      providesTags: ['issue_id']
    }),
    getTimeline: builder.query<Timeline[], SingleIssueParams>({
      query: ({ name, repo, token, issueId }) => ({
        url: `/${name}/${repo}/issues/${issueId}/timeline`,
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
          'if-none-match': ''
        })
      }),
      providesTags: ['timeline']
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
    }),
    updateIssue: builder.mutation<issueItem, UpdateIssueParams>({
      query: ({ name, repo, token, issueNumber, body }) => {
        return {
          url: `/${name}/${repo}/issues/${issueNumber}`,
          method: 'PATCH',
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `token ${token}`
          }),
          body: body
        }
      },
      invalidatesTags: ['issue_id']
    }),
    updateComment: builder.mutation<Comment, CommentParams>({
      query: ({ name, repo, token, commentId, body }) => {
        return {
          url: `/${name}/${repo}/issues/comments/${commentId}`,
          method: 'PATCH',
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `token ${token}`
          }),
          body: body
        }
      },
      invalidatesTags: ['timeline']
    })
  })
})

export const {
  useGetAllIssueQuery,
  useGetAllAssigneesQuery,
  useCreateIssueMutation,
  useGetIssueQuery,
  useGetTimelineQuery,
  useUpdateCommentMutation,
  useUpdateIssueMutation
} = issueApiSlice
