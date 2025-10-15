let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

// función para obtener las pelis animadas desde un archivo JSON local
function obtenerPeliculasAnimadas() {
  fetch("../jsons/peliculas-animadas.json")
    .then((res) => res.json())
    .then((data) => {
      mostrarPeliculasAnimadas(data.results); //
    })
    .catch((error) =>
      console.error("Error al obtener películas animadas:", error)
    );
}

// función para mostrar las pelis animadas
function mostrarPeliculasAnimadas(peliculas) {
  const contenedor = document.getElementById("pelisAnimadas");
  contenedor.innerHTML = "";

  peliculas.forEach((pelicula) => {
    const esFavorito = favoritos.some((fav) => fav.id === pelicula.id);

    const div = document.createElement("div");
    div.classList.add("pelicula");
    div.innerHTML = `
      <img src="${pelicula.poster_path}" alt="${pelicula.title}">
      <div class="info-pelis">
        <h3>${pelicula.title}</h3>
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

// función agregar / quitar favoritos
function toggleFavorito(e) {
  const id = parseInt(e.target.dataset.id);
  const peliculaCard = e.target.closest(".pelicula");
  const boton = e.target;

  const pelicula = {
    id,
    title: peliculaCard.querySelector("h3").textContent,
    poster_path: peliculaCard.querySelector("img").src, //
    overview: peliculaCard.querySelector("p").textContent,
  };

  const index = favoritos.findIndex((fav) => fav.id === id);

  if (index !== -1) {
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
    favoritos.push(pelicula);
    boton.classList.add("activo");
    boton.textContent = "❤ Añadido a favorito";

    Swal.fire({
      toast: true,
      position: "center",
      icon: "success",
      title: "Añadido a favoritos",
      html: '<a href="/pages/favoritos.html" class="alert-fav">Ver favoritos</a>',
      background: "white",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

// ejecutar al cargar
obtenerPeliculasAnimadas();
