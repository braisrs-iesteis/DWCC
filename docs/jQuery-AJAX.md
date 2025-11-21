# jQuery y AJAX

## Introducción a jQuery

jQuery es una biblioteca de JavaScript rápida, pequeña y rica en funcionalidades. Simplifica la manipulación del DOM, el manejo de eventos, las animaciones y las peticiones AJAX, haciendo que el desarrollo web sea más sencillo con una API fácil de usar que funciona en múltiples navegadores.

!!! info
jQuery fue muy popular en el pasado, pero con las mejoras de JavaScript moderno (ES6+), muchas de sus funcionalidades ahora están disponibles de forma nativa. Sin embargo, sigue siendo útil para proyectos legacy o cuando se busca compatibilidad con navegadores antiguos.

[📚 Documentación oficial de jQuery](https://jquery.com/)

---

## Instalación de jQuery

### Mediante CDN

La forma más rápida de incluir jQuery en tu proyecto:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Mi proyecto con jQuery</title>
  </head>
  <body>
    <h1>Hola jQuery</h1>

    <!-- jQuery desde CDN -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="script.js"></script>
  </body>
</html>
```

### Mediante npm

Para proyectos con gestores de paquetes:

```bash
npm install jquery
```

```javascript
// Importar en tu archivo JavaScript
import $ from "jquery";
```

---

## Sintaxis básica de jQuery

### El objeto `$`

jQuery utiliza el símbolo `$` como alias de `jQuery`. Es la función principal para seleccionar elementos.

```javascript
// Esperar a que el DOM esté listo
$(document).ready(function () {
  console.log("El DOM está listo");
});

// Versión corta (más común)
$(function () {
  console.log("El DOM está listo");
});
```

**Equivalente en JavaScript vanilla:**

```javascript
document.addEventListener("DOMContentLoaded", function () {
  console.log("El DOM está listo");
});
```

---

## Selección de elementos

jQuery utiliza selectores CSS para seleccionar elementos del DOM.

### Selectores básicos

```javascript
// Por ID
const titulo = $("#titulo");

// Por clase
const items = $(".item");

// Por etiqueta
const parrafos = $("p");

// Combinados
const enlacesActivos = $("a.activo");

// Atributos
const inputEmail = $("input[type='email']");
```

**Comparación con JavaScript vanilla:**

```javascript
// jQuery
const elemento = $("#miElemento");

// JavaScript vanilla
const elemento = document.querySelector("#miElemento");
```

### Selectores avanzados

```javascript
// Primer elemento
const primero = $("li:first");

// Último elemento
const ultimo = $("li:last");

// Elementos pares e impares
const pares = $("tr:even");
const impares = $("tr:odd");

// Elementos que contienen texto
const conTexto = $("p:contains('importante')");

// Elementos visibles/ocultos
const visibles = $("div:visible");
const ocultos = $("div:hidden");
```

[📚 Documentación MDN - Selectores](https://api.jquery.com/category/selectors/)

---

## Manipulación del DOM

### Modificar contenido

```javascript
// Obtener/establecer texto
const texto = $("#parrafo").text();
$("#parrafo").text("Nuevo texto");

// Obtener/establecer HTML
const html = $("#contenedor").html();
$("#contenedor").html("<strong>Texto en negrita</strong>");

// Obtener/establecer valor de inputs
const valor = $("#email").val();
$("#email").val("nuevo@email.com");
```

### Modificar atributos

```javascript
// Obtener atributo
const src = $("#imagen").attr("src");

// Establecer atributo
$("#imagen").attr("src", "nueva-imagen.jpg");

// Establecer múltiples atributos
$("#enlace").attr({
  href: "https://ejemplo.com",
  title: "Ir a ejemplo",
  target: "_blank",
});

// Eliminar atributo
$("#imagen").removeAttr("alt");
```

### Modificar CSS

```javascript
// Obtener valor CSS
const color = $("#titulo").css("color");

// Establecer un estilo
$("#titulo").css("color", "blue");

// Establecer múltiples estilos
$("#titulo").css({
  color: "blue",
  fontSize: "24px",
  fontWeight: "bold",
});
```

### Clases CSS

```javascript
// Añadir clase
$("#elemento").addClass("activo");

// Eliminar clase
$("#elemento").removeClass("activo");

// Alternar clase
$("#elemento").toggleClass("activo");

// Verificar si tiene clase
if ($("#elemento").hasClass("activo")) {
  console.log("El elemento está activo");
}
```

---

## Crear y eliminar elementos

### Crear elementos

```javascript
// Crear un nuevo elemento
const nuevoDiv = $("<div>").text("Nuevo contenido");
const nuevoParrafo = $("<p>", {
  text: "Texto del párrafo",
  class: "destacado",
  id: "parrafo-1",
});

// Añadir al final de un elemento
$("#contenedor").append(nuevoDiv);

// Añadir al principio de un elemento
$("#contenedor").prepend(nuevoParrafo);

// Añadir después de un elemento
$("#elemento").after("<p>Después</p>");

// Añadir antes de un elemento
$("#elemento").before("<p>Antes</p>");
```

### Eliminar elementos

```javascript
// Eliminar elemento
$("#elemento").remove();

// Vaciar contenido de un elemento
$("#contenedor").empty();

// Eliminar elementos que coincidan con selector
$("p").remove(".temporal");
```

---

## Manejo de eventos con jQuery

### Eventos básicos

```javascript
// Click
$("#boton").click(function () {
  console.log("Botón clickeado");
});

// Doble click
$("#elemento").dblclick(function () {
  console.log("Doble click");
});

// Hover (mouseenter + mouseleave)
$("#elemento").hover(
  function () {
    $(this).addClass("hover");
  },
  function () {
    $(this).removeClass("hover");
  }
);

// Focus y blur
$("#input").focus(function () {
  $(this).css("background-color", "yellow");
});

$("#input").blur(function () {
  $(this).css("background-color", "white");
});
```

### Método `on()` (recomendado)

El método `on()` es más versátil y es la forma moderna de manejar eventos en jQuery.

```javascript
// Sintaxis básica
$("#boton").on("click", function () {
  console.log("Click");
});

// Múltiples eventos
$("#elemento").on("mouseenter mouseleave", function () {
  $(this).toggleClass("hover");
});

// Con objeto de eventos
$("#elemento").on({
  click: function () {
    console.log("Click");
  },
  mouseenter: function () {
    console.log("Mouse entró");
  },
  mouseleave: function () {
    console.log("Mouse salió");
  },
});
```

### Delegación de eventos

Útil para elementos que se crean dinámicamente:

```javascript
// Los eventos se delegan al contenedor padre
$("#lista").on("click", "li", function () {
  console.log("Click en:", $(this).text());
});

// Ahora funciona incluso para <li> añadidos después
$("#lista").append("<li>Nuevo item</li>");
```

### Eliminar eventos

```javascript
// Eliminar todos los eventos
$("#elemento").off();

// Eliminar eventos específicos
$("#elemento").off("click");

// Eliminar manejador específico
function miManejador() {
  console.log("Click");
}

$("#elemento").on("click", miManejador);
$("#elemento").off("click", miManejador);
```

---

## Efectos y animaciones

### Mostrar y ocultar

```javascript
// Ocultar
$("#elemento").hide();
$("#elemento").hide(1000); // Con duración en ms

// Mostrar
$("#elemento").show();
$("#elemento").show("slow"); // "slow", "fast", o milisegundos

// Alternar visibilidad
$("#elemento").toggle();
$("#elemento").toggle(500);
```

### Fade (fundido)

```javascript
// Fade out (desaparecer)
$("#elemento").fadeOut();
$("#elemento").fadeOut(1000);

// Fade in (aparecer)
$("#elemento").fadeIn();
$("#elemento").fadeIn("slow");

// Fade toggle
$("#elemento").fadeToggle();

// Fade a opacidad específica
$("#elemento").fadeTo(1000, 0.5); // 50% de opacidad
```

### Slide (deslizamiento)

```javascript
// Slide up (contraer)
$("#elemento").slideUp();
$("#elemento").slideUp(1000);

// Slide down (expandir)
$("#elemento").slideDown();
$("#elemento").slideDown("fast");

// Slide toggle
$("#elemento").slideToggle();
```

### Callback en animaciones

```javascript
// Ejecutar función después de la animación
$("#elemento").fadeOut(1000, function () {
  console.log("Animación completada");
  $(this).remove();
});

// Ejemplo con slide
$("#menu").slideUp(500, function () {
  console.log("Menú oculto");
});
```

### Animaciones personalizadas con `animate()`

```javascript
// Sintaxis básica
$("#caja").animate(
  {
    width: "300px",
    height: "300px",
    opacity: 0.5,
  },
  1000
);

// Con opciones avanzadas
$("#caja").animate(
  {
    left: "250px",
    top: "100px",
  },
  {
    duration: 1000,
    easing: "swing", // o "linear"
    complete: function () {
      console.log("Animación terminada");
    },
  }
);

// Animaciones en cadena
$("#caja")
  .animate({ width: "300px" }, 1000)
  .animate({ height: "300px" }, 1000)
  .animate({ opacity: 0.5 }, 500);
```

!!! warning "Limitación"
`animate()` solo funciona con propiedades numéricas. No puede animar colores directamente.

---

## Recorrer el DOM

### Navegación por ancestros

```javascript
// Padre directo
const padre = $("#elemento").parent();

// Todos los ancestros
const ancestros = $("#elemento").parents();

// Ancestros que cumplan un selector
const contenedores = $("#elemento").parents(".contenedor");

// Ancestro más cercano que cumpla el selector
const masProximo = $("#elemento").closest(".contenedor");
```

### Navegación por descendientes

```javascript
// Hijos directos
const hijos = $("#contenedor").children();

// Hijos que cumplan selector
const hijosP = $("#contenedor").children("p");

// Todos los descendientes
const todos = $("#contenedor").find("*");

// Descendientes específicos
const enlaces = $("#contenedor").find("a");
```

### Navegación por hermanos

```javascript
// Todos los hermanos
const hermanos = $("#elemento").siblings();

// Hermanos que cumplan selector
const hermanosLi = $("#elemento").siblings("li");

// Siguiente hermano
const siguiente = $("#elemento").next();

// Hermano anterior
const anterior = $("#elemento").prev();

// Todos los siguientes hermanos
const todosSiguientes = $("#elemento").nextAll();

// Todos los anteriores hermanos
const todosAnteriores = $("#elemento").prevAll();
```

---

## Filtrado y selección

```javascript
// Primer elemento
const primero = $("li").first();

// Último elemento
const ultimo = $("li").last();

// Elemento en posición específica (índice desde 0)
const tercero = $("li").eq(2);

// Filtrar por selector
const activos = $("li").filter(".activo");

// Filtrar por función
const mayores = $("li").filter(function () {
  return parseInt($(this).text()) > 5;
});

// Elementos que NO cumplan el selector
const noActivos = $("li").not(".activo");
```

---

## AJAX con jQuery

AJAX (Asynchronous JavaScript and XML) permite hacer peticiones HTTP al servidor sin recargar la página. jQuery simplifica enormemente el trabajo con AJAX.

### Método `$.ajax()` (completo)

El método más completo y configurable:

```javascript
$.ajax({
  url: "https://jsonplaceholder.typicode.com/users",
  method: "GET", // o "POST", "PUT", "DELETE"
  dataType: "json",
  success: function (data) {
    console.log("Datos recibidos:", data);
  },
  error: function (xhr, status, error) {
    console.error("Error:", error);
  },
  complete: function () {
    console.log("Petición completada");
  },
});
```

**Ejemplo completo con POST:**

```javascript
$.ajax({
  url: "https://jsonplaceholder.typicode.com/users",
  method: "POST",
  data: {
    name: "Ana García",
    email: "ana@example.com",
    username: "anagarcia",
  },
  dataType: "json",
  beforeSend: function () {
    console.log("Enviando datos...");
  },
  success: function (response) {
    console.log("Usuario creado:", response);
  },
  error: function (xhr, status, error) {
    console.error("Error al crear usuario:", error);
    console.log("Status:", status);
    console.log("Response:", xhr.responseText);
  },
  complete: function () {
    console.log("Petición finalizada");
  },
});
```

### Método `$.get()` (simplificado)

Para peticiones GET simples:

```javascript
// Sintaxis básica
$.get("https://jsonplaceholder.typicode.com/users", function (data) {
  console.log("Usuarios:", data);
});

// Con parámetros
$.get("https://jsonplaceholder.typicode.com/users", { id: 1 }, function (data) {
  console.log("Usuario:", data);
});

// Con manejo de errores
$.get("https://jsonplaceholder.typicode.com/users")
  .done(function (data) {
    console.log("Éxito:", data);
  })
  .fail(function (error) {
    console.error("Error:", error);
  })
  .always(function () {
    console.log("Completado");
  });
```

### Método `$.post()` (simplificado)

Para peticiones POST simples:

```javascript
// Sintaxis básica
const nuevoUsuario = {
  name: "Carlos López",
  email: "carlos@example.com",
};

$.post(
  "https://jsonplaceholder.typicode.com/users",
  nuevoUsuario,
  function (response) {
    console.log("Usuario creado:", response);
  }
);

// Con manejo de errores
$.post("https://jsonplaceholder.typicode.com/users", nuevoUsuario)
  .done(function (response) {
    console.log("Éxito:", response);
  })
  .fail(function (error) {
    console.error("Error:", error);
  });
```

### Método `$.getJSON()` (para JSON)

Específicamente para obtener datos JSON:

```javascript
// Sintaxis básica
$.getJSON("https://jsonplaceholder.typicode.com/users", function (data) {
  console.log("Datos JSON:", data);
});

// Con parámetros
$.getJSON(
  "https://jsonplaceholder.typicode.com/users",
  { _limit: 5 },
  function (data) {
    console.log("Primeros 5 usuarios:", data);
  }
);

// Con manejo de errores
$.getJSON("https://jsonplaceholder.typicode.com/users")
  .done(function (data) {
    console.log("Datos recibidos:", data);
  })
  .fail(function (jqXHR, textStatus, error) {
    console.error("Error al obtener JSON:", error);
  });
```

### Método `.load()` (cargar HTML)

Carga contenido HTML directamente en un elemento:

```javascript
// Cargar contenido en un elemento
$("#contenedor").load("pagina.html");

// Cargar solo una parte del contenido
$("#contenedor").load("pagina.html #seccion");

// Con callback
$("#contenedor").load("pagina.html", function (response, status, xhr) {
  if (status === "success") {
    console.log("Contenido cargado");
  } else {
    console.error("Error al cargar:", xhr.statusText);
  }
});
```

---

## Navegación con Hash (#) en URLs

El operador `#` (hash) en las URLs permite crear navegación sin recargar la página, ideal para Single Page Applications (SPA) o navegación entre secciones.

### Concepto básico del Hash

El hash es la parte de la URL después del símbolo `#`. Por ejemplo:
- `http://ejemplo.com/#inicio`
- `http://ejemplo.com/#productos`
- `http://ejemplo.com/#contacto`

Cuando cambias el hash, la página no se recarga, pero puedes detectar el cambio y actualizar el contenido dinámicamente.

### Detectar cambios en el Hash

```javascript
// Evento cuando cambia el hash
$(window).on("hashchange", function () {
  const hash = window.location.hash; // Obtiene el hash actual (ej: "#inicio")
  console.log("Hash cambió a:", hash);
});

// Obtener el hash actual
const hashActual = window.location.hash;
console.log("Hash actual:", hashActual);

// Cambiar el hash programáticamente
window.location.hash = "#nueva-seccion";
```

### Ejemplo: Navegación por pestañas

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Navegación con Hash</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 50px auto;
      }
      .nav {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
        border-bottom: 2px solid #ddd;
      }
      .nav a {
        padding: 10px 20px;
        text-decoration: none;
        color: #333;
        border-radius: 5px 5px 0 0;
      }
      .nav a.active {
        background-color: #007bff;
        color: white;
      }
      .contenido {
        display: none;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
      }
      .contenido.active {
        display: block;
      }
    </style>
  </head>
  <body>
    <h1>Navegación con Hash</h1>

    <nav class="nav">
      <a href="#inicio" class="tab-link">Inicio</a>
      <a href="#productos" class="tab-link">Productos</a>
      <a href="#servicios" class="tab-link">Servicios</a>
      <a href="#contacto" class="tab-link">Contacto</a>
    </nav>

    <div id="inicio" class="contenido">
      <h2>Bienvenido</h2>
      <p>Esta es la página de inicio.</p>
    </div>

    <div id="productos" class="contenido">
      <h2>Nuestros Productos</h2>
      <p>Aquí puedes ver todos nuestros productos.</p>
    </div>

    <div id="servicios" class="contenido">
      <h2>Servicios</h2>
      <p>Ofrecemos una amplia gama de servicios.</p>
    </div>

    <div id="contacto" class="contenido">
      <h2>Contacto</h2>
      <p>Ponte en contacto con nosotros.</p>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script>
      $(function () {
        // Función para mostrar la sección correspondiente
        function mostrarSeccion() {
          // Obtener el hash o usar '#inicio' por defecto
          let hash = window.location.hash || "#inicio";

          // Ocultar todas las secciones
          $(".contenido").removeClass("active");

          // Remover clase active de todos los enlaces
          $(".tab-link").removeClass("active");

          // Mostrar la sección correspondiente
          $(hash).addClass("active");

          // Activar el enlace correspondiente
          $(`.tab-link[href="${hash}"]`).addClass("active");
        }

        // Mostrar la sección inicial
        mostrarSeccion();

        // Detectar cambios en el hash
        $(window).on("hashchange", mostrarSeccion);
      });
    </script>
  </body>
