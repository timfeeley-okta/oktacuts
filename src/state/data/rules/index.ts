export { default as getRules } from './getRules'
export { default as addRule } from './addRule'
export { default as deleteRule } from './deleteRule'
export { default as updateRule } from './updateRule'
export { default as updateRuleByUrl } from './updateRuleByUrl'

// import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

// import addRule from './addRule'
// import deleteRule from './endpoints/deleteRule'
// import getRules from './endpoints/getRules'
// import updateRule from './endpoints/updateRule'
// import updateRuleByUrl from './endpoints/updateRuleByUrl'

// export type ChromeNativeRule = chrome.declarativeNetRequest.Rule

// export const rulesApi = createApi({
//   baseQuery: fakeBaseQuery(),
//   reducerPath: 'rules',
//   tagTypes: ['Rule'],
//   endpoints: (build) => ({
//     ...addRule(build),
//     ...getRules(build),
//     ...updateRuleByUrl(build),
//     ...updateRule(build),
//     ...deleteRule(build),
//   }),
// })

// export const {
//   useGetRulesQuery,
//   useUpdateRuleByUrlMutation,
//   useAddRuleMutation,
//   useUpdateRuleMutation,
//   useDeleteRuleMutation,
// } = rulesApi
