# APIs REST y Verbos HTTP

## Introducción a las APIs REST

REST (Representational State Transfer) es un estilo de arquitectura para diseñar APIs web. Las APIs REST utilizan los métodos HTTP estándar para realizar operaciones CRUD (Create, Read, Update, Delete) sobre recursos.

!!! info
Una API REST es stateless (sin estado), lo que significa que cada petición debe contener toda la información necesaria para ser procesada.

[📚 Documentación MDN - HTTP](https://developer.mozilla.org/es/docs/Web/HTTP)

---

## Verbos HTTP

Los verbos HTTP (también llamados métodos HTTP) definen la acción que queremos realizar sobre un recurso.

### GET - Obtener datos

El método GET se utiliza para **recuperar** información del servidor. No debe modificar datos.

```javascript
// GET simple con fetch
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    console.log("Usuarios:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

**Ejemplo con async/await:**

```javascript
async function obtenerUsuarios() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const usuarios = await response.json();
    console.log("Usuarios obtenidos:", usuarios);
    return usuarios;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
}

obtenerUsuarios();
```

**Características de GET:**

- ✅ Puede ser cacheado
- ✅ Queda en el historial del navegador
- ✅ Se puede guardar como marcador
- ❌ No debe usarse para datos sensibles (visible en URL)
- ✅ Idempotente (múltiples llamadas producen el mismo resultado)

---

### POST - Crear recursos

El método POST se utiliza para **crear** nuevos recursos en el servidor.

```javascript
async function crearUsuario(nuevoUsuario) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoUsuario),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const usuarioCreado = await response.json();
    console.log("Usuario creado:", usuarioCreado);
    return usuarioCreado;
  } catch (error) {
    console.error("Error al crear usuario:", error);
  }
}

// Uso
const nuevoUsuario = {
  name: "Ana García",
  email: "ana@example.com",
  username: "anagarcia",
};

crearUsuario(nuevoUsuario);
```

**Salida por consola:**

```
Usuario creado: {
  id: 11,
  name: 'Ana García',
  email: 'ana@example.com',
  username: 'anagarcia'
}
```

**Características de POST:**

- ❌ No es cacheado
- ❌ No queda en el historial del navegador
- ❌ No idempotente (múltiples llamadas crean múltiples recursos)
- ✅ Puede enviar datos sensibles de forma segura
- ✅ Sin límite en el tamaño de datos

---

### PUT - Actualizar (reemplazar) recursos

El método PUT se utiliza para **actualizar completamente** un recurso existente, reemplazándolo.

```javascript
async function actualizarUsuario(id, datosActualizados) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosActualizados),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const usuarioActualizado = await response.json();
    console.log("Usuario actualizado:", usuarioActualizado);
    return usuarioActualizado;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
  }
}

// Uso - Reemplaza TODOS los datos del usuario
const datosCompletos = {
  id: 1,
  name: "Juan Pérez Actualizado",
  email: "juan.nuevo@example.com",
  username: "juanperez",
  phone: "123-456-789",
  website: "juanperez.com",
};

actualizarUsuario(1, datosCompletos);
```

**Características de PUT:**

- ✅ Idempotente (múltiples llamadas producen el mismo resultado)
- ✅ Reemplaza el recurso completo
- ⚠️ Debe enviar todos los campos del recurso

---

### PATCH - Actualizar (modificar) parcialmente

El método PATCH se utiliza para **actualizar parcialmente** un recurso, modificando solo los campos especificados.

```javascript
async function modificarUsuario(id, cambios) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cambios),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const usuarioModificado = await response.json();
    console.log("Usuario modificado:", usuarioModificado);
    return usuarioModificado;
  } catch (error) {
    console.error("Error al modificar usuario:", error);
  }
}

// Uso - Solo actualiza el email
const cambios = {
  email: "nuevo.email@example.com",
};

modificarUsuario(1, cambios);
```

**Diferencia PUT vs PATCH:**

```javascript
// PUT - Reemplaza todo el recurso
const datosPUT = {
  name: "Juan",
  email: "juan@example.com",
  phone: "123456789",
  // ... todos los campos
};

