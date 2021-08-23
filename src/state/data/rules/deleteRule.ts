import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export default function deleteRule(
  build: EndpointBuilder<any, 'App' | 'Rule', 'data'>
) {
  return {
    deleteRule: build.mutation<string, number>({
      queryFn: async (id) => {
        return await chrome.declarativeNetRequest
          .updateDynamicRules({
            removeRuleIds: [id],
          })
          .then(() => {
            return { data: 'success' }
          })
          .catch(() => {
            return { error: 'true' }
          })
      },
      invalidatesTags: (result, error, id) => [{ type: 'Rule', id }],
    }),
  }
}
