# Variables en JavaScript

## Declaración de Variables

### var, let y const

JavaScript ofrece tres formas de declarar variables:

```javascript
var nombre = "Juan"; // Mutable - Ámbito de función
let edad = 25; // Mutable - Ámbito de bloque
const PI = 3.14159; // Inmutable - Declaración de constante
```

---

## Tipos Primitivos

### Number (Números)

!!! info
    JavaScript tiene un solo tipo numérico que incluye números enteros y decimales

```javascript
let entero = 42;
let decimal = 3.14;
let negativo = -17;
let cientifico = 2.5e6; // 2,500,000

console.log("Entero:", entero);
console.log("Decimal:", decimal);
console.log("Negativo:", negativo);
console.log("Científico:", cientifico);
console.log("Tipo:", typeof entero);
```

**Salida por consola:**

```
Entero: 42
Decimal: 3.14
Negativo: -17
Científico: 2500000
Tipo: number
```

### String (Cadenas de texto)

Las cadenas pueden declararse con comillas simples, dobles o backticks:

```javascript
let nombre = "Ana";
let apellido = "García";
let saludo = `Hola, ${nombre} ${apellido}!`; // Template literal

console.log("Nombre:", nombre);
console.log("Apellido:", apellido);
console.log("Saludo:", saludo);
console.log("Tipo:", typeof nombre);
console.log("Longitud del nombre:", nombre.length);
```

**Salida por consola:**

```
Nombre: Ana
Apellido: García
Saludo: Hola, Ana García!
Tipo: string
Longitud del nombre: 3
```

### 2.3 Boolean (Booleanos)

Los booleanos representan verdadero o falso:

```javascript
let esVerdadero = true;
let esFalso = false;
let mayorEdad = 18 >= 18;

console.log("Es verdadero:", esVerdadero);
console.log("Es falso:", esFalso);
console.log("Mayor de edad:", mayorEdad);
console.log("Tipo:", typeof esVerdadero);
```

**Salida por consola:**

```
Es verdadero: true
Es falso: false
Mayor de edad: true
Tipo: boolean
```

### 2.4 Undefined

Una variable declarada pero sin valor asignado es `undefined`:

```javascript
let variableSinValor;
let otraVariable = undefined;

console.log("Variable sin valor:", variableSinValor);
console.log("Otra variable:", otraVariable);
console.log("Tipo:", typeof variableSinValor);
console.log("¿Son iguales?", variableSinValor === otraVariable);
```

**Salida por consola:**

```
Variable sin valor: undefined
Otra variable: undefined
Tipo: undefined
¿Son iguales? true
```

### 2.5 Null

`null` representa la ausencia intencional de un valor:

```javascript
let valorNulo = null;
let respuesta = null; // Inicializar como nulo intencionalmente

console.log("Valor nulo:", valorNulo);
console.log("Respuesta:", respuesta);
console.log("Tipo:", typeof valorNulo); // ¡Curiosidad! Devuelve "object"
console.log("¿Es null?", valorNulo === null);
```

**Salida por consola:**

```
Valor nulo: null
Respuesta: null
Tipo: object
¿Es null? true
```

!!! warning "Curiosidad de JavaScript"
`typeof null` devuelve `"object"` por un error histórico del lenguaje. Es uno de los "quirks" más conocidos de JS.

---

## 3. Tipos de Referencia

### 3.1 Object (Objetos)

Los objetos almacenan colecciones de pares clave-valor:

```javascript
let persona = {
  nombre: "Carlos",
  edad: 30,
  casado: true,
  ciudad: "Madrid",
};

console.log("Persona completa:", persona);
console.log("Nombre:", persona.nombre);
console.log("Edad:", persona["edad"]); // Notación alternativa
console.log("Tipo:", typeof persona);
console.log("Claves del objeto:", Object.keys(persona));
```

**Salida por consola:**

```
Persona completa: { nombre: 'Carlos', edad: 30, casado: true, ciudad: 'Madrid' }
Nombre: Carlos
Edad: 30
Tipo: object
Claves del objeto: [ 'nombre', 'edad', 'casado', 'ciudad' ]
```

### 3.2 Array (Arreglos)

Los arrays son listas ordenadas de elementos:

```javascript
let numeros = [1, 2, 3, 4, 5];
let mixto = ["texto", 42, true, null];
let vacio = [];

console.log("Números:", numeros);
console.log("Mixto:", mixto);
console.log("Primer número:", numeros[0]);
console.log("Último elemento mixto:", mixto[mixto.length - 1]);
console.log("Tipo de array:", typeof numeros);
console.log("¿Es array?", Array.isArray(numeros));
console.log("Longitud:", numeros.length);
```

**Salida por consola:**

```
Números: [ 1, 2, 3, 4, 5 ]
Mixto: [ 'texto', 42, true, null ]
Primer número: 1
Último elemento mixto: null
Tipo de array: object
¿Es array? true
Longitud: 5
```

### 3.3 Function (Funciones)

Las funciones son bloques de código reutilizable:

```javascript
function saludar(nombre) {
  return `¡Hola, ${nombre}!`;
}

const multiplicar = function (a, b) {
  return a * b;
};

const sumar = (a, b) => a + b; // Arrow function

console.log("Función saludar:", saludar("María"));
console.log("Función multiplicar:", multiplicar(5, 3));
console.log("Función sumar:", sumar(10, 7));
console.log("Tipo de función:", typeof saludar);
```

**Salida por consola:**

```
Función saludar: ¡Hola, María!
Función multiplicar: 15
Función sumar: 17
Tipo de función: function
```

