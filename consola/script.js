const nombre = ["Ana", "Bob", "Santiago", "Carlos", "Julian", "Sofia", "Alejandro"];
console.log("Nombres:");
nombre.forEach(nombre => console.log(nombre));
console.log("------------------");

const nombreMayus = nombre.map(nombre => nombre.toUpperCase());
//console.log("Nombres en Mayúscula:", nombreMayus);
console.log("Nombres en Mayúscula:");
nombreMayus.forEach(nombreMayus => console.log(nombreMayus));
console.log("------------------");

const nombreLargos = nombre.filter(nombre => nombre.length>5)
console.log("Nombres > 5 letras:")
nombreLargos.forEach(nombreLargos => console.log(nombreLargos));
console.log("------------------");

const edad = parseInt(prompt("Digite su edad: "))
if (edad < 18 && edad > 0){
    console.log("Usted es menor de edad.")
}
if (edad >= 18 && edad < 100){
    console.log("Usted es mayor de edad.")
}
if (edad < 0 || edad == 0 || edad >= 101){
    console.log("Edad invalida !")
} 
console.log("------------------");

for (let i = 1; i < 11; i++){
    console.log("Numero #" + i)
}

