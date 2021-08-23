export const re_js_rfc3986_URI =
  /^[A-Za-z][A-Za-z0-9+\-.]*:(?:\/\/(?:(?:[A-Za-z0-9\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\.[A-Za-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\/(?:(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\?(?:[A-Za-z0-9\-._~!$&'()*+,;=:@\/?]|%[0-9A-Fa-f]{2})*)?(?:\#(?:[A-Za-z0-9\-._~!$&'()*+,;=:@\/?]|%[0-9A-Fa-f]{2})*)?$/
export const re_alpha_numeric = /^([A-z0-9-])+$/

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
export const updateUrlByShortcode = async ({
  url,
  shortCode,
}: Partial<Rule>) => {
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
