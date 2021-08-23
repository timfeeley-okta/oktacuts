import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import { addChromeRule } from '@/lib/chrome'

export default function addRule(
  build: EndpointBuilder<any, 'App' | 'Rule', 'data'>
) {
  return {
    addRule: build.mutation<Rule, { rule: Partial<Rule> }>({
      queryFn: async ({ rule }) =>
        addChromeRule(rule)
          .then((data) => {
            return { data }
          })
          .catch((error) => {
            return { error }
          }),
      invalidatesTags: () => [{ type: 'Rule', id: 'LIST' }],
    }),
  }
}
