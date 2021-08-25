import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export default function getOktaApps(
  build: EndpointBuilder<any, 'App' | 'Rule', any>
) {
  return {
    getOktaApps: build.query<OktaApp[], { url: string }>({
      query: ({ url }) => 'https://' + url + '/api/v1/users/me/appLinks',
      transformResponse: res => {
        return res.sort(({ label: x }, { label: y }) =>
          x < y ? -1 : x > y ? 1 : 0
        )
      },
      providesTags: result => {
        if (result) {
          return [
            ...result.map(({ id }) => ({ type: 'App', id } as const)),
            { type: 'App', id: 'LIST' },
          ]
        } else {
          return [{ type: 'App', id: 'LIST' }]
        }
      },
    }),
  }
}
