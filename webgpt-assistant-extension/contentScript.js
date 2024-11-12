// contentScript.js
(() => {
    let selectedText = '';
    let assistantIcon = null;
  
    document.addEventListener('mouseup', (event) => {
      selectedText = window.getSelection().toString().trim();
      if (selectedText.length > 0) {
        showAssistantIcon(event.pageX, event.pageY);
      } else {
        removeAssistantIcon();
      }
    });
  
    function showAssistantIcon(x, y) {
      removeAssistantIcon();
      assistantIcon = document.createElement('img');
      assistantIcon.src = chrome.runtime.getURL('icons/assistant.png');
      assistantIcon.id = 'webgpt-assistant-icon';
      assistantIcon.style.position = 'absolute';
      assistantIcon.style.top = `${y + 10}px`;
      assistantIcon.style.left = `${x + 10}px`;
      assistantIcon.style.width = '24px';
      assistantIcon.style.height = '24px';
      assistantIcon.style.cursor = 'pointer';
      assistantIcon.style.zIndex = 10000;
      document.body.appendChild(assistantIcon);
  
      assistantIcon.addEventListener('click', () => {
        chrome.runtime.sendMessage({
          action: 'openAssistant',
          text: selectedText,
          pageUrl: window.location.href
        });
      });
    }
  
    function removeAssistantIcon() {
      if (assistantIcon) {
        assistantIcon.remove();
        assistantIcon = null;
      }
    }
  })();