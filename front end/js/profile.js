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
