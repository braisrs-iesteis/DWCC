const nombre = document.getElementById("nombre");
const profesion = document.getElementById("profesion");
const descripcion = document.getElementById("descripcion");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const ciudad = document.getElementById("ciudad");
const infoExtra = document.getElementById("info-extra");
const mensajeFooter = document.getElementById("mensaje-footer");
const listaHabilidades = document.getElementById("lista-habilidades");

const btnCambiarNombre = document.querySelector("#btn-cambiar-nombre");
const btnCambiarProfesion = document.querySelector("#btn-cambiar-profesion");
const btnEditarDesc = document.querySelector("#btn-editar-desc");
const btnAñadirHabilidad = document.querySelector("#btn-añadir-habilidad");
const btnOcultarHabilidades = document.querySelector(
  "#btn-ocultar-habilidades"
);
const btnTema = document.querySelector("#btn-tema");
const btnCambiarEmail = document.querySelector("#btn-cambiar-email");
const btnMostrarInfo = document.querySelector("#btn-mostrar-info");

const todasLasHabilidades = document.querySelectorAll(".habilidad");

function cambiarNombre() {
  const nuevoNombre = prompt("Escribe tu nombre:");
  if (nuevoNombre.trim() !== "") {
    nombre.textContent = nuevoNombre;
    nombre.setAttribute("data-usuario", nuevoNombre);

    const usuarioGuardado = nombre.getAttribute("data-usuario");
    console.log(`Nombre guardado en data-usuario: ${usuarioGuardado}`);
    mensajeFooter.innerHTML = `¡Perfil actualizado! Bienvenido/a <strong>${nuevoNombre}</strong>`;
    setTimeout(() => {
      mensajeFooter.textContent = "Perfil creado con JavaScript";
    }, 5000);
  }
}

function cambiarProfesion() {
  const nuevaProfesion = prompt("Escribe tu profesión:");
  if (nuevaProfesion.trim() !== "") {
    profesion.textContent = nuevaProfesion;
  }
}

function editarDescripcion() {
  const nuevaDescripcion = prompt("Escribe tu descripción:");
  if (nuevaDescripcion.trim() !== "") {
    descripcion.textContent = nuevaDescripcion;
  }
}

function cambiarEmail() {
  const nuevoEmail = prompt("Escribe tu email:");
  if (nuevoEmail.trim() !== "") {
    email.textContent = nuevoEmail;
  }
}

function añadirHabilidad() {
  const nuevaHabilidad = prompt("Escribe una nueva habilidad:");
  if (nuevaHabilidad.trim() !== "") {
    const divHabilidad = document.createElement("div");
    divHabilidad.className = "habilidad";
    divHabilidad.textContent = nuevaHabilidad;
    divHabilidad.addEventListener("click", function () {
      eliminarHabilidad(divHabilidad);
    });
    listaHabilidades.appendChild(divHabilidad);
  }
}

function eliminarHabilidad(habilidad) {
  habilidad.remove();
}

function cambiarVisibilidadActividades() {
  listaHabilidades.classList.toggle("oculto");
  if (listaHabilidades.classList.contains("oculto")) {
    btnOcultarHabilidades.textContent = "Mostrar Habilidades";
  } else {
    btnOcultarHabilidades.textContent = "Ocultar Habilidades";
  }
}

function cambiarTema() {
  document.body.classList.toggle("tema-oscuro");
  if (document.body.classList.contains("tema-oscuro")) {
    btnTema.textContent = "Modo Claro";
  } else {
    btnTema.textContent = "Modo Oscuro";
  }
}

function inicializarEventosHabilidades() {
  todasLasHabilidades.forEach(function (habilidad) {
    habilidad.addEventListener("click", function () {
      eliminarHabilidad(habilidad);
    });
  });
}

inicializarEventosHabilidades();
btnCambiarNombre.addEventListener("click", cambiarNombre);
btnCambiarProfesion.addEventListener("click", cambiarProfesion);
btnEditarDesc.addEventListener("click", editarDescripcion);
btnAñadirHabilidad.addEventListener("click", añadirHabilidad);
btnOcultarHabilidades.addEventListener("click", cambiarVisibilidadActividades);
btnTema.addEventListener("click", cambiarTema);
