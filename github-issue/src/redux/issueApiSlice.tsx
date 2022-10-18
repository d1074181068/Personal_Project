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
export interface UpdateIssueParams extends QueryParams {
  issueNumber: string
  body: {
    title?: string
    body?: string
    labels?: string[]
    assignees?: string[]
    state?: string
    state_reason?: string
  }
}
interface GetIssueQueryParams extends QueryParams {
  query: string
  page: number
}
interface SingleIssueParams extends QueryParams {
  issueId: string
}

interface UpdateCommentParams extends QueryParams {
  commentId: number
  body: { body: string }
}
interface DeleteCommentParams extends QueryParams {
  commentId: number
}

interface CreateCommentParams extends QueryParams {
  issueNumber: string
  body: { body: string }
}

export const issueApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllIssue: builder.query<issueList, GetIssueQueryParams>({
      query: ({ name, repo, token, query, page }) => ({
        url: `/repos/${name}/${repo}/issues?${query}`,
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
        url: `/repos/${name}/${repo}/issues/${issueId}`,
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
        url: `/repos/${name}/${repo}/issues/${issueId}/timeline`,
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
        url: `/repos/${name}/${repo}/assignees`,
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `token ${token}`
        })
      })
    }),
    createIssue: builder.mutation<issueItem, CreateIssueParams>({
      query: ({ name, repo, body, token }) => ({
        url: `/repos/${name}/${repo}/issues`,
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
          url: `/repos/${name}/${repo}/issues/${issueNumber}`,
          method: 'PATCH',
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `token ${token}`
          }),
          body: body
        }
      },
      invalidatesTags: ['issue_id', 'issue']
    }),
    createComment: builder.mutation<Comment, CreateCommentParams>({
      query: ({ name, repo, body, token, issueNumber }) => ({
        url: `/repos/${name}/${repo}/issues/${issueNumber}/comments`,
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `token ${token}`
        }),
        body: body
      }),
      invalidatesTags: ['timeline']
    }),
    updateComment: builder.mutation<Comment, UpdateCommentParams>({
      query: ({ name, repo, token, commentId, body }) => {
        return {
          url: `/repos/${name}/${repo}/issues/comments/${commentId}`,
          method: 'PATCH',
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `token ${token}`
          }),
          body: body
        }
      },
      invalidatesTags: ['timeline']
    }),
    deleteComment: builder.mutation<null, DeleteCommentParams>({
      query: ({ name, repo, commentId, token }) => ({
        url: `/repos/${name}/${repo}/issues/comments/${commentId}`,
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `token ${token}`
        })
      }),
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
  useUpdateIssueMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation
} = issueApiSlice
