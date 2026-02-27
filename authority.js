// Year auto update
document.getElementById("year").textContent = new Date().getFullYear();

// Tab switching
const tabs = document.querySelectorAll(".auth-tab");
const panels = document.querySelectorAll(".auth-panel");
const messageBox = document.getElementById("auth-message");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById("auth-" + tab.dataset.tab).classList.add("active");

    clearMessage();
  });
});

function clearMessage() {
  messageBox.textContent = "";
  messageBox.className = "form-message";
}

function showMessage(msg, type) {
  messageBox.textContent = msg;
  messageBox.className = "form-message " + type; // success or error
}

/* =========================
   SIGN UP (Local Storage)
========================= */
document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  let users = JSON.parse(localStorage.getItem("authorities")) || [];

  // Check if email already exists
  if (users.find(user => user.email === email)) {
    showMessage("Email already registered!", "error");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("authorities", JSON.stringify(users));

  showMessage("Account created successfully! You can now login.", "success");
  document.getElementById("signup-form").reset();
});


/* =========================
   LOGIN (Local Storage)
========================= */
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  let users = JSON.parse(localStorage.getItem("authorities")) || [];

  const user = users.find(
    user => user.email === email && user.password === password
  );

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    showMessage("Invalid email or password!", "error");
  }
});