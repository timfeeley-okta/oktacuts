import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { fromChromeNativeRule } from '@/lib/ruleTransform'

export default function getRules(
  build: EndpointBuilder<any, 'App' | 'Rule', 'data'>
) {
  return {
    getRules: build.query<Rule[], void>({
      queryFn: async () => {
        return {
          data: (await chrome.declarativeNetRequest.getDynamicRules())
            .map(fromChromeNativeRule)
            .sort(({ id: x }, { id: y }) => (x < y ? -1 : x > y ? 1 : 0)),
        }
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Rule', id } as const)),
              { type: 'Rule', id: 'LIST' },
            ]
          : [{ type: 'Rule', id: 'LIST' }],
    }),
  }
}
