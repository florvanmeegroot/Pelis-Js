// Prompt para obtener los datos del usuario
let nombre = prompt("Por favor, ingresa tu nombre:");

let añoNacimiento = prompt("Hola " + nombre + ", ¿En qué año naciste?");

console.log("El usuario se llama: " + nombre + " y nacio en " + añoNacimiento ); // Lo imprimo por consola

let mensaje = "Hola " + nombre; // Defino el mensaje
document.getElementById("saludo").textContent = mensaje; // Saludo en el header

console.log(mensaje); // Imprimo tmb por consola el saludo que esta en el header

// Calcular la edad de la persona 
const añoActual = new Date().getFullYear();
console.log("Estamos en el: " + añoActual); //obtengo año actual y lo imprimo por consola

let edad = añoActual - añoNacimiento; //operacion para calcular edad

console.log ("El usuario " + nombre + " tiene " + edad + " años"); //imprimo la edad por consola
