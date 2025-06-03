const enviar = document.getElementById("enviar");
enviar.addEventListener("click", e => {
    const nombreUser = document.querySelector("#nombreUser").value;
    const apellidoUser = document.querySelector("#apellidoUser").value;
    alert("Hola "+ nombreUser + " " + apellidoUser + ", Bienvenido!!!!")
})
