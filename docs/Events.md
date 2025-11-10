# Eventos en JavaScript

## Introducción a los Eventos

Los eventos son acciones o sucesos que ocurren en el navegador y que podemos detectar y responder mediante JavaScript. Pueden ser iniciados por el usuario (clicks, teclas) o por el navegador (carga de página, errores).

[📚 Documentación MDN - Introduction to events](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Events)

---

## Escuchadores de Eventos

### `addEventListener()`

El método más recomendado para manejar eventos en JavaScript moderno.

```javascript
const boton = document.querySelector("#miBoton");

boton.addEventListener("click", function (event) {
  console.log("¡Botón clickeado!");
  console.log("Elemento:", event.target);
});
```

**Salida por consola:**

```
¡Botón clickeado!
Elemento: <button id="miBoton">...</button>
```

[📚 Documentación MDN - addEventListener](https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener)

#### Sintaxis con función flecha

```javascript
const input = document.querySelector("#email");

input.addEventListener("input", (e) => {
  console.log("Valor actual:", e.target.value);
});
```

#### Múltiples listeners en el mismo elemento

```javascript
const boton = document.querySelector("#boton");

boton.addEventListener("click", () => {
  console.log("Primer listener");
});

boton.addEventListener("click", () => {
  console.log("Segundo listener");
});

// Al hacer click, se ejecutan ambos
```

**Salida por consola:**

```
Primer listener
Segundo listener
```

---

### `removeEventListener()`

Elimina un escuchador de eventos previamente añadido.

```javascript
function manejarClick() {
  console.log("Click detectado");
}

const boton = document.querySelector("#boton");

// Añadir listener
boton.addEventListener("click", manejarClick);

// Eliminar listener
boton.removeEventListener("click", manejarClick);
```

!!! warning "Importante"
Para poder eliminar un listener, la función debe estar definida como una función nombrada o guardada en una variable. No funcionará con funciones anónimas.

