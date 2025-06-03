//Evento load al cargar la página
window.addEventListener("load", () => {
  alert("¡Bienvenido a la página interactiva!");
});

//Cambiar texto del <h1> al hacer clic en un botón
const botonCambiar = document.getElementById("botonCambiar");
const titulo = document.getElementById("titulo");

botonCambiar.addEventListener("click", () => {
  titulo.textContent = "Has hecho clic en el botón";
  document.body.style.backgroundColor = "#f0f0f0";

  const nuevoMensaje = document.createElement("p");
  nuevoMensaje.textContent = "¡El fondo ha cambiado!";
  titulo.insertAdjacentElement("afterend", nuevoMensaje);
});

//Cambiar color del <p> con mouseover
const parrafo = document.querySelector("#parrafo");

parrafo.addEventListener("mouseover", () => {
  parrafo.style.color = "blue";
});

//Campo de texto con eventos: focus, blur, keyup
const campo = document.getElementById("campoTexto");
const mensajeCampo = document.getElementById("mensajesInput");

campo.addEventListener("focus", () => {
  mensajeCampo.textContent = "Estás escribiendo...";
});

campo.addEventListener("blur", () => {
  mensajeCampo.textContent = "Saliste del campo de texto.";
});

campo.addEventListener("keyup", () => {
  mensajeCampo.textContent = `Estás escribiendo: ${campo.value}`;
});

//Mostrar mensaje oculto con setTimeout
setTimeout(() => {
  document.getElementById("mensajeOculto").style.display = "block";
}, 3000);

//Reloj digital con setInterval
function actualizarReloj() {
  const reloj = document.getElementById("reloj");
  const ahora = new Date();
  const hora = ahora.toLocaleTimeString();
  reloj.textContent = `Hora: ${hora}`;
}

setInterval(actualizarReloj, 1000);

//Función para mensaje personalizado + removeEventListener
const botonMensaje = document.getElementById("botonMensaje");
const mensajePersonalizado = document.getElementById("mensajePersonalizado");

let clics = 0;

function mostrarMensaje() {
  clics++;
  mensajePersonalizado.textContent = `Mensaje número ${clics}`;

  if (clics === 3) {
    botonMensaje.removeEventListener("click", mostrarMensaje);
    mensajePersonalizado.textContent += " - ¡Ya no puedes hacer más clics!";
  }
}

botonMensaje.addEventListener("click", mostrarMensaje);
