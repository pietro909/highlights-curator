
var cache = {}

console.info("new cache!")

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    if (activeTab) {
      chrome.tabs.executeScript( {
        code: "window.getSelection().toString();"
      }, function(selection) {
        console.log(selection);
        if (selection) {
          var currentTabCache = cache[activeTab.id] || [];
          currentTabCache.push(selection);
          cache[activeTab.id] = currentTabCache;
        }
      });

    }
  });
});

function finalize(tabCache, tabInfo) {
  chrome.tabs.create({
    active: true,
    url:  chrome.runtime.getURL("index.html")
  }, function(newTab) {
    var d = document.createElement("ul")
    tabCache.map(function(t) {
      var h = document.createElement("li")
      var t = document.createTextNode(t);
      h.appendChild(t);
      d.append(h);
    })
    console.log(d)
    console.log(newTab)
    setTimeout(function() {
      chrome.tabs.sendMessage(newTab.id, {
        "highlights": d.outerHTML,
        "source": tabInfo.url
      });
    }, 3000);
  })
}


/*
 * chrome.tabs.onRemoved.addListener(function(tabId) {
  chrome.tabs.get(tabId, function(tab) {
    var currentTabCache = cache[tabId];
    if (currentTabCache) {
      finalize(currentTabCache, tab);
      delete cache[tabId];
    }
  })
})
*/

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request, sender, sendResponse);
  })

chrome.contextMenus.removeAll();
chrome.contextMenus.create({
  id: "selecti0n",
      title: "submit selection",
  contexts: ["browser_action"]
})

chrome.contextMenus.onClicked.addListener(function() {
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
          var currentTab = tabs[0]
          if (currentTab) {
            var currentTabCache = cache[currentTab.id];
            if (currentTabCache) {
              finalize(currentTabCache, currentTab);
              delete cache[currentTab.id];
            }
          }
        });
});
