console.log("JS Loaded ✅");

function saveProfile() {
  const profile = {
    name: "John Doe",
    email: "john@example.com",
    favorites: [],
    wishlist: [],
  };
  localStorage.setItem("userProfile", JSON.stringify(profile));
  alert("Profile saved!");
}

function loadProfile() {
  const data = localStorage.getItem("userProfile");
  if (data) {
    const profile = JSON.parse(data);
    document.getElementById("profile-name").innerText = profile.name;
    document.getElementById("profile-email").innerText = profile.email;

    displayList("favorites", profile.favorites);
    displayList("wishlist", profile.wishlist);
  } else {
    alert("No profile found.");
  }
}

function addToFavorites() {
  const profile = JSON.parse(localStorage.getItem("userProfile")) || {};
  profile.favorites = profile.favorites || [];
  profile.favorites.push("New Favorite Item");
  localStorage.setItem("userProfile", JSON.stringify(profile));
  displayList("favorites", profile.favorites);
}

function addToWishlist() {
  const profile = JSON.parse(localStorage.getItem("userProfile")) || {};
  profile.wishlist = profile.wishlist || [];
  profile.wishlist.push("New Wishlist Item");
  localStorage.setItem("userProfile", JSON.stringify(profile));
  displayList("wishlist", profile.wishlist);
}

function logout() {
  localStorage.removeItem("userProfile");
  alert("Logged out!");
  location.reload();
}

function displayList(id, items) {
  const container = document.getElementById(id);
  container.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    container.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const profileSection = document.getElementById('profile-section');

  if (profileSection) {
    if (isLoggedIn === 'true') {
      const userProfile = JSON.parse(localStorage.getItem('userProfile'));
      let profileName = 'User';
      if(userProfile && userProfile.name) {
        profileName = userProfile.name;
      }
      profileSection.innerHTML = `
        <div class="profile-dropdown">
          <i class='bx bxs-user-circle profile-icon' style="font-size: 28px; color: var(--text-color);"></i>
          <div class="profile-dropdown-content">
            <div><strong>Welcome, ${profileName}!</strong></div>
            <div class="divider"></div>
            <a href="profile.html">View Profile</a>
            <a href="favorites.html">Favorites</a>
            <a href="#" onclick="showWishlist()">Wishlist</a>
            <div class="divider"></div>
            <a href="#" onclick="logout()">Logout</a>
          </div>
        </div>
      `;
    } else {
      profileSection.innerHTML = `
        <a href="login.html" target="_self" class="profile-icon">
          <i class='bx bxs-user-circle' style="font-size: 28px; color: var(--text-color);"></i>
        </a>
      `;
    }
  }
});

function showWishlist() {
  const profile = JSON.parse(localStorage.getItem("userProfile"));
  if (profile && profile.wishlist.length > 0) {
    alert("Your Wishlist:\n" + profile.wishlist.join("\n"));
  } else {
    alert("Your wishlist is empty.");
  }
}

function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userProfile');
  alert("You have been logged out.");
  window.location.href = 'homepage.html';
}