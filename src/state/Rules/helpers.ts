import { ChromeNativeRule, Rule } from './index'

export const writeChromeRule = async (rule: Partial<Rule>) => {
  return new Promise<Rule>((resolve, reject) => {
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
        .catch((reason) => reject(reason))
    })
  })
}

export const toChromeNativeRule = (rule: Rule): ChromeNativeRule => {
  return {
    id: rule.id,
    priority: rule.id,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
      redirect: {
        url: rule.url,
      },
    },
    condition: {
      urlFilter: toUrlFilterFormat(rule.shortCode),
    },
  }
}

export const fromChromeNativeRule = (rule: ChromeNativeRule): Rule => {
  return {
    id: rule.id,
    url: rule.action.redirect.url,
    shortCode: fromUrlFilterFormat(rule.condition.urlFilter),
  }
}

export const toUrlFilterFormat = (url: string) => '||' + url + '/|'
export const fromUrlFilterFormat = (url: string) =>
  url.substr(2, url.length - 4)

// const alphaSort = (a: Rule, b: Rule) => {
//   let x = a.shortCode
//   let y = b.shortCode

//   if (typeof x == 'string') {
//     x = ('' + x).toLowerCase()
//   }
//   if (typeof y == 'string') {
//     y = ('' + y).toLowerCase()
//   }

//   return x < y ? -1 : x > y ? 1 : 0
// }
