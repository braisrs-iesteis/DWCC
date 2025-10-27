# Spread y Destructuring en JavaScript

## Operador Spread (...)

El operador spread permite expandir elementos de un iterable (arrays, strings, objetos) en lugares donde se esperan múltiples elementos.

[📚 Documentación MDN - Spread syntax](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

---

### Spread con Arrays

#### Copiar arrays

```javascript
const original = [1, 2, 3];
const copia = [...original];

console.log(copia); // [1, 2, 3]
console.log(original === copia); // false (son arrays diferentes)
```

**Salida por consola:**

```
[1, 2, 3]
false
```

#### Concatenar arrays

```javascript
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const concatenado = [...array1, ...array2];

console.log(concatenado); // [1, 2, 3, 4, 5, 6]
```

**Salida por consola:**

```
[1, 2, 3, 4, 5, 6]
```

#### Agregar elementos

```javascript
const numeros = [2, 3, 4];
const masNumeros = [1, ...numeros, 5, 6];

console.log(masNumeros); // [1, 2, 3, 4, 5, 6]
```

**Salida por consola:**

```
[1, 2, 3, 4, 5, 6]
```

#### Pasar elementos como argumentos

```javascript
const numeros = [5, 1, 9, 3, 7];
const maximo = Math.max(...numeros);

console.log(maximo); // 9
```

**Salida por consola:**

```
9
```

---

### Spread con Objetos

[📚 Documentación MDN - Spread en objetos](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_en_objetos_literales)

#### Copiar objetos

```javascript
const persona = { nombre: "Ana", edad: 25 };
const copia = { ...persona };

console.log(copia); // { nombre: "Ana", edad: 25 }
console.log(persona === copia); // false
```

**Salida por consola:**

```
{ nombre: "Ana", edad: 25 }
false
```

#### Combinar objetos

```javascript
const datosBasicos = { nombre: "Carlos", edad: 30 };
const datosContacto = { email: "carlos@example.com", telefono: "123456789" };
const perfil = { ...datosBasicos, ...datosContacto };

console.log(perfil);
```

**Salida por consola:**

```
{
  nombre: "Carlos",
  edad: 30,
  email: "carlos@example.com",
  telefono: "123456789"
}
```

#### Sobrescribir propiedades

```javascript
const config = { tema: "claro", idioma: "es", notificaciones: true };
const nuevaConfig = { ...config, tema: "oscuro" };

console.log(nuevaConfig);
```

**Salida por consola:**

```
{ tema: "oscuro", idioma: "es", notificaciones: true }
```

!!! warning "Copia superficial"
El operador spread realiza una copia superficial (shallow copy). Si el objeto contiene objetos anidados, estos seguirán siendo referencias.

```javascript
const original = { a: 1, b: { c: 2 } };
const copia = { ...original };

copia.b.c = 99;
console.log(original.b.c); // 99 (¡se modifica el original!)
```

---

### Spread con Strings

```javascript
const texto = "Hola";
const letras = [...texto];

console.log(letras); // ["H", "o", "l", "a"]
```

**Salida por consola:**

```
["H", "o", "l", "a"]
```

---

## Destructuring (Desestructuración)

La desestructuración permite extraer valores de arrays u objetos y asignarlos a variables de forma más concisa.

[📚 Documentación MDN - Destructuring assignment](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

---

### Destructuring de Arrays

[📚 Documentación MDN - Array destructuring](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#desestructuraci%C3%B3n_de_arreglos)

#### Asignación básica

```javascript
const colores = ["rojo", "verde", "azul"];
const [primero, segundo, tercero] = colores;

console.log(primero); // "rojo"
console.log(segundo); // "verde"
console.log(tercero); // "azul"
```

**Salida por consola:**

```
rojo
verde
azul
```

#### Omitir elementos

```javascript
const numeros = [1, 2, 3, 4, 5];
const [primero, , tercero] = numeros;

console.log(primero); // 1
console.log(tercero); // 3
```

**Salida por consola:**

```
1
3
```

#### Rest operator con destructuring

```javascript
const [primero, segundo, ...resto] = [1, 2, 3, 4, 5];

console.log(primero); // 1
console.log(segundo); // 2
console.log(resto); // [3, 4, 5]
```

**Salida por consola:**

```
1
2
[3, 4, 5]
```

#### Valores por defecto

```javascript
const [a = 1, b = 2, c = 3] = [10, 20];

console.log(a); // 10
console.log(b); // 20
console.log(c); // 3 (valor por defecto)
```

**Salida por consola:**

```
10
20
3
```

#### Intercambiar variables

```javascript
let a = 1;
let b = 2;

[a, b] = [b, a];

console.log(a); // 2
console.log(b); // 1
```

**Salida por consola:**

```
2
1
```

---

### Destructuring de Objetos

[📚 Documentación MDN - Object destructuring](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#desestructuraci%C3%B3n_de_objetos)

#### Asignación básica

```javascript
const persona = {
  nombre: "Laura",
  edad: 28,
  ciudad: "Madrid",
};

const { nombre, edad, ciudad } = persona;

console.log(nombre); // "Laura"
console.log(edad); // 28
console.log(ciudad); // "Madrid"
```

**Salida por consola:**

```
Laura
28
Madrid
```

#### Asignar a variables con diferente nombre

```javascript
const persona = { nombre: "Pedro", edad: 35 };
const { nombre: nombreCompleto, edad: años } = persona;

console.log(nombreCompleto); // "Pedro"
console.log(años); // 35
```

**Salida por consola:**

```
Pedro
35
```

#### Valores por defecto

```javascript
const config = { tema: "oscuro" };
const { tema, idioma = "es", tamaño = "mediano" } = config;

console.log(tema); // "oscuro"
console.log(idioma); // "es"
console.log(tamaño); // "mediano"
```

**Salida por consola:**

```
oscuro
es
mediano
```

#### Rest operator con objetos

```javascript
const usuario = {
  id: 1,
  nombre: "Ana",
  edad: 30,
  email: "ana@example.com",
  telefono: "123456789",
};

const { id, nombre, ...restoInfo } = usuario;

console.log(id); // 1
console.log(nombre); // "Ana"
console.log(restoInfo); // { edad: 30, email: "ana@example.com", telefono: "123456789" }
```

**Salida por consola:**

```
1
Ana
{
  edad: 30,
  email: "ana@example.com",
  telefono: "123456789"
}
```

#### Destructuring anidado

```javascript
const usuario = {
  nombre: "Carlos",
  direccion: {
    calle: "Gran Vía",
    numero: 123,
    ciudad: "Barcelona",
  },
};

const {
  nombre,
  direccion: { ciudad, calle },
} = usuario;

console.log(nombre); // "Carlos"
console.log(ciudad); // "Barcelona"
console.log(calle); // "Gran Vía"
```

**Salida por consola:**

```
Carlos
Barcelona
Gran Vía
```

---

### Destructuring en Parámetros de Función

[📚 Documentación MDN - Destructuring en parámetros](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#desestructuraci%C3%B3n_de_par%C3%A1metros_de_funci%C3%B3n)

#### Con objetos

```javascript
function crearUsuario({ nombre, edad, email = "sin email" }) {
  console.log(`Usuario: ${nombre}, ${edad} años, ${email}`);
}

crearUsuario({ nombre: "María", edad: 25 });
crearUsuario({ nombre: "Juan", edad: 30, email: "juan@example.com" });
```

**Salida por consola:**

```
Usuario: María, 25 años, sin email
Usuario: Juan, 30 años, juan@example.com
```

#### Con arrays

```javascript
function sumarPrimerosDos([a, b]) {
  return a + b;
}

console.log(sumarPrimerosDos([5, 10, 15])); // 15
```

**Salida por consola:**

```
15
```

---

## Casos de Uso Prácticos

### Clonar y modificar objetos de estado

```javascript
const estado = {
  usuario: "Ana",
  autenticado: false,
  tema: "claro",
};

// Actualizar solo una propiedad manteniendo el resto
const nuevoEstado = {
  ...estado,
  autenticado: true,
};

console.log(nuevoEstado);
```

**Salida por consola:**

```
{
  usuario: "Ana",
  autenticado: true,
  tema: "claro"
}
```

### Extraer datos de APIs

```javascript
const respuestaAPI = {
  status: 200,
  data: {
    id: 1,
    nombre: "Producto A",
    precio: 29.99,
    stock: 100,
  },
  timestamp: "2025-10-27",
};

const {
  data: { nombre, precio },
  status,
} = respuestaAPI;

console.log(`Estado: ${status}`);
console.log(`Producto: ${nombre} - ${precio}€`);
```

**Salida por consola:**

```
Estado: 200
Producto: Producto A - 29.99€
```

### Combinar arrays sin duplicados

```javascript
const tags1 = ["javascript", "web", "frontend"];
const tags2 = ["javascript", "react", "web"];

const todosTags = [...new Set([...tags1, ...tags2])];

console.log(todosTags);
```

**Salida por consola:**

```
["javascript", "web", "frontend", "react"]
```

### Función con opciones configurables

```javascript
function configurarApp({
  titulo = "Mi App",
  tema = "claro",
  idioma = "es",
  ...opcionesExtra
}) {
  console.log(`Configuración:`);
  console.log(`- Título: ${titulo}`);
  console.log(`- Tema: ${tema}`);
  console.log(`- Idioma: ${idioma}`);
  console.log(`- Opciones adicionales:`, opcionesExtra);
}

configurarApp({
  titulo: "Super App",
  tema: "oscuro",
  notificaciones: true,
  analytics: false,
});
```

**Salida por consola:**

```
Configuración:
- Título: Super App
- Tema: oscuro
- Idioma: es
- Opciones adicionales: { notificaciones: true, analytics: false }
```

---

## Recursos Adicionales

- [📚 MDN - Spread syntax](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [📚 MDN - Destructuring assignment](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [📚 MDN - Rest parameters](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/rest_parameters)

!!! tip "Buenas prácticas" - Usa spread para crear copias inmutables de objetos y arrays - Combina destructuring con valores por defecto para funciones más robustas - Recuerda que spread hace copias superficiales, no profundas - Usa destructuring para hacer tu código más legible y expresivo
