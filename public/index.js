async function sayHI() {
  await chrome.tabs.query({ active: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        document.body;
        alert('HELLO SERVICE');
        console.log('HEYLLLO');
      },
    });
  });
}

document.getElementById('myBtn').addEventListener('click', sayHI);
