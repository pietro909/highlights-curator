const cache = {}

console.info("new cache!")

/**
 * Prevents the access to chrome:// urls
 */
function isForbiddenUrl(url) {
  return /^chrome:\/\/.*/.test(url)
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!sender.tab) {
    // ignore non-tab messages
    return
  }

  switch (request.cmd) {
    case "text_selected":
      const currentTabCache = cache[sender.tab.id] || []
      currentTabCache.push(request.data)
      cache[sender.tab.id] = currentTabCache
      break
    default:
      console.error(`Unknown command ${request.cmd}`)
  }
})

chrome.browserAction.onClicked.addListener(currentTab => {
  const currentTabCache = cache[currentTab.id]
  if (currentTabCache) {
    finalize(currentTabCache, currentTab)
    delete cache[currentTab.id]
  }
})

function finalize(tabCache, tabInfo) {
  chrome.tabs.create(
    {
      active: true,
      url: chrome.runtime.getURL("index.html"),
    },
    newTab => {
      setTimeout(
        () =>
          chrome.tabs.sendMessage(newTab.id, {
            highlights: tabCache,
            source: {
              url: tabInfo.url,
              title: tabInfo.title,
              date: Date.now(),
            },
          }),
        500,
      )
    },
  )
}
