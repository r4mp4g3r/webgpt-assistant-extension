// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openAssistant') {
      chrome.windows.create({
        url: chrome.runtime.getURL(`assistant.html?text=${encodeURIComponent(message.text)}&url=${encodeURIComponent(message.pageUrl)}`),
        type: 'popup',
        width: 400,
        height: 600
      });
    }
  });