---

## 4. Conversión de Tipos

### 4.1 Conversión Implícita (Coerción)

JavaScript convierte automáticamente tipos cuando es necesario:

```javascript
let numero = 10;
let texto = "20";
let resultado = numero + texto; // Concatenación
let resta = numero - texto; // Conversión a número

console.log("Número + Texto:", resultado, "(tipo:", typeof resultado, ")");
console.log("Número - Texto:", resta, "(tipo:", typeof resta, ")");
console.log("Boolean + Número:", true + 5);
console.log("String * Número:", "3" * 4);
```

**Salida por consola:**

```
Número + Texto: 1020 (tipo: string )
Número - Texto: -10 (tipo: number )
Boolean + Número: 6
String * Número: 12
```

### 4.2 Conversión Explícita

Puedes convertir tipos manualmente:

```javascript
let textoNumero = "123";
let textoBoolean = "true";

// A número
let numeroConvertido = Number(textoNumero);
let numeroParseInt = parseInt("123.45");
let numeroParseFloat = parseFloat("123.45");

// A string
let numeroATexto = String(456);
let concatenado = 789 + ""; // Trick común

// A boolean
let booleanConvertido = Boolean("cualquier texto");
let booleanVacio = Boolean("");

console.log("Texto a número:", numeroConvertido, typeof numeroConvertido);
console.log("parseInt:", numeroParseInt, typeof numeroParseInt);
console.log("parseFloat:", numeroParseFloat, typeof numeroParseFloat);
console.log("Número a texto:", numeroATexto, typeof numeroATexto);
console.log("Boolean de texto:", booleanConvertido);
console.log("Boolean de string vacío:", booleanVacio);
```

**Salida por consola:**

```
Texto a número: 123 number
parseInt: 123 number
parseFloat: 123.45 number
Número a texto: 456 string
Boolean de texto: true
Boolean de string vacío: false
```

---

## 5. Verificación de Tipos

### 5.1 Operador typeof

```javascript
let ejemplos = [42, "texto", true, undefined, null, {}, [], function () {}];

ejemplos.forEach((elemento, indice) => {
  console.log(`Elemento ${indice}: ${elemento} -> tipo: ${typeof elemento}`);
});
```

**Salida por consola:**

```
Elemento 0: 42 -> tipo: number
Elemento 1: texto -> tipo: string
Elemento 2: true -> tipo: boolean
Elemento 3: undefined -> tipo: undefined
Elemento 4: null -> tipo: object
Elemento 5: [object Object] -> tipo: object
Elemento 6:  -> tipo: object
Elemento 7: function() {} -> tipo: function
```

### 5.2 Verificaciones Específicas

```javascript
let arr = [1, 2, 3];
let obj = { a: 1 };
let fecha = new Date();

console.log("¿Es array?", Array.isArray(arr));
console.log("¿Es array el objeto?", Array.isArray(obj));
console.log("¿Es Date?", fecha instanceof Date);
console.log("¿Es Object?", obj instanceof Object);
console.log("¿Es null?", obj === null);
console.log("¿Es undefined?", obj === undefined);
```

**Salida por consola:**

```
¿Es array? true
¿Es array el objeto? false
¿Es Date? true
¿Es Object? true
¿Es null? false
¿Es undefined? false
```

---

## 6. Ejemplo Práctico Integrador

Vamos a crear un pequeño programa que demuestre todos los conceptos:

```javascript
// Declaración de variables de diferentes tipos
const usuario = {
  id: 1,
  nombre: "Elena",
  edad: 28,
  activo: true,
  hobbies: ["lectura", "programación", "viajes"],
  direccion: null,
  telefono: undefined,
};

// Función para analizar el tipo de cada propiedad
function analizarUsuario(user) {
  console.log("=== ANÁLISIS DE USUARIO ===");

  for (let clave in user) {
    const valor = user[clave];
    const tipo = typeof valor;

    console.log(`${clave}: ${valor} (${tipo})`);

    // Análisis especial para arrays y null
    if (Array.isArray(valor)) {
      console.log(`  -> Es un array con ${valor.length} elementos`);
    } else if (valor === null) {
      console.log(`  -> Es null (ausencia intencional de valor)`);
    }
  }

  // Conversiones de ejemplo
  console.log("\n=== CONVERSIONES ===");
  console.log("Edad como string:", String(user.edad));
  console.log("ID como boolean:", Boolean(user.id));
  console.log("Activo como string:", user.activo + "");
}

// Ejecutar análisis
analizarUsuario(usuario);
```

**Salida por consola:**

```
=== ANÁLISIS DE USUARIO ===
id: 1 (number)
nombre: Elena (string)
edad: 28 (number)
activo: true (boolean)
hobbies: lectura,programación,viajes (object)
  -> Es un array con 3 elementos
direccion: null (object)
  -> Es null (ausencia intencional de valor)
telefono: undefined (undefined)

=== CONVERSIONES ===
Edad como string: 28
ID como boolean: true
Activo como string: true
```

---

## Resumen

!!! summary "Puntos clave" - **Tipos primitivos**: `number`, `string`, `boolean`, `undefined`, `null` - **Tipos de referencia**: `object`, `array`, `function` - **Declaración**: Usa `const` por defecto, `let` si necesitas reasignar - **typeof**: Operador para verificar tipos (cuidado con `null`) - **Conversión**: JavaScript convierte tipos automáticamente o manualmente

!!! example "Próximos pasos"
En el siguiente documento veremos **operadores y expresiones** en JavaScript, donde aplicaremos estos tipos de variables en operaciones prácticas.
