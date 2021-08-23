import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import { updateRuleByUrl as updateRuleFunction } from '@/lib/chrome'

export default function updateRuleByUrl(
  build: EndpointBuilder<any, 'App' | 'Rule', 'data'>
) {
  return {
    updateRuleByUrl: build.mutation<Rule, { rule: Partial<Rule> }>({
      queryFn: async ({ rule }) =>
        updateRuleFunction(rule)
          .then((data) => {
            return { data }
          })
          .catch((error) => {
            return { error }
          }),
      invalidatesTags: (result, error, { rule: { id } }) => [
        { type: 'Rule', id },
      ],
    }),
  }
}
