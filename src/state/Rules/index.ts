import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { fromChromeNativeRule, writeChromeRule } from './helpers'
export type Rule = {
  id: number
  shortCode: string
  url: string
}
export type ChromeNativeRule = chrome.declarativeNetRequest.Rule

const writeQueryFn: any = async ({ rule }) => {
  return writeChromeRule(rule)
    .then((data) => {
      return { data }
    })
    .catch((error) => {
      return { error }
    })
}

export const rulesApi = createApi({
  baseQuery: fakeBaseQuery(),
  reducerPath: 'rules',
  tagTypes: ['Rule'],
  endpoints: (build) => ({
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
    updateRule: build.mutation<Rule, { rule: Partial<Rule> }>({
      queryFn: writeQueryFn,
      invalidatesTags: (result, error, { rule: { id } }) => [
        { type: 'Rule', id },
      ],
    }),
    addRule: build.mutation<Rule, { rule: Partial<Rule> }>({
      queryFn: writeQueryFn,
      invalidatesTags: () => [{ type: 'Rule', id: 'LIST' }],
    }),
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
  }),
})

export const {
  useGetRulesQuery,
  useAddRuleMutation,
  useUpdateRuleMutation,
  useDeleteRuleMutation,
} = rulesApi
