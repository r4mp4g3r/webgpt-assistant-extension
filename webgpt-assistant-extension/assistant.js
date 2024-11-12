// assistant.js
document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const responseDiv = document.getElementById('response');
  
    const urlParams = new URLSearchParams(window.location.search);
    const selectedText = urlParams.get('text') || '';
    const pageUrl = urlParams.get('url') || '';
  
    if (selectedText) {
      userInput.value = selectedText;
    }
  
    sendButton.addEventListener('click', async () => {
      const query = userInput.value.trim();
      if (query.length === 0) return;
  
      responseDiv.innerHTML = '<p>Processing...</p>';
  
      try {
        const authToken = await getAuthToken();
        if (!authToken) {
          responseDiv.innerHTML = '<p>Please log in from the extension popup.</p>';
          return;
        }
  
        const res = await fetch('https://your-backend-server.com/api/assist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ query, url: pageUrl })
        });
  
        if (res.status === 401) {
          responseDiv.innerHTML = '<p>Session expired. Please log in again.</p>';
          return;
        } else if (res.status === 402) {
          responseDiv.innerHTML = '<p>Usage limit reached. Please upgrade your plan.</p>';
          return;
        }
  
        const data = await res.json();
        responseDiv.innerHTML = `<p>${data.response}</p>`;
      } catch (error) {
        responseDiv.innerHTML = `<p>Error: ${error.message}</p>`;
      }
    });
  
    async function getAuthToken() {
      return new Promise((resolve) => {
        chrome.storage.sync.get(['authToken'], (result) => {
          resolve(result.authToken || null);
        });
      });
    }
  });