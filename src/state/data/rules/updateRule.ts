import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import { writeChromeRule } from '@/lib/chrome'

export default function updateRule(
  build: EndpointBuilder<any, 'App' | 'Rule', 'data'>
) {
  return {
    updateRule: build.mutation<Rule, { rule: Partial<Rule> }>({
      queryFn: async ({ rule }) =>
        writeChromeRule(rule)
          .then(data => {
            return { data }
          })
          .catch(error => {
            return { error }
          }),
      invalidatesTags: (result, error, { rule: { id } }) => [
        { type: 'Rule', id },
      ],
    }),
  }
}
