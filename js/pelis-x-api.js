const apiKey = "42d06fd861ef47c5c1c2e2da632aca6e";
const contenedor = document.getElementById("peliculas");
const btnCargarMas = document.getElementById("cargarMas");
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let paginaActual = 1;

function obtenerPeliculas(pagina) {
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=${pagina}`
  )
    .then((res) => res.json())
    .then((data) => mostrarPeliculas(data.results))
    .catch((err) => console.error("Error:", err));
}

function mostrarPeliculas(peliculas) {
  peliculas.forEach((pelicula) => {
    const esFavorito = favoritos.some((fav) => fav.id === pelicula.id);

    const div = document.createElement("div");
    div.classList.add("pelicula");
    div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
      <div class="info-pelis">
        <h3>${pelicula.title}</h3>
        <p>${pelicula.overview}</p>
        <button class="favorito-btn ${esFavorito ? "activo" : ""}" data-id="${pelicula.id}">
          ${esFavorito ? "❤ Añadido a favorito" : "Añadir a favorito"}
        </button>
      </div>
    `;
    contenedor.appendChild(div);
  });

  document.querySelectorAll(".favorito-btn").forEach((btn) => {
    btn.addEventListener("click", toggleFavorito);
  });
}

function toggleFavorito(e) {
  const id = parseInt(e.target.dataset.id);
  const peliculaCard = e.target.closest(".pelicula");
  const boton = e.target;

  const pelicula = {
    id,
    title: peliculaCard.querySelector("h3").textContent,
    poster_path: peliculaCard
      .querySelector("img")
      .src.replace("https://image.tmdb.org/t/p/w500", ""),
    overview: peliculaCard.querySelector("p").textContent,
  };

  const index = favoritos.findIndex((fav) => fav.id === id);

  if (index !== -1) {
    favoritos.splice(index, 1);
    boton.classList.remove("activo");
    boton.textContent = "Añadir a favorito";
  } else {
    favoritos.push(pelicula);
    boton.classList.add("activo");
    boton.textContent = "❤ Añadido a favorito";
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

// Cargar la primera página
obtenerPeliculas(paginaActual);

// Botón “Cargar más”
btnCargarMas.addEventListener("click", () => {
  paginaActual++;
  obtenerPeliculas(paginaActual);
});
