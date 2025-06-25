document.getElementById("login-btn").addEventListener("click", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const passwordError = document.getElementById("password-error");

  if (password.length < 8) {
    passwordError.classList.remove("hidden");
    return;
  } else {
    passwordError.classList.add("hidden");
  }

  // Guardar el nombre de usuario en localStorage
  localStorage.setItem("carbonUsername", username);

  // Redirigir a la calculadora
  window.location.href = "dashboard.html";
});