import {
  fromChromeNativeRule,
  toChromeNativeRule,
  toUrlFilterFormat,
} from './ruleTransform'

import { re_js_rfc3986_URI } from './validation'

export const addChromeRule = async (rule: Partial<Rule>) => {
  return new Promise<Rule>((resolve, reject) => {
    try {
      chrome.declarativeNetRequest.getDynamicRules().then((rules) => {
        // Generate an ID one greater than the current max
        const id =
          Math.max.apply(
            Math,
            rules.map((o) => o.id)
          ) + 1

        writeChromeRule({
          id,
          ...rule,
        })
          .then((newRule) => resolve(newRule as Rule))
          .catch((reason) => reject(reason))
      })
    } catch (err) {
      reject(err)
    }
  })
}

export const writeChromeRule = async (rule: Partial<Rule>) => {
  return new Promise<Rule>((resolve, reject) => {
    if (rule.url && !re_js_rfc3986_URI.test(rule.url)) {
      reject('Please enter a valid URL (including `http://`)')
    }

    chrome.declarativeNetRequest.getDynamicRules().then((matchedRules) => {
      matchedRules.filter(
        (match) =>
          // existing rules with the same shortCode
          (match.condition.urlFilter === toUrlFilterFormat(rule.shortCode) &&
            match.id !== rule.id) ||
          // the current rule (to fill the partial Rule we may get)
          match.id === rule.id
      )

      const duplicateRules = matchedRules.filter(
        (match) =>
          match.condition.urlFilter === toUrlFilterFormat(rule.shortCode) &&
          match.id !== rule.id
      )
      if (duplicateRules.length > 0) {
        reject(rule.shortCode + ' is already in use')
        return
      }

      const existingRule = matchedRules.find((match) => match.id === rule.id)
      const newRule = {
        ...(existingRule && fromChromeNativeRule(existingRule)),
        ...rule,
      }

      chrome.declarativeNetRequest
        .updateDynamicRules({
          addRules: [toChromeNativeRule(newRule as Rule)],
          ...(existingRule && { removeRuleIds: [existingRule.id] }),
        })
        .then(() => resolve(newRule as Rule))
        .catch((reason) => reject(reason.message))
    })
  })
}

export const updateRuleByUrl = async ({ url, shortCode }: Partial<Rule>) => {
  return new Promise<Rule>((resolve, reject) => {
    chrome.declarativeNetRequest.getDynamicRules().then((matchedRules) => {
      const existingRule = matchedRules.find(
        (match) => match.action.redirect.url === url
      )

      if (!existingRule) {
        addChromeRule({
          shortCode,
          url,
        })
          .then((newRule) => resolve(newRule as Rule))
          .catch((reason) => reject(reason))
      } else {
        const newRule = {
          ...existingRule,
          shortCode,
          url,
        }

        chrome.declarativeNetRequest
          .updateDynamicRules({
            ...(shortCode && {
              addRules: [toChromeNativeRule(newRule as Rule)],
            }),
            ...(existingRule && { removeRuleIds: [existingRule.id] }),
          })
          .then(() => resolve(newRule as Rule))
          .catch((reason) => reject(reason.message))
      }
    })
  })
}
