// obtener el localstorage
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
const contenedor = document.getElementById("favoritos-container");

// mostrar favoritos
function mostrarFavoritos(peliculas) {
  contenedor.innerHTML = "";

  if (peliculas.length === 0) {
    contenedor.innerHTML = `
      <p class="sin-favoritos">No tienes películas favoritas aún 😢</p>
    `;
    return;
  }

  peliculas.forEach((pelicula) => {
    const div = document.createElement("div");
    div.classList.add("pelicula");

    // Comprobar si la URL ya es completa
    const imagenSrc = pelicula.poster_path.startsWith("http")
      ? pelicula.poster_path
      : `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;

    div.innerHTML = `
      <img src="${imagenSrc}" alt="${pelicula.title}">
      <div class="info-pelis">
        <h3>${pelicula.title}</h3>
        <p>${pelicula.overview || "Sin descripción disponible."}</p>
        <button class="favorito-btn activo" data-id="${pelicula.id}">
          ❤ Quitar de favoritos
        </button>
      </div>
    `;

    contenedor.appendChild(div);
  });

  // Asignar eventos a los botones
  document.querySelectorAll(".favorito-btn").forEach((btn) => {
    btn.addEventListener("click", eliminarFavorito);
  });
}

// eliminar fav
function eliminarFavorito(e) {
  const id = parseInt(e.target.dataset.id);
  favoritos = favoritos.filter((fav) => fav.id !== id);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  Swal.fire({
    toast: true,
    position: "center",
    icon: "info",
    title: "Eliminado de favoritos",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  mostrarFavoritos(favoritos);
}

mostrarFavoritos(favoritos);
