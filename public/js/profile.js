// DOM Elements
const loadingSpinner = document.getElementById('loadingSpinner');
const messageContainer = document.getElementById('messageContainer');
const messageText = document.getElementById('messageText');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

// Profile elements
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const favoritesCount = document.getElementById('favoritesCount');
const wishlistCount = document.getElementById('wishlistCount');
const memberSince = document.getElementById('memberSince');

// Form elements
const personalForm = document.getElementById('personalForm');
const addressForm = document.getElementById('addressForm');
const preferencesForm = document.getElementById('preferencesForm');

// Check if user is logged in
document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const user = localStorage.getItem('user');
  
  if (!isLoggedIn || !user) {
    // User is not logged in, redirect to login
    window.location.href = '/login';
    return;
  }
  
  // Load user profile
  loadUserProfile();
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

// Tab switching functionality
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetTab = button.getAttribute('data-tab');
    
    // Remove active class from all tabs and panes
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding pane
    button.classList.add('active');
    document.getElementById(targetTab).classList.add('active');
  });
});

// Load user profile
async function loadUserProfile() {
  showLoading();
  
  try {
    const response = await fetch('/api/auth/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      const user = data.user;
      
      // Update profile header
      profileName.textContent = `${user.firstName} ${user.lastName}`;
      profileEmail.textContent = user.email;
      
      // Update stats
      favoritesCount.textContent = user.favorites ? user.favorites.length : 0;
      wishlistCount.textContent = user.wishlist ? user.wishlist.length : 0;
      
      // Calculate days since registration
      const createdAt = new Date(user.createdAt);
      const now = new Date();
      const daysSince = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
      memberSince.textContent = daysSince;
      
      // Populate forms
      populatePersonalForm(user);
      populateAddressForm(user);
      populatePreferencesForm(user);
      
    } else {
      const errorData = await response.json();
      showMessage(errorData.error || 'Failed to load profile', 'error');
      
      if (response.status === 401) {
        // User not authenticated, redirect to login
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        window.location.href = '/login';
      }
    }
  } catch (error) {
    console.error('Load profile error:', error);
    showMessage('Network error. Please check your connection.', 'error');
  } finally {
    hideLoading();
  }
}

// Populate personal form
function populatePersonalForm(user) {
  document.getElementById('firstName').value = user.firstName || '';
  document.getElementById('lastName').value = user.lastName || '';
  document.getElementById('email').value = user.email || '';
  document.getElementById('phone').value = user.phoneNumber || '';
}

// Populate address form
function populateAddressForm(user) {
  if (user.address) {
    document.getElementById('street').value = user.address.street || '';
    document.getElementById('city').value = user.address.city || '';
    document.getElementById('state').value = user.address.state || '';
    document.getElementById('zipCode').value = user.address.zipCode || '';
    document.getElementById('country').value = user.address.country || '';
  }
}

// Populate preferences form
function populatePreferencesForm(user) {
  if (user.preferences) {
    // Set budget
    if (user.preferences.budget) {
      document.getElementById('minBudget').value = user.preferences.budget.min || '';
      document.getElementById('maxBudget').value = user.preferences.budget.max || '';
    }
    
    // Set preferred brands
    if (user.preferences.preferredBrands) {
      user.preferences.preferredBrands.forEach(brand => {
        const checkbox = document.querySelector(`input[name="brands"][value="${brand}"]`);
        if (checkbox) checkbox.checked = true;
      });
    }
    
    // Set fuel type preferences
    if (user.preferences.fuelType) {
      user.preferences.fuelType.forEach(fuel => {
        const checkbox = document.querySelector(`input[name="fuelType"][value="${fuel}"]`);
        if (checkbox) checkbox.checked = true;
      });
    }
  }
}

// Personal form submission
personalForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(personalForm);
  const data = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    phoneNumber: formData.get('phoneNumber')
  };
  
  await updateProfile(data);
});

// Address form submission
addressForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(addressForm);
  const address = {
    street: formData.get('street'),
    city: formData.get('city'),
    state: formData.get('state'),
    zipCode: formData.get('zipCode'),
    country: formData.get('country')
  };
  
  await updateProfile({ address });
});

// Preferences form submission
preferencesForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(preferencesForm);
  
  // Get selected brands
  const brands = [];
  document.querySelectorAll('input[name="brands"]:checked').forEach(checkbox => {
    brands.push(checkbox.value);
  });
  
  // Get selected fuel types
  const fuelTypes = [];
  document.querySelectorAll('input[name="fuelType"]:checked').forEach(checkbox => {
    fuelTypes.push(checkbox.value);
  });
  
  const preferences = {
    preferredBrands: brands,
    budget: {
      min: parseInt(formData.get('minBudget')) || null,
      max: parseInt(formData.get('maxBudget')) || null
    },
    fuelType: fuelTypes
  };
  
  await updateProfile({ preferences });
});

// Update profile function
async function updateProfile(data) {
  showLoading();
  
  try {
    const response = await fetch('/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const responseData = await response.json();
    
    if (response.ok) {
      showMessage(responseData.message || 'Profile updated successfully!', 'success');
      
      // Update local storage with new user data
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const updatedUser = { ...currentUser, ...responseData.user };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Reload profile to get updated data
      setTimeout(() => {
        loadUserProfile();
      }, 1000);
      
    } else {
      showMessage(responseData.error || 'Failed to update profile', 'error');
    }
  } catch (error) {
    console.error('Update profile error:', error);
    showMessage('Network error. Please check your connection.', 'error');
  } finally {
    hideLoading();
  }
}

// Logout function
async function logout() {
  showLoading();
  
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Clear local storage regardless of response
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    
    if (response.ok) {
      showMessage('Logged out successfully!', 'success');
    }
    
    // Redirect to login page
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
    
  } catch (error) {
    console.error('Logout error:', error);
    
    // Clear local storage and redirect even if API call fails
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  } finally {
    hideLoading();
  }
}

// Avatar upload functionality
document.getElementById('avatarInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    // For now, just show a message (avatar upload would need additional backend implementation)
    showMessage('Avatar upload feature coming soon!', 'success');
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
  
  // Add hover effects to form sections
  const formSections = document.querySelectorAll('.form-section');
  formSections.forEach(section => {
    section.addEventListener('mouseenter', () => {
      section.style.transform = 'translateY(-2px)';
      section.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
    });
    
    section.addEventListener('mouseleave', () => {
      section.style.transform = 'translateY(0)';
      section.style.boxShadow = 'none';
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
    background: rgba(37, 99, 235, 0.3);
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
  
  .form-section {
    transition: all 0.3s ease;
  }
`;
document.head.appendChild(style);