// PATCH - Solo actualiza campos específicos
const datosPATCH = {
  email: "nuevo@example.com", // Solo este campo cambia
};
```

---

### DELETE - Eliminar recursos

El método DELETE se utiliza para **eliminar** un recurso del servidor.

```javascript
async function eliminarUsuario(id) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`Usuario ${id} eliminado correctamente`);
    return true;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return false;
  }
}

// Uso
eliminarUsuario(1);
```

**Salida por consola:**

```
Usuario 1 eliminado correctamente
```

**Características de DELETE:**

- ✅ Idempotente (eliminar varias veces produce el mismo resultado)
- ⚠️ No retorna el recurso eliminado (generalmente)

---

## Ejemplo Completo: CRUD con Fetch API

```javascript
// Configuración base de la API
const API_BASE_URL = "https://jsonplaceholder.typicode.com";
const POSTS_ENDPOINT = `${API_BASE_URL}/posts`;

// ===== CREATE (POST) =====
async function crearPost(post) {
  try {
    const response = await fetch(POSTS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    const nuevoPost = await response.json();
    console.log("✅ Post creado:", nuevoPost);
    return nuevoPost;
  } catch (error) {
    console.error("❌ Error al crear post:", error);
  }
}

// ===== READ (GET) =====
async function obtenerPosts() {
  try {
    const response = await fetch(POSTS_ENDPOINT);
    const posts = await response.json();
    console.log("✅ Posts obtenidos:", posts.length);
    return posts;
  } catch (error) {
    console.error("❌ Error al obtener posts:", error);
  }
}

async function obtenerPost(id) {
  try {
    const response = await fetch(`${POSTS_ENDPOINT}/${id}`);
    const post = await response.json();
    console.log("✅ Post obtenido:", post);
    return post;
  } catch (error) {
    console.error("❌ Error al obtener post:", error);
  }
}

// ===== UPDATE (PUT) =====
async function actualizarPost(id, datosCompletos) {
  try {
    const response = await fetch(`${POSTS_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosCompletos),
    });

    const postActualizado = await response.json();
    console.log("✅ Post actualizado (PUT):", postActualizado);
    return postActualizado;
  } catch (error) {
    console.error("❌ Error al actualizar post:", error);
  }
}

// ===== UPDATE PARTIAL (PATCH) =====
async function modificarPost(id, cambios) {
  try {
    const response = await fetch(`${POSTS_ENDPOINT}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cambios),
    });

    const postModificado = await response.json();
    console.log("✅ Post modificado (PATCH):", postModificado);
    return postModificado;
  } catch (error) {
    console.error("❌ Error al modificar post:", error);
  }
}

// ===== DELETE (DELETE) =====
async function eliminarPost(id) {
  try {
    const response = await fetch(`${POSTS_ENDPOINT}/${id}`, {
      method: "DELETE",
    });

    console.log("✅ Post eliminado:", id);
    return true;
  } catch (error) {
    console.error("❌ Error al eliminar post:", error);
    return false;
  }
}

// ===== EJEMPLO DE USO =====
async function ejemploCRUD() {
  // CREATE
  const nuevoPost = await crearPost({
    title: "Mi nuevo post",
    body: "Este es el contenido de mi post",
    userId: 1,
  });

  // READ
  await obtenerPosts();
  await obtenerPost(1);

  // UPDATE (PUT)
  await actualizarPost(1, {
    id: 1,
    title: "Post actualizado",
    body: "Contenido actualizado completamente",
    userId: 1,
  });

  // UPDATE (PATCH)
  await modificarPost(1, {
    title: "Solo cambio el título",
  });

  // DELETE
  await eliminarPost(1);
}

// Ejecutar ejemplo
ejemploCRUD();
```

---

## Códigos de Estado HTTP

Las respuestas HTTP incluyen códigos de estado que indican el resultado de la petición:

### 2xx - Éxito

```javascript
// 200 OK - Petición exitosa
// 201 Created - Recurso creado exitosamente
// 204 No Content - Petición exitosa sin contenido

