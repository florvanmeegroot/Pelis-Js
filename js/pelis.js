//Array de Objetos - Peliculas
const peliculas = [
  {
    nombre: "Inception",
    id: 1,
    anio: 2010,
    genero: "Ciencia Ficcion",
    imagen: "img/inception-001.jpg",
  },
  {
    nombre: "¿Qué paso ayer?",
    id: 2,
    anio: 2009,
    genero: "Comedia",
    imagen: "/img/que-paso-ayer-002.jpg",
  },
  {
    nombre: "Titanic",
    id: 3,
    anio: 1997,
    genero: "Romance",
    imagen: "/img/titanic-003.jpg",
  },
  {
    nombre: "The dark night",
    id: 4,
    anio: 2008,
    genero: "Superheroes",
    imagen: "img/the-dark-night-004.jpg",
  },
  {
    nombre: "Forrest Gump",
    id: 5,
    anio: 1994,
    genero: "Drama",
    imagen: "img/Forrest_Gump-005.jpg",
  },
  {
    nombre: "The Matrix",
    id: 6,
    anio: 1999,
    genero: "Ciencia ficcion",
    imagen: "img/matrix-006.jpg",
  },
  {
    nombre: "Gladiador",
    id: 7,
    anio: 2000,
    genero: "Accion",
    imagen: "img/Gladiator-007.jpg",
  },
  {
    nombre: "Interstellar",
    id: 8,
    anio: 2014,
    genero: "Ciencia ficcion",
    imagen: "img/interestelar-008.jpg",
  },
  {
    nombre: "Avatar",
    id: 9,
    anio: 2009,
    genero: "Ciencia ficcion",
    imagen: "img/Avatar-009.jpg",
  },
  {
    nombre: "Pulp Fiction",
    id: 10,
    anio: 1994,
    genero: "Accion",
    imagen: "img/Pulp-fiction-010.jpg",
  },
  {
    nombre: "Toy Story",
    id: 11,
    anio: 1995,
    genero: "Animacion",
    imagen: "img/toy-story-011.webp",
  },
  {
    nombre: "Homoargentum",
    id: 12,
    anio: 2025,
    genero: "Comedia",
    imagen: "img/Homo_Argentum-012.jpg",
  },
  {
    nombre: "Los puentes de Madison",
    id: 13,
    anio: 1995,
    genero: "Romance",
    imagen: "img/los-puentes-de-madison-013.jpg",
  },
  {
    nombre: "El lobo de Wallstreet",
    id: 14,
    anio: 2013,
    genero: "Comedia",
    imagen: "img/lobo-de-wallstreet-014.webp",
  },
  {
    nombre: "Si yo tuviera 30",
    id: 15,
    anio: 2004,
    genero: "Comedia",
    imagen: "img/si-yo-tuviera-30-015.jpg",
  },
  {
    nombre: "El diablo viste a la moda",
    id: 16,
    anio: 2006,
    genero: "Comedia",
    imagen: "img/el-diablo-viste-a-la-moda-016.webp",
  },
  {
    nombre: "Lilo & Stich",
    id: 17,
    anio: 2025,
    genero: "Animacion",
    imagen: "img/Lilo-y-Stich-017.jpg",
  },
  {
    nombre: "La llamada",
    id: 18,
    anio: 2007,
    genero: "Terror",
    imagen: "img/la-llamada-018.jpg",
  },
  {
    nombre: "Minecraft",
    id: 19,
    anio: 2025,
    genero: "Animacion",
    imagen: "img/Minecraft-019.jpg",
  },
  {
    nombre: "Barbie",
    id: 20,
    anio: 2023,
    genero: "Animacion",
    imagen: "img/Barbie-020.webp",
  },
];

// Función genérica para renderizar en cualquier contenedor
function imprimirPelisEnHTML(lista, idContenedor) {
  const contenedor = document.getElementById(idContenedor);
  contenedor.innerHTML = ""; // limpiar antes de renderizar

  for (const pelicula of lista) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${pelicula.imagen}" alt="${pelicula.nombre}" />
      <h3>${pelicula.nombre}</h3>
      <p><strong>Año:</strong> ${pelicula.anio}</p>
      <p><strong>Género:</strong> ${pelicula.genero}</p>
      <button class="btn-sel" id="fav-${pelicula.id}-${idContenedor}">Agregar a favoritos</button>
    `;

    contenedor.appendChild(card);

    // Evento para guardar en favoritos
    const boton = document.getElementById(`fav-${pelicula.id}-${idContenedor}`);
    boton.addEventListener("click", () => {
      boton.classList.toggle("btn-fav");
      boton.textContent = "❤ Agregado a favoritos";
      agregarAFavoritos(pelicula);
    });
  }
}

// Función para agregar al localStorage
function agregarAFavoritos(pelicula) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  const yaExiste = favoritos.some((fav) => fav.id === pelicula.id);

  if (!yaExiste) {
    favoritos.push(pelicula);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }
}

// Filtrar pelis de Animación para imprimir en contenido de niños
const peliculasAnimacion = peliculas.filter(
  (pelicula) => pelicula.genero.toLowerCase() === "animacion"
);

// Renderizar en diferentes contenedores adultos y niños
imprimirPelisEnHTML(peliculas, "cards-container");
imprimirPelisEnHTML(peliculasAnimacion, "cards-animacion");
