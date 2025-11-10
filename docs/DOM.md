# Manipulación del DOM en JavaScript

## Selección de elementos

### `getElementById()`

Selecciona un elemento por su atributo `id`.

```javascript
const titulo = document.getElementById("titulo");
console.log(titulo);
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Document/getElementById)

### `getElementsByClassName()`

Devuelve una colección de elementos que tienen la clase especificada.

```javascript
const items = document.getElementsByClassName("item");
console.log(items.length); // Número de elementos
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Document/getElementsByClassName)

### `getElementsByTagName()`

Devuelve una colección de elementos con el nombre de etiqueta especificado.

```javascript
const parrafos = document.getElementsByTagName("p");
for (let p of parrafos) {
  console.log(p.textContent);
}
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Document/getElementsByTagName)

### `querySelector()`

Devuelve el primer elemento que coincide con el selector CSS especificado.

```javascript
const primerBoton = document.querySelector(".boton");
const enlace = document.querySelector('a[href="#inicio"]');
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Document/querySelector)

### `querySelectorAll()`

Devuelve una NodeList con todos los elementos que coinciden con el selector CSS.

```javascript
const botones = document.querySelectorAll(".boton");
botones.forEach((btn) => {
  console.log(btn.textContent);
});
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Document/querySelectorAll)

---

## Modificación de contenido

### `textContent`

Obtiene o establece el contenido de texto de un elemento.

```javascript
const parrafo = document.querySelector("p");
console.log(parrafo.textContent); // Leer
parrafo.textContent = "Nuevo texto"; // Escribir
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Node/textContent)

### `innerHTML`

Obtiene o establece el contenido HTML de un elemento.

```javascript
const contenedor = document.getElementById("contenedor");
contenedor.innerHTML = "<strong>Texto en negrita</strong>";
```

⚠️ **Precaución**: Usar `innerHTML` con contenido no confiable puede provocar ataques XSS.

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Element/innerHTML)

### `innerText`

Similar a `textContent`, pero respeta los estilos CSS (elementos ocultos no se incluyen).

```javascript
const div = document.querySelector("div");
console.log(div.innerText); // Solo texto visible
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/HTMLElement/innerText)

---

## Manipulación de atributos

### `getAttribute()`

Obtiene el valor de un atributo especificado.

```javascript
const enlace = document.querySelector("a");
const url = enlace.getAttribute("href");
console.log(url);
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Element/getAttribute)

### `setAttribute()`

Establece o modifica el valor de un atributo.

```javascript
const imagen = document.querySelector("img");
imagen.setAttribute("src", "nueva-imagen.jpg");
imagen.setAttribute("alt", "Descripción de la imagen");
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Element/setAttribute)

### `removeAttribute()`

Elimina un atributo del elemento.

```javascript
const input = document.querySelector("input");
input.removeAttribute("disabled");
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Element/removeAttribute)

### `hasAttribute()`

Verifica si un elemento tiene un atributo específico.

```javascript
const boton = document.querySelector("button");
if (boton.hasAttribute("disabled")) {
  console.log("El botón está deshabilitado");
}
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Element/hasAttribute)

---

## Manipulación de clases CSS

### `classList.add()`

Añade una o más clases a un elemento.

```javascript
const caja = document.querySelector(".caja");
caja.classList.add("activo", "destacado");
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Element/classList)

### `classList.remove()`

Elimina una o más clases de un elemento.

```javascript
const boton = document.querySelector(".boton");
boton.classList.remove("deshabilitado");
```

### `classList.toggle()`

Alterna una clase: la añade si no existe, la elimina si existe.

```javascript
const menu = document.querySelector(".menu");
menu.classList.toggle("abierto"); // Añade o quita 'abierto'
```

### `classList.contains()`

Verifica si un elemento tiene una clase específica.

```javascript
const elemento = document.querySelector(".elemento");
if (elemento.classList.contains("activo")) {
  console.log("El elemento está activo");
}
```

### `classList.replace()`

Reemplaza una clase existente por otra nueva.

```javascript
const tarjeta = document.querySelector(".tarjeta");
tarjeta.classList.replace("tema-claro", "tema-oscuro");
```

---

## Creación y eliminación de elementos

### `createElement()`

Crea un nuevo elemento HTML.

```javascript
const nuevoDiv = document.createElement("div");
nuevoDiv.textContent = "Contenido del div";
nuevoDiv.className = "mi-clase";
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Document/createElement)

### `appendChild()`

Añade un elemento hijo al final de un elemento padre.

```javascript
const lista = document.querySelector("ul");
const nuevoItem = document.createElement("li");
nuevoItem.textContent = "Nuevo elemento";
lista.appendChild(nuevoItem);
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Node/appendChild)

### `insertBefore()`

