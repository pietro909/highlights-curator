chrome.runtime.onMessage.addListener(({ highlights, source }) => {
  const ul = document.createElement("ul")
  highlights.map(function(selection) {
    const h = document.createElement("li")
    const t = document.createTextNode(decodeURIComponent(selection))
    h.appendChild(t)
    ul.append(h)
  })

  const div = document.createElement("div")

  const date = new Date(source.date).toLocaleString()
  const dateDOM = document.createElement("h3")
  dateDOM.appendChild(document.createTextNode(date))

  const h2 = document.createElement("h2")
  h2.appendChild(document.createTextNode(source.title))
  const titleDOM = document.createElement("a")
  titleDOM.href = source.url
  titleDOM.appendChild(h2)

  div.appendChild(dateDOM)
  div.appendChild(titleDOM)
  div.appendChild(ul)

  document.getElementById("container").appendChild(div)
})
