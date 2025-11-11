# Programación Asíncrona en JavaScript

La programación asíncrona en JavaScript permite ejecutar operaciones que toman tiempo (como leer archivos o hacer peticiones) sin bloquear el hilo principal. JavaScript evolucionó desde callbacks hasta promesas y finalmente async/await para manejar este tipo de operaciones de manera más limpia y legible.

## Temporizadores: setTimeout y setInterval

Los temporizadores son las funciones asíncronas más básicas en JavaScript. Permiten ejecutar código después de un período de tiempo específico o de manera repetitiva.

### `setTimeout()`

Ejecuta una función **una sola vez** después de un tiempo especificado (en milisegundos).

**Sintaxis:**

```javascript
setTimeout(función, retraso, arg1, arg2, ...);
```

**Ejemplos básicos:**

```javascript
// Ejemplo 1: Mensaje simple después de 2 segundos
console.log("Inicio");

setTimeout(() => {
  console.log("Han pasado 2 segundos");
}, 2000);

console.log("Fin");

// Salida:
// Inicio
// Fin
// Han pasado 2 segundos (después de 2 segundos)
```

```javascript
// Ejemplo 2: Función con parámetros
function saludar(nombre, edad) {
  console.log(`Hola ${nombre}, tienes ${edad} años`);
}

setTimeout(saludar, 1500, "Ana", 25);
// Salida después de 1.5 segundos: Hola Ana, tienes 25 años
```

```javascript
// Ejemplo 3: Simular una notificación
function mostrarNotificacion(mensaje, tipo) {
  console.log(`[${tipo.toUpperCase()}] ${mensaje}`);
}

console.log("Guardando cambios...");
setTimeout(
  () => mostrarNotificacion("Cambios guardados correctamente", "éxito"),
  1000
);
```

