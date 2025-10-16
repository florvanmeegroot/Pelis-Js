const apiKey = "42d06fd861ef47c5c1c2e2da632aca6e";
const contenedor = document.getElementById("peliculas");
const btnCargarMas = document.getElementById("cargarMas");
const contenedorBotonera = document.getElementById("botonera-generos");

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let paginaActual = 1;
let todasLasPeliculas = [];

// generos de peliculas
const generos = {
  28: "Acción",
  12: "Aventura",
  35: "Comedia",
  80: "Crimen",
  18: "Drama",
  14: "Fantasía",
  36: "Historia",
  27: "Terror",
  10402: "Música",
  9648: "Misterio",
  10749: "Romance",
  878: "Ciencia ficción",
  53: "Suspenso",
  10752: "Bélica",
  16: "Animación",
};

function crearBotonera() {
  // btn "todas"
  const btnTodas = document.createElement("button");
  btnTodas.textContent = "Todas";
  btnTodas.classList.add("btn-genero", "activo");
  btnTodas.addEventListener("click", () => filtrarPorGenero(null));
  contenedorBotonera.appendChild(btnTodas);

  // btns de todos los generos excepto Animación
  Object.entries(generos).forEach(([id, nombre]) => {
    if (nombre === "Animación") return; // saltamos Animación por ahora

    const btn = document.createElement("button");
    btn.textContent = nombre;
    btn.classList.add("btn-genero");
    btn.dataset.id = id;
    btn.addEventListener("click", () => filtrarPorGenero(id));
    contenedorBotonera.appendChild(btn);
  });

  // btn Animación al final
  const btnAnimacion = document.createElement("button");
  btnAnimacion.textContent = "Animación";
  btnAnimacion.classList.add("btn-genero");
  btnAnimacion.addEventListener("click", () => {
    window.location.href = "pages/pelis-animadas.html";
  });
  contenedorBotonera.appendChild(btnAnimacion);
}


// función para obtener x fetch pelis populares de la api de Movie DB
function obtenerPeliculas(pagina) {
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=${pagina}`
  )
    .then((res) => res.json())
    .then((data) => mostrarPeliculas(data.results))
    .catch((err) => console.error("Hay un error: ", err));
}

// Renderiza las cards de pelis
function mostrarPeliculas(peliculas) {
  todasLasPeliculas = [...todasLasPeliculas, ...peliculas];

  peliculas.forEach((pelicula) => {
    const esFavorito = favoritos.some((fav) => fav.id === pelicula.id);

    // Obtener los generos de las pelis
    const categorias = pelicula.genre_ids
      ? pelicula.genre_ids.map((id) => generos[id]).join(", ")
      : "Sin categoría";

    const div = document.createElement("div");
    div.classList.add("pelicula");
    div.dataset.generos = pelicula.genre_ids
      ? pelicula.genre_ids.join(",")
      : "";
    div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${
      pelicula.title
    }">
      <div class="info-pelis">
        <h3>${pelicula.title}</h3>
        <p class="categoria">${categorias}</p>
        <p>${pelicula.overview || "Sin descripción disponible."}</p>
        <button class="favorito-btn ${esFavorito ? "activo" : ""}" data-id="${
      pelicula.id
    }">
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

// agregar / quitar fav
function toggleFavorito(e) {
  const id = parseInt(e.target.dataset.id);
  const peliculaCard = e.target.closest(".pelicula");
  const boton = e.target;

  const categoria =
    peliculaCard.querySelector(".categoria")?.textContent.replace(" ", "") ||
    "Sin categoría";

  const pelicula = {
    id,
    title: peliculaCard.querySelector("h3").textContent,
    poster_path: peliculaCard
      .querySelector("img")
      .src.replace("https://image.tmdb.org/t/p/w500", ""),
    overview: peliculaCard.querySelector("p:not(.categoria)").textContent,
    categoria,
  };

  const index = favoritos.findIndex((fav) => fav.id === id);

  if (index !== -1) {
    // eliminar de favoritos
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
    // agregar a favoritos
    favoritos.push(pelicula);
    boton.classList.add("activo");
    boton.textContent = "❤ Añadido a favorito";

    Swal.fire({
      toast: true,
      position: "center",
      icon: "success",
      title: "Añadido a favoritos",
      html: `<a href="pages/favoritos.html" class="alert-fav">Ver favoritos</a>`,
      background: "white",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

// función para filtrar por género
function filtrarPorGenero(idGenero) {
  const botones = document.querySelectorAll(".btn-genero");
  botones.forEach((btn) => btn.classList.remove("activo"));

  if (idGenero === null) {
    botones[0].classList.add("activo");
  } else {
    document
      .querySelector(`.btn-genero[data-id="${idGenero}"]`)
      .classList.add("activo");
  }

  contenedor.innerHTML = "";

  let peliculasFiltradas = [];
  if (idGenero === null) {
    peliculasFiltradas = todasLasPeliculas;
  } else {
    peliculasFiltradas = todasLasPeliculas.filter((p) =>
      p.genre_ids.includes(parseInt(idGenero))
    );
  }

  mostrarPeliculasFiltradas(peliculasFiltradas);
}

// Renderiza las pelis filtradas
function mostrarPeliculasFiltradas(peliculas) {
  contenedor.innerHTML = "";
  peliculas.forEach((pelicula) => {
    const esFavorito = favoritos.some((fav) => fav.id === pelicula.id);
    const categorias = pelicula.genre_ids
      ? pelicula.genre_ids.map((id) => generos[id]).join(", ")
      : "Sin categoría";

    const div = document.createElement("div");
    div.classList.add("pelicula");
    div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${
      pelicula.title
    }">
      <div class="info-pelis">
        <h3>${pelicula.title}</h3>
        <p class="categoria">${categorias}</p>
        <p>${pelicula.overview || "Sin descripción disponible."}</p>
        <button class="favorito-btn ${esFavorito ? "activo" : ""}" data-id="${
      pelicula.id
    }">
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

// Cargar la primera página de películas
crearBotonera();
obtenerPeliculas(paginaActual);

// Btn "Cargar mas" pelis
btnCargarMas.addEventListener("click", () => {
  paginaActual++;
  obtenerPeliculas(paginaActual);
});
