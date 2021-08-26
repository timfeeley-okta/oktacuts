import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import getOktaApps from './apps/getOktaApps'
import {
  addRule,
  deleteRule,
  getRules,
  updateRule,
  updateRuleByUrl,
} from './rules'

const dataApi = createApi({
  tagTypes: ['App', 'Rule'],
  reducerPath: 'data',
  baseQuery: fetchBaseQuery({
    method: 'GET',
  }),
  endpoints: build => ({
    ...getOktaApps(build),
    ...addRule(build),
    ...getRules(build),
    ...updateRuleByUrl(build),
    ...updateRule(build),
    ...deleteRule(build),
  }),
})

export default dataApi
export const {
  useGetOktaAppsQuery,
  useLazyGetOktaAppsQuery,
  useAddRuleMutation,
  useDeleteRuleMutation,
  useGetRulesQuery,
  useUpdateRuleByUrlMutation,
  useUpdateRuleMutation,
} = dataApi
