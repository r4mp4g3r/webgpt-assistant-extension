// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const statusMessage = document.getElementById('status-message');
  
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-button');
  
    const regEmailInput = document.getElementById('reg-email');
    const regPasswordInput = document.getElementById('reg-password');
    const registerButton = document.getElementById('register-button');
  
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');
  
    // Toggle between login and register forms
    registerLink.addEventListener('click', () => {
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
    });
  
    loginLink.addEventListener('click', () => {
      registerForm.style.display = 'none';
      loginForm.style.display = 'block';
    });
  
    // Login
    loginButton.addEventListener('click', async () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
  
      if (!email || !password) {
        statusMessage.textContent = 'Please enter email and password.';
        return;
      }
  
      try {
        const res = await fetch('https://your-backend-server.com/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
  
        const data = await res.json();
  
        if (res.ok) {
          chrome.storage.sync.set({ authToken: data.token }, () => {
            statusMessage.textContent = 'Login successful!';
          });
        } else {
          statusMessage.textContent = data.message;
        }
      } catch (error) {
        statusMessage.textContent = 'Error logging in.';
      }
    });
  
    // Register
    registerButton.addEventListener('click', async () => {
      const email = regEmailInput.value.trim();
      const password = regPasswordInput.value.trim();
  
      if (!email || !password) {
        statusMessage.textContent = 'Please enter email and password.';
        return;
      }
  
      try {
        const res = await fetch('https://your-backend-server.com/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
  
        const data = await res.json();
  
        if (res.ok) {
          chrome.storage.sync.set({ authToken: data.token }, () => {
            statusMessage.textContent = 'Registration successful!';
          });
        } else {
          statusMessage.textContent = data.message;
        }
      } catch (error) {
        statusMessage.textContent = 'Error registering.';
      }
    });
  });