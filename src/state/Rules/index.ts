export { rulesApi } from './api'
import { rulesApi } from './api'

export type Rule = {
  id: number
  shortCode: string
  url: string
}
export type ChromeNativeRule = chrome.declarativeNetRequest.Rule

export const {
  useGetRulesQuery,
  useAddRuleMutation,
  useUpdateRuleMutation,
  useDeleteRuleMutation,
} = rulesApi
