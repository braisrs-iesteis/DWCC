# Expresiones Regulares en JavaScript

## ¿Qué es una expresión regular?

Una expresión regular (regex o regexp) es una secuencia de caracteres que forma un patrón de búsqueda. Se utiliza para encontrar, validar, extraer o reemplazar texto dentro de cadenas.

!!! info
    Las expresiones regulares son muy potentes para validar formularios, buscar patrones y manipular texto.

---

## Sintaxis básica

- Se definen entre barras `/patrón/` o usando el constructor `new RegExp()`
- Se pueden añadir modificadores como `i` (ignorar mayúsculas/minúsculas), `g` (búsqueda global), `m` (multilínea)

```javascript
const regex = /hola/i; // Ignora mayúsculas/minúsculas
const regexGlobal = /\d+/g; // Busca todos los números
const regexObj = new RegExp('abc', 'i');
```

---

## Métodos principales

### test()
Comprueba si el patrón existe en la cadena (devuelve true/false):

```javascript
const regex = /\d+/;
console.log(regex.test('Hay 123 manzanas')); // true
console.log(regex.test('No hay números')); // false
```

### exec()
Devuelve información detallada del primer match (o null):

```javascript
const regex = /\d+/;
const resultado = regex.exec('Hay 123 manzanas');
console.log(resultado[0]); // '123'
```

### match()
Devuelve todas las coincidencias (array o null):

```javascript
const texto = 'Tel: 123-456 y 789-101';
const numeros = texto.match(/\d+/g);
console.log(numeros); // ['123', '456', '789', '101']
```

### replace()
Reemplaza coincidencias por otro texto:

```javascript
const texto = 'Hola 2025';
const nuevo = texto.replace(/\d+/, '2024');
console.log(nuevo); // 'Hola 2024'
```

---

## Caracteres especiales y clases

- `.`  Cualquier carácter excepto salto de línea
- `\d` Dígito (0-9)
- `\w` Carácter alfanumérico
- `\s` Espacio en blanco
- `+`  Uno o más
- `*`  Cero o más
- `?`  Cero o uno
- `^`  Inicio de línea
- `$`  Fin de línea
- `[abc]` Cualquiera de a, b o c
- `[^abc]` Cualquiera excepto a, b o c
- `{n,m}` Entre n y m repeticiones

```javascript
const regex = /^\d{3,5}$/;
console.log(regex.test('123')); // true
console.log(regex.test('12')); // false
```

---

## Validaciones comunes

### Validar email
```javascript
const email = 'correo@ejemplo.com';
const regex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
console.log(regex.test(email)); // true
```

### Validar número de teléfono español
```javascript
const telefono = '612345678';
const regex = /^6\d{8}$/;
console.log(regex.test(telefono)); // true
```

### Extraer todas las palabras
```javascript
const texto = 'Hola mundo 2025!';
const palabras = texto.match(/\w+/g);
console.log(palabras); // ['Hola', 'mundo', '2025']
```

---

## Recursos útiles

- [📚 MDN - Expresiones Regulares](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions)
- [🔎 Regex101 - Probador online](https://regex101.com/)
- [📚 Expresiones Regulares en JavaScript (MDN)](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
