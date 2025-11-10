# Cookies vs LocalStorage en JavaScript

## Introducción al Almacenamiento en el Navegador

El almacenamiento en el lado del cliente permite guardar datos en el navegador del usuario. Las dos tecnologías más comunes son **Cookies** y **LocalStorage**, cada una con sus propias características, ventajas y casos de uso.

[📚 Documentación MDN - Client-side storage](https://developer.mozilla.org/es/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage)

---

## Tabla Comparativa

| Característica        | Cookies                                         | LocalStorage                       |
| --------------------- | ----------------------------------------------- | ---------------------------------- |
| **Capacidad**         | ~4KB por cookie                                 | ~5-10MB por dominio                |
| **Persistencia**      | Fecha de expiración configurable                | Permanente (hasta que se borre)    |
| **Envío al servidor** | Se envían automáticamente en cada petición HTTP | No se envían al servidor           |
| **Acceso**            | Cliente y servidor                              | Solo cliente (JavaScript)          |
| **API**               | Compleja (cadena de texto)                      | Sencilla (key-value)               |
| **Seguridad**         | HttpOnly, Secure, SameSite                      | Solo accesible por JavaScript      |
| **Casos de uso**      | Autenticación, seguimiento, preferencias        | Datos de aplicación, caché, estado |
| **Compatibilidad**    | Todos los navegadores                           | IE8+ y navegadores modernos        |

---

## Cookies

Las cookies son pequeños fragmentos de datos que se almacenan en el navegador y se envían automáticamente al servidor con cada petición HTTP.

[📚 Documentación MDN - Cookies](https://developer.mozilla.org/es/docs/Web/HTTP/Cookies)

### Crear una Cookie

```javascript
// Crear una cookie simple
document.cookie = "nombre=Juan";

console.log(document.cookie);
```

**Salida por consola:**

```
nombre=Juan
```

### Cookie con Fecha de Expiración

```javascript
// Cookie que expira en 7 días
const fecha = new Date();
fecha.setTime(fecha.getTime() + 7 * 24 * 60 * 60 * 1000);
const expira = "expires=" + fecha.toUTCString();

document.cookie = `usuario=Maria; ${expira}; path=/`;

console.log(document.cookie);
```

**Salida por consola:**

```
nombre=Juan; usuario=Maria
```

### Cookie con Todos los Atributos

```javascript
// Cookie con configuración completa
const cookieConfig = [
  "token=abc123",
  "expires=Fri, 31 Dec 2025 23:59:59 GMT",
  "path=/",
  "domain=ejemplo.com",
  "secure",
  "SameSite=Strict",
].join("; ");

document.cookie = cookieConfig;
```

**Atributos de las Cookies:**

- **expires**: Fecha de expiración
- **max-age**: Tiempo de vida en segundos
- **path**: Ruta donde la cookie es válida
- **domain**: Dominio donde la cookie es válida
- **secure**: Solo se envía por HTTPS
- **HttpOnly**: No accesible desde JavaScript (solo desde servidor)
- **SameSite**: Protección contra CSRF (Strict, Lax, None)

!!! warning "HttpOnly"
Las cookies con el atributo `HttpOnly` solo pueden ser establecidas y leídas desde el servidor, no desde JavaScript. Esto mejora la seguridad contra ataques XSS.

### Leer Cookies

```javascript
// Leer todas las cookies
console.log(document.cookie);

// Función helper para leer una cookie específica
function obtenerCookie(nombre) {
  const nombreEQ = nombre + "=";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nombreEQ) === 0) {
      return cookie.substring(nombreEQ.length);
    }
  }
  return null;
}

// Uso
const usuario = obtenerCookie("usuario");
console.log("Usuario:", usuario);
```

**Salida por consola:**

```
Usuario: Maria
```

### Modificar una Cookie

```javascript
// Para modificar, simplemente crea una cookie con el mismo nombre
document.cookie = "usuario=Pedro; path=/; max-age=3600";

console.log("Cookie modificada:", obtenerCookie("usuario"));
```

**Salida por consola:**

```
Cookie modificada: Pedro
```

### Eliminar una Cookie

```javascript
// Establecer una fecha de expiración pasada
function eliminarCookie(nombre) {
  document.cookie =
    nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Uso
eliminarCookie("usuario");
console.log("Cookies restantes:", document.cookie);
```

### Clase Helper para Cookies

```javascript
class CookieManager {
  // Crear o actualizar cookie
  static set(nombre, valor, dias = 7, path = "/") {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000);
    const expira = "expires=" + fecha.toUTCString();
    document.cookie = `${nombre}=${valor}; ${expira}; path=${path}`;
  }

  // Leer cookie
  static get(nombre) {
    const nombreEQ = nombre + "=";
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nombreEQ) === 0) {
        return cookie.substring(nombreEQ.length);
      }
    }
    return null;
  }

  // Eliminar cookie
  static delete(nombre, path = "/") {
    document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
  }

  // Verificar si existe
  static exists(nombre) {
    return this.get(nombre) !== null;
  }

  // Obtener todas las cookies como objeto
  static getAll() {
    const cookies = {};
    const cookieArray = document.cookie.split(";");

    for (let cookie of cookieArray) {
      cookie = cookie.trim();
      const [nombre, valor] = cookie.split("=");
      if (nombre) {
        cookies[nombre] = valor;
      }
    }
    return cookies;
  }
}

// Uso
CookieManager.set("tema", "oscuro", 30);
console.log("Tema:", CookieManager.get("tema"));
console.log("Existe tema?", CookieManager.exists("tema"));
console.log("Todas las cookies:", CookieManager.getAll());
CookieManager.delete("tema");
```

**Salida por consola:**

```
Tema: oscuro
Existe tema? true
Todas las cookies: { tema: 'oscuro', nombre: 'Juan' }
```

---

## LocalStorage

LocalStorage es una API de almacenamiento que permite guardar pares clave-valor de forma persistente en el navegador, sin fecha de expiración.

[📚 Documentación MDN - Window.localStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)

### Características de LocalStorage

- **Persistencia**: Los datos permanecen incluso después de cerrar el navegador
- **Capacidad**: Aproximadamente 5-10MB por dominio
- **Sincronía**: Las operaciones son síncronas
- **Ámbito**: Los datos son específicos del origen (protocolo + dominio + puerto)

### Guardar Datos

```javascript
// Guardar un valor
localStorage.setItem("nombre", "Ana");
localStorage.setItem("edad", "25");

console.log("Datos guardados en localStorage");
```

**Salida por consola:**

```
Datos guardados en localStorage
```

### Leer Datos

```javascript
// Leer un valor
const nombre = localStorage.getItem("nombre");
const edad = localStorage.getItem("edad");

console.log("Nombre:", nombre);
console.log("Edad:", edad);
```

**Salida por consola:**

```
Nombre: Ana
Edad: 25
```

### Eliminar Datos

```javascript
// Eliminar un item específico
localStorage.removeItem("edad");
console.log("Edad después de eliminar:", localStorage.getItem("edad"));

// Eliminar todos los items
localStorage.clear();
console.log("Items después de clear:", localStorage.length);
```

**Salida por consola:**

```
Edad después de eliminar: null
Items después de clear: 0
```

### Verificar Existencia y Longitud

```javascript
// Número de items almacenados
localStorage.setItem("item1", "valor1");
localStorage.setItem("item2", "valor2");
localStorage.setItem("item3", "valor3");

console.log("Número de items:", localStorage.length);

// Verificar si existe una clave
const existeNombre = localStorage.getItem("nombre") !== null;
console.log("Existe nombre?", existeNombre);
```

**Salida por consola:**

```
Número de items: 3
Existe nombre? false
```

### Iterar sobre LocalStorage

```javascript
localStorage.setItem("color", "azul");
localStorage.setItem("fuente", "Arial");
localStorage.setItem("tamaño", "16px");

// Método 1: usando length y key()
console.log("Todos los items:");
for (let i = 0; i < localStorage.length; i++) {
  const clave = localStorage.key(i);
  const valor = localStorage.getItem(clave);
  console.log(`${clave}: ${valor}`);
}

// Método 2: usando Object.keys()
console.log("\nUsando Object.keys:");
Object.keys(localStorage).forEach((clave) => {
  console.log(`${clave}: ${localStorage.getItem(clave)}`);
});
```

**Salida por consola:**

```
Todos los items:
color: azul
fuente: Arial
tamaño: 16px

Usando Object.keys:
color: azul
fuente: Arial
tamaño: 16px
```

### Almacenar Objetos y Arrays

!!! warning "Solo almacena strings"
LocalStorage solo puede almacenar strings. Para guardar objetos o arrays, debes convertirlos a JSON.

```javascript
// Guardar un objeto
const usuario = {
  nombre: "Carlos",
  edad: 30,
  email: "carlos@ejemplo.com",
  preferencias: {
    tema: "oscuro",
    idioma: "es",
  },
};

localStorage.setItem("usuario", JSON.stringify(usuario));
console.log("Usuario guardado");

// Leer el objeto
const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
console.log("Usuario recuperado:", usuarioGuardado);
console.log("Nombre:", usuarioGuardado.nombre);
console.log("Tema:", usuarioGuardado.preferencias.tema);
```

**Salida por consola:**

```
Usuario guardado
Usuario recuperado: {
  nombre: 'Carlos',
  edad: 30,
  email: 'carlos@ejemplo.com',
  preferencias: { tema: 'oscuro', idioma: 'es' }
}
Nombre: Carlos
Tema: oscuro
```

### Guardar Arrays

```javascript
// Guardar un array
const tareas = [
  { id: 1, texto: "Estudiar JavaScript", completada: false },
  { id: 2, texto: "Hacer ejercicio", completada: true },
  { id: 3, texto: "Leer libro", completada: false },
];

localStorage.setItem("tareas", JSON.stringify(tareas));

// Leer el array
const tareasGuardadas = JSON.parse(localStorage.getItem("tareas"));
console.log("Tareas recuperadas:", tareasGuardadas);
console.log("Primera tarea:", tareasGuardadas[0].texto);
```

**Salida por consola:**

```
Tareas recuperadas: [
  { id: 1, texto: 'Estudiar JavaScript', completada: false },
  { id: 2, texto: 'Hacer ejercicio', completada: true },
  { id: 3, texto: 'Leer libro', completada: false }
]
Primera tarea: Estudiar JavaScript
```

### Clase Helper para LocalStorage

```javascript
class StorageManager {
  // Guardar dato
  static set(clave, valor) {
    try {
      const valorString =
        typeof valor === "object" ? JSON.stringify(valor) : valor;
      localStorage.setItem(clave, valorString);
      return true;
    } catch (error) {
      console.error("Error al guardar:", error);
      return false;
    }
  }

  // Obtener dato
  static get(clave, esObjeto = false) {
    try {
      const valor = localStorage.getItem(clave);

      if (valor === null) return null;

      if (esObjeto) {
        return JSON.parse(valor);
      }

      return valor;
    } catch (error) {
      console.error("Error al obtener:", error);
      return null;
    }
  }

  // Eliminar dato
  static remove(clave) {
    localStorage.removeItem(clave);
  }

  // Verificar existencia
  static exists(clave) {
    return localStorage.getItem(clave) !== null;
  }

  // Limpiar todo
  static clear() {
    localStorage.clear();
  }

  // Obtener todas las claves
  static keys() {
    return Object.keys(localStorage);
  }

  // Obtener todo como objeto
  static getAll() {
    const datos = {};
    for (let i = 0; i < localStorage.length; i++) {
      const clave = localStorage.key(i);
      datos[clave] = this.get(clave);
    }
    return datos;
  }

  // Guardar múltiples items
  static setMultiple(objeto) {
    Object.entries(objeto).forEach(([clave, valor]) => {
      this.set(clave, valor);
    });
  }
}

// Uso
StorageManager.set("usuario", { nombre: "Laura", edad: 28 });
StorageManager.set("tema", "claro");

console.log("Usuario:", StorageManager.get("usuario", true));
console.log("Tema:", StorageManager.get("tema"));
console.log("Todas las claves:", StorageManager.keys());

StorageManager.setMultiple({
  idioma: "es",
  notificaciones: true,
  volumen: 80,
});

console.log("Todos los datos:", StorageManager.getAll());
```

**Salida por consola:**

```
Usuario: { nombre: 'Laura', edad: 28 }
Tema: claro
Todas las claves: ['usuario', 'tema']
Todos los datos: {
  usuario: '{"nombre":"Laura","edad":28}',
  tema: 'claro',
  idioma: 'es',
  notificaciones: 'true',
  volumen: '80'
}
```

---

## SessionStorage

Similar a LocalStorage, pero los datos solo persisten durante la sesión del navegador (se eliminan al cerrar la pestaña).

[📚 Documentación MDN - Window.sessionStorage](https://developer.mozilla.org/es/docs/Web/API/Window/sessionStorage)

```javascript
// Tiene la misma API que localStorage
sessionStorage.setItem("carritoTemporal", JSON.stringify([1, 2, 3]));
console.log("Carrito:", sessionStorage.getItem("carritoTemporal"));

// Se elimina al cerrar la pestaña
```

**Salida por consola:**

```
Carrito: [1,2,3]
```

---

## Comparación Práctica

### Caso 1: Autenticación con Cookie

```javascript
// Login - Guardar token en cookie (se envía automáticamente al servidor)
function loginConCookie(token) {
  // Cookie segura que expira en 1 día
  const fecha = new Date();
  fecha.setTime(fecha.getTime() + 24 * 60 * 60 * 1000);

  document.cookie = `authToken=${token}; expires=${fecha.toUTCString()}; path=/; Secure; SameSite=Strict`;

  console.log("Token guardado en cookie");
}

// Logout
function logoutConCookie() {
  document.cookie =
    "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  console.log("Cookie eliminada");
}

// Uso
loginConCookie("abc123xyz");
```

**Salida por consola:**

```
Token guardado en cookie
```

!!! tip "Ventaja de Cookies"
Las cookies se envían automáticamente con cada petición HTTP, ideal para autenticación.

### Caso 2: Autenticación con LocalStorage

```javascript
// Login - Guardar token en localStorage
function loginConLocalStorage(token) {
  localStorage.setItem("authToken", token);
  console.log("Token guardado en localStorage");
}

// Obtener token para incluir en headers
function obtenerToken() {
  return localStorage.getItem("authToken");
}

// Hacer petición con token
async function hacerPeticionProtegida() {
  const token = obtenerToken();

  const respuesta = await fetch("/api/datos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await respuesta.json();
}

// Logout
function logoutConLocalStorage() {
  localStorage.removeItem("authToken");
  console.log("Token eliminado");
}

// Uso
loginConLocalStorage("abc123xyz");
console.log("Token:", obtenerToken());
```

**Salida por consola:**

```
Token guardado en localStorage
Token: abc123xyz
```

!!! warning "Seguridad"
LocalStorage es vulnerable a ataques XSS. Para datos sensibles como tokens de autenticación, considera usar cookies HttpOnly.

### Caso 3: Preferencias de Usuario

```javascript
// Guardar preferencias (mejor con localStorage)
class PreferenciasUsuario {
  static guardar(preferencias) {
    localStorage.setItem("preferencias", JSON.stringify(preferencias));
  }

  static obtener() {
    const prefs = localStorage.getItem("preferencias");
    return prefs ? JSON.parse(prefs) : this.preferenciasPorDefecto();
  }

  static preferenciasPorDefecto() {
    return {
      tema: "claro",
      idioma: "es",
      notificaciones: true,
      fuenteTamaño: 16,
    };
  }

  static actualizar(cambios) {
    const prefsActuales = this.obtener();
    const prefsNuevas = { ...prefsActuales, ...cambios };
    this.guardar(prefsNuevas);
    return prefsNuevas;
  }
}

// Uso
PreferenciasUsuario.guardar({
  tema: "oscuro",
  idioma: "es",
  notificaciones: true,
  fuenteTamaño: 18,
});

console.log("Preferencias:", PreferenciasUsuario.obtener());

PreferenciasUsuario.actualizar({ tema: "claro" });
console.log("Preferencias actualizadas:", PreferenciasUsuario.obtener());
```

**Salida por consola:**

```
Preferencias: {
  tema: 'oscuro',
  idioma: 'es',
  notificaciones: true,
  fuenteTamaño: 18
}
Preferencias actualizadas: {
  tema: 'claro',
  idioma: 'es',
  notificaciones: true,
  fuenteTamaño: 18
}
```

### Caso 4: Carrito de Compras

```javascript
class CarritoCompras {
  static agregar(producto) {
    const carrito = this.obtener();
    const index = carrito.findIndex((p) => p.id === producto.id);

    if (index !== -1) {
      carrito[index].cantidad += producto.cantidad || 1;
    } else {
      carrito.push({
        ...producto,
        cantidad: producto.cantidad || 1,
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(`Producto ${producto.nombre} agregado al carrito`);
  }

  static obtener() {
    const carrito = localStorage.getItem("carrito");
    return carrito ? JSON.parse(carrito) : [];
  }

  static eliminar(productoId) {
    let carrito = this.obtener();
    carrito = carrito.filter((p) => p.id !== productoId);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  static vaciar() {
    localStorage.removeItem("carrito");
    console.log("Carrito vaciado");
  }

  static total() {
    const carrito = this.obtener();
    return carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
  }

  static cantidadItems() {
    const carrito = this.obtener();
    return carrito.reduce((sum, p) => sum + p.cantidad, 0);
  }
}

// Uso
CarritoCompras.agregar({
  id: 1,
  nombre: "Laptop",
  precio: 999,
  cantidad: 1,
});

CarritoCompras.agregar({
  id: 2,
  nombre: "Mouse",
  precio: 25,
  cantidad: 2,
});

console.log("Carrito:", CarritoCompras.obtener());
console.log("Total:", CarritoCompras.total(), "€");
console.log("Items:", CarritoCompras.cantidadItems());
```

**Salida por consola:**

```
Producto Laptop agregado al carrito
Producto Mouse agregado al carrito
Carrito: [
  { id: 1, nombre: 'Laptop', precio: 999, cantidad: 1 },
  { id: 2, nombre: 'Mouse', precio: 25, cantidad: 2 }
]
Total: 1049 €
Items: 3
```

---

## Evento Storage

El evento `storage` se dispara cuando se modifica localStorage o sessionStorage desde otra pestaña o ventana del mismo origen.

[📚 Documentación MDN - StorageEvent](https://developer.mozilla.org/es/docs/Web/API/StorageEvent)

```javascript
// Escuchar cambios en localStorage desde otras pestañas
window.addEventListener("storage", (e) => {
  console.log("Storage modificado en otra pestaña:");
  console.log("Clave:", e.key);
  console.log("Valor anterior:", e.oldValue);
  console.log("Valor nuevo:", e.newValue);
  console.log("URL:", e.url);

  // Sincronizar UI si es necesario
  if (e.key === "tema") {
    aplicarTema(e.newValue);
  }
});

function aplicarTema(tema) {
  document.body.className = tema;
  console.log(`Tema aplicado: ${tema}`);
}
```

!!! info "Sincronización entre pestañas"
El evento `storage` no se dispara en la pestaña que hizo el cambio, solo en las demás pestañas del mismo origen.

---

## Límites y Manejo de Errores

### Verificar Disponibilidad

```javascript
function storageDisponible(tipo) {
  try {
    const storage = window[tipo];
    const test = "__storage_test__";
    storage.setItem(test, test);
    storage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

if (storageDisponible("localStorage")) {
  console.log("LocalStorage disponible");
} else {
  console.log("LocalStorage NO disponible");
}
```

### Manejar Cuota Excedida

```javascript
function guardarConSeguridad(clave, valor) {
  try {
    localStorage.setItem(clave, valor);
    console.log("Dato guardado correctamente");
    return true;
  } catch (e) {
    if (e.name === "QuotaExceededError") {
      console.error("Cuota de almacenamiento excedida");
      // Limpiar datos antiguos
      limpiarDatosAntiguos();
      // Intentar de nuevo
      try {
        localStorage.setItem(clave, valor);
        return true;
      } catch (e) {
        console.error("No se pudo guardar incluso después de limpiar");
        return false;
      }
    }
    console.error("Error al guardar:", e);
    return false;
  }
}

function limpiarDatosAntiguos() {
  // Implementar lógica para eliminar datos antiguos o menos importantes
  console.log("Limpiando datos antiguos...");
}
```

### Calcular Espacio Usado

```javascript
function calcularEspacioUsado() {
  let total = 0;

  for (let clave in localStorage) {
    if (localStorage.hasOwnProperty(clave)) {
      const valor = localStorage.getItem(clave);
      total += clave.length + valor.length;
    }
  }

  const kb = (total / 1024).toFixed(2);
  const mb = (kb / 1024).toFixed(2);

  console.log(`Espacio usado: ${total} bytes (${kb} KB / ${mb} MB)`);
  return total;
}

calcularEspacioUsado();
```

**Salida por consola:**

```
Espacio usado: 2458 bytes (2.40 KB / 0.00 MB)
```

---

## Cuándo Usar Cada Uno

### Usar Cookies cuando:

✅ Necesites que los datos se envíen automáticamente al servidor  
✅ Implementes autenticación basada en sesiones  
✅ Necesites control sobre la expiración exacta  
✅ Requieras seguridad adicional (HttpOnly, Secure)  
✅ Necesites compartir datos entre subdominios

### Usar LocalStorage cuando:

✅ Almacenes preferencias de usuario  
✅ Guardes estado de la aplicación  
✅ Necesites almacenar datos grandes (pero <5MB)  
✅ Los datos no necesiten enviarse al servidor  
✅ Quieras persistencia permanente  
✅ Implementes caché del lado del cliente

### Usar SessionStorage cuando:

✅ Necesites datos temporales por sesión  
✅ Implementes flujos multi-paso (wizards)  
✅ Guardes estado temporal del formulario  
✅ Los datos sean específicos de una pestaña

---

## Seguridad y Mejores Prácticas

!!! warning "Seguridad" - **Nunca almacenes información sensible** sin cifrar (contraseñas, tarjetas de crédito) - **LocalStorage es vulnerable a XSS**: Cualquier script puede acceder a él - **Cookies HttpOnly** protegen contra XSS pero no son accesibles desde JS - **Valida y sanitiza** siempre los datos antes de usarlos - **Usa HTTPS** especialmente con cookies Secure

!!! tip "Mejores Prácticas" - Usa cookies para autenticación y datos que necesita el servidor - Usa localStorage para preferencias y estado de la aplicación - Implementa versionado de datos para manejar cambios en la estructura - Maneja errores de cuota excedida - Verifica disponibilidad antes de usar - Usa nombres descriptivos y namespaces para las claves - Limpia datos obsoletos regularmente

### Ejemplo de Namespace

```javascript
class AppStorage {
  static prefix = "miapp_";

  static set(clave, valor) {
    localStorage.setItem(this.prefix + clave, JSON.stringify(valor));
  }

  static get(clave) {
    const valor = localStorage.getItem(this.prefix + clave);
    return valor ? JSON.parse(valor) : null;
  }

  static remove(clave) {
    localStorage.removeItem(this.prefix + clave);
  }

  static clear() {
    // Solo eliminar claves de esta app
    Object.keys(localStorage).forEach((clave) => {
      if (clave.startsWith(this.prefix)) {
        localStorage.removeItem(clave);
      }
    });
  }
}

// Uso
AppStorage.set("usuario", { nombre: "Ana" });
console.log(AppStorage.get("usuario"));
```

**Salida por consola:**

```
{ nombre: 'Ana' }
```

---

## Recursos Adicionales

- [📚 MDN - HTTP Cookies](https://developer.mozilla.org/es/docs/Web/HTTP/Cookies)
- [📚 MDN - Web Storage API](https://developer.mozilla.org/es/docs/Web/API/Web_Storage_API)
- [📚 MDN - Window.localStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)
- [📚 MDN - Window.sessionStorage](https://developer.mozilla.org/es/docs/Web/API/Window/sessionStorage)
- [📚 MDN - Client-side storage](https://developer.mozilla.org/es/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage)
- [📚 MDN - StorageEvent](https://developer.mozilla.org/es/docs/Web/API/StorageEvent)
