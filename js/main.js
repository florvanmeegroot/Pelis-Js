// ENTREGA 1

// Prompt para obtener los datos del usuario
let nombre = prompt("Por favor, ingresa tu nombre:");

let anioNacimiento = parseInt(
  prompt("Hola " + nombre + ", ¿En qué año naciste?")
);

// Calcular la edad de la persona
const anioActual = new Date().getFullYear();

let edad = anioActual - anioNacimiento;
console.log("El usuario " + nombre + " tiene " + edad + " años");

// Función recaptcha para ingresar a la página
function recaptcha() {
  let intentos = 3;
  let palabraClave;

  while (intentos > 0) {
    palabraClave = prompt(
      "Por favor validanos que no sos un robot e ingresa la palabra oculta: mono + patin"
    );

    if (palabraClave === "monopatin") {
      alert("Gracias, ingresaste a Pelis Online");
      return true;
    } else if (palabraClave === "mono + patin") {
      alert("Casi... probá de nuevo sin el +");
    } else {
      alert(
        "Error, palabra incorrecta. Te quedan " + (intentos - 1) + " intentos."
      );
    }

    intentos--;
  }

  alert("Demasiados intentos fallidos. Intenta más tarde.");
  return false;
}

recaptcha();

// Clase constructora de películas
class Pelicula {
  constructor(titulo, anio, categoria) {
    this.titulo = titulo;
    this.anio = anio;
    this.categoria = categoria;
  }
}

// Array vacío de películas
let peliculas = [];

// Agrego películas con push
peliculas.push(new Pelicula("Inception", 2010, "Ciencia Ficción"));
peliculas.push(new Pelicula("¿Qué paso ayer?", 2009, "Comedia"));
peliculas.push(new Pelicula("Titanic", 1997, "Romance"));
peliculas.push(new Pelicula("The Dark Knight", 2008, "Superhéroes"));
peliculas.push(new Pelicula("Forrest Gump", 1994, "Drama"));
peliculas.push(new Pelicula("The Matrix", 1999, "Ciencia Ficción"));
peliculas.push(new Pelicula("Gladiator", 2000, "Acción"));
peliculas.push(new Pelicula("Interstellar", 2014, "Ciencia Ficción"));
peliculas.push(new Pelicula("Avatar", 2009, "Ciencia Ficción"));
peliculas.push(new Pelicula("Pulp Fiction", 1994, "Drama"));
peliculas.push(new Pelicula("Toy Story", 1995, "Animación"));
peliculas.push(new Pelicula("Homuargentum", 2025, "Comedia"));
peliculas.push(new Pelicula("Los puentes de Madison", 1995, "Drama"));
peliculas.push(new Pelicula("El lobo de Wallstreet", 2013, "Comedia"));

// Función para buscar películas por categoría
function buscarPorCategoria(categoria) {
  let resultado = [];
  for (let i = 0; i < peliculas.length; i++) {
    if (peliculas[i].categoria.toLowerCase() === categoria.toLowerCase()) {
      resultado.push(peliculas[i]);
    }
  }
  return resultado;
}

// prompt para categoria de interes
let categoriaBuscada = prompt("¿Qué categoría de películas querés ver?");
let peliculasFiltradas = buscarPorCategoria(categoriaBuscada);

// Condicional con switch para mostrar resultado
switch (peliculasFiltradas.length) {
  case 0:
    alert("No se encontraron películas en la categoría: " + categoriaBuscada);
    break;
  default:
    console.log(
      "Películas encontradas en la categoría " + categoriaBuscada + ":"
    );
    for (let i = 0; i < peliculasFiltradas.length; i++) {
      console.log(
        "- " +
          peliculasFiltradas[i].titulo +
          " (" +
          peliculasFiltradas[i].anio +
          ")"
      );
    }
    break;
}

// PRACTICA FUERA DE LA ENTREGA 1
// Defino el mensaje
let mensaje = "Hola " + nombre;

// Saludo en el header
document.getElementById("saludo").textContent = mensaje;

//añado año en el footer
document.getElementById("anio").textContent = anioActual;

// Determinar la mayoria de edad de los usuarios para mostrarle un contenido u otro
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