[📚 Documentación MDN - removeEventListener](https://developer.mozilla.org/es/docs/Web/API/EventTarget/removeEventListener)

---

## Tipos de Eventos Comunes

### Eventos de ratón

```javascript
const elemento = document.querySelector("#caja");

// Click simple
elemento.addEventListener("click", (e) => {
  console.log("Click");
});

// Doble click
elemento.addEventListener("dblclick", (e) => {
  console.log("Doble click");
});

// Ratón entra en el elemento
elemento.addEventListener("mouseenter", (e) => {
  console.log("Ratón dentro");
});

// Ratón sale del elemento
elemento.addEventListener("mouseleave", (e) => {
  console.log("Ratón fuera");
});

// Ratón se mueve sobre el elemento
elemento.addEventListener("mousemove", (e) => {
  console.log(`Posición: X=${e.clientX}, Y=${e.clientY}`);
});
```

[📚 Documentación MDN - Mouse events](https://developer.mozilla.org/es/docs/Web/API/MouseEvent)

### Eventos de teclado

```javascript
const input = document.querySelector("#miInput");

// Tecla presionada
input.addEventListener("keydown", (e) => {
  console.log("Tecla presionada:", e.key);
});

// Tecla liberada
input.addEventListener("keyup", (e) => {
  console.log("Tecla liberada:", e.key);
});

// Detectar combinaciones de teclas
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault(); // Evita el guardado del navegador
    console.log("Ctrl + S presionado");
  }
});
```

[📚 Documentación MDN - Keyboard events](https://developer.mozilla.org/es/docs/Web/API/KeyboardEvent)

### Eventos de formulario

```javascript
const formulario = document.querySelector("#miForm");
const input = document.querySelector("#nombre");

// Se ejecuta al escribir
input.addEventListener("input", (e) => {
  console.log("Valor:", e.target.value);
});

// Se ejecuta al cambiar y perder el foco
input.addEventListener("change", (e) => {
  console.log("Campo cambiado:", e.target.value);
});

// Obtener o perder el foco
input.addEventListener("focus", () => {
  console.log("Input enfocado");
});

input.addEventListener("blur", () => {
  console.log("Input desenfocado");
});

// Envío del formulario
formulario.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita el envío por defecto
  console.log("Formulario enviado");
});
```

[📚 Documentación MDN - Form events](https://developer.mozilla.org/es/docs/Web/API/HTMLFormElement)

---

## El Objeto Event

Cada evento pasa un objeto `event` al manejador que contiene información útil:

```javascript
elemento.addEventListener("click", (event) => {
  console.log("Tipo de evento:", event.type);
  console.log("Elemento objetivo:", event.target);
  console.log("Elemento actual:", event.currentTarget);
  console.log("Timestamp:", event.timeStamp);
  console.log("Coordenadas X:", event.clientX);
  console.log("Coordenadas Y:", event.clientY);
});
```

[📚 Documentación MDN - Event](https://developer.mozilla.org/es/docs/Web/API/Event)

### Métodos importantes del objeto Event

#### `preventDefault()`

Previene la acción por defecto del evento.

```javascript
const enlace = document.querySelector("a");

enlace.addEventListener("click", (e) => {
  e.preventDefault(); // El enlace no navegará
  console.log("Navegación cancelada");
});
```

[📚 Documentación MDN - preventDefault](https://developer.mozilla.org/es/docs/Web/API/Event/preventDefault)

#### `stopPropagation()`

Detiene la propagación del evento (bubbling).

```javascript
const hijo = document.querySelector(".hijo");

hijo.addEventListener("click", (e) => {
  e.stopPropagation(); // El evento no llegará a los padres
  console.log("Click en hijo");
});
```

[📚 Documentación MDN - stopPropagation](https://developer.mozilla.org/es/docs/Web/API/Event/stopPropagation)

---

## Event Bubbling (Propagación de Eventos)

El **bubbling** es el mecanismo por el cual un evento se propaga desde el elemento más específico (el objetivo) hacia arriba en el árbol del DOM hasta el elemento raíz.

[📚 Documentación MDN - Event bubbling](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Events#event_bubbling)

### ¿Cómo funciona el Bubbling?

Cuando haces click en un elemento, el evento se propaga en este orden:

1. **Fase de captura** (capturing): Del elemento raíz hacia abajo (raramente usada)
2. **Fase objetivo** (target): El elemento clickeado
3. **Fase de burbujeo** (bubbling): Del elemento objetivo hacia arriba

```html
<div id="abuelo">
  <div id="padre">
    <button id="hijo">Click aquí</button>
  </div>
</div>
```

```javascript
const abuelo = document.querySelector("#abuelo");
const padre = document.querySelector("#padre");
const hijo = document.querySelector("#hijo");

abuelo.addEventListener("click", () => {
  console.log("3. Click en ABUELO");
});

padre.addEventListener("click", () => {
  console.log("2. Click en PADRE");
});

hijo.addEventListener("click", () => {
  console.log("1. Click en HIJO");
});
```

**Salida por consola al hacer click en el botón:**

```
1. Click en HIJO
2. Click en PADRE
3. Click en ABUELO
```

!!! info "Orden de propagación"
El evento se dispara primero en el elemento clickeado (hijo) y luego "burbujea" hacia arriba a través de todos sus ancestros.

### Visualización del Bubbling

```javascript
const abuelo = document.querySelector("#abuelo");
const padre = document.querySelector("#padre");
const hijo = document.querySelector("#hijo");

abuelo.addEventListener("click", (e) => {
  console.log("Abuelo - target:", e.target.id);
  console.log("Abuelo - currentTarget:", e.currentTarget.id);
});

padre.addEventListener("click", (e) => {
  console.log("Padre - target:", e.target.id);
  console.log("Padre - currentTarget:", e.currentTarget.id);
});

hijo.addEventListener("click", (e) => {
  console.log("Hijo - target:", e.target.id);
  console.log("Hijo - currentTarget:", e.currentTarget.id);
});
```

**Salida por consola al hacer click en el botón:**

```
Hijo - target: hijo
Hijo - currentTarget: hijo
Padre - target: hijo
Padre - currentTarget: padre
Abuelo - target: hijo
Abuelo - currentTarget: abuelo
```

!!! tip "target vs currentTarget" - `event.target`: El elemento que **originó** el evento (donde se hizo click realmente) - `event.currentTarget`: El elemento que **maneja** el evento (donde está el listener)

### Detener el Bubbling

Puedes detener la propagación usando `stopPropagation()`:

```javascript
hijo.addEventListener("click", (e) => {
  e.stopPropagation(); // Detiene el bubbling
  console.log("Click en hijo - No se propaga");
});

padre.addEventListener("click", () => {
  console.log("Este mensaje NO aparecerá");
});
```

**Salida por consola:**

```
Click en hijo - No se propaga
```

### Fase de Captura (Capturing)

Por defecto, los eventos se manejan en la fase de bubbling, pero puedes escuchar en la fase de captura:

```javascript
// Tercer parámetro en true activa la fase de captura
abuelo.addEventListener(
  "click",
  () => {
    console.log("1. Abuelo (captura)");
  },
  true
);

padre.addEventListener(
  "click",
  () => {
    console.log("2. Padre (captura)");
  },
  true
);

hijo.addEventListener("click", () => {
  console.log("3. Hijo (bubbling)");
});
```

**Salida por consola:**

```
1. Abuelo (captura)
2. Padre (captura)
3. Hijo (bubbling)
```

[📚 Documentación MDN - Event capturing](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Events#event_capture)

---

## Delegación de Eventos (Event Delegation)

La **delegación de eventos** es una técnica que aprovecha el bubbling para manejar eventos de múltiples elementos con un solo listener en un ancestro común.

[📚 Documentación MDN - Event delegation](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Events#event_delegation)

### ¿Por qué usar delegación?

**❌ Sin delegación (ineficiente):**

```javascript
// Supongamos que tenemos 100 botones
const botones = document.querySelectorAll(".boton");

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    console.log("Botón clickeado");
  });
});

// Problema: 100 listeners en memoria
// Problema: Los botones añadidos dinámicamente no tendrán el listener
```

**✅ Con delegación (eficiente):**

```javascript
// Un solo listener en el contenedor
const contenedor = document.querySelector("#contenedor");

contenedor.addEventListener("click", (e) => {
  if (e.target.classList.contains("boton")) {
    console.log("Botón clickeado");
  }
});

// Ventaja: 1 solo listener en memoria
// Ventaja: Funciona con botones añadidos dinámicamente
```

### Ejemplo Práctico: Lista de Tareas

```html
<ul id="listaTareas">
  <li>
    <span>Tarea 1</span>
    <button class="eliminar">Eliminar</button>
  </li>
  <li>
    <span>Tarea 2</span>
    <button class="eliminar">Eliminar</button>
  </li>
</ul>
<button id="agregarTarea">Agregar Tarea</button>
```

```javascript
const listaTareas = document.querySelector("#listaTareas");
const botonAgregar = document.querySelector("#agregarTarea");
let contador = 3;

// Delegación: un solo listener para todos los botones eliminar
listaTareas.addEventListener("click", (e) => {
  // Verificar si se hizo click en un botón eliminar
  if (e.target.classList.contains("eliminar")) {
    const li = e.target.closest("li");
    li.remove();
    console.log("Tarea eliminada");
  }

  // Verificar si se hizo click en el span de la tarea
  if (e.target.tagName === "SPAN") {
    e.target.classList.toggle("completada");
    console.log("Tarea marcada/desmarcada");
  }
});

// Agregar nuevas tareas dinámicamente
botonAgregar.addEventListener("click", () => {
  const nuevoLi = document.createElement("li");
  nuevoLi.innerHTML = `
    <span>Tarea ${contador}</span>
    <button class="eliminar">Eliminar</button>
  `;
  listaTareas.appendChild(nuevoLi);
  contador++;
  console.log("Nueva tarea agregada");
});

// Los botones nuevos funcionarán automáticamente gracias a la delegación
```

### Delegación con Múltiples Tipos de Elementos

```javascript
const contenedor = document.querySelector("#contenedor");

contenedor.addEventListener("click", (e) => {
  const target = e.target;

  // Manejar clicks en botones
  if (target.classList.contains("boton-editar")) {
    console.log("Editar:", target.dataset.id);
  }

  // Manejar clicks en enlaces
  if (target.classList.contains("boton-eliminar")) {
    e.preventDefault();
    console.log("Eliminar:", target.dataset.id);
  }

  // Manejar clicks en checkboxes
  if (target.type === "checkbox") {
    console.log("Checkbox:", target.checked);
  }
});
```

### Uso de `closest()` para Delegación

El método `closest()` es muy útil en delegación cuando el elemento clickeado puede estar anidado:

```html
<div id="tarjetas">
  <div class="tarjeta" data-id="1">
    <h3>Título</h3>
    <p>Descripción</p>
    <button class="eliminar"><span>🗑️</span> Eliminar</button>
  </div>
</div>
```

```javascript
const tarjetas = document.querySelector("#tarjetas");

tarjetas.addEventListener("click", (e) => {
  // Buscar el botón más cercano, incluso si clickeamos el span
  const botonEliminar = e.target.closest(".eliminar");

  if (botonEliminar) {
    // Encontrar la tarjeta padre
    const tarjeta = botonEliminar.closest(".tarjeta");
    const id = tarjeta.dataset.id;

    console.log(`Eliminar tarjeta ${id}`);
    tarjeta.remove();
  }
});
```

[📚 Documentación MDN - closest](https://developer.mozilla.org/es/docs/Web/API/Element/closest)

### Delegación con matches()

Alternativa usando `matches()` para verificar selectores:

```javascript
const lista = document.querySelector("#lista");

lista.addEventListener("click", (e) => {
  // Verificar si el elemento coincide con el selector
  if (e.target.matches(".item-eliminar")) {
    const item = e.target.closest(".item");
    item.remove();
  }

  if (e.target.matches(".item-editar")) {
    const item = e.target.closest(".item");
    // Lógica de edición
  }
});
```

[📚 Documentación MDN - matches](https://developer.mozilla.org/es/docs/Web/API/Element/matches)

---

## Comparación: Bubbling vs Delegación

### Sin Delegación

```javascript
// ❌ Problema: Muchos listeners
const botones = document.querySelectorAll(".boton");

botones.forEach((boton, index) => {
  boton.addEventListener("click", () => {
    console.log(`Botón ${index} clickeado`);
  });
});

// ❌ Problema: Los nuevos botones no tienen listener
const nuevoBoton = document.createElement("button");
nuevoBoton.className = "boton";
nuevoBoton.textContent = "Nuevo";
document.body.appendChild(nuevoBoton);
// Este botón NO responderá a clicks
```

### Con Delegación

```javascript
// ✅ Solución: Un solo listener
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("boton")) {
    console.log("Botón clickeado:", e.target.textContent);
  }
});

// ✅ Los nuevos botones funcionan automáticamente
const nuevoBoton = document.createElement("button");
nuevoBoton.className = "boton";
nuevoBoton.textContent = "Nuevo";
document.body.appendChild(nuevoBoton);
// Este botón responderá a clicks sin código adicional
```

---

## Casos de Uso Avanzados

### Tabla con Acciones por Fila

```javascript
const tabla = document.querySelector("#tablaUsuarios");

tabla.addEventListener("click", (e) => {
  const fila = e.target.closest("tr");

  if (!fila) return; // Click fuera de una fila

  const id = fila.dataset.userId;

  if (e.target.classList.contains("btn-ver")) {
    console.log(`Ver usuario ${id}`);
  }

  if (e.target.classList.contains("btn-editar")) {
    console.log(`Editar usuario ${id}`);
  }

  if (e.target.classList.contains("btn-eliminar")) {
    if (confirm("¿Eliminar usuario?")) {
      fila.remove();
      console.log(`Usuario ${id} eliminado`);
    }
  }
});
```

### Menú Desplegable

```javascript
const menu = document.querySelector("#menuPrincipal");

// Delegación para todos los submenús
menu.addEventListener("click", (e) => {
  const itemMenu = e.target.closest(".item-menu");

  if (itemMenu) {
    // Cerrar todos los demás submenús
    menu.querySelectorAll(".item-menu").forEach((item) => {
      if (item !== itemMenu) {
        item.classList.remove("abierto");
      }
    });

    // Toggle del submenú actual
    itemMenu.classList.toggle("abierto");
  }
});

// Cerrar menú al hacer click fuera
document.addEventListener("click", (e) => {
  if (!e.target.closest("#menuPrincipal")) {
    menu.querySelectorAll(".item-menu").forEach((item) => {
      item.classList.remove("abierto");
    });
  }
});
```

### Arrastrar y Soltar Simple

```javascript
const contenedor = document.querySelector("#contenedor");
let elementoArrastrado = null;

contenedor.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("arrastrable")) {
    elementoArrastrado = e.target;
    e.target.style.opacity = "0.5";
  }
});

contenedor.addEventListener("dragend", (e) => {
  if (e.target.classList.contains("arrastrable")) {
    e.target.style.opacity = "1";
  }
});

contenedor.addEventListener("dragover", (e) => {
  e.preventDefault(); // Necesario para permitir el drop
});

contenedor.addEventListener("drop", (e) => {
  e.preventDefault();

  const zona = e.target.closest(".zona-drop");
  if (zona && elementoArrastrado) {
    zona.appendChild(elementoArrastrado);
    console.log("Elemento soltado");
  }
});
```

---

## Buenas Prácticas

!!! tip "Cuándo usar delegación" - **✅ Usar delegación cuando:** - Tienes muchos elementos similares (listas, tablas, galerías) - Los elementos se añaden/eliminan dinámicamente - Quieres optimizar el rendimiento

    - **❌ Evitar delegación cuando:**
        - Tienes muy pocos elementos estáticos
        - Necesitas manejar eventos que no burbujean (focus, blur, load)
        - El ancestro común está muy lejos en el árbol DOM

!!! warning "Eventos que NO burbujean"
Algunos eventos no burbujean y no funcionan bien con delegación: - `focus` / `blur` (usa `focusin` / `focusout` en su lugar) - `load` / `unload` - `mouseenter` / `mouseleave` (usa `mouseover` / `mouseout` en su lugar)

!!! tip "Rendimiento" - Usa delegación para elementos repetitivos - Limita la profundidad de búsqueda con `closest()` - Considera `stopPropagation()` solo cuando sea necesario - Usa `passive: true` para eventos de scroll/touch que no llamen `preventDefault()`

```javascript
// Mejorar rendimiento en scroll
document.addEventListener(
  "scroll",
  (e) => {
    // Código de scroll
  },
  { passive: true }
);
```

---

## Recursos Adicionales

- [📚 MDN - Introduction to events](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Events)
- [📚 MDN - addEventListener](https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener)
- [📚 MDN - Event bubbling and capture](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Events#event_bubbling_and_capture)
- [📚 MDN - Event delegation](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Events#event_delegation)
- [📚 MDN - Event reference](https://developer.mozilla.org/es/docs/Web/Events)
