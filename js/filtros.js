    // Función para mostrar películas
    function mostrarPeliculas(genero) {
      const contenedor = document.getElementById("listaPeliculas");
      contenedor.innerHTML = "";

      let filtradas = genero === "Todos"
        ? peliculas
        : peliculas.filter(p => p.genero.toLowerCase() === genero.toLowerCase());

      if (filtradas.length === 0) {
        contenedor.innerHTML = "<p>No hay películas en esta categoría</p>";
        return;
      }

      filtradas.forEach(p => {
        const card = `
          <div class="card-filtro">
            <img src="${p.imagen}" alt="${p.nombre}">
            <h4>${p.nombre}</h4>
            <p>${p.anio} - ${p.genero}</p>
          </div>
        `;
        contenedor.innerHTML += card;
      });
    }

    // Mostrar todas al cargar
    mostrarPeliculas("Todos");