async function verificarEstado() {
  const response = await fetch("https://api.example.com/data");

  switch (response.status) {
    case 200:
      console.log("✅ Datos obtenidos correctamente");
      break;
    case 201:
      console.log("✅ Recurso creado exitosamente");
      break;
    case 204:
      console.log("✅ Operación exitosa, sin contenido");
      break;
  }
}
```

### 4xx - Errores del cliente

```javascript
// 400 Bad Request - Petición mal formada
// 401 Unauthorized - No autenticado
// 403 Forbidden - No autorizado
// 404 Not Found - Recurso no encontrado
// 422 Unprocessable Entity - Error de validación

async function manejarErroresCliente() {
  try {
    const response = await fetch("https://api.example.com/users/999999");

    if (response.status === 404) {
      console.error("❌ Usuario no encontrado");
      return null;
    }

    if (response.status === 401) {
      console.error("❌ No estás autenticado");
      // Redirigir a login
      return null;
    }

    if (response.status === 403) {
      console.error("❌ No tienes permisos para este recurso");
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error de red:", error);
  }
}
```

### 5xx - Errores del servidor

```javascript
// 500 Internal Server Error - Error interno del servidor
// 502 Bad Gateway - Error de gateway
// 503 Service Unavailable - Servicio no disponible

async function manejarErroresServidor() {
  try {
    const response = await fetch("https://api.example.com/data");

    if (response.status >= 500) {
      console.error("❌ Error del servidor:", response.status);
      console.log("Intentar de nuevo más tarde");
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}
```

---

## Headers (Cabeceras) HTTP

Las cabeceras proporcionan información adicional sobre la petición o respuesta.

### Cabeceras comunes en peticiones

```javascript
async function ejemploCabeceras() {
  const response = await fetch("https://api.example.com/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Tipo de contenido enviado
      Accept: "application/json", // Tipo de contenido aceptado
      Authorization: "Bearer token123", // Token de autenticación
      "X-Custom-Header": "valor-personalizado", // Cabecera personalizada
    },
    body: JSON.stringify({ name: "Juan" }),
  });

  return await response.json();
}
```

### Leer cabeceras de respuesta

```javascript
async function leerCabeceras() {
  const response = await fetch("https://api.example.com/data");

  console.log("Content-Type:", response.headers.get("Content-Type"));
  console.log("Date:", response.headers.get("Date"));

  // Iterar todas las cabeceras
  for (const [key, value] of response.headers) {
    console.log(`${key}: ${value}`);
  }
}
```

---

## Autenticación en APIs

### Bearer Token (JWT)

```javascript
const API_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

async function peticionAutenticada() {
  try {
    const response = await fetch("https://api.example.com/protected", {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      console.error("Token inválido o expirado");
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}
```

### API Key

```javascript
const API_KEY = "mi-api-key-secreta";

async function peticionConAPIKey() {
  const response = await fetch("https://api.example.com/data", {
    headers: {
      "X-API-Key": API_KEY,
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}
```

---

## Manejo de Errores Avanzado

```javascript
class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.data = data;
  }
}

async function fetchConManejoErrores(url, options = {}) {
  try {
    const response = await fetch(url, options);

    // Intentar obtener el cuerpo de la respuesta
    let data;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Si la respuesta no es OK, lanzar error
    if (!response.ok) {
      throw new APIError(
        data.message || `Error HTTP: ${response.status}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof APIError) {
      console.error(`❌ API Error [${error.status}]:`, error.message);
      console.error("Datos:", error.data);
    } else if (error instanceof TypeError) {
      console.error("❌ Error de red o CORS:", error.message);
    } else {
      console.error("❌ Error desconocido:", error);
    }

    throw error;
  }
}

// Uso
async function ejemploUso() {
  try {
    const datos = await fetchConManejoErrores(
      "https://api.example.com/users/1"
    );
    console.log("Datos obtenidos:", datos);
  } catch (error) {
    // El error ya fue registrado en la consola
    // Aquí puedes manejarlo según tus necesidades
  }
}
```

---

## Axios: Alternativa a Fetch

Axios es una biblioteca popular para hacer peticiones HTTP con una sintaxis más simple y características adicionales.

### Instalación

```bash
npm install axios
```

### Uso básico

```javascript
import axios from "axios";

// GET
const usuarios = await axios.get("https://api.example.com/users");
console.log(usuarios.data);

// POST
const nuevoUsuario = await axios.post("https://api.example.com/users", {
  name: "Ana",
  email: "ana@example.com",
});
console.log(nuevoUsuario.data);

// PUT
const actualizado = await axios.put("https://api.example.com/users/1", {
  name: "Ana García",
  email: "ana.garcia@example.com",
});

// PATCH
const modificado = await axios.patch("https://api.example.com/users/1", {
  email: "nuevo@example.com",
});

// DELETE
await axios.delete("https://api.example.com/users/1");
```

### Configuración global con Axios

```javascript
import axios from "axios";

// Crear instancia con configuración base
const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer token123",
  },
});

// Interceptor para peticiones
api.interceptors.request.use(
  (config) => {
    console.log("Enviando petición a:", config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para respuestas
api.interceptors.response.use(
  (response) => {
    console.log("Respuesta recibida:", response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Error de API:", error.response.status);
    } else if (error.request) {
      console.error("Error de red:", error.message);
    }
    return Promise.reject(error);
  }
);

// Uso de la instancia configurada
const obtenerUsuarios = async () => {
  const response = await api.get("/users");
  return response.data;
};

const crearUsuario = async (datos) => {
  const response = await api.post("/users", datos);
  return response.data;
};
```

---

## Buenas Prácticas

### 1. Manejo de errores consistente

```javascript
async function peticionSegura(url, options) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error en la petición");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en petición:", error);
    throw error;
  }
}
```

### 2. Timeout para peticiones

```javascript
async function fetchConTimeout(url, options = {}, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === "AbortError") {
      throw new Error("Petición cancelada por timeout");
    }
    throw error;
  }
}
```

### 3. Reintentos automáticos

```javascript
async function fetchConReintentos(url, options = {}, maxReintentos = 3) {
  for (let intento = 0; intento < maxReintentos; intento++) {
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        return await response.json();
      }

      // Si es error del servidor (5xx), reintentar
      if (response.status >= 500 && intento < maxReintentos - 1) {
        console.log(`Reintento ${intento + 1}/${maxReintentos}...`);
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (intento + 1))
        );
        continue;
      }

      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if (intento === maxReintentos - 1) {
        throw error;
      }
      console.log(`Error en intento ${intento + 1}, reintentando...`);
      await new Promise((resolve) => setTimeout(resolve, 1000 * (intento + 1)));
    }
  }
}
```

### 4. Cache de peticiones

```javascript
class APICache {
  constructor(ttl = 60000) {
    // TTL por defecto: 60 segundos
    this.cache = new Map();
    this.ttl = ttl;
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
    });
  }

  get(key) {
    const item = this.cache.get(key);

    if (!item) return null;

    // Verificar si el cache ha expirado
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear() {
    this.cache.clear();
  }
}

const cache = new APICache(60000);

async function fetchConCache(url) {
  // Verificar cache
  const cached = cache.get(url);
  if (cached) {
    console.log("✅ Datos desde cache");
    return cached;
  }

  // Hacer petición
  const response = await fetch(url);
  const data = await response.json();

  // Guardar en cache
  cache.set(url, data);
  console.log("✅ Datos desde API");

  return data;
}
```

---

## Resumen de Verbos HTTP

| Verbo      | Acción              | Idempotente | Ejemplo de uso                         |
| ---------- | ------------------- | ----------- | -------------------------------------- |
| **GET**    | Obtener datos       | ✅ Sí       | Listar usuarios, ver detalles          |
| **POST**   | Crear recurso       | ❌ No       | Crear nuevo usuario                    |
| **PUT**    | Actualizar completo | ✅ Sí       | Reemplazar todos los datos del usuario |
| **PATCH**  | Actualizar parcial  | ⚠️ Depende  | Cambiar solo el email del usuario      |
| **DELETE** | Eliminar            | ✅ Sí       | Eliminar usuario                       |

!!! tip "Idempotencia"
Una operación es **idempotente** si ejecutarla múltiples veces produce el mismo resultado que ejecutarla una sola vez.

---

## Recursos adicionales

- [📚 MDN - Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [📚 MDN - Using Fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch)
- [📚 MDN - HTTP Methods](https://developer.mozilla.org/es/docs/Web/HTTP/Methods)
- [📚 Axios Documentation](https://axios-http.com/docs/intro)
- [📚 REST API Tutorial](https://restfulapi.net/)
