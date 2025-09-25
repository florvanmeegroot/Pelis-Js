// Elementos
const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const saludo = document.getElementById("saludo");
const contenidoAdulto = document.getElementById("contenido-mayores");
const contenidoNinios = document.getElementById("contenido-menores");

// Credenciales fijas
const USERNAME = "user";
const PASSWORD = "pass";

// Verificar si ya hay datos guardados
document.addEventListener("DOMContentLoaded", () => {
  const usuarioGuardado = localStorage.getItem("usuario");
  const nombreGuardado = localStorage.getItem("nombre");
  const edadGuardada = localStorage.getItem("edad");

  if (usuarioGuardado === USERNAME && nombreGuardado && edadGuardada) {
    mostrarContenido(nombreGuardado, parseInt(edadGuardada));
  } else {
    loginModal.style.display = "flex";
  }
});

// Manejo del formulario
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();
  const edad = parseInt(document.getElementById("edad").value.trim());

  // Validación de usuario/contraseña
  if (usuario !== USERNAME || password !== PASSWORD) {
    alert("Usuario o contraseña incorrectos");
    return;
  }

  // Validación de edad y nombre
  if (!nombre || isNaN(edad) || edad <= 0) {
    alert("Por favor completa todos los campos correctamente");
    return;
  }

  // Guardar en localStorage
  localStorage.setItem("nombre", nombre);
  localStorage.setItem("usuario", usuario);
  localStorage.setItem("edad", edad);

  mostrarContenido(nombre, edad);
});

// Función para mostrar contenido según edad
function mostrarContenido(nombre, edad) {
  loginModal.style.display = "none";

  // Mostrar saludo general
  saludo.style.display = "block";
  saludo.textContent = `Hola, ${nombre}`;

  if (edad >= 18) {
    contenidoAdulto.style.display = "block";
    contenidoNinios.style.display = "none";
  } else {
    contenidoNinios.style.display = "block";
    contenidoAdulto.style.display = "none";
  }
}
