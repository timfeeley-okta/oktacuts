import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import {
  BaseQueryFn,
  createApi,
  fakeBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { Rule } from '.'
import { fromChromeNativeRule, writeChromeRule } from './helpers'

const writeQuery = (
  build: EndpointBuilder<
    BaseQueryFn<any, unknown, unknown, {}, {}>,
    'Rule',
    'api'
  >
) =>
  build.mutation<Rule, { rule: Partial<Rule> }>({
    queryFn: async ({ rule }) => {
      return writeChromeRule(rule)
        .then((data) => {
          console.log('Here at ', data)
          return { data }
        })
        .catch((error) => {
          return { error }
        })
    },

    invalidatesTags: (result, error, { rule: { id } }) => [
      { type: 'Rule', id },
    ],
  })

export const rulesApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Rule'],
  endpoints: (build) => ({
    getRules: build.query<Rule[], void>({
      queryFn: async () => {
        return {
          data: (await chrome.declarativeNetRequest.getDynamicRules()).map(
            fromChromeNativeRule
          ),
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
    updateRule: writeQuery(build),
    addRule: writeQuery(build),
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
