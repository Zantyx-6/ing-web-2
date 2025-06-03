window.addEventListener("load", () =>{
    alert("Bienvenidos Willy Wonkitas a su pagina web");
});

const botonCambiar = document.getElementById("botnCambiar");
const titulo = document.getElementById("titulo");

botonCambiar.addEventListener("click", () => {
    titulo.textContent = "Willy Wonka haz hecho click en el boton"

    document.body.style.backgroundColor = "#f0f0f0";
    
    const nuevoMensaje = document.createElement("p");
    nuevoMensaje.textContent = "El fondo Willy Wonkita ha cambiado";
    titulo.insertAdjacentElement("afterend", nuevoMensaje);

    




})


