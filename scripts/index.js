let edad = parseInt(prompt("Digite su edad: "))

if (edad < 18 && edad > 0){
    alert("Usted es menor de edad.")
}
if (edad >= 18){
    alert("Usted es mayor de edad.")
}
if (edad < 0 || edad == 0){
    alert("Edad invalida !")
}

for (let i = 1; i < 11; i++){
    alert("Numero #" + i)
}