// --- CONFIGURACIÓN GENERAL ---
const apiKey = "42d06fd861ef47c5c1c2e2da632aca6e";
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

// --- FUNCIÓN PARA OBTENER PELÍCULAS DE POKÉMON ---
function obtenerPeliculasPokemon() {
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=pokemon&language=es-ES`;

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      mostrarPeliculasPokemon(data.results);
    })
    .catch((error) =>
      console.error("Error al obtener películas Pokémon: ", error)
    );
}

// --- FUNCIÓN PARA MOSTRAR LAS PELÍCULAS DE POKÉMON ---
function mostrarPeliculasPokemon(peliculas) {
  const contenedor = document.getElementById("pokepelis");
  contenedor.innerHTML = "";

  peliculas.forEach((pelicula) => {
    const esFavorito = favoritos.some((fav) => fav.id === pelicula.id);

    const div = document.createElement("div");
    div.classList.add("pelicula");
    div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
      <div class="info-pelis">
        <h3>${pelicula.title}</h3>
        <p>${pelicula.overview || "Sin descripción disponible."}</p>
        <button class="favorito-btn ${esFavorito ? "activo" : ""}" data-id="${pelicula.id}">
          ${esFavorito ? "❤ Añadido a favorito" : "Añadir a favorito"}
        </button>
      </div>
    `;
    contenedor.appendChild(div);
  });

  // asignar eventos a los botones
  document.querySelectorAll(".favorito-btn").forEach((btn) => {
    btn.addEventListener("click", toggleFavorito);
  });
}

// --- FUNCIÓN PARA AGREGAR / QUITAR FAVORITOS ---
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
    // Quitar de favoritos
    favoritos.splice(index, 1);
    boton.classList.remove("activo");
    boton.textContent = "Añadir a favorito";

    Swal.fire({
      toast: true,
      position: "center",
      icon: "info",
      title: "Eliminado de favoritos",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  } else {
    // Agregar a favoritos
    favoritos.push(pelicula);
    boton.classList.add("activo");
    boton.textContent = "❤ Añadido a favorito";

    Swal.fire({
      toast: true,
      position: "center",
      icon: "success",
      title: "Añadido a favoritos",
      html: '<a href="../pages/favoritos.html" class="alert-fav">Ver favoritos</a>',
      background: "white",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  // Guardar en localStorage
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

// --- LLAMADA INICIAL ---
obtenerPeliculasPokemon();

