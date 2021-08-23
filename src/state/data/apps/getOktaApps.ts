import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export default function getOktaApps(
  build: EndpointBuilder<any, 'App' | 'Rule', any>
) {
  return {
    getOktaApps: build.query<OktaApp[], void>({
      query: () => ({ url: '' }),
      providesTags: (result) => [
        ...result.map(({ id }) => ({ type: 'App', id } as const)),
        { type: 'App', id: 'LIST' },
      ],
    }),
  }
}
