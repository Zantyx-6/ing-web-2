// Cerrar sesión
document.getElementById("logout-btn").addEventListener("click", function () {
  localStorage.removeItem("carbonUsername");
  window.location.href = "login.html";
});