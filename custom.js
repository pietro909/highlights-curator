// document.body.innerHtml = config
//
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("hello custom")
    console.log(request);
    var ul = htmlToElement(request.highlights)
    var div = document.createElement("div")
    var h2 = document.createElement("h2")
    var t = document.createTextNode(request.source);
    h2.appendChild(t);
    div.appendChild(h2)
    div.appendChild(ul)
    document.body.appendChild(div);
  })


/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