</html>
```

### Ejemplo avanzado: Cargar contenido dinámico con Hash

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Navegación Dinámica con Hash y AJAX</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 900px;
        margin: 50px auto;
        padding: 20px;
      }
      .nav {
        display: flex;
        gap: 15px;
        margin-bottom: 30px;
        background-color: #f5f5f5;
        padding: 15px;
        border-radius: 5px;
      }
      .nav a {
        padding: 10px 20px;
        text-decoration: none;
        color: #333;
        background-color: white;
        border-radius: 5px;
        transition: all 0.3s;
      }
      .nav a:hover {
        background-color: #007bff;
        color: white;
      }
      .nav a.active {
        background-color: #0056b3;
        color: white;
      }
      #contenido {
        min-height: 300px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: white;
      }
      .loading {
        text-align: center;
        color: #666;
        font-style: italic;
        padding: 50px;
      }
      .error {
        color: red;
        padding: 20px;
        background-color: #ffe6e6;
        border-radius: 5px;
      }
      .breadcrumb {
        margin-bottom: 20px;
        color: #666;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <h1>Sistema de Navegación SPA</h1>

    <div class="breadcrumb" id="breadcrumb">Inicio</div>

    <nav class="nav">
      <a href="#home" class="nav-link">🏠 Inicio</a>
      <a href="#users" class="nav-link">👥 Usuarios</a>
      <a href="#posts" class="nav-link">📝 Posts</a>
      <a href="#albums" class="nav-link">📷 Álbumes</a>
    </nav>

    <div id="contenido"></div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script>
      $(function () {
        // Objeto con las rutas y sus configuraciones
        const rutas = {
          "#home": {
            titulo: "Inicio",
            breadcrumb: "🏠 Inicio",
            cargar: function () {
              $("#contenido").html(`
                <h2>Bienvenido al Sistema</h2>
                <p>Este es un ejemplo de navegación usando hash (#) en las URLs.</p>
                <p>Puedes navegar entre secciones sin recargar la página.</p>
                <ul>
                  <li>✅ Navegación rápida y fluida</li>
                  <li>✅ URLs compartibles</li>
                  <li>✅ Funciona con el botón atrás del navegador</li>
                  <li>✅ Carga dinámica de contenido</li>
                </ul>
              `);
            },
          },
          "#users": {
            titulo: "Usuarios",
            breadcrumb: "🏠 Inicio / 👥 Usuarios",
            cargar: function () {
              $("#contenido").html('<p class="loading">Cargando usuarios...</p>');

              $.getJSON("https://jsonplaceholder.typicode.com/users?_limit=5")
                .done(function (usuarios) {
                  let html = "<h2>Lista de Usuarios</h2><div>";

                  usuarios.forEach(function (usuario) {
                    html += `
                      <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px;">
                        <h3>${usuario.name}</h3>
                        <p><strong>Email:</strong> ${usuario.email}</p>
                        <p><strong>Teléfono:</strong> ${usuario.phone}</p>
                        <p><strong>Ciudad:</strong> ${usuario.address.city}</p>
                        <p><strong>Empresa:</strong> ${usuario.company.name}</p>
                      </div>
                    `;
                  });

                  html += "</div>";
                  $("#contenido").html(html);
                })
                .fail(function () {
                  $("#contenido").html(
                    '<p class="error">❌ Error al cargar los usuarios</p>'
                  );
                });
            },
          },
          "#posts": {
            titulo: "Posts",
            breadcrumb: "🏠 Inicio / 📝 Posts",
            cargar: function () {
              $("#contenido").html('<p class="loading">Cargando posts...</p>');

              $.getJSON("https://jsonplaceholder.typicode.com/posts?_limit=8")
                .done(function (posts) {
                  let html = "<h2>Últimos Posts</h2><div>";

                  posts.forEach(function (post) {
                    html += `
                      <div style="border-left: 4px solid #007bff; padding: 15px; margin: 15px 0; background-color: #f9f9f9;">
                        <h3 style="margin-top: 0; color: #007bff;">${post.title}</h3>
                        <p>${post.body}</p>
                        <small style="color: #666;">Post ID: ${post.id}</small>
                      </div>
                    `;
                  });

                  html += "</div>";
                  $("#contenido").html(html);
                })
                .fail(function () {
                  $("#contenido").html(
                    '<p class="error">❌ Error al cargar los posts</p>'
                  );
                });
            },
          },
          "#albums": {
            titulo: "Álbumes",
            breadcrumb: "🏠 Inicio / 📷 Álbumes",
            cargar: function () {
              $("#contenido").html('<p class="loading">Cargando álbumes...</p>');

              $.getJSON("https://jsonplaceholder.typicode.com/albums?_limit=6")
                .done(function (albums) {
                  let html =
                    '<h2>Álbumes Disponibles</h2><div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">';

                  albums.forEach(function (album) {
                    html += `
                      <div style="border: 1px solid #ddd; padding: 20px; border-radius: 10px; text-align: center; background-color: #f9f9f9;">
                        <div style="font-size: 48px; margin-bottom: 10px;">📷</div>
                        <h3 style="font-size: 16px; margin: 10px 0;">${album.title}</h3>
                        <small style="color: #666;">Álbum #${album.id}</small>
                      </div>
                    `;
                  });

                  html += "</div></div>";
                  $("#contenido").html(html);
                })
                .fail(function () {
                  $("#contenido").html(
                    '<p class="error">❌ Error al cargar los álbumes</p>'
                  );
                });
            },
          },
        };

        // Función principal de enrutamiento
        function cargarRuta() {
          // Obtener el hash actual o usar '#home' por defecto
          let hash = window.location.hash || "#home";

          // Si la ruta no existe, cargar home
          if (!rutas[hash]) {
            hash = "#home";
            window.location.hash = hash;
            return;
          }

          // Actualizar enlaces activos
          $(".nav-link").removeClass("active");
          $(`.nav-link[href="${hash}"]`).addClass("active");

          // Actualizar breadcrumb
          $("#breadcrumb").text(rutas[hash].breadcrumb);

          // Actualizar título de la página
          document.title = rutas[hash].titulo + " - Sistema SPA";

          // Cargar contenido
          rutas[hash].cargar();

          // Scroll al inicio
          window.scrollTo(0, 0);
        }

        // Cargar ruta inicial
        cargarRuta();

        // Detectar cambios en el hash
        $(window).on("hashchange", cargarRuta);

        // Prevenir comportamiento por defecto en algunos casos
        $(".nav-link").on("click", function (e) {
          // Si ya estamos en esa ruta, recargar el contenido
          if ($(this).attr("href") === window.location.hash) {
            e.preventDefault();
            cargarRuta();
          }
        });
      });
    </script>
  </body>
</html>
```

### Ventajas de usar Hash para navegación

✅ **No recarga la página** - Navegación más rápida y fluida

✅ **URLs compartibles** - Cada sección tiene su propia URL

✅ **Funciona con historial** - Los botones atrás/adelante del navegador funcionan

✅ **SEO mejorado** - Con configuración adicional, los motores de búsqueda pueden indexar el contenido

✅ **Menor carga del servidor** - Solo se cargan los datos necesarios

### Métodos útiles para trabajar con Hash

```javascript
// Obtener el hash actual
const hash = window.location.hash; // Ej: "#productos"

// Obtener hash sin el símbolo #
const hashLimpio = window.location.hash.substring(1); // Ej: "productos"

// Cambiar el hash (añade entrada al historial)
window.location.hash = "#nueva-seccion";

// Reemplazar el hash (no añade entrada al historial)
window.location.replace("#nueva-seccion");

// Eliminar el hash
history.pushState("", document.title, window.location.pathname);

// Verificar si existe un hash
if (window.location.hash) {
  console.log("Hay un hash en la URL");
}

// Extraer parámetros del hash (ej: #usuario/123)
const partes = window.location.hash.split("/");
const recurso = partes[0]; // "#usuario"
const id = partes[1]; // "123"
```

### Patrón avanzado: Router con parámetros

```javascript
$(function () {
  // Sistema de rutas más complejo
  function Router() {
    this.rutas = {};

    // Definir una ruta
    this.ruta = function (patron, callback) {
      this.rutas[patron] = callback;
    };

    // Navegar a una ruta
    this.navegar = function () {
      const hash = window.location.hash.substring(1) || "home";

      // Buscar ruta exacta
      if (this.rutas[hash]) {
        this.rutas[hash]();
        return;
      }

      // Buscar ruta con parámetros (ej: usuario/123)
      for (let patron in this.rutas) {
        if (patron.includes(":")) {
          const regex = new RegExp("^" + patron.replace(/:[^\/]+/g, "([^/]+)") + "$");
          const match = hash.match(regex);

          if (match) {
            // Extraer parámetros
            const params = match.slice(1);
            this.rutas[patron].apply(null, params);
            return;
          }
        }
      }

      // Ruta no encontrada
      $("#contenido").html("<h2>404 - Página no encontrada</h2>");
    };
  }

  // Crear instancia del router
  const router = new Router();

  // Definir rutas
  router.ruta("home", function () {
    $("#contenido").html("<h2>Inicio</h2><p>Bienvenido</p>");
  });

  router.ruta("usuario/:id", function (id) {
    $("#contenido").html(`<h2>Usuario #${id}</h2><p>Cargando datos...</p>`);

    // Cargar datos del usuario
    $.getJSON(`https://jsonplaceholder.typicode.com/users/${id}`)
      .done(function (usuario) {
        $("#contenido").html(`
          <h2>${usuario.name}</h2>
          <p><strong>Email:</strong> ${usuario.email}</p>
          <p><strong>Teléfono:</strong> ${usuario.phone}</p>
        `);
      })
      .fail(function () {
        $("#contenido").html(`<p class="error">Usuario no encontrado</p>`);
      });
  });

  router.ruta("post/:id", function (id) {
    $("#contenido").html(`<h2>Post #${id}</h2><p>Cargando...</p>`);

    $.getJSON(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .done(function (post) {
        $("#contenido").html(`
          <h2>${post.title}</h2>
          <p>${post.body}</p>
        `);
      });
  });

  // Iniciar router
  router.navegar();

  // Escuchar cambios de hash
  $(window).on("hashchange", function () {
    router.navegar();
  });

  // Ejemplo de uso:
  // Navegar a: #usuario/1
  // Navegar a: #post/5
});
```

!!! tip "Consejo"
    Para aplicaciones modernas más complejas, considera usar librerías especializadas como React Router, Vue Router, o el History API nativo del navegador con `pushState()` para URLs más limpias sin el símbolo `#`.

