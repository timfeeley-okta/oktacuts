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
            return { error }
          }),
      onQueryStarted: async (
        { rule: { id, shortCode, url } },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          api.util.updateQueryData('getRules', void 0, (draft) => {
            const newObj = draft.find((row) => row.url === url)
            if (newObj) {
              // edit existing rule
              newObj.shortCode = shortCode
            } else {
              // adding a new rule
              draft.push({ id, shortCode, url })
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: (result, error, { rule: { id } }) => [
        { type: 'Rule', id },
      ],
    }),
  }
}
