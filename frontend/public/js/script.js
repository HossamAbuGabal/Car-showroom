function saveProfile() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  const profile = { username, email };
  localStorage.setItem("userProfile", JSON.stringify(profile));
  alert("Profile saved!");
}