document.addEventListener("DOMContentLoaded", () => {
  const loginTab = document.getElementById("loginTab");
  const signupTab = document.getElementById("signupTab");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  // Tab switching
  loginTab.addEventListener("click", () => {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
  });

  signupTab.addEventListener("click", () => {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
  });

  // Signup form submission
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const countryCode = document.getElementById("countryCode").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    const data = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("signupEmail").value,
      phoneNumber: fullPhoneNumber,
      password: document.getElementById("signupPassword").value,
      userType: document.getElementById("userType").value,
    };

    // Example: Send to backend
    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        alert("Account created successfully!");
        window.location.href = "/login";
      } else {
        alert("Error creating account");
      }
    })
    .catch(err => console.error("Signup error:", err));
  });

  // Login form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value,
    };

    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        alert("Login successful!");
        window.location.href = "/";
      } else {
        alert("Invalid credentials");
      }
    })
    .catch(err => console.error("Login error:", err));
  });
});
