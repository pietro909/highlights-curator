// document.body.innerHtml = config
//
chrome.runtime.onMessage.addListener(({ highlights, source }) => {
  const ul = document.createElement("ul")
  highlights.map(function(selection) {
    const h = document.createElement("li")
    const t = document.createTextNode(selection)
    h.appendChild(t)
    ul.append(h)
  })
  const div = document.createElement("div")
  const h2 = document.createElement("h2")
  const t = document.createTextNode(source.title)
  const link = document.createElement("a")
  link.href = source.url
  h2.appendChild(t)
  link.appendChild(h2)
  div.appendChild(link)
  div.appendChild(ul)
  document.getElementById("container").appendChild(div)
})

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
  const template = document.createElement("template")
  html = html.trim() // Never return a text node of whitespace as the result
  template.innerHTML = html
  return template.content.firstChild
}
