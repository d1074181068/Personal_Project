import { Repo } from '../types/repoType'
import { apiSlice } from './apiSlice'
interface Params {
  name: string
}

export const repoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRepo: builder.query<Repo[], Params>({
      query: ({ name }) => ({
        url: `/users/${name}/repos`,
        method: 'GET'
      })
    })
  })
})

export const { useGetAllRepoQuery } = repoApiSlice
