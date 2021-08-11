chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request && request.data === 'apiquery') {
    const httpRequest = new XMLHttpRequest()

    httpRequest.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          sendResponse(this.response)
        } else {
          sendResponse('Error')
        }
      }
    }
    httpRequest.open('GET', '/api/v1/users/me/appLinks')
    httpRequest.send()

    return true
  }
})
