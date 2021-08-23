import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import { updateRuleByUrl as updateRuleFunction } from '@/lib/chrome'

import api from '../index'

export default function updateRuleByUrl(
  build: EndpointBuilder<any, 'App' | 'Rule', 'data'>
) {
  return {
    updateRuleByUrl: build.mutation<
      Rule,
      { appId: number; rule: Partial<Rule> }
    >({
      queryFn: async ({ rule }) =>
        updateRuleFunction(rule)
          .then((data) => {
            return { data }
          })
          .catch((error) => {
            console.info('ERRRRRR', error)
            return { error }
          }),
      onQueryStarted: async (
        { rule: { shortCode, url, id } },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          api.util.updateQueryData('getRules', void 0, (draft) => {
            const newObj = draft.find((row) => row.url === url)
            newObj.shortCode = shortCode
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: (result, error, { appId, rule: { id } }) => [
        { type: 'Rule', id },
      ],
    }),
  }
}
