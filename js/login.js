const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const saludo = document.getElementById("saludo");

// Mostrar modal o saludo al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const nombreGuardado = localStorage.getItem("nombre");
  const edadGuardada = localStorage.getItem("edad");
  const logueado = localStorage.getItem("logueado");

  if (logueado === "true" && nombreGuardado && edadGuardada) {
    // Usuario ya inició sesión previamente
    loginModal.style.display = "none";
    mostrarSaludo(nombreGuardado);
  } else {
    // Mostrar modal de login
    loginModal.style.display = "flex";
  }
});

// Manejo del formulario
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const edad = parseInt(document.getElementById("edad").value.trim());
  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validación simple
  if (usuario !== "user" || password !== "pass") {
    alert("Usuario o contraseña incorrectos");
    return;
  }

  if (!nombre || isNaN(edad) || edad <= 0) {
    alert("Por favor completa todos los campos correctamente");
    return;
  }

  // Guardar en localStorage
  localStorage.setItem("nombre", nombre);
  localStorage.setItem("edad", edad);
  localStorage.setItem("logueado", "true");

  // Cerrar modal y mostrar saludo
  loginModal.style.display = "none";
  mostrarSaludo(nombre);
});

// Función para mostrar saludo
function mostrarSaludo(nombre) {
  saludo.style.display = "block";
  saludo.textContent = `¡Hola, ${nombre}!`;
}
