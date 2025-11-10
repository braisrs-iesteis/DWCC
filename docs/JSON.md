# Manejo de JSON en JavaScript

## ¿Qué es JSON?

JSON (JavaScript Object Notation) es un formato ligero de intercambio de datos, fácil de leer y escribir para humanos y fácil de parsear y generar para las máquinas. Es ampliamente utilizado para enviar y recibir datos en aplicaciones web, especialmente en APIs.

!!! info
    JSON es un subconjunto de la sintaxis de objetos de JavaScript, pero no es exactamente igual a un objeto JS.

---

## Sintaxis básica de JSON

- Las claves SIEMPRE van entre comillas dobles
- Los valores pueden ser: string, number, boolean, null, array o objeto
- No se permiten comentarios

```json
{
  "nombre": "Juan",
  "edad": 30,
  "activo": true,
  "hobbies": ["leer", "correr"],
  "direccion": {
    "ciudad": "Madrid",
    "cp": 28001
  }
}
```

---

## Convertir entre JSON y objetos en JavaScript

### De objeto JS a JSON (serializar)

Usa `JSON.stringify()` para convertir un objeto JS a una cadena JSON:

```javascript
const usuario = {
  nombre: "Ana",
  edad: 28,
  activo: true
};

const json = JSON.stringify(usuario);
console.log(json); // '{"nombre":"Ana","edad":28,"activo":true}'
```

**Opciones avanzadas:**

```javascript
// Formatear con espacios
console.log(JSON.stringify(usuario, null, 2));

// Filtrar propiedades
console.log(JSON.stringify(usuario, ["nombre", "activo"]));
```

---

### De JSON a objeto JS (parsear)

Usa `JSON.parse()` para convertir una cadena JSON a un objeto JS:

```javascript
const json = '{"nombre":"Ana","edad":28,"activo":true}';
const usuario = JSON.parse(json);
console.log(usuario.nombre); // 'Ana'
```

**Cuidado:** Si el JSON está mal formado, lanzará un error.

```javascript
try {
  const obj = JSON.parse('{nombre: "Ana"}'); // ❌ Error: claves sin comillas
} catch (e) {
  console.error("JSON inválido:", e.message);
}
```

---

## JSON en peticiones HTTP

### Enviar datos como JSON

```javascript
fetch('https://api.example.com/usuarios', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ nombre: 'Ana', edad: 28 })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

### Recibir datos en formato JSON

```javascript
fetch('https://api.example.com/usuarios/1')
  .then(res => res.json())
  .then(usuario => {
    console.log(usuario.nombre);
  });
```

---

## Trabajar con arrays y JSON

```javascript
const lista = [
  { id: 1, nombre: 'Juan' },
  { id: 2, nombre: 'Ana' }
];

const json = JSON.stringify(lista);
console.log(json); // '[{"id":1,"nombre":"Juan"},{"id":2,"nombre":"Ana"}]'

const array = JSON.parse(json);
console.log(array[0].nombre); // 'Juan'
```

---

## Errores comunes con JSON

- Usar comillas simples en vez de dobles
- Olvidar comillas en las claves
- Poner comentarios (no están permitidos)
- Usar valores no válidos (undefined, funciones, símbolos)

```javascript
const obj = {
  nombre: 'Ana',
  edad: undefined, // ❌ No se serializa
  saludar: () => 'Hola' // ❌ No se serializa
};

console.log(JSON.stringify(obj)); // '{"nombre":"Ana"}'
```

---

## Métodos útiles con JSON

### Clonar objetos (deep copy)

```javascript
const original = { nombre: 'Ana', datos: { edad: 28 } };
const copia = JSON.parse(JSON.stringify(original));
copia.datos.edad = 99;
console.log(original.datos.edad); // 28
```

### Validar si una cadena es JSON

```javascript
function esJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

console.log(esJSON('{"a":1}')); // true
console.log(esJSON('no es json')); // false
```

---

## Resumen

- Usa `JSON.stringify()` para convertir objetos JS a JSON
- Usa `JSON.parse()` para convertir JSON a objetos JS
- JSON es el formato estándar para enviar/recibir datos en APIs
- ¡Cuidado con los errores de sintaxis!

---

## Recursos útiles

- [📚 MDN - JSON](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [📚 JSONLint - Validador online](https://jsonlint.com/)