[📚 Documentación MDN - setTimeout](https://developer.mozilla.org/es/docs/Web/API/setTimeout)

### `setInterval()`

Ejecuta una función **repetidamente** cada cierto intervalo de tiempo (en milisegundos).

**Sintaxis:**

```javascript
setInterval(función, intervalo, arg1, arg2, ...);
```

**Ejemplos básicos:**

```javascript
// Ejemplo 1: Contador simple
let contador = 0;

const intervalo = setInterval(() => {
  contador++;
  console.log(`Contador: ${contador}`);

  if (contador >= 5) {
    clearInterval(intervalo); // Detener después de 5 veces
    console.log("Intervalo detenido");
  }
}, 1000);

// Salida (cada segundo):
// Contador: 1
// Contador: 2
// Contador: 3
// Contador: 4
// Contador: 5
// Intervalo detenido
```

```javascript
// Ejemplo 2: Reloj digital simple
function mostrarHora() {
  const ahora = new Date();
  const hora = ahora.toLocaleTimeString("es-ES");
  console.log(`Hora actual: ${hora}`);
}

// Mostrar la hora cada segundo
const reloj = setInterval(mostrarHora, 1000);

// Para detener el reloj después de 10 segundos:
setTimeout(() => {
  clearInterval(reloj);
  console.log("Reloj detenido");
}, 10000);
```

[📚 Documentación MDN - setInterval](https://developer.mozilla.org/es/docs/Web/API/setInterval)

### Cancelar Temporizadores

#### `clearTimeout()`

Cancela un timeout que fue establecido previamente con `setTimeout()`.

```javascript
// Establecer un timeout
const timeoutId = setTimeout(() => {
  console.log("Este mensaje NO se mostrará");
}, 3000);

// Cancelar el timeout antes de que se ejecute
clearTimeout(timeoutId);
console.log("Timeout cancelado");
```

[📚 Documentación MDN - clearTimeout](https://developer.mozilla.org/es/docs/Web/API/clearTimeout)

#### `clearInterval()`

Detiene un intervalo que fue establecido previamente con `setInterval()`.

```javascript
let segundos = 0;
const intervalo = setInterval(() => {
  segundos++;
  console.log(`Han pasado ${segundos} segundo(s)`);
}, 1000);

// Detener después de 5 segundos
setTimeout(() => {
  clearInterval(intervalo);
  console.log("Cronómetro detenido");
}, 5000);
```

[📚 Documentación MDN - clearInterval](https://developer.mozilla.org/es/docs/Web/API/clearInterval)

### Ejemplos Prácticos

#### Ejemplo 1: Sistema de cuenta regresiva

```javascript
function cuentaRegresiva(segundos) {
  console.log(`Iniciando cuenta regresiva desde ${segundos}...`);

  let tiempo = segundos;

  const intervalo = setInterval(() => {
    console.log(tiempo);
    tiempo--;

    if (tiempo < 0) {
      clearInterval(intervalo);
      console.log("¡Tiempo terminado! 🎉");
    }
  }, 1000);

  return intervalo; // Devolver el ID por si necesitamos cancelarlo
}

// Usar la función
cuentaRegresiva(5);

// Salida:
// Iniciando cuenta regresiva desde 5...
// 5
// 4
// 3
// 2
// 1
// 0
// ¡Tiempo terminado! 🎉
```

#### Ejemplo 2: Sistema de recordatorios

```javascript
class Recordatorio {
  constructor() {
    this.timeouts = [];
  }

  agregar(mensaje, segundos) {
    console.log(
      `Recordatorio programado para dentro de ${segundos} segundo(s)`
    );

    const timeoutId = setTimeout(() => {
      console.log(`⏰ RECORDATORIO: ${mensaje}`);
    }, segundos * 1000);

    this.timeouts.push(timeoutId);
    return timeoutId;
  }

  cancelarTodos() {
    this.timeouts.forEach((id) => clearTimeout(id));
    this.timeouts = [];
    console.log("Todos los recordatorios cancelados");
  }
}

// Uso
const recordatorios = new Recordatorio();
recordatorios.agregar("Tomar agua", 3);
recordatorios.agregar("Hacer ejercicio", 5);
recordatorios.agregar("Descansar la vista", 7);

// Cancelar todos si es necesario
// recordatorios.cancelarTodos();
```

#### Ejemplo 3: Animación simple con progreso

```javascript
function barraDeProgreso(duracionSegundos) {
  const pasos = duracionSegundos * 10; // 10 actualizaciones por segundo
  let actual = 0;

  const intervalo = setInterval(() => {
    actual++;
    const porcentaje = Math.round((actual / pasos) * 100);
    const barra = "█".repeat(porcentaje / 5) + "░".repeat(20 - porcentaje / 5);

    console.clear(); // Limpiar consola (funciona en Node.js)
    console.log(`Progreso: [${barra}] ${porcentaje}%`);

    if (actual >= pasos) {
      clearInterval(intervalo);
      console.log("\n✅ ¡Completado!");
    }
  }, 100); // Actualizar cada 100ms
}

// barraDeProgreso(5);
```

### Consideraciones Importantes

!!! warning "Precisión del tiempo"
Los temporizadores en JavaScript **no son precisos al milisegundo**. El tiempo especificado es el **mínimo** que esperará antes de ejecutar el código, pero puede tardar más dependiendo de la carga del Event Loop.

!!! tip "Event Loop"
`setTimeout` y `setInterval` funcionan gracias al Event Loop de JavaScript. El código se ejecuta cuando el hilo principal está libre, no exactamente cuando el tiempo expira.

```javascript
// Ejemplo que demuestra la imprecisión
console.log("Inicio:", new Date().getMilliseconds());

setTimeout(() => {
  console.log("Timeout:", new Date().getMilliseconds());
}, 100);

// El código pesado puede retrasar la ejecución del timeout
for (let i = 0; i < 1000000000; i++) {
  // Operación pesada que bloquea el hilo
}
```

### Mejores Prácticas

```javascript
// ✅ Bueno: Guardar el ID para poder cancelar
const timeoutId = setTimeout(() => {
  console.log("Ejecutado");
}, 1000);

// Cancelar si es necesario
if (algunaCondicion) {
  clearTimeout(timeoutId);
}

// ✅ Bueno: Usar setInterval con condición de salida
let intentos = 0;
const maxIntentos = 10;

const intervalo = setInterval(() => {
  intentos++;
  console.log(`Intento ${intentos}`);

  if (intentos >= maxIntentos) {
    clearInterval(intervalo);
  }
}, 1000);

// ❌ Malo: setInterval sin forma de detenerlo
setInterval(() => {
  console.log("Esto se ejecutará para siempre");
}, 1000);

// ❌ Malo: setTimeout recursivo sin condición de salida
function bucleInfinito() {
  console.log("Ejecutando...");
  setTimeout(bucleInfinito, 1000);
}
// bucleInfinito(); // ¡Cuidado! Esto no para nunca
```

### setTimeout vs setInterval

| Característica            | setTimeout         | setInterval                                     |
| :------------------------ | :----------------- | :---------------------------------------------- |
| **Ejecuciones**           | Una sola vez       | Repetidas                                       |
| **Cancelación**           | clearTimeout()     | clearInterval()                                 |
| **Uso común**             | Retrasos, timeouts | Animaciones, polling                            |
| **Riesgo de acumulación** | No                 | Sí (si la ejecución tarda más que el intervalo) |

!!! info "Alternativa a setInterval"
A veces es mejor usar `setTimeout` recursivo en lugar de `setInterval`, especialmente si cada ejecución puede tardar tiempo variable:

    ```javascript
    function ejecutarPeriodicamente() {
        console.log("Ejecutando tarea...");

        // Hacer algo que puede tardar tiempo variable
        realizarTarea().then(() => {
            // Programar la siguiente ejecución DESPUÉS de terminar
            setTimeout(ejecutarPeriodicamente, 1000);
        });
    }

    ejecutarPeriodicamente();
    ```

---

## Callbacks

Los callbacks son funciones que se pasan como argumentos a otras funciones para ser ejecutadas cuando una operación asíncrona se completa.

```javascript
// Función que simula lavar los platos
function lavarPlatos(callback) {
  console.log("Comenzando a lavar los platos...");
  setTimeout(() => {
    console.log("Platos lavados!");
    callback();
  }, 2000);
}

// Función que simula secar los platos
function secarPlatos(callback) {
  console.log("Comenzando a secar los platos...");
  setTimeout(() => {
    console.log("Platos secos!");
    callback();
  }, 1500);
}

// Función que simula guardar los platos
function guardarPlatos(callback) {
  console.log("Guardando los platos...");
  setTimeout(() => {
    console.log("Platos guardados!");
    callback();
  }, 1000);
}

// Uso con callbacks - Callback Hell
lavarPlatos(() => {
  secarPlatos(() => {
    guardarPlatos(() => {
      console.log("¡Todos los platos están listos!");
    });
  });
});
```

### Problemas con Callbacks

Los callbacks pueden crear el "Callback Hell" o "Pyramid of Doom", donde el código se vuelve difícil de leer y mantener cuando hay muchas operaciones asíncronas anidadas.

## Promesas

Las promesas representan el resultado eventual de una operación asíncrona. Pueden estar en tres estados: pending (pendiente), fulfilled (cumplida) o rejected (rechazada).

```javascript
// Función que simula hacer la cama
function hacerCama() {
  return new Promise((resolve, reject) => {
    console.log("Haciendo la cama...");
    setTimeout(() => {
      const exito = Math.random() > 0.2; // 80% de probabilidad de éxito
      if (exito) {
        console.log("¡Cama hecha!");
        resolve("Cama lista");
      } else {
        console.log("Error al hacer la cama");
        reject("No se pudo hacer la cama");
      }
    }, 1800);
  });
}

// Función que simula aspirar el cuarto
function aspirarCuarto() {
  return new Promise((resolve, reject) => {
    console.log("Aspirando el cuarto...");
    setTimeout(() => {
      const exito = Math.random() > 0.1; // 90% de probabilidad de éxito
      if (exito) {
        console.log("¡Cuarto aspirado!");
        resolve("Cuarto limpio");
      } else {
        console.log("La aspiradora se descompuso");
        reject("Error con la aspiradora");
      }
    }, 2200);
  });
}

// Función que simula ordenar el armario
function ordenarArmario() {
  return new Promise((resolve, reject) => {
    console.log("Ordenando el armario...");
    setTimeout(() => {
      console.log("¡Armario ordenado!");
      resolve("Armario organizado");
    }, 1600);
  });
}

// Uso con promesas - más limpio que callbacks
hacerCama()
  .then((resultado) => {
    console.log(resultado);
    return aspirarCuarto();
  })
  .then((resultado) => {
    console.log(resultado);
    return ordenarArmario();
  })
  .then((resultado) => {
    console.log(resultado);
    console.log("¡Cuarto completamente arreglado!");
  })
  .catch((error) => {
    console.error("Error en la limpieza:", error);
  });
```

### Métodos Útiles de Promesas

```javascript
// Promise.all - Ejecuta todas las promesas en paralelo
Promise.all([hacerCama(), aspirarCuarto(), ordenarArmario()])
  .then((resultados) => {
    console.log("Todas las tareas completadas:", resultados);
  })
  .catch((error) => {
    console.error("Una de las tareas falló:", error);
  });

// Promise.allSettled - Espera a que todas las promesas se resuelvan
Promise.allSettled([hacerCama(), aspirarCuarto(), ordenarArmario()]).then(
  (resultados) => {
    resultados.forEach((resultado, index) => {
      if (resultado.status === "fulfilled") {
        console.log(`Tarea ${index + 1} exitosa:`, resultado.value);
      } else {
        console.log(`Tarea ${index + 1} falló:`, resultado.reason);
      }
    });
  }
);
```

## Async/Await

Async/await es sintaxis moderna que hace que el código asíncrono se vea y se comporte más como código síncrono, siendo más fácil de leer y debuggear.

```javascript
// Funciones que simulan tareas de cocina
function prepararIngredientes() {
  return new Promise((resolve) => {
    console.log("Preparando ingredientes...");
    setTimeout(() => {
      console.log("Ingredientes listos!");
      resolve("Ingredientes preparados");
    }, 1500);
  });
}

function cocinarComida() {
  return new Promise((resolve, reject) => {
    console.log("Cocinando...");
    setTimeout(() => {
      const exito = Math.random() > 0.15; // 85% de probabilidad de éxito
      if (exito) {
        console.log("¡Comida lista!");
        resolve("Comida cocinada");
      } else {
        console.log("Se quemó la comida");
        reject("Error al cocinar");
      }
    }, 3000);
  });
}

function lavarUtensilios() {
  return new Promise((resolve) => {
    console.log("Lavando utensilios...");
    setTimeout(() => {
      console.log("Utensilios limpios!");
      resolve("Utensilios lavados");
    }, 1200);
  });
}

// Función async que usa await
async function prepararAlmuerzo() {
  try {
    console.log("Comenzando preparación del almuerzo...");

    // Ejecutar tareas de forma secuencial
    const ingredientes = await prepararIngredientes();
    console.log("✓", ingredientes);

    const comida = await cocinarComida();
    console.log("✓", comida);

    const utensilios = await lavarUtensilios();
    console.log("✓", utensilios);

    console.log("🍽️ ¡Almuerzo completamente listo!");
    return "Almuerzo exitoso";
  } catch (error) {
    console.error("❌ Error en la preparación:", error);
    throw error;
  }
}

// Llamar la función async
prepararAlmuerzo()
  .then((resultado) => console.log("Resultado final:", resultado))
  .catch((error) => console.error("El almuerzo falló:", error));
```

### Ejecutar Tareas en Paralelo con Async/Await

```javascript
async function limpiezaGeneral() {
  try {
    console.log("Iniciando limpieza general de la casa...");

    // Ejecutar múltiples tareas en paralelo
    const [cama, cuarto, armario] = await Promise.all([
      hacerCama(),
      aspirarCuarto(),
      ordenarArmario(),
    ]);

    console.log("Resultados de la limpieza:");
    console.log("- " + cama);
    console.log("- " + cuarto);
    console.log("- " + armario);
    console.log("🏠 ¡Casa completamente limpia!");
  } catch (error) {
    console.error("Error durante la limpieza:", error);
  }
}

// Función que maneja errores individualmente
async function limpiezaFlexible() {
  console.log("Iniciando limpieza flexible...");

  const tareas = [hacerCama(), aspirarCuarto(), ordenarArmario()];
  const nombres = ["Hacer cama", "Aspirar cuarto", "Ordenar armario"];

  const resultados = await Promise.allSettled(tareas);

  resultados.forEach((resultado, index) => {
    if (resultado.status === "fulfilled") {
      console.log(`✅ ${nombres[index]}: ${resultado.value}`);
    } else {
      console.log(`❌ ${nombres[index]}: ${resultado.reason}`);
    }
  });

  console.log("Limpieza flexible completada");
}
```

## Comparación de Enfoques

### Ventajas y Desventajas

| Enfoque         | Ventajas                                     | Desventajas                                                     |
| :-------------- | :------------------------------------------- | :-------------------------------------------------------------- |
| **Callbacks**   | Simple de entender, amplio soporte           | Callback hell, difícil manejo de errores                        |
| **Promesas**    | Mejor manejo de errores, evita callback hell | Sintaxis más verbosa que async/await                            |
| **Async/Await** | Código más limpio y legible, fácil debugging | Requiere soporte ES2017+, puede ocultar la naturaleza asíncrona |

### Cuándo Usar Cada Uno

- **Callbacks**: Para operaciones simples o cuando se trabaja con APIs que solo soportan callbacks
- **Promesas**: Cuando necesitas mejor control de errores o trabajas con múltiples operaciones asíncronas
- **Async/Await**: Para código más legible y cuando trabajas con operaciones asíncronas complejas

## Mejores Prácticas

### Manejo de Errores

```javascript
// Siempre maneja errores en funciones async
async function tareaSegura() {
  try {
    const resultado = await operacionRiesgosa();
    return resultado;
  } catch (error) {
    console.error("Error capturado:", error);
    // Decide si relanzar el error o manejarlo
    return "valor por defecto";
  }
}

// Con promesas, siempre incluye .catch()
operacionAsincrona()
  .then((resultado) => procesarResultado(resultado))
  .catch((error) => manejarError(error));
```

### Evitar Bloqueos

```javascript
// ❌ Malo: operaciones secuenciales innecesarias
async function limpiezaLenta() {
  await lavarPlatos();
  await hacerCama(); // No depende de lavar platos
  await ordenarArmario(); // No depende de las anteriores
}

// ✅ Bueno: operaciones en paralelo cuando es posible
async function limpiezaRapida() {
  await Promise.all([lavarPlatos(), hacerCama(), ordenarArmario()]);
}
```

La programación asíncrona es fundamental en JavaScript moderno. Comenzar con callbacks ayuda a entender los conceptos básicos, las promesas proporcionan mejor control y estructura, mientras que async/await ofrece la sintaxis más limpia y legible para trabajar con operaciones asíncronas complejas.
