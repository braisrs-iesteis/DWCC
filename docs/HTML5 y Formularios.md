# HTML5 y Formularios

## Introducción a HTML5

HTML5 es la quinta revisión del lenguaje HTML que introdujo nuevas etiquetas semánticas, APIs y tipos de input para formularios que mejoran la accesibilidad, SEO y experiencia de usuario.

[📚 Documentación MDN - HTML5](https://developer.mozilla.org/es/docs/Glossary/HTML5)

---

## Estructura Semántica HTML5

### Etiquetas Semánticas Principales

HTML5 introduce etiquetas que describen el significado de su contenido:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mi Página HTML5</title>
  </head>
  <body>
    <header>
      <nav>
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#acerca">Acerca de</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <article>
        <h1>Título del Artículo</h1>
        <section>
          <h2>Sección 1</h2>
          <p>Contenido de la sección</p>
        </section>
      </article>

      <aside>
        <h3>Información Relacionada</h3>
        <p>Contenido lateral</p>
      </aside>
    </main>

    <footer>
      <p>&copy; 2025 Mi Sitio Web</p>
    </footer>
  </body>
</html>
```

[📚 Documentación MDN - HTML elements](https://developer.mozilla.org/es/docs/Web/HTML/Element)

### Descripción de Etiquetas Semánticas

| Etiqueta    | Descripción                                    |
| ----------- | ---------------------------------------------- |
| `<header>`  | Encabezado de la página o sección              |
| `<nav>`     | Navegación principal                           |
| `<main>`    | Contenido principal único de la página         |
| `<article>` | Contenido independiente y reutilizable         |
| `<section>` | Sección temática del documento                 |
| `<aside>`   | Contenido relacionado pero secundario          |
| `<footer>`  | Pie de página o sección                        |
| `<figure>`  | Contenido autónomo con `<figcaption>` opcional |
| `<time>`    | Fecha u hora legible por máquinas              |
| `<mark>`    | Texto resaltado o marcado                      |

---

## Elementos Multimedia HTML5

### Video

```html
<video width="640" height="360" controls>
  <source src="video.mp4" type="video/mp4" />
  <source src="video.webm" type="video/webm" />
  Tu navegador no soporta el elemento video.
</video>
```

**Atributos comunes:**

- `controls`: Muestra controles de reproducción
- `autoplay`: Reproduce automáticamente
- `loop`: Reproduce en bucle
- `muted`: Sin audio por defecto
- `poster`: Imagen de vista previa

[📚 Documentación MDN - video](https://developer.mozilla.org/es/docs/Web/HTML/Element/video)

### Audio

```html
<audio controls>
  <source src="audio.mp3" type="audio/mpeg" />
  <source src="audio.ogg" type="audio/ogg" />
  Tu navegador no soporta el elemento audio.
</audio>
```

[📚 Documentación MDN - audio](https://developer.mozilla.org/es/docs/Web/HTML/Element/audio)

### Canvas

```html
<canvas id="miCanvas" width="400" height="300"></canvas>

<script>
  const canvas = document.getElementById("miCanvas");
  const ctx = canvas.getContext("2d");

  // Dibujar un rectángulo
  ctx.fillStyle = "#3498db";
  ctx.fillRect(50, 50, 200, 100);

  // Dibujar un círculo
  ctx.beginPath();
  ctx.arc(300, 150, 50, 0, Math.PI * 2);
  ctx.fillStyle = "#e74c3c";
  ctx.fill();
</script>
```

[📚 Documentación MDN - canvas](https://developer.mozilla.org/es/docs/Web/HTML/Element/canvas)

---

## Formularios en HTML5

Los formularios son fundamentales para la interacción con el usuario y recopilación de datos.

[📚 Documentación MDN - HTML forms](https://developer.mozilla.org/es/docs/Learn/Forms)

### Estructura Básica de un Formulario

```html
<form action="/procesar" method="POST" id="miFormulario">
  <label for="nombre">Nombre:</label>
  <input type="text" id="nombre" name="nombre" required />

  <button type="submit">Enviar</button>
</form>
```

**Atributos importantes del `<form>`:**

- `action`: URL donde se envían los datos
- `method`: GET o POST
- `enctype`: Tipo de codificación (necesario para archivos)
- `novalidate`: Desactiva la validación HTML5

[📚 Documentación MDN - form element](https://developer.mozilla.org/es/docs/Web/HTML/Element/form)

---

## Tipos de Input en HTML5

HTML5 introdujo nuevos tipos de input con validación nativa y teclados optimizados en móviles.

### Input Text (Texto)

```html
<label for="nombre">Nombre:</label>
<input
  type="text"
  id="nombre"
  name="nombre"
  placeholder="Ingresa tu nombre"
  maxlength="50"
  required
/>
```

**Atributos:**

- `placeholder`: Texto de ayuda
- `maxlength`: Longitud máxima
- `minlength`: Longitud mínima
- `pattern`: Expresión regular para validación

[📚 Documentación MDN - input type="text"](https://developer.mozilla.org/es/docs/Web/HTML/Element/input/text)

### Input Email

```html
<label for="email">Email:</label>
<input
  type="email"
  id="email"
  name="email"
  placeholder="usuario@ejemplo.com"
  required
/>
```

!!! info "Validación automática"
El navegador valida automáticamente que el formato sea un email válido.

[📚 Documentación MDN - input type="email"](https://developer.mozilla.org/es/docs/Web/HTML/Element/input/email)

### Input Password

```html
<label for="password">Contraseña:</label>
<input type="password" id="password" name="password" minlength="8" required />
```

[📚 Documentación MDN - input type="password"](https://developer.mozilla.org/es/docs/Web/HTML/Element/input/password)

### Input Number

```html
<label for="edad">Edad:</label>
<input
  type="number"
  id="edad"
  name="edad"
  min="18"
  max="100"
  step="1"
  value="25"
/>
```

**Atributos:**

- `min`: Valor mínimo
- `max`: Valor máximo
- `step`: Incremento (por defecto 1)

[📚 Documentación MDN - input type="number"](https://developer.mozilla.org/es/docs/Web/HTML/Element/input/number)

### Input Range (Deslizador)

```html
<label for="volumen">Volumen:</label>
<input type="range" id="volumen" name="volumen" min="0" max="100" value="50" />
<output id="valorVolumen">50</output>

<script>
  const rangeInput = document.getElementById("volumen");
  const output = document.getElementById("valorVolumen");

  rangeInput.addEventListener("input", (e) => {
    output.textContent = e.target.value;
  });
</script>
```

[📚 Documentación MDN - input type="range"](https://developer.mozilla.org/es/docs/Web/HTML/Element/input/range)

### Input Date, Time y DateTime

```html
<!-- Fecha -->
<label for="fecha">Fecha de nacimiento:</label>
<input type="date" id="fecha" name="fecha" min="1900-01-01" max="2025-12-31" />

<!-- Hora -->
<label for="hora">Hora:</label>
<input type="time" id="hora" name="hora" />

<!-- Fecha y hora local -->
<label for="fechahora">Fecha y hora:</label>
<input type="datetime-local" id="fechahora" name="fechahora" />

<!-- Mes -->
<label for="mes">Mes:</label>
<input type="month" id="mes" name="mes" />

<!-- Semana -->
<label for="semana">Semana:</label>
<input type="week" id="semana" name="semana" />
```

[📚 Documentación MDN - input type="date"](https://developer.mozilla.org/es/docs/Web/HTML/Element/input/date)

### Input Tel (Teléfono)

```html
<label for="telefono">Teléfono:</label>
<input
  type="tel"
  id="telefono"
  name="telefono"
  pattern="[0-9]{9}"
  placeholder="123456789"
/>
```

[📚 Documentación MDN - input type="tel"](https://developer.mozilla.org/es/docs/Web/HTML/Element/input/tel)

### Input URL

```html
<label for="web">Sitio web:</label>
<input type="url" id="web" name="web" placeholder="https://ejemplo.com" />
```

[📚 Documentación MDN - input type="url"](https://developer.mozilla.org/es/docs/Web/HTML/Element/input/url)

### Input Search (Búsqueda)

```html
<label for="buscar">Buscar:</label>
<input
  type="search"
  id="buscar"
  name="buscar"
  placeholder="¿Qué estás buscando?"
/>
```

[📚 Documentación MDN - input type="search"](https://developer.mozilla.org/es/docs/Web/HTML/Element/input/search)

### Input Color

```html
<label for="color">Elige un color:</label>
<input type="color" id="color" name="color" value="#3498db" />
```

[📚 Documentación MDN - input type="color"](https://developer.mozilla.org/es/docs/Web/HTML/Element/input/color)

### Input File (Archivos)

```html
<label for="archivo">Subir archivo:</label>
<input
  type="file"
  id="archivo"
  name="archivo"
  accept="image/*,application/pdf"
  multiple
/>
```

**Atributos:**

- `accept`: Tipos de archivo permitidos
- `multiple`: Permite seleccionar varios archivos

[📚 Documentación MDN - input type="file"](https://developer.mozilla.org/es/docs/Web/HTML/Element/input/file)

---

## Elementos de Selección

### Checkbox (Casillas de verificación)

```html
<fieldset>
  <legend>Intereses:</legend>

  <input type="checkbox" id="deportes" name="intereses" value="deportes" />
  <label for="deportes">Deportes</label>

  <input type="checkbox" id="musica" name="intereses" value="musica" checked />
  <label for="musica">Música</label>

  <input type="checkbox" id="lectura" name="intereses" value="lectura" />
  <label for="lectura">Lectura</label>
</fieldset>
```

[📚 Documentación MDN - input type="checkbox"](https://developer.mozilla.org/es/docs/Web/HTML/Element/input/checkbox)

### Radio Buttons (Botones de radio)

```html
<fieldset>
  <legend>Género:</legend>

  <input type="radio" id="masculino" name="genero" value="M" />
  <label for="masculino">Masculino</label>

  <input type="radio" id="femenino" name="genero" value="F" checked />
  <label for="femenino">Femenino</label>

  <input type="radio" id="otro" name="genero" value="otro" />
  <label for="otro">Otro</label>
</fieldset>
```

!!! tip "Importante"
Los radio buttons con el mismo `name` forman un grupo donde solo uno puede estar seleccionado.

[📚 Documentación MDN - input type="radio"](https://developer.mozilla.org/es/docs/Web/HTML/Element/input/radio)

### Select (Lista desplegable)

```html
<label for="pais">País:</label>
<select id="pais" name="pais" required>
  <option value="">-- Selecciona un país --</option>
  <option value="ES">España</option>
  <option value="MX">México</option>
  <option value="AR">Argentina</option>
  <option value="CO">Colombia</option>
</select>
```

**Select con grupos:**

```html
<label for="ciudad">Ciudad:</label>
<select id="ciudad" name="ciudad">
  <optgroup label="España">
    <option value="madrid">Madrid</option>
    <option value="barcelona">Barcelona</option>
  </optgroup>
  <optgroup label="México">
    <option value="cdmx">Ciudad de México</option>
    <option value="guadalajara">Guadalajara</option>
  </optgroup>
</select>
```

**Select múltiple:**

```html
<label for="idiomas">Idiomas (Ctrl/Cmd + click):</label>
<select id="idiomas" name="idiomas" multiple size="4">
  <option value="es">Español</option>
  <option value="en">Inglés</option>
  <option value="fr">Francés</option>
  <option value="de">Alemán</option>
</select>
```

[📚 Documentación MDN - select](https://developer.mozilla.org/es/docs/Web/HTML/Element/select)

### Datalist (Autocompletado)

```html
<label for="navegador">Elige tu navegador:</label>
<input type="text" id="navegador" name="navegador" list="navegadores" />

<datalist id="navegadores">
  <option value="Chrome"></option>
  <option value="Firefox"></option>
  <option value="Safari"></option>
  <option value="Edge"></option>
  <option value="Opera"></option>
</datalist>
```

[📚 Documentación MDN - datalist](https://developer.mozilla.org/es/docs/Web/HTML/Element/datalist)

---

## Área de Texto

### Textarea

```html
<label for="comentarios">Comentarios:</label>
<textarea
  id="comentarios"
  name="comentarios"
  rows="5"
  cols="50"
  maxlength="500"
  placeholder="Escribe tus comentarios aquí..."
></textarea>
```

**Atributos:**

- `rows`: Número de líneas visibles
- `cols`: Ancho en caracteres
- `maxlength`: Longitud máxima

[📚 Documentación MDN - textarea](https://developer.mozilla.org/es/docs/Web/HTML/Element/textarea)

---

## Botones

### Tipos de Botones

```html
<!-- Botón de envío -->
<button type="submit">Enviar Formulario</button>

<!-- Botón de reinicio -->
<button type="reset">Limpiar Formulario</button>

<!-- Botón genérico -->
<button type="button" onclick="alert('Hola')">Click Aquí</button>

<!-- Input como botón (menos recomendado) -->
<input type="submit" value="Enviar" />
<input type="reset" value="Limpiar" />
<input type="button" value="Botón" />
```

!!! tip "Usar button sobre input"
Se recomienda usar `<button>` en lugar de `<input type="button">` porque permite contenido HTML interno (iconos, imágenes, etc.).

[📚 Documentación MDN - button](https://developer.mozilla.org/es/docs/Web/HTML/Element/button)

---

## Validación HTML5

HTML5 proporciona validación del lado del cliente sin necesidad de JavaScript.

### Atributos de Validación

```html
<form id="formularioRegistro">
  <!-- Campo requerido -->
  <input type="text" name="nombre" required />

  <!-- Longitud mínima y máxima -->
  <input type="text" name="usuario" minlength="3" maxlength="20" required />

  <!-- Patrón (expresión regular) -->
  <input
    type="text"
    name="codigo"
    pattern="[A-Z]{3}[0-9]{3}"
    title="3 letras mayúsculas seguidas de 3 números"
  />

  <!-- Rango de números -->
  <input type="number" name="edad" min="18" max="100" required />

  <!-- Validación de email -->
  <input type="email" name="email" required />

  <!-- Validación de URL -->
  <input type="url" name="web" />

  <button type="submit">Enviar</button>
</form>
```

[📚 Documentación MDN - Form validation](https://developer.mozilla.org/es/docs/Learn/Forms/Form_validation)

### Mensajes de Validación Personalizados

```html
<form id="miForm">
  <input type="email" id="email" name="email" required />
  <button type="submit">Enviar</button>
</form>

<script>
  const emailInput = document.getElementById("email");

  emailInput.addEventListener("invalid", (e) => {
    e.preventDefault(); // Previene el mensaje por defecto

    if (emailInput.validity.valueMissing) {
      emailInput.setCustomValidity("Por favor, ingresa tu email");
    } else if (emailInput.validity.typeMismatch) {
      emailInput.setCustomValidity("Por favor, ingresa un email válido");
    }
  });

  emailInput.addEventListener("input", () => {
    emailInput.setCustomValidity(""); // Limpia el mensaje personalizado
  });
</script>
```

### Estados de Validación CSS

HTML5 proporciona pseudo-clases CSS para estilizar campos según su estado:

```css
/* Campo válido */
input:valid {
  border-color: green;
}

/* Campo inválido */
input:invalid {
  border-color: red;
}

/* Campo requerido */
input:required {
  border-left: 3px solid blue;
}

/* Campo opcional */
input:optional {
  border-left: 3px solid gray;
}

/* Campo en foco */
input:focus {
  outline: 2px solid #3498db;
}

/* Solo mostrar error después de interactuar */
input:not(:placeholder-shown):invalid {
  border-color: red;
}
```

---

## Ejemplo Completo: Formulario de Registro

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Formulario de Registro</title>
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
      }

      form {
        background: #f4f4f4;
        padding: 30px;
        border-radius: 8px;
      }

      .form-group {
        margin-bottom: 20px;
      }

      label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }

      input,
      select,
      textarea {
        width: 100%;
        padding: 10px;
        border: 2px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
      }

      input:focus,
      select:focus,
      textarea:focus {
        outline: none;
        border-color: #3498db;
      }

      input:valid {
        border-color: #2ecc71;
      }

      input:invalid:not(:placeholder-shown) {
        border-color: #e74c3c;
      }

      button {
        background: #3498db;
        color: white;
        padding: 12px 30px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
      }

      button:hover {
        background: #2980b9;
      }

      .error {
        color: #e74c3c;
        font-size: 14px;
        margin-top: 5px;
      }
    </style>
  </head>
  <body>
    <form id="formularioRegistro" novalidate>
      <h2>Formulario de Registro</h2>

      <div class="form-group">
        <label for="nombre">Nombre Completo *</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Juan Pérez"
          minlength="3"
          required
        />
        <span class="error" id="errorNombre"></span>
      </div>

      <div class="form-group">
        <label for="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="usuario@ejemplo.com"
          required
        />
        <span class="error" id="errorEmail"></span>
      </div>

      <div class="form-group">
        <label for="password">Contraseña *</label>
        <input
          type="password"
          id="password"
          name="password"
          minlength="8"
          required
        />
        <span class="error" id="errorPassword"></span>
      </div>

      <div class="form-group">
        <label for="fechaNacimiento">Fecha de Nacimiento *</label>
        <input
          type="date"
          id="fechaNacimiento"
          name="fechaNacimiento"
          max="2007-12-31"
          required
        />
        <span class="error" id="errorFecha"></span>
      </div>

      <div class="form-group">
        <label for="telefono">Teléfono</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          pattern="[0-9]{9}"
          placeholder="123456789"
        />
        <span class="error" id="errorTelefono"></span>
      </div>

      <div class="form-group">
        <label for="pais">País *</label>
        <select id="pais" name="pais" required>
          <option value="">-- Selecciona un país --</option>
          <option value="ES">España</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
        </select>
        <span class="error" id="errorPais"></span>
      </div>

      <div class="form-group">
        <label>Género *</label>
        <div>
          <input type="radio" id="masculino" name="genero" value="M" required />
          <label for="masculino" style="display: inline;">Masculino</label>

          <input type="radio" id="femenino" name="genero" value="F" />
          <label for="femenino" style="display: inline;">Femenino</label>

          <input type="radio" id="otro" name="genero" value="otro" />
          <label for="otro" style="display: inline;">Otro</label>
        </div>
        <span class="error" id="errorGenero"></span>
      </div>

      <div class="form-group">
        <label>Intereses</label>
        <div>
          <input
            type="checkbox"
            id="deportes"
            name="intereses"
            value="deportes"
          />
          <label for="deportes" style="display: inline;">Deportes</label>

          <input
            type="checkbox"
            id="tecnologia"
            name="intereses"
            value="tecnologia"
          />
          <label for="tecnologia" style="display: inline;">Tecnología</label>

          <input type="checkbox" id="arte" name="intereses" value="arte" />
          <label for="arte" style="display: inline;">Arte</label>
        </div>
      </div>

      <div class="form-group">
        <label for="biografia">Biografía</label>
        <textarea
          id="biografia"
          name="biografia"
          rows="4"
          maxlength="200"
          placeholder="Cuéntanos sobre ti..."
        ></textarea>
      </div>

      <div class="form-group">
        <input type="checkbox" id="terminos" name="terminos" required />
        <label for="terminos" style="display: inline;">
          Acepto los términos y condiciones *
        </label>
        <span class="error" id="errorTerminos"></span>
      </div>

      <button type="submit">Registrarse</button>
    </form>

    <script>
      const form = document.getElementById("formularioRegistro");

      // Validación personalizada
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Limpiar errores previos
        document.querySelectorAll(".error").forEach((span) => {
          span.textContent = "";
        });

        let valido = true;

        // Validar nombre
        const nombre = document.getElementById("nombre");
        if (!nombre.value.trim()) {
          document.getElementById("errorNombre").textContent =
            "El nombre es requerido";
          valido = false;
        } else if (nombre.value.length < 3) {
          document.getElementById("errorNombre").textContent =
            "El nombre debe tener al menos 3 caracteres";
          valido = false;
        }

        // Validar email
        const email = document.getElementById("email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value) {
          document.getElementById("errorEmail").textContent =
            "El email es requerido";
          valido = false;
        } else if (!emailRegex.test(email.value)) {
          document.getElementById("errorEmail").textContent =
            "El email no es válido";
          valido = false;
        }

        // Validar contraseña
        const password = document.getElementById("password");
        if (!password.value) {
          document.getElementById("errorPassword").textContent =
            "La contraseña es requerida";
          valido = false;
        } else if (password.value.length < 8) {
          document.getElementById("errorPassword").textContent =
            "La contraseña debe tener al menos 8 caracteres";
          valido = false;
        }

        // Validar fecha
        const fecha = document.getElementById("fechaNacimiento");
        if (!fecha.value) {
          document.getElementById("errorFecha").textContent =
            "La fecha de nacimiento es requerida";
          valido = false;
        }

        // Validar teléfono si se proporciona
        const telefono = document.getElementById("telefono");
        if (telefono.value && !/^[0-9]{9}$/.test(telefono.value)) {
          document.getElementById("errorTelefono").textContent =
            "El teléfono debe tener 9 dígitos";
          valido = false;
        }

        // Validar país
        const pais = document.getElementById("pais");
        if (!pais.value) {
          document.getElementById("errorPais").textContent =
            "Debes seleccionar un país";
          valido = false;
        }

        // Validar género
        const genero = document.querySelector('input[name="genero"]:checked');
        if (!genero) {
          document.getElementById("errorGenero").textContent =
            "Debes seleccionar un género";
          valido = false;
        }

        // Validar términos
        const terminos = document.getElementById("terminos");
        if (!terminos.checked) {
          document.getElementById("errorTerminos").textContent =
            "Debes aceptar los términos y condiciones";
          valido = false;
        }

        if (valido) {
          // Recopilar datos del formulario
          const formData = new FormData(form);
          const datos = {};

          for (let [key, value] of formData.entries()) {
            if (key === "intereses") {
              if (!datos[key]) datos[key] = [];
              datos[key].push(value);
            } else {
              datos[key] = value;
            }
          }

          console.log("Datos del formulario:", datos);
          alert("Formulario enviado correctamente!");

          // Aquí enviarías los datos al servidor
          // fetch('/api/registro', {
          //     method: 'POST',
          //     headers: { 'Content-Type': 'application/json' },
          //     body: JSON.stringify(datos)
          // });
        }
      });

      // Limpiar error al escribir
      form.querySelectorAll("input, select, textarea").forEach((campo) => {
        campo.addEventListener("input", () => {
          const errorId =
            "error" + campo.id.charAt(0).toUpperCase() + campo.id.slice(1);
          const errorSpan = document.getElementById(errorId);
          if (errorSpan) {
            errorSpan.textContent = "";
          }
        });
      });
    </script>
  </body>
</html>
```

---

## Trabajar con Formularios desde JavaScript

### Acceder a los Datos del Formulario

```javascript
const form = document.getElementById("miForm");

// Método 1: FormData (recomendado)
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  // Iterar sobre los datos
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  // Convertir a objeto
  const datos = Object.fromEntries(formData);
  console.log(datos);
});

// Método 2: Acceso directo a elementos
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = form.elements.nombre.value;
  const email = form.elements.email.value;

  console.log({ nombre, email });
});
```

[📚 Documentación MDN - FormData](https://developer.mozilla.org/es/docs/Web/API/FormData)

### Validación Personalizada

```javascript
const form = document.getElementById("miForm");
const emailInput = document.getElementById("email");

emailInput.addEventListener("blur", () => {
  const email = emailInput.value;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    emailInput.setCustomValidity("Por favor, ingresa un email válido");
    emailInput.reportValidity(); // Muestra el mensaje
  } else {
    emailInput.setCustomValidity("");
  }
});
```

### Reset y Clear

```javascript
const form = document.getElementById("miForm");

// Resetear formulario (valores por defecto)
document.getElementById("btnReset").addEventListener("click", () => {
  form.reset();
});

// Limpiar formulario completamente
document.getElementById("btnClear").addEventListener("click", () => {
  form.querySelectorAll("input, select, textarea").forEach((campo) => {
    if (campo.type === "checkbox" || campo.type === "radio") {
      campo.checked = false;
    } else {
      campo.value = "";
    }
  });
});
```

---

## Atributos Globales Útiles

### autofocus

```html
<input type="text" name="nombre" autofocus />
```

Enfoca automáticamente el campo al cargar la página.

### autocomplete

```html
<input type="text" name="nombre" autocomplete="name" />
<input type="email" name="email" autocomplete="email" />
<input type="tel" name="telefono" autocomplete="tel" />
```

Habilita el autocompletado del navegador con valores predefinidos.

[📚 Documentación MDN - autocomplete](https://developer.mozilla.org/es/docs/Web/HTML/Attributes/autocomplete)

### disabled y readonly

```html
<!-- Deshabilitado (no se envía en el formulario) -->
<input type="text" name="campo1" disabled />

<!-- Solo lectura (se envía en el formulario) -->
<input type="text" name="campo2" readonly value="No editable" />
```

---

## Buenas Prácticas

!!! tip "Accesibilidad" - **Siempre** usa `<label>` con el atributo `for` vinculado al `id` del input - Usa `<fieldset>` y `<legend>` para agrupar campos relacionados - Proporciona mensajes de error claros y descriptivos - Usa `aria-describedby` para asociar mensajes de ayuda - Asegúrate de que el formulario sea navegable con teclado

!!! tip "Validación" - Implementa validación tanto en cliente (HTML5/JS) como en servidor - Proporciona feedback inmediato al usuario - Usa mensajes de error personalizados y útiles - Valida progresivamente (mientras el usuario escribe)

!!! tip "UX/UI" - Usa placeholders como guía, no como labels - Agrupa campos relacionados - Marca claramente los campos requeridos - Proporciona indicadores visuales de validación - Usa tipos de input apropiados para mejorar la experiencia móvil

!!! warning "Seguridad" - **NUNCA** confíes solo en la validación del cliente - Sanitiza y valida todos los datos en el servidor - Usa HTTPS para formularios sensibles - Implementa protección CSRF - Usa `autocomplete="off"` para datos sensibles si es necesario

---

## Recursos Adicionales

- [📚 MDN - HTML forms guide](https://developer.mozilla.org/es/docs/Learn/Forms)
- [📚 MDN - HTML input types](https://developer.mozilla.org/es/docs/Web/HTML/Element/input)
- [📚 MDN - Form validation](https://developer.mozilla.org/es/docs/Learn/Forms/Form_validation)
- [📚 MDN - Sending form data](https://developer.mozilla.org/es/docs/Learn/Forms/Sending_and_retrieving_form_data)
- [📚 W3C - HTML5 specification](https://www.w3.org/TR/html52/)
- [📚 Can I use - HTML5 form features](https://caniuse.com/?search=html5%20forms)
