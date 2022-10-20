import {
  Assignee,
  Comment,
  issueItem,
  issueList,
  Timeline
} from '../types/issueType'
import { apiSlice } from './apiSlice'

interface QueryParams {
  name: string
  repo: string
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
      query: ({ name, repo, query, page }) => ({
        url: `/repos/${name}/${repo}/issues?${query}`,
        method: 'GET'
      }),
      providesTags: ['issue']
    }),
    getIssue: builder.query<issueItem, SingleIssueParams>({
      query: ({ name, repo, issueId }) => ({
        url: `/repos/${name}/${repo}/issues/${issueId}`,
        method: 'GET'
      }),
      providesTags: ['issue_id']
    }),
    getTimeline: builder.query<Timeline[], SingleIssueParams>({
      query: ({ name, repo, issueId }) => ({
        url: `/repos/${name}/${repo}/issues/${issueId}/timeline`,
        method: 'GET'
      }),
      providesTags: ['timeline']
    }),
    getAllAssignees: builder.query<Assignee[], QueryParams>({
      query: ({ name, repo }) => ({
        url: `/repos/${name}/${repo}/assignees`,
        method: 'GET'
      })
    }),
    createIssue: builder.mutation<issueItem, CreateIssueParams>({
      query: ({ name, repo, body }) => ({
        url: `/repos/${name}/${repo}/issues`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['issue']
    }),
    updateIssue: builder.mutation<issueItem, UpdateIssueParams>({
      query: ({ name, repo, issueNumber, body }) => {
        return {
          url: `/repos/${name}/${repo}/issues/${issueNumber}`,
          method: 'PATCH',
          body: body
        }
      },
      invalidatesTags: ['issue_id', 'issue']
    }),
    createComment: builder.mutation<Comment, CreateCommentParams>({
      query: ({ name, repo, body, issueNumber }) => ({
        url: `/repos/${name}/${repo}/issues/${issueNumber}/comments`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['timeline']
    }),
    updateComment: builder.mutation<Comment, UpdateCommentParams>({
      query: ({ name, repo, commentId, body }) => {
        return {
          url: `/repos/${name}/${repo}/issues/comments/${commentId}`,
          method: 'PATCH',
          body: body
        }
      },
      invalidatesTags: ['timeline']
    }),
    deleteComment: builder.mutation<null, DeleteCommentParams>({
      query: ({ name, repo, commentId }) => ({
        url: `/repos/${name}/${repo}/issues/comments/${commentId}`,
        method: 'DELETE'
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
