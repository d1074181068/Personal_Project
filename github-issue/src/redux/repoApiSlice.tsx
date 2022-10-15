import { apiSlice } from './apiSlice'
import { Repo } from '../types/repoType'
interface Params {
  name: string
  token: string
}

export const repoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRepo: builder.query<Repo[], Params>({
      query: ({ name, token }) => ({
        url: `/users/${name}/repos`,
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
          'if-none-match': ''
        })
      })
    })
  })
})

export const { useGetAllRepoQuery } = repoApiSlice
