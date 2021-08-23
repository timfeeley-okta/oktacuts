import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appsApi = createApi({
  reducerPath: 'apps',
  baseQuery: fetchBaseQuery({
    method: 'GET',

    baseUrl: 'https://okta.okta.com/api/v1/users/me/appLinks',
  }),
  tagTypes: ['App'],
  endpoints: (build) => ({
    getOktaApps: build.query<OktaApp[], void>({
      query: () => ({ url: '' }),
      providesTags: (result) => [
        ...result.map(({ id }) => ({ type: 'App', id } as const)),
        { type: 'App', id: 'LIST' },
      ],
    }),
  }),
})
export const { useGetOktaAppsQuery } = appsApi
