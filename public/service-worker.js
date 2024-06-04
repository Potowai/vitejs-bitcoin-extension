chrome.action.onClicked.addListener( tab => {
  chrome.scripting.executeScript({
      target: { tabId : tab.id },
      func : () => {
          alert("HELLO SERVICE");
          console.log("HEYLLLO")
      }
  })
});