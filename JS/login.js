const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Tab toggle functionality
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

// Login form behavior
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;

    // For demonstration, we'll create a dummy profile if one doesn't exist
    let userProfile = localStorage.getItem('userProfile');
    if (!userProfile) {
        const profile = {
            name: "Guest User",
            email: email,
            favorites: [],
            wishlist: [],
        };
        localStorage.setItem("userProfile", JSON.stringify(profile));
    }
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'homepage.html';
});


// Signup form behavior
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = signupForm.querySelector('input[type="text"]').value;
  const email = signupForm.querySelector('input[type="email"]').value;

  const profile = {
    name: username,
    email: email,
    favorites: [],
    wishlist: [],
  };
  localStorage.setItem("userProfile", JSON.stringify(profile));
  localStorage.setItem('isLoggedIn', 'true');
  alert("Signup successful!");
  window.location.href = 'homepage.html';
});