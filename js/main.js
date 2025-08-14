// Prompt para obtener los datos del usuario
let nombre = prompt("Por favor, ingresa tu nombre:");

let edad = prompt("Hola " + nombre + ", ¿cuántos años tenés?");

console.log("El usuario se llama: " + nombre + " y tiene: " + edad + " años"); // Lo imprimo por consola

let mensaje = "Hola " + nombre; // Defino el mensaje
document.getElementById("saludo").textContent = mensaje; // Saludo en el h1 del header

console.log(mensaje); // Lo imprimo por consola