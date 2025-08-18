// Prompt para obtener los datos del usuario
let nombre = prompt("Por favor, ingresa tu nombre:");

let añoNacimiento = prompt("Hola " + nombre + ", ¿En qué año naciste?");

// Lo imprimo por consola
console.log("El usuario se llama: " + nombre + " y nacio en " + añoNacimiento);

// Defino el mensaje
let mensaje = "Hola " + nombre;

// Saludo en el header
document.getElementById("saludo").textContent = mensaje;

// Imprimo tmb por consola el saludo que esta en el header
console.log(mensaje);

// Calcular la edad de la persona
const añoActual = new Date().getFullYear();
console.log("Estamos en el: " + añoActual); //obtengo año actual y lo imprimo por consola

//operacion para calcular edad
let edad = añoActual - añoNacimiento;

console.log("El usuario " + nombre + " tiene " + edad + " años"); //imprimo la edad por consola

//añado año en curso en el header
document.getElementById("anio").textContent = añoActual;

// Mayoria de Edad de los usuarios
let mayoriaEdad = edad;

if (mayoriaEdad >= 18) {
  console.log("El usuario: " + nombre + " es mayor de edad");

  // Mostrar solo la sección de adultos
  document.getElementById("contenido-mayores").style.display = "grid";
  document.getElementById("contenido-menores").style.display = "none";
} else {
  console.log("El usuario: " + nombre + " es menor de edad");

  // Mostrar solo la sección de menores
  document.getElementById("contenido-mayores").style.display = "none";
  document.getElementById("contenido-menores").style.display = "grid";
}