Inserta un elemento antes de otro elemento hijo específico.

```javascript
const lista = document.querySelector("ul");
const nuevoItem = document.createElement("li");
nuevoItem.textContent = "Primero";
const primerHijo = lista.firstChild;
lista.insertBefore(nuevoItem, primerHijo);
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Node/insertBefore)

### `removeChild()`

Elimina un elemento hijo de un elemento padre.

```javascript
const lista = document.querySelector("ul");
const itemAEliminar = document.querySelector("#item2");
lista.removeChild(itemAEliminar);
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Node/removeChild)

### `remove()`

Elimina el elemento del DOM directamente.

```javascript
const elemento = document.querySelector("#eliminar");
elemento.remove();
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Element/remove)

### `cloneNode()`

Crea una copia de un elemento. Si se pasa `true`, clona también sus hijos.

```javascript
const original = document.querySelector(".tarjeta");
const copia = original.cloneNode(true); // Clona con hijos
document.body.appendChild(copia);
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Node/cloneNode)

---

## Navegación por el DOM

### `parentElement`

Devuelve el elemento padre de un elemento.

```javascript
const hijo = document.querySelector(".hijo");
const padre = hijo.parentElement;
console.log(padre);
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Node/parentElement)

### `children`

Devuelve una colección de elementos hijos (solo elementos, no nodos de texto).

```javascript
const contenedor = document.querySelector(".contenedor");
console.log(contenedor.children.length);
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Element/children)

### `childNodes`

Devuelve todos los nodos hijos, incluyendo nodos de texto y comentarios.

```javascript
const div = document.querySelector("div");
console.log(div.childNodes); // Incluye espacios y saltos de línea
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Node/childNodes)

### `firstElementChild` / `lastElementChild`

Devuelve el primer o último elemento hijo.

```javascript
const lista = document.querySelector("ul");
console.log(lista.firstElementChild); // Primer <li>
console.log(lista.lastElementChild); // Último <li>
```

[📚 Documentación MDN - firstElementChild](https://developer.mozilla.org/es/docs/Web/API/Element/firstElementChild)

### `nextElementSibling` / `previousElementSibling`

Devuelve el elemento hermano siguiente o anterior.

```javascript
const item = document.querySelector(".item");
const siguiente = item.nextElementSibling;
const anterior = item.previousElementSibling;
```

[📚 Documentación MDN - nextElementSibling](https://developer.mozilla.org/es/docs/Web/API/Element/nextElementSibling)

---

## Eventos

### `addEventListener()`

Registra un manejador de eventos en un elemento.

```javascript
const boton = document.querySelector("#miBoton");
boton.addEventListener("click", function () {
  console.log("¡Botón clickeado!");
});
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener)

### `removeEventListener()`

Elimina un manejador de eventos previamente registrado.

```javascript
function manejarClick() {
  console.log("Click");
}

boton.addEventListener("click", manejarClick);
boton.removeEventListener("click", manejarClick);
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/EventTarget/removeEventListener)

### Objeto `event`

El objeto que contiene información sobre el evento ocurrido.

```javascript
document.addEventListener("click", function (event) {
  console.log("Posición X:", event.clientX);
  console.log("Posición Y:", event.clientY);
  console.log("Elemento clickeado:", event.target);
});
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Event)

### `preventDefault()`

Previene el comportamiento por defecto del evento.

```javascript
const formulario = document.querySelector("form");
formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("Envío del formulario cancelado");
});
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Event/preventDefault)

### `stopPropagation()`

Detiene la propagación del evento hacia elementos padres.

```javascript
const boton = document.querySelector(".boton");
boton.addEventListener("click", function (event) {
  event.stopPropagation();
  console.log("Solo se ejecuta este manejador");
});
```

[📚 Documentación MDN](https://developer.mozilla.org/es/docs/Web/API/Event/stopPropagation)

### Eventos comunes

```javascript
// Click
elemento.addEventListener("click", manejador);

// Doble click
elemento.addEventListener("dblclick", manejador);

// Mouse sobre elemento
elemento.addEventListener("mouseenter", manejador);

// Mouse sale del elemento
elemento.addEventListener("mouseleave", manejador);

// Tecla presionada
document.addEventListener("keydown", manejador);

// Input cambia
input.addEventListener("input", manejador);

// Cambio en select, checkbox, etc.
select.addEventListener("change", manejador);

// Enfoque
input.addEventListener("focus", manejador);

// Pérdida de enfoque
input.addEventListener("blur", manejador);
```

[📚 Listado completo de eventos - MDN](https://developer.mozilla.org/es/docs/Web/Events)

---

## Recursos adicionales

- [Introducción al DOM - MDN](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Introduction)
- [Guía de eventos del DOM - MDN](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Events)
