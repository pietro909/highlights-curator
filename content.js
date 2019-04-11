
console.log("hello");


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request, sender, sendResponse);
    //document.body.append(request.message); //append a DOM node with DOM method
  })

