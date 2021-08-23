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