[📚 Documentación MDN - window.location.hash](https://developer.mozilla.org/es/docs/Web/API/Location/hash)

---

## Ejemplo práctico completo: Lista de usuarios

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gestión de Usuarios con jQuery</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 50px auto;
        padding: 20px;
      }
      .usuario {
        border: 1px solid #ddd;
        padding: 15px;
        margin: 10px 0;
        border-radius: 5px;
        background-color: #f9f9f9;
      }
      .usuario:hover {
        background-color: #e9e9e9;
      }
      button {
        padding: 10px 20px;
        margin: 5px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        background-color: #007bff;
        color: white;
      }
      button:hover {
        background-color: #0056b3;
      }
      .loading {
        color: #666;
        font-style: italic;
      }
      .error {
        color: red;
        padding: 10px;
        background-color: #ffe6e6;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <h1>Gestión de Usuarios</h1>

    <div>
      <button id="cargarUsuarios">Cargar Usuarios</button>
      <button id="limpiar">Limpiar Lista</button>
    </div>

    <div id="mensaje"></div>
    <div id="listaUsuarios"></div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script>
      $(function () {
        // Cargar usuarios al hacer click
        $("#cargarUsuarios").click(function () {
          cargarUsuarios();
        });

        // Limpiar lista
        $("#limpiar").click(function () {
          $("#listaUsuarios").empty();
          $("#mensaje").text("");
        });

        // Función para cargar usuarios
        function cargarUsuarios() {
          // Mostrar mensaje de carga
          $("#mensaje").html('<p class="loading">Cargando usuarios...</p>');
          $("#listaUsuarios").empty();

          // Petición AJAX
          $.ajax({
            url: "https://jsonplaceholder.typicode.com/users",
            method: "GET",
            dataType: "json",
            success: function (usuarios) {
              $("#mensaje").html(
                `<p>✅ ${usuarios.length} usuarios cargados</p>`
              );

              // Mostrar cada usuario
              usuarios.forEach(function (usuario) {
                const usuarioHTML = `
                                <div class="usuario">
                                    <h3>${usuario.name}</h3>
                                    <p><strong>Email:</strong> ${usuario.email}</p>
                                    <p><strong>Teléfono:</strong> ${usuario.phone}</p>
                                    <p><strong>Ciudad:</strong> ${usuario.address.city}</p>
                                    <button class="ver-posts" data-user-id="${usuario.id}">
                                        Ver Posts
                                    </button>
                                </div>
                            `;
                $("#listaUsuarios").append(usuarioHTML);
              });
            },
            error: function (xhr, status, error) {
              $("#mensaje").html(
                `<p class="error">❌ Error al cargar usuarios: ${error}</p>`
              );
            },
          });
        }

        // Delegación de eventos para botones creados dinámicamente
        $("#listaUsuarios").on("click", ".ver-posts", function () {
          const userId = $(this).data("user-id");
          const boton = $(this);

          boton.text("Cargando...").prop("disabled", true);

          // Cargar posts del usuario
          $.getJSON(
            `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
          )
            .done(function (posts) {
              alert(`El usuario tiene ${posts.length} posts`);
              boton.text("Ver Posts").prop("disabled", false);
            })
            .fail(function () {
              alert("Error al cargar posts");
              boton.text("Ver Posts").prop("disabled", false);
            });
        });
      });
    </script>
  </body>
</html>
```

---

## Configuración global de AJAX

Puedes configurar opciones que se aplicarán a todas las peticiones AJAX:

```javascript
// Configurar timeout global
$.ajaxSetup({
  timeout: 5000, // 5 segundos
});

// Configurar headers globales
$.ajaxSetup({
  headers: {
    Authorization: "Bearer mi-token-secreto",
  },
});

// Evento global antes de enviar cualquier petición
$(document).ajaxStart(function () {
  console.log("Iniciando petición AJAX");
  $("#loading").show();
});

// Evento global al completar cualquier petición
$(document).ajaxComplete(function () {
  console.log("Petición AJAX completada");
  $("#loading").hide();
});

// Evento global en caso de error
$(document).ajaxError(function (event, jqXHR, settings, error) {
  console.error("Error en petición AJAX:", error);
});
```

---

## Utilidades de jQuery

### Recorrer arrays y objetos

```javascript
// Recorrer array
const numeros = [1, 2, 3, 4, 5];
$.each(numeros, function (index, valor) {
  console.log(`Índice ${index}: ${valor}`);
});

// Recorrer objeto
const persona = { nombre: "Ana", edad: 28, ciudad: "Madrid" };
$.each(persona, function (clave, valor) {
  console.log(`${clave}: ${valor}`);
});

// Recorrer elementos del DOM
$("li").each(function (index) {
  console.log(`Item ${index}: ${$(this).text()}`);
});
```

### Mapear arrays

```javascript
const numeros = [1, 2, 3, 4, 5];
const duplicados = $.map(numeros, function (num) {
  return num * 2;
});
console.log(duplicados); // [2, 4, 6, 8, 10]

// Con elementos del DOM
const textos = $("li")
  .map(function () {
    return $(this).text();
  })
  .get(); // .get() convierte el objeto jQuery a array
```

### Filtrar arrays

```javascript
const numeros = [1, 2, 3, 4, 5, 6];
const pares = $.grep(numeros, function (num) {
  return num % 2 === 0;
});
console.log(pares); // [2, 4, 6]
```

### Comprobar tipos

```javascript
// Es array
$.isArray([1, 2, 3]); // true

// Es función
$.isFunction(function () {}); // true

// Es numérico
$.isNumeric(123); // true
$.isNumeric("123"); // true
$.isNumeric("abc"); // false

// Es objeto plano
$.isPlainObject({}); // true
$.isPlainObject(new Date()); // false

// Está vacío
$.isEmptyObject({}); // true
```

### Extender objetos

```javascript
// Combinar objetos
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const resultado = $.extend(obj1, obj2);
console.log(resultado); // { a: 1, b: 3, c: 4 }

// Copia profunda (deep copy)
const obj1 = { a: { x: 1 } };
const obj2 = { a: { y: 2 } };
const resultado = $.extend(true, {}, obj1, obj2);
console.log(resultado); // { a: { x: 1, y: 2 } }
```

---

## jQuery vs JavaScript moderno

Muchas funcionalidades de jQuery ahora están disponibles en JavaScript nativo:

| jQuery                     | JavaScript Moderno                 |
| -------------------------- | ---------------------------------- |
| `$(selector)`              | `document.querySelector(selector)` |
| `$(selector).find()`       | `element.querySelectorAll()`       |
| `$(element).addClass()`    | `element.classList.add()`          |
| `$(element).removeClass()` | `element.classList.remove()`       |
| `$(element).toggleClass()` | `element.classList.toggle()`       |
| `$(element).on()`          | `element.addEventListener()`       |
| `$(element).text()`        | `element.textContent`              |
| `$(element).html()`        | `element.innerHTML`                |
| `$.ajax()`                 | `fetch()`                          |

**Ejemplo comparativo:**

```javascript
// jQuery
$("#boton").click(function () {
  $(this).addClass("activo");
});

// JavaScript moderno
document.querySelector("#boton").addEventListener("click", function () {
  this.classList.add("activo");
});
```

---

## Mejores prácticas

### 1. Esperar al DOM

```javascript
// ✅ Correcto
$(document).ready(function () {
  // Tu código aquí
});

// ✅ Versión corta
$(function () {
  // Tu código aquí
});
```

### 2. Cachear selectores

```javascript
// ❌ Malo - selecciona cada vez
$("#lista").append("<li>Item 1</li>");
$("#lista").append("<li>Item 2</li>");
$("#lista").append("<li>Item 3</li>");

// ✅ Bueno - selecciona una vez
const $lista = $("#lista");
$lista.append("<li>Item 1</li>");
$lista.append("<li>Item 2</li>");
$lista.append("<li>Item 3</li>");
```

### 3. Usar delegación de eventos

```javascript
// ❌ Malo - no funciona con elementos dinámicos
$(".boton").click(function () {
  console.log("Click");
});

// ✅ Bueno - funciona con elementos dinámicos
$("#contenedor").on("click", ".boton", function () {
  console.log("Click");
});
```

### 4. Encadenar métodos

```javascript
// ❌ Menos eficiente
$("#elemento").addClass("activo");
$("#elemento").fadeIn();
$("#elemento").css("color", "blue");

// ✅ Más eficiente
$("#elemento").addClass("activo").fadeIn().css("color", "blue");
```

### 5. Usar `this` correctamente

```javascript
// En un manejador de eventos, `this` es el elemento DOM
$("button").click(function () {
  // ❌ Mal
  $("button").addClass("activo"); // Afecta a TODOS los botones

  // ✅ Bien
  $(this).addClass("activo"); // Solo afecta al botón clickeado
});
```

---

## Recursos adicionales

- [📚 Documentación oficial de jQuery](https://api.jquery.com/)
- [📚 jQuery Learning Center](https://learn.jquery.com/)
- [📚 MDN - AJAX](https://developer.mozilla.org/es/docs/Web/Guide/AJAX)
- [📚 You Might Not Need jQuery](https://youmightnotneedjquery.com/) - Alternativas en JavaScript vanilla
- [📚 jQuery CDN](https://code.jquery.com/)

---

## Resumen

jQuery simplifica muchas tareas comunes en JavaScript:

✅ **Ventajas:**

- Sintaxis simple y concisa
- Compatibilidad entre navegadores
- Gran ecosistema de plugins
- Excelente para proyectos legacy

❌ **Desventajas:**

- Tamaño adicional (aunque es pequeño)
- JavaScript moderno ya incluye muchas de sus funcionalidades
- Rendimiento ligeramente inferior al JavaScript nativo

!!! tip "Recomendación"
Para proyectos nuevos, considera usar JavaScript moderno (ES6+) con `fetch()` y las APIs nativas del DOM. Usa jQuery si trabajas con código legacy o necesitas compatibilidad con navegadores antiguos.
