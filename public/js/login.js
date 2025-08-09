// DOM Elements
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loadingSpinner = document.getElementById('loadingSpinner');
const messageContainer = document.getElementById('messageContainer');
const messageText = document.getElementById('messageText');

// Tab toggle functionality
loginTab.addEventListener('click', () => {
  loginTab.classList.add('active');
  signupTab.classList.remove('active');
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
  hideMessage();
});

signupTab.addEventListener('click', () => {
  signupTab.classList.add('active');
  loginTab.classList.remove('active');
  signupForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
  hideMessage();
});

// Utility functions
function showLoading() {
  loadingSpinner.classList.remove('hidden');
}

function hideLoading() {
  loadingSpinner.classList.add('hidden');
}

function showMessage(message, type = 'success') {
  messageContainer.classList.remove('hidden');
  messageContainer.querySelector('.message-content').className = `message-content ${type}`;
  messageContainer.querySelector('i').className = type === 'success' ? 'bx bx-check-circle' : 'bx bx-error-circle';
  messageText.textContent = message;
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    hideMessage();
  }, 5000);
}

function hideMessage() {
  messageContainer.classList.add('hidden');
}

function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const button = input.parentElement.querySelector('.toggle-password i');
  
  if (input.type === 'password') {
    input.type = 'text';
    button.className = 'bx bx-hide';
  } else {
    input.type = 'password';
    button.className = 'bx bx-show';
  }
}

// Form validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function validatePhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Login form behavior
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  
  // Validation
  if (!email || !password) {
    showMessage('Please fill in all fields', 'error');
    return;
  }
  
  if (!validateEmail(email)) {
    showMessage('Please enter a valid email address', 'error');
    return;
  }
  
  showLoading();
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      showMessage(data.message || 'Login successful!', 'success');
      
      // Store user data in localStorage for frontend use
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('isLoggedIn', 'true');
      
      // Redirect to homepage after a short delay
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } else {
      showMessage(data.error || 'Login failed', 'error');
    }
  } catch (error) {
    console.error('Login error:', error);
    showMessage('Network error. Please check your connection.', 'error');
  } finally {
    hideLoading();
  }
});

// Signup form behavior
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const firstName = document.getElementById('signupFirstName').value.trim();
  const lastName = document.getElementById('signupLastName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const phoneNumber = document.getElementById('signupPhone').value.trim();
  const password = document.getElementById('signupPassword').value;
  const agreeTerms = document.getElementById('agreeTerms').checked;
  
  // Validation
  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    showMessage('Please fill in all fields', 'error');
    return;
  }
  
  if (!validateEmail(email)) {
    showMessage('Please enter a valid email address', 'error');
    return;
  }
  
  if (!validatePassword(password)) {
    showMessage('Password must be at least 6 characters long', 'error');
    return;
  }
  
  if (!validatePhone(phoneNumber)) {
    showMessage('Please enter a valid phone number', 'error');
    return;
  }
  
  if (!agreeTerms) {
    showMessage('Please agree to the Terms & Conditions', 'error');
    return;
  }
  
  showLoading();
  
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        firstName, 
        lastName, 
        email, 
        phoneNumber, 
        password 
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      showMessage(data.message || 'Account created successfully!', 'success');
      
      // Store user data in localStorage for frontend use
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('isLoggedIn', 'true');
      
      // Switch to login tab after successful signup
      setTimeout(() => {
        loginTab.click();
        document.getElementById('loginEmail').value = email;
        showMessage('Please login with your new account', 'success');
      }, 2000);
    } else {
      showMessage(data.error || 'Signup failed', 'error');
    }
  } catch (error) {
    console.error('Signup error:', error);
    showMessage('Network error. Please check your connection.', 'error');
  } finally {
    hideLoading();
  }
});

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const user = localStorage.getItem('user');
  
  if (isLoggedIn === 'true' && user) {
    try {
      const userData = JSON.parse(user);
      if (userData.email) {
        // User is already logged in, redirect to homepage
        window.location.href = '/';
      }
    } catch (error) {
      // Invalid user data, clear it
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    }
  }
});

// Add some nice animations and interactions
document.addEventListener('DOMContentLoaded', () => {
  // Add focus effects to inputs
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.style.transform = 'scale(1)';
    });
  });
  
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  button {
    position: relative;
    overflow: hidden;
  }
`;
document.head.appendChild(style);