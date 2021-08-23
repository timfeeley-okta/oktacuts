import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  fromChromeNativeRule,
  writeChromeRule,
  addChromeRule,
  updateUrlByShortcode,
} from './helpers'

export type ChromeNativeRule = chrome.declarativeNetRequest.Rule

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
    updateUrlByShortcode: build.mutation<Rule, { rule: Partial<Rule> }>({
      queryFn: async ({ rule }) =>
        updateUrlByShortcode(rule)
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
    updateRule: build.mutation<Rule, { rule: Partial<Rule> }>({
      queryFn: async ({ rule }) =>
        writeChromeRule(rule)
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
  useUpdateUrlByShortcodeMutation,
  useAddRuleMutation,
  useUpdateRuleMutation,
  useDeleteRuleMutation,
} = rulesApi
