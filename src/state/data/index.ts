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
    baseUrl: 'https://okta.okta.com/api/v1/users/me/appLinks',
  }),
  endpoints: (build) => ({
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
  useAddRuleMutation,
  useDeleteRuleMutation,
  useGetRulesQuery,
  useUpdateRuleByUrlMutation,
  useUpdateRuleMutation,
} = dataApi
