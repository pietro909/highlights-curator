
console.log("hello");

// TODO: make clean
document.addEventListener("mouseup", () => {
  var selection = window.getSelection().toString();
  if (selection) {
    chrome.extension.sendMessage(
      { "cmd" : "text_selected", "data" : selection },
    )
  }
})

