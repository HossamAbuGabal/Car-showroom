const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Tab toggle functionality
if (loginTab && signupTab) {
  loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
  });

  signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  });
}

// Helper: show alert
function showMessage(text) {
  alert(text);
}

// Login form behavior
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        if (data && data.error === 'User not found') {
          showMessage('No account found. Taking you to signup.');
          window.location.href = '/signup';
          return;
        }
        showMessage(data.error || 'Login failed');
        return;
      }

      // Mark as logged in for client UI bits
      localStorage.setItem('isLoggedIn', 'true');
      // Optional: store a minimal profile for header welcome text
      localStorage.setItem('userProfile', JSON.stringify({ email: data.user.email }));

      window.location.href = '/profile';
    } catch (err) {
      console.error(err);
      showMessage('Network error while logging in');
    }
  });
}

// Signup form behavior
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const password = document.getElementById('signupPassword').value;
    const userType = document.getElementById('userType').value;

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phoneNumber, password, userType })
      });

      const data = await res.json();
      if (!res.ok) {
        showMessage(data.error || 'Signup failed');
        return;
      }

      // Auto-login after successful signup
      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const loginData = await loginRes.json();
      if (!loginRes.ok) {
        showMessage('Account created. Please log in.');
        window.location.href = '/login';
        return;
      }

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userProfile', JSON.stringify({ email: loginData.user.email }));

      window.location.href = '/profile';
    } catch (err) {
      console.error(err);
      showMessage('Network error while signing up');
    }
  });
}